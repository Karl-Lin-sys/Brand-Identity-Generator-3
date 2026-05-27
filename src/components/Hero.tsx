/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onGenerate: (mission: string, companyName?: string) => void;
  isLoading: boolean;
}

export function Hero({ onGenerate, isLoading }: HeroProps) {
  const [mission, setMission] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (mission.trim()) {
      onGenerate(mission, name);
    }
  };

  return (
    <div className="w-full max-w-2xl px-4">
      <div className="space-y-4 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-semibold tracking-wider uppercase"
        >
          <Sparkles size={12} />
          <span>AI Brand Strategist</span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl font-medium tracking-tight text-zinc-900"
        >
          Generate your <br />
          <span className="text-zinc-400 italic font-serif">Brand Bible.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-zinc-500 max-w-md font-light leading-relaxed"
        >
          Describe your company mission and values. We'll craft a complete visual identity in seconds.
        </motion.p>
      </div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        onSubmit={handleSubmit} 
        className="space-y-6"
      >
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 ml-1">Company Name (Optional)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Lumina Collective"
            disabled={isLoading}
            className="w-full px-6 py-4 rounded-xl border border-zinc-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-black/5 focus:border-zinc-300 transition-all text-lg font-light placeholder:text-zinc-300"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 ml-1">Mission Statement</label>
          <textarea
            required
            value={mission}
            onChange={(e) => setMission(e.target.value)}
            disabled={isLoading}
            placeholder="e.g. We design sustainable urban furniture that reconnects city dwellers with nature through modular, living installations."
            rows={4}
            className="w-full px-6 py-4 rounded-xl border border-zinc-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-black/5 focus:border-zinc-300 transition-all text-lg font-light placeholder:text-zinc-300 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !mission.trim()}
          className="w-full bg-black text-white py-5 rounded-xl font-medium text-lg flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed group"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Strategizing...</span>
            </>
          ) : (
            <>
              <span>Generate Brand Identity</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </>
          )}
        </button>
      </motion.form>

      <div className="mt-12 flex items-center gap-8 border-t border-zinc-100 pt-8">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-300">Outputs</span>
          <span className="text-xs text-zinc-500 font-medium mt-1">Primary & Secondary Logos</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-300">System</span>
          <span className="text-xs text-zinc-500 font-medium mt-1">Palette & Type Pairings</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-300">Delivery</span>
          <span className="text-xs text-zinc-500 font-medium mt-1">SVG Source Code</span>
        </div>
      </div>
    </div>
  );
}
