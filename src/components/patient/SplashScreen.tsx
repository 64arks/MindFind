import React from 'react';
import { ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

interface SplashScreenProps {
  onStart: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-[640px] flex flex-col justify-between items-center text-center p-6 bg-gradient-to-b from-white via-neutral-50/80 to-emerald-50/20 overflow-hidden">
      {/* Subtle organic ambient circles */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-200/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-28 w-72 h-72 rounded-full bg-sky-200/20 blur-3xl pointer-events-none" />

      {/* Top Tagline */}
      <div className="pt-6 flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100/80 border border-neutral-200/60 text-[11px] font-medium text-neutral-600">
        <MapPin className="w-3 h-3 text-emerald-600" />
        <span>Lusaka Pilot Health Network</span>
      </div>

      {/* Center Branding Area */}
      <div className="flex flex-col items-center max-w-xs z-10 my-auto py-8">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-[28px] glass-panel flex items-center justify-center shadow-lg shadow-emerald-900/5 border border-white/80 p-2">
            <img
              src="/src/assets/images/medifind_logo_symbol_1790116539380.jpg"
              alt="MediFind Zambia symbol"
              className="w-full h-full object-contain rounded-[20px]"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-white shadow-sm">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-2">
          MediFind Zambia
        </h1>
        <p className="text-base font-normal text-neutral-600 tracking-tight leading-relaxed max-w-[260px]">
          Find medicine availability near you.
        </p>

        <div className="mt-4 px-3 py-1.5 rounded-lg bg-emerald-50/70 border border-emerald-100 text-[12px] text-emerald-800 font-medium">
          Lusaka Community Health Network
        </div>
      </div>

      {/* Bottom Action & Footnote */}
      <div className="w-full max-w-sm pb-6 z-10 flex flex-col gap-3.5">
        <button
          onClick={onStart}
          className="w-full h-13 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-md shadow-neutral-900/10 active:scale-[0.98] transition-all"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[11px] text-neutral-600 leading-normal px-4">
          Information provided by participating health facilities.
        </p>
      </div>
    </div>
  );
};
