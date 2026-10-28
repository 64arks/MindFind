import React from 'react';
import { Bookmark, Building2, Pill, ChevronRight, Clock, Trash2 } from 'lucide-react';
import { Facility, Medicine, FacilityInventoryItem } from '../../types';

interface SavedScreenProps {
  savedFacilityIds: string[];
  facilities: Facility[];
  medicines: Medicine[];
  inventory: FacilityInventoryItem[];
  onSelectFacility: (facility: Facility) => void;
  onSelectMedicine: (medicine: Medicine) => void;
  onRemoveSavedFacility: (id: string) => void;
}

export const SavedScreen: React.FC<SavedScreenProps> = ({
  savedFacilityIds,
  facilities,
  medicines,
  inventory,
  onSelectFacility,
  onSelectMedicine,
  onRemoveSavedFacility
}) => {
  const savedFacs = facilities.filter(f => savedFacilityIds.includes(f.id));

  // Common quick medicines
  const pinnedMedicines = medicines.slice(0, 3);

  return (
    <div className="pb-24 px-4 pt-2 max-w-md mx-auto space-y-4">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-neutral-900">
          Saved Items
        </h1>
        <p className="text-xs text-neutral-500">
          Quick access to your regular pharmacies and medicines
        </p>
      </div>

      {/* Saved Facilities */}
      <div className="space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 pl-1">
          Saved Facilities ({savedFacs.length})
        </h2>

        {savedFacs.length === 0 ? (
          <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 text-center space-y-1">
            <p className="text-xs font-semibold text-neutral-700">No saved facilities yet</p>
            <p className="text-[11px] text-neutral-400">
              Tap the bookmark icon on any facility page to keep track of local dispensaries.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {savedFacs.map((fac) => (
              <div
                key={fac.id}
                className="p-3.5 rounded-2xl bg-white border border-neutral-200/80 hover:border-emerald-300 transition-all flex items-center justify-between gap-2 shadow-xs group"
              >
                <div
                  onClick={() => onSelectFacility(fac)}
                  className="flex-1 min-w-0 cursor-pointer"
                >
                  <h3 className="text-xs font-bold text-neutral-900 group-hover:text-emerald-800 transition-colors">
                    {fac.name}
                  </h3>
                  <p className="text-[11px] text-neutral-500 truncate">
                    {fac.address}
                  </p>
                  <span className="text-[10px] text-emerald-700 font-medium">
                    {fac.distanceKm} km away · Open
                  </span>
                </div>

                <button
                  onClick={() => onRemoveSavedFacility(fac.id)}
                  className="w-8 h-8 rounded-full text-neutral-300 hover:text-rose-600 hover:bg-neutral-50 flex items-center justify-center transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Frequently Monitored Formulations */}
      <div className="space-y-2 pt-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 pl-1">
          Frequently Monitored Formulations
        </h2>

        <div className="space-y-2">
          {pinnedMedicines.map(med => (
            <div
              key={med.id}
              onClick={() => onSelectMedicine(med)}
              className="p-3 rounded-2xl bg-white border border-neutral-200/80 hover:border-emerald-300 transition-all flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-emerald-700">
                  <Pill className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-neutral-900">
                    {med.name} {med.strength}
                  </h4>
                  <p className="text-[10px] text-neutral-400">{med.form}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
