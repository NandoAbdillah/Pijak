"use client";

import React from "react";
import { Leaf, Search, Menu } from "lucide-react";
import { Button } from "@components/ui/button";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between py-6 px-6 md:px-12 max-w-7xl mx-auto relative z-50">
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="w-10 h-10 bg-[#1F4D3A] rounded-xl rounded-tr-sm rotate-3 flex items-center justify-center text-[#F6F3EA] shadow-md">
          <Leaf size={20} className="-rotate-3" />
        </div>
        <span
          className="text-2xl font-bold tracking-tight text-[#1B1B1B]"
          style={{ fontFamily: '"Sora", sans-serif' }}
        >
          Pijak
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6E6E6E]">
        <a
          href="#"
          className="text-[#1B1B1B] hover:text-[#1F4D3A] transition-colors"
        >
          Beranda
        </a>
        <a href="#" className="hover:text-[#1F4D3A] transition-colors">
          Jelajah
        </a>
        <a href="#" className="hover:text-[#1F4D3A] transition-colors">
          Komunitas
        </a>
        <a href="#" className="hover:text-[#1F4D3A] transition-colors">
          Tentang Kami
        </a>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex relative">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6E6E]"
          />
          <input
            type="text"
            placeholder="Cari peluang..."
            className="pl-10 pr-4 py-2.5 bg-white rounded-full border border-[#DDD6C8] text-sm focus:outline-none focus:border-[#A8C3A0] focus:ring-2 focus:ring-[#A8C3A0]/20 transition-all w-48 focus:w-64"
          />
        </div>
        <Button
          variant="primary"
          className="py-2.5 px-6 text-sm hidden md:flex"
        >
          Masuk
        </Button>
        <button className="md:hidden p-2 text-[#1B1B1B] bg-white rounded-full border border-[#DDD6C8]">
          <Menu size={20} />
        </button>
      </div>
    </nav>
  );
}
