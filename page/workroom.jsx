import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PlusSquare, MessageSquare, Leaf, CheckCircle2, Clock, LayoutGrid,
  ClipboardList, BadgeCheck, File as FileIcon, Edit3, Circle, 
  CheckCircle, UploadCloud, MoreHorizontal, FileImage, GripVertical
} from "lucide-react";

// --- INLINED COMPONENTS TO FIX IMPORT ERRORS ---
const FadeUp = ({ children, className, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay }} className={className}>
    {children}
  </motion.div>
);

const Button = ({ children, className, variant, ...props }) => {
  const baseStyle = "flex items-center justify-center font-bold transition-colors rounded-full cursor-pointer disabled:opacity-50";
  const variants = {
    primary: "bg-[#1F4D3A] text-white hover:bg-[#15382A]",
    outline: "bg-white border border-[#DDD6C8] text-[#1B1B1B] hover:bg-[#F6F3EA]",
    success: "bg-green-600 text-white hover:bg-green-700"
  };
  return (
    <button className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Badge = ({ children, className }) => (
  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${className}`}>{children}</span>
);
// -----------------------------------------------

// ============================================================================
// WORKROOM MAIN COMPONENT
// ============================================================================
export const WorkroomMain = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutGrid },
    { id: "tugas", label: "Tugas", icon: ClipboardList },
    { id: "file", label: "File", icon: FileIcon },
    { id: "diskusi", label: "Diskusi", icon: MessageSquare },
    { id: "revisi", label: "Revisi", icon: FileImage },
    { id: "timeline", label: "Timeline", icon: Clock },
  ];

  const fetchWorkroomData = async () => {
    try {
      const [resW, resO, resT, resU, resA] = await Promise.all([
        fetch("/api/workrooms").then(r => r.json()),
        fetch("/api/opportunities").then(r => r.json()),
        fetch("/api/tasks").then(r => r.json()),
        fetch("/api/users").then(r => r.json()),
        fetch("/api/activities").then(r => r.json())
      ]);

      const workrooms = resW.ok ? resW.data : [];
      const opps = resO.ok ? resO.data : [];
      const tasks = resT.ok ? resT.data : [];
      const users = resU.ok ? resU.data : [];
      const activities = resA.ok ? resA.data : [];

      if (workrooms.length === 0) {
        setData(null);
        setLoading(false);
        return;
      }

      // Ambil workroom pertama sebagai contoh (di real app pakai ID spesifik)
      const activeWrk = workrooms[0];
      const activeOpp = opps.find(o => o.id === activeWrk.opportunity_id) || {};
      const projectTasks = tasks.filter(t => t.workroom_id === activeWrk.id);
      
      const tasksTotal = projectTasks.length;
      const tasksDone = projectTasks.filter(t => t.status === "Selesai").length;
      const tasksInProgress = projectTasks.filter(t => t.status === "Sedang Dikerjakan").length;
      const progress = tasksTotal > 0 ? Math.round((tasksDone / tasksTotal) * 100) : activeWrk.progress_pct;

      const organizer = users.find(u => u.id === activeOpp.creator_id)?.name || "Penyelenggara";
      
      // SUDUT PANDANG: Apakah user saat ini adalah si Pembuat Peluang?
      const isOrganizer = currentUser?.id === activeOpp.creator_id;

      setData({
        workroom: activeWrk,
        opp: activeOpp,
        tasks: projectTasks,
        activities: activities.slice(0, 4),
        organizer,
        isOrganizer,
        stats: { total: tasksTotal, done: tasksDone, inProgress: tasksInProgress, progress }
      });
    } catch (error) {
      console.error("Gagal fetch data workroom", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWorkroomData(); }, [currentUser]);

  // --- AKSI: SELESAIKAN TUGAS ---
  const handleCompleteTask = async (taskId) => {
    setIsProcessing(true);
    await fetch("/api/tasks", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "complete", id: taskId })
    });
    await fetchWorkroomData(); // Refresh data
    setIsProcessing(false);
  };

  // --- AKSI: TAMBAH TUGAS (KHUSUS ORGANIZER) ---
  const handleAddTask = async () => {
    const title = prompt("Masukkan judul tugas baru:");
    if (!title) return;
    
    setIsProcessing(true);
    // Asumsi: Menugaskan ke pekerja (bisa disesuaikan nanti)
    await fetch("/api/tasks", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workroom_id: data.workroom.id, title, assignee_id: currentUser?.id })
    });
    await fetchWorkroomData();
    setIsProcessing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full max-w-[900px] mx-auto">
        <div className="w-8 h-8 border-4 border-[#E7F0E9] border-t-[#1F4D3A] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data) {
    return <div className="p-10 text-center text-[#6E6E6E]">Belum ada ruang kerja yang aktif.</div>;
  }

  const { opp, workroom, tasks, activities, organizer, isOrganizer, stats } = data;
  const isFreelance = opp.type === "Freelance";
  const badgeColor = isFreelance ? "bg-[#E7F0E9] text-[#1F4D3A]" : "bg-green-100 text-green-700";
  
  // Realtime Dates
  const todayStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="max-w-[900px] mx-auto pb-10">
      {/* Top Breadcrumb & Actions */}
      <FadeUp className="mt-4 mb-6 flex items-center justify-between">
        <div className="text-xs font-semibold text-[#6E6E6E] flex items-center gap-2">
          <span>Workroom</span> <span className="text-[#DDD6C8]">/</span>{" "}
          <span className="text-[#1B1B1B]">{opp.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-[#6E6E6E] hover:text-[#1B1B1B]">
            <MoreHorizontal size={18} />
          </button>
          {isOrganizer && (
            <Button variant={stats.progress === 100 ? "success" : "primary"} className="text-[11px] py-1.5 px-4 shadow-sm" disabled={workroom.status === "Selesai"}>
              {workroom.status === "Selesai" ? "Proyek Selesai" : "Selesaikan Proyek"}
            </Button>
          )}
        </div>
      </FadeUp>

      {/* Header Profile Hero */}
      <FadeUp delay={0.1} className="mb-6 bg-white border border-[#DDD6C8] rounded-3xl p-6 relative overflow-hidden shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex-1">
            <h1 className="font-sora font-bold text-2xl md:text-3xl text-[#1B1B1B] mb-3 leading-tight max-w-[80%]">
              {opp.title}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-[#E7DCCB] flex items-center justify-center text-[10px] font-bold text-[#1F4D3A]">
                {organizer.charAt(0)}
              </div>
              <span className="font-sora font-semibold text-sm text-[#1B1B1B] flex items-center gap-1">
                {organizer} <BadgeCheck size={14} className="text-[#5F8B6D] fill-[#E7F0E9]" />
              </span>
            </div>
            <Badge className={`${badgeColor} mb-6 inline-block`}>{opp.type}</Badge>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-[11px]">
              <div>
                <span className="text-[#6E6E6E] block mb-1">Dibuat</span>
                <span className="font-bold text-[#1B1B1B]">{workroom.created_at.split(" ")[0]}</span>
              </div>
              <div>
                <span className="text-[#6E6E6E] block mb-1">Hari Ini</span>
                <span className="font-bold text-[#1F4D3A]">{todayStr}</span>
              </div>
              <div>
                <span className="text-[#6E6E6E] block mb-1">{isFreelance ? "Reward" : "Target Dampak"}</span>
                <span className="font-bold text-[#1B1B1B]">
                  {opp.reward === "0" || opp.reward?.toLowerCase() === "rp0" ? "Sertifikat" : opp.reward}
                </span>
              </div>
              <div>
                <span className="text-[#6E6E6E] block mb-1">Status Workroom</span>
                <Badge className="bg-[#E7F0E9] text-[#1F4D3A] font-bold py-0.5">{workroom.status}</Badge>
              </div>
            </div>
          </div>

          {/* Dummy Graphic Header */}
          <div className="hidden md:flex absolute right-6 bottom-0 w-48 h-32 items-end justify-center z-0">
            <div className="w-24 h-24 bg-[#E7DCCB] rounded-full absolute bottom-4 opacity-50 mix-blend-multiply blur-xl"></div>
            <div className="relative flex items-end">
              <svg width="180" height="120" viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="50" width="40" height="70" rx="10" fill="#5F8B6D" />
                <circle cx="40" cy="35" r="15" fill="#B77B57" />
                <rect x="65" y="70" width="50" height="35" rx="4" fill="#A8C3A0" />
                <rect x="70" y="75" width="40" height="25" rx="2" fill="#E7F0E9" />
                <circle cx="90" cy="87" r="4" fill="#1F4D3A" />
                <rect x="120" y="60" width="35" height="60" rx="10" fill="#E7F0E9" stroke="#1F4D3A" strokeWidth="2" />
                <circle cx="137" cy="45" r="12" fill="#B77B57" />
              </svg>
            </div>
          </div>
        </div>
      </FadeUp>

      {/* Tabs */}
      <FadeUp delay={0.2} className="flex gap-2 overflow-x-auto hide-scrollbar mb-8 border-b border-[#DDD6C8] pb-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-[11px] font-semibold flex items-center gap-2 whitespace-nowrap transition-colors relative ${
              activeTab === tab.id ? "text-[#1F4D3A]" : "text-[#6E6E6E] hover:text-[#1B1B1B]"
            }`}
          >
            <tab.icon size={14} strokeWidth={activeTab === tab.id ? 2 : 1.5} />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div layoutId="workroom-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1F4D3A]" />
            )}
          </button>
        ))}
      </FadeUp>

      {/* Progress Section */}
      <FadeUp delay={0.3} className="mb-8">
        <h3 className="font-sora font-bold text-sm text-[#1B1B1B] mb-1">Progress Proyek</h3>
        <p className="text-[10px] text-[#6E6E6E] mb-4">Pantau perkembangan tugas dan pencapaian proyekmu.</p>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 bg-[#E7DCCB] h-2.5 rounded-full overflow-hidden">
            <div className="bg-[#1F4D3A] h-full rounded-full transition-all duration-500" style={{ width: `${stats.progress}%` }}></div>
          </div>
          <span className="font-sora font-bold text-[#1B1B1B] text-sm">{stats.progress}%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#F6F3EA] border border-[#DDD6C8] rounded-2xl p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1F4D3A] text-white flex items-center justify-center"><CheckCircle size={16} /></div>
            <div>
              <h4 className="font-sora font-bold text-xs text-[#1B1B1B]">Selesai</h4>
              <p className="text-[10px] text-[#6E6E6E]">{stats.done} / {stats.total} tugas</p>
            </div>
          </div>
          <div className="bg-white border border-[#DDD6C8] border-dashed rounded-2xl p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-dashed border-[#F5B041] text-[#F5B041] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#F5B041]"></div>
            </div>
            <div>
              <h4 className="font-sora font-bold text-xs text-[#1B1B1B]">Sedang Dikerjakan</h4>
              <p className="text-[10px] text-[#6E6E6E]">{stats.inProgress} tugas</p>
            </div>
          </div>
          <div className="bg-white border border-[#DDD6C8] rounded-2xl p-4 flex items-center gap-3 opacity-70">
            <div className="w-8 h-8 rounded-full border-2 border-[#DDD6C8] text-[#DDD6C8] flex items-center justify-center"><Circle size={16} /></div>
            <div>
              <h4 className="font-sora font-bold text-xs text-[#1B1B1B]">Belum Dimulai</h4>
              <p className="text-[10px] text-[#6E6E6E]">{stats.total - stats.done - stats.inProgress} tugas</p>
            </div>
          </div>
        </div>
      </FadeUp>

      {/* Task List (BISA DICENTANG!) */}
      <FadeUp delay={0.4} className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">To-Do List Proyek</h3>
          {/* Tampil hanya jika dia Organizer (Pemberi Proyek) */}
          {isOrganizer && (
            <Button onClick={handleAddTask} disabled={isProcessing} className="text-[11px] py-1.5 px-3 gap-1">
              <PlusSquare size={12} /> Tugas Baru
            </Button>
          )}
        </div>

        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-xs text-center p-6 border border-dashed rounded-xl text-[#6E6E6E]">Belum ada tugas di Workroom ini.</p>
          ) : tasks.map((task) => {
            const isChecked = task.status === "Selesai";
            return (
              <div key={task.id} className={`bg-white border ${isChecked ? 'border-[#A8C3A0] bg-[#E7F0E9]/20' : 'border-[#DDD6C8]'} rounded-xl p-4 flex items-center gap-4 hover:border-[#A8C3A0] transition-colors group`}>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <GripVertical size={16} className="text-[#DDD6C8] opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />
                  
                  {/* Tombol Centang Dinamis */}
                  <button 
                    onClick={() => !isChecked && handleCompleteTask(task.id)}
                    disabled={isChecked || isProcessing}
                    className="focus:outline-none disabled:cursor-not-allowed"
                  >
                    {isChecked ? (
                      <CheckCircle2 size={22} className="text-[#1F4D3A] fill-[#A8C3A0]" />
                    ) : (
                      <Circle size={22} className="text-[#DDD6C8] hover:text-[#5F8B6D] transition-colors" />
                    )}
                  </button>
                </div>

                <div className="flex-1">
                  <h4 className={`text-xs font-semibold ${isChecked ? "text-[#6E6E6E] line-through" : "text-[#1B1B1B]"}`}>{task.title}</h4>
                  <p className="text-[9px] text-[#6E6E6E] mt-0.5">Assigned to: {task.assignee_id}</p>
                </div>

                <div className="hidden md:flex items-center gap-6 text-[10px] font-medium">
                  <span className={`w-28 text-center py-1 rounded-md ${isChecked ? "text-[#1F4D3A] bg-[#A8C3A0]/20" : task.status === "Sedang Dikerjakan" ? "text-[#B77B57] bg-[#E7DCCB]" : "text-[#6E6E6E] bg-[#F6F3EA]"}`}>
                    {task.status}
                  </span>
                  <span className="w-16 text-right text-[#6E6E6E]">{task.created_at.split(' ')[0]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </FadeUp>

      {/* Files Section (Tampilan Statis) */}
      <FadeUp delay={0.5} className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">File Terlampir</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-[#DDD6C8] rounded-xl overflow-hidden hover:shadow-sm cursor-pointer group">
            <div className="h-28 bg-[#F6F3EA] flex items-center justify-center">
              <Leaf size={32} className="text-[#5F8B6D] opacity-50" />
            </div>
            <div className="p-3">
              <h4 className="text-[10px] font-bold text-[#1B1B1B] mb-0.5 group-hover:text-[#1F4D3A] line-clamp-1">Brief Proyek.pdf</h4>
              <p className="text-[8px] text-[#6E6E6E]">PDF • 2.4 MB</p>
            </div>
          </div>
          
          <div className="border-2 border-dashed border-[#A8C3A0] rounded-xl flex flex-col items-center justify-center text-center gap-2 bg-[#E7F0E9]/30 hover:bg-[#E7F0E9] transition-colors cursor-pointer h-full min-h-[145px]">
            <UploadCloud size={24} className="text-[#5F8B6D]" />
            <span className="text-[10px] font-bold text-[#1F4D3A]">Upload File</span>
            <span className="text-[8px] text-[#6E6E6E]">atau tarik & lepas file</span>
          </div>
        </div>
      </FadeUp>

      {/* Activity Log (Tersambung ke API) */}
      <FadeUp delay={0.6}>
        <h3 className="font-sora font-bold text-sm text-[#1B1B1B] mb-4">Riwayat Log C++</h3>
        <div className="bg-white border border-[#DDD6C8] rounded-2xl p-5">
          <div className="space-y-4">
            {activities.length === 0 ? (
              <p className="text-xs text-[#6E6E6E]">Belum ada aktivitas terekam di C++.</p>
            ) : activities.map((act, i) => (
              <div key={i} className="flex gap-4 items-start border-b border-[#F6F3EA] pb-3 last:border-0 last:pb-0">
                <div className="w-8 h-8 rounded-full bg-gray-100 text-[#1F4D3A] flex items-center justify-center flex-shrink-0">
                  <Activity size={14} />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-[#1B1B1B] leading-relaxed">
                    [System Log]: <span className="text-[#1F4D3A] font-semibold">{act.text}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </div>
  );
};

// ============================================================================
// WORKROOM RIGHT SIDEBAR COMPONENT
// ============================================================================
export const WorkroomRightSidebar = ({ currentUser }) => {
  // Hanya visualisasi profil. Data aslinya bisa di-fetch terpisah.
  const isWorker = currentUser?.role_title !== "Penyelenggara";

  return (
    <aside className="w-[340px] h-screen sticky top-0 bg-[#FCFBF8] border-l border-[#DDD6C8] flex flex-col py-8 px-6 z-20 flex-shrink-0 overflow-y-auto hide-scrollbar">
      {/* Profil Diri di Workroom */}
      <div className="mb-8 bg-white border border-[#DDD6C8] rounded-2xl p-5 text-center shadow-sm">
        <div className="w-16 h-16 bg-[#1F4D3A] text-white rounded-full mx-auto flex items-center justify-center text-xl font-bold mb-3 shadow-md">
          {currentUser?.name ? currentUser.name.charAt(0) : "U"}
        </div>
        <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">{currentUser?.name || "Member Pijak"}</h3>
        <p className="text-[10px] font-medium text-[#6E6E6E] mt-1">{isWorker ? "Pengerja Proyek" : "Pemberi Proyek"}</p>
        <Badge className="bg-[#E7F0E9] text-[#1F4D3A] mt-3 inline-block px-3 py-1">Mode: {isWorker ? "Worker" : "Organizer"}</Badge>
      </div>

      {/* Timeline Proyek */}
      <div className="mb-8">
        <h3 className="font-sora font-bold text-sm text-[#1B1B1B] mb-4">Timeline Proyek</h3>
        <div className="relative pl-3 border-l-2 border-[#E7F0E9] space-y-5 ml-2">
          <div className="relative">
            <div className="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-[#1F4D3A] border-2 border-[#FCFBF8]"></div>
            <h4 className="text-[11px] font-bold text-[#1B1B1B]">Workroom dibuat</h4>
            <p className="text-[9px] text-[#6E6E6E]">Otomatis by System</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-[#1F4D3A] border-2 border-[#FCFBF8]"></div>
            <h4 className="text-[11px] font-bold text-[#1B1B1B]">Kolaborasi Berjalan</h4>
            <p className="text-[9px] text-[#6E6E6E]">Hari Ini</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-white border-2 border-[#DDD6C8]"></div>
            <h4 className="text-[11px] font-bold text-[#6E6E6E]">Penyelesaian</h4>
          </div>
        </div>
      </div>

      {/* Catatan Area */}
      <div className="mt-auto relative pb-16">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">Catatan Bersama</h3>
          <button className="text-[#6E6E6E] hover:text-[#1B1B1B]"><Edit3 size={14} /></button>
        </div>

        <div className="space-y-3 relative z-10">
          <div className="bg-[#FCF5E3] rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-sm p-4 shadow-sm border border-[#F5B041]/20">
            <p className="text-[10px] text-[#1B1B1B] leading-relaxed italic">
              "Mari selesaikan proyek ini tepat waktu dengan kualitas terbaik! Semangat tim!"
            </p>
          </div>
        </div>

        {/* Decorative Coffee Cup */}
        <div className="absolute -bottom-8 right-0 w-24 h-24 z-0 pointer-events-none opacity-90">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="50" cy="80" rx="35" ry="10" fill="#A8C3A0" opacity="0.5" />
            <ellipse cx="50" cy="78" rx="25" ry="7" fill="#E7F0E9" />
            <path d="M70 50 C85 50, 85 70, 70 70" stroke="#5F8B6D" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M25 40 L30 75 C32 85, 68 85, 70 75 L75 40 Z" fill="#5F8B6D" />
            <ellipse cx="50" cy="40" rx="25" ry="8" fill="#E7F0E9" />
            <ellipse cx="50" cy="41" rx="22" ry="6" fill="#B77B57" />
            <path d="M50 45 C45 42, 45 38, 50 37 C55 38, 55 42, 50 45 Z" fill="#F6F3EA" opacity="0.8" />
          </svg>
        </div>
      </div>
    </aside>
  );
};