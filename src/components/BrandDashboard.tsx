import { BrandBible } from "../types";
import { PaletteDisplay } from "./PaletteDisplay";
import { FontPreview } from "./FontPreview";
import { LogoGrid } from "./LogoGrid";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { motion } from "motion/react";

interface BrandDashboardProps {
  bible: BrandBible;
  onReset: () => void;
}

export function BrandDashboard({ bible, onReset }: BrandDashboardProps) {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <header className="flex justify-between items-center mb-16">
        <button 
          onClick={onReset}
          className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 hover:text-black transition-colors"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          Back to Generator
        </button>
        
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-lg text-xs font-semibold uppercase tracking-widest hover:bg-zinc-50 transition-colors">
            <Share2 size={12} /> Share
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-xs font-semibold uppercase tracking-widest hover:bg-zinc-800 transition-colors">
            <Download size={12} /> Export Bible
          </button>
        </div>
      </header>

      <section className="mb-24 space-y-8">
        <div className="space-y-4">
          <div className="inline-block px-3 py-1 rounded bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em]">
            Brand Identity
          </div>
          <h1 className="text-7xl font-bold tracking-tighter text-zinc-900 md:text-8xl">
            {bible.name}<span className="text-zinc-300">.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-zinc-100">
          <div className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Mission Statement</h3>
            <p className="text-2xl font-light leading-snug text-zinc-600">
              {bible.mission}
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Brand Personality</h3>
            <div className="flex flex-wrap gap-2">
              {bible.voice.split(",").map((v, i) => (
                <span key={i} className="px-4 py-2 bg-zinc-100 rounded-full text-sm font-medium text-zinc-700">
                  {v.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <PaletteDisplay palette={bible.palette} />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <FontPreview typography={bible.typography} />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <LogoGrid assets={bible.assets} brandName={bible.name} />
      </motion.div>
    </div>
  );
}
