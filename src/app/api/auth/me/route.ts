import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/userauth";

export async function GET() {
  const user = await getSessionUser();
  return NextResponse.json({ user });
}
