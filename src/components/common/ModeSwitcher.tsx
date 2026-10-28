import React from 'react';
import { Smartphone, Monitor, Shield, Building2, User, Key, Play, Sparkles } from 'lucide-react';

export type AppRole = 'patient' | 'pharmacy' | 'admin';

interface ModeSwitcherProps {
  currentRole: AppRole;
  onSelectRole: (role: AppRole) => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
  onRunFlow: (flowId: 'patient_flow' | 'pharmacy_flow' | 'admin_flow' | 'restricted_flow' | 'empty_states') => void;
}

export const ModeSwitcher: React.FC<ModeSwitcherProps> = ({
  currentRole,
  onSelectRole,
  isMobileFrame,
  onToggleMobileFrame,
  onRunFlow
}) => {
  return (
    <div className="w-full bg-white border-b border-neutral-200/80 sticky top-0 z-50 text-xs shadow-xs px-3 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Project Info */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            MF
          </div>
          <div>
            <span className="font-bold text-neutral-900 tracking-tight">MediFind Zambia</span>
            <span className="hidden sm:inline text-neutral-400 text-[11px] ml-1.5">
              · CS Final-Year Project Presentation Prototype
            </span>
          </div>
        </div>

        {/* Prototype Flow Jumpers (Section 20) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-[10px] uppercase font-semibold text-neutral-400 hidden lg:inline mr-1">
            Flows:
          </span>

          <button
            onClick={() => onRunFlow('patient_flow')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              currentRole === 'patient'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
            title="Flow 1: Splash → Age & Safety → Home → Search → Results → Details → Map"
          >
            <User className="w-3 h-3" />
            <span>1. Patient Search</span>
          </button>

          <button
            onClick={() => onRunFlow('pharmacy_flow')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              currentRole === 'pharmacy'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
            title="Flow 2: Pharmacy Login → Dashboard → Inventory → Update Availability"
          >
            <Building2 className="w-3 h-3" />
            <span>2. Pharmacy Portal</span>
          </button>

          <button
            onClick={() => onRunFlow('admin_flow')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              currentRole === 'admin'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
            title="Flow 3: Admin Login → Dashboard → Facility Verification → Reports"
          >
            <Shield className="w-3 h-3" />
            <span>3. Admin Verification</span>
          </button>

          <button
            onClick={() => onRunFlow('restricted_flow')}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100 transition-colors flex items-center gap-1"
            title="Flow 4: Restricted Medicine & Minor Safety Safeguards"
          >
            <Shield className="w-3 h-3 text-amber-600" />
            <span>4. Restricted Check</span>
          </button>

          <button
            onClick={() => onRunFlow('empty_states')}
            className="px-2 py-1 rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-100 transition-colors hidden sm:flex items-center gap-1"
            title="Empty & Error States Showcase"
          >
            <span>Empty States</span>
          </button>
        </div>

        {/* View Frame Toggle: Mobile Frame vs Full Width */}
        <div className="flex items-center gap-1 bg-neutral-100 p-0.5 rounded-lg shrink-0">
          <button
            onClick={onToggleMobileFrame}
            className={`px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-colors ${
              isMobileFrame ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
            }`}
            title="Switch viewport container"
          >
            <Smartphone className="w-3 h-3" />
            <span className="hidden xs:inline">Mobile Frame</span>
          </button>
          <button
            onClick={onToggleMobileFrame}
            className={`px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-colors ${
              !isMobileFrame ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
            }`}
            title="Switch to full screen layout"
          >
            <Monitor className="w-3 h-3" />
            <span className="hidden xs:inline">Responsive</span>
          </button>
        </div>
      </div>
    </div>
  );
};
