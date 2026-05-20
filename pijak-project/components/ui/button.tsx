import React from "react";
import { cn } from "@/libs/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: React.ReactNode;
}

export function Button({ children, variant = 'primary', icon, className, ...props }: ButtonProps) {
  const baseStyle = 'px-6 py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 duration-300';
  const variants = {
    primary: 'bg-[#1F4D3A] text-[#F6F3EA] hover:bg-[#1F4D3A]/90 hover:-translate-y-1 shadow-[0_12px_40px_-12px_rgba(31,77,58,0.2)]',
    secondary: 'bg-white/50 text-[#1B1B1B] border border-[#DDD6C8] hover:bg-white',
    ghost: 'text-[#1F4D3A] hover:bg-[#A8C3A0]/20'
  };

  return (
    <button className={cn(baseStyle, variants[variant], className)} {...props}>
      {children}
      {icon && icon}
    </button>
  );
}
