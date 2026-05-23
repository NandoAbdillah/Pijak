import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";

const execFileAsync = promisify(execFile);

const backendDir = path.join(process.cwd(), "backend");
const backendExe = path.join(backendDir, "pijak.exe");

type BackendResult = {
  ok: boolean;
  message?: string;
  error?: string;
  data?: unknown;
};

export async function runPijakBackend(
  command: string,
  args: string[] = []
): Promise<BackendResult> {
  try {
    // Tetap jalankan, kalau exit code != 0, dia bakal loncat ke blok catch
    const { stdout } = await execFileAsync(backendExe, [command, ...args], {
      cwd: backendDir,
      windowsHide: true,
      maxBuffer: 1024 * 1024 * 10,
    });

    return JSON.parse(stdout.toString());
  } catch (error: any) {
    // --- TRIK DI SINI ---
    // Meskipun C++ return 1, dia tetap menulis output ke stdout.
    // Kita cek apakah error tersebut punya property 'stdout' (biasanya ada di execFile error)
    if (error.stdout) {
      try {
        const parsed = JSON.parse(error.stdout.toString());
        // Kalau berhasil di-parse, berarti itu JSON error dari C++ kita, bukan error crash/sistem
        return parsed;
      } catch (e) {
        // Kalau gagal parse, berarti emang beneran error sistem/crash
      }
    }

    // Kalau bukan JSON (beneran crash), kembalikan error biasa
    return {
      ok: false,
      error: error?.message ?? "Gagal menjalankan backend C++",
    };
  }
}