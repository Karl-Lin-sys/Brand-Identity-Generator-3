import { BrandBible } from "../types";
import { Copy } from "lucide-react";

interface PaletteDisplayProps {
  palette: BrandBible["palette"];
}

export function PaletteDisplay({ palette }: PaletteDisplayProps) {
  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    alert(`Copied ${hex} to clipboard!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-baseline mb-8">
        <h2 className="text-3xl font-medium tracking-tight">Color Palette</h2>
        <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">01 — Color System</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
        {palette.map((color, idx) => (
          <div key={idx} className="bg-white flex flex-col h-full group">
            <div 
              className="h-48 w-full transition-transform duration-500 group-hover:scale-105" 
              style={{ backgroundColor: color.hex }}
            />
            <div className="p-6 space-y-4 flex flex-col flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">{color.name}</h3>
                  <button 
                    onClick={() => copyToClipboard(color.hex)}
                    className="text-xs text-zinc-400 font-mono mt-1 hover:text-black flex items-center gap-1.5 transition-colors"
                  >
                    {color.hex} <Copy size={10} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-zinc-500 font-light leading-relaxed flex-1 italic">
                {color.usage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
