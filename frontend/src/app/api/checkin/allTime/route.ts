import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await axios.get(
    "http://host.docker.internal:3002/api/v1/checkin/all-time"
  );
  const data = res.data;
  return NextResponse.json(data);
}
