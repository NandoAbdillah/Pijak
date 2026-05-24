import { NextResponse } from "next/server";
import { runPijakBackend } from "@/libs/backend";

export const runtime = "nodejs";


function sanitizeText(value: unknown): string {
  return String(value ?? "")
    .replace(/\r/g, " ")
    .replace(/\n/g, " ")
    .replace(/\t/g, " ")
    .replace(/"/g, '\\"')
    .trim();
}

/**
 * Normalisasi angka / string kosong
 */
function normalizeValue(value: unknown): string {
  const v = sanitizeText(value);
  return v === "" ? "" : v;
}

// GET: Ambil semua data
export async function GET() {
  try {
    const result = await runPijakBackend("list-opportunities");

    return NextResponse.json(result, {
      status: result.ok ? 200 : 400,
    });
  } catch (error) {
    console.error("GET /api/opportunities error:", error);
    return NextResponse.json(
      { ok: false, error: "Gagal mengambil data peluang" },
      { status: 500 },
    );
  }
}

// POST: Tambah peluang baru dan simpan ke CSV via backend
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const creatorId = normalizeValue(body.creator_id);
    const title = sanitizeText(body.title);
    const type = sanitizeText(body.type);
    const category = sanitizeText(body.category);
    const location = sanitizeText(body.location);
    const reward = sanitizeText(body.reward);
    const deadline = sanitizeText(body.deadline);
    const status = sanitizeText(body.status) || "Open";

    const description = sanitizeText(body.description);
    const duration = sanitizeText(body.duration);
    const weeklyTime = sanitizeText(body.weekly_time);
    const experienceLevel = sanitizeText(body.experience_level);

    // Validasi minimal
    if (!creatorId) {
      return NextResponse.json(
        { ok: false, error: "creator_id wajib diisi" },
        { status: 400 },
      );
    }

    if (!title) {
      return NextResponse.json(
        { ok: false, error: "title wajib diisi" },
        { status: 400 },
      );
    }

    if (!type) {
      return NextResponse.json(
        { ok: false, error: "type wajib diisi" },
        { status: 400 },
      );
    }

    // Argumen utama yang wajib dipakai backend C++
    const args = [
      "--creator_id",
      creatorId,
      "--title",
      title,
      "--type",
      type,
      "--category",
      category,
      "--location",
      location,
      "--reward",
      reward,
      "--deadline",
      deadline,
      "--status",
      status,
    ];

    // Kalau backend C++ kamu mendukung field tambahan, ikut kirim.
    // Kalau belum, bagian ini tetap aman karena hanya jadi argumen opsional.
    if (description) {
      args.push("--description", description);
    }

    if (duration) {
      args.push("--duration", duration);
    }

    if (weeklyTime) {
      args.push("--weekly_time", weeklyTime);
    }

    if (experienceLevel) {
      args.push("--experience_level", experienceLevel);
    }

    const result = await runPijakBackend("add-opportunity", args);

    return NextResponse.json(result, {
      status: result.ok ? 200 : 400,
    });
  } catch (error) {
    console.error("POST /api/opportunities error:", error);
    return NextResponse.json(
      { ok: false, error: "Gagal menambahkan peluang" },
      { status: 500 },
    );
  }
}

// PUT: Sorting / algoritma backend
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    if (body?.action === "sort") {
      const result = await runPijakBackend("sort-opportunities");
      return NextResponse.json(result, {
        status: result.ok ? 200 : 400,
      });
    }

    return NextResponse.json(
      { ok: false, error: "Aksi tidak valid" },
      { status: 400 },
    );
  } catch (error) {
    console.error("PUT /api/opportunities error:", error);
    return NextResponse.json(
      { ok: false, error: "Gagal memproses permintaan" },
      { status: 500 },
    );
  }
}