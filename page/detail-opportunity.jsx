import {
  Leaf,
  CheckCircle2,
  Clock,
  TrendingUp,
  Briefcase,
  HeartHandshake,
  Calendar,
  Globe,
  CheckSquare,
  ArrowLeft,
  Bookmark,
  Share2,
  MoreVertical,
  Star,
  Layers,
  Fingerprint,
  ChevronRight,
  Globe2,
  BadgeCheck,
  CreditCard,
  Languages,
  Trees,
  Palette,
  Clapperboard,
} from "lucide-react";
import { Badge } from "@/components/ui/uis";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/anim";

import { useState } from "react";
import { motion } from "framer-motion";

/**
 * @param {{ setCurrentPage: (page: string) => void }} props
 */
export const DetailPeluangMain = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState("tentang");
  const tabs = [
    { id: "tentang", label: "Tentang" },
    { id: "kebutuhan", label: "Kebutuhan" },
    { id: "detail", label: "Detail Pekerjaan" },
    { id: "ulasan", label: "Penilaian & Ulasan" },
  ];

  return (
    <div className="max-w-[850px] mx-auto pb-10">
      {/* Header Actions */}
      <FadeUp className="mt-4 mb-6 flex items-center justify-between">
        <button
          onClick={() => setCurrentPage("jelajah")}
          className="flex items-center gap-2 text-xs font-semibold text-[#6E6E6E] hover:text-[#1F4D3A] transition-colors"
        >
          <ArrowLeft size={16} /> Kembali ke Jelajah
        </button>
        <div className="flex items-center gap-4 text-[#6E6E6E]">
          <button className="hover:text-[#1B1B1B] transition-colors">
            <Bookmark size={18} strokeWidth={1.5} />
          </button>
          <button className="hover:text-[#1B1B1B] transition-colors">
            <Share2 size={18} strokeWidth={1.5} />
          </button>
          <button className="hover:text-[#1B1B1B] transition-colors">
            <MoreVertical size={18} strokeWidth={1.5} />
          </button>
        </div>
      </FadeUp>

      {/* Hero Section */}
      <FadeUp
        delay={0.1}
        className="flex flex-col-reverse md:flex-row gap-8 mb-10"
      >
        <div className="flex-1">
          <Badge className="bg-[#E7F0E9] text-[#1F4D3A] mb-4 inline-block">
            Freelance
          </Badge>
          <h1 className="font-sora font-bold text-3xl md:text-4xl text-[#1B1B1B] leading-tight mb-3">
            Desain Konten Instagram untuk UMKM Kopi
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[#6E6E6E] mb-5">
            <span>Desain grafis</span>
            <div className="w-1 h-1 bg-[#DDD6C8] rounded-full"></div>
            <span>Online</span>
            <div className="w-1 h-1 bg-[#DDD6C8] rounded-full"></div>
            <span className="flex items-center gap-1 text-[#1B1B1B]">
              <Star size={12} className="fill-[#F5B041] text-[#F5B041]" /> 4.8
              (26)
            </span>
          </div>
          <p className="text-[13px] text-[#6E6E6E] leading-relaxed max-w-lg">
            Membuat 10 konten Instagram feed yang menarik dan sesuai branding
            untuk meningkatkan engagement dan penjualan produk kopi.
          </p>
        </div>

        {/* Dummy Illustration Box */}
        <div className="w-full md:w-[220px] h-[160px] bg-[#F6F3EA] rounded-3xl flex items-center justify-center relative overflow-hidden border border-[#DDD6C8] flex-shrink-0">
          <Leaf className="absolute -left-4 -top-2 text-[#A8C3A0]/30 w-24 h-24 rotate-12" />
          <div className="relative z-10 w-20 h-24 bg-[#E7F0E9] border-2 border-[#1F4D3A] rounded-b-2xl rounded-t-lg flex flex-col items-center justify-center">
            <div className="w-[110%] h-4 bg-white border-2 border-[#1F4D3A] absolute -top-4 rounded-full"></div>
            <Leaf size={24} className="text-[#5F8B6D]" />
          </div>
          {/* Decorative floating UI elements */}
          <div className="absolute top-4 right-4 bg-white border border-[#DDD6C8] rounded-md p-1.5 shadow-sm flex flex-col gap-1">
            <div className="w-8 h-8 bg-gray-200 rounded-sm"></div>
            <div className="flex items-center justify-between">
              <div className="w-3 h-1 bg-[#A8C3A0] rounded-full"></div>
              <HeartHandshake size={8} className="text-[#1F4D3A]" />
            </div>
          </div>
        </div>
      </FadeUp>

      {/* Info Stats Grid */}
      <FadeUp
        delay={0.2}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 border-y border-[#DDD6C8] py-6"
      >
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-[11px] text-[#6E6E6E] font-medium">
            <Clock size={16} /> Durasi
          </div>
          <span className="font-semibold text-[#1B1B1B] text-sm pl-6">
            2 Minggu
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-[11px] text-[#6E6E6E] font-medium">
            <Calendar size={16} /> Perkiraan Waktu
          </div>
          <span className="font-semibold text-[#1B1B1B] text-sm pl-6">
            2-3 jam/minggu
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-[11px] text-[#6E6E6E] font-medium">
            <Calendar size={16} /> Deadline
          </div>
          <span className="font-semibold text-[#1B1B1B] text-sm pl-6">
            20 Mei 2024
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-[11px] text-[#6E6E6E] font-medium">
            <Layers size={16} /> Tingkat
          </div>
          <span className="font-semibold text-[#1B1B1B] text-sm pl-6">
            Semua Level
          </span>
        </div>
      </FadeUp>

      {/* Content Tabs */}
      <FadeUp
        delay={0.3}
        className="border-b border-[#DDD6C8] flex gap-6 mb-8 overflow-x-auto hide-scrollbar"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-[13px] font-semibold whitespace-nowrap transition-colors relative ${
              activeTab === tab.id
                ? "text-[#1F4D3A]"
                : "text-[#6E6E6E] hover:text-[#1B1B1B]"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="detail-tab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1F4D3A]"
              />
            )}
          </button>
        ))}
      </FadeUp>

      {/* Tab Content: Tentang (Default) */}
      <div className="space-y-10">
        {/* Deskripsi */}
        <StaggerContainer>
          <StaggerItem>
            <h3 className="font-sora font-bold text-lg text-[#1B1B1B] mb-3">
              Deskripsi Peluang
            </h3>
            <p className="text-[13px] text-[#6E6E6E] leading-relaxed mb-6">
              Kami mencari kreator yang bisa membantu membuat konten Instagram
              feed yang menarik, konsisten dengan brand, dan mampu meningkatkan
              engagement audiens kopi lokal kami.
            </p>
            <div className="flex flex-wrap gap-4 md:gap-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E7F0E9] text-[#1F4D3A] flex items-center justify-center">
                  <Briefcase size={14} />
                </div>
                <span className="text-xs font-semibold text-[#1B1B1B] w-28 leading-tight">
                  Bangun portofolio nyata
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
                  <HeartHandshake size={14} />
                </div>
                <span className="text-xs font-semibold text-[#1B1B1B] w-28 leading-tight">
                  Dampak langsung ke bisnis lokal
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E7F0E9] text-[#5F8B6D] flex items-center justify-center">
                  <Leaf size={14} />
                </div>
                <span className="text-xs font-semibold text-[#1B1B1B] w-32 leading-tight">
                  Berkontribusi untuk ekonomi hijau
                </span>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>

        <div className="w-full flex justify-center">
          <Leaf size={16} className="text-[#A8C3A0]" strokeWidth={1.5} />
        </div>

        {/* List Tugas */}
        <StaggerContainer>
          <StaggerItem>
            <h3 className="font-sora font-bold text-lg text-[#1B1B1B] mb-4">
              Apa yang Akan Kamu Lakukan
            </h3>
            <ul className="space-y-3">
              {[
                "Mendesain 10 konten feed Instagram sesuai tema dan branding",
                "Menyesuaikan tone & feel agar selaras dengan audiens target",
                "Mengirim file final (JPG/PNG) beserta file mentah (PSD/AI/Figma)",
                "Berkolaborasi dengan tim untuk revisi jika diperlukan",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-[#5F8B6D] flex-shrink-0 mt-0.5"
                  />
                  <span className="text-[13px] text-[#1B1B1B]">{text}</span>
                </li>
              ))}
            </ul>
          </StaggerItem>
        </StaggerContainer>

        {/* Kriteria */}
        <StaggerContainer>
          <StaggerItem className="flex flex-col md:flex-row items-center gap-8 bg-white border border-[#DDD6C8] rounded-3xl p-6 shadow-sm">
            <div className="flex-1">
              <h3 className="font-sora font-bold text-lg text-[#1B1B1B] mb-4">
                Kriteria yang Dicari
              </h3>
              <ul className="space-y-2 list-disc pl-5 text-[13px] text-[#1B1B1B] marker:text-[#A8C3A0]">
                <li>Portofolio desain feed Instagram (wajib dilampirkan)</li>
                <li>Memahami prinsip desain & branding</li>
                <li>
                  Kreatif, detail-oriented, dan mampu bekerja dengan deadline
                </li>
                <li>Komunikatif dan terbuka terhadap feedback</li>
              </ul>
            </div>

            {/* Dummy Clipboard Illustration */}
            <div className="w-32 h-36 bg-[#F6F3EA] rounded-xl border border-[#DDD6C8] relative flex justify-center flex-shrink-0">
              <div className="w-24 h-32 bg-white border-2 border-[#1F4D3A] rounded-lg mt-2 relative z-10 flex flex-col p-2 gap-2">
                <div className="w-8 h-3 bg-[#1F4D3A] rounded absolute -top-1.5 left-1/2 -translate-x-1/2"></div>
                <div className="flex gap-2 items-center mt-3">
                  <CheckSquare size={12} className="text-[#5F8B6D]" />
                  <div className="h-1.5 flex-1 bg-[#DDD6C8] rounded-full"></div>
                </div>
                <div className="flex gap-2 items-center">
                  <CheckSquare size={12} className="text-[#5F8B6D]" />
                  <div className="h-1.5 w-10 bg-[#DDD6C8] rounded-full"></div>
                </div>
                <div className="flex gap-2 items-center">
                  <CheckSquare size={12} className="text-[#DDD6C8]" />
                  <div className="h-1.5 flex-1 bg-[#DDD6C8] rounded-full"></div>
                </div>
              </div>
              <Leaf
                className="absolute -left-4 bottom-2 text-[#5F8B6D] rotate-[-20deg]"
                size={28}
              />
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Skills */}
        <StaggerContainer>
          <StaggerItem>
            <h3 className="font-sora font-bold text-lg text-[#1B1B1B] mb-4">
              Skill yang Diinginkan
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {[
                "Canva",
                "Adobe Photoshop",
                "Adobe Illustrator",
                "Layout Design",
                "Branding",
              ].map((skill) => (
                <Badge
                  key={skill}
                  className="bg-[#F6F3EA] text-[#6E6E6E] border border-[#DDD6C8] px-3 py-1.5"
                >
                  {skill}
                </Badge>
              ))}
            </div>
            <button className="text-[11px] font-semibold text-[#5F8B6D] hover:text-[#1F4D3A] flex items-center gap-1">
              Lihat semua skill (12) <ChevronRight size={12} />
            </button>
          </StaggerItem>
        </StaggerContainer>

        {/* Dampak */}
        <StaggerContainer>
          <StaggerItem className="bg-[#FCFBF8] border border-[#DDD6C8] rounded-3xl p-6 mb-10 text-center">
            <h3 className="font-sora font-bold text-sm text-[#1B1B1B] mb-6">
              Dampak yang Dihasilkan
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#E7F0E9] text-[#1F4D3A] flex items-center justify-center">
                  <TrendingUp size={18} />
                </div>
                <h4 className="text-[11px] font-bold text-[#1B1B1B]">
                  Mendukung UMKM Lokal
                </h4>
                <p className="text-[9px] text-[#6E6E6E] max-w-[150px]">
                  Membantu brand lokal tumbuh lebih kuat.
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#E7F0E9] text-[#1F4D3A] flex items-center justify-center">
                  <Leaf size={18} />
                </div>
                <h4 className="text-[11px] font-bold text-[#1B1B1B]">
                  Edukasi Konsumsi Berkelanjutan
                </h4>
                <p className="text-[9px] text-[#6E6E6E] max-w-[150px]">
                  Mendorong gaya hidup sadar dan bertanggung jawab.
                </p>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#E7F0E9] text-[#1F4D3A] flex items-center justify-center">
                  <Globe2 size={18} />
                </div>
                <h4 className="text-[11px] font-bold text-[#1B1B1B]">
                  Ekonomi Hijau
                </h4>
                <p className="text-[9px] text-[#6E6E6E] max-w-[150px]">
                  Mendukung pertumbuhan ekonomi yang berkelanjutan.
                </p>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </div>
  );
};

/**
 * @param {{ setCurrentPage: (page: string) => void }} props
 */
export const DetailPeluangRightSidebar = ({ setCurrentPage }) => (
  <aside className="w-[360px] h-screen sticky top-0 bg-[#FCFBF8] border-l border-[#DDD6C8] flex flex-col py-8 px-6 z-20 flex-shrink-0 overflow-y-auto hide-scrollbar">
    {/* Action Card */}
    <div className="bg-[#1F4D3A] rounded-3xl p-6 text-white mb-6 shadow-md">
      <h3 className="font-sora font-semibold text-lg mb-2 leading-snug">
        Tertarik dengan peluang ini?
      </h3>
      <p className="text-[11px] text-white/80 mb-6 leading-relaxed">
        Kirimkan proposal terbaikmu dan jadilah bagian dari perubahan.
      </p>
      <div className="space-y-3">
        <button
          onClick={() => setCurrentPage("proposal")}
          className="w-full bg-white text-[#1F4D3A] text-sm font-semibold py-3 px-4 rounded-full hover:bg-[#E7DCCB] transition-colors shadow-sm"
        >
          Kirim Proposal
        </button>
        <button className="w-full bg-transparent border border-[#5F8B6D] text-white text-sm font-semibold py-3 px-4 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
          <Bookmark size={16} /> Simpan Peluang
        </button>
      </div>
    </div>

    {/* Organizer Profile */}
    <div className="mb-6">
      <h3 className="font-sora font-bold text-sm text-[#1B1B1B] mb-4">
        Tentang Penyelenggara
      </h3>
      <div className="bg-white border border-[#DDD6C8] rounded-3xl p-5 shadow-sm">
        <div className="flex gap-4 items-center mb-3">
          <div className="w-12 h-12 rounded-full bg-[#E7F0E9] text-[#1F4D3A] flex items-center justify-center font-bold text-xs text-center leading-tight">
            Kopi
            <br />
            Nusantara
          </div>
          <div>
            <h4 className="font-sora font-bold text-[#1B1B1B] text-[13px] flex items-center gap-1">
              Kopi Nusantara{" "}
              <BadgeCheck size={14} className="text-[#5F8B6D] fill-[#E7F0E9]" />
            </h4>
            <p className="text-[11px] text-[#6E6E6E] mb-1">UMKM Kopi Lokal</p>
            <div className="flex items-center gap-1 text-[10px] font-medium text-[#1B1B1B]">
              <Star size={10} className="fill-[#F5B041] text-[#F5B041]" /> 4.9{" "}
              <span className="text-[#6E6E6E]">(45 ulasan)</span>
            </div>
          </div>
        </div>
        <p className="text-[11px] text-[#6E6E6E] leading-relaxed mb-4">
          Kopi lokal berkualitas dari petani Indonesia yang berkomitmen pada
          keberlanjutan dan pemberdayaan komunitas.
        </p>
        <button className="w-full bg-[#1F4D3A] text-white text-xs font-semibold py-2 rounded-xl hover:bg-[#15382A] transition-colors">
          Lihat Profil
        </button>
      </div>
    </div>

    {/* Informasi Tambahan */}
    <div className="mb-8">
      <h3 className="font-sora font-bold text-sm text-[#1B1B1B] mb-4">
        Informasi Tambahan
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center py-2 border-b border-[#DDD6C8]/50 text-[11px]">
          <span className="text-[#6E6E6E] flex items-center gap-2">
            <Briefcase size={14} /> Tipe
          </span>
          <span className="font-semibold text-[#1B1B1B]">Freelance</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-[#DDD6C8]/50 text-[11px]">
          <span className="text-[#6E6E6E] flex items-center gap-2">
            <Globe size={14} /> Lokasi
          </span>
          <span className="font-semibold text-[#1B1B1B]">Online</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-[#DDD6C8]/50 text-[11px]">
          <span className="text-[#6E6E6E] flex items-center gap-2">
            <CreditCard size={14} /> Pembayaran
          </span>
          <span className="font-semibold text-[#1F4D3A] flex items-center gap-1">
            <HeartHandshake size={12} /> Non-komersial
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-[#DDD6C8]/50 text-[11px]">
          <span className="text-[#6E6E6E] flex items-center gap-2">
            <Languages size={14} /> Bahasa
          </span>
          <span className="font-semibold text-[#1B1B1B]">Indonesia</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-[#DDD6C8]/50 text-[11px]">
          <span className="text-[#6E6E6E] flex items-center gap-2">
            <Calendar size={14} /> Dibuat pada
          </span>
          <span className="font-semibold text-[#1B1B1B]">5 Mei 2024</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-[#DDD6C8]/50 text-[11px]">
          <span className="text-[#6E6E6E] flex items-center gap-2">
            <Fingerprint size={14} /> ID Peluang
          </span>
          <span className="font-semibold text-[#6E6E6E]">#FRL-2405-0321</span>
        </div>
      </div>
    </div>

    {/* Peluang Serupa */}
    <div className="mb-6">
      <h3 className="font-sora font-bold text-sm text-[#1B1B1B] mb-4">
        Peluang Serupa
      </h3>
      <div className="space-y-3">
        {[
          {
            title: "Edukasi Anak Minggu (Volunteer Mengajar)",
            cat: "Volunteer",
            loc: "Offline • Malang",
            time: "2 hari lalu",
            icon: Trees,
            bg: "bg-green-100",
            color: "text-green-700",
          },
          {
            title: "Desain Packaging Produk Kopi",
            cat: "Freelance",
            loc: "Online",
            time: "3 hari lalu",
            icon: Palette,
            bg: "bg-[#E7F0E9]",
            color: "text-[#1F4D3A]",
          },
          {
            title: "Konten Reels untuk Kampanye Lingkungan",
            cat: "Kolaborasi",
            loc: "Online",
            time: "4 hari lalu",
            icon: Clapperboard,
            bg: "bg-blue-100",
            color: "text-blue-700",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-[#DDD6C8] rounded-2xl p-3 flex gap-3 hover:shadow-sm transition-shadow cursor-pointer relative group"
          >
            <button className="absolute right-3 top-3 text-[#A8C3A0] hover:text-[#1F4D3A]">
              <Bookmark size={14} />
            </button>
            <div
              className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0 ${item.color}`}
            >
              <item.icon size={18} strokeWidth={1.5} />
            </div>
            <div className="flex-1 pr-4">
              <Badge
                className={`${item.bg} ${item.color} px-1.5 py-0.5 text-[8px] mb-1`}
              >
                {item.cat}
              </Badge>
              <h4 className="text-[11px] font-semibold text-[#1B1B1B] leading-tight group-hover:text-[#1F4D3A] mb-1 line-clamp-2">
                {item.title}
              </h4>
              <div className="flex justify-between items-center mt-2">
                <span className="text-[8px] text-[#6E6E6E] font-medium">
                  {item.loc}
                </span>
                <span className="text-[8px] font-medium text-[#6E6E6E]">
                  {item.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom Graphic Quote */}
    <div className="mt-auto bg-[#F6F3EA] rounded-2xl p-5 border border-[#DDD6C8] relative overflow-hidden flex flex-col justify-center">
      <div className="relative z-10">
        <span className="font-sora font-bold text-2xl text-[#A8C3A0] absolute -top-1 -left-2">
          “
        </span>
        <p className="text-[11px] font-semibold text-[#1B1B1B] italic leading-relaxed pt-2 pl-2 pr-4">
          Karya kecilmu hari ini, bisa jadi perubahan besar untuk banyak orang.
        </p>
        <span className="font-sora font-bold text-2xl text-[#A8C3A0] absolute bottom-0 right-0">
          ”
        </span>
      </div>
      <div className="absolute right-0 bottom-0 text-[#1F4D3A]">
        <Leaf
          size={32}
          className="absolute -bottom-2 right-2 text-[#5F8B6D] -rotate-12 opacity-40"
        />
      </div>
    </div>
  </aside>
);
