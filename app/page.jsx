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
import { AuthScreen } from "@/page/auth";

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


// MAIN APP
export default function App() {
  const [currentPage, setCurrentPage] = useState("auth"); // State to handle navigation
  const [opportunityType, setOpportunityType] = useState("Freelance");
  const [selectedOppId, setSelectedOppId] = useState("O01"); 
  const [opportunityData, setOpportunityData] = useState(null);
  const [globaluser, setGlobalUser] = useState(null);

  useEffect(() => {
    injectStyles();
  }, []);

  useEffect(() => {
    // Cek localStorage untuk status login
    const storedUser = localStorage.getItem("pijakUser");
    if (storedUser) {
      setGlobalUser(JSON.parse(storedUser));
      setCurrentPage("beranda"); 
    }
  }, []);

  useEffect(() => {
    if (globaluser) {
      localStorage.setItem("pijakUser", JSON.stringify(globaluser));
    } else {
      localStorage.removeItem("pijakUser");
    }
  }, [globaluser]);

  // Jika di halaman Auth, JANGAN tampilkan sidebar dan topbar
  if (currentPage === 'auth') {
    return <AuthScreen setCurrentPage={setCurrentPage} setGlobalUser={setGlobalUser} />;
  }

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
                <HomeMain setCurrentPage={setCurrentPage} setOppId={setSelectedOppId} />
              ) : currentPage === "jelajah" ? (
                <JelajahMain setCurrentPage={setCurrentPage} setSelectedOppId={setSelectedOppId} />
              ) : currentPage === "buat" ? (
                <BuatPeluangMain />
              ) : currentPage === "aktivitas" ? (
                <AktivitasMain setCurrentPage={setCurrentPage} />
              ) : currentPage === "detail" ? (
                <DetailPeluangMain setCurrentPage={setCurrentPage} selectedOppId={selectedOppId} />
              ) : currentPage === "proposal" ? (
                <KirimProposalMain
                  setCurrentPage={setCurrentPage}
                  opportunityData={opportunityData}
                  setOpportunityData={setOpportunityData}
                  currentUserId={globaluser ? globaluser.id : null}
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
            <JelajahRightSidebar setCurrentPage={setCurrentPage} setSelectedOppId={setSelectedOppId} />
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
            <DetailPeluangRightSidebar setCurrentPage={setCurrentPage} selectedOppId={selectedOppId} setOpportunityData={setOpportunityData} />
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
