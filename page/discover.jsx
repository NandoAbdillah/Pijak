import {
  User,
  Search,
  ChevronDown,
  ArrowRight,
  Leaf,
  Sparkles,
  Lightbulb,
  Palette,
  TrendingUp,
  Clapperboard,
  Trees,
  Filter,
  Hash,
  Check,
  Badge,
  LayoutGrid,
  Briefcase,
  HeartHandshake,
  Users,
  ArrowRightLeft,
} from "lucide-react";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/anim";

import { Button, OpportunityCard } from "@/components/ui/uis";
import { useState } from "react";

const JELAJAH_TYPES = [
  {
    id: "semua",
    label: "Semua",
    desc: "Lihat semua jenis peluang",
    icon: LayoutGrid,
  },
  {
    id: "freelance",
    label: "Freelance",
    desc: "Pekerjaan berbayar berbasis proyek",
    icon: Briefcase,
  },
  {
    id: "volunteer",
    label: "Volunteer",
    desc: "Kegiatan sukarela berdampak",
    icon: HeartHandshake,
  },
  {
    id: "kolaborasi",
    label: "Kolaborasi",
    desc: "Kerja sama & project bareng",
    icon: Users,
  },
  {
    id: "skillexchange",
    label: "Skill Exchange",
    desc: "Tukar skill dan pengalaman",
    icon: ArrowRightLeft,
  },
];

const OPPORTUNITIES = [
  {
    id: 1,
    type: "Freelance",
    typeColor: "bg-orange-100 text-orange-700",
    title: "Desain Konten Instagram untuk UMKM Kopi",
    category: "Desain",
    reward: "Rp150.000",
    deadline: "2 hari lagi",
    beginnerFriendly: true,
    level: "Beginner",
  },
  {
    id: 2,
    type: "Volunteer",
    typeColor: "bg-green-100 text-green-700",
    title: "Edukasi Anak Minggu (Volunteer Mengajar)",
    category: "Pendidikan",
    reward: "Sertifikat + Pengalaman",
    deadline: "5 hari lagi",
    beginnerFriendly: true,
    level: "Beginner",
  },
  {
    id: 3,
    type: "Kolaborasi",
    typeColor: "bg-blue-100 text-blue-700",
    title: "Partner untuk Project Video Dokumenter",
    category: "Konten Kreator",
    reward: "Barter Skill",
    deadline: "1 minggu lagi",
    beginnerFriendly: false,
    level: "Intermediate",
  },
  {
    id: 4,
    type: "Freelance",
    typeColor: "bg-orange-100 text-orange-700",
    title: "Input Data Penjualan (Excel)",
    category: "Data Entry",
    reward: "Rp100.000",
    deadline: "2 hari lagi",
    beginnerFriendly: true,
    level: "Beginner",
  },
];

const TRENDING_TAGS = [
  { tag: "Lingkungan", count: "128 peluang aktif" },
  { tag: "Pendidikan", count: "96 peluang aktif" },
  { tag: "Desain", count: "85 peluang aktif" },
];

/**
 * @param {{ setCurrentPage: (page: string) => void }} props
 */
export const JelajahMain = ({ setCurrentPage }) => {
  const [activeType, setActiveType] = useState("semua");

  return (
    <div className="max-w-[1000px] mx-auto space-y-10">
      {/* Header Jelajah */}
      <FadeUp className="mt-8 flex items-center justify-between">
        <div>
          <h1 className="font-sora font-bold text-4xl text-[#1B1B1B] flex items-center gap-3">
            Jelajahi Peluang <Leaf className="text-[#5F8B6D] w-8 h-8" />
          </h1>
          <p className="text-sm text-[#6E6E6E] mt-3 max-w-sm">
            Temukan peluang, asah skill, dan beri dampak nyata bersama komunitas
            positif di Pijak.
          </p>
        </div>
        <div className="hidden md:flex relative w-[240px] h-[100px] items-center justify-center">
          <div className="absolute right-4 top-2 bg-[#F6F3EA] border-2 border-dashed border-[#A8C3A0] rounded-full px-4 py-2 rotate-6 z-10 text-center">
            <span className="font-sora font-semibold text-xs text-[#5F8B6D]">
              Peluang ada
              <br />
              di setiap langkahmu.
            </span>
          </div>
          <Search
            className="absolute right-0 bottom-0 text-[#1B1B1B] w-14 h-14 -rotate-12 opacity-80"
            strokeWidth={1.5}
          />
          <Sparkles className="absolute right-24 top-0 text-[#F5B041] w-5 h-5" />
        </div>
      </FadeUp>

      {/* Big Category Tabs */}
      <FadeUp delay={0.1}>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {JELAJAH_TYPES.map((type) => {
            const isActive = activeType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => {
                  setActiveType(type.id);
                  setCurrentPage("detail");
                }}
                className={`p-4 rounded-2xl text-left border transition-all duration-200 flex flex-col gap-3 ${
                  isActive
                    ? "bg-[#1F4D3A] text-white border-[#1F4D3A] shadow-md"
                    : "bg-white text-[#1B1B1B] border-[#DDD6C8] hover:border-[#A8C3A0] hover:shadow-sm"
                }`}
              >
                <div className="flex items-center gap-2">
                  <type.icon
                    size={20}
                    className={isActive ? "text-white" : "text-[#6E6E6E]"}
                    strokeWidth={1.5}
                  />
                  <span className="font-sora font-semibold text-sm">
                    {type.label}
                  </span>
                </div>
                <p
                  className={`text-[10px] leading-relaxed ${isActive ? "text-white/80" : "text-[#6E6E6E]"}`}
                >
                  {type.desc}
                </p>
              </button>
            );
          })}
        </div>
      </FadeUp>

      {/* Filter Bar */}
      <FadeUp delay={0.2} className="flex flex-wrap items-center gap-3">
        {["Semua Kategori", "Tingkat", "Lokasi", "Durasi", "Urutkan"].map(
          (filter) => (
            <button
              key={filter}
              className="flex items-center gap-2 bg-white border border-[#DDD6C8] px-4 py-2 rounded-full text-xs font-medium text-[#1B1B1B] hover:bg-[#F6F3EA]"
            >
              {filter} <ChevronDown size={14} className="text-[#6E6E6E]" />
            </button>
          ),
        )}
        <button className="flex items-center gap-2 ml-auto text-xs font-semibold text-[#6E6E6E] hover:text-[#1F4D3A]">
          Filter Lain <Filter size={14} />
        </button>
      </FadeUp>

      {/* Grid Cards (with illustration placeholder) */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {OPPORTUNITIES.map((opp) => (
          <StaggerItem key={opp.id}>
            <OpportunityCard data={opp} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Bottom Banner */}
      <FadeUp
        delay={0.4}
        className="mt-10 bg-[#E7F0E9] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between border border-[#A8C3A0]/30 gap-6"
      >
        <div className="flex items-center gap-6">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-white border-2 border-[#E7F0E9] flex items-center justify-center text-[#5F8B6D]"
              >
                <User size={18} />
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-sora font-bold text-[#1B1B1B] text-sm mb-2">
              Bangun reputasi, buka lebih banyak peluang.
            </h3>
            <div className="flex items-center gap-4 text-xs text-[#6E6E6E] font-medium">
              <span className="flex items-center gap-1">
                <Check size={14} className="text-[#1F4D3A]" /> Selesaikan tugas
              </span>
              <span className="flex items-center gap-1">
                <Check size={14} className="text-[#1F4D3A]" /> Dapat ulasan
              </span>
              <span className="flex items-center gap-1">
                <Check size={14} className="text-[#1F4D3A]" /> Kumpulkan poin
              </span>
            </div>
          </div>
        </div>
        <Button variant="primary" className="whitespace-nowrap">
          Lihat Aktivitas Saya <ArrowRight size={16} className="ml-2" />
        </Button>
      </FadeUp>
    </div>
  );
};

export const JelajahRightSidebar = () => (
  <aside className="w-[320px] h-screen sticky top-0 bg-[#FCFBF8] border-l border-[#DDD6C8] flex flex-col py-8 px-6 z-20 flex-shrink-0 overflow-y-auto hide-scrollbar">
    {/* Filter Cepat */}
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">
          Filter Cepat
        </h3>
        <button className="text-[10px] text-[#6E6E6E] font-medium hover:text-[#1B1B1B]">
          Reset
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {[
          "Beginner Friendly",
          "Online",
          "Surabaya",
          "Berbayar",
          "Hari ini",
          "Akhir Pekan",
        ].map((tag, i) => (
          <Badge
            key={i}
            className={`cursor-pointer ${i === 0 ? "bg-[#E7F0E9] text-[#1F4D3A] border border-[#A8C3A0]" : "bg-white border border-[#DDD6C8] text-[#6E6E6E] hover:bg-[#F6F3EA]"}`}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>

    {/* CTA Green Box */}
    <div className="bg-[#1F4D3A] rounded-2xl p-5 text-white mb-8 relative overflow-hidden shadow-sm">
      <div className="relative z-10">
        <h3 className="font-sora font-semibold text-sm mb-2">
          Belum menemukan
          <br />
          yang cocok?
        </h3>
        <p className="text-[10px] text-white/80 mb-4 leading-relaxed max-w-[85%]">
          Buat peluangmu sendiri dan temukan talenta terbaik untuk
          mengerjakannya!
        </p>
        <button className="bg-white text-[#1F4D3A] text-xs font-semibold py-2 px-4 rounded-full hover:bg-[#E7DCCB] transition-colors">
          Buat Peluang
        </button>
      </div>
      <Lightbulb className="absolute -bottom-2 -right-4 w-20 h-20 text-[#5F8B6D] opacity-40 stroke-1" />
    </div>

    {/* Rekomendasi untukmu */}
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">
          Rekomendasi untukmu
        </h3>
        <button className="text-[10px] text-[#6E6E6E] hover:text-[#1B1B1B]">
          Lihat semua
        </button>
      </div>
      <div className="space-y-3">
        {[
          {
            title: "Desain Feed Instagram untuk Event",
            cat: "Desain",
            reward: "Rp120.000",
            icon: Palette,
            bg: "bg-orange-100",
          },
          {
            title: "Relawan Edukasi Lingkungan untuk Anak Sekolah",
            cat: "Volunteer",
            reward: "Sertifikat",
            icon: Trees,
            bg: "bg-green-100",
          },
          {
            title: "Editor Video Pendek (YouTube Shorts)",
            cat: "Video",
            reward: "Rp200.000",
            icon: Clapperboard,
            bg: "bg-purple-100",
          },
        ].map((item, i) => (
          <div key={i} className="flex gap-3 group cursor-pointer">
            <div
              className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0 text-[#1B1B1B]`}
            >
              <item.icon size={18} strokeWidth={1.5} />
            </div>
            <div className="flex-1 pb-3 border-b border-[#DDD6C8] group-last:border-0">
              <h4 className="text-[11px] font-semibold text-[#1B1B1B] leading-snug group-hover:text-[#1F4D3A] mb-1">
                {item.title}
              </h4>
              <div className="flex justify-between items-center">
                <span className="text-[9px] text-[#6E6E6E] font-medium">
                  {item.cat}
                </span>
                <span className="text-[9px] font-semibold text-[#1B1B1B]">
                  {item.reward}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Trending Sekarang */}
    <div className="mt-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">
          Trending Sekarang
        </h3>
        <TrendingUp size={16} className="text-[#6E6E6E]" />
      </div>
      <div className="space-y-4">
        {TRENDING_TAGS.map((item, i) => (
          <div key={i} className="flex gap-3 cursor-pointer group">
            <Hash size={14} className="text-[#A8C3A0] mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold text-[#1B1B1B] group-hover:text-[#1F4D3A] mb-0.5">
                {item.tag}
              </h4>
              <p className="text-[10px] text-[#6E6E6E]">{item.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </aside>
);
