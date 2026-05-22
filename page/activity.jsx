import {
  Leaf,
  CheckSquare,
  Bookmark,
  MoreVertical,
  ChevronRight,
  Trees,
  Coffee,
  Sparkles,
  Users,
  ArrowRight,
  ChevronLeft,
  FileCheck2,
  Megaphone,
  Clapperboard,
  ClipboardList,
} from "lucide-react";
import { Badge, Button } from "@/components/ui/uis";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/anim";

import { useState } from "react";
import { motion } from "framer-motion";

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
// --- AKTIVITAS COMPONENTS (NEW) ---
// ============================================================================
export const AktivitasMain = ({setCurrentPage}) => {
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
          <StaggerItem key={act.id} >
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
                    onClick ={() => setCurrentPage('workroom')}
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

export const AktivitasRightSidebar = () => (
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