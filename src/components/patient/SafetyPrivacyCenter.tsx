import React from 'react';
import { ShieldCheck, Lock, AlertTriangle, FileText, ChevronRight, AlertCircle, HeartHandshake, EyeOff } from 'lucide-react';
import { AccessLevel } from '../../types';

interface SafetyPrivacyCenterProps {
  accessLevel: AccessLevel;
  onOpenReport: () => void;
  onOpenRestrictedInfo?: () => void;
}

export const SafetyPrivacyCenter: React.FC<SafetyPrivacyCenterProps> = ({
  accessLevel,
  onOpenReport,
  onOpenRestrictedInfo
}) => {
  return (
    <div className="pb-24 px-4 pt-2 max-w-md mx-auto space-y-4">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-xl font-bold tracking-tight text-neutral-900">
          Safety & Privacy
        </h1>
        <p className="text-xs text-neutral-500">
          Responsible healthcare information standards
        </p>
      </div>

      {/* Core Principle Notice */}
      <div className="p-4 rounded-[24px] bg-emerald-50/70 border border-emerald-200/70 space-y-2">
        <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>Core Healthcare Principle</span>
        </div>
        <div className="space-y-1.5 text-xs text-emerald-900 leading-relaxed">
          <p className="font-semibold">
            “MediFind does not diagnose illnesses or prescribe medicines.”
          </p>
          <p className="text-emerald-800/90">
            “Always consult an appropriate healthcare professional for medical advice.”
          </p>
        </div>
      </div>

      {/* Section 1: Age Restrictions */}
      <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 space-y-2">
        <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs">
          <Lock className="w-4 h-4 text-emerald-600" />
          <span>Age Restrictions & Minor Safety</span>
        </div>
        <p className="text-xs text-neutral-600 leading-relaxed">
          MediFind applies safety gating based on age verification. Minors are strictly prohibited from independently requesting or reserving controlled substances. Restricted pharmaceuticals require adult presence or direct clinical oversight.
        </p>
      </div>

      {/* Section 2: Medicine Safety & Anti-Microbial Resistance */}
      <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 space-y-2">
        <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs">
          <AlertCircle className="w-4 h-4 text-emerald-600" />
          <span>Medicine Safety & Rational Use</span>
        </div>
        <p className="text-xs text-neutral-600 leading-relaxed">
          Antibiotics (such as Amoxicillin) must only be taken when prescribed by licensed prescribers. Self-treatment or sharing unfinished prescriptions contributes to antimicrobial resistance in our communities.
        </p>
      </div>

      {/* Section 3: Professional Advice */}
      <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 space-y-2">
        <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs">
          <HeartHandshake className="w-4 h-4 text-emerald-600" />
          <span>Professional Advice First</span>
        </div>
        <p className="text-xs text-neutral-600 leading-relaxed">
          All medicine stock records are informational directories. A pharmacist at the dispensing facility conducts final clinical checks regarding contraindications, allergies, and appropriate dosage forms.
        </p>
      </div>

      {/* Section 4: Privacy & Data Protection */}
      <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 space-y-2">
        <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs">
          <EyeOff className="w-4 h-4 text-emerald-600" />
          <span>Privacy & Data Protection</span>
        </div>
        <p className="text-xs text-neutral-600 leading-relaxed">
          In alignment with Zambian Data Protection Act (2021), MediFind Zambia processes minimal demographic data. Search queries are not linked to identifiable medical histories or shared with third-party advertisers.
        </p>
      </div>

      {/* Action: Report Incorrect Availability */}
      <div className="p-4 rounded-2xl bg-neutral-900 text-white space-y-2.5">
        <div className="flex items-center gap-2 font-semibold text-xs">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>Discrepancy Reporting</span>
        </div>
        <p className="text-xs text-neutral-300 leading-relaxed">
          Did you visit a facility and find that availability did not match the reported information? Help us maintain network integrity.
        </p>
        <button
          onClick={onOpenReport}
          className="w-full h-10 rounded-xl bg-white text-neutral-900 text-xs font-semibold hover:bg-neutral-100 flex items-center justify-center gap-1.5 transition-colors"
        >
          <span>Report incorrect availability</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
