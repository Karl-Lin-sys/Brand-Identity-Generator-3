import { BrandAssets } from "../types";

interface LogoGridProps {
  assets: BrandAssets;
  brandName: string;
}

export function LogoGrid({ assets, brandName }: LogoGridProps) {
  return (
    <div className="space-y-6 pt-12 border-t border-zinc-100 pb-20">
      <div className="flex justify-between items-baseline mb-8">
        <h2 className="text-3xl font-medium tracking-tight">Logo System</h2>
        <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">03 — Visual Marks</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Primary Logo */}
        <div className="space-y-4">
          <div className="bg-white aspect-square rounded-2xl border border-zinc-200 flex items-center justify-center p-12 overflow-hidden group">
             <div 
               className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
               dangerouslySetInnerHTML={{ __html: assets.primaryLogoSvg }} 
             />
          </div>
          <div className="px-2">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Primary Identity</h4>
            <p className="text-sm font-medium mt-1">Full Scalable Vector</p>
          </div>
        </div>

        {/* Secondary Mark */}
        <div className="space-y-4">
          <div className="bg-zinc-900 aspect-square rounded-2xl flex items-center justify-center p-16 overflow-hidden group">
             <div 
               className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110 "
               dangerouslySetInnerHTML={{ __html: assets.secondaryMarkSvg.replace(/fill="[^"]*"/g, 'fill="white"') }} 
             />
          </div>
          <div className="px-2">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Secondary Mark</h4>
            <p className="text-sm font-medium mt-1">Abstraction — Inverted</p>
          </div>
        </div>

        {/* Icon / Favicon */}
        <div className="space-y-4">
          <div className="bg-white aspect-square rounded-2xl border border-zinc-200 flex items-center justify-center overflow-hidden">
             <div className="grid grid-cols-2 gap-4">
                <div 
                   className="w-12 h-12 flex items-center justify-center"
                   dangerouslySetInnerHTML={{ __html: assets.iconSvg }} 
                />
                <div className="w-12 h-12 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center overflow-hidden p-2">
                   <div dangerouslySetInnerHTML={{ __html: assets.iconSvg }} />
                </div>
                <div className="w-8 h-8 rounded bg-zinc-100 flex items-center justify-center p-1">
                   <div dangerouslySetInnerHTML={{ __html: assets.iconSvg }} />
                </div>
                <div className="w-4 h-4 flex items-center justify-center">
                   <div dangerouslySetInnerHTML={{ __html: assets.iconSvg }} />
                </div>
             </div>
          </div>
          <div className="px-2">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Symbol System</h4>
            <p className="text-sm font-medium mt-1">Responsive Icon Set</p>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-white rounded-2xl border border-zinc-100 p-8 flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-medium">{brandName}</h3>
          <p className="text-xs text-zinc-400 font-light italic uppercase tracking-wider">Official Wordmark Context</p>
        </div>
        <div className="flex items-center gap-4">
           <div 
              className="h-10 w-auto opacity-80"
              dangerouslySetInnerHTML={{ __html: assets.secondaryMarkSvg }} 
           />
           <span className="text-2xl font-bold tracking-tight opacity-50" style={{ fontFamily: 'var(--font-sans)' }}>{brandName}</span>
        </div>
      </div>
    </div>
  );
}
