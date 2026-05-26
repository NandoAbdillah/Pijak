import {
  User,
  Search,
  ChevronDown,
  ArrowRight,
  Leaf,
  Sparkles,
  Lightbulb,
  Palette,
  TrendingUp,
  Clapperboard,
  Trees,
  Filter,
  Hash,
  Check,
  LayoutGrid,
  Briefcase,
  HeartHandshake,
  Users,
  ArrowRightLeft,
} from "lucide-react";

import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/anim";
import { Button, OpportunityCard } from "@/components/ui/uis";
import { useState, useEffect, useMemo } from "react";

// =====================================================================
// DATA STATIS (TETAP DIPERTAHANKAN)
// =====================================================================
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

// const TRENDING_TAGS = [
//   { tag: "Lingkungan", count: "128 peluang aktif" },
//   { tag: "Pendidikan", count: "96 peluang aktif" },
//   { tag: "Desain", count: "85 peluang aktif" },
// ];

// =====================================================================
// MAIN JELAJAH COMPONENT
// =====================================================================
export const JelajahMain = ({ setCurrentPage, setSelectedOppId }) => {
  const [activeType, setActiveType] = useState("semua");
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil Data dari API
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/opportunities");
      const json = await res.json();
      if (json.ok) {
        setOpportunities(json.data);
      }
    } catch (e) {
      console.error("Gagal ambil data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Logika Filter Tab Kategori
  const filteredData = useMemo(() => {
    if (activeType === "semua") return opportunities;

    // Mapping ID tab ke penamaan tipe di C++
    const typeMap = {
      freelance: "Freelance",
      volunteer: "Volunteer",
      kolaborasi: "Kolaborasi",
      skillexchange: "Skill Exchange",
    };

    return opportunities.filter((opp) => opp.type === typeMap[activeType]);
  }, [activeType, opportunities]);

  // Logika Eksekusi Sorting (Memanggil C++)
  const handleSortBackend = async () => {
    try {
      setLoading(true);
      await fetch("/api/opportunities", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sort" }),
      });
      // Setelah disortir di C++, ambil ulang datanya
      await fetchData();
    } catch (e) {
      console.error("Gagal menyortir:", e);
    }
  };

  const handleCardClick = (id) => {
    if (setSelectedOppId) setSelectedOppId(id);
    if (setCurrentPage) setCurrentPage("detail");
  };

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
                onClick={() => setActiveType(type.id)} // DIBENARKAN: Jangan lempar ke detail di sini
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
              onClick={filter === "Urutkan" ? handleSortBackend : undefined} // TOMBOL URUTKAN AKTIF
              className={`flex items-center gap-2 bg-white border border-[#DDD6C8] px-4 py-2 rounded-full text-xs font-medium text-[#1B1B1B] hover:bg-[#F6F3EA] ${filter === "Urutkan" ? "hover:border-[#5F8B6D] text-[#1F4D3A]" : ""}`}
            >
              {filter}
              {filter === "Urutkan" ? (
                <ArrowRightLeft
                  size={14}
                  className="text-[#5F8B6D] rotate-90"
                />
              ) : (
                <ChevronDown size={14} className="text-[#6E6E6E]" />
              )}
            </button>
          ),
        )}
        <button className="flex items-center gap-2 ml-auto text-xs font-semibold text-[#6E6E6E] hover:text-[#1F4D3A]">
          Filter Lain <Filter size={14} />
        </button>
      </FadeUp>

      {/* Grid Cards (Data from Backend) */}
      {loading ? (
        <div className="flex items-center justify-center py-20 w-full">
          <div className="w-8 h-8 border-4 border-[#E7F0E9] border-t-[#1F4D3A] rounded-full animate-spin"></div>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="w-full text-center py-20 border border-dashed border-[#DDD6C8] rounded-2xl bg-white">
          <p className="text-[#6E6E6E] font-medium">
            Belum ada peluang di kategori ini.
          </p>
        </div>
      ) : (
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {filteredData.map((opp) => (
            <StaggerItem key={opp.id}>
              {/* Data dikirim ke OpportunityCard (kode yang kita buat tadi) */}
              <OpportunityCard data={opp} onClick={handleCardClick} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

      {/* Bottom Banner */}
      {/* <FadeUp
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
     */}
    </div>
  );
};

// =====================================================================
// RIGHT SIDEBAR COMPONENT (REKOMENDASI TREE/GRAPH LOGIC)
// =====================================================================
const TRENDING_TAGS = [
  { tag: "Lingkungan", count: "128 peluang aktif" },
  { tag: "Pendidikan", count: "96 peluang aktif" },
  { tag: "Desain", count: "85 peluang aktif" },
];

export const JelajahRightSidebar = ({
  setCurrentPage,
  setSelectedOppId,
}) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================================================
  // FETCH DATA
  // =========================================================
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/opportunities");

        if (!res.ok) {
          throw new Error("Gagal fetch API");
        }

        const json = await res.json();

        // Pastikan array
        if (json?.ok && Array.isArray(json?.data)) {
          setRecommendations(json.data.slice(0, 3));
        } else {
          setRecommendations([]);
        }
      } catch (err) {
        console.error("Sidebar Error:", err);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  // =========================================================
  // HELPERS
  // =========================================================
  const getIconForItem = (item) => {
    const type = String(item?.type || "").toLowerCase();
    const category = String(item?.category || "").toLowerCase();

    if (category.includes("desain")) return Palette;

    if (
      category.includes("video") ||
      category.includes("creator") ||
      category.includes("kreator")
    ) {
      return Clapperboard;
    }

    if (
      category.includes("lingkungan") ||
      category.includes("pendidikan") ||
      type.includes("volunteer")
    ) {
      return Trees;
    }

    if (type.includes("freelance")) {
      return Briefcase;
    }

    return Briefcase;
  };

  const getColorClass = (item) => {
    const type = String(item?.type || "").toLowerCase();
    const category = String(item?.category || "").toLowerCase();

    if (category.includes("desain")) {
      return "bg-orange-100 text-orange-700";
    }

    if (
      category.includes("video") ||
      category.includes("creator") ||
      category.includes("kreator")
    ) {
      return "bg-purple-100 text-purple-700";
    }

    if (
      category.includes("lingkungan") ||
      category.includes("pendidikan") ||
      type.includes("volunteer")
    ) {
      return "bg-green-100 text-green-700";
    }

    return "bg-blue-100 text-blue-700";
  };

  const formatReward = (reward) => {
    const value = String(reward || "").trim().toLowerCase();

    if (
      value === "" ||
      value === "0" ||
      value === "rp0"
    ) {
      return "Tanpa Bayaran";
    }

    return reward;
  };

  // =========================================================
  // RENDER
  // =========================================================
  return (
    <aside className="w-[320px] min-w-[320px] h-screen sticky top-0 bg-[#FCFBF8] border-l border-[#DDD6C8] flex flex-col px-6 py-8 overflow-y-auto">

      {/* FILTER */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">
            Filter Cepat
          </h3>

          <button className="text-[10px] text-[#6E6E6E] hover:text-black">
            Reset
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            "Beginner",
            "Online",
            "Surabaya",
            "Freelance",
            "Volunteer",
          ].map((tag) => (
            <button
              key={tag}
              className="px-3 py-1.5 rounded-lg border border-[#DDD6C8] bg-white text-[10px] text-[#6E6E6E] hover:bg-[#F6F3EA] transition"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1F4D3A] rounded-2xl p-5 text-white mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="font-sora font-semibold text-sm leading-relaxed mb-2">
            Belum menemukan
            <br />
            peluang yang cocok?
          </h3>

          <p className="text-[11px] text-white/80 leading-relaxed mb-4">
            Buat peluangmu sendiri dan temukan talenta terbaik.
          </p>

          <button className="bg-white text-[#1F4D3A] px-4 py-2 rounded-full text-xs font-semibold hover:bg-[#E7DCCB] transition">
            Buat Peluang
          </button>
        </div>

        <Lightbulb className="absolute right-[-10px] bottom-[-10px] w-20 h-20 opacity-20" />
      </div>

      {/* REKOMENDASI */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">
            Rekomendasi Untukmu
          </h3>

          <button className="text-[10px] text-[#6E6E6E] hover:text-black">
            Lihat Semua
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-7 h-7 border-4 border-[#E7F0E9] border-t-[#1F4D3A] rounded-full animate-spin" />
          </div>
        ) : recommendations.length === 0 ? (
          <div className="text-xs text-[#6E6E6E] bg-white border border-dashed border-[#DDD6C8] rounded-xl p-4 text-center">
            Belum ada rekomendasi.
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((item) => {
              const Icon = getIconForItem(item);
              const colorClass = getColorClass(item);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (setSelectedOppId) {
                      setSelectedOppId(item.id);
                    }

                    if (setCurrentPage) {
                      setCurrentPage("detail");
                    }
                  }}
                  className="flex gap-3 cursor-pointer group"
                >
                  {/* ICON */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}
                  >
                    <Icon size={18} strokeWidth={1.8} />
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 border-b border-[#EEE7D9] pb-3">
                    <h4 className="text-[12px] font-semibold text-[#1B1B1B] leading-snug group-hover:text-[#1F4D3A] transition line-clamp-2">
                      {item.title || "Tanpa Judul"}
                    </h4>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] text-[#6E6E6E]">
                        {item.type || "Opportunity"}
                      </span>

                      <span className="text-[10px] font-semibold text-[#1F4D3A]">
                        {formatReward(item.reward)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* TRENDING */}
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">
            Trending
          </h3>

          <TrendingUp size={16} className="text-[#6E6E6E]" />
        </div>

        <div className="space-y-4">
          {[
            "Lingkungan",
            "Desain",
            "Pendidikan",
          ].map((tag) => (
            <div
              key={tag}
              className="flex items-start gap-3 group cursor-pointer"
            >
              <Hash
                size={14}
                className="text-[#A8C3A0] mt-0.5"
              />

              <div>
                <h4 className="text-xs font-semibold text-[#1B1B1B] group-hover:text-[#1F4D3A]">
                  {tag}
                </h4>

                <p className="text-[10px] text-[#6E6E6E]">
                  Peluang aktif tersedia
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};