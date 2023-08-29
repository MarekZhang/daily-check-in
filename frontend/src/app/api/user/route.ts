import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  let data;

  const res = await axios.post(
    "http://localhost:3002/api/v1/users",
    JSON.stringify(body),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  data = await res.data;

  return NextResponse.json(data);
}
