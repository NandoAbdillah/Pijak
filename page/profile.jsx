"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Leaf,
  CheckCircle2,
  Clock,
  Briefcase,
  Users,
  Check,
  ClipboardList,
  Calendar,
  Globe,
  Award,
  LayoutGrid,
  FolderHeart,
  Settings,
  Camera,
  MapPin,
  CalendarDays,
  Edit3,
  Trees,
  Star,
  Scissors,
  Compass,
  Hexagon,
  Palette,
  PlusSquare,
  FileText,
  ThumbsDown,
  Globe2,
  LogOut,
} from "lucide-react";

// Murni menggunakan komponen bawaan kamu dari folder project
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/anim";
import { Badge, Button } from "@/components/ui/uis";

// ========================================================
// PROFIL MAIN COMPONENT
// ========================================================
export const ProfilMain = () => {
  const [activeTab, setActiveTab] = useState("ringkasan");
  
  // State untuk nyimpan data dari backend C++
  const [peluangDiciptakan, setPeluangDiciptakan] = useState([]);
  const [proposalsByOpp, setProposalsByOpp] = useState({});
  const [pekerjaanAktif, setPekerjaanAktif] = useState([]);
  const [loading, setLoading] = useState(true);

  const MY_USER_ID = "U01"; // Simulasi ID user yang sedang login

  useEffect(() => {
    async function fetchProfileData() {
      setLoading(true);
      try {
        // 1. Ambil daftar Peluang yang Diciptakan user ini (Sebagai Organizer)
        const resOpp = await fetch(`/api/opportunities?creator_id=${MY_USER_ID}`);
        const jsonOpp = await resOpp.json();
        
        if (jsonOpp.ok) {
          setPeluangDiciptakan(jsonOpp.data);
          
          // 2. Ambil Proposal/Pelamar untuk masing-masing peluang tersebut
          const propMap = {};
          for (const opp of jsonOpp.data) {
            const resProp = await fetch(`/api/proposals?opportunity_id=${opp.id}`);
            const jsonProp = await resProp.json();
            if (jsonProp.ok) {
              // Hanya simpan proposal yang statusnya masih "Menunggu"
              propMap[opp.id] = jsonProp.data.filter(p => p.status === "Menunggu");
            }
          }
          setProposalsByOpp(propMap);
        }

        // 3. Ambil Pekerjaan / Task aktif dimana user sebagai pekerja (Assignee)
        const resTask = await fetch(`/api/tasks?assignee_id=${MY_USER_ID}`);
        const jsonTask = await resTask.json();
        if (jsonTask.ok) {
          setPekerjaanAktif(jsonTask.data);
        }

      } catch (error) {
        console.error("Gagal mengambil data dari backend C++:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfileData();
  }, []);

  // Fungsi dinamis untuk Terima/Tolak lamaran
  const handleProcessProposal = async (proposalId, action) => {
    try {
      const res = await fetch("/api/process-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: action, // "terima" atau "tolak"
          actor_id: MY_USER_ID,
          id: proposalId
        })
      });
      const json = await res.json();
      if (json.ok) {
        alert(`Proposal berhasil di-${action}!`);
        window.location.reload(); // Refresh untuk melihat update status
      } else {
        alert("Gagal memproses: " + json.error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const tabs = [
    { id: "ringkasan", label: "Ringkasan", icon: LayoutGrid },
    { id: "aktivitas", label: "Pekerjaan Aktif", icon: ClipboardList },
    { id: "peluang", label: "Kelola Peluang", icon: FolderHeart },
  ];

  return (
    <div className="max-w-[850px] mx-auto pb-10">
      {/* Header Profile Hero - STYLE ASLI PIJAK */}
      <FadeUp className="mt-6 mb-8 bg-white border border-[#DDD6C8] rounded-3xl p-6 relative overflow-hidden shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Profile Avatar */}
        <div className="relative flex-shrink-0 z-10">
          <div className="w-28 h-28 rounded-full bg-[#E7DCCB] overflow-hidden border-4 border-white shadow-sm flex items-center justify-center">
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
          <FadeUp delay={0.2}>
            <Badge className="bg-[#E7F0E9] text-[#1F4D3A] mb-3 inline-block">
              Kreator Muda
            </Badge>
          </FadeUp>
          <p className="text-xs text-[#6E6E6E] mb-4 max-w-sm mx-auto md:mx-0 leading-relaxed">
            Desain grafis & konten kreator yang peduli lingkungan. Bergerak
            untuk dampak positif bersama komunitas.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[11px] font-medium text-[#6E6E6E]">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-[#A8C3A0]" /> Surabaya, Indonesia
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} className="text-[#A8C3A0]" /> Bergabung Jan 2024
            </span>
          </div>
        </div>

        {/* ACTION BUTTONS (Edit & LOGOUT) */}
        <div className="absolute top-6 right-6 z-20 flex gap-2">
          <button className="flex items-center gap-1.5 text-xs font-semibold text-[#1B1B1B] bg-white border border-[#DDD6C8] px-4 py-2 rounded-xl hover:bg-[#F6F3EA] transition-colors shadow-sm">
            <Edit3 size={14} /> Edit Profil
          </button>
          <button className="flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 px-4 py-2 rounded-xl hover:bg-red-100 transition-colors shadow-sm">
            <LogOut size={14} /> Keluar
          </button>
        </div>

        {/* CSS Illustration Background */}
        <div className="absolute bottom-0 right-0 w-64 h-32 opacity-80 pointer-events-none flex items-end justify-end">
          <svg width="250" height="120" viewBox="0 0 250 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120 C 50 120, 80 40, 150 70 C 200 90, 230 50, 250 80 L 250 120 Z" fill="#E7F0E9" />
            <path d="M40 120 C 90 120, 120 70, 180 90 C 220 100, 240 70, 250 90 L 250 120 Z" fill="#A8C3A0" opacity="0.3" />
            <path d="M150 120 L150 70 M150 70 C 130 70, 130 50, 150 50 M150 60 C 170 60, 170 40, 150 40" stroke="#1F4D3A" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      </FadeUp>

      {/* Navigation Tabs */}
      <FadeUp delay={0.1} className="flex gap-1 overflow-x-auto hide-scrollbar mb-8 border-b border-[#DDD6C8] pb-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-[12px] font-semibold flex items-center gap-2 whitespace-nowrap transition-colors relative ${
              activeTab === tab.id ? "text-[#1F4D3A]" : "text-[#6E6E6E] hover:text-[#1B1B1B]"
            }`}
          >
            <tab.icon size={16} strokeWidth={activeTab === tab.id ? 2 : 1.5} />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div layoutId="profil-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1F4D3A]" />
            )}
          </button>
        ))}
      </FadeUp>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <p className="text-[#6E6E6E] text-sm animate-pulse">Menghubungkan ke Pijak Backend...</p>
        </div>
      ) : (
        <>
          {/* ========================================================
              TAB 1: RINGKASAN
          ======================================================== */}
          {activeTab === "ringkasan" && (
            <div className="space-y-8">
              <StaggerContainer>
                <h3 className="font-sora font-bold text-sm text-[#1B1B1B] mb-4 px-1">Ringkasan Profil</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "Peluang Diikuti", val: "12", sub: "Terus belajar", icon: Trees, bg: "bg-[#E7F0E9]" },
                    { label: "Aktivitas Selesai", val: "8", sub: "Konsisten ya", icon: Users, bg: "bg-[#F6F3EA]" },
                    { label: "Total Poin", val: "320 XP", sub: "Level 3 - Kreator", icon: Star, bg: "bg-yellow-50", iconColor: "text-yellow-500 fill-yellow-100" },
                    { label: "Badges", val: "5", sub: "Dampak nyata", icon: Leaf, bg: "bg-[#E7F0E9]" },
                  ].map((stat, i) => (
                    <StaggerItem key={i} className="bg-white border border-[#DDD6C8] rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
                      <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center mb-2 ${stat.iconColor || "text-[#1F4D3A]"}`}>
                        <stat.icon size={20} strokeWidth={1.5} />
                      </div>
                      <span className="font-sora font-bold text-lg text-[#1B1B1B] leading-tight">{stat.val}</span>
                      <span className="text-[10px] font-semibold text-[#1B1B1B] mb-0.5">{stat.label}</span>
                      <span className="text-[8px] text-[#6E6E6E]">{stat.sub}</span>
                    </StaggerItem>
                  ))}
                </div>
              </StaggerContainer>

              <StaggerContainer>
                <div className="flex items-center justify-between mb-4 px-1">
                  <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">Badge yang Kamu Miliki</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {[
                    { title: "Aksi Nyata", desc: "Selesai 1 aktivitas", icon: Scissors },
                    { title: "Kolaborator", desc: "Kerja sama di 3 project", icon: Users },
                    { title: "Konsisten", desc: "Aktif 7 hari", icon: Calendar },
                    { title: "Impact Maker", desc: "Beri dampak", icon: Globe },
                    { title: "Explorer", desc: "Jelajahi 10 peluang", icon: Compass },
                  ].map((badge, i) => (
                    <StaggerItem key={i} className="flex flex-col items-center text-center gap-2 group cursor-pointer bg-white p-3 rounded-2xl border border-[#DDD6C8]">
                      <div className="relative w-12 h-12 flex items-center justify-center transition-transform group-hover:-translate-y-1">
                        <Hexagon size={48} className="text-[#E7F0E9] fill-[#E7F0E9]" strokeWidth={1} />
                        <Hexagon size={38} className="text-[#5F8B6D] absolute" strokeWidth={2} />
                        <badge.icon size={18} className="absolute text-[#1F4D3A]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-[#1B1B1B] leading-tight">{badge.title}</h4>
                      </div>
                    </StaggerItem>
                  ))}
                </div>
              </StaggerContainer>
            </div>
          )}

          {/* ========================================================
              TAB 2: PEKERJAAN AKTIF (Mapping Dinamis dari Backend)
          ======================================================== */}
          {activeTab === "aktivitas" && (
            <FadeUp>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-sora font-bold text-lg text-[#1B1B1B]">Peluang yang Sedang Dikerjakan</h3>
              </div>
              <div className="space-y-4">
                {pekerjaanAktif.length === 0 ? (
                  <div className="text-center py-10 bg-white border border-[#DDD6C8] border-dashed rounded-2xl">
                    <p className="text-[#6E6E6E] text-sm">Belum ada tugas atau pekerjaan yang aktif.</p>
                  </div>
                ) : (
                  pekerjaanAktif.map(task => (
                    <div key={task.id} className="bg-white border border-[#DDD6C8] rounded-2xl p-5 flex flex-col md:flex-row gap-5 items-start md:items-center shadow-sm">
                      <div className="w-16 h-16 rounded-xl bg-[#E7F0E9] text-[#1F4D3A] flex items-center justify-center flex-shrink-0">
                        <Palette size={28} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <Badge className="bg-orange-50 text-orange-600 mb-2 border border-orange-100">Aktif</Badge>
                        <h4 className="font-sora font-bold text-[#1B1B1B] text-sm mb-1">{task.title}</h4>
                        <p className="text-[11px] text-[#6E6E6E] mb-3">ID Task: {task.id} • Dibuat pada: {task.created_at}</p>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-semibold text-[#1B1B1B]">Status</span>
                          <div className="flex-1 bg-[#F6F3EA] h-1.5 rounded-full max-w-[200px]">
                            <div className={`h-full rounded-full ${task.status === 'Selesai' ? 'bg-[#5F8B6D] w-full' : 'bg-[#1F4D3A] w-[50%]'}`}></div>
                          </div>
                          <span className="text-[10px] text-[#6E6E6E]">{task.status}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {task.status !== 'Selesai' && (
                          <span className="text-[10px] font-semibold text-red-500 bg-red-50 border border-red-100 px-2 py-1 rounded-md">Proses Berjalan</span>
                        )}
                        <Button variant="outline" className="text-xs py-1.5 px-4">
                          {task.status === 'Selesai' ? 'Lihat Detail' : 'Kirim Hasil'}
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </FadeUp>
          )}

          {/* ========================================================
              TAB 3: KELOLA PELUANG (Mapping Dinamis & Review Pelamar)
          ======================================================== */}
          {activeTab === "peluang" && (
            <FadeUp>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-sora font-bold text-lg text-[#1B1B1B]">Tinjau Pengajuan</h3>
                  <p className="text-xs text-[#6E6E6E] mt-1">Review dan kelola talenta yang melamar ke peluang yang kamu buat.</p>
                </div>
                <Button className="bg-[#1F4D3A] text-white text-xs px-4 py-2 gap-1.5 hover:bg-[#15382A]">
                  <PlusSquare size={14} /> Buat Baru
                </Button>
              </div>

              <div className="space-y-6">
                {peluangDiciptakan.length === 0 ? (
                  <div className="text-center py-10 bg-white border border-[#DDD6C8] border-dashed rounded-2xl">
                    <p className="text-[#6E6E6E] text-sm">Kamu belum membuat peluang apa pun.</p>
                  </div>
                ) : (
                  peluangDiciptakan.map(opp => {
                    const pelamarList = proposalsByOpp[opp.id] || [];

                    return (
                      <div key={opp.id} className="bg-white border border-[#DDD6C8] rounded-3xl overflow-hidden shadow-sm">
                        {/* Header Opportunity yang dibuat */}
                        <div className="p-5 border-b border-[#DDD6C8] bg-[#FCFBF8] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <Badge className="bg-[#E7F0E9] text-[#1F4D3A] mb-2 border border-[#A8C3A0]/30">{opp.type || 'Peluang'}</Badge>
                            <h4 className="font-sora font-bold text-[#1B1B1B] text-[15px]">{opp.title}</h4>
                            <p className="text-[11px] text-[#6E6E6E] mt-1 flex items-center gap-3">
                              <span className="flex items-center gap-1"><Users size={12} /> {pelamarList.length} Menunggu</span>
                              <span className="flex items-center gap-1"><Clock size={12} /> Reward: {opp.reward}</span>
                            </p>
                          </div>
                          <Button variant="outline" className="text-xs py-1.5 px-4">Edit Peluang</Button>
                        </div>

                        {/* Daftar Pelamar */}
                        {pelamarList.length > 0 && (
                          <div className="p-5">
                            <h5 className="font-sora font-semibold text-xs text-[#1B1B1B] mb-4">Daftar Pelamar Baru ({pelamarList.length})</h5>
                            <div className="space-y-3">
                              {pelamarList.map(proposal => (
                                <div key={proposal.id} className="bg-[#F6F3EA] border border-[#DDD6C8] rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center transition-colors hover:border-[#A8C3A0]">
                                  <div className="w-10 h-10 rounded-full bg-[#E7DCCB] border-2 border-white flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-[#1F4D3A] uppercase">
                                    {proposal.applicant_id.substring(0, 2)}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-0.5">
                                      <h6 className="font-sora font-bold text-[#1B1B1B] text-xs">Pelamar {proposal.applicant_id}</h6>
                                      <span className="text-[9px] text-[#6E6E6E] bg-white px-1.5 py-0.5 rounded border border-[#DDD6C8]">Baru</span>
                                    </div>
                                    <p className="text-[10px] text-[#6E6E6E] mb-2 line-clamp-2">
                                      &quot;{proposal.cover_letter}&quot;
                                    </p>
                                    <button className="text-[10px] font-semibold text-[#1F4D3A] flex items-center gap-1 hover:underline">
                                      <FileText size={12} /> Lihat Proposal Lengkap
                                    </button>
                                  </div>
                                  <div className="flex items-center gap-2 w-full md:w-auto pt-3 md:pt-0 border-t border-[#DDD6C8] md:border-0 mt-2 md:mt-0">
                                    <Button onClick={() => handleProcessProposal(proposal.id, "tolak")} variant="outline" className="flex-1 md:flex-none text-xs hover:bg-red-50 hover:text-red-600 hover:border-red-200">
                                      <ThumbsDown size={14} /> Tolak
                                    </Button>
                                    <Button onClick={() => handleProcessProposal(proposal.id, "terima")} className="bg-[#1F4D3A] text-white flex-1 md:flex-none text-xs hover:bg-[#15382A]">
                                      <Check size={14} /> Terima
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {pelamarList.length === 0 && (
                           <div className="p-5 text-center">
                             <p className="text-xs text-[#6E6E6E]">Belum ada pelamar baru untuk peluang ini.</p>
                           </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </FadeUp>
          )}
        </>
      )}
    </div>
  );
};

// ========================================================
// PROFIL RIGHT SIDEBAR
// ========================================================
export const ProfilRightSidebar = () => (
  <aside className="w-[340px] h-screen sticky top-0 bg-[#FCFBF8] border-l border-[#DDD6C8] flex flex-col py-8 px-6 z-20 flex-shrink-0 overflow-y-auto hide-scrollbar">
    {/* Statistik Dampakmu */}
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">Statistik Dampakmu</h3>
      </div>
      <div className="space-y-4">
        {[
          { icon: Clock, val: "18", label: "Jam Kontribusi", desc: "Waktu yang didedikasikan", bg: "bg-[#E7F0E9]", color: "text-[#1F4D3A]" },
          { icon: Users, val: "120", label: "Orang Terlibat", desc: "Bersama berdampak", bg: "bg-[#E7F0E9]", color: "text-[#1F4D3A]" },
          { icon: Globe2, val: "8 kg", label: "CO₂ Terselamatkan", desc: "Estimasi dampak", bg: "bg-[#E7F0E9]", color: "text-[#1F4D3A]" },
        ].map((stat, i) => (
          <div key={i} className="flex gap-4 items-center group cursor-pointer">
            <div className={`w-10 h-10 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
              <stat.icon size={18} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-sora font-bold text-[13px] text-[#1B1B1B] leading-tight">
                {stat.val} <span className="text-[11px] font-semibold">{stat.label}</span>
              </h4>
              <p className="text-[9px] text-[#6E6E6E]">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Keahlian */}
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">Minat & Keahlian</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {["Desain Grafis", "Konten Kreator", "Fotografi", "Sustainability"].map((tag, i) => (
          <Badge key={i} className="bg-[#F6F3EA] text-[#6E6E6E] border border-[#DDD6C8] px-3 py-1.5 hover:bg-[#E7DCCB] cursor-pointer transition-colors">
            {tag}
          </Badge>
        ))}
      </div>
    </div>

    {/* Banner Bawah (Style Asli) */}
    <div className="mt-auto bg-[#F6F3EA] border border-[#DDD6C8] rounded-2xl p-5 relative overflow-hidden">
      <div className="relative z-10 w-2/3">
        <h4 className="font-sora font-bold text-xs text-[#1B1B1B] mb-1">Tingkatkan profilmu!</h4>
        <p className="text-[9px] text-[#6E6E6E] mb-3 leading-relaxed">Lengkapi informasi dan tampilkan keahlian terbaikmu.</p>
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

// Gabungan untuk dirender (Bisa dihiraukan jika kamu import manual di layoutmu)
export default function App() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <style dangerouslySetInnerHTML={{ __html: `body { font-family: 'Inter', sans-serif; background-color: #FCFBF8; }` }} />
      <div className="flex-1"><ProfilMain /></div>
      <div className="hidden lg:block"><ProfilRightSidebar /></div>
    </div>
  );
}