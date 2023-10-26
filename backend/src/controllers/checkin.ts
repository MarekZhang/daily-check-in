import { Context } from "koa";
import axios from "axios";

import User from "../schema/userSchema";
import { recentSubmission, allTimeSubmission } from "../queries";
import {
  getTodayTimestampRange,
  getWeekTimestampRange,
  getAllTimeTimestampRange,
} from "../util/timestampUtil";

export default class CheckInController {
  public static async today(ctx: Context) {
    const todayTimestampRange = getTodayTimestampRange();

    const startTimeStamp = todayTimestampRange[0];
    const endTimeStamp = todayTimestampRange[1];

    let users = await User.find();

    users.map(async (user) => {
      const { leetCodeAccount } = user;

      const response = await axios.post("https://leetcode.com/graphql", {
        query: recentSubmission,
        variables: { username: `${leetCodeAccount}`, limit: 5 },
      });

      if (response.data.error) {
        console.log(response.data.error);
        ctx.status = 400;
        ctx.body = {
          status: 400,
          message: `Unexpected error for querying ${leetCodeAccount}'s recent submission.`,
        };
        return;
      }

      const submissions = response.data.data.recentAcSubmissionList;
      const submissionCount = CheckInController.submissionCount(
        submissions,
        startTimeStamp,
        endTimeStamp
      );

      user.todayAC = submissionCount;

      await user.save();
    });

    users = await User.find()
      .select(["leetCodeAccount", "todayAC", "nickName", "userAvatar"])
      .sort({ todayAC: -1 });

    const [checkedInUsers, uncheckedInUsers] = users.reduce(
      (result: any[], user: any) => {
        if (user.todayAC > 0) {
          result[0].push(user);
        } else {
          result[1].push(user);
        }
        return result;
      },
      [[], []]
    );

    ctx.status = 200;
    ctx.body = { checkedInUsers, uncheckedInUsers, status: 200 };
  }

  public static async week(ctx: Context) {
    const weekTimestampRange = getWeekTimestampRange();

    const startTimeStamp = weekTimestampRange[0];
    const endTimeStamp = weekTimestampRange[1];

    let users = await User.find();

    users.map(async (user) => {
      const { leetCodeAccount } = user;

      const response = await axios.post("https://leetcode.com/graphql", {
        query: recentSubmission,
        variables: { username: `${leetCodeAccount}`, limit: 30 },
      });

      if (response.data.error) {
        ctx.status = 400;
        ctx.body = {
          status: 400,
          message: `Unexpected error for querying ${leetCodeAccount}'s recent submission.`,
        };
        return;
      }

      const count = CheckInController.submissionCount(
        response.data.data.recentAcSubmissionList,
        startTimeStamp,
        endTimeStamp
      );

      user.weekAC = count;

      await user.save();
    });

    users = await User.find().sort({ weekAC: -1 });
    ctx.status = 200;
    ctx.body = { users, status: 200 };
  }

  public static async allTime(ctx: Context) {
    let users = await User.find();

    users.map(async (user) => {
      const { leetCodeAccount } = user;
      const response = await axios.post("https://leetcode.com/graphql", {
        query: allTimeSubmission,
        variables: { username: `${leetCodeAccount}` },
      });

      if (response.data.error) {
        ctx.status = 400;
        ctx.body = {
          status: 400,
          message: `Unexpected error for querying ${leetCodeAccount}'s all time submissions.`,
        };
        return;
      }

      const allTimeSubmissions =
        response.data.data.matchedUser.submitStatsGlobal.acSubmissionNum;

      let letAllTimeAC = allTimeSubmissions.find(
        (item: any) => item.difficulty === "All"
      );

      const allTimeAC = letAllTimeAC ? letAllTimeAC.count : 0;

      user.allTimeAC = allTimeAC;

      await user.save();
    });

    // const [startTimeStamp, endTimeStamp] = getAllTimeTimestampRange();

    // users.map(async (user) => {
    //   const { leetCodeAccount } = user;

    //   let limit = 0;
    //   let count = 0;

    //   while (count === limit) {
    //     limit += 50;
    //     let response = await axios.post("https://leetcode.com/graphql", {
    //       query: recentSubmission,
    //       variables: { username: `${leetCodeAccount}`, limit },
    //     });

    //     count = CheckInController.submissionCount(
    //       response.data.data.recentAcSubmissionList,
    //       startTimeStamp,
    //       endTimeStamp
    //     );
    //   }

    //   user.allTimeAC = count;

    //   await user.save();
    // });

    // users = await User.find().sort({ allTimeAC: -1 });

    ctx.status = 200;
    ctx.body = { users, status: 200 };
  }

  private static submissionCount(
    submissionList: {
      id: string;
      title: string;
      titleSlug: string;
      timestamp: string;
    }[],
    startTimeStamp: number,
    endTimeStamp: number
  ) {
    return submissionList.filter(
      (submission: {
        id: string;
        title: string;
        titleSlug: string;
        timestamp: string;
      }) => {
        const timestamp = parseInt(submission.timestamp, 10);
        return timestamp >= startTimeStamp && timestamp <= endTimeStamp;
      }
    ).length;
  }
}
