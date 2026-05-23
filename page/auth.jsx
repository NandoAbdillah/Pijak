import { useState, useEffect } from 'react';
import { FadeUp } from "@/components/motion/anim";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/uis";

/**
 * @param {{ setCurrentPage: (page: string) => void, setGlobalUser: (user: any) => void }} props
 */
export const AuthScreen = ({ setCurrentPage, setGlobalUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [otpStep, setOtpStep] = useState(false); // State baru untuk Tahap 2 (Input OTP)
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Form States
  const [fullName, setFullName] = useState("");
  const [authKey, setAuthKey] = useState(""); // Email atau No HP
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState(""); // State baru untuk Kode OTP

  // Fungsi helper untuk nampilin error di UI sekaligus memunculkan Alert popup
  const showError = (msg) => {
    setErrorMsg(msg);
    alert("⚠️ ERROR: " + msg); // Menampilkan alert sesuai permintaanmu
  };

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    alert("✅ SUKSES: " + msg);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (isForgot) {
        // ==========================================
        // LUPA PASSWORD (2 TAHAP)
        // ==========================================
        if (!otpStep) {
          // TAHAP 1: Minta OTP
          if (!authKey) return showError("Email atau Nomor HP wajib diisi!");
          
          const res = await fetch('/api/auth', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'forgot', authKey })
          });
          const result = await res.json();
          
          if (result.ok) {
            // Kita tampilkan dummy_otp di UI untuk kemudahan testing
            const msg = result.message + ` (Bocoran OTP: ${result.dummy_otp})`;
            setSuccessMsg(msg);
            setOtpStep(true); // Lanjut ke tahap input OTP
          } else {
            showError(result.error);
          }
        } else {
          // TAHAP 2: Verifikasi OTP & Password Baru
          if (!otpCode || !password) return showError("Kode OTP dan Password Baru wajib diisi!");
          
          const res = await fetch('/api/auth', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            // Asumsi API routes meneruskan otp dan newPassword ke C++
            body: JSON.stringify({ action: 'forgot_verify', authKey, otp: otpCode, newPassword: password })
          });
          const result = await res.json();
          
          if (result.ok) {
            showSuccess(result.message);
            // Reset state kembali ke mode Login
            setIsForgot(false);
            setIsLogin(true);
            setOtpStep(false);
            setPassword("");
            setOtpCode("");
          } else {
            showError(result.error);
          }
        }
      } else if (isLogin) {
        // ==========================================
        // LOGIKA LOGIN
        // ==========================================
        if (!authKey || !password) return showError("Email/No HP dan Password wajib diisi!");

        const res = await fetch('/api/auth', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'login', authKey, password })
        });
        const result = await res.json();

        if (result.ok) {
          showSuccess("Selamat datang kembali, " + result.data.name + "!");
          if(setGlobalUser) setGlobalUser(result.data);
          setCurrentPage('beranda');
        } else {
          showError(result.error);
        }

      } else {
        // ==========================================
        // LOGIKA REGISTER
        // ==========================================
        if (!fullName || !authKey || !password) {
          return showError('Semua kolom wajib diisi kawan!');
        }

        const isEmail = authKey.includes('@');
        const res = await fetch('/api/auth', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'register',
            name: fullName,
            email: isEmail ? authKey : '',
            phone: !isEmail ? authKey : '',
            password
          })
        });

        const result = await res.json();

        if (result.ok) {
          showSuccess("Akun berhasil dibuat! Silakan mulai berkarya.");
          if(setGlobalUser) setGlobalUser(result.data);
          setCurrentPage('beranda');
        } else {
          showError(result.error);
        }
      }
    } catch (error) {
      console.error(error);
      showError('Waduh, gagal connect ke Backend. Pastikan API dan C++ nyala!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F6F3EA] relative overflow-hidden px-4">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#A8C3A0] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#E7DCCB] rounded-full mix-blend-multiply filter blur-[120px] opacity-40 pointer-events-none"></div>

      <FadeUp className="bg-white border border-[#DDD6C8] rounded-3xl shadow-sm w-full max-w-md p-8 sm:p-10 relative z-10 flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 bg-[#1F4D3A] rounded-xl flex items-center justify-center text-white font-bold font-sora text-2xl rounded-tl-sm rounded-br-3xl">P</div>
          <h1 className="font-sora font-bold text-3xl text-[#1B1B1B] tracking-tight">Pijak</h1>
        </div>

        {/* Headings */}
        <h2 className="font-sora font-bold text-2xl text-[#1B1B1B] mb-2 text-center">
          {isForgot ? 'Reset Password' : isLogin ? 'Selamat datang kembali!' : 'Mulai langkah kecilmu.'}
        </h2>
        <p className="text-[13px] text-[#6E6E6E] text-center mb-6">
          {isForgot ? 'Amankan kembali akunmu untuk terus berkarya.' : isLogin ? 'Masuk untuk melanjutkan karya dan kontribusimu.' : 'Daftar sekarang dan temukan peluang kolaborasi nyata.'}
        </p>

        {/* Pesan UI */}
        {errorMsg && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl text-center font-medium">{errorMsg}</div>}
        {successMsg && <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl text-center font-medium">{successMsg}</div>}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="popLayout">
            {/* Input Nama (Hanya untuk Register) */}
            {!isLogin && !isForgot && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                <label className="block text-xs font-semibold text-[#1B1B1B] mb-1.5">Nama Lengkap</label>
                <input type="text" value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Contoh: Raka Mahendra" className="w-full bg-[#FCFBF8] border border-[#DDD6C8] rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#5F8B6D] focus:ring-1 focus:ring-[#5F8B6D] transition-all placeholder:text-[#A8C3A0]" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input AuthKey (Email / Phone) */}
          <div>
            <label className="block text-xs font-semibold text-[#1B1B1B] mb-1.5">Email / No. HP</label>
            <input 
              type="text" 
              value={authKey} 
              onChange={e=>setAuthKey(e.target.value)} 
              disabled={otpStep} // Disabled jika sedang di tahap OTP
              placeholder="contoh@email.com atau 0812..." 
              className={`w-full bg-[#FCFBF8] border border-[#DDD6C8] rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#5F8B6D] focus:ring-1 focus:ring-[#5F8B6D] transition-all placeholder:text-[#A8C3A0] ${otpStep ? 'opacity-60 cursor-not-allowed' : ''}`} 
            />
          </div>

          <AnimatePresence mode="popLayout">
            {/* Input Tambahan Khusus Tahap OTP (Lupa Password Tahap 2) */}
            {isForgot && otpStep && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1B1B1B] mb-1.5">Kode OTP (6 Digit)</label>
                  <input type="text" value={otpCode} onChange={e=>setOtpCode(e.target.value)} placeholder="123456" maxLength={6} className="w-full bg-[#FCFBF8] border border-[#DDD6C8] rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#5F8B6D] focus:ring-1 focus:ring-[#5F8B6D] transition-all tracking-widest font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1B1B1B] mb-1.5">Password Baru</label>
                  <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-[#FCFBF8] border border-[#DDD6C8] rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#5F8B6D] focus:ring-1 focus:ring-[#5F8B6D] transition-all" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Password (Untuk Login dan Register) */}
          {!isForgot && (
            <div>
              <label className="block text-xs font-semibold text-[#1B1B1B] mb-1.5">Password</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-[#FCFBF8] border border-[#DDD6C8] rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#5F8B6D] focus:ring-1 focus:ring-[#5F8B6D] transition-all placeholder:text-[#A8C3A0]" />
            </div>
          )}

          {/* Tombol Lupa Password */}
          {isLogin && !isForgot && (
            <div className="flex justify-end mt-2">
              <button type="button" onClick={() => { setIsForgot(true); setErrorMsg(""); setSuccessMsg(""); }} className="text-[11px] font-semibold text-[#5F8B6D] hover:text-[#1F4D3A] transition-colors">
                Lupa password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" disabled={isLoading} className="w-full mt-8 py-3.5 text-sm font-bold shadow-md hover:shadow-lg transition-all">
            {isLoading 
              ? 'Memproses...' 
              : isForgot 
                ? (otpStep ? 'Simpan Password Baru' : 'Kirim Kode OTP') 
                : isLogin ? 'Masuk ke Pijak' : 'Daftar Akun'}
          </Button>
        </form>

        {/* Divider & Toggle Form */}
        <div className="relative flex items-center py-6">
          <div className="flex-grow border-t border-[#DDD6C8]"></div>
          <span className="flex-shrink-0 mx-4 text-[#6E6E6E] text-[11px] font-medium">Atau</span>
          <div className="flex-grow border-t border-[#DDD6C8]"></div>
        </div>

        <p className="text-[12px] text-center text-[#6E6E6E] font-medium">
          {isForgot ? 'Ingat passwordnya? ' : isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setIsForgot(false);
              setOtpStep(false);
              setErrorMsg("");
              setSuccessMsg("");
            }} 
            className="text-[#1F4D3A] font-bold hover:underline transition-all"
          >
            {isForgot ? 'Kembali Login' : isLogin ? 'Daftar sekarang' : 'Masuk di sini'}
          </button>
        </p>
      </FadeUp>
    </div>
  );
};