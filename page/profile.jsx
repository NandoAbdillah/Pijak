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
} from "lucide-react";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/anim";

import {
  Button,
  Label,
  Input,
  Select,
  CardSelector,
  Textarea,
  Badge,
} from "@/components/ui/uis";
import { useState } from "react";
import { motion } from "framer-motion";

export const ProfilMain = () => {
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
                        &quot;Saya punya pengalaman mengajar anak-anak di
                        komunitas belajar lokal dan sangat peduli isu sampah
                        plastik.&quot;
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
                        &quot;Mahasiswi ilmu lingkungan yang aktif di BEM. Ingin
                        berkontribusi langsung mengedukasi adik-adik.&quot;
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

export const ProfilRightSidebar = () => (
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
