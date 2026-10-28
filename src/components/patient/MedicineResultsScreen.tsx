import React from 'react';
import { Clock, MapPin, Navigation, Info, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';
import { Medicine, Facility, FacilityInventoryItem, AvailabilityStatus } from '../../types';

interface MedicineResultsScreenProps {
  medicine: Medicine;
  facilities: Facility[];
  inventory: FacilityInventoryItem[];
  onViewFacility: (facility: Facility) => void;
  onGetDirections: (facility: Facility) => void;
  onViewMedicineInfo: (medicine: Medicine) => void;
}

export const MedicineResultsScreen: React.FC<MedicineResultsScreenProps> = ({
  medicine,
  facilities,
  inventory,
  onViewFacility,
  onGetDirections,
  onViewMedicineInfo
}) => {
  // Join inventory with facilities for this medicine
  const facilityResults = facilities.map(fac => {
    const invItem = inventory.find(i => i.facilityId === fac.id && i.medicineId === medicine.id);
    return {
      facility: fac,
      invItem: invItem || null,
      status: (invItem ? invItem.status : 'Not recently confirmed') as AvailabilityStatus,
      lastUpdatedMinutesAgo: invItem ? invItem.lastUpdatedMinutesAgo : 360,
      quantityOptional: invItem?.quantityOptional,
      unit: invItem?.unit
    };
  }).sort((a, b) => {
    // Sort by status priority: Available > Low stock > Not recently confirmed > Out of stock
    const score = (st: AvailabilityStatus) => {
      if (st === 'Available') return 1;
      if (st === 'Low stock') return 2;
      if (st === 'Not recently confirmed') return 3;
      return 4;
    };
    return score(a.status) - score(b.status) || a.facility.distanceKm - b.facility.distanceKm;
  });

  const getStatusBadge = (status: AvailabilityStatus) => {
    switch (status) {
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Available
          </span>
        );
      case 'Low stock':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200/70 px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Low stock
          </span>
        );
      case 'Not recently confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 bg-neutral-100 border border-neutral-200/70 px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-neutral-400" />
            Not recently confirmed
          </span>
        );
      case 'Out of stock':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-800 bg-rose-50 border border-rose-200/70 px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            Out of stock
          </span>
        );
    }
  };

  const formatUpdatedTime = (minutes: number) => {
    if (minutes < 60) return `Updated ${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    return `Last updated ${hours} hour${hours > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="pb-24 px-4 pt-2 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight text-neutral-900">
            {medicine.name} {medicine.strength}
          </h1>
          <button
            onClick={() => onViewMedicineInfo(medicine)}
            className="text-xs text-emerald-700 font-semibold flex items-center gap-1 hover:underline p-1"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Medicine info</span>
          </button>
        </div>
        <p className="text-xs text-neutral-500">
          Availability at participating facilities in Lusaka
        </p>
      </div>

      {/* Freshness transparency banner */}
      <div className="p-3 rounded-2xl bg-neutral-100/70 border border-neutral-200/80 text-[11px] text-neutral-600 flex items-start gap-2">
        <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
        <span>
          Availability data is reported directly by facilities. Please check the <strong>last updated timestamp</strong> on each card before traveling.
        </span>
      </div>

      {/* Facility Cards List */}
      <div className="space-y-3">
        {facilityResults.map(({ facility, status, lastUpdatedMinutesAgo, quantityOptional, unit }) => (
          <div
            key={facility.id}
            className="rounded-[24px] bg-white border border-neutral-200/90 p-4 shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between gap-3"
          >
            {/* Top row: Name, distance, verified badge */}
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 tracking-tight">
                    {facility.name}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {facility.address}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-semibold text-neutral-800 tabular-nums">
                    {facility.distanceKm} km away
                  </span>
                  <p className="text-[10px] text-neutral-400">
                    {facility.isOpenNow ? 'Open now' : 'Closed'}
                  </p>
                </div>
              </div>

              {/* Status and timestamp */}
              <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-neutral-100 flex-wrap gap-2">
                <div>
                  {getStatusBadge(status)}
                  {quantityOptional !== undefined && quantityOptional > 0 && (
                    <span className="ml-2 text-[11px] text-neutral-500">
                      (~{quantityOptional} {unit || 'units'})
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-[11px] text-neutral-500">
                  <Clock className="w-3 h-3 text-neutral-400" />
                  <span className={lastUpdatedMinutesAgo > 180 ? 'text-amber-700 font-medium' : ''}>
                    {formatUpdatedTime(lastUpdatedMinutesAgo)}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => onViewFacility(facility)}
                className="h-10 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View</span>
              </button>

              <button
                onClick={() => onGetDirections(facility)}
                className="h-10 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Directions</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
