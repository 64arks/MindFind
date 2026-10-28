import React from 'react';
import { ShieldCheck, Lock, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AccessLevel } from '../../types';

interface AgeAccessScreenProps {
  age: number;
  accessLevel: AccessLevel;
  onProceedToHome: () => void;
  onChangeDob: () => void;
}

export const AgeAccessScreen: React.FC<AgeAccessScreenProps> = ({
  age,
  accessLevel,
  onProceedToHome,
  onChangeDob
}) => {
  const isAdult = accessLevel === 'Adult';

  return (
    <div className="min-h-[640px] flex flex-col justify-between p-6 bg-white">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Safety Verification
          </span>
          <button
            onClick={onChangeDob}
            className="text-xs text-emerald-700 font-medium hover:underline"
          >
            Change date
          </button>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-1">
          Your access level
        </h2>
        <p className="text-xs text-neutral-500">
          Age verified: <span className="font-semibold text-neutral-800">{age} years</span>
        </p>
      </div>

      {/* Main Access Level Status Card */}
      <div className="my-auto py-4">
        {isAdult ? (
          <div className="glass-card rounded-[24px] p-6 border border-emerald-100 bg-emerald-50/20 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-700">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">
                  Adult access enabled
                </h3>
                <p className="text-xs text-neutral-500">Standard health information directory</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Full access to search participating facilities and general medicine availability in Lusaka.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Verified contact details and physical directions to licensed dispensaries.</span>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>Controlled medicines will always display a professional consultation reminder before dispensing.</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-[24px] p-6 border border-amber-200/80 bg-amber-50/20 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">
                  Restricted access enabled
                </h3>
                <p className="text-xs text-amber-700 font-medium">Youth & student safety mode</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/60 mb-3 text-xs text-amber-900 leading-relaxed">
              <p className="font-semibold mb-1">Some medicine-related features require an adult or healthcare professional.</p>
              <p className="text-amber-800/90">
                To protect your health, prescription-only and controlled medicines require adult guidance.
              </p>
            </div>

            <div className="space-y-2 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
              <div className="flex items-start gap-2">
                <Lock className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                <span>For restricted medicines: <strong className="text-neutral-800 font-medium">Professional assistance required</strong>.</span>
              </div>
              <p className="text-xs text-neutral-500 pl-5">
                “Please speak with a parent/guardian, pharmacist or qualified healthcare professional.”
              </p>
            </div>
          </div>
        )}

        <div className="mt-5 p-3 rounded-xl bg-neutral-50 border border-neutral-200/60 text-[11px] text-neutral-500 text-center leading-relaxed">
          MediFind Zambia promotes rational medicine use under guidance from the Zambia Medicines Regulatory Authority (ZAMRA).
        </div>
      </div>

      {/* Continue Button */}
      <div className="pt-4">
        <button
          onClick={onProceedToHome}
          className="w-full h-12 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all"
        >
          <span>Enter MediFind Zambia</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
