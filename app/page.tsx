"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Compass,
  PlusSquare,
  Activity,
  MessageSquare,
  Bell,
  User,
  Search,
  MapPin,
  ChevronDown,
  Bookmark,
  ArrowRight,
  Leaf,
  Scissors,
  ShieldCheck,
  Sparkles,
  Lightbulb,
  Flag,
  CheckCircle2,
  Clock,
  Map,
  Star,
  Palette,
  TrendingUp,
  PenLine,
  BarChart3,
  Clapperboard,
  Trees,
  LayoutGrid,
  Wallet,
  Briefcase,
  HeartHandshake,
  Users,
  ArrowRightLeft,
  Filter,
  Hash,
  Check,
  ClipboardList,
  Calendar,
  Globe,
  Building2,
  MonitorSmartphone,
  Award,
  ExternalLink,
  HelpCircle,
  Coffee,
  CheckSquare,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Megaphone,
  FileCheck2,
  Headset,
  BellRing,
  Gift,
  Mail,
  Settings,
  CheckCheck,
  Globe2,
  ArrowLeft,
  Share2,
  Layers,
  BadgeCheck,
  FileText,
  CreditCard,
  Languages,
  Fingerprint,
  Upload,
  Link as LinkIcon,
  File as FileIcon,
  X,
  Info,
  Camera,
  CalendarDays,
  Edit3,
  Hexagon,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

// ============================================================================
// --- GLOBAL STYLES & FONTS (src/app/globals.css equivalent) ---
// ============================================================================
const injectStyles = () => {
  if (typeof document === "undefined") return;
  const style = document.createElement("style");
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@400;600;700&display=swap');
    
    :root {
      --primary-forest: #1F4D3A;
      --soft-green: #5F8B6D;
      --sage: #A8C3A0;
      --cream-bg: #F6F3EA;
      --warm-sand: #E7DCCB;
      --dark-text: #1B1B1B;
      --muted-text: #6E6E6E;
      --soft-border: #DDD6C8;
      --accent-clay: #B77B57;
    }

    body {
      background-color: var(--cream-bg);
      color: var(--dark-text);
      font-family: 'Inter', sans-serif;
    }

    .font-sora { font-family: 'Sora', sans-serif; }
    
    /* Hide scrollbar for clean aesthetic */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #DDD6C8; border-radius: 10px; }
    ::-webkit-scrollbar-thumb:hover { background: #A8C3A0; }
  `;
  document.head.appendChild(style);
};

// ============================================================================
// --- LIB & UTILS (src/lib/constants.ts) ---
// ============================================================================
const NAV_ITEMS = [
  { id: "beranda", icon: Home, label: "Beranda" },
  { id: "jelajah", icon: Compass, label: "Jelajah" },
  { id: "buat", icon: PlusSquare, label: "Buat Peluang" },
  { id: "aktivitas", icon: Activity, label: "Aktivitas" },
  { id: "pesan", icon: MessageSquare, label: "Pesan" },
  { id: "notifikasi", icon: Bell, label: "Notifikasi" },
  { id: "profil", icon: User, label: "Profil" },
];

const OPPORTUNITY_TABS = [
  "Semua",
  "Freelance",
  "Volunteer",
  "Kolaborasi",
  "Skill Exchange",
];

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

const RECENT_ACTIVITIES = [
  {
    title: "Desain Logo untuk UMKM",
    status: "Sedang Dikerjakan",
    statusColor: "text-orange-600",
  },
  {
    title: "Relawan Bersih Pantai",
    status: "Selesai",
    statusColor: "text-green-600",
  },
  {
    title: "Edit Video Promosi",
    status: "Menunggu Review",
    statusColor: "text-purple-600",
  },
];

const TRENDING_TAGS = [
  { tag: "Lingkungan", count: "128 peluang aktif" },
  { tag: "Pendidikan", count: "96 peluang aktif" },
  { tag: "Desain", count: "85 peluang aktif" },
];

const AKTIVITAS_BERLANGSUNG = [
  {
    id: 1,
    type: "Freelance",
    typeColor: "bg-[#E7F0E9] text-[#1F4D3A]",
    title: "Desain Konten Instagram untuk UMKM Kopi",
    meta: "Desain • Online • Deadline 20 Mei 2024",
    progress: 70,
    timeRemaining: "3 hari lagi",
    timeColor: "text-red-500",
    btnText: "Lanjutkan",
    icon: Coffee,
  },
  {
    id: 2,
    type: "Volunteer",
    typeColor: "bg-green-100 text-green-700",
    title: "Edukasi Anak Minggu (Volunteer Mengajar)",
    meta: "Pendidikan • Offline • Setiap Minggu",
    progress: 40,
    timeRemaining: "5 hari lagi",
    timeColor: "text-[#B77B57]",
    btnText: "Lihat Detail",
    icon: Trees,
  },
  {
    id: 3,
    type: "Kolaborasi",
    typeColor: "bg-blue-100 text-blue-700",
    title: "Partner untuk Project Video Dokumenter",
    meta: "Konten Kreator • Online • Deadline 30 Mei 2024",
    progress: 30,
    timeRemaining: "1 minggu lagi",
    timeColor: "text-[#B77B57]",
    btnText: "Lanjutkan",
    icon: Clapperboard,
  },
];

const AKTIVITAS_MENUNGGU = [
  {
    id: 4,
    type: "Freelance",
    typeColor: "bg-orange-100 text-orange-700",
    title: "Input Data Penjualan (Excel)",
    meta: "Data Entry • Online • Diajukan 2 hari lalu",
    status: "Menunggu Review",
    estimate: "2-3 hari",
    statusColor: "text-[#B77B57]",
    icon: ClipboardList,
  },
  {
    id: 5,
    type: "Volunteer",
    typeColor: "bg-green-100 text-green-700",
    title: "Aksi Bersih Pantai (Volunteer)",
    meta: "Lingkungan • Offline • Diajukan 3 hari lalu",
    status: "Menunggu Konfirmasi",
    estimate: "1-2 hari",
    statusColor: "text-[#B77B57]",
    icon: Megaphone,
  },
];

// ============================================================================
// --- UI COMPONENTS (src/components/ui/...) ---
// ============================================================================

// src/components/ui/badge.tsx
const Badge = ({ children, className = "" }) => (
  <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${className}`}>
    {children}
  </span>
);

// src/components/ui/button.tsx
const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200";
  const variants = {
    primary: "bg-[#1F4D3A] text-white hover:bg-[#15382A] px-5 py-2.5 shadow-sm",
    outline:
      "border border-[#DDD6C8] bg-white text-[#1B1B1B] hover:bg-[#E7DCCB] px-5 py-2.5",
    ghost: "text-[#6E6E6E] hover:text-[#1B1B1B] hover:bg-[#E7DCCB] px-3 py-2",
  };
  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Form UI Components (NEW)
const Label = ({ children, required }) => (
  <label className="block text-xs font-bold text-[#1B1B1B] mb-2 font-sora">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full bg-white border border-[#DDD6C8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5F8B6D] focus:ring-1 focus:ring-[#5F8B6D] transition-colors placeholder:text-[#A8C3A0] ${className}`}
    {...props}
  />
);

const Select = ({ children, className = "", ...props }) => (
  <div className="relative">
    <select
      className={`w-full appearance-none bg-white border border-[#DDD6C8] rounded-xl px-4 py-3 text-sm text-[#1B1B1B] focus:outline-none focus:border-[#5F8B6D] focus:ring-1 focus:ring-[#5F8B6D] transition-colors ${className}`}
      {...props}
    >
      {children}
    </select>
    <ChevronDown
      size={16}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6E6E6E] pointer-events-none"
    />
  </div>
);

const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`w-full bg-white border border-[#DDD6C8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5F8B6D] focus:ring-1 focus:ring-[#5F8B6D] transition-colors placeholder:text-[#A8C3A0] resize-none ${className}`}
    {...props}
  />
);

const CardSelector = ({ icon: Icon, title, desc, active, onClick }) => (
  <div
    onClick={onClick}
    className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col items-center justify-center text-center gap-1.5 h-full ${
      active
        ? "bg-[#E7F0E9] border-[#1F4D3A] text-[#1F4D3A] shadow-sm"
        : "bg-white border-[#DDD6C8] hover:border-[#A8C3A0] text-[#6E6E6E] hover:bg-[#F6F3EA]"
    }`}
  >
    <Icon
      size={20}
      strokeWidth={active ? 2 : 1.5}
      className={active ? "text-[#1F4D3A]" : "text-[#6E6E6E]"}
    />
    <div>
      <h4
        className={`text-xs font-semibold ${active ? "text-[#1F4D3A]" : "text-[#1B1B1B]"}`}
      >
        {title}
      </h4>
      <p className="text-[10px] leading-tight mt-0.5">{desc}</p>
    </div>
  </div>
);

// ============================================================================
// --- MOTION COMPONENTS (src/components/motion/...) ---
// ============================================================================

// src/components/motion/fade-up.tsx
const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// src/components/motion/stagger-container.tsx
const StaggerContainer = ({ children, className = "" }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem = ({ children, className = "" }) => {
  const item = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
};

// ============================================================================
// --- CARD COMPONENTS (src/components/cards/...) ---
// ============================================================================

// src/components/cards/opportunity-card.tsx
const OpportunityCard = ({ data }) => (
  <div className="bg-white rounded-3xl p-5 border border-[#DDD6C8] shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 group cursor-pointer flex flex-col h-full">
    <div className="flex justify-between items-start mb-4">
      <Badge className={data.typeColor}>{data.type}</Badge>
      <button className="text-[#A8C3A0] hover:text-[#1F4D3A] transition-colors">
        <Bookmark size={20} strokeWidth={1.5} />
      </button>
    </div>

    <h3 className="font-sora font-semibold text-[#1B1B1B] text-lg mb-1 leading-snug group-hover:text-[#1F4D3A] transition-colors">
      {data.title}
    </h3>
    <p className="text-sm text-[#6E6E6E] mb-6 flex-grow">{data.category}</p>

    <div className="flex flex-wrap items-center gap-4 text-xs text-[#1B1B1B] font-medium mb-4">
      <div className="flex items-center gap-1.5">
        <Wallet size={14} className="text-[#A8C3A0]" /> {data.reward}
      </div>
      <div className="flex items-center gap-1.5">
        <Clock size={14} className="text-[#A8C3A0]" /> {data.deadline}
      </div>
    </div>

    {data.beginnerFriendly ? (
      <Badge className="bg-[#E7F0E9] text-[#1F4D3A] w-fit">
        Beginner Friendly
      </Badge>
    ) : (
      <Badge className="bg-blue-50 text-blue-700 w-fit">{data.level}</Badge>
    )}
  </div>
);

// src/components/cards/category-card.tsx
const CategoryCard = ({ data }) => (
  <div
    className={`${data.bg} rounded-2xl p-4 border border-transparent hover:border-[#DDD6C8] transition-all duration-300 cursor-pointer flex flex-col items-start gap-3`}
  >
    <div className={`p-2 bg-white/60 rounded-xl ${data.color}`}>
      <data.icon size={24} strokeWidth={1.5} />
    </div>
    <div>
      <h4 className="font-sora font-semibold text-[#1B1B1B] text-sm">
        {data.title}
      </h4>
      <p className="text-xs text-[#6E6E6E] mt-0.5">{data.desc}</p>
    </div>
  </div>
);

// ============================================================================
// --- HOME SECTIONS (src/components/home/...) ---
// ============================================================================

// src/components/home/hero-section.tsx
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

// ============================================================================
// --- LAYOUT COMPONENTS (src/components/layout/...) ---
// ============================================================================

// src/components/layout/topbar.tsx
const Topbar = () => (
  <header className="sticky top-0 z-40 bg-[#F6F3EA]/80 backdrop-blur-xl border-b border-[#DDD6C8] px-8 py-4 flex items-center justify-between">
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E6E6E] w-5 h-5" />
      <input
        type="text"
        placeholder="Cari peluang, skill, atau komunitas..."
        className="w-full bg-white border border-[#DDD6C8] rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#A8C3A0] focus:ring-1 focus:ring-[#A8C3A0] transition-all placeholder:text-[#A8C3A0]"
      />
    </div>

    <div className="flex items-center gap-6">
      <button className="flex items-center gap-2 text-sm font-medium text-[#1B1B1B] hover:text-[#1F4D3A] transition-colors">
        Surabaya <ChevronDown size={16} className="text-[#6E6E6E]" />
      </button>
      <div className="w-px h-6 bg-[#DDD6C8]" />
      <button className="relative w-9 h-9 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
        <img
          src="https://placehold.co/100x100/A8C3A0/1F4D3A?text=A"
          alt="Profile"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
      </button>
    </div>
  </header>
);

// src/components/layout/sidebar.tsx
const LeftSidebar = ({ currentPage, setCurrentPage }) => (
  <aside className="w-[260px] h-screen sticky top-0 bg-[#FCFBF8] border-r border-[#DDD6C8] flex flex-col pt-8 pb-6 px-5 z-20 flex-shrink-0">
    <div className="flex items-center gap-3 px-3 mb-2">
      <div className="w-8 h-8 bg-[#1F4D3A] rounded-lg flex items-center justify-center text-white font-bold font-sora text-xl rounded-tl-sm rounded-br-3xl">
        P
      </div>
      <div>
        <h1 className="font-sora font-bold text-2xl text-[#1B1B1B] tracking-tight">
          Pijak
        </h1>
      </div>
    </div>
    <p className="px-3 text-[11px] text-[#6E6E6E] mb-8 font-medium">
      Pijakan pertama,
      <br />
      untuk karya nyata.
    </p>

    <nav className="flex-1 space-y-1">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive
                ? "bg-[#E7F0E9] text-[#1F4D3A]"
                : "text-[#6E6E6E] hover:bg-[#F6F3EA] hover:text-[#1B1B1B]"
            }`}
          >
            <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
            {item.label}
          </button>
        );
      })}
    </nav>

    {/* Dynamic Bottom Widgets based on Page */}
    <div className="mt-auto space-y-4">
      {currentPage === "beranda" ? (
        <>
          <div className="bg-white border border-[#DDD6C8] rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Badge className="bg-[#E7F0E9] text-[#1F4D3A] p-1">
                <Map size={14} />
              </Badge>
              <span className="text-xs font-semibold text-[#1B1B1B]">
                Level 3 - Kreator Muda
              </span>
            </div>
            <div className="w-full bg-[#F6F3EA] rounded-full h-1.5 mb-2">
              <div
                className="bg-[#5F8B6D] h-1.5 rounded-full"
                style={{ width: "64%" }}
              ></div>
            </div>
            <div className="text-[10px] text-[#6E6E6E] text-right">
              320 / 500 XP
            </div>
          </div>

          <div className="bg-[#1F4D3A] rounded-2xl p-4 text-white relative overflow-hidden">
            <Sparkles className="absolute top-3 right-3 text-[#5F8B6D] opacity-50 w-12 h-12" />
            <h4 className="font-sora font-semibold text-sm mb-2 relative z-10 leading-snug">
              "Kecilkan langkah,
              <br />
              besarkan dampak."
            </h4>
            <p className="text-[10px] text-white/80 relative z-10">
              Setiap karya kecilmu
              <br />
              berarti untuk dunia.
            </p>
            <Button
              variant="outline"
              className="mt-4 bg-white/10 text-white border-white/20 hover:bg-white/20 w-full text-xs py-2"
            >
              Lihat Aktivitas
            </Button>
          </div>
        </>
      ) : (
        <div className="px-2">
          <h4 className="text-xs font-sora font-bold text-[#1B1B1B] mb-3">
            Kategori Populer
          </h4>
          <div className="grid grid-cols-2 gap-y-3 gap-x-2">
            {CATEGORIES.slice(0, 6).map((cat, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-[#6E6E6E] hover:text-[#1F4D3A] cursor-pointer group"
              >
                <cat.icon
                  size={14}
                  className="group-hover:text-[#5F8B6D] transition-colors"
                />
                <span className="text-[11px] font-medium">{cat.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </aside>
);
// src/components/home/right-sidebar.tsx
const RightSidebar = () => (
  <aside className="w-[320px] h-screen sticky top-0 bg-[#FCFBF8] border-l border-[#DDD6C8] flex flex-col py-8 px-6 z-20 flex-shrink-0 overflow-y-auto hide-scrollbar">
    {/* Profile Summary */}
    <div className="mb-8">
      <h2 className="font-sora font-bold text-xl text-[#1B1B1B] mb-1">
        Hai, Andi!
      </h2>
      <p className="text-sm text-[#6E6E6E] mb-5">Siap berkarya hari ini?</p>

      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-[#1B1B1B]">
          Level 3 • Kreator Muda
        </span>
        <span className="text-[10px] text-[#6E6E6E]">320 / 500 XP</span>
      </div>
      <div className="w-full bg-[#E7DCCB] rounded-full h-1.5 mb-6">
        <div
          className="bg-[#1F4D3A] h-1.5 rounded-full"
          style={{ width: "64%" }}
        ></div>
      </div>

      <div className="bg-white rounded-2xl border border-[#DDD6C8] p-4 shadow-sm flex justify-between text-center">
        <div>
          <div className="font-sora font-bold text-lg text-[#1B1B1B]">12</div>
          <div className="text-[10px] text-[#6E6E6E]">Selesai</div>
        </div>
        <div className="w-px bg-[#DDD6C8]"></div>
        <div>
          <div className="font-sora font-bold text-lg text-[#1B1B1B] flex items-center justify-center gap-1">
            4.9 <Star size={12} className="text-[#F5B041] fill-[#F5B041]" />
          </div>
          <div className="text-[10px] text-[#6E6E6E]">Rating</div>
        </div>
        <div className="w-px bg-[#DDD6C8]"></div>
        <div>
          <div className="font-sora font-bold text-lg text-[#1B1B1B]">8</div>
          <div className="text-[10px] text-[#6E6E6E]">Badge</div>
        </div>
      </div>
    </div>

    {/* Aktivitas Terbaru */}
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-sora font-semibold text-[#1B1B1B] text-sm">
          Aktivitas Terbaru
        </h3>
        <a href="#" className="text-[10px] text-[#6E6E6E] hover:text-[#1B1B1B]">
          Lihat semua &gt;
        </a>
      </div>
      <div className="space-y-3">
        {RECENT_ACTIVITIES.map((act, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F6F3EA] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                <img
                  src={`https://placehold.co/100x100/E7DCCB/1F4D3A?text=${i + 1}`}
                  alt="Thumb"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-[#1B1B1B] group-hover:text-[#1F4D3A] transition-colors line-clamp-1">
                  {act.title}
                </h4>
                <p className={`text-[10px] font-medium ${act.statusColor}`}>
                  {act.status}
                </p>
              </div>
            </div>
            <ChevronDown
              size={14}
              className="text-[#DDD6C8] -rotate-90 group-hover:text-[#1B1B1B]"
            />
          </div>
        ))}
      </div>
    </div>

    {/* CTA Card */}
    <div className="bg-[#1F4D3A] rounded-3xl p-6 text-white mb-8 relative overflow-hidden shadow-lg">
      <div className="relative z-10">
        <h3 className="font-sora font-semibold text-lg mb-2 leading-snug">
          Punya ide atau
          <br />
          butuh bantuan?
        </h3>
        <p className="text-xs text-white/80 mb-5">
          Posting peluangmu
          <br />
          sekarang juga!
        </p>
        <button className="bg-white text-[#1F4D3A] text-sm font-semibold py-2 px-4 rounded-full hover:bg-[#E7DCCB] transition-colors">
          Buat Peluang
        </button>
      </div>
      <Lightbulb className="absolute -bottom-4 -right-4 w-28 h-28 text-[#F5B041] opacity-90 stroke-1" />
    </div>

    {/* Rekomendasi Volunteer */}
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-sora font-semibold text-[#1B1B1B] text-sm">
          Rekomendasi Volunteer
        </h3>
        <a href="#" className="text-[10px] text-[#6E6E6E] hover:text-[#1B1B1B]">
          Lihat semua &gt;
        </a>
      </div>
      <div className="bg-white border border-[#DDD6C8] rounded-2xl p-3 flex gap-3 hover:shadow-sm transition-shadow cursor-pointer">
        <div className="w-12 h-12 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
          <img
            src="https://placehold.co/100x100/A8C3A0/1F4D3A?text=Tree"
            alt="Vol"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-xs font-semibold text-[#1B1B1B] leading-tight mb-1">
            Gerakan Tanam Pohon Kota
          </h4>
          <p className="text-[10px] text-[#6E6E6E] mb-1">Lingkungan</p>
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-[#A8C3A0] flex items-center gap-0.5">
              <MapPin size={10} /> Bogor, Jawa Barat
            </span>
            <span className="text-[9px] font-medium text-[#1B1B1B]">
              5/20 relawan
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* Growth Card */}
    <div className="mt-auto bg-[#FDE293] rounded-3xl p-5 relative overflow-hidden">
      <h3 className="font-sora font-bold text-sm text-[#1B1B1B] mb-2 leading-tight">
        Bangun reputasi,
        <br />
        buka lebih banyak peluang!
      </h3>
      <p className="text-[10px] text-[#1B1B1B]/70 max-w-[80%]">
        Selesaikan tugas, kumpulkan poin, dan naik level bersama Pijak.
      </p>
      <Flag className="absolute bottom-3 right-4 w-8 h-8 text-[#B77B57] rotate-12" />
    </div>
  </aside>
);

const HomeMain = () => {
  return (
    <div className="max-w-[850px] mx-auto pb-10">
      <HeroSection />
      <FeatureHighlight />
      <OpportunitySection />
      <PopularCategorySection />
    </div>
  );
};

// ============================================================================
// --- JELAJAH COMPONENTS (NEW) ---
// ============================================================================
const JelajahMain = ({ setCurrentPage }) => {
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
            <OpportunityCard data={opp} showIllustration={true} />
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

const JelajahRightSidebar = () => (
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

// ============================================================================
// --- BUAT PELUANG COMPONENTS (NEW) ---
// ============================================================================
const BuatPeluangMain = () => {
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
              <Select defaultValue="">
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
              <Select defaultValue="">
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

const BuatPeluangRightSidebar = () => (
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

// ============================================================================
// --- AKTIVITAS COMPONENTS (NEW) ---
// ============================================================================
const AktivitasMain = () => {
  const [activeTab, setActiveTab] = useState("berlangsung");
  const tabs = [
    { id: "semua", label: "Semua" },
    { id: "berlangsung", label: "Berlangsung", count: 3 },
    { id: "menunggu", label: "Menunggu", count: 2 },
    { id: "selesai", label: "Selesai" },
    { id: "dibatalkan", label: "Dibatalkan" },
  ];

  return (
    <div className="max-w-[850px] mx-auto pb-10">
      {/* Header & Illustration */}
      <FadeUp className="mt-6 mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-sora font-bold text-4xl text-[#1B1B1B] flex items-center gap-3">
            Aktivitas <Leaf className="text-[#5F8B6D] w-8 h-8" />
          </h1>
          <p className="text-sm text-[#6E6E6E] mt-3">
            Kelola semua pekerjaan, kontribusi, dan peluangmu di sini.
          </p>
        </div>

        {/* Decorative composite illustration dummy */}
        <div className="hidden md:flex relative w-48 h-24 items-end justify-end">
          <div className="w-16 h-20 border-2 border-[#1B1B1B] rounded-lg bg-white relative -mr-4 mb-2 z-10 flex flex-col items-center pt-2 gap-1">
            <div className="w-6 h-1 bg-[#1B1B1B] rounded-full absolute -top-1"></div>
            <CheckSquare size={14} className="text-[#A8C3A0]" />
            <div className="w-8 h-1 bg-[#DDD6C8] rounded-full mt-1"></div>
            <div className="w-10 h-1 bg-[#DDD6C8] rounded-full"></div>
            <div className="w-6 h-1 bg-[#DDD6C8] rounded-full"></div>
          </div>
          <div className="w-12 h-16 bg-[#5F8B6D] rounded-t-2xl relative z-0 flex items-end justify-center pb-2 text-[#1B1B1B]">
            <Coffee
              size={20}
              className="text-white opacity-80"
              strokeWidth={1.5}
            />
          </div>
          <div className="absolute left-2 bottom-0 z-20">
            <Trees size={32} className="text-[#1F4D3A]" strokeWidth={1.5} />
          </div>
          <div className="absolute right-8 top-0">
            <Sparkles size={16} className="text-[#F5B041]" />
          </div>
        </div>
      </FadeUp>

      {/* Navigation Tabs */}
      <FadeUp
        delay={0.1}
        className="border-b border-[#DDD6C8] flex gap-6 mb-8 overflow-x-auto hide-scrollbar"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-colors relative ${
              activeTab === tab.id
                ? "text-[#1F4D3A]"
                : "text-[#6E6E6E] hover:text-[#1B1B1B]"
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.id
                    ? "bg-[#E7F0E9] text-[#1F4D3A]"
                    : "bg-[#F6F3EA] text-[#6E6E6E]"
                }`}
              >
                {tab.count}
              </span>
            )}
            {activeTab === tab.id && (
              <motion.div
                layoutId="aktivitas-tab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1F4D3A]"
              />
            )}
          </button>
        ))}
      </FadeUp>

      {/* Content Section: Berlangsung */}
      <StaggerContainer className="space-y-4 mb-10">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="font-sora font-bold text-lg text-[#1B1B1B]">
            Berlangsung
          </h2>
          <span className="text-[#6E6E6E] font-medium text-sm">(3)</span>
        </div>

        {AKTIVITAS_BERLANGSUNG.map((act) => (
          <StaggerItem key={act.id}>
            <div className="bg-white rounded-3xl p-4 border border-[#DDD6C8] flex flex-col md:flex-row gap-5 items-start md:items-center hover:shadow-sm transition-shadow">
              {/* Left: Icon Box */}
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-[#F6F3EA] flex flex-shrink-0 items-center justify-center text-[#5F8B6D]">
                <act.icon size={36} strokeWidth={1} />
              </div>

              {/* Middle: Info */}
              <div className="flex-1 space-y-2">
                <Badge className={act.typeColor}>{act.type}</Badge>
                <h3 className="font-sora font-semibold text-[#1B1B1B] text-[15px] leading-snug pr-4">
                  {act.title}
                </h3>
                <p className="text-[10px] text-[#6E6E6E] font-medium">
                  {act.meta}
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <span className="text-[10px] text-[#6E6E6E] font-medium w-12">
                    Progres
                  </span>
                  <div className="flex-1 bg-[#E7DCCB] h-1.5 rounded-full overflow-hidden max-w-[200px]">
                    <div
                      className="bg-[#1F4D3A] h-full rounded-full"
                      style={{ width: `${act.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-bold text-[#1B1B1B]">
                    {act.progress}%
                  </span>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto h-full gap-4 md:gap-0 md:py-2">
                <div className="flex items-center gap-2 order-2 md:order-1">
                  <button className="text-[#A8C3A0] hover:text-[#1F4D3A] transition-colors">
                    <Bookmark size={18} strokeWidth={1.5} />
                  </button>
                  <button className="text-[#6E6E6E] hover:text-[#1B1B1B] transition-colors">
                    <MoreVertical size={18} strokeWidth={1.5} />
                  </button>
                </div>

                <div className="flex flex-col md:items-end gap-2 order-1 md:order-2">
                  <p className="text-[10px] text-[#6E6E6E]">
                    Sisa Waktu <br className="hidden md:block" />
                    <span className={`font-bold ${act.timeColor}`}>
                      {act.timeRemaining}
                    </span>
                  </p>
                  <Button
                    variant="outline"
                    className={`w-fit py-1.5 px-4 text-xs ${act.btnText === "Lanjutkan" ? "bg-[#FCFBF8]" : ""}`}
                  >
                    {act.btnText}
                  </Button>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Content Section: Menunggu */}
      <StaggerContainer className="space-y-4 mb-10">
        <div className="flex items-center gap-2 mb-4 pt-6 border-t border-[#DDD6C8]/50">
          <h2 className="font-sora font-bold text-lg text-[#1B1B1B]">
            Menunggu
          </h2>
          <span className="text-[#6E6E6E] font-medium text-sm">(2)</span>
        </div>

        {AKTIVITAS_MENUNGGU.map((act) => (
          <StaggerItem key={act.id}>
            <div className="bg-white rounded-3xl p-4 border border-[#DDD6C8] flex flex-col md:flex-row gap-5 items-start md:items-center hover:shadow-sm transition-shadow">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#F6F3EA] flex flex-shrink-0 items-center justify-center text-[#5F8B6D]">
                <act.icon size={32} strokeWidth={1} />
              </div>

              <div className="flex-1 space-y-2">
                <Badge className={act.typeColor}>{act.type}</Badge>
                <h3 className="font-sora font-semibold text-[#1B1B1B] text-[15px] leading-snug pr-4">
                  {act.title}
                </h3>
                <p className="text-[10px] text-[#6E6E6E] font-medium">
                  {act.meta}
                </p>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto h-full gap-4 md:gap-0 md:py-2">
                <div className="flex items-center gap-2 order-2 md:order-1">
                  <button className="text-[#A8C3A0] hover:text-[#1F4D3A] transition-colors">
                    <Bookmark size={18} strokeWidth={1.5} />
                  </button>
                  <button className="text-[#6E6E6E] hover:text-[#1B1B1B] transition-colors">
                    <MoreVertical size={18} strokeWidth={1.5} />
                  </button>
                </div>

                <div className="flex flex-col md:items-end gap-1 order-1 md:order-2">
                  <Badge
                    className={`bg-[#FCF5E3] ${act.statusColor} font-bold mb-1`}
                  >
                    {act.status}
                  </Badge>
                  <p className="text-[10px] text-[#6E6E6E]">
                    Estimasi: {act.estimate}
                  </p>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Bottom Banner */}
      <FadeUp
        delay={0.4}
        className="mt-8 bg-[#E7F0E9] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between border border-[#A8C3A0]/30 gap-6 relative overflow-hidden"
      >
        {/* Simple mountain illustration dummy */}
        <div className="absolute left-0 bottom-0 opacity-40 flex items-end">
          <svg
            width="120"
            height="50"
            viewBox="0 0 120 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 50L25 25L50 40L80 10L120 50H0Z" fill="#A8C3A0" />
          </svg>
        </div>

        <div className="relative z-10 flex items-center gap-4 pl-4 md:pl-32">
          <div className="hidden md:flex absolute left-6 bottom-0 text-[#1F4D3A]">
            <Users size={32} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-sora font-semibold text-[#1B1B1B] text-sm">
              Terus berkarya dan beri dampak nyata!
            </h3>
            <p className="text-[10px] text-[#6E6E6E] mt-1">
              Konsistensi kecilmu hari ini, bisa mengubah banyak hal.
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          className="relative z-10 whitespace-nowrap text-xs"
        >
          Lihat Statistik <ArrowRight size={14} className="ml-1.5" />
        </Button>
      </FadeUp>
    </div>
  );
};

const AktivitasRightSidebar = () => (
  <aside className="w-[340px] h-screen sticky top-0 bg-[#FCFBF8] border-l border-[#DDD6C8] flex flex-col py-8 px-6 z-20 flex-shrink-0 overflow-y-auto hide-scrollbar">
    {/* Ringkasan Aktivitas */}
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">
          Ringkasan Aktivitas
        </h3>
        <button className="text-[10px] text-[#6E6E6E] font-medium hover:text-[#1B1B1B]">
          Lihat semua
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-[#F6F3EA] rounded-2xl p-3 flex flex-col items-center justify-center text-center border border-transparent hover:border-[#DDD6C8] transition-colors cursor-pointer">
          <span className="font-sora font-bold text-lg text-[#1B1B1B]">3</span>
          <span className="text-[9px] text-[#6E6E6E] font-medium mt-0.5">
            Berlangsung
          </span>
        </div>
        <div className="bg-[#FCF5E3] rounded-2xl p-3 flex flex-col items-center justify-center text-center border border-transparent hover:border-[#F5B041]/30 transition-colors cursor-pointer">
          <span className="font-sora font-bold text-lg text-[#1B1B1B]">2</span>
          <span className="text-[9px] text-[#6E6E6E] font-medium mt-0.5">
            Menunggu
          </span>
        </div>
        <div className="bg-[#E7F0E9] rounded-2xl p-3 flex flex-col items-center justify-center text-center border border-transparent hover:border-[#5F8B6D]/30 transition-colors cursor-pointer">
          <span className="font-sora font-bold text-lg text-[#1B1B1B]">12</span>
          <span className="text-[9px] text-[#6E6E6E] font-medium mt-0.5">
            Selesai
          </span>
        </div>
        <div className="bg-red-50 rounded-2xl p-3 flex flex-col items-center justify-center text-center border border-transparent hover:border-red-200 transition-colors cursor-pointer">
          <span className="font-sora font-bold text-lg text-red-600">1</span>
          <span className="text-[9px] text-red-600 font-medium mt-0.5">
            Dibatalkan
          </span>
        </div>
      </div>
    </div>

    {/* Kalender Deadline */}
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">
          Kalender Deadlinemu
        </h3>
        <div className="flex items-center gap-2">
          <ChevronLeft
            size={16}
            className="text-[#6E6E6E] cursor-pointer hover:text-[#1B1B1B]"
          />
          <span className="text-[10px] font-semibold text-[#1B1B1B]">
            Mei 2024
          </span>
          <ChevronRight
            size={16}
            className="text-[#6E6E6E] cursor-pointer hover:text-[#1B1B1B]"
          />
        </div>
      </div>

      <div className="bg-white border border-[#DDD6C8] rounded-2xl p-4 shadow-sm">
        <div className="grid grid-cols-7 text-center mb-3">
          {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((day) => (
            <div key={day} className="text-[9px] font-semibold text-[#6E6E6E]">
              {day}
            </div>
          ))}
        </div>

        {/* Simple Dummy Calendar Grid for May 2024 */}
        <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-medium text-[#1B1B1B]">
          <div className="text-[#DDD6C8]">29</div>
          <div className="text-[#DDD6C8]">30</div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
          <div>11</div>
          <div>12</div>
          <div>13</div>
          <div>14</div>
          <div>15</div>
          <div>16</div>
          <div>17</div>
          <div>18</div>
          <div>19</div>

          <div className="relative z-10 w-6 h-6 mx-auto bg-[#1F4D3A] text-white rounded-full flex items-center justify-center shadow-sm">
            20
          </div>
          <div>21</div>
          <div>22</div>
          <div className="relative z-10 w-6 h-6 mx-auto border border-[#F5B041] text-[#B77B57] bg-[#FCF5E3] rounded-full flex items-center justify-center">
            23
          </div>
          <div>24</div>
          <div>25</div>
          <div>26</div>

          <div>27</div>
          <div>28</div>
          <div>29</div>
          <div className="relative z-10 w-6 h-6 mx-auto border border-[#5F8B6D] text-[#1F4D3A] rounded-full flex items-center justify-center">
            30
          </div>
          <div>31</div>
          <div className="text-[#DDD6C8]">1</div>
          <div className="text-[#DDD6C8]">2</div>
        </div>

        <div className="flex gap-4 mt-4 pt-4 border-t border-[#F6F3EA] justify-center">
          <div className="flex items-center gap-1.5 text-[9px] text-[#6E6E6E] font-medium">
            <div className="w-2 h-2 rounded-full bg-[#1F4D3A]"></div> Deadline
          </div>
          <div className="flex items-center gap-1.5 text-[9px] text-[#6E6E6E] font-medium">
            <div className="w-2 h-2 rounded-full bg-[#F5B041]"></div> Menunggu
            Review
          </div>
        </div>
      </div>
    </div>

    {/* Pencapaian Minggu Ini */}
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">
          Pencapaian Minggu Ini
        </h3>
        <button className="text-[10px] text-[#6E6E6E] font-medium hover:text-[#1B1B1B]">
          Lihat semua
        </button>
      </div>
      <div className="bg-white border border-[#DDD6C8] rounded-2xl p-4 shadow-sm flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#E7F0E9] text-[#5F8B6D] flex items-center justify-center flex-shrink-0">
          <Leaf size={18} />
        </div>
        <div className="flex-1">
          <h4 className="text-[11px] font-bold text-[#1B1B1B] mb-0.5">
            Kamu hebat! 💚
          </h4>
          <p className="text-[9px] text-[#6E6E6E] mb-2">
            3 dari 5 aktivitas minggu ini selesai.
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-[#F6F3EA] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#5F8B6D] h-full rounded-full w-[60%]"></div>
            </div>
            <span className="text-[9px] font-bold text-[#1B1B1B]">60%</span>
          </div>
        </div>
      </div>
    </div>

    {/* Riwayat Terbaru */}
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">
          Riwayat Terbaru
        </h3>
        <button className="text-[10px] text-[#6E6E6E] font-medium hover:text-[#1B1B1B]">
          Lihat semua
        </button>
      </div>
      <div className="space-y-4">
        {[
          {
            title: "Desain Konten Instagram untuk UMKM Kopi",
            action: "Progres diperbarui",
            time: "2 jam lalu",
            icon: Coffee,
            bg: "bg-[#F6F3EA]",
            textC: "text-[#1B1B1B]",
          },
          {
            title: "Edukasi Anak Minggu (Volunteer)",
            action: "Kehadiran dikonfirmasi",
            time: "5 jam lalu",
            icon: FileCheck2,
            bg: "bg-[#E7F0E9]",
            textC: "text-[#1F4D3A]",
          },
          {
            title: "Partner untuk Project Video Dokumenter",
            action: "File baru diunggah",
            time: "1 hari lalu",
            icon: Megaphone,
            bg: "bg-[#F6F3EA]",
            textC: "text-[#1B1B1B]",
          },
        ].map((item, i) => (
          <div key={i} className="flex gap-3 group cursor-pointer">
            <div
              className={`w-8 h-8 rounded-full ${item.bg} flex items-center justify-center flex-shrink-0 ${item.textC}`}
            >
              <item.icon size={14} strokeWidth={1.5} />
            </div>
            <div className="flex-1 pb-3 border-b border-[#F6F3EA] group-last:border-0">
              <h4 className="text-[11px] font-semibold text-[#1B1B1B] leading-snug group-hover:text-[#1F4D3A] line-clamp-1">
                {item.title}
              </h4>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[9px] text-[#6E6E6E]">{item.action}</span>
                <span className="text-[8px] font-medium text-[#A8C3A0]">
                  {item.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom Quote Card */}
    <div className="mt-auto bg-[#E7F0E9] rounded-2xl p-5 border border-[#A8C3A0]/30 relative overflow-hidden">
      <div className="relative z-10 flex flex-col justify-between h-full">
        <span className="font-sora font-bold text-3xl text-[#5F8B6D] opacity-40 absolute -top-2 -left-1">
          “
        </span>
        <p className="text-[11px] font-semibold text-[#1F4D3A] italic leading-relaxed pt-3 pl-3 pr-4">
          Setiap kontribusi kecilmu, menjadi pijakan besar bagi perubahan.
        </p>
        <span className="font-sora font-bold text-3xl text-[#5F8B6D] opacity-40 absolute -bottom-6 right-0">
          ”
        </span>
      </div>
      <Leaf className="absolute -bottom-3 -right-2 text-[#A8C3A0]/30 w-16 h-16" />
    </div>
  </aside>
);

// ============================================================================
// --- DETAIL PELUANG COMPONENTS (NEW) ---
// ============================================================================
const DetailPeluangMain = ({ setCurrentPage }) => {
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

const DetailPeluangRightSidebar = ({ setCurrentPage }) => (
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

// ============================================================================
// --- KIRIM PROPOSAL COMPONENTS (NEW & DYNAMIC) ---
// ============================================================================
const KirimProposalMain = ({
  setCurrentPage,
  opportunityData,
  setOpportunityData,
}) => {
  const isFreelance = opportunityData.type === "Freelance";

  // Toggle Function just for demonstration of Dynamic Form
  const toggleOppType = () => {
    setOpportunityData((prev) => ({
      ...prev,
      type: prev.type === "Freelance" ? "Volunteer" : "Freelance",
      badgeColor:
        prev.type === "Freelance"
          ? "bg-green-100 text-green-700"
          : "bg-[#E7F0E9] text-[#1F4D3A]",
      reward:
        prev.type === "Freelance"
          ? "Sertifikat + Pengalaman"
          : "Rp500.000 - Rp750.000",
    }));
  };

  return (
    <div className="max-w-[850px] mx-auto pb-10">
      {/* Header Actions */}
      <FadeUp className="mt-4 mb-8 flex items-center justify-between">
        <button
          onClick={() => setCurrentPage("detail")}
          className="flex items-center gap-2 text-xs font-semibold text-[#6E6E6E] hover:text-[#1F4D3A] transition-colors"
        >
          <ArrowLeft size={16} /> Kembali ke detail peluang
        </button>
        <div className="flex items-center gap-4 text-[#6E6E6E]">
          {/* Developer Toggle to show dynamic features */}
          <button
            onClick={toggleOppType}
            className="flex items-center gap-1.5 bg-[#E7DCCB] text-[#1B1B1B] px-3 py-1.5 rounded-full text-[10px] font-bold hover:bg-[#DDD6C8] transition-colors"
          >
            <ArrowRightLeft size={12} /> Ubah ke{" "}
            {isFreelance ? "Volunteer" : "Freelance"}
          </button>

          <button className="flex items-center gap-2 text-[11px] font-semibold hover:text-[#1B1B1B] border border-[#DDD6C8] px-3 py-1.5 rounded-full bg-white transition-colors">
            <Bookmark size={14} /> Simpan Draft
          </button>
        </div>
      </FadeUp>

      {/* Progress Stepper */}
      <FadeUp
        delay={0.1}
        className="w-full max-w-3xl mx-auto mb-10 flex items-center justify-between relative px-4"
      >
        <div className="absolute left-[10%] right-[10%] top-4 h-0.5 bg-[#DDD6C8] -z-10"></div>
        {[
          { num: 1, label: "Informasi Proposal", active: true },
          { num: 2, label: "Portofolio & Dokumen", active: false },
          { num: 3, label: "Tinjau Proposal", active: false },
          { num: 4, label: "Kirim Proposal", active: false },
        ].map((step, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 bg-[#F6F3EA] px-2"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                step.active
                  ? "bg-[#1F4D3A] text-white border-[#1F4D3A]"
                  : "bg-white text-[#A8C3A0] border-[#DDD6C8]"
              }`}
            >
              {step.num}
            </div>
            <span
              className={`text-[10px] font-semibold ${step.active ? "text-[#1B1B1B]" : "text-[#A8C3A0]"}`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </FadeUp>

      {/* Header Info */}
      <FadeUp
        delay={0.2}
        className="flex flex-col-reverse md:flex-row gap-8 mb-8"
      >
        <div className="flex-1">
          <h1 className="font-sora font-bold text-3xl text-[#1B1B1B] flex items-center gap-3 mb-2">
            Kirim Proposal <Leaf className="text-[#5F8B6D] w-6 h-6" />
          </h1>
          <p className="text-xs text-[#6E6E6E] max-w-md">
            Tunjukkan minatmu dan ceritakan bagaimana kamu bisa berkontribusi di
            peluang ini.
          </p>
        </div>
        {/* Dummy Illustration Box */}
        <div className="w-40 h-28 bg-[#F6F3EA] flex items-end justify-center relative flex-shrink-0 -mb-4">
          <div className="w-24 h-24 bg-[#5F8B6D] rounded-t-full relative z-10 flex items-end justify-center px-4">
            <div className="w-16 h-10 bg-[#E7F0E9] rounded-t-md border-2 border-[#1F4D3A]"></div>
          </div>
          <Sparkles
            className="absolute right-4 top-2 text-[#F5B041]"
            size={16}
          />
        </div>
      </FadeUp>

      {/* Target Peluang Card */}
      <FadeUp
        delay={0.3}
        className="bg-white border border-[#DDD6C8] rounded-3xl p-5 mb-8 flex flex-col md:flex-row gap-4 justify-between items-start shadow-sm"
      >
        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 rounded-full bg-[#E7F0E9] text-[#1F4D3A] flex items-center justify-center font-bold text-[9px] text-center leading-tight flex-shrink-0 mt-1">
            Kopi
            <br />
            Nusantara
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-[#6E6E6E] mb-1 uppercase tracking-wider">
              PELUANG YANG DILAMAR
            </h4>
            <h3 className="font-sora font-bold text-[#1B1B1B] text-[15px] mb-1">
              {opportunityData.title}
            </h3>
            <div className="flex items-center gap-2 text-[11px] text-[#6E6E6E] mb-2">
              <span className="font-medium text-[#1B1B1B]">
                {opportunityData.organizer}
              </span>
              <div className="w-1 h-1 bg-[#DDD6C8] rounded-full"></div>
              <span>{opportunityData.loc}</span>
            </div>
            <Badge className={opportunityData.badgeColor}>
              {opportunityData.type}
            </Badge>
          </div>
        </div>
        <button className="text-[#A8C3A0] hover:text-[#1F4D3A]">
          <Bookmark size={20} />
        </button>
      </FadeUp>

      {/* Form Area */}
      <FadeUp delay={0.4} className="space-y-8 bg-transparent">
        <h2 className="font-sora font-bold text-lg text-[#1B1B1B]">
          Informasi Proposal
        </h2>

        <form className="space-y-6">
          {/* Dynamic Field: Role Name */}
          <div>
            <Label required>
              {isFreelance ? "Peran yang Dilamar" : "Posisi Relawan"}
            </Label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6E6E]">
                {isFreelance ? (
                  <Palette size={16} />
                ) : (
                  <HeartHandshake size={16} />
                )}
              </div>
              <Select defaultValue="desainer" className="pl-11">
                <option value="desainer">Desainer Grafis</option>
                <option value="lainnya">Lainnya</option>
              </Select>
            </div>
          </div>

          <div>
            <Label required>Perkenalkan dirimu</Label>
            <div className="relative">
              <Textarea
                rows="4"
                defaultValue="Halo tim Kopi Nusantara! Saya Raka, seorang desainer grafis yang memiliki pengalaman dalam membuat konten visual untuk brand F&B dan UMKM. Saya tertarik dengan peluang ini karena sesuai dengan passion saya dalam desain dan juga mendukung brand lokal berkembang."
                className="text-[#1B1B1B] leading-relaxed"
              />
              <span className="absolute right-3 bottom-3 text-[10px] font-medium text-[#A8C3A0]">
                215 / 500
              </span>
            </div>
          </div>

          <div>
            <Label required>Mengapa kamu cocok untuk proyek ini?</Label>
            <div className="relative">
              <Textarea
                rows="3"
                defaultValue="Saya memiliki pengalaman membuat konten media sosial yang menarik, memahami karakter brand kopi, dan mampu bekerja sesuai deadline."
                className="text-[#1B1B1B] leading-relaxed"
              />
              <span className="absolute right-3 bottom-3 text-[10px] font-medium text-[#A8C3A0]">
                156 / 300
              </span>
            </div>
          </div>

          <div>
            <Label required>
              {isFreelance
                ? "Pendekatanmu untuk proyek ini"
                : "Harapanmu setelah mengikuti program ini"}
            </Label>
            <div className="relative">
              <Textarea
                rows="3"
                defaultValue={
                  isFreelance
                    ? "Saya akan memulai dengan memahami brand & target audiens Kopi Nusantara, lalu membuat konsep visual yang konsisten, modern, dan relevan dengan karakter brand."
                    : "Saya berharap bisa belajar banyak tentang industri kopi lokal dan menambah relasi positif dengan sesama relawan."
                }
                className="text-[#1B1B1B] leading-relaxed"
              />
              <span className="absolute right-3 bottom-3 text-[10px] font-medium text-[#A8C3A0]">
                178 / 300
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label required>Ketersediaan Waktu</Label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6E6E]">
                  <Calendar size={16} />
                </div>
                <Select defaultValue="10-15" className="pl-11">
                  <option value="10-15">10-15 jam per minggu</option>
                  <option value="5-10">5-10 jam per minggu</option>
                </Select>
              </div>
              <p className="text-[10px] text-[#6E6E6E] mt-2">
                Pilih estimasi waktu yang bisa kamu commit.
              </p>
            </div>

            {/* Dynamic Field: Budget vs No Budget */}
            {isFreelance && (
              <div>
                <Label>Ekspektasi Budget (Opsional)</Label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6E6E]">
                    <Wallet size={16} />
                  </div>
                  <Input
                    defaultValue="Rp500.000 - Rp750.000"
                    className="pl-11 font-medium text-[#1B1B1B]"
                  />
                </div>
                <p className="text-[10px] text-[#6E6E6E] mt-2">
                  Berikan range budget yang kamu harapkan (opsional).
                </p>
              </div>
            )}
          </div>

          {/* Portofolio Area */}
          <div className="bg-[#FCFBF8] border border-[#DDD6C8] rounded-3xl p-6 space-y-5">
            <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">
              Portofolio & Dokumen
            </h3>
            <p className="text-[10px] text-[#6E6E6E]">
              Tunjukkan karya terbaikmu yang relevan dengan proyek ini.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="border-2 border-dashed border-[#A8C3A0] rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-2 bg-[#E7F0E9]/30 hover:bg-[#E7F0E9] transition-colors cursor-pointer group">
                <Upload
                  size={24}
                  className="text-[#5F8B6D] group-hover:-translate-y-1 transition-transform"
                />
                <span className="text-[11px] font-bold text-[#1F4D3A]">
                  Upload Portofolio
                </span>
                <span className="text-[9px] text-[#6E6E6E]">
                  PDF, PPT, atau ZIP maks. 20MB
                </span>
                <Badge className="bg-white border border-[#DDD6C8] text-[#1B1B1B] mt-2 shadow-sm">
                  Pilih File
                </Badge>
              </div>

              <div className="flex flex-col justify-center gap-3">
                <span className="text-[11px] font-semibold text-[#1B1B1B]">
                  Atau tambahkan link portofolio
                </span>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6E6E]">
                    <LinkIcon size={14} />
                  </div>
                  <Input
                    defaultValue="https://behance.net/rakamahendra"
                    className="pl-10 text-xs font-medium"
                  />
                  <Check
                    size={14}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5F8B6D]"
                  />
                </div>
                <span className="text-[9px] text-[#6E6E6E]">
                  Contoh: Behance, Dribbble, Google Drive, atau website pribadi.
                </span>
              </div>
            </div>

            {/* Uploaded File Preview */}
            <div className="bg-white border border-[#DDD6C8] rounded-xl p-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-red-50 p-2 rounded-lg text-red-500">
                  <FileIcon size={16} />
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold text-[#1B1B1B]">
                    Portfolio_RakaMahendra.pdf
                  </h4>
                  <p className="text-[9px] text-[#6E6E6E]">2.6 MB</p>
                </div>
              </div>
              <button className="text-[#6E6E6E] hover:text-red-500 transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>

          <div>
            <Label>Pesan Tambahan (Opsional)</Label>
            <div className="relative">
              <Textarea
                rows="2"
                placeholder="Tulis pesan tambahan untuk pemberi peluang..."
              />
              <span className="absolute right-3 bottom-3 text-[10px] font-medium text-[#A8C3A0]">
                0 / 250
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex flex-col items-center gap-3">
            <Button className="w-full py-4 text-sm shadow-md font-bold hover:shadow-lg">
              Lanjutkan ke Tinjau Proposal{" "}
              <ArrowRight size={16} className="ml-2" />
            </Button>
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#6E6E6E]">
              <CheckSquare size={12} className="text-[#A8C3A0]" /> Draft akan
              otomatis tersimpan
            </div>
          </div>
        </form>
      </FadeUp>
    </div>
  );
};

const KirimProposalRightSidebar = ({ opportunityData }) => {
  const isFreelance = opportunityData.type === "Freelance";

  return (
    <aside className="w-[360px] h-screen sticky top-0 bg-[#FCFBF8] border-l border-[#DDD6C8] flex flex-col py-8 px-6 z-20 flex-shrink-0 overflow-y-auto hide-scrollbar">
      {/* Ringkasan Peluang Dynamic */}
      <div className="mb-6">
        <h3 className="font-sora font-bold text-sm text-[#1B1B1B] mb-4">
          Ringkasan Peluang
        </h3>
        <div className="bg-white border border-[#DDD6C8] rounded-3xl p-5 shadow-sm">
          <div className="flex gap-3 items-center mb-4 pb-4 border-b border-[#F6F3EA]">
            <div className="w-10 h-10 rounded-full bg-[#E7F0E9] text-[#1F4D3A] flex items-center justify-center font-bold text-[8px] text-center leading-tight">
              Kopi
              <br />
              Nus
            </div>
            <div>
              <h4 className="font-sora font-bold text-[#1B1B1B] text-xs flex items-center gap-1">
                {opportunityData.organizer}{" "}
                <BadgeCheck
                  size={12}
                  className="text-[#5F8B6D] fill-[#E7F0E9]"
                />
              </h4>
              <p className="text-[10px] text-[#6E6E6E]">UMKM Kopi Lokal</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-[#6E6E6E]">Jenis</span>
              <span className="font-semibold text-[#1B1B1B]">
                {opportunityData.type}
              </span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-[#6E6E6E]">Deadline</span>
              <span className="font-semibold text-[#1B1B1B]">
                {opportunityData.deadline}
              </span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-[#6E6E6E]">Tingkat</span>
              <span className="font-semibold text-[#1B1B1B]">
                {opportunityData.level}
              </span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-[#6E6E6E]">
                {isFreelance ? "Budget" : "Reward"}
              </span>
              <span className="font-bold text-[#1F4D3A]">
                {opportunityData.reward}
              </span>
            </div>
          </div>

          <button className="w-full border border-[#DDD6C8] text-[#1B1B1B] text-[11px] font-semibold py-2 mt-5 rounded-xl hover:bg-[#F6F3EA] transition-colors flex justify-center items-center gap-1.5">
            Lihat Detail Peluang <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* Tips Kirim Proposal */}
      <div className="mb-6 bg-[#FCFBF8] border border-[#DDD6C8] rounded-3xl p-5 shadow-sm relative overflow-hidden">
        <h3 className="font-sora font-bold text-sm text-[#1B1B1B] mb-4 flex items-center gap-2 relative z-10">
          Tips Kirim Proposal <Leaf size={16} className="text-[#5F8B6D]" />
        </h3>
        <div className="space-y-4 relative z-10">
          <div className="flex gap-3 items-start">
            <div className="bg-[#E7F0E9] p-1.5 rounded-lg text-[#1F4D3A] flex-shrink-0 mt-0.5">
              <HeartHandshake size={14} />
            </div>
            <p className="text-[10px] text-[#1B1B1B] font-medium leading-relaxed">
              Tunjukkan ketertarikanmu yang tulus terhadap proyek ini
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <div className="bg-[#E7F0E9] p-1.5 rounded-lg text-[#1F4D3A] flex-shrink-0 mt-0.5">
              <CheckSquare size={14} />
            </div>
            <p className="text-[10px] text-[#1B1B1B] font-medium leading-relaxed">
              Jelaskan relevansi skill kamu dengan kebutuhan proyek
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <div className="bg-[#E7F0E9] p-1.5 rounded-lg text-[#1F4D3A] flex-shrink-0 mt-0.5">
              <FileText size={14} />
            </div>
            <p className="text-[10px] text-[#1B1B1B] font-medium leading-relaxed">
              Lampirkan portofolio terbaik dan paling relevan
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <div className="bg-[#E7F0E9] p-1.5 rounded-lg text-[#1F4D3A] flex-shrink-0 mt-0.5">
              <PenLine size={14} />
            </div>
            <p className="text-[10px] text-[#1B1B1B] font-medium leading-relaxed">
              Tulis dengan singkat, jelas, dan profesional
            </p>
          </div>
        </div>
        {/* Simple decorative plants bottom */}
        <div className="absolute right-0 bottom-0 text-[#A8C3A0]/40 flex items-end">
          <Leaf size={40} className="rotate-[-20deg]" />
          <Trees size={60} />
        </div>
      </div>

      {/* Quote Card */}
      <div className="mt-auto bg-[#E7F0E9] rounded-2xl p-5 border border-[#A8C3A0]/30 relative overflow-hidden flex flex-col justify-center items-center text-center">
        <h4 className="font-sora font-bold text-xs text-[#1F4D3A] mb-1 flex items-center gap-1 justify-center">
          Ingat! 💚
        </h4>
        <p className="text-[10px] font-medium text-[#5F8B6D] leading-relaxed mb-10 relative z-10">
          Setiap proposal adalah langkah nyata untuk memberikan dampak. Terus
          semangat! ✨
        </p>
        <div className="absolute -bottom-6 w-full flex justify-center">
          <div className="w-20 h-24 bg-[#1F4D3A] rounded-t-full flex items-end justify-center pb-2">
            <Leaf size={24} className="text-[#A8C3A0] mb-6" strokeWidth={1.5} />
          </div>
          {/* Abstract hands shape */}
          <div className="absolute bottom-4 w-12 h-6 border-b-2 border-l-2 border-[#1B1B1B] rounded-bl-xl rotate-12"></div>
        </div>
      </div>
    </aside>
  );
};

// ============================================================================
// --- PROFIL COMPONENTS (NEW) ---
// ============================================================================
const ProfilMain = () => {
  const [activeTab, setActiveTab] = useState("ringkasan");
  const tabs = [
    { id: "ringkasan", label: "Ringkasan", icon: LayoutGrid },
    { id: "aktivitas", label: "Aktivitas Saya", icon: ClipboardList },
    { id: "peluang", label: "Peluang Saya", icon: FolderHeart },
    { id: "sertifikat", label: "Sertifikat", icon: Award },
    { id: "pengaturan", label: "Pengaturan", icon: Settings },
  ];

  return (
    <div className="max-w-[850px] mx-auto pb-10">
      {/* Header Profile Hero */}
      <FadeUp className="mt-6 mb-8 bg-white border border-[#DDD6C8] rounded-3xl p-6 relative overflow-hidden shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Profile Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-28 h-28 rounded-full bg-[#E7DCCB] overflow-hidden border-4 border-white shadow-sm flex items-center justify-center">
            {/* Dummy image placement as requested */}
            <img
              src="https://placehold.co/200x200/5F8B6D/F6F3EA?text=Raka"
              alt="Raka Mahendra"
              className="w-full h-full object-cover"
            />
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#1F4D3A] text-white rounded-full flex items-center justify-center border-2 border-white hover:bg-[#15382A] transition-colors shadow-sm">
            <Camera size={14} />
          </button>
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left z-10 pt-2">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2 justify-center md:justify-start">
            <h1 className="font-sora font-bold text-2xl text-[#1B1B1B] flex items-center gap-2">
              Raka Mahendra <Leaf className="text-[#5F8B6D] w-5 h-5" />
            </h1>
          </div>
          <Badge className="bg-[#E7F0E9] text-[#1F4D3A] mb-3 inline-block">
            Kreator Muda
          </Badge>
          <p className="text-xs text-[#6E6E6E] mb-4 max-w-sm mx-auto md:mx-0 leading-relaxed">
            Desain grafis & konten kreator yang peduli lingkungan. Bergerak
            untuk dampak positif bersama komunitas.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[11px] font-medium text-[#6E6E6E]">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-[#A8C3A0]" /> Surabaya,
              Indonesia
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} className="text-[#A8C3A0]" /> Bergabung
              sejak Jan 2024
            </span>
          </div>
        </div>

        {/* Edit Button & CSS Illustration Background */}
        <div className="absolute top-6 right-6 z-20">
          <button className="flex items-center gap-1.5 text-xs font-semibold text-[#1B1B1B] bg-white border border-[#DDD6C8] px-4 py-2 rounded-full hover:bg-[#F6F3EA] transition-colors shadow-sm">
            <Edit3 size={14} /> Edit Profil
          </button>
        </div>

        <div className="absolute bottom-0 right-0 w-64 h-32 opacity-80 pointer-events-none flex items-end justify-end">
          <svg
            width="250"
            height="120"
            viewBox="0 0 250 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120 C 50 120, 80 40, 150 70 C 200 90, 230 50, 250 80 L 250 120 Z"
              fill="#E7F0E9"
            />
            <path
              d="M40 120 C 90 120, 120 70, 180 90 C 220 100, 240 70, 250 90 L 250 120 Z"
              fill="#A8C3A0"
              opacity="0.3"
            />
            {/* Plant sprout */}
            <path
              d="M150 120 L150 70 M150 70 C 130 70, 130 50, 150 50 M150 60 C 170 60, 170 40, 150 40"
              stroke="#1F4D3A"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      </FadeUp>

      {/* Navigation Tabs */}
      <FadeUp
        delay={0.1}
        className="flex gap-1 overflow-x-auto hide-scrollbar mb-8 border-b border-[#DDD6C8] pb-0"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-[11px] font-semibold flex items-center gap-2 whitespace-nowrap transition-colors relative ${
              activeTab === tab.id
                ? "text-[#1F4D3A]"
                : "text-[#6E6E6E] hover:text-[#1B1B1B]"
            }`}
          >
            <tab.icon size={14} strokeWidth={activeTab === tab.id ? 2 : 1.5} />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="profil-tab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1F4D3A]"
              />
            )}
          </button>
        ))}
      </FadeUp>

      {/* Tab Content: Ringkasan */}
      {activeTab === "ringkasan" && (
        <div className="space-y-8">
          {/* Ringkasan Profil Stats */}
          <StaggerContainer>
            <h3 className="font-sora font-bold text-sm text-[#1B1B1B] mb-4 px-1">
              Ringkasan Profil
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                {
                  label: "Peluang Diikuti",
                  val: "12",
                  sub: "Terus belajar & berkembang",
                  icon: Trees,
                  bg: "bg-[#E7F0E9]",
                },
                {
                  label: "Aktivitas Selesai",
                  val: "8",
                  sub: "Keren! Konsisten ya",
                  icon: Users,
                  bg: "bg-[#F6F3EA]",
                },
                {
                  label: "Total Poin",
                  val: "320 XP",
                  sub: "Level 3 - Kreator Muda",
                  icon: Star,
                  bg: "bg-yellow-50",
                  iconColor: "text-yellow-500 fill-yellow-100",
                },
                {
                  label: "Badges",
                  val: "5",
                  sub: "Dampak nyata untuk bumi",
                  icon: Leaf,
                  bg: "bg-[#E7F0E9]",
                },
              ].map((stat, i) => (
                <StaggerItem
                  key={i}
                  className="bg-white border border-[#DDD6C8] rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm"
                >
                  <div
                    className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center mb-2 ${stat.iconColor || "text-[#1F4D3A]"}`}
                  >
                    <stat.icon size={20} strokeWidth={1.5} />
                  </div>
                  <span className="font-sora font-bold text-lg text-[#1B1B1B] leading-tight">
                    {stat.val}
                  </span>
                  <span className="text-[10px] font-semibold text-[#1B1B1B] mb-0.5">
                    {stat.label}
                  </span>
                  <span className="text-[8px] text-[#6E6E6E]">{stat.sub}</span>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {/* Badges */}
          <StaggerContainer>
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">
                Badge yang Kamu Miliki
              </h3>
              <button className="text-[10px] text-[#6E6E6E] font-medium hover:text-[#1B1B1B]">
                Lihat semua
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                {
                  title: "Aksi Nyata",
                  desc: "Selesai 1 aktivitas",
                  icon: Scissors,
                },
                {
                  title: "Kolaborator Hebat",
                  desc: "Kerja sama di 3 project",
                  icon: Users,
                },
                {
                  title: "Konsisten",
                  desc: "Aktif 7 hari berturut-turut",
                  icon: Calendar,
                },
                {
                  title: "Impact Maker",
                  desc: "Beri dampak ke komunitas",
                  icon: Globe,
                },
                {
                  title: "Explorer",
                  desc: "Jelajahi 10 peluang",
                  icon: Compass,
                },
              ].map((badge, i) => (
                <StaggerItem
                  key={i}
                  className="flex flex-col items-center text-center gap-2 group cursor-pointer"
                >
                  <div className="relative w-16 h-16 flex items-center justify-center transition-transform group-hover:-translate-y-1">
                    <Hexagon
                      size={64}
                      className="text-[#E7F0E9] fill-[#E7F0E9]"
                      strokeWidth={1}
                    />
                    <Hexagon
                      size={54}
                      className="text-[#5F8B6D] absolute"
                      strokeWidth={2}
                    />
                    <badge.icon
                      size={24}
                      className="absolute text-[#1F4D3A]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-[#1B1B1B] leading-tight">
                      {badge.title}
                    </h4>
                    <p className="text-[8px] text-[#6E6E6E] mt-0.5">
                      {badge.desc}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {/* Aktivitas Terbaru */}
          <StaggerContainer>
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">
                Aktivitas Terbaru
              </h3>
              <button className="text-[10px] text-[#6E6E6E] font-medium hover:text-[#1B1B1B]">
                Lihat semua
              </button>
            </div>
            <div className="space-y-3">
              {[
                {
                  title:
                    'Mengikuti peluang "Desain Konten Instagram untuk UMKM Kopi"',
                  meta: "Freelance • Online",
                  tag: "Baru",
                  time: "2 jam lalu",
                  icon: Briefcase,
                },
                {
                  title:
                    'Menyelesaikan aktivitas "Aksi Bersih Pantai (Volunteer)"',
                  meta: "Volunteer • Offline • 5 jam",
                  tag: "Selesai",
                  time: "1 hari lalu",
                  icon: Trees,
                },
                {
                  title: 'Mendapatkan badge "Kolaborator Hebat"',
                  meta: "Terus kolaborasi dan beri dampak positif!",
                  tag: "Baru",
                  time: "2 hari lalu",
                  icon: Award,
                },
              ].map((act, i) => (
                <StaggerItem
                  key={i}
                  className="bg-white border border-[#DDD6C8] rounded-2xl p-4 flex gap-4 items-center hover:shadow-sm transition-shadow"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F6F3EA] text-[#5F8B6D] flex items-center justify-center flex-shrink-0">
                    <act.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[11px] font-semibold text-[#1B1B1B] mb-0.5">
                      {act.title}
                    </h4>
                    <p className="text-[9px] text-[#6E6E6E]">{act.meta}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <span className="text-[9px] text-[#A8C3A0]">
                      {act.time}
                    </span>
                    <Badge
                      className={
                        act.tag === "Baru"
                          ? "bg-[#E7F0E9] text-[#1F4D3A] text-[9px] py-0.5 px-2"
                          : "bg-gray-100 text-gray-600 text-[9px] py-0.5 px-2"
                      }
                    >
                      {act.tag}
                    </Badge>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          {/* Bottom Banner */}
          <FadeUp
            delay={0.4}
            className="bg-[#FCFBF8] border border-[#DDD6C8] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
          >
            <div className="flex items-center gap-4 relative z-10">
              <Leaf
                size={32}
                className="text-[#5F8B6D] opacity-80"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="font-sora font-semibold text-[#1B1B1B] text-[13px] mb-1">
                  Setiap langkah kecil yang kamu ambil,
                </h3>
                <p className="text-[11px] text-[#6E6E6E]">
                  adalah bagian dari perubahan besar.
                </p>
              </div>
            </div>
            <Button className="relative z-10 text-xs px-6">
              Temukan Peluang Baru <ArrowRight size={14} className="ml-2" />
            </Button>
          </FadeUp>
        </div>
      )}

      {/* Tab Content: Aktivitas Saya (User working on opportunities) */}
      {activeTab === "aktivitas" && (
        <FadeUp>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-sora font-bold text-lg text-[#1B1B1B]">
              Peluang yang Sedang Dikerjakan
            </h3>
          </div>
          <div className="space-y-4">
            {/* Dummy item for Aktivitas Saya */}
            <div className="bg-white border border-[#DDD6C8] rounded-2xl p-5 flex flex-col md:flex-row gap-5 items-start md:items-center">
              <div className="w-16 h-16 rounded-xl bg-[#E7F0E9] text-[#1F4D3A] flex items-center justify-center flex-shrink-0">
                <Palette size={28} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <Badge className="bg-orange-50 text-orange-600 mb-2">
                  Freelance
                </Badge>
                <h4 className="font-sora font-bold text-[#1B1B1B] text-sm mb-1">
                  Desain Konten Instagram UMKM Kopi
                </h4>
                <p className="text-[11px] text-[#6E6E6E] mb-3">
                  Penyelenggara: Kopi Nusantara • Deadline: 20 Mei 2024
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-semibold text-[#1B1B1B]">
                    Progress
                  </span>
                  <div className="flex-1 bg-[#F6F3EA] h-1.5 rounded-full max-w-[200px]">
                    <div className="bg-[#1F4D3A] h-full rounded-full w-[70%]"></div>
                  </div>
                  <span className="text-[10px] text-[#6E6E6E]">70%</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-[10px] font-semibold text-red-500 bg-red-50 px-2 py-1 rounded">
                  Sisa 3 hari
                </span>
                <Button variant="outline" className="text-xs py-1.5 px-4">
                  Kirim Hasil
                </Button>
              </div>
            </div>
          </div>
        </FadeUp>
      )}

      {/* Tab Content: Peluang Saya (User as Organizer - Review & Accept functionality) */}
      {activeTab === "peluang" && (
        <FadeUp>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-sora font-bold text-lg text-[#1B1B1B]">
                Peluang yang Diciptakan
              </h3>
              <p className="text-xs text-[#6E6E6E] mt-1">
                Review dan kelola talenta yang melamar ke peluangmu.
              </p>
            </div>
            <Button className="text-xs px-4 py-2 gap-1.5">
              <PlusSquare size={14} /> Buat Baru
            </Button>
          </div>

          <div className="space-y-6">
            {/* Created Opportunity Dashboard Item */}
            <div className="bg-white border border-[#DDD6C8] rounded-3xl overflow-hidden shadow-sm">
              {/* Opportunity Header */}
              <div className="p-5 border-b border-[#DDD6C8] bg-[#FCFBF8] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <Badge className="bg-green-50 text-green-700 mb-2">
                    Volunteer
                  </Badge>
                  <h4 className="font-sora font-bold text-[#1B1B1B] text-[15px]">
                    Relawan Edukasi Lingkungan Anak Sekolah
                  </h4>
                  <p className="text-[11px] text-[#6E6E6E] mt-1 flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Users size={12} /> 5 Pelamar
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 size={12} /> 2 Diterima
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> Ditutup 24 Mei
                    </span>
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="text-xs py-1.5 px-4 bg-white"
                >
                  Edit Peluang
                </Button>
              </div>

              {/* Applicants List (Review & Accept feature) */}
              <div className="p-5">
                <h5 className="font-sora font-semibold text-xs text-[#1B1B1B] mb-4">
                  Daftar Pelamar Baru (2)
                </h5>

                <div className="space-y-3">
                  {/* Applicant 1 */}
                  <div className="bg-[#F6F3EA] border border-[#DDD6C8] rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center transition-colors hover:border-[#A8C3A0]">
                    <div className="w-10 h-10 rounded-full bg-[#E7DCCB] border-2 border-white flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-[#1F4D3A]">
                      AS
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h6 className="font-sora font-bold text-[#1B1B1B] text-xs">
                          Ahmad Santoso
                        </h6>
                        <span className="text-[9px] text-[#6E6E6E] bg-white px-1.5 py-0.5 rounded border border-[#DDD6C8]">
                          Level 2
                        </span>
                      </div>
                      <p className="text-[10px] text-[#6E6E6E] mb-2 line-clamp-1">
                        "Saya punya pengalaman mengajar anak-anak di komunitas
                        belajar lokal dan sangat peduli isu sampah plastik."
                      </p>
                      <button className="text-[10px] font-semibold text-[#1F4D3A] flex items-center gap-1 hover:underline">
                        <FileText size={12} /> Lihat Profil & Proposal
                      </button>
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto pt-3 md:pt-0 border-t border-[#DDD6C8] md:border-0 mt-2 md:mt-0">
                      <button className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-[#DDD6C8] text-[#6E6E6E] hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors">
                        <ThumbsDown size={14} /> Tolak
                      </button>
                      <button className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#1F4D3A] text-white hover:bg-[#15382A] transition-colors shadow-sm">
                        <Check size={14} /> Terima
                      </button>
                    </div>
                  </div>

                  {/* Applicant 2 */}
                  <div className="bg-[#F6F3EA] border border-[#DDD6C8] rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center transition-colors hover:border-[#A8C3A0]">
                    <div className="w-10 h-10 rounded-full bg-[#E7DCCB] border-2 border-white flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-[#1F4D3A]">
                      DN
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h6 className="font-sora font-bold text-[#1B1B1B] text-xs">
                          Dian Ningrum
                        </h6>
                        <span className="text-[9px] text-[#6E6E6E] bg-white px-1.5 py-0.5 rounded border border-[#DDD6C8]">
                          Level 4
                        </span>
                      </div>
                      <p className="text-[10px] text-[#6E6E6E] mb-2 line-clamp-1">
                        "Mahasiswi ilmu lingkungan yang aktif di BEM. Ingin
                        berkontribusi langsung mengedukasi adik-adik."
                      </p>
                      <button className="text-[10px] font-semibold text-[#1F4D3A] flex items-center gap-1 hover:underline">
                        <FileText size={12} /> Lihat Profil & Proposal
                      </button>
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto pt-3 md:pt-0 border-t border-[#DDD6C8] md:border-0 mt-2 md:mt-0">
                      <button className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-[#DDD6C8] text-[#6E6E6E] hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors">
                        <ThumbsDown size={14} /> Tolak
                      </button>
                      <button className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#1F4D3A] text-white hover:bg-[#15382A] transition-colors shadow-sm">
                        <Check size={14} /> Terima
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      )}
    </div>
  );
};

const ProfilRightSidebar = () => (
  <aside className="w-[340px] h-screen sticky top-0 bg-[#FCFBF8] border-l border-[#DDD6C8] flex flex-col py-8 px-6 z-20 flex-shrink-0 overflow-y-auto hide-scrollbar">
    {/* Statistik Dampakmu */}
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">
          Statistik Dampakmu
        </h3>
        <button className="text-[10px] text-[#6E6E6E] font-medium hover:text-[#1B1B1B]">
          Lihat detail
        </button>
      </div>
      <div className="space-y-4">
        {[
          {
            icon: Clock,
            val: "18",
            label: "Jam Kontribusi",
            desc: "Waktu yang kamu dedikasikan",
            bg: "bg-[#E7F0E9]",
            color: "text-[#1F4D3A]",
          },
          {
            icon: Users,
            val: "120",
            label: "Orang Terlibat",
            desc: "Bersama kamu berdampak",
            bg: "bg-[#E7F0E9]",
            color: "text-[#1F4D3A]",
          },
          {
            icon: Leaf,
            val: "15",
            label: "Kegiatan Diikuti",
            desc: "Langkah nyata untuk bumi",
            bg: "bg-[#E7F0E9]",
            color: "text-[#1F4D3A]",
          },
          {
            icon: Globe2,
            val: "8 kg",
            label: "CO₂ Terselamatkan",
            desc: "Estimasi dampak positif",
            bg: "bg-[#E7F0E9]",
            color: "text-[#1F4D3A]",
          },
        ].map((stat, i) => (
          <div key={i} className="flex gap-4 items-center group cursor-pointer">
            <div
              className={`w-10 h-10 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}
            >
              <stat.icon size={18} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-sora font-bold text-[13px] text-[#1B1B1B] leading-tight">
                {stat.val}{" "}
                <span className="text-[11px] font-semibold">{stat.label}</span>
              </h4>
              <p className="text-[9px] text-[#6E6E6E]">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Minat & Keahlian */}
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">
          Minat & Keahlian
        </h3>
        <button className="text-[10px] text-[#6E6E6E] font-medium hover:text-[#1B1B1B] flex items-center gap-1">
          <Edit3 size={10} /> Edit
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {[
          "Desain Grafis",
          "Konten Kreator",
          "Fotografi",
          "Media Sosial",
          "Branding",
          "Editing Video",
          "Sustainability",
          "Komunikasi Visual",
        ].map((tag, i) => (
          <Badge
            key={i}
            className="bg-[#F6F3EA] text-[#6E6E6E] border border-[#DDD6C8] px-3 py-1.5 hover:bg-[#E7DCCB] cursor-pointer transition-colors"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>

    {/* Komunitas yang Diikuti */}
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">
          Komunitas yang Diikuti
        </h3>
        <button className="text-[10px] text-[#6E6E6E] font-medium hover:text-[#1B1B1B]">
          Lihat semua
        </button>
      </div>
      <div className="space-y-4">
        {[
          {
            name: "Komunitas Hijau Muda",
            members: "1.245 anggota",
            initial: "HM",
            bg: "bg-[#5F8B6D]",
          },
          {
            name: "UMKM Kopi Nusantara",
            members: "875 anggota",
            initial: "KN",
            bg: "bg-[#B77B57]",
          },
          {
            name: "Volunteer Indonesia",
            members: "2.341 anggota",
            initial: "VI",
            bg: "bg-[#1F4D3A]",
          },
        ].map((com, i) => (
          <div key={i} className="flex gap-3 items-center group cursor-pointer">
            <div
              className={`w-10 h-10 rounded-full ${com.bg} text-white flex items-center justify-center text-xs font-bold font-sora shadow-sm`}
            >
              {com.initial}
            </div>
            <div>
              <h4 className="text-[11px] font-semibold text-[#1B1B1B] group-hover:text-[#1F4D3A] transition-colors">
                {com.name}
              </h4>
              <p className="text-[9px] text-[#6E6E6E]">{com.members}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Ingin tingkatkan profilmu? */}
    <div className="mt-auto bg-[#F6F3EA] border border-[#DDD6C8] rounded-2xl p-5 relative overflow-hidden">
      <div className="relative z-10 w-2/3">
        <h4 className="font-sora font-bold text-xs text-[#1B1B1B] mb-1">
          Ingin tingkatkan profilmu?
        </h4>
        <p className="text-[9px] text-[#6E6E6E] mb-3 leading-relaxed">
          Lengkapi informasi dan tampilkan keahlian terbaikmu!
        </p>
        <button className="bg-white border border-[#DDD6C8] text-[#1B1B1B] text-[10px] font-semibold py-1.5 px-4 rounded-xl hover:bg-[#E7DCCB] transition-colors shadow-sm">
          Lengkapi Profil
        </button>
      </div>
      <div className="absolute -right-2 -bottom-2 w-24 h-24 text-[#5F8B6D] opacity-80 flex items-end justify-center">
        <ClipboardList size={60} strokeWidth={1} />
        <Leaf size={20} className="absolute bottom-2 left-2 text-[#A8C3A0]" />
      </div>
    </div>
  </aside>
);

// Icon Placeholder component used internally
const FolderHeart = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={props.strokeWidth || 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    <path d="M12 10l-1.5 1.5a2.12 2.12 0 0 0 0 3a2.12 2.12 0 0 0 3 0l-1.5-1.5Z" />
  </svg>
);

// ============================================================================
// --- MAIN APP (src/app/page.tsx) ---
// ============================================================================
export default function App() {
  const [currentPage, setCurrentPage] = useState("beranda"); // State to handle navigation

  useEffect(() => {
    injectStyles();
  }, []);

  return (
    <div className="flex h-screen w-full bg-[#F6F3EA] overflow-hidden text-[#1B1B1B] font-inter">
      {/* Left Sidebar */}
      <LeftSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Decorative subtle background blobs */}
        <div className="absolute top-0 left-10 w-96 h-96 bg-[#A8C3A0] rounded-full mix-blend-multiply filter blur-[100px] opacity-10 pointer-events-none"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-[#E7DCCB] rounded-full mix-blend-multiply filter blur-[80px] opacity-20 pointer-events-none"></div>

        <Topbar />

        <div className="flex-1 overflow-y-auto px-8 pb-12 pt-4 hide-scrollbar scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {currentPage === "beranda" ? (
                <HomeMain />
              ) : currentPage === "jelajah" ? (
                <JelajahMain setCurrentPage={setCurrentPage} />
              ) : currentPage === "buat" ? (
                <BuatPeluangMain />
              ) : currentPage === "aktivitas" ? (
                <AktivitasMain />
              ) : currentPage === "detail" ? (
                <DetailPeluangMain setCurrentPage={setCurrentPage} />
              ) : currentPage === "proposal" ? (
                <KirimProposalMain
                  setCurrentPage={setCurrentPage}
                  opportunityData={{
                    title: "Desain Konten Media Sosial untuk Kopi Nusantara",
                    organizer: "Kopi Nusantara",
                    loc: "Online",
                    type: "Freelance",
                    badgeColor: "bg-[#E7F0E9] text-[#1F4D3A]",
                    deadline: "30 Mei 2024",
                    level: "Menengah",
                    reward: "Rp500.000 - Rp750.000",
                  }}
                  setOpportunityData={setCurrentPage}
                />
              ) : currentPage === "profil" ? (
                <ProfilMain />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Right Sidebar */}
      {/* Right Sidebar */}
      <AnimatePresence mode="wait">
        {currentPage === "beranda" ? (
          <motion.div
            key="beranda-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <RightSidebar />
          </motion.div>
        ) : currentPage === "jelajah" ? (
          <motion.div
            key="jelajah-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <JelajahRightSidebar />
          </motion.div>
        ) : currentPage === "buat" ? (
          <motion.div
            key="buat-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <BuatPeluangRightSidebar />
          </motion.div>
        ) : currentPage === "aktivitas" ? (
          <motion.div
            key="aktivitas-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <AktivitasRightSidebar />
          </motion.div>
        ) : currentPage === "detail" ? (
          <motion.div
            key="detail-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <DetailPeluangRightSidebar setCurrentPage={setCurrentPage} />
          </motion.div>
        ) : currentPage === "proposal" ? (
          <motion.div
            key="buat-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <KirimProposalRightSidebar
              opportunityData={
                currentPage === "proposal"
                  ? {
                      title: "Desain Konten Media Sosial untuk Kopi Nusantara",
                      organizer: "Kopi Nusantara",
                      loc: "Online",
                      type: "Freelance",
                      badgeColor: "bg-[#E7F0E9] text-[#1F4D3A]",
                      deadline: "30 Mei 2024",
                      level: "Menengah",
                      reward: "Rp500.000 - Rp750.000",
                    }
                  : undefined
              }
            />
          </motion.div>
        ) : currentPage === "profil" ? (
          <ProfilRightSidebar />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
