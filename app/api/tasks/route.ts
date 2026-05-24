import { NextResponse } from "next/server";
import { runPijakBackend } from "@/libs/backend";

export const runtime = "nodejs";

export async function GET() {
  const result = await runPijakBackend("list-tasks");
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}

export async function POST(req: Request) {
  const body = await req.json();
  const args = [
    "--workroom_id", body.workroom_id ?? "",
    "--title", body.title ?? "",
    "--assignee_id", body.assignee_id ?? ""
  ];
  const result = await runPijakBackend("add-task", args);
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}

export async function PUT(req: Request) {
  const body = await req.json();
  if (body.action === "complete") {
    const result = await runPijakBackend("complete-task", ["--id", body.id]);
    return NextResponse.json(result, { status: result.ok ? 200 : 400 });
  }
  return NextResponse.json({ ok: false, error: "Aksi tidak valid" }, { status: 400 });
}