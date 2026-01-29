import { NextResponse } from "next/server";

// Mock counter - replace with database (Vercel KV, Upstash, etc.) for production
let globalWins = 847; // Starting with a fun fake number

export async function GET() {
  return NextResponse.json({ wins: globalWins });
}

export async function POST() {
  globalWins++;
  return NextResponse.json({ wins: globalWins });
}
