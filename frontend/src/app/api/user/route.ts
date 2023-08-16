import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  let data;

  const res = await fetch("http://leetcode-checkin-backend:3002/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  data = await res.json();

  return NextResponse.json(data);
}
