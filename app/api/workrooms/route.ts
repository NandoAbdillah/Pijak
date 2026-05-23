import { NextResponse } from "next/server";
import { runPijakBackend } from "@/libs/backend";

export const runtime = "nodejs";

export async function GET() {
  const result = await runPijakBackend("list-workrooms");
  return NextResponse.json(result, {
    status: result.ok ? 200 : 400,
  });
}

export async function POST(req: Request) {
  const body = await req.json();

  const args = [
    "--opportunity_id", body.opportunity_id ?? "",
    "--progress_pct", String(body.progress_pct ?? 0),
    "--status", body.status ?? "Berjalan",
  ];

  const result = await runPijakBackend("add-workroom", args);

  return NextResponse.json(result, {
    status: result.ok ? 200 : 400,
  });
}