import { Context } from "koa";
import { gql } from "@apollo/client/core";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import User from "../schema/userSchema";
import { userPublicProfile, allTimeSubmission } from "../queries";

export default class UserController {
  public static async new(ctx: Context) {
    const body = ctx.request.body as { leetCodeAccount: String };

    const leetCodeAccount = body.leetCodeAccount;

    if (!leetCodeAccount) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        message: "Invalid LeetCode account name",
      };

      return;
    }

    const processedAccount = leetCodeAccount.replace(/\s+/g, "").toLowerCase();

    const user = await User.findOne({ leetCodeAccount: processedAccount });

    if (user) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        message: "You already joined in the game.",
      };

      return;
    }

    const response = await axios.post("https://leetcode.com/graphql", {
      query: userPublicProfile,
      variables: { username: `${processedAccount}` },
    });

    if (response.data.errors) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        message: "Invalid LeetCode account name",
      };

      return;
    }

    const submissionResponse = await axios.post(
      "https://leetcode.com/graphql",
      {
        query: allTimeSubmission,
        variables: { username: `${processedAccount}` },
      }
    );

    if (submissionResponse.data.error) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        message: "Unexpected error for querying user all time submissions.",
      };
      return;
    }

    const allTimeSubmissions =
      submissionResponse.data.data.matchedUser.submitStatsGlobal
        .acSubmissionNum;

    let allTimeAC = allTimeSubmissions.find(
      (item: any) => item.difficulty === "All"
    );

    if (!allTimeAC) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        message: "Unexpected error for parsing all time submission count.",
      };
      return;
    }

    const newUser = new User({
      id: uuidv4(),
      leetCodeAccount: processedAccount,
      userAvatar: response.data.data.matchedUser.profile.userAvatar,
      allTimeAC: allTimeAC.count,
    });

    await newUser.save();

    ctx.status = 200;
    ctx.body = { status: 200, message: "New user joined in the game." };
  }
}
