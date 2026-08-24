import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Connect your authentication backend here." }, { status: 501 });
}
