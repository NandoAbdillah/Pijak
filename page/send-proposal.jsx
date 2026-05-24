import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Leaf, Check, Calendar, Trees, Palette, FileText, ArrowLeft,
  ArrowRightLeft, Bookmark, Sparkles, HeartHandshake, Wallet, Upload,
  LinkIcon, FileIcon, CheckSquare, BadgeCheck, PenLine, X, Loader2,
  Briefcase, Users,
} from "lucide-react";
import { Button, Input, Label, Select, Textarea , Badge} from "@/components/ui/uis";
import { FadeUp } from "@/components/motion/anim";


/**
 * @param {{
 * setCurrentPage: (page: string) => void,
 * opportunityData: any,
 * setOpportunityData: (updater: any) => void,
 * currentUserId?: string,
 * }} props
 */
export const KirimProposalMain = (props) => {
  const { setCurrentPage, opportunityData, setOpportunityData, currentUserId = "" } = props;

  const isFreelance = opportunityData?.type === "Freelance";
  const oppId = opportunityData?.id || opportunityData?.opportunity_id || "default";
  const applicantId = currentUserId || opportunityData?.applicant_id || localStorage.getItem("user_id") || "U99";

  const defaultRole = isFreelance ? "desainer" : "relawan";

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [roleName, setRoleName] = useState(defaultRole);
  const [intro, setIntro] = useState("");
  const [whyFit, setWhyFit] = useState("");
  const [approach, setApproach] = useState("");
  const [availability, setAvailability] = useState("10-15");
  const [expectedBudget, setExpectedBudget] = useState("Rp500.000 - Rp750.000");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [portfolioFileName, setPortfolioFileName] = useState("Portfolio_RakaMahendra.pdf");
  const [portfolioFileSize, setPortfolioFileSize] = useState("2.6 MB");
  const [additionalMessage, setAdditionalMessage] = useState("");

  const toggleOppType = () => {
    setOpportunityData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        type: prev.type === "Freelance" ? "Volunteer" : "Freelance",
        badgeColor: prev.type === "Freelance" ? "bg-green-100 text-green-700" : "bg-[#E7F0E9] text-[#1F4D3A]",
        reward: prev.type === "Freelance" ? "Sertifikat + Pengalaman" : "Rp500.000 - Rp750.000",
      };
    });
  };

  useEffect(() => {
    const title = opportunityData?.title || "peluang ini";
    const organizer = opportunityData?.organizer || "tim";
    const location = opportunityData?.loc || opportunityData?.location || "-";

    setIntro(`Halo tim ${organizer}! Saya ingin mengajukan proposal untuk ${title}. Saya tertarik karena peluang ini relevan dengan minat dan kemampuan saya.`);
    setWhyFit(isFreelance ? `Saya memiliki skill yang sesuai untuk kebutuhan proyek ini dan siap bekerja dengan deadline yang jelas di ${location}.` : `Saya tertarik untuk berkontribusi dan belajar sambil memberi dampak positif di ${location}.`);
    setApproach(isFreelance ? "Saya akan memulai dengan memahami kebutuhan brand, target audiens, lalu menyusun eksekusi yang rapi, konsisten, dan tepat sasaran." : "Saya akan menyesuaikan kontribusi saya dengan kebutuhan program, menjaga komunikasi aktif, dan berkomitmen selama kegiatan berlangsung.");
    setExpectedBudget(isFreelance ? "Rp500.000 - Rp750.000" : "Sertifikat + Pengalaman");
  }, [opportunityData, isFreelance]);

  useEffect(() => {
    if (!oppId) return;
    const draftKey = `proposal-draft-${oppId}`;
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setCurrentStep(parsed.currentStep || 1);
        setRoleName(parsed.roleName ?? defaultRole);
        setIntro(parsed.intro ?? "");
        setWhyFit(parsed.whyFit ?? "");
        setApproach(parsed.approach ?? "");
        setAvailability(parsed.availability ?? "10-15");
        setExpectedBudget(parsed.expectedBudget ?? expectedBudget);
        setPortfolioUrl(parsed.portfolioUrl ?? "");
        setPortfolioFileName(parsed.portfolioFileName ?? portfolioFileName);
        setPortfolioFileSize(parsed.portfolioFileSize ?? portfolioFileSize);
        setAdditionalMessage(parsed.additionalMessage ?? "");
      }
    } catch (err) {
      console.error("Gagal load draft:", err);
    }
  }, [oppId]);

  // SETIAP ADA PERUBAHAN -> SIMPAN DRAFT DAN BERITAHU SIDEBAR VIA CUSTOM EVENT
  useEffect(() => {
    if (!oppId) return;
    const draftKey = `proposal-draft-${oppId}`;
    const payload = {
      currentStep, roleName, intro, whyFit, approach, availability, expectedBudget,
      portfolioUrl, portfolioFileName, portfolioFileSize, additionalMessage,
    };
    localStorage.setItem(draftKey, JSON.stringify(payload));
    
    // CUSTOM EVENT: Broadcast ke komponen Sidebar Kanan
    window.dispatchEvent(new Event('proposalDraftUpdated'));
  }, [oppId, currentStep, roleName, intro, whyFit, approach, availability, expectedBudget, portfolioUrl, portfolioFileName, portfolioFileSize, additionalMessage]);

  const wordCount = useMemo(() => {
    return intro.trim().split(/\s+/).filter(Boolean).length +
      whyFit.trim().split(/\s+/).filter(Boolean).length +
      approach.trim().split(/\s+/).filter(Boolean).length +
      additionalMessage.trim().split(/\s+/).filter(Boolean).length;
  }, [intro, whyFit, approach, additionalMessage]);

  const toggleSelectValue = (e, setter) => setter(e.target.value);
  const nextStep = () => { setSubmitError(""); setCurrentStep((prev) => Math.min(prev + 1, 4)); };
  const prevStep = () => { setSubmitError(""); setCurrentStep((prev) => Math.max(prev - 1, 1)); };

  const handleSaveDraft = () => {
    alert("Draft berhasil disimpan!");
  };

  const sanitizeText = (text) => String(text || "").replace(/\r/g, " ").replace(/\n/g, " ").replace(/\t/g, " ").replace(/"/g, '\\"').trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!oppId || oppId === "default") {
      setSubmitError("ID Peluang belum terhubung, tapi kami anggap ini simulasi sukses.");
    }

    setIsSubmitting(true);
    try {
      const safeCoverLetter = [
        `Peran: ${sanitizeText(roleName)}`,
        `Perkenalan: ${sanitizeText(intro)}`,
        `Kenapa cocok: ${sanitizeText(whyFit)}`,
        `Pendekatan: ${sanitizeText(approach)}`,
        additionalMessage ? `Pesan tambahan: ${sanitizeText(additionalMessage)}` : "",
      ].filter(Boolean).join(" | ");

      const payload = {
        opportunity_id: String(oppId),
        applicant_id: String(applicantId),
        cover_letter: safeCoverLetter,
        portfolio_url: sanitizeText(portfolioUrl) || "Link tidak dilampirkan",
      };

      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok || !json?.ok) throw new Error(json?.error || "Gagal mengirim proposal");

      setSubmitSuccess(true);
      localStorage.removeItem(`proposal-draft-${oppId}`);
      window.dispatchEvent(new Event('proposalDraftUpdated'));

      if (setCurrentPage) {
        alert("✅ Proposal Berhasil Dikirim ke C++!");
        setCurrentPage("beranda");
      }
    } catch (err) {
      console.error("Submit proposal error:", err);
      setSubmitError(err.message || "Terjadi kesalahan saat kirim ke backend.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[850px] mx-auto pb-10">
      <FadeUp className="mt-4 mb-8 flex items-center justify-between">
        <button onClick={() => setCurrentPage("detail")} className="flex items-center gap-2 text-xs font-semibold text-[#6E6E6E] hover:text-[#1F4D3A] transition-colors">
          <ArrowLeft size={16} /> Kembali ke detail peluang
        </button>
        <div className="flex items-center gap-4 text-[#6E6E6E]">
          <button onClick={toggleOppType} className="flex items-center gap-1.5 bg-[#E7DCCB] text-[#1B1B1B] px-3 py-1.5 rounded-full text-[10px] font-bold hover:bg-[#DDD6C8] transition-colors">
            <ArrowRightLeft size={12} /> Ubah ke {isFreelance ? "Volunteer" : "Freelance"}
          </button>
          <button onClick={handleSaveDraft} className="flex items-center gap-2 text-[11px] font-semibold hover:text-[#1B1B1B] border border-[#DDD6C8] px-3 py-1.5 rounded-full bg-white transition-colors">
            <Bookmark size={14} /> Simpan Draft
          </button>
        </div>
      </FadeUp>

      <FadeUp delay={0.1} className="w-full max-w-3xl mx-auto mb-10 flex items-center justify-between relative px-4">
        <div className="absolute left-[10%] right-[10%] top-4 h-0.5 bg-[#DDD6C8] -z-10"></div>
        {[
          { num: 1, label: "Informasi Proposal", active: currentStep === 1 },
          { num: 2, label: "Portofolio & Dokumen", active: currentStep === 2 },
          { num: 3, label: "Tinjau Proposal", active: currentStep === 3 },
          { num: 4, label: "Kirim Proposal", active: currentStep === 4 },
        ].map((step, i) => (
          <div key={i} className="flex flex-col items-center gap-2 bg-[#F6F3EA] px-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${step.active ? "bg-[#1F4D3A] text-white border-[#1F4D3A]" : "bg-white text-[#A8C3A0] border-[#DDD6C8]"}`}>
              {step.num}
            </div>
            <span className={`text-[10px] font-semibold ${step.active ? "text-[#1B1B1B]" : "text-[#A8C3A0]"}`}>
              {step.label}
            </span>
          </div>
        ))}
      </FadeUp>

      <FadeUp delay={0.2} className="flex flex-col-reverse md:flex-row gap-8 mb-8">
        <div className="flex-1">
          <h1 className="font-sora font-bold text-3xl text-[#1B1B1B] flex items-center gap-3 mb-2">
            Kirim Proposal <Leaf className="text-[#5F8B6D] w-6 h-6" />
          </h1>
          <p className="text-xs text-[#6E6E6E] max-w-md">
            Tunjukkan minatmu dan ceritakan bagaimana kamu bisa berkontribusi di peluang ini.
          </p>
        </div>
        <div className="w-40 h-28 bg-[#F6F3EA] flex items-end justify-center relative flex-shrink-0 -mb-4">
          <div className="w-24 h-24 bg-[#5F8B6D] rounded-t-full relative z-10 flex items-end justify-center px-4">
            <div className="w-16 h-10 bg-[#E7F0E9] rounded-t-md border-2 border-[#1F4D3A]"></div>
          </div>
          <Sparkles className="absolute right-4 top-2 text-[#F5B041]" size={16} />
        </div>
      </FadeUp>

      <FadeUp delay={0.3} className="bg-white border border-[#DDD6C8] rounded-3xl p-5 mb-8 flex flex-col md:flex-row gap-4 justify-between items-start shadow-sm">
        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 rounded-full bg-[#E7F0E9] text-[#1F4D3A] flex items-center justify-center font-bold text-[9px] text-center leading-tight flex-shrink-0 mt-1">
            Mitra<br />Pijak
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-[#6E6E6E] mb-1 uppercase tracking-wider">PELUANG YANG DILAMAR</h4>
            <h3 className="font-sora font-bold text-[#1B1B1B] text-[15px] mb-1">{opportunityData?.title || "-"}</h3>
            <div className="flex items-center gap-2 text-[11px] text-[#6E6E6E] mb-2">
              <span className="font-medium text-[#1B1B1B]">{opportunityData?.organizer || "-"}</span>
              <div className="w-1 h-1 bg-[#DDD6C8] rounded-full"></div>
              <span>{opportunityData?.loc || opportunityData?.location || "-"}</span>
            </div>
            <Badge className={opportunityData?.badgeColor || (isFreelance ? "bg-[#E7F0E9] text-[#1F4D3A]" : "bg-green-100 text-green-700")}>
              {opportunityData?.type || "-"}
            </Badge>
          </div>
        </div>
        <button className="text-[#A8C3A0] hover:text-[#1F4D3A]"><Bookmark size={20} /></button>
      </FadeUp>

      <FadeUp delay={0.4} className="space-y-8 bg-transparent">
        <h2 className="font-sora font-bold text-lg text-[#1B1B1B]">Informasi Proposal</h2>
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); if (currentStep < 4) { nextStep(); return; } handleSubmit(e); }}>
          <div>
            <Label required>{isFreelance ? "Peran yang Dilamar" : "Posisi Relawan"}</Label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6E6E]">
                {isFreelance ? <Palette size={16} /> : <HeartHandshake size={16} />}
              </div>
              <Select className="pl-11" value={roleName} onChange={(e) => toggleSelectValue(e, setRoleName)}>
                <option value={isFreelance ? "desainer" : "relawan"}>{isFreelance ? "Desainer Grafis" : "Relawan Umum"}</option>
                <option value="lainnya">Lainnya</option>
              </Select>
            </div>
          </div>

          <div>
            <Label required>Perkenalkan dirimu</Label>
            <div className="relative">
              <Textarea rows="4" value={intro} onChange={(e) => setIntro(e.target.value)} className="text-[#1B1B1B] leading-relaxed" />
              <span className="absolute right-3 bottom-3 text-[10px] font-medium text-[#A8C3A0]">{intro.length} / 500</span>
            </div>
          </div>

          <div>
            <Label required>Mengapa kamu cocok untuk proyek ini?</Label>
            <div className="relative">
              <Textarea rows="3" value={whyFit} onChange={(e) => setWhyFit(e.target.value)} className="text-[#1B1B1B] leading-relaxed" />
              <span className="absolute right-3 bottom-3 text-[10px] font-medium text-[#A8C3A0]">{whyFit.length} / 300</span>
            </div>
          </div>

          <div>
            <Label required>{isFreelance ? "Pendekatanmu untuk proyek ini" : "Harapanmu setelah mengikuti program ini"}</Label>
            <div className="relative">
              <Textarea rows="3" value={approach} onChange={(e) => setApproach(e.target.value)} className="text-[#1B1B1B] leading-relaxed" />
              <span className="absolute right-3 bottom-3 text-[10px] font-medium text-[#A8C3A0]">{approach.length} / 300</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label required>Ketersediaan Waktu</Label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6E6E]"><Calendar size={16} /></div>
                <Select className="pl-11" value={availability} onChange={(e) => toggleSelectValue(e, setAvailability)}>
                  <option value="10-15">10-15 jam per minggu</option>
                  <option value="5-10">5-10 jam per minggu</option>
                  <option value="15-20">15-20 jam per minggu</option>
                </Select>
              </div>
              <p className="text-[10px] text-[#6E6E6E] mt-2">Pilih estimasi waktu yang bisa kamu commit.</p>
            </div>

            {isFreelance && (
              <div>
                <Label required={false}>Ekspektasi Budget (Opsional)</Label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6E6E]"><Wallet size={16} /></div>
                  <Input value={expectedBudget} onChange={(e) => setExpectedBudget(e.target.value)} className="pl-11 font-medium text-[#1B1B1B]" />
                </div>
                <p className="text-[10px] text-[#6E6E6E] mt-2">Berikan range budget yang kamu harapkan (opsional).</p>
              </div>
            )}
          </div>

          <div className="bg-[#FCFBF8] border border-[#DDD6C8] rounded-3xl p-6 space-y-5">
            <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">Portofolio & Dokumen</h3>
            <p className="text-[10px] text-[#6E6E6E]">Tunjukkan karya terbaikmu yang relevan dengan proyek ini.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="border-2 border-dashed border-[#A8C3A0] rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-2 bg-[#E7F0E9]/30 hover:bg-[#E7F0E9] transition-colors cursor-pointer group">
                <Upload size={24} className="text-[#5F8B6D] group-hover:-translate-y-1 transition-transform" />
                <span className="text-[11px] font-bold text-[#1F4D3A]">Upload Portofolio</span>
                <span className="text-[9px] text-[#6E6E6E]">PDF, PPT, atau ZIP maks. 20MB</span>
                <Badge className="bg-white border border-[#DDD6C8] text-[#1B1B1B] mt-2 shadow-sm">Pilih File</Badge>
              </div>

              <div className="flex flex-col justify-center gap-3">
                <span className="text-[11px] font-semibold text-[#1B1B1B]">Atau tambahkan link portofolio</span>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6E6E]"><LinkIcon size={14} /></div>
                  <Input value={portfolioUrl} onChange={(e) => setPortfolioUrl(e.target.value)} placeholder="https://..." className="pl-10 text-xs font-medium" />
                  {portfolioUrl ? <Check size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5F8B6D]" /> : null}
                </div>
                <span className="text-[9px] text-[#6E6E6E]">Contoh: Behance, Dribbble, Google Drive, atau website pribadi.</span>
              </div>
            </div>

            {portfolioFileName && (
              <div className="bg-white border border-[#DDD6C8] rounded-xl p-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="bg-red-50 p-2 rounded-lg text-red-500"><FileIcon size={16} /></div>
                  <div>
                    <h4 className="text-[11px] font-semibold text-[#1B1B1B]">{portfolioFileName}</h4>
                    <p className="text-[9px] text-[#6E6E6E]">{portfolioFileSize}</p>
                  </div>
                </div>
                <button type="button" className="text-[#6E6E6E] hover:text-red-500 transition-colors" onClick={() => { setPortfolioFileName(""); setPortfolioFileSize(""); }}>
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <div>
            <Label required={false}>Pesan Tambahan (Opsional)</Label>
            <div className="relative">
              <Textarea rows="2" placeholder="Tulis pesan tambahan untuk pemberi peluang." value={additionalMessage} onChange={(e) => setAdditionalMessage(e.target.value)} />
              <span className="absolute right-3 bottom-3 text-[10px] font-medium text-[#A8C3A0]">{additionalMessage.length} / 250</span>
            </div>
          </div>

          {submitError ? <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">{submitError}</div> : null}
          {submitSuccess ? <div className="rounded-xl border border-[#A8C3A0] bg-[#E7F0E9] px-4 py-3 text-xs text-[#1F4D3A]">Proposal berhasil dikirim.</div> : null}

          <div className="pt-4 flex flex-col items-center gap-3">
            {currentStep < 4 ? (
              <Button type="button" onClick={nextStep} className="w-full py-4 text-sm shadow-md hover:shadow-lg">
                Lanjutkan ke Tinjau Proposal <ArrowRight size={16} className="ml-2" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting} className="w-full py-4 text-sm shadow-md hover:shadow-lg">
                {isSubmitting ? <><Loader2 size={16} className="mr-2 animate-spin" /> Mengirim Proposal...</> : <>Kirim Proposal <ArrowRight size={16} className="ml-2" /></>}
              </Button>
            )}

            {currentStep > 1 ? (
              <button type="button" onClick={prevStep} className="text-[11px] font-semibold text-[#6E6E6E] hover:text-[#1F4D3A]">
                Kembali ke langkah sebelumnya
              </button>
            ) : null}

            <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#6E6E6E]"><CheckSquare size={12} className="text-[#A8C3A0]" /> Draft otomatis tersimpan</div>
            <div className="text-[10px] text-[#6E6E6E]">Total kata saat ini: {wordCount}</div>
          </div>
        </form>
      </FadeUp>
    </div>
  );
};


// ============================================================================
// RIGHT SIDEBAR COMPONENT (BISA BACA PROGRESS DARI CUSTOM EVENT/LOCALSTORAGE)
// ============================================================================
export const KirimProposalRightSidebar = ({ opportunityData = {}, setCurrentPage }) => {
  const isFreelance = String(opportunityData?.type || "").toLowerCase() === "freelance";
  const oppId = opportunityData?.id || opportunityData?.opportunity_id || "default";

  // State draft agar tersinkronisasi
  const [draftData, setDraftData] = useState({});

  useEffect(() => {
    const loadDraft = () => {
      try {
        const saved = localStorage.getItem(`proposal-draft-${oppId}`);
        if (saved) setDraftData(JSON.parse(saved));
      } catch (e) {}
    };

    // Load pertama kali
    loadDraft();

    // DENGARKAN TERIAKAN DARI KOMPONEN MAIN!
    window.addEventListener('proposalDraftUpdated', loadDraft);
    return () => window.removeEventListener('proposalDraftUpdated', loadDraft);
  }, [oppId]);

  const formattedReward = useMemo(() => {
    const value = String(opportunityData?.reward || "").trim().toLowerCase();
    if (value === "" || value === "0" || value === "rp0") return "Tanpa Bayaran";
    return opportunityData?.reward;
  }, [opportunityData]);

  const formattedDeadline = useMemo(() => {
    return opportunityData?.deadline || "Tidak ditentukan";
  }, [opportunityData]);

  // Kalkulasi Score Realtime berdasarkan draftData yang ketarik dari localStorage
  const completionScore = useMemo(() => {
    let score = 0;
    if (draftData?.intro?.trim()) score += 25;
    if (draftData?.whyFit?.trim()) score += 25;
    if (draftData?.approach?.trim()) score += 25;
    if (draftData?.portfolioUrl?.trim() || draftData?.portfolioFileName?.trim()) score += 25;
    return score;
  }, [draftData]);

  const proposalStatus = useMemo(() => {
    if (completionScore >= 100) return { label: "Proposal Siap Dikirim", color: "text-[#1F4D3A]", bg: "bg-[#E7F0E9]" };
    if (completionScore >= 50) return { label: "Proposal Hampir Lengkap", color: "text-[#9A6700]", bg: "bg-yellow-50" };
    return { label: "Proposal Belum Lengkap", color: "text-[#B42318]", bg: "bg-red-50" };
  }, [completionScore]);

  const OpportunityIcon = useMemo(() => {
    const category = String(opportunityData?.category || "").toLowerCase();
    if (category.includes("desain")) return Sparkles;
    if (category.includes("lingkungan")) return Trees;
    if (isFreelance) return Briefcase;
    return HeartHandshake;
  }, [opportunityData, isFreelance]);

  return (
    <aside className="w-[360px] min-w-[360px] h-screen sticky top-0 bg-[#FCFBF8] border-l border-[#DDD6C8] flex flex-col py-8 px-6 z-20 flex-shrink-0 overflow-y-auto hide-scrollbar">
      {/* HEADER STATUS */}
      <FadeUp className="mb-6">
        <div className={`rounded-2xl border border-[#DDD6C8] px-4 py-4 ${proposalStatus.bg}`}>
          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">Status Proposal</h3>
              <p className={`text-[11px] font-semibold mt-1 ${proposalStatus.color}`}>{proposalStatus.label}</p>
            </div>
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="absolute inset-0 rotate-[-90deg]" viewBox="0 0 36 36">
                <path d="M18 2.5 a 15.5 15.5 0 0 1 0 31 a 15.5 15.5 0 0 1 0 -31" fill="none" stroke="#E7F0E9" strokeWidth="3" />
                <path d="M18 2.5 a 15.5 15.5 0 0 1 0 31 a 15.5 15.5 0 0 1 0 -31" fill="none" stroke="#1F4D3A" strokeWidth="3" strokeDasharray={`${completionScore}, 100`} />
              </svg>
              <span className="text-[11px] font-bold text-[#1B1B1B]">{completionScore}%</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#6E6E6E]">
            <CheckSquare size={12} className="text-[#1F4D3A]" />
            Lengkapi semua bagian agar peluang diterima lebih tinggi
          </div>
        </div>
      </FadeUp>

      {/* RINGKASAN PELUANG */}
      <FadeUp delay={0.1} className="mb-6">
        <h3 className="font-sora font-bold text-sm text-[#1B1B1B] mb-4">Ringkasan Peluang</h3>
        <div className="bg-white border border-[#DDD6C8] rounded-3xl p-5 shadow-sm">
          <div className="flex gap-3 items-start mb-5 pb-5 border-b border-[#F6F3EA]">
            <div className="w-12 h-12 rounded-2xl bg-[#E7F0E9] text-[#1F4D3A] flex items-center justify-center flex-shrink-0">
              <OpportunityIcon size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-sora font-bold text-[#1B1B1B] text-sm leading-snug mb-1">{opportunityData?.title || "Peluang Baru"}</h4>
              <div className="flex items-center gap-1.5 text-[11px] text-[#6E6E6E] mb-2">
                <span className="font-medium text-[#1B1B1B]">{opportunityData?.organizer || "Mitra Pijak"}</span>
                <BadgeCheck size={12} className="text-[#5F8B6D] fill-[#E7F0E9]" />
              </div>
              <Badge className={isFreelance ? "bg-[#E7F0E9] text-[#1F4D3A]" : "bg-green-100 text-green-700"}>{opportunityData?.type || "Freelance"}</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2 text-[#6E6E6E]"><Calendar size={13} /> Deadline</div>
              <span className="font-semibold text-[#1B1B1B]">{formattedDeadline}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2 text-[#6E6E6E]"><Users size={13} /> Pelamar</div>
              <span className="font-semibold text-[#1B1B1B]">{opportunityData?.applicant_count || 12} orang</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2 text-[#6E6E6E]"><Wallet size={13} /> {isFreelance ? "Budget" : "Reward"}</div>
              <span className="font-bold text-[#1F4D3A]">{formattedReward || "Sertifikat"}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2 text-[#6E6E6E]"><Trees size={13} /> Lokasi</div>
              <span className="font-semibold text-[#1B1B1B]">{opportunityData?.location || opportunityData?.loc || "-"}</span>
            </div>
          </div>

          <button onClick={() => { if (setCurrentPage) setCurrentPage("detail"); }} className="w-full border border-[#DDD6C8] text-[#1B1B1B] text-[11px] font-semibold py-2 mt-5 rounded-xl hover:bg-[#F6F3EA] transition-colors flex justify-center items-center gap-1.5">
            Lihat Detail Peluang <ArrowRight size={12} />
          </button>
        </div>
      </FadeUp>

      {/* TIPS */}
      <FadeUp delay={0.2} className="mb-6 bg-[#FCFBF8] border border-[#DDD6C8] rounded-3xl p-5 shadow-sm relative overflow-hidden">
        <h3 className="font-sora font-bold text-sm text-[#1B1B1B] mb-4 flex items-center gap-2 relative z-10">
          Tips Kirim Proposal <Leaf size={16} className="text-[#5F8B6D]" />
        </h3>
        <div className="space-y-4 relative z-10">
          {[
            { icon: HeartHandshake, text: "Tunjukkan ketertarikan yang tulus terhadap proyek" },
            { icon: CheckSquare, text: "Jelaskan skill yang relevan dengan kebutuhan proyek" },
            { icon: FileText, text: "Tambahkan portofolio yang paling relevan" },
            { icon: PenLine, text: "Gunakan bahasa singkat, jelas, dan profesional" },
          ].map((item, index) => (
            <div key={index} className="flex gap-3 items-start">
              <div className="bg-[#E7F0E9] p-1.5 rounded-lg text-[#1F4D3A] flex-shrink-0 mt-0.5"><item.icon size={14} /></div>
              <p className="text-[10px] text-[#1B1B1B] font-medium leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="absolute right-0 bottom-0 text-[#A8C3A0]/40 flex items-end">
          <Leaf size={40} className="rotate-[-20deg]" />
          <Trees size={60} />
        </div>
      </FadeUp>

      {/* QUOTE CARD */}
      <FadeUp delay={0.3} className="mt-auto bg-[#E7F0E9] rounded-2xl p-5 border border-[#A8C3A0]/30 relative overflow-hidden flex flex-col justify-center items-center text-center">
        <h4 className="font-sora font-bold text-xs text-[#1F4D3A] mb-1 flex items-center gap-1 justify-center">Ingat! 💚</h4>
        <p className="text-[10px] font-medium text-[#5F8B6D] leading-relaxed mb-10 relative z-10">
          Setiap proposal adalah langkah nyata untuk memberikan dampak. Terus semangat! ✨
        </p>
        <div className="absolute -bottom-6 w-full flex justify-center">
          <div className="w-20 h-24 bg-[#1F4D3A] rounded-t-full flex items-end justify-center pb-2">
            <Leaf size={24} className="text-[#A8C3A0] mb-6" strokeWidth={1.5} />
          </div>
          <div className="absolute bottom-4 w-12 h-6 border-b-2 border-l-2 border-[#1B1B1B] rounded-bl-xl rotate-12"></div>
        </div>
      </FadeUp>
    </aside>
  );
};