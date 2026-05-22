import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusSquare,
  MessageSquare,
  Leaf,
  CheckCircle2,
  Clock,
  LayoutGrid,
  ArrowRightLeft,
  ClipboardList,
  MessageCircle,
  BadgeCheck,
  Link as LinkIcon,
  File as FileIcon,
  Edit3,
  Circle,
  CheckCircle,
  UploadCloud,
  MoreHorizontal,
  FileImage,
  FileBarChart,
} from "lucide-react";

import {
  FadeUp,
} from "@/components/motion/anim";

import {
  Button,
  Badge,
} from "@/components/ui/uis";

export const WorkroomMain = ({ opportunityType, setOpportunityType }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutGrid },
    { id: "tugas", label: "Tugas", icon: ClipboardList },
    { id: "file", label: "File", icon: FileIcon },
    { id: "diskusi", label: "Diskusi", icon: MessageSquare },
    { id: "revisi", label: "Revisi", icon: FileImage },
    { id: "timeline", label: "Timeline", icon: Clock },
  ];

  const isFreelance = opportunityType === "Freelance";

  // Dynamic Data Based on Type
  const oppData = {
    title: isFreelance
      ? "Desain Konten Instagram untuk UMKM Kopi"
      : "Event Voluntrip: Tanam 1000 Pohon",
    organizer: isFreelance ? "Kopi Nusantara" : "Komunitas Hijau",
    badgeColor: isFreelance
      ? "bg-[#E7F0E9] text-[#1F4D3A]"
      : "bg-green-100 text-green-700",
    mulai: "5 Mei 2024",
    deadline: "20 Mei 2024",
    metricLabel: isFreelance ? "Budget" : "Target Dampak",
    metricValue: isFreelance ? "Rp500.000" : "1000 Pohon",
    status: "Berjalan",
    tasksTotal: isFreelance ? 8 : 10,
    tasksDone: isFreelance ? 6 : 7,
    progress: isFreelance ? 75 : 70,
    tasks: isFreelance
      ? [
          {
            id: 1,
            title: "Brief & Analisis Kebutuhan",
            desc: "Memahami brand, target audiens, dan tujuan konten",
            status: "Selesai",
            date: "5 Mei",
            avatars: ["R"],
            isChecked: true,
          },
          {
            id: 2,
            title: "Konsep Visual & Moodboard",
            desc: "Membuat konsep visual dan referensi desain",
            status: "Selesai",
            date: "7 Mei",
            avatars: ["R", "K"],
            isChecked: true,
          },
          {
            id: 3,
            title: "Desain 10 Konten Instagram Feed",
            desc: "Membuat desain 10 konten sesuai konsep",
            status: "Selesai",
            date: "12 Mei",
            avatars: ["R"],
            isChecked: true,
          },
          {
            id: 4,
            title: "Desain 5 Instagram Story",
            desc: "Membuat desain story untuk campaign",
            status: "Sedang Dikerjakan",
            date: "16 Mei",
            avatars: ["R"],
            isChecked: false,
          },
          {
            id: 5,
            title: "Finalisasi & Penyesuaian",
            desc: "Revisi akhir dan penyesuaian konten",
            status: "Belum Dimulai",
            date: "-",
            avatars: [],
            isChecked: false,
          },
        ]
      : [
          {
            id: 1,
            title: "Konsolidasi Panitia Inti",
            desc: "Rapat awal penentuan titik tanam dan target peserta",
            status: "Selesai",
            date: "5 Mei",
            avatars: ["K", "A"],
            isChecked: true,
          },
          {
            id: 2,
            title: "Survei Lokasi & Perizinan",
            desc: "Meninjau lahan dan urus izin ke dinas setempat",
            status: "Selesai",
            date: "8 Mei",
            avatars: ["A"],
            isChecked: true,
          },
          {
            id: 3,
            title: "Pengadaan Bibit Pohon",
            desc: "Beli 1000 bibit mangrove dan buah-buahan",
            status: "Selesai",
            date: "12 Mei",
            avatars: ["D"],
            isChecked: true,
          },
          {
            id: 4,
            title: "Sosialisasi & Rekrutmen Relawan",
            desc: "Sebar poster dan form pendaftaran di medsos",
            status: "Sedang Dikerjakan",
            date: "16 Mei",
            avatars: ["R"],
            isChecked: false,
          },
          {
            id: 5,
            title: "Pelaksanaan Aksi Tanam",
            desc: "Hari H eksekusi penanaman pohon",
            status: "Belum Dimulai",
            date: "20 Mei",
            avatars: [],
            isChecked: false,
          },
        ],
  };

  return (
    <div className="max-w-[900px] mx-auto pb-10">
      {/* Top Breadcrumb & Actions */}
      <FadeUp className="mt-4 mb-6 flex items-center justify-between">
        <div className="text-xs font-semibold text-[#6E6E6E] flex items-center gap-2">
          <span>Workroom</span> <span className="text-[#DDD6C8]">/</span>{" "}
          <span className="text-[#1B1B1B]">{oppData.title}</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Toggle Type Button for Developer/Preview */}
          <button
            onClick={() =>
              setOpportunityType(isFreelance ? "Volunteer" : "Freelance")
            }
            className="flex items-center gap-1.5 bg-[#E7DCCB] text-[#1B1B1B] px-3 py-1.5 rounded-full text-[10px] font-bold hover:bg-[#DDD6C8] transition-colors"
          >
            <ArrowRightLeft size={12} /> Ubah ke{" "}
            {isFreelance ? "Volunteer" : "Freelance"}
          </button>

          <Button
            variant="outline"
            className="text-[11px] py-1.5 px-3 bg-white gap-2"
          >
            <MessageCircle size={14} /> Pesan
          </Button>
          <button className="text-[#6E6E6E] hover:text-[#1B1B1B]">
            <MoreHorizontal size={18} />
          </button>
          <div className="flex -space-x-2 mr-2">
            <div className="w-6 h-6 rounded-full bg-[#1F4D3A] border border-white text-white text-[8px] font-bold flex items-center justify-center">
              R
            </div>
            <div className="w-6 h-6 rounded-full bg-[#B77B57] border border-white text-white text-[8px] font-bold flex items-center justify-center">
              K
            </div>
            <div className="w-6 h-6 rounded-full bg-gray-200 border border-white text-gray-600 text-[8px] font-bold flex items-center justify-center">
              +2
            </div>
          </div>
          <Button
            variant="primary"
            className="text-[11px] py-1.5 px-4 shadow-sm"
          >
            Selesaikan Proyek
          </Button>
        </div>
      </FadeUp>

      {/* Header Profile Hero */}
      <FadeUp
        delay={0.1}
        className="mb-6 bg-white border border-[#DDD6C8] rounded-3xl p-6 relative overflow-hidden shadow-sm"
      >
        {/* Info */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex-1">
            <h1 className="font-sora font-bold text-2xl md:text-3xl text-[#1B1B1B] mb-3 leading-tight max-w-[80%]">
              {oppData.title}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-[#E7DCCB] flex items-center justify-center text-[10px] font-bold text-[#1F4D3A]">
                {oppData.organizer.charAt(0)}
              </div>
              <span className="font-sora font-semibold text-sm text-[#1B1B1B] flex items-center gap-1">
                {oppData.organizer}{" "}
                <BadgeCheck
                  size={14}
                  className="text-[#5F8B6D] fill-[#E7F0E9]"
                />
              </span>
            </div>
            <Badge className={`${oppData.badgeColor} mb-6 inline-block`}>
              {opportunityType}
            </Badge>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-[11px]">
              <div>
                <span className="text-[#6E6E6E] block mb-1">Mulai</span>
                <span className="font-bold text-[#1B1B1B]">
                  {oppData.mulai}
                </span>
              </div>
              <div>
                <span className="text-[#6E6E6E] block mb-1">Deadline</span>
                <span className="font-bold text-[#1B1B1B]">
                  {oppData.deadline}
                </span>
              </div>
              <div>
                <span className="text-[#6E6E6E] block mb-1">
                  {oppData.metricLabel}
                </span>
                <span className="font-bold text-[#1B1B1B]">
                  {oppData.metricValue}
                </span>
              </div>
              <div>
                <span className="text-[#6E6E6E] block mb-1">Status</span>
                <Badge className="bg-[#E7F0E9] text-[#1F4D3A] font-bold py-0.5">
                  {oppData.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Dummy Graphic Header */}
          <div className="hidden md:flex absolute right-6 bottom-0 w-48 h-32 items-end justify-center z-0">
            <div className="w-24 h-24 bg-[#E7DCCB] rounded-full absolute bottom-4 opacity-50 mix-blend-multiply blur-xl"></div>
            <div className="relative flex items-end">
              {/* Simplified SVG illustration of 2 people and a laptop */}
              <svg
                width="180"
                height="120"
                viewBox="0 0 180 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Person Left */}
                <rect
                  x="20"
                  y="50"
                  width="40"
                  height="70"
                  rx="10"
                  fill="#5F8B6D"
                />
                <circle cx="40" cy="35" r="15" fill="#B77B57" />
                {/* Laptop */}
                <rect
                  x="65"
                  y="70"
                  width="50"
                  height="35"
                  rx="4"
                  fill="#A8C3A0"
                />
                <rect
                  x="70"
                  y="75"
                  width="40"
                  height="25"
                  rx="2"
                  fill="#E7F0E9"
                />
                <circle cx="90" cy="87" r="4" fill="#1F4D3A" />
                {/* Person Right */}
                <rect
                  x="120"
                  y="60"
                  width="35"
                  height="60"
                  rx="10"
                  fill="#E7F0E9"
                  stroke="#1F4D3A"
                  strokeWidth="2"
                />
                <circle cx="137" cy="45" r="12" fill="#B77B57" />
              </svg>
            </div>
          </div>
        </div>
      </FadeUp>

      {/* Tabs */}
      <FadeUp
        delay={0.2}
        className="flex gap-2 overflow-x-auto hide-scrollbar mb-8 border-b border-[#DDD6C8] pb-0"
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
                layoutId="workroom-tab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1F4D3A]"
              />
            )}
          </button>
        ))}
      </FadeUp>

      {/* Progress Section */}
      <FadeUp delay={0.3} className="mb-8">
        <h3 className="font-sora font-bold text-sm text-[#1B1B1B] mb-1">
          Progress Proyek
        </h3>
        <p className="text-[10px] text-[#6E6E6E] mb-4">
          Pantau perkembangan tugas dan pencapaian proyekmu.
        </p>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 bg-[#E7DCCB] h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#1F4D3A] h-full rounded-full"
              style={{ width: `${oppData.progress}%` }}
            ></div>
          </div>
          <span className="font-sora font-bold text-[#1B1B1B] text-sm">
            {oppData.progress}%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#F6F3EA] border border-[#DDD6C8] rounded-2xl p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1F4D3A] text-white flex items-center justify-center">
              <CheckCircle size={16} />
            </div>
            <div>
              <h4 className="font-sora font-bold text-xs text-[#1B1B1B]">
                Selesai
              </h4>
              <p className="text-[10px] text-[#6E6E6E]">
                {oppData.tasksDone} / {oppData.tasksTotal} tugas
              </p>
            </div>
          </div>
          <div className="bg-white border border-[#DDD6C8] border-dashed rounded-2xl p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-dashed border-[#F5B041] text-[#F5B041] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#F5B041]"></div>
            </div>
            <div>
              <h4 className="font-sora font-bold text-xs text-[#1B1B1B]">
                Sedang Dikerjakan
              </h4>
              <p className="text-[10px] text-[#6E6E6E]">1 tugas</p>
            </div>
          </div>
          <div className="bg-white border border-[#DDD6C8] rounded-2xl p-4 flex items-center gap-3 opacity-70">
            <div className="w-8 h-8 rounded-full border-2 border-[#DDD6C8] text-[#DDD6C8] flex items-center justify-center">
              <Circle size={16} />
            </div>
            <div>
              <h4 className="font-sora font-bold text-xs text-[#1B1B1B]">
                Belum Dimulai
              </h4>
              <p className="text-[10px] text-[#6E6E6E]">
                {oppData.tasksTotal - oppData.tasksDone - 1} tugas
              </p>
            </div>
          </div>
        </div>
      </FadeUp>

      {/* Task List */}
      <FadeUp delay={0.4} className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">Tugas</h3>
          <div className="flex items-center gap-3">
            <button className="text-[10px] font-semibold text-[#6E6E6E] hover:text-[#1B1B1B]">
              Lihat semua
            </button>
            <Button className="text-[11px] py-1.5 px-3 gap-1">
              <PlusSquare size={12} /> Tugas Baru
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {oppData.tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white border border-[#DDD6C8] rounded-xl p-4 flex items-center gap-4 hover:border-[#A8C3A0] transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 flex-shrink-0">
                <GripVertical
                  size={16}
                  className="text-[#DDD6C8] opacity-0 group-hover:opacity-100 transition-opacity"
                />
                {task.isChecked ? (
                  <CheckCircle2
                    size={20}
                    className="text-[#1F4D3A] fill-[#E7F0E9]"
                  />
                ) : (
                  <Circle
                    size={20}
                    className="text-[#DDD6C8] group-hover:text-[#A8C3A0]"
                  />
                )}
              </div>

              <div className="flex-1">
                <h4
                  className={`text-xs font-semibold ${task.isChecked ? "text-[#1B1B1B]" : "text-[#1B1B1B]"}`}
                >
                  {task.title}
                </h4>
                <p className="text-[9px] text-[#6E6E6E] mt-0.5 line-clamp-1">
                  {task.desc}
                </p>
              </div>

              <div className="hidden md:flex items-center gap-6 text-[10px] font-medium">
                <span
                  className={`w-28 text-center py-1 rounded-md ${
                    task.status === "Selesai"
                      ? "text-[#1F4D3A]"
                      : task.status === "Sedang Dikerjakan"
                        ? "text-[#B77B57]"
                        : "text-[#6E6E6E]"
                  }`}
                >
                  {task.status}
                </span>

                <div className="flex -space-x-1.5 w-12 justify-end">
                  {task.avatars.map((av, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-[#1B1B1B] text-white border-2 border-white flex items-center justify-center text-[8px] font-bold"
                    >
                      {av}
                    </div>
                  ))}
                  {task.avatars.length === 0 && (
                    <span className="text-[#DDD6C8]">-</span>
                  )}
                </div>

                <span className="w-16 text-right text-[#6E6E6E]">
                  {task.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </FadeUp>

      {/* Files Section */}
      <FadeUp delay={0.5} className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">
            File Terbaru
          </h3>
          <button className="text-[10px] font-semibold text-[#6E6E6E] hover:text-[#1B1B1B]">
            Lihat semua
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* File 1 */}
          <div className="bg-white border border-[#DDD6C8] rounded-xl overflow-hidden hover:shadow-sm cursor-pointer group">
            <div className="h-28 bg-[#F6F3EA] flex flex-wrap gap-1 p-2 items-center justify-center">
              <div className="w-[45%] h-[45%] bg-[#E7F0E9] rounded border border-[#A8C3A0]/30 flex items-center justify-center">
                <Leaf size={14} className="text-[#5F8B6D] opacity-50" />
              </div>
              <div className="w-[45%] h-[45%] bg-[#E7F0E9] rounded border border-[#A8C3A0]/30 flex items-center justify-center">
                <Leaf size={14} className="text-[#5F8B6D] opacity-50" />
              </div>
              <div className="w-[45%] h-[45%] bg-[#E7F0E9] rounded border border-[#A8C3A0]/30 flex items-center justify-center">
                <Leaf size={14} className="text-[#5F8B6D] opacity-50" />
              </div>
              <div className="w-[45%] h-[45%] bg-[#E7F0E9] rounded border border-[#A8C3A0]/30 flex items-center justify-center">
                <Leaf size={14} className="text-[#5F8B6D] opacity-50" />
              </div>
            </div>
            <div className="p-3">
              <h4 className="text-[10px] font-bold text-[#1B1B1B] mb-0.5 group-hover:text-[#1F4D3A] line-clamp-1">
                {isFreelance
                  ? "Konten Feed 1-10.pdf"
                  : "Materi Sosialisasi.pdf"}
              </h4>
              <p className="text-[8px] text-[#6E6E6E]">PDF • 18.4 MB</p>
            </div>
          </div>
          {/* File 2 */}
          <div className="bg-white border border-[#DDD6C8] rounded-xl overflow-hidden hover:shadow-sm cursor-pointer group">
            <div className="h-28 bg-[#FCF5E3] flex gap-2 p-3 items-center justify-center">
              <div className="w-1/3 h-[90%] bg-white rounded shadow-sm border border-[#DDD6C8] flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#B77B57]/30"></div>
              </div>
              <div className="w-1/3 h-[90%] bg-white rounded shadow-sm border border-[#DDD6C8] flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#B77B57]/30"></div>
              </div>
            </div>
            <div className="p-3">
              <h4 className="text-[10px] font-bold text-[#1B1B1B] mb-0.5 group-hover:text-[#1F4D3A] line-clamp-1">
                {isFreelance ? "Instagram Story 1-5.pdf" : "Poster Relawan.jpg"}
              </h4>
              <p className="text-[8px] text-[#6E6E6E]">PDF • 10.2 MB</p>
            </div>
          </div>
          {/* File 3 */}
          <div className="bg-white border border-[#DDD6C8] rounded-xl overflow-hidden hover:shadow-sm cursor-pointer group">
            <div className="h-28 bg-[#1F4D3A] flex p-3 items-center justify-center relative">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(#A8C3A0 1px, transparent 1px)",
                  backgroundSize: "10px 10px",
                }}
              ></div>
              <Leaf size={32} className="text-[#A8C3A0]" strokeWidth={1} />
            </div>
            <div className="p-3">
              <h4 className="text-[10px] font-bold text-[#1B1B1B] mb-0.5 group-hover:text-[#1F4D3A] line-clamp-1">
                {isFreelance
                  ? "Moodboard Nusantara.jpg"
                  : "Rencana Anggaran.xlsx"}
              </h4>
              <p className="text-[8px] text-[#6E6E6E]">JPG • 5.6 MB</p>
            </div>
          </div>
          {/* Upload Button */}
          <div className="border-2 border-dashed border-[#A8C3A0] rounded-xl flex flex-col items-center justify-center text-center gap-2 bg-[#E7F0E9]/30 hover:bg-[#E7F0E9] transition-colors cursor-pointer">
            <UploadCloud size={24} className="text-[#5F8B6D]" />
            <span className="text-[10px] font-bold text-[#1F4D3A]">
              Upload File
            </span>
            <span className="text-[8px] text-[#6E6E6E]">
              atau tarik & lepas file di sini
            </span>
          </div>
        </div>
      </FadeUp>

      {/* Activity Log */}
      <FadeUp delay={0.6}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">
            Aktivitas Terbaru
          </h3>
        </div>
        <div className="bg-white border border-[#DDD6C8] rounded-2xl p-5">
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
                <FileBarChart size={14} />
              </div>
              <div className="flex-1 pb-4 border-b border-[#F6F3EA]">
                <p className="text-[11px] text-[#1B1B1B] leading-relaxed">
                  <b>Raka Mahendra</b> mengunggah file{" "}
                  <span className="text-[#1F4D3A] font-semibold cursor-pointer">
                    {isFreelance ? "Konten Feed 1-10.pdf" : "Daftar Hadir.pdf"}
                  </span>
                </p>
              </div>
              <span className="text-[9px] text-[#A8C3A0] flex-shrink-0">
                2 jam lalu
              </span>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <img
                  src="https://placehold.co/100x100/1F4D3A/white?text=KN"
                  alt="KN"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex-1 pb-4 border-b border-[#F6F3EA]">
                <p className="text-[11px] text-[#1B1B1B] leading-relaxed">
                  <b>{oppData.organizer}</b> memberikan feedback pada tugas{" "}
                  <span className="text-[#1F4D3A] font-semibold cursor-pointer">
                    {isFreelance
                      ? "Desain 10 Konten Instagram Feed"
                      : "Survei Lokasi"}
                  </span>
                </p>
              </div>
              <span className="text-[9px] text-[#A8C3A0] flex-shrink-0">
                5 jam lalu
              </span>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                <CheckCircle size={14} />
              </div>
              <div className="flex-1">
                <p className="text-[11px] text-[#1B1B1B] leading-relaxed">
                  <b>Raka Mahendra</b> menyelesaikan tugas{" "}
                  <span className="text-[#1F4D3A] font-semibold cursor-pointer">
                    {isFreelance
                      ? "Konsep Visual & Moodboard"
                      : "Pengadaan Bibit"}
                  </span>
                </p>
              </div>
              <span className="text-[9px] text-[#A8C3A0] flex-shrink-0">
                1 hari lalu
              </span>
            </div>
          </div>
          <button className="w-full text-center text-[10px] font-semibold text-[#6E6E6E] hover:text-[#1B1B1B] mt-4 pt-4 border-t border-[#DDD6C8]/50">
            Lihat semua aktivitas
          </button>
        </div>
      </FadeUp>
    </div>
  );
};

// Helper for generic Grip icon
export const GripVertical = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="9" cy="12" r="1" />
    <circle cx="9" cy="5" r="1" />
    <circle cx="9" cy="19" r="1" />
    <circle cx="15" cy="12" r="1" />
    <circle cx="15" cy="5" r="1" />
    <circle cx="15" cy="19" r="1" />
  </svg>
);

export const WorkroomRightSidebar = ({ opportunityType }) => {
  const isFreelance = opportunityType === "Freelance";

  const members = isFreelance
    ? [
        {
          name: "Raka Mahendra (Kamu)",
          role: "Desainer",
          initial: "R",
          bg: "bg-[#1F4D3A]",
          color: "text-white",
        },
        {
          name: "Kopi Nusantara",
          role: "Pemilik Proyek",
          initial: "K",
          bg: "bg-[#E7DCCB]",
          color: "text-[#1F4D3A]",
        },
        {
          name: "Ayu Lestari",
          role: "Marketing",
          initial: "A",
          bg: "bg-[#A8C3A0]",
          color: "text-[#1F4D3A]",
        },
        {
          name: "Dimas Pratama",
          role: "Copywriter",
          initial: "D",
          bg: "bg-[#F5B041]",
          color: "text-[#1B1B1B]",
        },
      ]
    : [
        {
          name: "Raka Mahendra (Kamu)",
          role: "Relawan Inti",
          initial: "R",
          bg: "bg-[#1F4D3A]",
          color: "text-white",
        },
        {
          name: "Komunitas Hijau",
          role: "Koordinator",
          initial: "K",
          bg: "bg-[#E7DCCB]",
          color: "text-[#1F4D3A]",
        },
        {
          name: "Siti Aminah",
          role: "Relawan",
          initial: "S",
          bg: "bg-[#A8C3A0]",
          color: "text-[#1F4D3A]",
        },
        {
          name: "Budi Santoso",
          role: "Relawan",
          initial: "B",
          bg: "bg-[#F5B041]",
          color: "text-[#1B1B1B]",
        },
      ];

  return (
    <aside className="w-[340px] h-screen sticky top-0 bg-[#FCFBF8] border-l border-[#DDD6C8] flex flex-col py-8 px-6 z-20 flex-shrink-0 overflow-y-auto hide-scrollbar">
      {/* Tim Proyek */}
      <div className="mb-8">
        <h3 className="font-sora font-bold text-sm text-[#1B1B1B] mb-1">
          Tim Proyek
        </h3>
        <p className="text-[10px] text-[#6E6E6E] mb-4">4 anggota</p>

        <div className="space-y-3 mb-4">
          {members.map((m, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full ${m.bg} ${m.color} flex items-center justify-center text-[10px] font-bold shadow-sm relative`}
              >
                {m.initial}
                <div
                  className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white ${i < 2 ? "bg-green-500" : "bg-gray-300"}`}
                ></div>
              </div>
              <div className="flex-1">
                <h4 className="text-[11px] font-bold text-[#1B1B1B] leading-tight">
                  {m.name}
                </h4>
                <p className="text-[9px] text-[#6E6E6E]">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full bg-white border border-[#DDD6C8] text-[#1B1B1B] text-[10px] font-semibold py-2 rounded-xl hover:bg-[#F6F3EA] transition-colors shadow-sm">
          Undang Anggota
        </button>
      </div>

      {/* Timeline Proyek */}
      <div className="mb-8">
        <h3 className="font-sora font-bold text-sm text-[#1B1B1B] mb-4">
          Timeline Proyek
        </h3>
        <div className="relative pl-3 border-l-2 border-[#E7F0E9] space-y-5 ml-2">
          <div className="relative">
            <div className="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-[#1F4D3A] border-2 border-[#FCFBF8]"></div>
            <h4 className="text-[11px] font-bold text-[#1B1B1B]">
              Proyek dibuat
            </h4>
            <p className="text-[9px] text-[#6E6E6E]">5 Mei 2024</p>
          </div>

          <div className="relative">
            <div className="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-[#1F4D3A] border-2 border-[#FCFBF8]"></div>
            <h4 className="text-[11px] font-bold text-[#1B1B1B]">
              {isFreelance ? "Brief disetujui" : "Rapat Konsolidasi"}
            </h4>
            <p className="text-[9px] text-[#6E6E6E]">5 Mei 2024</p>
          </div>

          <div className="relative">
            <div className="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-[#1F4D3A] border-2 border-[#FCFBF8]"></div>
            <h4 className="text-[11px] font-bold text-[#1B1B1B]">
              {isFreelance ? "Konsep disetujui" : "Izin Lokasi Turun"}
            </h4>
            <p className="text-[9px] text-[#6E6E6E]">8 Mei 2024</p>
          </div>

          <div className="relative">
            <div className="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-[#1F4D3A] border-2 border-[#FCFBF8]"></div>
            <h4 className="text-[11px] font-bold text-[#1B1B1B]">
              {isFreelance ? "Desain feed selesai" : "Bibit Pohon Tiba"}
            </h4>
            <p className="text-[9px] text-[#6E6E6E]">12 Mei 2024</p>
          </div>

          <div className="relative">
            <div className="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-white border-2 border-[#5F8B6D]"></div>
            <h4 className="text-[11px] font-bold text-[#1B1B1B]">
              {isFreelance ? "Story design" : "Sosialisasi Berjalan"}
            </h4>
            <p className="text-[9px] text-[#6E6E6E]">16 Mei 2024</p>
          </div>

          <div className="relative">
            <div className="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-white border-2 border-[#DDD6C8]"></div>
            <h4 className="text-[11px] font-bold text-[#6E6E6E]">
              {isFreelance ? "Finalisasi" : "Hari H Aksi"}
            </h4>
            <p className="text-[9px] text-[#6E6E6E]">20 Mei 2024</p>
          </div>
        </div>
      </div>

      {/* Catatan Area */}
      <div className="mt-auto relative pb-16">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">
            Catatan
          </h3>
          <button className="text-[#6E6E6E] hover:text-[#1B1B1B]">
            <Edit3 size={14} />
          </button>
        </div>

        <div className="space-y-3 relative z-10">
          <div className="bg-[#FCF5E3] rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-sm p-4 shadow-sm border border-[#F5B041]/20">
            <h4 className="text-[10px] font-bold text-[#1B1B1B] mb-0.5">
              Catatan dari {isFreelance ? "Kopi Nusantara" : "Koordinator"}
            </h4>
            <p className="text-[8px] text-[#A8C3A0] mb-2">12 Mei, 14:30</p>
            <p className="text-[10px] text-[#1B1B1B] leading-relaxed">
              {isFreelance
                ? "Desainnya sudah keren! Bisa ditambahkan sentuhan tone warna lebih hangat di slide ke-3 ya. Terima kasih!"
                : "Titik kumpul hari H nanti di pendopo utama jam 06:00 pagi ya. Jangan lupa bawa tumbler sendiri!"}
            </p>
          </div>

          <div className="bg-white border border-[#DDD6C8] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-sm p-4 shadow-sm">
            <h4 className="text-[10px] font-bold text-[#1B1B1B] mb-0.5">
              Catatan pribadiku
            </h4>
            <p className="text-[8px] text-[#A8C3A0] mb-2">11 Mei, 09:15</p>
            <p className="text-[10px] text-[#6E6E6E] leading-relaxed">
              {isFreelance
                ? "Pastikan semua copy sudah di-check sebelum finalisasi."
                : "Bawa sarung tangan ekstra & kantong sampah kecil."}
            </p>
          </div>
        </div>

        {/* Decorative Coffee Cup CSS Illustration at the bottom */}
        <div className="absolute -bottom-8 right-0 w-24 h-24 z-0 pointer-events-none opacity-90">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Saucer */}
            <ellipse
              cx="50"
              cy="80"
              rx="35"
              ry="10"
              fill="#A8C3A0"
              opacity="0.5"
            />
            <ellipse cx="50" cy="78" rx="25" ry="7" fill="#E7F0E9" />
            {/* Cup Handle */}
            <path
              d="M70 50 C85 50, 85 70, 70 70"
              stroke="#5F8B6D"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            {/* Cup Body */}
            <path
              d="M25 40 L30 75 C32 85, 68 85, 70 75 L75 40 Z"
              fill="#5F8B6D"
            />
            <path
              d="M25 40 L30 75 C32 85, 68 85, 70 75 L75 40 Z"
              fill="url(#cupGradient)"
              opacity="0.3"
            />
            {/* Cup Top inside */}
            <ellipse cx="50" cy="40" rx="25" ry="8" fill="#E7F0E9" />
            <ellipse cx="50" cy="41" rx="22" ry="6" fill="#B77B57" />
            {/* Latte art (Leaf) */}
            <path
              d="M50 45 C45 42, 45 38, 50 37 C55 38, 55 42, 50 45 Z"
              fill="#F6F3EA"
              opacity="0.8"
            />
            <path
              d="M50 42 C47 40, 47 37, 50 36 C53 37, 53 40, 50 42 Z"
              fill="#F6F3EA"
              opacity="0.6"
            />

            <defs>
              <linearGradient
                id="cupGradient"
                x1="25"
                y1="40"
                x2="75"
                y2="40"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" stopOpacity="0" />
                <stop offset="1" stopColor="black" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </aside>
  );
};
