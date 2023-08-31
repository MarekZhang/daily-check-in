import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("http://localhost:3002/api/v1/checkin/week", {
    next: { revalidate: 60 },
  });

  const data = await res.json();

  return NextResponse.json(data);
}
