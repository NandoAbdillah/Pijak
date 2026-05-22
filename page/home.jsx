"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bookmark,
  ArrowRight,
  Leaf,
  Scissors,
  ShieldCheck,
  Sparkles,
  Palette,
  TrendingUp,
  PenLine,
  BarChart3,
  Clapperboard,
  Trees,
  LayoutGrid,
} from "lucide-react";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/anim";
import { Button, CategoryCard, OpportunityCard } from "@/components/ui/uis";

const OPPORTUNITY_TABS = [
  "Semua",
  "Freelance",
  "Volunteer",
  "Kolaborasi",
  "Skill Exchange",
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

const CATEGORIES = [
  {
    icon: Palette,
    title: "Desain",
    desc: "Ekspresikan idemu",
    bg: "bg-orange-50",
    color: "text-orange-600",
  },
  {
    icon: TrendingUp,
    title: "Marketing",
    desc: "Bantu brand tumbuh",
    bg: "bg-yellow-50",
    color: "text-yellow-600",
  },
  {
    icon: PenLine,
    title: "Penulisan",
    desc: "Kata yang menggerakkan",
    bg: "bg-red-50",
    color: "text-red-600",
  },
  {
    icon: BarChart3,
    title: "Data",
    desc: "Ubah data jadi keputusan",
    bg: "bg-blue-50",
    color: "text-blue-600",
  },
  {
    icon: Clapperboard,
    title: "Video",
    desc: "Ceritakan lewat visual",
    bg: "bg-purple-50",
    color: "text-purple-600",
  },
  {
    icon: Trees,
    title: "Lingkungan",
    desc: "Aksi kecil untuk bumi",
    bg: "bg-green-50",
    color: "text-green-600",
  },
  {
    icon: LayoutGrid,
    title: "Lainnya",
    desc: "Masih banyak pijakan lainnya",
    bg: "bg-[#F6F3EA]",
    color: "text-[#6E6E6E]",
  },
];

const HeroSection = () => (
  <FadeUp className="relative mt-8 mb-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-4">
    {/* Left Content */}
    <div className="flex-1 space-y-6 z-10 relative">
      {/* Decorative leaf behind text */}
      <Leaf className="absolute -top-6 -left-4 text-[#A8C3A0]/30 w-16 h-16 -rotate-12" />

      <h1 className="font-sora font-bold text-5xl lg:text-6xl text-[#1B1B1B] leading-[1.1] tracking-tight">
        Mulai dari <br />
        <span className="text-[#1F4D3A]">langkah kecil,</span>
        <br />
        beri dampak nyata.
      </h1>

      <p className="text-lg text-[#6E6E6E] max-w-md leading-relaxed">
        Temukan peluang, asah skill, dan bangun pengalaman bersama komunitas
        positif di Pijak.
      </p>

      <div className="flex items-center gap-4 pt-2">
        <Button variant="primary" className="gap-2">
          Temukan Peluang <ArrowRight size={18} />
        </Button>
        <Button variant="outline" className="gap-2">
          Buat Peluang <Bookmark size={18} />
        </Button>
      </div>
    </div>

    {/* Right Content - Collage */}
    <div className="flex-1 relative w-full h-[400px] lg:h-[450px] flex items-center justify-center">
      {/* Background brush stroke (dummy using CSS shape) */}
      <div className="absolute w-[280px] h-[320px] bg-[#5F8B6D] rounded-3xl -rotate-6 opacity-90 mix-blend-multiply" />

      {/* Image 2 (Back) */}
      <motion.div
        initial={{ rotate: -10, x: 20, y: 20 }}
        animate={{ rotate: 8, x: 40, y: 30 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute w-[220px] h-[280px] bg-white p-3 pb-12 rounded-lg shadow-xl border border-[#DDD6C8] z-10"
      >
        <div className="w-full h-full bg-gray-200 rounded overflow-hidden">
          <img
            src="https://placehold.co/400x500/E7DCCB/1B1B1B?text=Photography"
            alt="Creative"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-sora font-semibold text-[#B77B57] bg-[#F6F3EA] px-3 py-1 rounded-full shadow-sm">
          #berdampak
        </div>
      </motion.div>

      {/* Image 1 (Front) */}
      <motion.div
        initial={{ rotate: 5, x: -20, y: -10 }}
        animate={{ rotate: -4, x: -30, y: -20 }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute w-[240px] h-[300px] bg-white p-3 pb-12 rounded-lg shadow-2xl border border-[#DDD6C8] z-20"
      >
        <div className="w-full h-full bg-gray-200 rounded overflow-hidden">
          <img
            src="https://placehold.co/400x500/A8C3A0/1F4D3A?text=Productive+GenZ"
            alt="Productive"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Tape effect */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/80 backdrop-blur-sm shadow-sm rotate-2" />

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-sora font-semibold text-[#1F4D3A] bg-[#E7F0E9] px-3 py-1 rounded-full shadow-sm">
          #berkarya
        </div>
      </motion.div>

      {/* Doodle Stamp */}
      <div className="absolute -bottom-4 right-10 z-30 w-24 h-24 rounded-full border-2 border-[#1B1B1B] border-dashed flex items-center justify-center bg-[#F6F3EA] rotate-12">
        <div className="text-center">
          <Leaf className="w-6 h-6 mx-auto text-[#5F8B6D] mb-1" />
          <span className="text-[9px] font-sora font-bold tracking-widest uppercase">
            Karya Kecil
            <br />
            Dampak Besar
          </span>
        </div>
      </div>
    </div>
  </FadeUp>
);

// src/components/home/feature-highlight.tsx
const FeatureHighlight = () => {
  const features = [
    {
      icon: Leaf,
      title: "Mudah Dimulai",
      desc: "Cocok untuk semua level & pemula",
      color: "text-[#B77B57]",
      bg: "bg-[#F2E8DB]",
    },
    {
      icon: Scissors,
      title: "Fleksibel",
      desc: "Kerja kapan saja, di mana saja",
      color: "text-[#B77B57]",
      bg: "bg-[#F2E8DB]",
    },
    {
      icon: ShieldCheck,
      title: "Aman & Terpercaya",
      desc: "Sistem rating & verifikasi yang jelas",
      color: "text-[#5F8B6D]",
      bg: "bg-[#E7F0E9]",
    },
    {
      icon: Sparkles,
      title: "Berdampak",
      desc: "Setiap karya kecil punya arti",
      color: "text-[#5F8B6D]",
      bg: "bg-[#E7F0E9]",
    },
  ];

  return (
    <FadeUp
      delay={0.2}
      className="w-full bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-[#DDD6C8] mb-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${f.bg} ${f.color}`}>
              <f.icon size={22} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-sora font-semibold text-[#1B1B1B] text-sm mb-1">
                {f.title}
              </h4>
              <p className="text-xs text-[#6E6E6E] leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </FadeUp>
  );
};

// src/components/home/opportunity-section.tsx
const OpportunitySection = () => {
  const [activeTab, setActiveTab] = useState("Semua");

  return (
    <div className="mb-16">
      <FadeUp
        delay={0.3}
        className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"
      >
        <h2 className="font-sora font-bold text-2xl text-[#1B1B1B] flex items-center gap-2">
          Peluang untukmu <Sparkles className="text-[#F5B041] w-6 h-6" />
        </h2>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {OPPORTUNITY_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-[#1F4D3A] text-white shadow-sm"
                  : "bg-white text-[#6E6E6E] border border-[#DDD6C8] hover:bg-[#E7DCCB]"
              }`}
            >
              {tab}
            </button>
          ))}
          <button className="whitespace-nowrap ml-2 text-sm font-medium text-[#1B1B1B] flex items-center gap-1 hover:text-[#1F4D3A]">
            Lihat semua <ArrowRight size={16} />
          </button>
        </div>
      </FadeUp>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
        {OPPORTUNITIES.map((opp) => (
          <StaggerItem key={opp.id}>
            <OpportunityCard data={opp} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
};

// src/components/home/category-section.tsx
const PopularCategorySection = () => (
  <FadeUp delay={0.4} className="mb-10">
    <div className="flex items-center justify-between mb-6">
      <h2 className="font-sora font-bold text-xl text-[#1B1B1B]">
        Jelajahi Kategori Populer
      </h2>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {CATEGORIES.map((cat, idx) => (
        <CategoryCard key={idx} data={cat} />
      ))}
    </div>
  </FadeUp>
);

export default function HomeMain() {
  return (
    <div className="max-w-[850px] mx-auto pb-10">
      <HeroSection />
      <FeatureHighlight />
      <OpportunitySection />
      <PopularCategorySection />
    </div>
  );
}
