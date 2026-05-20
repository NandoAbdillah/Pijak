import React from "react";
import { cn } from "@/lib/utils";

interface CategoryPillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export function CategoryPill({ children, isActive, className, ...props }: CategoryPillProps) {
  return (
    <button 
      className={cn(
        "px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300",
        isActive 
          ? "bg-[#1F4D3A] text-[#F6F3EA] shadow-md" 
          : "bg-white border border-[#DDD6C8] text-[#6E6E6E] hover:text-[#1B1B1B] hover:bg-[#F6F3EA]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}