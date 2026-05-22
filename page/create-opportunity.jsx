import {
  User,
  ArrowRight,
  Leaf,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  Clock,
  TrendingUp,
  PenLine,
  Briefcase,
  HeartHandshake,
  Users,
  ArrowRightLeft,
  Check,
  ClipboardList,
  Calendar,
  Globe,
  Building2,
  MonitorSmartphone,
  Award,
  Coffee,
  CheckSquare,
} from "lucide-react";

import {
  FadeUp,
} from "@/components/motion/anim";

import { Button, Label,Input, Select, CardSelector, Textarea, Badge
 } from "@/components/ui/uis";
import { useState } from "react";

export const BuatPeluangMain = () => {
  const [activeTipe, setActiveTipe] = useState("freelance");
  const [activeLokasi, setActiveLokasi] = useState("online");
  const [activeTingkat, setActiveTingkat] = useState("beginner");

  return (
    <div className="max-w-[850px] mx-auto pb-10">
      {/* Header & Stepper */}
      <FadeUp className="mt-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#DDD6C8] pb-6">
        <div>
          <h1 className="font-sora font-bold text-3xl text-[#1B1B1B] flex items-center gap-3">
            Buat Peluang <Leaf className="text-[#5F8B6D] w-7 h-7" />
          </h1>
          <p className="text-xs text-[#6E6E6E] mt-2">
            Isi detail peluangmu. Semakin jelas, semakin mudah ditemukan talenta
            terbaik!
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-8 h-8 rounded-full bg-[#1F4D3A] text-white flex items-center justify-center shadow-sm">
              <ClipboardList size={14} />
            </div>
            <span className="text-[10px] font-semibold text-[#1B1B1B]">
              1. Detail
            </span>
          </div>
          <div className="w-8 h-px bg-[#DDD6C8] -mt-4"></div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-8 h-8 rounded-full bg-white border border-[#DDD6C8] text-[#A8C3A0] flex items-center justify-center">
              <CheckSquare size={14} />
            </div>
            <span className="text-[10px] font-medium text-[#6E6E6E]">
              2. Kebutuhan
            </span>
          </div>
          <div className="w-8 h-px bg-[#DDD6C8] -mt-4"></div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-8 h-8 rounded-full bg-white border border-[#DDD6C8] text-[#A8C3A0] flex items-center justify-center">
              <Check size={14} />
            </div>
            <span className="text-[10px] font-medium text-[#6E6E6E]">
              3. Preview
            </span>
          </div>
        </div>
      </FadeUp>

      <form className="space-y-10">
        {/* SECTION 1: Informasi Dasar */}
        <FadeUp delay={0.1} className="space-y-6">
          <h2 className="font-sora font-bold text-lg text-[#1B1B1B]">
            1. Informasi Dasar
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label required>Judul Peluang</Label>
              <div className="relative">
                <Input placeholder="Contoh: Desain Konten Instagram untuk UMKM Kopi" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#A8C3A0]">
                  0/80
                </span>
              </div>
            </div>
            <div>
              <Label required>Kategori</Label>
              <Select >
                <option value="" disabled hidden>
                  Pilih kategori
                </option>
                <option value="desain">Desain</option>
                <option value="marketing">Marketing</option>
                <option value="penulisan">Penulisan</option>
                <option value="data">Data</option>
                <option value="video">Video</option>
                <option value="lingkungan">Lingkungan</option>
              </Select>
            </div>
          </div>

          <div>
            <Label required>Tipe Peluang</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <CardSelector
                icon={Briefcase}
                title="Freelance"
                desc="Berbayar"
                active={activeTipe === "freelance"}
                onClick={() => setActiveTipe("freelance")}
              />
              <CardSelector
                icon={HeartHandshake}
                title="Volunteer"
                desc="Tanpa bayaran"
                active={activeTipe === "volunteer"}
                onClick={() => setActiveTipe("volunteer")}
              />
              <CardSelector
                icon={Users}
                title="Kolaborasi"
                desc="Kerja sama proyek"
                active={activeTipe === "kolaborasi"}
                onClick={() => setActiveTipe("kolaborasi")}
              />
              <CardSelector
                icon={ArrowRightLeft}
                title="Skill Exchange"
                desc="Tukar skill"
                active={activeTipe === "exchange"}
                onClick={() => setActiveTipe("exchange")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5 items-start">
            <div>
              <Label required>Deskripsi Singkat</Label>
              <div className="relative">
                <Textarea
                  rows="4"
                  placeholder="Jelaskan secara singkat tentang peluang ini, tujuan, dan hasil yang diharapkan."
                />
                <span className="absolute right-3 bottom-3 text-[10px] text-[#A8C3A0]">
                  0/200
                </span>
              </div>
            </div>
            <div className="bg-[#F0F4F1] rounded-2xl p-4 border border-[#A8C3A0]/30 mt-7 relative overflow-hidden">
              <h4 className="font-sora font-semibold text-xs text-[#1F4D3A] flex items-center gap-1.5 mb-2">
                Tips <Sparkles size={12} className="text-[#F5B041]" />
              </h4>
              <ul className="text-[10px] text-[#5F8B6D] space-y-1.5 list-disc pl-3">
                <li>Jelaskan tujuan dan manfaat</li>
                <li>Sebutkan hasil akhir yang diharapkan</li>
                <li>Tulis dengan jelas & singkat</li>
              </ul>
              <Leaf className="absolute -bottom-2 -right-2 text-[#A8C3A0]/20 w-12 h-12" />
            </div>
          </div>
        </FadeUp>

        {/* SECTION 2: Detail Pekerjaan */}
        <FadeUp
          delay={0.2}
          className="space-y-6 pt-4 border-t border-[#DDD6C8]/50"
        >
          <h2 className="font-sora font-bold text-lg text-[#1B1B1B]">
            2. Detail Pekerjaan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <Label required>Durasi Pengerjaan</Label>
              <Select >
                <option value="" disabled hidden>
                  Pilih durasi
                </option>
                <option value="1m">1 Minggu</option>
                <option value="2m">2 Minggu</option>
                <option value="1b">1 Bulan</option>
                <option value="flex">Fleksibel</option>
              </Select>
            </div>
            <div>
              <Label required>Perkiraan Waktu per Minggu</Label>
              <Input placeholder="Contoh: 2-3 jam/minggu" />
            </div>
            <div>
              <Label required>Deadline</Label>
              <div className="relative">
                <Input type="date" className="pl-4 pr-10" />
                <Calendar
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6E6E6E] pointer-events-none"
                />
              </div>
            </div>
          </div>

          <div>
            <Label required>Lokasi Pekerjaan</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <CardSelector
                icon={Globe}
                title="Online"
                desc="Dikerjakan jarak jauh"
                active={activeLokasi === "online"}
                onClick={() => setActiveLokasi("online")}
              />
              <CardSelector
                icon={Building2}
                title="Offline"
                desc="Bertempat di lokasi"
                active={activeLokasi === "offline"}
                onClick={() => setActiveLokasi("offline")}
              />
              <CardSelector
                icon={MonitorSmartphone}
                title="Hybrid"
                desc="Kombinasi online & offline"
                active={activeLokasi === "hybrid"}
                onClick={() => setActiveLokasi("hybrid")}
              />
            </div>
          </div>

          <div>
            <Label required>Tingkat Pengalaman yang Dicari</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <CardSelector
                icon={PenLine}
                title="Beginner"
                desc="Pemula"
                active={activeTingkat === "beginner"}
                onClick={() => setActiveTingkat("beginner")}
              />
              <CardSelector
                icon={TrendingUp}
                title="Intermediate"
                desc="Menengah"
                active={activeTingkat === "intermediate"}
                onClick={() => setActiveTingkat("intermediate")}
              />
              <CardSelector
                icon={Award}
                title="Advanced"
                desc="Lanjutan"
                active={activeTingkat === "advanced"}
                onClick={() => setActiveTingkat("advanced")}
              />
              <CardSelector
                icon={CheckCircle2}
                title="Semua Level"
                desc="Terbuka untuk semua"
                active={activeTingkat === "semua"}
                onClick={() => setActiveTingkat("semua")}
              />
            </div>
          </div>
        </FadeUp>

        {/* Bottom Banner & CTA */}
        <FadeUp delay={0.3} className="pt-8">
          <div className="bg-[#F6F3EA] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between border border-[#DDD6C8] gap-6 relative overflow-hidden">
            {/* Background doodly mountains dummy */}
            <div className="absolute left-0 bottom-0 opacity-40 pointer-events-none">
              <svg
                width="150"
                height="60"
                viewBox="0 0 150 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 60L30 30L60 50L100 10L150 60H0Z" fill="#E7DCCB" />
                <path
                  d="M40 60L70 20L110 45L130 30L150 60H40Z"
                  fill="#A8C3A0"
                />
              </svg>
            </div>

            <div className="relative z-10 flex items-center gap-4 pl-4 md:pl-28">
              {/* People doodle dummy */}
              <div className="hidden md:flex absolute left-4 bottom-0 text-[#1F4D3A]">
                <Users size={40} strokeWidth={1} />
              </div>
              <h3 className="font-sora font-semibold text-[#1B1B1B] text-sm italic">
                Peluang kecil hari ini,
                <br />
                bisa jadi pengalaman besar esok hari.
              </h3>
            </div>

            <Button
              variant="primary"
              className="relative z-10 w-full md:w-auto px-8"
            >
              Selanjutnya <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </FadeUp>
      </form>
    </div>
  );
};

export const BuatPeluangRightSidebar = () => (
  <aside className="w-[340px] h-screen sticky top-0 bg-[#FCFBF8] border-l border-[#DDD6C8] flex flex-col py-8 px-6 z-20 flex-shrink-0 overflow-y-auto hide-scrollbar">
    {/* Preview Peluang */}
    <div className="mb-6">
      <h3 className="font-sora font-bold text-sm text-[#1B1B1B] mb-4">
        Preview Peluang
      </h3>

      {/* Mini Card Preview */}
      <div className="bg-white rounded-3xl p-5 border border-[#DDD6C8] shadow-sm flex flex-col relative overflow-hidden group">
        <Badge className="bg-orange-100 text-orange-700 w-fit mb-3">
          Freelance
        </Badge>

        <div className="flex gap-4 items-start mb-4">
          <div className="flex-1">
            <h4 className="font-sora font-semibold text-[#1B1B1B] text-[13px] leading-snug mb-1">
              Desain Konten Instagram untuk UMKM Kopi
            </h4>
            <p className="text-[10px] text-[#6E6E6E]">Desain • Online</p>
          </div>
          {/* Dummy Illustration for preview */}
          <div className="w-16 h-16 bg-[#F6F3EA] rounded-xl flex items-center justify-center text-[#5F8B6D] flex-shrink-0">
            <Coffee size={24} strokeWidth={1.5} />
          </div>
        </div>

        <p className="text-[10px] text-[#6E6E6E] leading-relaxed mb-5 line-clamp-3">
          Membuat 10 konten Instagram feed yang menarik dan sesuai branding
          untuk meningkatkan engagement dan penjualan produk kopi.
        </p>

        <div className="space-y-2 mt-auto">
          <div className="flex items-center text-[10px] text-[#1B1B1B]">
            <Clock size={12} className="text-[#A8C3A0] w-5" />
            <span className="text-[#6E6E6E] w-24">Durasi</span>
            <span className="font-medium">2 Minggu</span>
          </div>
          <div className="flex items-center text-[10px] text-[#1B1B1B]">
            <Calendar size={12} className="text-[#A8C3A0] w-5" />
            <span className="text-[#6E6E6E] w-24">Deadline</span>
            <span className="font-medium">20 Mei 2024</span>
          </div>
          <div className="flex items-center text-[10px] text-[#1B1B1B]">
            <User size={12} className="text-[#A8C3A0] w-5" />
            <span className="text-[#6E6E6E] w-24">Tingkat</span>
            <span className="font-medium">Semua Level</span>
          </div>
        </div>
      </div>
    </div>

    {/* Benefit Card */}
    <div className="bg-[#E7F0E9] rounded-2xl p-5 mb-4 border border-[#A8C3A0]/30 relative overflow-hidden">
      <h4 className="font-sora font-semibold text-xs text-[#1F4D3A] mb-3">
        Yang akan kamu dapatkan
      </h4>
      <ul className="space-y-2 text-[10px] text-[#1F4D3A] font-medium z-10 relative">
        <li className="flex items-start gap-1.5">
          <Check size={12} className="mt-0.5 flex-shrink-0" /> Talent
          berkualitas sesuai kebutuhanmu
        </li>
        <li className="flex items-start gap-1.5">
          <Check size={12} className="mt-0.5 flex-shrink-0" /> Proses kerja
          mudah & terstruktur
        </li>
        <li className="flex items-start gap-1.5">
          <Check size={12} className="mt-0.5 flex-shrink-0" /> Dampak positif
          untuk komunitas
        </li>
      </ul>
      <HeartHandshake className="absolute -bottom-4 -right-4 w-20 h-20 text-[#A8C3A0] opacity-30" />
    </div>

    {/* Checklist Card */}
    <div className="bg-[#FCF5E3] rounded-2xl p-5 mb-6 border border-[#F5B041]/30 relative overflow-hidden">
      <h4 className="font-sora font-semibold text-xs text-[#B77B57] mb-3">
        Pastikan sebelum lanjut
      </h4>
      <ul className="space-y-2 text-[10px] text-[#B77B57] font-medium z-10 relative">
        <li className="flex items-start gap-1.5">
          <Check size={12} className="mt-0.5 flex-shrink-0" /> Judul jelas dan
          menarik
        </li>
        <li className="flex items-start gap-1.5">
          <Check size={12} className="mt-0.5 flex-shrink-0" /> Deskripsi mudah
          dipahami
        </li>
        <li className="flex items-start gap-1.5">
          <Check size={12} className="mt-0.5 flex-shrink-0" /> Detail pekerjaan
          lengkap
        </li>
        <li className="flex items-start gap-1.5">
          <Check size={12} className="mt-0.5 flex-shrink-0" /> Kategori & tipe
          sudah tepat
        </li>
      </ul>
      <Sparkles className="absolute top-1/2 -right-4 -translate-y-1/2 w-16 h-16 text-[#F5B041] opacity-20" />
    </div>

    {/* Inspiration Card */}
    <div className="mt-auto bg-white border border-[#DDD6C8] rounded-2xl p-5 relative overflow-hidden shadow-sm">
      <h4 className="font-sora font-semibold text-xs text-[#1B1B1B] mb-2">
        Butuh contoh inspirasi?
      </h4>
      <p className="text-[10px] text-[#6E6E6E] mb-4 pr-10">
        Lihat contoh peluang sukses dari pengguna Pijak lainnya.
      </p>
      <button className="text-[10px] font-semibold text-[#1B1B1B] border border-[#DDD6C8] rounded-full px-4 py-1.5 hover:bg-[#F6F3EA] transition-colors flex items-center gap-1.5 w-fit">
        Lihat Contoh <ArrowRight size={10} />
      </button>
      <Lightbulb className="absolute bottom-4 right-4 w-10 h-10 text-[#5F8B6D] opacity-60" />
    </div>
  </aside>
);