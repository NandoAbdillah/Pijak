"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Users } from "lucide-react";
import { OpportunityCard } from "@/components/ui/opportunity-card";
import { STAGGER_CONTAINER, FADE_UP } from "@/libs/motion";
import { CategoryPill } from "../ui/category-pill";

export function FeaturedSection() {
  const categories = [
    "Semua",
    "Freelance",
    "Volunteer",
    "Kolaborasi",
    "Skill Exchange",
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3 text-[#1B1B1B]"
            style={{ fontFamily: '"Sora", sans-serif' }}
          >
            Peluang untukmu{" "}
            <span className="text-2xl animate-bounce origin-bottom">✨</span>
          </h2>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 w-full max-w-[90vw]">
            {categories.map((tab, i) => (
              <CategoryPill key={tab} isActive={i === 0}>
                {tab}
              </CategoryPill>
            ))}
          </div>
        </div>
        <button className="hidden md:flex text-[#1F4D3A] font-semibold items-center gap-1 hover:gap-2 transition-all group">
          Lihat semua{" "}
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
      </div>

      <motion.div
        variants={STAGGER_CONTAINER}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <motion.div variants={FADE_UP}>
          <OpportunityCard
            title="Desain Konten Instagram UMKM Kopi"
            category="Freelance"
            reward="Rp 150.000"
            time="2 hari lagi"
            tags={["Desain", "Beginner"]}
            icon={Briefcase}
          />
        </motion.div>
        <motion.div variants={FADE_UP}>
          <OpportunityCard
            title="Edukasi Anak Minggu (Volunteer Mengajar)"
            category="Volunteer"
            reward="Sertifikat + Pengalaman"
            time="5 hari lagi"
            tags={["Sosial", "Pendidikan"]}
            icon={Users}
          />
        </motion.div>
        <motion.div variants={FADE_UP}>
          <OpportunityCard
            title="Partner untuk Project Video Dokumenter"
            category="Kolaborasi"
            reward="Barter Skill"
            time="1 minggu lagi"
            tags={["Video", "Creative"]}
            icon={Briefcase}
          />
        </motion.div>
        <motion.div variants={FADE_UP}>
          <OpportunityCard
            title="Input Data Penjualan Toko Baju (Excel)"
            category="Data Entry"
            reward="Rp 100.000"
            time="Besok"
            tags={["Data Entry", "Beginner"]}
            icon={Briefcase}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
