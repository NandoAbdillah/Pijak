'use client';

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Leaf, Heart } from "lucide-react";
import { FADE_UP, STAGGER_CONTAINER, FLOATING_MOTION } from "@/libs/motion";
import { Button } from "@components/ui/button";

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative Organic Backgrounds */}
      <div className="absolute top-0 right-[10%] w-[500px] h-[500px] bg-[#A8C3A0]/30 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] mix-blend-multiply blur-[60px] -z-10 animate-[spin_20s_linear_infinite]" />
      <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] bg-[#E7DCCB]/60 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] mix-blend-multiply blur-[60px] -z-10 animate-[spin_25s_linear_infinite_reverse]" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Typography & CTA */}
        <motion.div 
          className="lg:col-span-7 space-y-8 relative z-10"
          initial="hidden" animate="show" variants={STAGGER_CONTAINER}
        >
          <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-[#DDD6C8] backdrop-blur-md">
            <Sparkles size={16} className="text-[#B77B57]" />
            <span className="text-sm font-semibold text-[#1F4D3A]">Ekosistem Peluang Mikro Gen-Z</span>
          </motion.div>
          
          <motion.h1 
            variants={FADE_UP} 
            className="text-5xl md:text-[5.5rem] leading-[1.05] tracking-tight text-[#1B1B1B]"
            style={{ fontFamily: '"Sora", sans-serif' }}
          >
            Mulai dari <br/>
            <span className="relative inline-block">
              <span className="italic font-light text-[#1F4D3A] z-10 relative">langkah kecil,</span>
              <svg className="absolute w-full h-4 -bottom-1 left-0 text-[#A8C3A0]/40 -z-0" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 10 Q 50 20 100 10" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round"/></svg>
            </span> <br/>
            beri dampak nyata.
          </motion.h1>
          
          <motion.p variants={FADE_UP} className="text-lg text-[#6E6E6E] max-w-md leading-relaxed">
            Temukan peluang, asah skill, dan bangun pengalaman bersama komunitas positif di Pijak. Nggak perlu nunggu sempurna buat mulai berkarya.
          </motion.p>
          
          <motion.div variants={FADE_UP} className="flex flex-wrap gap-4 pt-4">
            <Button variant="primary" icon={<ArrowRight size={18} />}>Temukan Peluang</Button>
            <Button variant="secondary">Buat Peluang</Button>
          </motion.div>
        </motion.div>

        {/* Editorial Image Composition */}
        <motion.div 
          className="lg:col-span-5 relative h-[550px] w-full"
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <div className="absolute inset-4 bg-[#1F4D3A] rounded-[3rem] rotate-3 opacity-90 shadow-2xl" />
          
          <div className="absolute inset-0 bg-[#E7DCCB] rounded-[3rem] -rotate-2 border-4 border-white shadow-[0_20px_50px_-10px_rgba(31,77,58,0.15)] overflow-hidden flex flex-col p-6">
            <div className="flex justify-between items-start z-10">
              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-sm font-bold text-[#1F4D3A] flex items-center gap-2 shadow-sm">
                <Leaf size={14} /> #Berdampak
              </div>
              <div className="bg-[#1B1B1B]/10 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center">
                <Heart size={18} className="text-white" fill="white" />
              </div>
            </div>

            {/* Simulated Placeholder Image */}
            <div className="absolute inset-0 top-16 bg-[#D8CEBE] rounded-t-[2.5rem] mt-6 mix-blend-multiply flex items-center justify-center overflow-hidden">
               <div className="w-64 h-64 border-[40px] border-[#C3B7A3]/30 rounded-full opacity-50 absolute -top-10 -right-10" />
               <div className="w-40 h-40 bg-[#B77B57]/10 rounded-full absolute bottom-10 left-10 blur-xl" />
               <span className="text-[#1B1B1B]/30 font-bold tracking-widest uppercase text-sm" style={{ fontFamily: '"Sora", sans-serif' }}>[ IMAGE PLACEHOLDER ]</span>
            </div>

            {/* Floating Reputation Card */}
            <motion.div 
              variants={FLOATING_MOTION}
              animate="animate"
              className="absolute -left-6 bottom-16 bg-white p-5 rounded-[1.5rem] shadow-xl border border-[#DDD6C8] max-w-[220px] z-20"
            >
              <h4 className="font-bold text-[#1F4D3A] mb-1" style={{ fontFamily: '"Sora", sans-serif' }}>Mahasiswa Sidoarjo</h4>
              <p className="text-xs text-[#6E6E6E] mb-3">Telah membantu desain 5 UMKM Kopi.</p>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#B77B57]" />)}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
