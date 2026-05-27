/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { BrandBible, BrandAssets } from "./types";
import { Hero } from "./components/Hero";
import { BrandDashboard } from "./components/BrandDashboard";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [bible, setBible] = useState<BrandBible | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateBrand = async (mission: string, companyName?: string) => {
    setIsLoading(true);
    try {
      // 1. Generate Identity
      const identityRes = await fetch("/api/brand/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mission, companyName }),
      });
      const identity = await identityRes.json();

      if (identity.error) throw new Error(identity.error);

      // 2. Generate Assets (SVG Logos)
      const colors = identity.palette.map((p: any) => p.hex);
      
      const [primaryLogo, secondaryMark, icon] = await Promise.all([
        fetch("/api/brand/generate-svg", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: identity.logoPrompts.primary, brandName: identity.name, colors }),
        }).then(r => r.json()),
        fetch("/api/brand/generate-svg", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: identity.logoPrompts.secondary, brandName: identity.name, colors }),
        }).then(r => r.json()),
        fetch("/api/brand/generate-svg", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: identity.logoPrompts.icon, brandName: identity.name, colors }),
        }).then(r => r.json()),
      ]);

      setBible({
        ...identity,
        assets: {
          primaryLogoSvg: primaryLogo.svg,
          secondaryMarkSvg: secondaryMark.svg,
          iconSvg: icon.svg,
        }
      });
    } catch (error) {
      console.error("failed to generate brand:", error);
      alert("Failed to generate brand identity. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => setBible(null);

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1a1a1a] font-sans selection:bg-black selection:text-white">
      <AnimatePresence mode="wait">
        {!bible ? (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center min-h-screen p-6"
          >
            <Hero onGenerate={generateBrand} isLoading={isLoading} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="py-12"
          >
            <BrandDashboard bible={bible} onReset={reset} />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="fixed bottom-6 right-6 text-[10px] uppercase tracking-widest text-zinc-400 font-medium">
        Brand Identity Generator — v1.0
      </footer>
    </div>
  );
}
