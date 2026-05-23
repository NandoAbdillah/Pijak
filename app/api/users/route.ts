import { NextResponse } from "next/server";
import { runPijakBackend } from "@/libs/backend";

export const runtime = "nodejs";

// Ambil semua user
export async function GET() {
  const result = await runPijakBackend("list-users");
  return NextResponse.json(result, {
    status: result.ok ? 200 : 400,
  });
}

// Tambah user baru
export async function POST(req: Request) {
  const body = await req.json();

  const args = [
    "--name", body.name ?? "",
    "--role_title", body.role_title ?? "",
    "--level", String(body.level ?? 1),
    "--xp", String(body.xp ?? 0),
    "--skills", body.skills ?? "",
    "--stats_hours", String(body.stats_hours ?? 0),
    "--stats_co2", String(body.stats_co2 ?? 0),
  ];

  const result = await runPijakBackend("add-user", args);

  return NextResponse.json(result, {
    status: result.ok ? 200 : 400,
  });
}