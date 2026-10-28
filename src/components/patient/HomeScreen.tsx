import React from 'react';
import { Search, MapPin, Clock, ShieldCheck, ArrowRight, Pill, Building2, History, ChevronRight } from 'lucide-react';
import { Facility, Medicine, FacilityInventoryItem, AccessLevel } from '../../types';

interface HomeScreenProps {
  accessLevel: AccessLevel;
  facilities: Facility[];
  medicines: Medicine[];
  inventory: FacilityInventoryItem[];
  onSelectMedicine: (medicine: Medicine) => void;
  onSelectFacility: (facility: Facility) => void;
  onOpenSearch: (prefill?: string) => void;
  onOpenMap: () => void;
  onOpenSafety: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  accessLevel,
  facilities,
  medicines,
  inventory,
  onSelectMedicine,
  onSelectFacility,
  onOpenSearch,
  onOpenMap,
  onOpenSafety
}) => {
  // Recently searched items specified in prompt
  const recentSearches = ['Paracetamol', 'Amoxicillin', 'ORS'];

  const quickActions = [
    { label: 'Find Medicine', icon: Pill, onClick: () => onOpenSearch() },
    { label: 'Nearby Facilities', icon: Building2, onClick: onOpenMap },
    { label: 'My Searches', icon: History, onClick: () => onOpenSearch() },
    { label: 'Safety Information', icon: ShieldCheck, onClick: onOpenSafety }
  ];

  return (
    <div className="pb-24 px-4 pt-3 max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
            Lusaka Network
          </span>
          <span className="text-[11px] text-neutral-600 font-medium">
            {accessLevel === 'Adult' ? 'Adult Access' : 'Restricted Access'}
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 pt-1">
          Good morning
        </h1>
        <p className="text-sm text-neutral-600">
          What medicine are you looking for?
        </p>
      </div>

      {/* Large Frosted Glass Search Bar */}
      <div className="space-y-1.5">
        <button
          onClick={() => onOpenSearch()}
          className="w-full text-left p-3.5 rounded-2xl glass-card border border-neutral-200/80 shadow-sm flex items-center justify-between group hover:border-emerald-400/60 transition-all active:scale-[0.99]"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-100 group-hover:bg-emerald-50 flex items-center justify-center text-neutral-500 group-hover:text-emerald-700 transition-colors">
              <Search className="w-4 h-4" />
            </div>
            <span className="text-sm font-normal text-neutral-400 group-hover:text-neutral-600">
              Search medicine…
            </span>
          </div>
          <span className="text-xs font-medium text-emerald-700 bg-emerald-50/70 px-2.5 py-1 rounded-lg">
            Search
          </span>
        </button>
        <p className="text-[11px] text-neutral-600 pl-1 font-normal">
          Search by medicine name
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {quickActions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              onClick={action.onClick}
              className="p-3 rounded-2xl bg-white border border-neutral-200/70 hover:border-emerald-300 hover:bg-emerald-50/20 text-left transition-all flex items-center gap-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] active:scale-[0.98]"
            >
              <div className="w-8 h-8 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-emerald-700 shrink-0">
                <Icon className="w-4 h-4 stroke-[1.8]" />
              </div>
              <span className="text-xs font-medium text-neutral-800 truncate">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Section: Recently searched */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
            Recently searched
          </h2>
          <button
            onClick={() => onOpenSearch()}
            className="text-xs text-emerald-700 hover:underline font-medium"
          >
            View all
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {recentSearches.map((item, idx) => {
            const matchedMed = medicines.find(m => m.name.toLowerCase().includes(item.toLowerCase()));
            return (
              <button
                key={idx}
                onClick={() => {
                  if (matchedMed) onSelectMedicine(matchedMed);
                  else onOpenSearch(item);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-neutral-100/80 hover:bg-neutral-200 text-xs font-medium text-neutral-800 transition-colors flex items-center gap-1.5"
              >
                <Search className="w-3 h-3 text-neutral-400" />
                <span>{item}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section: Nearby participating facilities (Horizontal Card Carousel) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-neutral-900 tracking-tight">
              Nearby participating facilities
            </h2>
            <p className="text-[11px] text-neutral-600">
              Verified dispensers in Lusaka
            </p>
          </div>
          <button
            onClick={onOpenMap}
            className="text-xs font-medium text-emerald-700 hover:text-emerald-800 flex items-center gap-0.5"
          >
            <span>Map</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar -mx-4 px-4 snap-x">
          {facilities.slice(0, 4).map((fac) => {
            // Find recent items for this facility
            const facInv = inventory.filter(i => i.facilityId === fac.id);
            const latestMins = facInv.length > 0 ? Math.min(...facInv.map(i => i.lastUpdatedMinutesAgo)) : 15;

            return (
              <div
                key={fac.id}
                onClick={() => onSelectFacility(fac)}
                className="min-w-[240px] max-w-[260px] snap-start shrink-0 rounded-2xl bg-white border border-neutral-200/80 p-4 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-2">
                    <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Participating
                    </span>
                    <span className="text-xs font-medium text-neutral-500 tabular-nums">
                      {fac.distanceKm} km
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-neutral-900 line-clamp-1 mb-1">
                    {fac.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Available medicines</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-neutral-400" />
                    <span>Updated {latestMins} min ago</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Safety Reminder Banner */}
      <div className="rounded-2xl p-4 bg-gradient-to-r from-emerald-50/60 to-teal-50/40 border border-emerald-100 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-xs font-semibold text-neutral-900">
            Responsible Medicine Availability
          </p>
          <p className="text-[11px] text-neutral-600 leading-relaxed">
            MediFind displays facility availability reports. Always consult a qualified healthcare professional or pharmacist for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};
