import React from "react";
import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#DDD6C8] py-12 px-6 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1F4D3A] rounded-lg rotate-3 flex items-center justify-center text-[#F6F3EA]">
            <Leaf size={16} className="-rotate-3" />
          </div>
          <span className="text-xl font-bold text-[#1B1B1B]" style={{ fontFamily: '"Sora", sans-serif' }}>Pijak OS</span>
        </div>
        <p className="text-sm text-[#6E6E6E]">© 2026 Pijak Ecosystem. Dibangun untuk dampak nyata dan generasi yang tangguh.</p>
      </div>
    </footer>
  );
}
