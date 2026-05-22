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
  Sparkles,
  Lightbulb,
  Flag,
  Map,
  Star,
  Palette,
  TrendingUp,
  PenLine,
  BarChart3,
  Clapperboard,
  Trees,
  LayoutGrid,
} from "lucide-react";
import { Badge, Button } from "./uis";

const NAV_ITEMS = [
  { id: "beranda", icon: Home, label: "Beranda" },
  { id: "jelajah", icon: Compass, label: "Jelajah" },
  { id: "buat", icon: PlusSquare, label: "Buat Peluang" },
  { id: "aktivitas", icon: Activity, label: "Aktivitas" },
  { id: "profil", icon: User, label: "Profil" },
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
export const Topbar = () => (
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


/**
 * @param {{ currentPage: string, setCurrentPage: (page: string) => void }} props
 */
export const LeftSidebar = ({ currentPage, setCurrentPage }) => (
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
              &quot;Kecilkan langkah,
              <br />
              besarkan dampak.&quot;
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


export const RightSidebar = () => (
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