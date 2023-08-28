"use client";

import { useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useEffect } from "react";

import { GoldCrown, SilverCrown, BronzeCrown } from "./components/crownIcon";
import { RankingButton } from "./components/rankingButton";
import UserForm from "./components/userForm";

export const runtime = "edge";

const dummyAvatar =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [checkInList, setCheckInList] = useState<any[]>([]);
  const [uncheckedList, setUncheckedList] = useState<any[]>([]);

  useEffect(() => {
    fetchTodayCheckIn();
    setIsLoading(false);
  }, []);

  const [rankingMethod, setRankingMethod] = useState<
    "Today" | "Week" | "AllTime"
  >("Today");

  const fetchTodayCheckIn = async () => {
    const resp = await fetch("/api/checkin/today", {
      next: { revalidate: 1 },
    });
    const respData = await resp.json();

    if (respData.status === 200) {
      toast.success("Successfully fetched today check in list!");
      setCheckInList(respData.checkedInUsers);
      setUncheckedList(respData.uncheckedInUsers);
    } else {
      toast.error(respData.message);
    }
    setIsLoading(false);
  };

  const fetchWeekCheckIn = async () => {
    const resp = await fetch("/api/checkin/week", {
      next: { revalidate: 1 },
    });
    const respData = await resp.json();
    console.log(respData);

    if (respData.status === 200) {
      toast.success("Successfully fetched week check in list!");
      setCheckInList(respData.users);
      setUncheckedList([]);
    } else {
      toast.error(respData.message);
    }
    setIsLoading(false);
  };

  const fetchAllTimeCheckIn = async () => {
    const resp = await fetch("/api/checkin/allTime", {
      next: { revalidate: 1 },
    });
    const respData = await resp.json();

    if (respData.status === 200) {
      toast.success("Successfully fetched all time check in list!");
      setCheckInList(respData.users);
      setUncheckedList([]);
    } else {
      toast.error(respData.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative">
      <div className="top-0 left-0 fixed opacity-75 w-full h-[48px] md:h-24 bg-gradient-to-r  from-blue-500 to-green-200 flex items-center">
        <p className="ml-4 text-white text-base md:text-2xl font-bold opacity-100">
          @ Leetcode Daily Check in
        </p>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col justify-center items-center mt-20 md:mt-32">
        <div className="flex flex-col items-center justify-center mb-4 space-y-2 text-gray-500">
          <p className="text-sm md:text-xl">Join the game today!</p>
          <UserForm />
        </div>
        <p className="text-xl md:text-4xl font-bold">Leaderboard</p>
        <p className="mt-2 md:mt-4 text-gray-500 text-sm">
          Update every 10 minutes
        </p>
        {/* First three display */}
        <div className="shadow-md rounded-2xl w-11/12 md:w-2/3 pb-4 flex flex-col items-center justify-center mt-10 border border-gray-200">
          {/* Ranking Method Button */}
          <div className="mt-10 flex flex-col md:flex-row justify-between space-y-2 md:space-x-4 w-full md:w-2/3 items-center">
            <RankingButton
              text="Today"
              selected={rankingMethod === "Today"}
              onClick={() => {
                setIsLoading(true);
                setRankingMethod("Today");
                fetchTodayCheckIn();
              }}
            />
            <RankingButton
              text="Week"
              selected={rankingMethod === "Week"}
              onClick={() => {
                setIsLoading(true);
                setRankingMethod("Week");
                fetchWeekCheckIn();
              }}
            />
            <RankingButton
              text="All Time"
              selected={rankingMethod === "AllTime"}
              onClick={() => {
                setIsLoading(true);
                setRankingMethod("AllTime");
                fetchAllTimeCheckIn();
              }}
            />
          </div>
          {/* Avatar Display */}
          {isLoading ? (
            <p className="mt-12">Loading...</p>
          ) : (
            <div className="mt-12 mb-4 flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-12">
              <div className="flex flex-col items-center justify-center order-[2] md:order-[0] mt-6 md:mt-0">
                <div className="relative w-[90px] h-[90px] md:w-[120px] md:h-[120px] rounded-full border-4 border-gray-200 flex items-center justify-center">
                  <SilverCrown />
                  <Image
                    className="mx-auto w-[84px] h-[84px] md:w-[110px] md:h-[110px] rounded-full"
                    width={110}
                    height={110}
                    src={
                      checkInList[1] ? checkInList[1].userAvatar : dummyAvatar
                    }
                    alt="avatar"
                  />
                </div>
                <p className="font-semibold text-gray-700">
                  {checkInList[1] ? checkInList[1].leetCodeAccount : "Tim Cook"}
                </p>
                <p className="mt-2 p-2 rounded-2xl bg-gray-100 text-xs ">
                  {!checkInList[1]
                    ? 0
                    : rankingMethod === "Today"
                    ? checkInList[1].todayAC
                    : rankingMethod === "Week"
                    ? checkInList[1].weekAC
                    : checkInList[1].allTimeAC}{" "}
                  Submissions
                </p>
              </div>
              <div className="flex flex-col items-center justify-center order-[1]">
                <div className="relative w-[95px] h-[95px] md:w-32 md:h-32 rounded-full border-yellow-300 border-4 flex items-center justify-center">
                  <GoldCrown />
                  <Image
                    className="mx-auto w-[88px] h-[88px] md:w-[118px] md:h-[118px] rounded-full"
                    width={110}
                    height={110}
                    src={
                      checkInList[0] ? checkInList[0].userAvatar : dummyAvatar
                    }
                    alt="avatar"
                  />
                </div>
                <p className="font-semibold text-gray-700">
                  {checkInList[0] ? checkInList[0].leetCodeAccount : "Tim Cook"}
                </p>
                <p className="mt-2 p-2 rounded-2xl bg-gray-100 text-xs ">
                  {!checkInList[0]
                    ? 0
                    : rankingMethod === "Today"
                    ? checkInList[0].todayAC
                    : rankingMethod === "Week"
                    ? checkInList[0].weekAC
                    : checkInList[0].allTimeAC}{" "}
                  Submissions
                </p>
              </div>
              <div className="flex flex-col items-center justify-center order-[3] mt-6 md:mt-0">
                <div className="relative w-[82px] h-[82px] md:w-[110px] md:h-[110px] rounded-full border-4 border-orange-200 flex items-center justify-center ">
                  <Image
                    className="mx-auto w-[75px] h-[75px] md:w-[100px] md:h-[100px] rounded-full"
                    width={110}
                    height={110}
                    src={
                      checkInList[2] ? checkInList[2].userAvatar : dummyAvatar
                    }
                    alt="avatar"
                  />
                  <BronzeCrown />
                </div>
                <p className="font-semibold text-gray-700">
                  {checkInList[2] ? checkInList[2].leetCodeAccount : "Tim Cook"}
                </p>
                <p className="mt-2 p-2 rounded-2xl bg-gray-100 text-xs ">
                  {!checkInList[2]
                    ? 0
                    : rankingMethod === "Today"
                    ? checkInList[2].todayAC
                    : rankingMethod === "Week"
                    ? checkInList[2].weekAC
                    : checkInList[2].allTimeAC}{" "}
                  Submissions
                </p>
              </div>
            </div>
          )}
        </div>
        {/* recently check in 4th - ... */}
        <div className="w-11/12 md:w-2/3 mt-10 space-y-4">
          {!isLoading &&
            checkInList.slice(3).map((user, i) => (
              <div
                key={i}
                className="rounded-lg w-full border borger-gray-300 bg-teal-50 flex flex-col md:flex-row justify-between items-center px-8 py-2 space-y-2 md:space-y-0"
              >
                <div className="flex items-center justify-starat space-x-4">
                  <p className="ml-4 text-sm md:text-xl underline">{i + 4}</p>
                  <span className="ml-8 w-8 h-8 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center">
                    <Image
                      className="mx-auto w-[100%] h-[100%] rounded-full"
                      width={110}
                      height={110}
                      src={user.userAvatar}
                      alt="avatar"
                    />
                  </span>
                  <p className="ml-4 font-semibold text-xs md:text-base">
                    {user.leetCodeAccount}
                  </p>
                </div>
                <div className="p-2 bg-gray-100 rounded-2xl text-xs md:text-sm flex items-center space-x-2">
                  <p>
                    {rankingMethod === "Today"
                      ? user.todayAC
                      : rankingMethod === "Week"
                      ? user.weekAC
                      : user.allTimeAC}{" "}
                    Accepted Submission
                  </p>
                  <SentimentSatisfiedAltIcon />
                </div>
              </div>
            ))}
          {/* users do not check in */}
          {!isLoading &&
            uncheckedList.map((user, i) => (
              <div
                key={i}
                className="rounded-lg w-full border borger-gray-300 bg-red-200 flex flex-col md:flex-row justify-between items-center px-8 py-2 space-y-2 md:space-y-0"
              >
                <div className="flex items-center justify-start md:justify-center space-x-4">
                  <p className="ml-4 text-sm md:text-xl ">-</p>
                  <span className="ml-8 w-8 h-8 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center">
                    <Image
                      className="mx-auto w-[100%] h-[100%] rounded-full"
                      width={110}
                      height={110}
                      src={user.userAvatar}
                      alt=""
                    />
                  </span>
                  <p className="ml-4 font-semibold text-xs md:text-base">
                    {user.leetCodeAccount}
                  </p>
                </div>
                <div className="p-2 bg-gray-100 rounded-2xl text-xs md:text-sm flex items-center space-x-2">
                  <p>0 Accepted Submission</p>
                  <SentimentVeryDissatisfiedIcon />
                </div>
              </div>
            ))}
        </div>
        <div className="mt-16">
          <p className="p-8 text-xs md:text-base">
            Copyright © 2023 Mark Zhang ®
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
