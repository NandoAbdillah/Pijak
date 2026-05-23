import { Bookmark, ChevronDown, Clock, Wallet } from "lucide-react";

/**
 * @param {{children: import('react').ReactNode, className?: string}} props
 */
export const Badge = ({ children, className = "" }) => (
  <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${className}`}>
    {children}
  </span>
);

/**
 * @param {{children: import('react').ReactNode, variant?: 'primary'|'outline'|'ghost', className?: string}} props
 */
export const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200";
  const variants = {
    primary: "bg-[#1F4D3A] text-white hover:bg-[#15382A] px-5 py-2.5 shadow-sm",
    outline:
      "border border-[#DDD6C8] bg-white text-[#1B1B1B] hover:bg-[#E7DCCB] px-5 py-2.5",
    ghost: "text-[#6E6E6E] hover:text-[#1B1B1B] hover:bg-[#E7DCCB] px-3 py-2",
  };
  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Form UI Components (NEW)
/** @param {{children: import('react').ReactNode, required?: boolean}} props */
export const Label = ({ children, required }) => (
  <label className="block text-xs font-bold text-[#1B1B1B] mb-2 font-sora">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

export const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full bg-white border border-[#DDD6C8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5F8B6D] focus:ring-1 focus:ring-[#5F8B6D] transition-colors placeholder:text-[#A8C3A0] ${className}`}
    {...props}
  />
);

/** @param {{children: import('react').ReactNode, className?: string}} props */
export const Select = ({ children, className = "", ...props }) => (
  <div className="relative">
    <select
      className={`w-full appearance-none bg-white border border-[#DDD6C8] rounded-xl px-4 py-3 text-sm text-[#1B1B1B] focus:outline-none focus:border-[#5F8B6D] focus:ring-1 focus:ring-[#5F8B6D] transition-colors ${className}`}
      {...props}
    >
      {children}
    </select>
    <ChevronDown
      size={16}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6E6E6E] pointer-events-none"
    />
  </div>
);

export const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`w-full bg-white border border-[#DDD6C8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#5F8B6D] focus:ring-1 focus:ring-[#5F8B6D] transition-colors placeholder:text-[#A8C3A0] resize-none ${className}`}
    {...props}
  />
);

/** @param {{icon: import('react').ElementType, title: string, desc: string, active?: boolean, onClick?: import('react').MouseEventHandler<HTMLDivElement>}} props */
export const CardSelector = ({ icon: Icon, title, desc, active, onClick }) => (
  <div
    onClick={onClick}
    className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 flex flex-col items-center justify-center text-center gap-1.5 h-full ${
      active
        ? "bg-[#E7F0E9] border-[#1F4D3A] text-[#1F4D3A] shadow-sm"
        : "bg-white border-[#DDD6C8] hover:border-[#A8C3A0] text-[#6E6E6E] hover:bg-[#F6F3EA]"
    }`}
  >
    <Icon
      size={20}
      strokeWidth={active ? 2 : 1.5}
      className={active ? "text-[#1F4D3A]" : "text-[#6E6E6E]"}
    />
    <div>
      <h4
        className={`text-xs font-semibold ${active ? "text-[#1F4D3A]" : "text-[#1B1B1B]"}`}
      >
        {title}
      </h4>
      <p className="text-[10px] leading-tight mt-0.5">{desc}</p>
    </div>
  </div>
);

/** @param {{data: {typeColor: string, type: string, title: string, category: string, reward: string, deadline: string, beginnerFriendly?: boolean, level: string}}} props */
// Fungsi helper untuk menentukan warna tipe opportunity
const getOpportunityTypeColor = (type) => {
  const types = {
    "Freelance": "bg-orange-100 text-orange-700",
    "Volunteer": "bg-green-100 text-green-700",
    "Kolaborasi": "bg-blue-100 text-blue-700",
    "Skill Exchange": "bg-purple-100 text-purple-700",
  };
  return types[type] || "bg-gray-100 text-gray-700"; // Fallback default
};

// ========================================================
// OPPORTUNITY CARD COMPONENT
// ========================================================
export const OpportunityCard = ({ data, onClick }) => {
  const typeColor = getOpportunityTypeColor(data.type);
  
  // Logic sederhana untuk Beginner Friendly karena di DB belum ada kolomnya
  const isBeginnerFriendly = data.type === "Volunteer" || data.reward === "0" || data.reward?.toLowerCase() === "rp0";

  return (
    <div 
      onClick={() => onClick(data.id)}
      className="bg-white rounded-3xl p-5 border border-[#DDD6C8] shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 group cursor-pointer flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <Badge className={typeColor}>{data.type}</Badge>
        <button className="text-[#A8C3A0] hover:text-[#1F4D3A] transition-colors">
          <Bookmark size={20} strokeWidth={1.5} />
        </button>
      </div>

      <h3 className="font-sora font-semibold text-[#1B1B1B] text-lg mb-1 leading-snug group-hover:text-[#1F4D3A] transition-colors line-clamp-2">
        {data.title}
      </h3>
      <p className="text-sm text-[#6E6E6E] mb-6 flex-grow">{data.category}</p>

      <div className="flex flex-wrap items-center gap-4 text-xs text-[#1B1B1B] font-medium mb-4">
        <div className="flex items-center gap-1.5">
          <Wallet size={14} className="text-[#A8C3A0]" /> 
          {data.reward === "0" || data.reward?.toLowerCase() === "rp0" ? "Tanpa Bayaran" : data.reward}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={14} className="text-[#A8C3A0]" /> {data.deadline}
        </div>
      </div>

      {isBeginnerFriendly ? (
        <Badge className="bg-[#E7F0E9] text-[#1F4D3A] w-fit">
          Beginner Friendly
        </Badge>
      ) : (
        <Badge className="bg-blue-50 text-blue-700 w-fit">
          Intermediate
        </Badge>
      )}
    </div>
  );
};

/** @param {{data: {bg: string, color: string, icon: import('react').ElementType, title: string, desc: string}}} props */
export const CategoryCard = ({ data }) => (
  <div
    className={`${data.bg} rounded-2xl p-4 border border-transparent hover:border-[#DDD6C8] transition-all duration-300 cursor-pointer flex flex-col items-start gap-3`}
  >
    <div className={`p-2 bg-white/60 rounded-xl ${data.color}`}>
      <data.icon size={24} strokeWidth={1.5} />
    </div>
    <div>
      <h4 className="font-sora font-semibold text-[#1B1B1B] text-sm">
        {data.title}
      </h4>
      <p className="text-xs text-[#6E6E6E] mt-0.5">{data.desc}</p>
    </div>
  </div>
);
