import { NextResponse } from "next/server";
import { runPijakBackend } from "@/libs/backend";

export const runtime = "nodejs";

// GET: Ambil semua data (List)
export async function GET() {
  const result = await runPijakBackend("list-opportunities");
  return NextResponse.json(result, {
    status: result.ok ? 200 : 400,
  });
}

// POST: Tambah Peluang Baru
export async function POST(req: Request) {
  const body = await req.json();

  const args = [
    "--creator_id", body.creator_id ?? "",
    "--title", body.title ?? "",
    "--type", body.type ?? "",
    "--category", body.category ?? "",
    "--location", body.location ?? "",
    "--reward", body.reward ?? "",
    "--deadline", body.deadline ?? "",
    "--status", body.status ?? "Open",
  ];

  const result = await runPijakBackend("add-opportunity", args);

  return NextResponse.json(result, {
    status: result.ok ? 200 : 400,
  });
}

// PUT: Panggil Logika Algoritma (Sorting / Tree) dari C++
export async function PUT(req: Request) {
  const body = await req.json();
  
  if (body.action === "sort") {
    // Memanggil algoritma sorting C++ yang akan mengurutkan berdasarkan Reward
    const result = await runPijakBackend("sort-opportunities");
    return NextResponse.json(result, {
      status: result.ok ? 200 : 400,
    });
  }

  return NextResponse.json({ ok: false, error: "Aksi tidak valid" }, { status: 400 });
}