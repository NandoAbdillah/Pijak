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
  Palette,
  TrendingUp,
  PenLine,
  BarChart3,
  Clapperboard,
  Trees,
  LayoutGrid,
  Briefcase,
  HeartHandshake,
  Users,
  ArrowRightLeft,
} from "lucide-react";
import HomeMain from "@/page/home";
import { JelajahMain, JelajahRightSidebar } from "@/page/discover";
import { LeftSidebar, RightSidebar, Topbar } from "@/components/ui/component";
import {
  BuatPeluangMain,
  BuatPeluangRightSidebar,
} from "@/page/create-opportunity";
import { AktivitasMain, AktivitasRightSidebar } from "@/page/activity";
import {
  DetailPeluangMain,
  DetailPeluangRightSidebar,
} from "@/page/detail-opportunity";
import {
  KirimProposalMain,
  KirimProposalRightSidebar,
} from "@/page/send-proposal";
import { ProfilMain, ProfilRightSidebar } from "@/page/profile";
import { WorkroomMain, WorkroomRightSidebar } from "@/page/workroom";

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

// Icon Placeholder component used internally
// const FolderHeart = (props) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={props.size || 24}
//     height={props.size || 24}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth={props.strokeWidth || 2}
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     {...props}
//   >
//     <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
//     <path d="M12 10l-1.5 1.5a2.12 2.12 0 0 0 0 3a2.12 2.12 0 0 0 3 0l-1.5-1.5Z" />
//   </svg>
// );

// ============================================================================
// --- MAIN APP (src/app/page.tsx) ---
// ============================================================================
export default function App() {
  const [currentPage, setCurrentPage] = useState("beranda"); // State to handle navigation
  const [opportunityType, setOpportunityType] = useState("Freelance");

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
                <AktivitasMain setCurrentPage={setCurrentPage} />
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
              ) : currentPage === "workroom" ? (
                <WorkroomMain
                  opportunityType={opportunityType}
                  setOpportunityType={setOpportunityType}
                />
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
        ) : currentPage === "workroom" ? (
          <WorkroomRightSidebar
            opportunityType={opportunityType}
            setOpportunityType={setOpportunityType}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
