import { NextResponse } from "next/server";
import { runPijakBackend } from "@/libs/backend";

export const runtime = "nodejs";

export async function GET() {
  const result = await runPijakBackend("show-activities");
  return NextResponse.json(result, {
    status: result.ok ? 200 : 400,
  });
}
