import React, { useState, useMemo } from 'react';
import { Search, X, AlertCircle, Filter, ArrowRight, ShieldAlert, Sparkles, ChevronRight, Check } from 'lucide-react';
import { Medicine, FacilityInventoryItem, AccessLevel } from '../../types';

interface MedicineSearchScreenProps {
  medicines: Medicine[];
  inventory: FacilityInventoryItem[];
  accessLevel: AccessLevel;
  initialQuery?: string;
  onSelectMedicine: (medicine: Medicine) => void;
  onSelectRestrictedMedicine: (medicine: Medicine) => void;
}

export const MedicineSearchScreen: React.FC<MedicineSearchScreenProps> = ({
  medicines,
  inventory,
  accessLevel,
  initialQuery = '',
  onSelectMedicine,
  onSelectRestrictedMedicine
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedForm, setSelectedForm] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('All');

  const forms = ['All', 'Capsules', 'Tablets', 'Suspension', 'Inhaler', 'Oral Powder/Sachet'];
  const categories = ['All', 'Antibiotic', 'Analgesic', 'Antimalarial', 'Controlled'];

  // Filtered medicines
  const filteredMedicines = useMemo(() => {
    return medicines.filter(med => {
      const matchesText =
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.strength.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (med.brandName && med.brandName.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesForm = selectedForm === 'All' || med.form === selectedForm;
      const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory;

      return matchesText && matchesForm && matchesCategory;
    });
  }, [medicines, searchQuery, selectedForm, selectedCategory]);

  const handlePickMedicine = (med: Medicine) => {
    if (med.isRestricted) {
      onSelectRestrictedMedicine(med);
    } else {
      onSelectMedicine(med);
    }
  };

  return (
    <div className="pb-24 px-4 pt-2 max-w-md mx-auto space-y-4">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-neutral-900">
          Find a medicine
        </h1>
        <p className="text-xs text-neutral-500">
          Check participating facility availability in Lusaka
        </p>
      </div>

      {/* Large Search Field */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search medicine name (e.g. Amoxicillin)…"
          className="w-full pl-10 pr-9 py-3 rounded-2xl glass-card border border-neutral-200/80 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 placeholder:font-normal"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Safety Notice: Name and strength precision */}
      <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-2.5 text-xs text-amber-900 leading-relaxed">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Strength Selection Notice:</span> Ensure you select the exact medicine name and strength specified on your healthcare provider’s prescription or consultation.
        </div>
      </div>

      {/* Quick Filter Bar (Forms) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4">
        {forms.map(form => (
          <button
            key={form}
            onClick={() => setSelectedForm(form)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
              selectedForm === form
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {form === 'All' ? 'All Forms' : form}
          </button>
        ))}
      </div>

      {/* Medicine Suggestions / Results list */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-neutral-500 font-medium">
          <span>{filteredMedicines.length} medicine formulations found</span>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedForm('All');
              }}
              className="text-emerald-700 hover:underline"
            >
              Reset
            </button>
          )}
        </div>

        {filteredMedicines.length === 0 ? (
          <div className="text-center py-10 px-4 rounded-2xl bg-neutral-50/70 border border-neutral-200/60 space-y-2">
            <p className="text-sm font-semibold text-neutral-800">
              No participating facilities reported this medicine.
            </p>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto">
              Try searching with the generic name (e.g. “Amoxicillin” or “Paracetamol”) or check the spelling.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredMedicines.map((med) => {
              // Count facilities with availability
              const medStock = inventory.filter(i => i.medicineId === med.id && (i.status === 'Available' || i.status === 'Low stock'));
              const availCount = medStock.length;

              return (
                <div
                  key={med.id}
                  onClick={() => handlePickMedicine(med)}
                  className="p-3.5 rounded-2xl bg-white border border-neutral-200/80 hover:border-emerald-400/80 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-emerald-800 transition-colors">
                        {med.name} <span className="font-bold text-neutral-950">{med.strength}</span>
                      </h3>
                      {med.isRestricted && (
                        <span className="text-[10px] font-semibold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3 text-amber-700" />
                          Restricted
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-neutral-500 truncate mb-1">
                      {med.form} · {med.genericName}
                    </p>

                    <div className="flex items-center gap-2 text-[11px]">
                      {availCount > 0 ? (
                        <span className="text-emerald-700 font-medium">
                          Reported at {availCount} facility{availCount > 1 ? 'ies' : ''}
                        </span>
                      ) : (
                        <span className="text-neutral-400">
                          Availability unconfirmed
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-neutral-50 group-hover:bg-emerald-50 flex items-center justify-center text-neutral-400 group-hover:text-emerald-700 transition-colors shrink-0">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Suggested Search Prompts */}
      <div className="pt-2">
        <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider block mb-2">
          Frequent searches in Lusaka
        </span>
        <div className="flex flex-wrap gap-1.5">
          {['Amoxicillin 500mg', 'Paracetamol 500mg', 'ORS Oral Powder', 'Coartem 20/120mg', 'Salbutamol Inhaler'].map((name, i) => (
            <button
              key={i}
              onClick={() => {
                const queryBase = name.split(' ')[0];
                setSearchQuery(queryBase);
              }}
              className="text-xs px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors"
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
