import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "http://leetcode-checkin-backend:3002/api/v1/checkin/all-time",
    {
      next: { revalidate: 1 },
    }
  );

  const data = await res.json();

  return NextResponse.json(data);
}
