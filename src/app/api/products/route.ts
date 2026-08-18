import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://localhost:4000/products");
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
