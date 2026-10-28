import React from 'react';
import { ShieldCheck, MessageCircle, AlertTriangle, Building2, Clock, Phone, ChevronRight } from 'lucide-react';
import { Medicine, Facility, FacilityInventoryItem } from '../../types';

interface MedicineDetailsScreenProps {
  medicine: Medicine;
  facilities: Facility[];
  inventory: FacilityInventoryItem[];
  onViewResults: () => void;
  onSelectFacility: (facility: Facility) => void;
  onContactPharmacist: () => void;
}

export const MedicineDetailsScreen: React.FC<MedicineDetailsScreenProps> = ({
  medicine,
  facilities,
  inventory,
  onViewResults,
  onSelectFacility,
  onContactPharmacist
}) => {
  // Calculate availability stats
  const activeStock = inventory.filter(
    i => i.medicineId === medicine.id && (i.status === 'Available' || i.status === 'Low stock')
  );
  const minMins = activeStock.length > 0 ? Math.min(...activeStock.map(i => i.lastUpdatedMinutesAgo)) : 12;

  return (
    <div className="pb-24 px-4 pt-2 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
          {medicine.category}
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 pt-1">
          {medicine.name} {medicine.strength}
        </h1>
        <p className="text-xs text-neutral-500">
          {medicine.form} · Generic: {medicine.genericName}
        </p>
      </div>

      {/* Availability Status Card */}
      <div className="rounded-[24px] glass-card p-4 border border-emerald-100 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Availability
          </span>
          <div className="flex items-center gap-1 text-[11px] text-neutral-500">
            <Clock className="w-3 h-3 text-neutral-400" />
            <span>Updated {minMins} minutes ago</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-base font-bold text-neutral-900">
              Available at {activeStock.length} participating facilit{activeStock.length === 1 ? 'y' : 'ies'}
            </span>
          </div>
        </div>

        <button
          onClick={onViewResults}
          className="w-full h-11 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <span>View Participating Facilities</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Primary Safety Action: "Speak to a pharmacist" */}
      <div className="rounded-[24px] p-4 bg-emerald-50/70 border border-emerald-200/60 space-y-2">
        <div className="flex items-center gap-2 text-emerald-900">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
          <h2 className="text-sm font-bold">Speak to a Pharmacist</h2>
        </div>
        <p className="text-xs text-emerald-800/90 leading-relaxed">
          Need clinical advice on dosage, contraindications, or prescription verification? Connect with an accredited pharmacist in Lusaka.
        </p>
        <button
          onClick={onContactPharmacist}
          className="w-full h-10 rounded-xl bg-white border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-emerald-100/50 transition-colors shadow-xs"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-700" />
          <span>Call Lusaka Pharmacy Helpline</span>
        </button>
      </div>

      {/* General Information */}
      <div className="space-y-3 pt-1">
        <h2 className="text-sm font-semibold text-neutral-900 tracking-tight">
          General information about this medicine
        </h2>

        <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 space-y-3 text-xs leading-relaxed">
          <div>
            <span className="font-semibold text-neutral-700 block mb-0.5">Description:</span>
            <p className="text-neutral-600">{medicine.generalDescription}</p>
          </div>

          <div className="pt-2 border-t border-neutral-100">
            <span className="font-semibold text-neutral-700 block mb-0.5">Active Ingredients:</span>
            <p className="text-neutral-600">{medicine.activeIngredients}</p>
          </div>

          <div className="pt-2 border-t border-neutral-100">
            <span className="font-semibold text-neutral-700 block mb-0.5">Therapeutic Class:</span>
            <p className="text-neutral-600">{medicine.therapeuticClass}</p>
          </div>
        </div>
      </div>

      {/* Important Safety Message (Strict Non-Diagnosis Rule) */}
      <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 flex items-start gap-3 text-xs text-amber-950 leading-relaxed">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">Important Safety Notice</p>
          <p className="text-amber-900/90">
            “Medicine information is provided for educational purposes and does not replace advice from a qualified healthcare professional.”
          </p>
          <p className="text-[11px] text-amber-800 pt-1">
            MediFind Zambia does not diagnose illnesses or recommend specific medications for individuals.
          </p>
        </div>
      </div>
    </div>
  );
};
