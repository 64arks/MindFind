import React, { useState } from 'react';
import { Calendar, Shield, Lock, ArrowRight, Info } from 'lucide-react';

interface AgeSafetyOnboardingProps {
  onContinue: (dob: string, age: number) => void;
  onSkipToAdult?: () => void;
}

export const AgeSafetyOnboarding: React.FC<AgeSafetyOnboardingProps> = ({
  onContinue,
  onSkipToAdult
}) => {
  // Default to a typical adult date of birth for smooth demonstration, but fully editable
  const [dob, setDob] = useState('1998-05-14');
  const [error, setError] = useState<string | null>(null);

  const calculateAge = (birthDateString: string): number => {
    const today = new Date(2026, 8, 22); // Current app date: Sept 22, 2026
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleProceed = () => {
    if (!dob) {
      setError('Please select or enter your date of birth.');
      return;
    }
    const age = calculateAge(dob);
    if (isNaN(age) || age < 0 || age > 120) {
      setError('Please provide a valid date of birth.');
      return;
    }
    setError(null);
    onContinue(dob, age);
  };

  const setPreset = (year: number) => {
    setDob(`${year}-06-15`);
    setError(null);
  };

  return (
    <div className="min-h-[640px] flex flex-col justify-between p-6 bg-white">
      {/* Top Header */}
      <div className="pt-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center text-emerald-700 mb-5">
          <Shield className="w-6 h-6 stroke-[1.8]" />
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 mb-3">
          Healthcare information, safely.
        </h2>

        <p className="text-sm text-neutral-600 leading-relaxed">
          MediFind helps you find medicine availability at participating facilities. It does not diagnose conditions or replace professional medical advice.
        </p>
      </div>

      {/* Main Card with Date of Birth & Quick test toggles */}
      <div className="my-auto py-6">
        <div className="glass-card rounded-[24px] p-5 border border-neutral-200/70 shadow-sm">
          <label className="block text-xs font-semibold text-neutral-800 mb-2">
            Date of Birth
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
              <Calendar className="w-4 h-4" />
            </div>
            <input
              type="date"
              value={dob}
              onChange={(e) => {
                setDob(e.target.value);
                setError(null);
              }}
              max="2026-09-22"
              min="1920-01-01"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-50/80 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm text-neutral-900 font-medium transition-all"
            />
          </div>

          {error && <p className="text-xs text-rose-600 mt-2 font-medium">{error}</p>}

          {/* Quick presets to test Adult (28) vs Minor (15) */}
          <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
            <span className="text-neutral-500">Quick test age:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPreset(1998)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  dob.startsWith('1998')
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Adult (28 yrs)
              </button>
              <button
                type="button"
                onClick={() => setPreset(2011)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  dob.startsWith('2011')
                    ? 'bg-amber-100 text-amber-900 font-semibold'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                Minor (15 yrs)
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2.5 px-2 text-xs text-neutral-600 leading-relaxed">
          <Info className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
          <span>
            We verify age to ensure appropriate guidance for controlled and prescription-only medicines in accordance with Zambian health guidelines.
          </span>
        </div>
      </div>

      {/* Footer & Privacy message */}
      <div className="pt-4 flex flex-col gap-3.5">
        <button
          onClick={handleProceed}
          className="w-full h-12 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 justify-center text-[11px] text-neutral-600 text-center px-2">
          <Lock className="w-3 h-3 text-neutral-400 shrink-0" />
          <span>Your personal information is protected and only used where necessary for account and safety features.</span>
        </div>
      </div>
    </div>
  );
};
