import { NextResponse } from 'next/server';
import { runPijakBackend } from '@/libs/backend';

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, authKey, password, name, email, phone, otp, newPassword } = body;

    let command = '';
    let args: string[] = [];

    // ========================================================
    // MAPPING ACTION KE COMMAND & ARGS C++
    // ========================================================
    if (action === 'login') {
      command = 'login';
      args = [
        '--auth', authKey ?? '', 
        '--password', password ?? ''
      ];
      
    } else if (action === 'register') {
      command = 'register';
      args = [
        '--name', name ?? '', 
        '--email', email ?? '', 
        '--phone', phone ?? '', 
        '--password', password ?? ''
      ];
      
    } else if (action === 'forgot') {
      // Tahap 1: Meminta OTP
      command = 'forgot-password';
      args = [
        '--auth', authKey ?? ''
      ];
      
    } else if (action === 'forgot_verify') {
      // Tahap 2: Verifikasi OTP & Ganti Password Baru
      command = 'forgot-password';
      args = [
        '--auth', authKey ?? '', 
        '--otp', otp ?? '', 
        '--new_password', newPassword ?? ''
      ];
      
    } else {
      return NextResponse.json({ ok: false, error: 'Aksi tidak dikenali' }, { status: 400 });
    }

    // Eksekusi menggunakan Helper sakti buatanmu
    const result = await runPijakBackend(command, args);
    
    // Console log untuk debugging di terminal Next.js
    console.log(`[API Auth ${command}]:`, result);

    return NextResponse.json(result, {
      status: result.ok ? 200 : 400,
    });
    
  } catch (error) {
    console.error("Gagal eksekusi API Auth:", error);
    return NextResponse.json({ 
      ok: false, 
      error: "Waduh, gagal terhubung ke Backend C++." 
    }, { status: 500 });
  }
}