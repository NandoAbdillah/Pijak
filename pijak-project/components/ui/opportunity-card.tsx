'use client';

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "./badge";
import { Badge } from "@/components/ui/badge";

interface OpportunityCardProps {
  title: string;
  category: 'Freelance' | 'Volunteer' | 'Kolaborasi' | 'Data Entry';
  reward: string;
  time: string;
  tags: string[];
  icon: React.ElementType;
}

export function OpportunityCard({ title, category, reward, time, tags, icon: Icon }: OpportunityCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group bg-white p-6 rounded-[2rem] border border-[#DDD6C8] shadow-[0_12px_40px_-12px_rgba(31,77,58,0.04)] hover:shadow-[0_20px_50px_-10px_rgba(31,77,58,0.12)] transition-all duration-300 flex flex-col h-full cursor-pointer relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#A8C3A0]/10 rounded-bl-full -z-10 group-hover:bg-[#A8C3A0]/20 transition-colors" />
      
      <div className="flex justify-between items-start mb-5">
        <Badge variant={category === 'Volunteer' ? 'sage' : category === 'Kolaborasi' ? 'sand' : 'clay'}>
          {category}
        </Badge>
        <button className="text-[#6E6E6E] hover:text-[#1F4D3A] transition-colors p-1 bg-[#F6F3EA] rounded-full group-hover:bg-[#A8C3A0]/20">
          <ArrowRight size={16} className="-rotate-45 group-hover:rotate-0 transition-transform" />
        </button>
      </div>
      
      <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-[#1F4D3A] transition-colors" style={{ fontFamily: '"Sora", sans-serif' }}>
        {title}
      </h3>
      <p className="text-sm text-[#6E6E6E] mb-6 flex-grow flex items-center gap-1.5">
        {Icon && <Icon size={14} className="text-[#B77B57]" />}
        Tugas mikro terpilih
      </p>
      
      <div className="flex items-center justify-between text-sm mb-5 pb-5 border-b border-[#DDD6C8]/50">
        <span className="font-bold text-[#1F4D3A]">{reward}</span>
        <span className="flex items-center text-[#6E6E6E] gap-1 bg-[#F6F3EA] px-2.5 py-1 rounded-md text-xs font-medium">
          <Clock size={12}/> {time}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="text-xs font-medium text-[#5F8B6D] bg-[#5F8B6D]/10 px-2 py-1 rounded-md border border-[#5F8B6D]/20">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
