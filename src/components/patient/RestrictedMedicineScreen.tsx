import React from 'react';
import { Lock, Phone, Building2, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { Medicine, AccessLevel } from '../../types';

interface RestrictedMedicineScreenProps {
  medicine: Medicine;
  accessLevel: AccessLevel;
  onContactPharmacist: () => void;
  onFindFacilities: () => void;
  onViewSafetyInfo: () => void;
  onBack: () => void;
}

export const RestrictedMedicineScreen: React.FC<RestrictedMedicineScreenProps> = ({
  medicine,
  accessLevel,
  onContactPharmacist,
  onFindFacilities,
  onViewSafetyInfo,
  onBack
}) => {
  const isMinor = accessLevel === 'Restricted';

  return (
    <div className="pb-24 px-4 pt-2 max-w-md mx-auto space-y-4">
      {/* Back button link */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-900 font-medium"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to search</span>
      </button>

      {/* Header Container */}
      <div className="p-5 rounded-[24px] bg-neutral-50/80 border border-neutral-200/90 space-y-3">
        <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-700">
          <Lock className="w-5 h-5 stroke-[1.8]" />
        </div>

        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800">
            Regulated Schedule
          </span>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900 mt-0.5">
            Professional assistance required
          </h1>
          <p className="text-xs font-semibold text-neutral-700 mt-1">
            {medicine.name} {medicine.strength}
          </p>
        </div>

        {/* Message */}
        <p className="text-xs text-neutral-600 leading-relaxed pt-1">
          This medicine may have additional age, prescription or professional-use requirements under Zambian pharmaceutical regulations.
        </p>

        {/* Minor Specific Message */}
        {isMinor && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/60 text-xs text-amber-900 font-medium leading-relaxed">
            Please speak with a parent/guardian or qualified healthcare professional. Minors cannot independently request or obtain controlled medicines.
          </div>
        )}
      </div>

      {/* Regulatory Context (ZAMRA) */}
      <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 space-y-2 text-xs text-neutral-600 leading-relaxed">
        <div className="flex items-center gap-1.5 text-neutral-800 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Statutory Protection Notice</span>
        </div>
        <p>
          Controlled medications and high-potency antimicrobials require an authentic paper or validated electronic prescription signed by a registered clinician. Pharmacists are legally obligated to verify credentials before dispensing.
        </p>
      </div>

      {/* Recommended Responsible Actions */}
      <div className="space-y-2.5 pt-2">
        <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider pl-1">
          Available Safety Actions
        </h2>

        <button
          onClick={onContactPharmacist}
          className="w-full p-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center justify-between shadow-xs transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Contact a Pharmacist</span>
          </div>
          <span className="text-[11px] text-neutral-400">Direct call</span>
        </button>

        <button
          onClick={onFindFacilities}
          className="w-full p-3.5 rounded-2xl bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs font-semibold flex items-center justify-between shadow-xs transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Building2 className="w-4 h-4 text-emerald-700" />
            <span>Find a Participating Facility</span>
          </div>
          <span className="text-[11px] text-neutral-500">Lusaka clinics</span>
        </button>

        <button
          onClick={onViewSafetyInfo}
          className="w-full p-3.5 rounded-2xl bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs font-semibold flex items-center justify-between shadow-xs transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-neutral-600" />
            <span>Safety Information</span>
          </div>
          <span className="text-[11px] text-neutral-500">Guidelines</span>
        </button>
      </div>
    </div>
  );
};
