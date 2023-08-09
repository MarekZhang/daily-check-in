"use client";

import { useState } from "react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

import { GoldCrown, SilverCrown, BronzeCrown } from "./components/crownIcon";
import { RankingButton } from "./components/rankingButton";
import UserForm from "./components/userForm";

const users = [1, 2, 3];

export default function Home() {
  const [rankingMethod, setRankingMethod] = useState<
    "Today" | "Week" | "AllTime"
  >("Today");

  const [todayCheckInList, setTodayCheckInList] = useState<>([]);

  const fetchTodayCheckIn = async () => {
    const resp = await fetch("/api/checkin/today");
    const respData = await resp.json();

    if (respData.status === 200) {
      setTodayCheckInList(respData.users);
    } else {
      toast.error(respData.message);
    }
  };

  return (
    <>
      <div className="top-0 left-0 fixed opacity-75 w-full h-24 bg-gradient-to-r  from-blue-500 to-green-200 flex items-center">
        <p className="ml-4 text-white text-2xl font-bold opacity-100">
          @ Leetcode Daily Check in
        </p>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col justify-center items-center mt-32">
        <div className="flex flex-col items-center justify-center mb-4 space-y-2 text-gray-500">
          <p className="text-xl">
            Join the game today by providing your LeetCode account
          </p>
          <UserForm />
          {/* <div className="w-full flex space-x-2 justify-center py-4">
            <input
              placeholder="LeetCode Account"
              className="outline-none w-1/2 rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-base sm:leading-6"
            />

            <button
              className="whitespace-normal w-auto p-2 border border-green-300 rounded-md bg-green-400 hover:bg-emerald-400 font-semibold text-white"
              onClick={() => {
                toast.success("You joined in the game! Keep moving!");
              }}
            >
              {"Let's Go !"}
            </button>
          </div> */}
        </div>
        <p className="text-4xl font-bold">Leaderboard</p>
        <p className="mt-4 text-gray-500 text-sm">Updat every 30 minutes</p>
        {/* First three display */}
        <div className="shadow-md rounded-2xl w-2/3 pb-4 flex flex-col items-center justify-center mt-10 border border-gray-200">
          {/* Ranking Method Button */}
          <div className="mt-10 flex justify-between space-x-4 w-2/3">
            <RankingButton
              text="Today"
              selected={rankingMethod === "Today"}
              onClick={() => {
                setRankingMethod("Today");
                fetchTodayCheckIn();
              }}
            />
            <RankingButton
              text="Week"
              selected={rankingMethod === "Week"}
              onClick={() => setRankingMethod("Week")}
            />
            <RankingButton
              text="All Time"
              selected={rankingMethod === "AllTime"}
              onClick={() => setRankingMethod("AllTime")}
            />
          </div>
          {/* Avatar Display */}
          <div className="mt-12 mb-4 flex items-center justify-center space-x-12">
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-[120px] h-[120px] rounded-full border-4 border-gray-200 flex items-center justify-center">
                <SilverCrown />
                <Image
                  className="mx-auto w-[110px] h-[110px] rounded-full"
                  width={110}
                  height={110}
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <p className="font-semibold text-gray-700">User name</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-32 h-32 rounded-full border-yellow-300 border-4 flex items-center justify-center">
                <GoldCrown />
                <Image
                  className="mx-auto w-[118px] h-[118px] rounded-full"
                  width={110}
                  height={110}
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <p className="font-semibold text-gray-700">User name</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-[110px] h-[110px] rounded-full border-4 border-orange-200 flex items-center justify-center">
                <Image
                  className="mx-auto w-[100px] h-[100px] rounded-full"
                  width={110}
                  height={110}
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <BronzeCrown />
              </div>
              <p className="font-semibold text-gray-700">User name</p>
            </div>
          </div>
        </div>
        {/* recently check in 4th - ... */}
        <div className="w-2/3 mt-10 space-y-4">
          {users.map((user, i) => (
            <div
              key={i}
              className="rounded-lg w-full border borger-gray-300 bg-teal-50 flex justify-between items-center px-8 py-2"
            >
              <div className="flex items-center space-x-4">
                <p className="ml-4 text-xl underline">{i + 4}</p>
                <span className="ml-8 w-16 h-16 rounded-full bg-white flex items-center justify-center">
                  <Image
                    className="mx-auto w-[62px] h-[62px] rounded-full"
                    width={110}
                    height={110}
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </span>
                <p className="ml-4 font-semibold">User Name</p>
              </div>
              <div className="p-2 bg-gray-100 rounded-2xl text-sm flex items-center space-x-2">
                <p>1 Accepted Submission</p>
                <SentimentSatisfiedAltIcon />
              </div>
            </div>
          ))}
          {/* users do not check in */}
          <div className="rounded-lg w-full border borger-gray-300 bg-red-200 flex justify-between items-center px-8 py-2">
            <div className="flex items-center space-x-4">
              <p className="ml-4 text-xl ">--</p>
              <span className="ml-8 w-16 h-16 rounded-full bg-white flex items-center justify-center">
                <Image
                  className="mx-auto w-[62px] h-[62px] rounded-full"
                  width={110}
                  height={110}
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </span>
              <p className="ml-4 font-semibold">User Name</p>
            </div>
            <div className="p-2 bg-gray-100 rounded-2xl text-sm flex items-center space-x-2">
              <p>0 Accepted Submission</p>
              <SentimentVeryDissatisfiedIcon />
            </div>
          </div>
        </div>
        <div className="mt-16">
          <p className="p-8">Copyright © 2023 Mark Zhang ®</p>
        </div>
      </div>
      <Toaster />
    </>
  );
}
