import {
  ArrowRight,
  Leaf,
  Check,
  Calendar,
  Trees,
  Palette,
  FileText,
  ArrowLeft,
  ArrowRightLeft,
  Bookmark,
  Sparkles,
  HeartHandshake,
  Wallet,
  Upload,
  LinkIcon,
  FileIcon,
  CheckSquare,
  BadgeCheck,
  PenLine,
  X,
} from "lucide-react";

import { FadeUp } from "@/components/motion/anim";

import {
  Button,
  Label,
  Input,
  Select,
  Textarea,
  Badge,
} from "@/components/ui/uis";

/**
 * @param {{
 *   setCurrentPage: (page: string) => void,
 *   opportunityData: any,
 *   setOpportunityData: (updater: any) => void,
 * }} props
 */
export const KirimProposalMain = (props) => {
  const { setCurrentPage, opportunityData, setOpportunityData } = props;
  const isFreelance = opportunityData.type === "Freelance";

  // Toggle Function just for demonstration of Dynamic Form
  const toggleOppType = () => {
    setOpportunityData(
      /** @param {{ type: string, badgeColor?: string, reward?: string }} prev */ (
        prev,
      ) => ({
        ...prev,
        type: prev.type === "Freelance" ? "Volunteer" : "Freelance",
        badgeColor:
          prev.type === "Freelance"
            ? "bg-green-100 text-green-700"
            : "bg-[#E7F0E9] text-[#1F4D3A]",
        reward:
          prev.type === "Freelance"
            ? "Sertifikat + Pengalaman"
            : "Rp500.000 - Rp750.000",
      }),
    );
  };

  return (
    <div className="max-w-[850px] mx-auto pb-10">
      {/* Header Actions */}
      <FadeUp className="mt-4 mb-8 flex items-center justify-between">
        <button
          onClick={() => setCurrentPage("detail")}
          className="flex items-center gap-2 text-xs font-semibold text-[#6E6E6E] hover:text-[#1F4D3A] transition-colors"
        >
          <ArrowLeft size={16} /> Kembali ke detail peluang
        </button>
        <div className="flex items-center gap-4 text-[#6E6E6E]">
          {/* Developer Toggle to show dynamic features */}
          <button
            onClick={toggleOppType}
            className="flex items-center gap-1.5 bg-[#E7DCCB] text-[#1B1B1B] px-3 py-1.5 rounded-full text-[10px] font-bold hover:bg-[#DDD6C8] transition-colors"
          >
            <ArrowRightLeft size={12} /> Ubah ke{" "}
            {isFreelance ? "Volunteer" : "Freelance"}
          </button>

          <button className="flex items-center gap-2 text-[11px] font-semibold hover:text-[#1B1B1B] border border-[#DDD6C8] px-3 py-1.5 rounded-full bg-white transition-colors">
            <Bookmark size={14} /> Simpan Draft
          </button>
        </div>
      </FadeUp>

      {/* Progress Stepper */}
      <FadeUp
        delay={0.1}
        className="w-full max-w-3xl mx-auto mb-10 flex items-center justify-between relative px-4"
      >
        <div className="absolute left-[10%] right-[10%] top-4 h-0.5 bg-[#DDD6C8] -z-10"></div>
        {[
          { num: 1, label: "Informasi Proposal", active: true },
          { num: 2, label: "Portofolio & Dokumen", active: false },
          { num: 3, label: "Tinjau Proposal", active: false },
          { num: 4, label: "Kirim Proposal", active: false },
        ].map((step, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 bg-[#F6F3EA] px-2"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                step.active
                  ? "bg-[#1F4D3A] text-white border-[#1F4D3A]"
                  : "bg-white text-[#A8C3A0] border-[#DDD6C8]"
              }`}
            >
              {step.num}
            </div>
            <span
              className={`text-[10px] font-semibold ${step.active ? "text-[#1B1B1B]" : "text-[#A8C3A0]"}`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </FadeUp>

      {/* Header Info */}
      <FadeUp
        delay={0.2}
        className="flex flex-col-reverse md:flex-row gap-8 mb-8"
      >
        <div className="flex-1">
          <h1 className="font-sora font-bold text-3xl text-[#1B1B1B] flex items-center gap-3 mb-2">
            Kirim Proposal <Leaf className="text-[#5F8B6D] w-6 h-6" />
          </h1>
          <p className="text-xs text-[#6E6E6E] max-w-md">
            Tunjukkan minatmu dan ceritakan bagaimana kamu bisa berkontribusi di
            peluang ini.
          </p>
        </div>
        {/* Dummy Illustration Box */}
        <div className="w-40 h-28 bg-[#F6F3EA] flex items-end justify-center relative flex-shrink-0 -mb-4">
          <div className="w-24 h-24 bg-[#5F8B6D] rounded-t-full relative z-10 flex items-end justify-center px-4">
            <div className="w-16 h-10 bg-[#E7F0E9] rounded-t-md border-2 border-[#1F4D3A]"></div>
          </div>
          <Sparkles
            className="absolute right-4 top-2 text-[#F5B041]"
            size={16}
          />
        </div>
      </FadeUp>

      {/* Target Peluang Card */}
      <FadeUp
        delay={0.3}
        className="bg-white border border-[#DDD6C8] rounded-3xl p-5 mb-8 flex flex-col md:flex-row gap-4 justify-between items-start shadow-sm"
      >
        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 rounded-full bg-[#E7F0E9] text-[#1F4D3A] flex items-center justify-center font-bold text-[9px] text-center leading-tight flex-shrink-0 mt-1">
            Kopi
            <br />
            Nusantara
          </div>
          <div>
            <h4 className="text-[10px] font-bold text-[#6E6E6E] mb-1 uppercase tracking-wider">
              PELUANG YANG DILAMAR
            </h4>
            <h3 className="font-sora font-bold text-[#1B1B1B] text-[15px] mb-1">
              {opportunityData.title}
            </h3>
            <div className="flex items-center gap-2 text-[11px] text-[#6E6E6E] mb-2">
              <span className="font-medium text-[#1B1B1B]">
                {opportunityData.organizer}
              </span>
              <div className="w-1 h-1 bg-[#DDD6C8] rounded-full"></div>
              <span>{opportunityData.loc}</span>
            </div>
            <Badge className={opportunityData.badgeColor}>
              {opportunityData.type}
            </Badge>
          </div>
        </div>
        <button className="text-[#A8C3A0] hover:text-[#1F4D3A]">
          <Bookmark size={20} />
        </button>
      </FadeUp>

      {/* Form Area */}
      <FadeUp delay={0.4} className="space-y-8 bg-transparent">
        <h2 className="font-sora font-bold text-lg text-[#1B1B1B]">
          Informasi Proposal
        </h2>

        <form className="space-y-6">
          {/* Dynamic Field: Role Name */}
          <div>
            <Label required>
              {isFreelance ? "Peran yang Dilamar" : "Posisi Relawan"}
            </Label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6E6E]">
                {isFreelance ? (
                  <Palette size={16} />
                ) : (
                  <HeartHandshake size={16} />
                )}
              </div>
              <Select className="pl-11">
                <option value="desainer" selected>
                  Desainer Grafis
                </option>
                <option value="lainnya">Lainnya</option>
              </Select>
            </div>
          </div>

          <div>
            <Label required>Perkenalkan dirimu</Label>
            <div className="relative">
              <Textarea
                rows="4"
                defaultValue="Halo tim Kopi Nusantara! Saya Raka, seorang desainer grafis yang memiliki pengalaman dalam membuat konten visual untuk brand F&B dan UMKM. Saya tertarik dengan peluang ini karena sesuai dengan passion saya dalam desain dan juga mendukung brand lokal berkembang."
                className="text-[#1B1B1B] leading-relaxed"
              />
              <span className="absolute right-3 bottom-3 text-[10px] font-medium text-[#A8C3A0]">
                215 / 500
              </span>
            </div>
          </div>

          <div>
            <Label required>Mengapa kamu cocok untuk proyek ini?</Label>
            <div className="relative">
              <Textarea
                rows="3"
                defaultValue="Saya memiliki pengalaman membuat konten media sosial yang menarik, memahami karakter brand kopi, dan mampu bekerja sesuai deadline."
                className="text-[#1B1B1B] leading-relaxed"
              />
              <span className="absolute right-3 bottom-3 text-[10px] font-medium text-[#A8C3A0]">
                156 / 300
              </span>
            </div>
          </div>

          <div>
            <Label required>
              {isFreelance
                ? "Pendekatanmu untuk proyek ini"
                : "Harapanmu setelah mengikuti program ini"}
            </Label>
            <div className="relative">
              <Textarea
                rows="3"
                defaultValue={
                  isFreelance
                    ? "Saya akan memulai dengan memahami brand & target audiens Kopi Nusantara, lalu membuat konsep visual yang konsisten, modern, dan relevan dengan karakter brand."
                    : "Saya berharap bisa belajar banyak tentang industri kopi lokal dan menambah relasi positif dengan sesama relawan."
                }
                className="text-[#1B1B1B] leading-relaxed"
              />
              <span className="absolute right-3 bottom-3 text-[10px] font-medium text-[#A8C3A0]">
                178 / 300
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label required>Ketersediaan Waktu</Label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6E6E]">
                  <Calendar size={16} />
                </div>
                <Select className="pl-11">
                  <option value="10-15" selected>
                    10-15 jam per minggu
                  </option>
                  <option value="5-10">5-10 jam per minggu</option>
                </Select>
              </div>
              <p className="text-[10px] text-[#6E6E6E] mt-2">
                Pilih estimasi waktu yang bisa kamu commit.
              </p>
            </div>

            {/* Dynamic Field: Budget vs No Budget */}
            {isFreelance && (
              <div>
                <Label required={false}>Ekspektasi Budget (Opsional)</Label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6E6E]">
                    <Wallet size={16} />
                  </div>
                  <Input
                    defaultValue="Rp500.000 - Rp750.000"
                    className="pl-11 font-medium text-[#1B1B1B]"
                  />
                </div>
                <p className="text-[10px] text-[#6E6E6E] mt-2">
                  Berikan range budget yang kamu harapkan (opsional).
                </p>
              </div>
            )}
          </div>

          {/* Portofolio Area */}
          <div className="bg-[#FCFBF8] border border-[#DDD6C8] rounded-3xl p-6 space-y-5">
            <h3 className="font-sora font-bold text-sm text-[#1B1B1B]">
              Portofolio & Dokumen
            </h3>
            <p className="text-[10px] text-[#6E6E6E]">
              Tunjukkan karya terbaikmu yang relevan dengan proyek ini.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="border-2 border-dashed border-[#A8C3A0] rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-2 bg-[#E7F0E9]/30 hover:bg-[#E7F0E9] transition-colors cursor-pointer group">
                <Upload
                  size={24}
                  className="text-[#5F8B6D] group-hover:-translate-y-1 transition-transform"
                />
                <span className="text-[11px] font-bold text-[#1F4D3A]">
                  Upload Portofolio
                </span>
                <span className="text-[9px] text-[#6E6E6E]">
                  PDF, PPT, atau ZIP maks. 20MB
                </span>
                <Badge className="bg-white border border-[#DDD6C8] text-[#1B1B1B] mt-2 shadow-sm">
                  Pilih File
                </Badge>
              </div>

              <div className="flex flex-col justify-center gap-3">
                <span className="text-[11px] font-semibold text-[#1B1B1B]">
                  Atau tambahkan link portofolio
                </span>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6E6E]">
                    <LinkIcon size={14} />
                  </div>
                  <Input
                    defaultValue="https://behance.net/rakamahendra"
                    className="pl-10 text-xs font-medium"
                  />
                  <Check
                    size={14}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5F8B6D]"
                  />
                </div>
                <span className="text-[9px] text-[#6E6E6E]">
                  Contoh: Behance, Dribbble, Google Drive, atau website pribadi.
                </span>
              </div>
            </div>

            {/* Uploaded File Preview */}
            <div className="bg-white border border-[#DDD6C8] rounded-xl p-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-red-50 p-2 rounded-lg text-red-500">
                  <FileIcon size={16} />
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold text-[#1B1B1B]">
                    Portfolio_RakaMahendra.pdf
                  </h4>
                  <p className="text-[9px] text-[#6E6E6E]">2.6 MB</p>
                </div>
              </div>
              <button className="text-[#6E6E6E] hover:text-red-500 transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>

          <div>
            <Label required={false}>Pesan Tambahan (Opsional)</Label>
            <div className="relative">
              <Textarea
                rows="2"
                placeholder="Tulis pesan tambahan untuk pemberi peluang..."
              />
              <span className="absolute right-3 bottom-3 text-[10px] font-medium text-[#A8C3A0]">
                0 / 250
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex flex-col items-center gap-3">
            <Button className="w-full py-4 text-sm shadow-md font-bold hover:shadow-lg">
              Lanjutkan ke Tinjau Proposal{" "}
              <ArrowRight size={16} className="ml-2" />
            </Button>
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-[#6E6E6E]">
              <CheckSquare size={12} className="text-[#A8C3A0]" /> Draft akan
              otomatis tersimpan
            </div>
          </div>
        </form>
      </FadeUp>
    </div>
  );
};

/**
 * @param {{
 *   opportunityData: {
 *     type: string;
 *     organizer: string;
 *     deadline: string;
 *     level: string;
 *     reward: string;
 *   };
 * }} props
 */
export const KirimProposalRightSidebar = ({ opportunityData }) => {
  const isFreelance = opportunityData.type === "Freelance";

  return (
    <aside className="w-[360px] h-screen sticky top-0 bg-[#FCFBF8] border-l border-[#DDD6C8] flex flex-col py-8 px-6 z-20 flex-shrink-0 overflow-y-auto hide-scrollbar">
      {/* Ringkasan Peluang Dynamic */}
      <div className="mb-6">
        <h3 className="font-sora font-bold text-sm text-[#1B1B1B] mb-4">
          Ringkasan Peluang
        </h3>
        <div className="bg-white border border-[#DDD6C8] rounded-3xl p-5 shadow-sm">
          <div className="flex gap-3 items-center mb-4 pb-4 border-b border-[#F6F3EA]">
            <div className="w-10 h-10 rounded-full bg-[#E7F0E9] text-[#1F4D3A] flex items-center justify-center font-bold text-[8px] text-center leading-tight">
              Kopi
              <br />
              Nus
            </div>
            <div>
              <h4 className="font-sora font-bold text-[#1B1B1B] text-xs flex items-center gap-1">
                {opportunityData.organizer}{" "}
                <BadgeCheck
                  size={12}
                  className="text-[#5F8B6D] fill-[#E7F0E9]"
                />
              </h4>
              <p className="text-[10px] text-[#6E6E6E]">UMKM Kopi Lokal</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-[#6E6E6E]">Jenis</span>
              <span className="font-semibold text-[#1B1B1B]">
                {opportunityData.type}
              </span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-[#6E6E6E]">Deadline</span>
              <span className="font-semibold text-[#1B1B1B]">
                {opportunityData.deadline}
              </span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-[#6E6E6E]">Tingkat</span>
              <span className="font-semibold text-[#1B1B1B]">
                {opportunityData.level}
              </span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-[#6E6E6E]">
                {isFreelance ? "Budget" : "Reward"}
              </span>
              <span className="font-bold text-[#1F4D3A]">
                {opportunityData.reward}
              </span>
            </div>
          </div>

          <button className="w-full border border-[#DDD6C8] text-[#1B1B1B] text-[11px] font-semibold py-2 mt-5 rounded-xl hover:bg-[#F6F3EA] transition-colors flex justify-center items-center gap-1.5">
            Lihat Detail Peluang <ArrowRight size={12} />
          </button>
        </div>
      </div>

      {/* Tips Kirim Proposal */}
      <div className="mb-6 bg-[#FCFBF8] border border-[#DDD6C8] rounded-3xl p-5 shadow-sm relative overflow-hidden">
        <h3 className="font-sora font-bold text-sm text-[#1B1B1B] mb-4 flex items-center gap-2 relative z-10">
          Tips Kirim Proposal <Leaf size={16} className="text-[#5F8B6D]" />
        </h3>
        <div className="space-y-4 relative z-10">
          <div className="flex gap-3 items-start">
            <div className="bg-[#E7F0E9] p-1.5 rounded-lg text-[#1F4D3A] flex-shrink-0 mt-0.5">
              <HeartHandshake size={14} />
            </div>
            <p className="text-[10px] text-[#1B1B1B] font-medium leading-relaxed">
              Tunjukkan ketertarikanmu yang tulus terhadap proyek ini
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <div className="bg-[#E7F0E9] p-1.5 rounded-lg text-[#1F4D3A] flex-shrink-0 mt-0.5">
              <CheckSquare size={14} />
            </div>
            <p className="text-[10px] text-[#1B1B1B] font-medium leading-relaxed">
              Jelaskan relevansi skill kamu dengan kebutuhan proyek
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <div className="bg-[#E7F0E9] p-1.5 rounded-lg text-[#1F4D3A] flex-shrink-0 mt-0.5">
              <FileText size={14} />
            </div>
            <p className="text-[10px] text-[#1B1B1B] font-medium leading-relaxed">
              Lampirkan portofolio terbaik dan paling relevan
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <div className="bg-[#E7F0E9] p-1.5 rounded-lg text-[#1F4D3A] flex-shrink-0 mt-0.5">
              <PenLine size={14} />
            </div>
            <p className="text-[10px] text-[#1B1B1B] font-medium leading-relaxed">
              Tulis dengan singkat, jelas, dan profesional
            </p>
          </div>
        </div>
        {/* Simple decorative plants bottom */}
        <div className="absolute right-0 bottom-0 text-[#A8C3A0]/40 flex items-end">
          <Leaf size={40} className="rotate-[-20deg]" />
          <Trees size={60} />
        </div>
      </div>

      {/* Quote Card */}
      <div className="mt-auto bg-[#E7F0E9] rounded-2xl p-5 border border-[#A8C3A0]/30 relative overflow-hidden flex flex-col justify-center items-center text-center">
        <h4 className="font-sora font-bold text-xs text-[#1F4D3A] mb-1 flex items-center gap-1 justify-center">
          Ingat! 💚
        </h4>
        <p className="text-[10px] font-medium text-[#5F8B6D] leading-relaxed mb-10 relative z-10">
          Setiap proposal adalah langkah nyata untuk memberikan dampak. Terus
          semangat! ✨
        </p>
        <div className="absolute -bottom-6 w-full flex justify-center">
          <div className="w-20 h-24 bg-[#1F4D3A] rounded-t-full flex items-end justify-center pb-2">
            <Leaf size={24} className="text-[#A8C3A0] mb-6" strokeWidth={1.5} />
          </div>
          {/* Abstract hands shape */}
          <div className="absolute bottom-4 w-12 h-6 border-b-2 border-l-2 border-[#1B1B1B] rounded-bl-xl rotate-12"></div>
        </div>
      </div>
    </aside>
  );
};
