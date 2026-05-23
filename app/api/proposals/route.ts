import { NextResponse } from "next/server";
import { runPijakBackend } from "@/libs/backend";

export const runtime = "nodejs";

export async function GET() {
  const result = await runPijakBackend("list-proposals");
  return NextResponse.json(result, {
    status: result.ok ? 200 : 400,
  });
}

export async function POST(req: Request) {
  const body = await req.json();

  const args = [
    "--opportunity_id", body.opportunity_id ?? "",
    "--applicant_id", body.applicant_id ?? "",
    "--cover_letter", body.cover_letter ?? "",
    "--portfolio_url", body.portfolio_url ?? "",
  ];

  const result = await runPijakBackend("add-proposal", args);

  return NextResponse.json(result, {
    status: result.ok ? 200 : 400,
  });
}