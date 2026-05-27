import { BrandBible } from "../types";
import { useEffect } from "react";

interface FontPreviewProps {
  typography: BrandBible["typography"];
}

export function FontPreview({ typography }: FontPreviewProps) {
  useEffect(() => {
    const headingFont = typography.heading.family.replace(/\s+/g, "+");
    const bodyFont = typography.body.family.replace(/\s+/g, "+");
    
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${headingFont}:wght@${typography.heading.weight}&family=${bodyFont}:wght@${typography.body.weight}&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [typography]);

  return (
    <div className="space-y-6 pt-12 border-t border-zinc-100">
      <div className="flex justify-between items-baseline mb-8">
        <h2 className="text-3xl font-medium tracking-tight">Typography</h2>
        <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">02 — Type Casting</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8 bg-white p-10 rounded-2xl border border-zinc-100">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-300">Heading 1</span>
            <h1 
              className="text-6xl tracking-tight leading-none"
              style={{ fontFamily: `"${typography.heading.family}", sans-serif`, fontWeight: typography.heading.weight }}
            >
              The New <br /> Standard
            </h1>
          </div>
          
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-300">Paragraph Text</span>
            <p 
              className="text-lg leading-relaxed text-zinc-600 font-light"
              style={{ fontFamily: `"${typography.body.family}", sans-serif`, fontWeight: typography.body.weight }}
            >
              The quick brown fox jumps over the lazy dog. Building a legacy starts with intentional choices in every detail. Our typography system is designed to convey clarity and purpose across all touchpoints.
            </p>
          </div>

          <div className="pt-6 border-t border-zinc-100 mt-8">
            <p className="text-xs text-zinc-500 font-light italic">
              {typography.visualDescription}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-zinc-900 text-white p-8 rounded-2xl flex flex-col justify-between h-1/2">
             <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Spec Matrix</span>
             <div className="space-y-4">
                <div className="flex items-end justify-between border-b border-zinc-800 pb-2">
                  <span className="text-xs text-zinc-400">Header</span>
                  <span className="text-sm font-medium">{typography.heading.family} {typography.heading.weight}</span>
                </div>
                <div className="flex items-end justify-between border-b border-zinc-800 pb-2">
                  <span className="text-xs text-zinc-400">Body</span>
                  <span className="text-sm font-medium">{typography.body.family} {typography.body.weight}</span>
                </div>
                <div className="flex items-end justify-between border-b border-zinc-800 pb-2">
                  <span className="text-xs text-zinc-400">Fallbacks</span>
                  <span className="text-sm font-medium">Sans-Serif, System UI</span>
                </div>
             </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-zinc-200 border-dashed flex items-center justify-center flex-1">
             <div className="text-center space-y-2">
                <span 
                  className="text-8xl block leading-none opacity-20"
                  style={{ fontFamily: `"${typography.heading.family}", sans-serif` }}
                >
                  Aa
                </span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Character Sample</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
