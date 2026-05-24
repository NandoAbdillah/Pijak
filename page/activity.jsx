"use client";

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
  Briefcase,
  HeartHandshake,
  PenLine,
  TrendingUp,
  Award,
  Loader2,
  BadgeCheck,
  Calendar,
  Clock,
  Check,
  XCircle,
  FileText,
  Building2,
  Globe,
  MonitorSmartphone,
  ArrowRightLeft,
  Circle,
  CheckCircle,
  FileBarChart,
  Edit3,
  MessageSquare,
  LayoutGrid,
  FileImage,
  PlusSquare,
  MessageCircle,
} from "lucide-react";

import { Badge, Button } from "@/components/ui/uis";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/anim";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const STATUS_ORDER = ["berlangsung", "menunggu", "selesai", "dibatalkan"];

const STATUS_META = {
  berlangsung: {
    label: "Sedang Berlangsung",
    countLabel: "Berlangsung",
    badgeClass: "bg-[#E7F0E9] text-[#1F4D3A]",
    cardBadgeClass: "bg-[#E7F0E9] text-[#1F4D3A]",
    timeColor: "text-red-500",
    emptyText: "Belum ada aktivitas yang sedang berjalan.",
    buttonText: "Lanjutkan",
    sectionBorder: "",
  },
  menunggu: {
    label: "Menunggu",
    countLabel: "Menunggu",
    badgeClass: "bg-[#FCF5E3] text-[#B77B57]",
    cardBadgeClass: "bg-[#FCF5E3] text-[#B77B57]",
    timeColor: "text-[#B77B57]",
    emptyText: "Belum ada aktivitas yang menunggu.",
    buttonText: "Tinjau",
    sectionBorder: "pt-6 border-t border-[#DDD6C8]/50",
  },
  selesai: {
    label: "Selesai",
    countLabel: "Selesai",
    badgeClass: "bg-[#E7F0E9] text-[#1F4D3A]",
    cardBadgeClass: "bg-[#E7F0E9] text-[#1F4D3A]",
    timeColor: "text-[#1F4D3A]",
    emptyText: "Belum ada aktivitas yang selesai.",
    buttonText: "Lihat Hasil",
    sectionBorder: "pt-6 border-t border-[#DDD6C8]/50",
  },
  dibatalkan: {
    label: "Dibatalkan",
    countLabel: "Dibatalkan",
    badgeClass: "bg-red-50 text-red-600",
    cardBadgeClass: "bg-red-50 text-red-600",
    timeColor: "text-red-600",
    emptyText: "Belum ada aktivitas yang dibatalkan.",
    buttonText: "Lihat Riwayat",
    sectionBorder: "pt-6 border-t border-[#DDD6C8]/50",
  },
};

const TYPE_META = {
  freelance: {
    label: "Freelance",
    badgeClass: "bg-[#E7F0E9] text-[#1F4D3A]",
  },
  volunteer: {
    label: "Volunteer",
    badgeClass: "bg-green-100 text-green-700",
  },
  kolaborasi: {
    label: "Kolaborasi",
    badgeClass: "bg-blue-100 text-blue-700",
  },
  exchange: {
    label: "Skill Exchange",
    badgeClass: "bg-purple-100 text-purple-700",
  },
};

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function sanitizeText(value) {
  return String(value ?? "")
    .replace(/\r/g, " ")
    .replace(/\n/g, " ")
    .replace(/\t/g, " ")
    .trim();
}

function normalizeString(value) {
  return sanitizeText(value).toLowerCase();
}

function normalizeType(type) {
  const t = normalizeString(type);
  if (t.includes("freelance")) return "freelance";
  if (t.includes("volunteer")) return "volunteer";
  if (t.includes("kolaborasi")) return "kolaborasi";
  if (t.includes("exchange") || t.includes("skill")) return "exchange";
  return "freelance";
}

function normalizeStatus(rawStatus, progress = 0, relatedTasks = []) {
  const status = normalizeString(rawStatus);

  if (
    status.includes("batal") ||
    status.includes("cancel") ||
    status.includes("cancelled")
  ) {
    return "dibatalkan";
  }

  if (
    status.includes("selesai") ||
    status.includes("done") ||
    status.includes("complete") ||
    status.includes("completed") ||
    status.includes("finished") ||
    status.includes("tuntas")
  ) {
    return "selesai";
  }

  if (
    status.includes("menunggu") ||
    status.includes("pending") ||
    status.includes("review") ||
    status.includes("konfirmasi") ||
    status.includes("belum") ||
    status.includes("draft") ||
    status.includes("waiting")
  ) {
    return "menunggu";
  }

  if (
    status.includes("jalan") ||
    status.includes("berjalan") ||
    status.includes("progress") ||
    status.includes("aktif") ||
    status.includes("ongoing") ||
    status.includes("in progress")
  ) {
    return "berlangsung";
  }

  const taskStatuses = relatedTasks.map((t) => normalizeString(t?.status));

  if (taskStatuses.some((s) => s.includes("batal") || s.includes("cancel"))) {
    return "dibatalkan";
  }

  if (
    taskStatuses.some(
      (s) =>
        s.includes("selesai") ||
        s.includes("done") ||
        s.includes("complete") ||
        s.includes("completed"),
    ) &&
    taskStatuses.every(
      (s) =>
        s.includes("selesai") ||
        s.includes("done") ||
        s.includes("complete") ||
        s.includes("completed"),
    )
  ) {
    return "selesai";
  }

  if (
    taskStatuses.some(
      (s) =>
        s.includes("menunggu") ||
        s.includes("pending") ||
        s.includes("review") ||
        s.includes("konfirmasi") ||
        s.includes("belum"),
    )
  ) {
    return "menunggu";
  }

  if (Number(progress) >= 100) return "selesai";
  if (Number(progress) > 0) return "berlangsung";

  return "menunggu";
}

function getTypeMeta(type) {
  const normalized = normalizeType(type);
  return TYPE_META[normalized] || TYPE_META.freelance;
}

function getCategoryLabel(category) {
  const c = normalizeString(category);
  if (!c) return "-";
  if (c.includes("desain")) return "Desain";
  if (c.includes("marketing")) return "Marketing";
  if (c.includes("penulisan")) return "Penulisan";
  if (c.includes("data")) return "Data";
  if (c.includes("video")) return "Konten Kreator";
  if (c.includes("lingkungan")) return "Lingkungan";
  return sanitizeText(category);
}

function getLocationLabel(location) {
  const l = normalizeString(location);
  if (!l) return "-";
  if (l.includes("online")) return "Online";
  if (l.includes("offline")) return "Offline";
  if (l.includes("hybrid")) return "Hybrid";
  return sanitizeText(location);
}

function getIconForItem(item) {
  const category = normalizeString(item?.category);
  const type = normalizeString(item?.type);
  const title = normalizeString(item?.title);

  if (category.includes("desain") || title.includes("desain")) return PenLine;
  if (category.includes("video") || category.includes("kreator")) return Clapperboard;
  if (
    category.includes("lingkungan") ||
    type.includes("volunteer") ||
    title.includes("pantai") ||
    title.includes("ajar") ||
    title.includes("edukasi")
  ) {
    return Trees;
  }
  if (category.includes("data")) return ClipboardList;
  if (category.includes("marketing")) return Briefcase;
  if (type.includes("skill")) return ArrowRightLeft;
  return Briefcase;
}

function formatDateLabel(value) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return sanitizeText(value);
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

function getDeadlineRemaining(deadline) {
  if (!deadline) return "Belum ada deadline";

  const d = new Date(deadline);
  if (Number.isNaN(d.getTime())) return sanitizeText(deadline);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(d);
  target.setHours(0, 0, 0, 0);

  const diffDays = Math.ceil((target - today) / 86400000);

  if (diffDays < 0) return `Lewat ${Math.abs(diffDays)} hari`;
  if (diffDays === 0) return "Hari ini";
  if (diffDays === 1) return "1 hari lagi";
  return `${diffDays} hari lagi`;
}

function getTimeColorByDeadline(deadline) {
  if (!deadline) return "text-[#B77B57]";

  const d = new Date(deadline);
  if (Number.isNaN(d.getTime())) return "text-[#B77B57]";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(d);
  target.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((target - today) / 86400000);

  if (diffDays <= 3) return "text-red-500";
  if (diffDays <= 7) return "text-[#B77B57]";
  return "text-[#1F4D3A]";
}

function getActionLabel(status, progress, activityKind) {
  if (activityKind === "proposal") {
    if (status === "menunggu") return "Lihat Proposal";
    if (status === "berlangsung") return "Lanjutkan";
    if (status === "selesai") return "Lihat Hasil";
    if (status === "dibatalkan") return "Lihat Riwayat";
  }

  switch (status) {
    case "berlangsung":
      return Number(progress) >= 60 ? "Lanjutkan" : "Lihat Detail";
    case "menunggu":
      return "Tinjau";
    case "selesai":
      return "Lihat Hasil";
    case "dibatalkan":
      return "Lihat Riwayat";
    default:
      return "Lihat Detail";
  }
}

function getHistoryAction(status, progress) {
  switch (status) {
    case "berlangsung":
      return `Progres ${Number(progress) || 0}%`;
    case "menunggu":
      return "Menunggu review";
    case "selesai":
      return "Aktivitas selesai";
    case "dibatalkan":
      return "Aktivitas dibatalkan";
    default:
      return "Aktivitas diperbarui";
  }
}

function getSideIcon(status) {
  switch (status) {
    case "berlangsung":
      return Coffee;
    case "menunggu":
      return ClipboardList;
    case "selesai":
      return FileCheck2;
    case "dibatalkan":
      return XCircle;
    default:
      return FileText;
  }
}

async function fetchJson(url) {
  const res = await fetch(url);
  const json = await res.json();
  if (!res.ok || !json?.ok) {
    return [];
  }
  return safeArray(json.data);
}

function deriveRelatedWorkroom(workrooms, opportunityId) {
  const oppId = String(opportunityId ?? "");
  return safeArray(workrooms).find(
    (w) =>
      String(w?.opportunity_id ?? "") === oppId ||
      String(w?.opportunityId ?? "") === oppId,
  );
}

function deriveTasksByWorkroom(tasks) {
  const map = new Map();

  safeArray(tasks).forEach((task) => {
    const key = String(
      task?.workroom_id ??
        task?.workroomId ??
        task?.workroom ??
        task?.workroom_id_fk ??
        "",
    );
    if (!key) return;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(task);
  });

  return map;
}

function buildUserActivities({
  currentUserId,
  proposals,
  opportunities,
  workrooms,
  tasks,
}) {
  const uid = String(currentUserId ?? "").trim();
  const isScoped = Boolean(uid);
  const isMine = (id) => !isScoped || String(id ?? "").trim() === uid;

  const oppMap = new Map();
  safeArray(opportunities).forEach((opp) => {
    const key = String(opp?.id ?? opp?.opportunity_id ?? "");
    if (key) oppMap.set(key, opp);
  });

  const tasksByWorkroom = deriveTasksByWorkroom(tasks);

  const items = [];

  const myProposals = safeArray(proposals).filter((p) => isMine(p?.applicant_id));
  myProposals.forEach((proposal) => {
    const opportunityId = String(proposal?.opportunity_id ?? "");
    const opportunity = oppMap.get(opportunityId) || {};
    const workroom = deriveRelatedWorkroom(workrooms, opportunityId);
    const relatedTasks = workroom
      ? tasksByWorkroom.get(String(workroom?.id ?? workroom?.workroom_id ?? "")) || []
      : [];

    const workroomStatus = normalizeString(workroom?.status);
    const proposalStatus = normalizeString(proposal?.status);

    const progressFromTasks =
      relatedTasks.length > 0
        ? Math.round(
            (relatedTasks.filter((t) =>
              normalizeString(t?.status).includes("selesai"),
            ).length /
              relatedTasks.length) *
              100,
          )
        : 0;

    const progress = Number(workroom?.progress_pct ?? progressFromTasks ?? 0);

    const status = normalizeStatus(
      workroomStatus || proposalStatus,
      progress,
      relatedTasks,
    );

    const categoryLabel = getCategoryLabel(
      opportunity?.category || workroom?.category,
    );
    const locationLabel = getLocationLabel(
      opportunity?.location || opportunity?.loc || workroom?.location,
    );
    const deadlineRaw = opportunity?.deadline || workroom?.deadline || "";
    const deadlineLabel = deadlineRaw ? formatDateLabel(deadlineRaw) : "-";
    const deadlineRemaining = getDeadlineRemaining(deadlineRaw);
    const timeColor =
      status === "berlangsung"
        ? getTimeColorByDeadline(deadlineRaw)
        : STATUS_META[status].timeColor;

    const icon = getIconForItem({
      category: opportunity?.category || workroom?.category,
      type: opportunity?.type || workroom?.type,
      title: opportunity?.title || workroom?.title,
    });

    const title = sanitizeText(
      opportunity?.title ||
        `Proposal untuk ${opportunityId || "peluang"}`,
    );

    const meta = workroom
      ? `${categoryLabel} • ${locationLabel} • Deadline ${deadlineLabel}`
      : `${categoryLabel} • ${locationLabel} • Diajukan ${formatDateLabel(
          proposal?.created_at,
        )}`;

    items.push({
      id: `proposal-${proposal?.id ?? opportunityId}`,
      opportunityId,
      sourceId: proposal?.id,
      sourceType: "proposal",
      activityKind: "proposal",
      title,
      type: sanitizeText(opportunity?.type || "Freelance"),
      typeBadgeClass: getTypeMeta(opportunity?.type || "Freelance").badgeClass,
      typeLabel: getTypeMeta(opportunity?.type || "Freelance").label,
      meta,
      deadline: deadlineRaw,
      deadlineLabel,
      deadlineRemaining,
      progress,
      status,
      timeColor,
      btnText: getActionLabel(status, progress, "proposal"),
      icon,
      totalTasks: relatedTasks.length,
      pendingTasks: relatedTasks.filter((t) => {
        const s = normalizeString(t?.status);
        return (
          s.includes("belum") ||
          s.includes("pending") ||
          s.includes("review") ||
          s.includes("menunggu") ||
          s.includes("konfirmasi")
        );
      }).length,
      sortDate:
        proposal?.created_at ||
        workroom?.created_at ||
        opportunity?.created_at ||
        "",
    });
  });

  const myCreatedOpportunities = safeArray(opportunities).filter((opp) =>
    isMine(opp?.creator_id),
  );

  myCreatedOpportunities.forEach((opp) => {
    const workroom = deriveRelatedWorkroom(workrooms, opp?.id);
    const relatedTasks = workroom
      ? tasksByWorkroom.get(String(workroom?.id ?? workroom?.workroom_id ?? "")) || []
      : [];

    const progressFromTasks =
      relatedTasks.length > 0
        ? Math.round(
            (relatedTasks.filter((t) =>
              normalizeString(t?.status).includes("selesai"),
            ).length /
              relatedTasks.length) *
              100,
          )
        : 0;

    const progress = Number(workroom?.progress_pct ?? progressFromTasks ?? 0);

    const status = normalizeStatus(
      workroom?.status || opp?.status,
      progress,
      relatedTasks,
    );

    const categoryLabel = getCategoryLabel(opp?.category);
    const locationLabel = getLocationLabel(opp?.location || opp?.loc);
    const deadlineRaw = opp?.deadline || workroom?.deadline || "";
    const deadlineLabel = deadlineRaw ? formatDateLabel(deadlineRaw) : "-";
    const deadlineRemaining = getDeadlineRemaining(deadlineRaw);
    const timeColor =
      status === "berlangsung"
        ? getTimeColorByDeadline(deadlineRaw)
        : STATUS_META[status].timeColor;

    const icon = getIconForItem({
      category: opp?.category,
      type: opp?.type,
      title: opp?.title,
    });

    const title = sanitizeText(opp?.title || "Peluang dibuat");

    const meta = workroom
      ? `${categoryLabel} • ${locationLabel} • Deadline ${deadlineLabel}`
      : `${categoryLabel} • ${locationLabel} • Dibuat ${formatDateLabel(
          opp?.created_at,
        )}`;

    items.push({
      id: `created-${opp?.id}`,
      opportunityId: opp?.id,
      sourceId: opp?.id,
      sourceType: "created",
      activityKind: "created",
      title,
      type: sanitizeText(opp?.type || "Freelance"),
      typeBadgeClass: getTypeMeta(opp?.type || "Freelance").badgeClass,
      typeLabel: getTypeMeta(opp?.type || "Freelance").label,
      meta,
      deadline: deadlineRaw,
      deadlineLabel,
      deadlineRemaining,
      progress,
      status,
      timeColor,
      btnText: getActionLabel(status, progress, "created"),
      icon,
      totalTasks: relatedTasks.length,
      pendingTasks: relatedTasks.filter((t) => {
        const s = normalizeString(t?.status);
        return (
          s.includes("belum") ||
          s.includes("pending") ||
          s.includes("review") ||
          s.includes("menunggu") ||
          s.includes("konfirmasi")
        );
      }).length,
      sortDate:
        opp?.created_at || workroom?.created_at || opp?.deadline || "",
    });
  });

  // Deduplicate by id and sort newest first
  const deduped = Array.from(
    new Map(items.map((item) => [item.id, item])).values(),
  );

  return deduped.sort((a, b) => {
    const da = new Date(a.sortDate || 0).getTime();
    const db = new Date(b.sortDate || 0).getTime();
    if (!Number.isNaN(db) && !Number.isNaN(da) && db !== da) return db - da;
    const weight = { berlangsung: 1, menunggu: 2, selesai: 3, dibatalkan: 4 };
    return (weight[a.status] ?? 99) - (weight[b.status] ?? 99);
  });
}

function groupActivities(activities) {
  const grouped = {
    berlangsung: [],
    menunggu: [],
    selesai: [],
    dibatalkan: [],
  };

  activities.forEach((item) => {
    if (grouped[item.status]) grouped[item.status].push(item);
    else grouped.menunggu.push(item);
  });

  return grouped;
}

function sortActivitiesForHistory(activities) {
  const weight = {
    berlangsung: 1,
    menunggu: 2,
    selesai: 3,
    dibatalkan: 4,
  };

  return [...activities].sort((a, b) => {
    const wa = weight[a.status] ?? 99;
    const wb = weight[b.status] ?? 99;
    if (wa !== wb) return wa - wb;
    return new Date(b.sortDate || 0).getTime() - new Date(a.sortDate || 0).getTime();
  });
}

function ActivityCard({ act, setCurrentPage, setSelectedOppId }) {
  const Icon = act.icon || Briefcase;
  const statusMeta = STATUS_META[act.status] || STATUS_META.menunggu;

  const handleClick = () => {
    if (setSelectedOppId && act.opportunityId) {
      setSelectedOppId(act.opportunityId);
    }

    if (setCurrentPage) {
      if (act.status === "berlangsung" || act.status === "selesai") {
        setCurrentPage("workroom");
      } else {
        setCurrentPage("detail");
      }
    }
  };

  return (
    <div
      className="bg-white rounded-3xl p-4 border border-[#DDD6C8] flex flex-col md:flex-row gap-5 items-start md:items-center hover:shadow-sm transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-[#F6F3EA] flex flex-shrink-0 items-center justify-center text-[#5F8B6D]">
        <Icon size={36} strokeWidth={1} />
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className={act.typeBadgeClass}>{act.typeLabel}</Badge>
          <Badge className={`${statusMeta.cardBadgeClass} font-bold`}>
            {statusMeta.label}
          </Badge>
        </div>

        <h3 className="font-sora font-semibold text-[#1B1B1B] text-[15px] leading-snug pr-4">
          {act.title}
        </h3>

        <p className="text-[10px] text-[#6E6E6E] font-medium">{act.meta}</p>

        {act.status === "berlangsung" ? (
          <div className="pt-2 flex items-center gap-3">
            <span className="text-[10px] text-[#6E6E6E] font-medium w-12">
              Progres
            </span>
            <div className="flex-1 bg-[#E7DCCB] h-1.5 rounded-full overflow-hidden max-w-[200px]">
              <div
                className="bg-[#1F4D3A] h-full rounded-full"
                style={{ width: `${act.progress}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-[#1B1B1B]">
              {act.progress}%
            </span>
          </div>
        ) : (
          <div className="pt-1 flex items-center gap-2 text-[10px] text-[#6E6E6E] font-medium">
            {act.totalTasks ? (
              <span>
                {act.totalTasks} tugas
                {act.pendingTasks ? ` • ${act.pendingTasks} menunggu` : ""}
              </span>
            ) : (
              <span>{act.deadlineLabel ? `Deadline ${act.deadlineLabel}` : ""}</span>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto h-full gap-4 md:gap-0 md:py-2">
        <div className="flex items-center gap-2 order-2 md:order-1">
          <button
            type="button"
            className="text-[#A8C3A0] hover:text-[#1F4D3A] transition-colors"
          >
            <Bookmark size={18} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className="text-[#6E6E6E] hover:text-[#1B1B1B] transition-colors"
          >
            <MoreVertical size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex flex-col md:items-end gap-2 order-1 md:order-2">
          <p className="text-[10px] text-[#6E6E6E]">
            {act.status === "berlangsung" ? (
              <>
                Sisa Waktu <br className="hidden md:block" />
                <span className={`font-bold ${act.timeColor}`}>
                  {act.deadlineRemaining}
                </span>
              </>
            ) : act.status === "menunggu" ? (
              <>
                Status <br className="hidden md:block" />
                <span className={`font-bold ${act.timeColor}`}>
                  Menunggu review
                </span>
              </>
            ) : act.status === "selesai" ? (
              <>
                Status <br className="hidden md:block" />
                <span className={`font-bold ${act.timeColor}`}>
                  Selesai
                </span>
              </>
            ) : (
              <>
                Status <br className="hidden md:block" />
                <span className={`font-bold ${act.timeColor}`}>
                  Dibatalkan
                </span>
              </>
            )}
          </p>

          <Button
            type="button"
            variant="outline"
            className={`w-fit py-1.5 px-4 text-xs ${
              act.status === "berlangsung" ? "bg-[#FCFBF8]" : ""
            }`}
            onClick={handleClick}
          >
            {act.btnText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export const AktivitasMain = ({
  setCurrentPage,
  setSelectedOppId,
  currentUserId,
  setActivitiesData,
  setActivityCounts,
}) => {
  const [activeTab, setActiveTab] = useState("semua");
  const [proposals, setProposals] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [workrooms, setWorkrooms] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [proposalResult, oppResult, wrResult, taskResult] =
        await Promise.allSettled([
          fetchJson("/api/proposals"),
          fetchJson("/api/opportunities"),
          fetchJson("/api/workrooms"),
          fetchJson("/api/tasks"),
        ]);

      setProposals(proposalResult.status === "fulfilled" ? proposalResult.value : []);
      setOpportunities(oppResult.status === "fulfilled" ? oppResult.value : []);
      setWorkrooms(wrResult.status === "fulfilled" ? wrResult.value : []);
      setTasks(taskResult.status === "fulfilled" ? taskResult.value : []);
    } catch (err) {
      console.error("Gagal mengambil data aktivitas:", err);
      setError("Gagal memuat data aktivitas.");
      setProposals([]);
      setOpportunities([]);
      setWorkrooms([]);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentUserId]);

  const activities = useMemo(
    () =>
      buildUserActivities({
        currentUserId,
        proposals,
        opportunities,
        workrooms,
        tasks,
      }),
    [currentUserId, proposals, opportunities, workrooms, tasks],
  );

  const grouped = useMemo(() => groupActivities(activities), [activities]);

  const counts = useMemo(
    () => ({
      berlangsung: grouped.berlangsung.length,
      menunggu: grouped.menunggu.length,
      selesai: grouped.selesai.length,
      dibatalkan: grouped.dibatalkan.length,
      semua: activities.length,
    }),
    [grouped, activities.length],
  );

  useEffect(() => {
    if (setActivitiesData) setActivitiesData(activities);
    if (setActivityCounts) setActivityCounts(counts);
  }, [activities, counts, setActivitiesData, setActivityCounts]);

  const visibleSections =
    activeTab === "semua" ? STATUS_ORDER : [activeTab].filter(Boolean);

  const completionPct =
    counts.semua === 0 ? 0 : Math.round((counts.selesai / counts.semua) * 100);

  return (
    <div className="max-w-[850px] mx-auto pb-10">
      <FadeUp className="mt-6 mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-sora font-bold text-4xl text-[#1B1B1B] flex items-center gap-3">
            Aktivitas <Leaf className="text-[#5F8B6D] w-8 h-8" />
          </h1>
          <p className="text-sm text-[#6E6E6E] mt-3">
            Kelola semua pekerjaan, kontribusi, dan peluangmu di sini.
          </p>
        </div>

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

      <FadeUp
        delay={0.1}
        className="border-b border-[#DDD6C8] flex gap-6 mb-8 overflow-x-auto hide-scrollbar"
      >
        {[
          { id: "semua", label: "Semua", count: counts.semua },
          { id: "berlangsung", label: "Berlangsung", count: counts.berlangsung },
          { id: "menunggu", label: "Menunggu", count: counts.menunggu },
          { id: "selesai", label: "Selesai", count: counts.selesai },
          { id: "dibatalkan", label: "Dibatalkan", count: counts.dibatalkan },
        ].map((tab) => (
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
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] ${
                activeTab === tab.id
                  ? "bg-[#E7F0E9] text-[#1F4D3A]"
                  : "bg-[#F6F3EA] text-[#6E6E6E]"
              }`}
            >
              {tab.count}
            </span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="aktivitas-tab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1F4D3A]"
              />
            )}
          </button>
        ))}
      </FadeUp>

      {error ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="flex items-center gap-3 text-[#1F4D3A]">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm font-medium">Memuat aktivitas...</span>
          </div>
        </div>
      ) : (
        <>
          {visibleSections.map((statusKey) => {
            const items = grouped[statusKey] || [];
            const statusMeta = STATUS_META[statusKey];

            return (
              <section key={statusKey} className="mb-10">
                <StaggerContainer className="space-y-4">
                  <div
                    className={`flex items-center gap-2 mb-4 ${statusMeta.sectionBorder || ""}`}
                  >
                    <h2 className="font-sora font-bold text-lg text-[#1B1B1B]">
                      {statusMeta.label}
                    </h2>
                    <span className="text-[#6E6E6E] font-medium text-sm">
                      ({items.length})
                    </span>
                  </div>

                  {items.length === 0 ? (
                    <div className="bg-white rounded-3xl p-6 border border-dashed border-[#DDD6C8] text-center text-sm text-[#6E6E6E]">
                      {statusMeta.emptyText}
                    </div>
                  ) : (
                    items.map((act) => (
                      <StaggerItem key={act.id}>
                        <ActivityCard
                          act={act}
                          setCurrentPage={setCurrentPage}
                          setSelectedOppId={setSelectedOppId}
                        />
                      </StaggerItem>
                    ))
                  )}
                </StaggerContainer>
              </section>
            );
          })}

          <FadeUp
            delay={0.4}
            className="mt-8 bg-[#E7F0E9] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between border border-[#A8C3A0]/30 gap-6 relative overflow-hidden"
          >
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
              onClick={() => setCurrentPage && setCurrentPage("jelajah")}
            >
              Lihat Aktivitas Saya <ArrowRight size={14} className="ml-1.5" />
            </Button>
          </FadeUp>
        </>
      )}
    </div>
  );
};

export const AktivitasRightSidebar = ({
  activities = [],
  counts = {
    berlangsung: 0,
    menunggu: 0,
    selesai: 0,
    dibatalkan: 0,
    semua: 0,
  },
}) => {
  const total = counts.semua || 0;
  const completionPct =
    total === 0 ? 0 : Math.round(((counts.selesai || 0) / total) * 100);

  const recentPreview = useMemo(
    () => sortActivitiesForHistory(activities).slice(0, 3),
    [activities],
  );

  const today = new Date();
  const monthLabel = new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(today);

  return (
    <aside className="w-[340px] h-screen sticky top-0 bg-[#FCFBF8] border-l border-[#DDD6C8] flex flex-col py-8 px-6 z-20 flex-shrink-0 overflow-y-auto hide-scrollbar">
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
            <span className="font-sora font-bold text-lg text-[#1B1B1B]">
              {counts.berlangsung || 0}
            </span>
            <span className="text-[9px] text-[#6E6E6E] font-medium mt-0.5">
              Berlangsung
            </span>
          </div>
          <div className="bg-[#FCF5E3] rounded-2xl p-3 flex flex-col items-center justify-center text-center border border-transparent hover:border-[#F5B041]/30 transition-colors cursor-pointer">
            <span className="font-sora font-bold text-lg text-[#1B1B1B]">
              {counts.menunggu || 0}
            </span>
            <span className="text-[9px] text-[#6E6E6E] font-medium mt-0.5">
              Menunggu
            </span>
          </div>
          <div className="bg-[#E7F0E9] rounded-2xl p-3 flex flex-col items-center justify-center text-center border border-transparent hover:border-[#5F8B6D]/30 transition-colors cursor-pointer">
            <span className="font-sora font-bold text-lg text-[#1B1B1B]">
              {counts.selesai || 0}
            </span>
            <span className="text-[9px] text-[#6E6E6E] font-medium mt-0.5">
              Selesai
            </span>
          </div>
          <div className="bg-red-50 rounded-2xl p-3 flex flex-col items-center justify-center text-center border border-transparent hover:border-red-200 transition-colors cursor-pointer">
            <span className="font-sora font-bold text-lg text-red-600">
              {counts.dibatalkan || 0}
            </span>
            <span className="text-[9px] text-red-600 font-medium mt-0.5">
              Dibatalkan
            </span>
          </div>
        </div>
      </div>

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
              {monthLabel}
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
              {counts.selesai || 0} dari {total || 0} aktivitas minggu ini selesai.
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-[#F6F3EA] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#5F8B6D] h-full rounded-full"
                  style={{ width: `${completionPct}%` }}
                ></div>
              </div>
              <span className="text-[9px] font-bold text-[#1B1B1B]">
                {completionPct}%
              </span>
            </div>
          </div>
        </div>
      </div>

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
          {recentPreview.length === 0 ? (
            <div className="text-xs text-[#6E6E6E] bg-white border border-dashed border-[#DDD6C8] rounded-xl p-4 text-center">
              Belum ada riwayat terbaru.
            </div>
          ) : (
            recentPreview.map((item, i) => {
              const Icon = getSideIcon(item.status);
              const bg =
                item.status === "berlangsung"
                  ? "bg-[#F6F3EA]"
                  : item.status === "menunggu"
                    ? "bg-[#FCF5E3]"
                    : item.status === "selesai"
                      ? "bg-[#E7F0E9]"
                      : "bg-red-50";

              const textC =
                item.status === "berlangsung"
                  ? "text-[#1B1B1B]"
                  : item.status === "menunggu"
                    ? "text-[#B77B57]"
                    : item.status === "selesai"
                      ? "text-[#1F4D3A]"
                      : "text-red-600";

              return (
                <div key={`${item.id}-${i}`} className="flex gap-3 group cursor-pointer">
                  <div
                    className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center flex-shrink-0 ${textC}`}
                  >
                    <Icon size={14} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 pb-3 border-b border-[#F6F3EA] group-last:border-0">
                    <h4 className="text-[11px] font-semibold text-[#1B1B1B] leading-snug group-hover:text-[#1F4D3A] line-clamp-1">
                      {item.title}
                    </h4>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[9px] text-[#6E6E6E]">
                        {getHistoryAction(item.status, item.progress)}
                      </span>
                      <span className="text-[8px] font-medium text-[#A8C3A0]">
                        {item.status === "berlangsung"
                          ? item.deadlineRemaining
                          : item.status === "menunggu"
                            ? "Baru"
                            : item.status === "selesai"
                              ? "Tuntas"
                              : "Dibatalkan"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

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
};

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