import React from "react";
import { cn } from "@/libs/utils";



interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'sage' | 'clay' | 'forest' | 'sand';
}

export function Badge({ children, variant = 'sage', className, ...props }: BadgeProps) {
  const variants = {
    sage: 'bg-[#A8C3A0]/20 text-[#1F4D3A] border-[#A8C3A0]/40',
    clay: 'bg-[#B77B57]/10 text-[#B77B57] border-[#B77B57]/20',
    forest: 'bg-[#1F4D3A] text-[#F6F3EA] border-[#1F4D3A]',
    sand: 'bg-[#E7DCCB]/50 text-[#1B1B1B] border-[#E7DCCB]',
  };
  
  return (
    <span 
      className={cn("inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border", variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
