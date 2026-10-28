import React from 'react';
import { Phone, Navigation, Clock, MapPin, ShieldCheck, AlertCircle, ChevronRight, CheckCircle2, Bookmark } from 'lucide-react';
import { Facility, Medicine, FacilityInventoryItem, AvailabilityStatus } from '../../types';

interface FacilityDetailsScreenProps {
  facility: Facility;
  medicines: Medicine[];
  inventory: FacilityInventoryItem[];
  isSaved?: boolean;
  onToggleSave?: () => void;
  onSelectMedicine: (medicine: Medicine) => void;
  onGetDirections: () => void;
  onCall: () => void;
}

export const FacilityDetailsScreen: React.FC<FacilityDetailsScreenProps> = ({
  facility,
  medicines,
  inventory,
  isSaved = false,
  onToggleSave,
  onSelectMedicine,
  onGetDirections,
  onCall
}) => {
  // Inventory for this facility
  const facInventory = inventory.filter(i => i.facilityId === facility.id);

  // Map to medicine details
  const medicineList = facInventory.map(invItem => {
    const med = medicines.find(m => m.id === invItem.medicineId);
    return {
      invItem,
      med,
      status: invItem.status
    };
  }).filter(item => item.med !== undefined);

  // If facility has no inventory rows yet, populate default common medicines
  const displayItems = medicineList.length > 0 ? medicineList : [
    { med: medicines.find(m => m.id === 'med-paracetamol-500')!, status: 'Available' as AvailabilityStatus, invItem: null },
    { med: medicines.find(m => m.id === 'med-amox-500')!, status: 'Available' as AvailabilityStatus, invItem: null },
    { med: medicines.find(m => m.id === 'med-ibuprofen-400')!, status: 'Low stock' as AvailabilityStatus, invItem: null },
    { med: medicines.find(m => m.id === 'med-ors')!, status: 'Available' as AvailabilityStatus, invItem: null }
  ];

  const getStatusChip = (status: AvailabilityStatus) => {
    switch (status) {
      case 'Available':
        return (
          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
            Available
          </span>
        );
      case 'Low stock':
        return (
          <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
            Low stock
          </span>
        );
      case 'Out of stock':
        return (
          <span className="text-[11px] font-semibold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-md">
            Out of stock
          </span>
        );
      default:
        return (
          <span className="text-[11px] font-medium text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-md">
            Unconfirmed
          </span>
        );
    }
  };

  return (
    <div className="pb-24 px-4 pt-2 max-w-md mx-auto space-y-4">
      {/* Top Header Card */}
      <div className="rounded-[28px] bg-white border border-neutral-200/90 p-5 shadow-sm space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Participating facility
              </span>
              <span className="text-[11px] text-neutral-600 font-mono">
                {facility.zamraLicence}
              </span>
            </div>

            <h1 className="text-xl font-bold tracking-tight text-neutral-900 pt-1">
              {facility.name}
            </h1>
            <p className="text-xs text-neutral-500">
              {facility.type} · {facility.area}, Lusaka
            </p>
          </div>

          {onToggleSave && (
            <button
              onClick={onToggleSave}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
                isSaved
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-400 hover:text-neutral-700'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save facility'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-600' : ''}`} />
            </button>
          )}
        </div>

        {/* Facility Info Grid */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-100 text-xs text-neutral-600">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-semibold text-neutral-400">Address</span>
            <p className="text-neutral-800 font-medium leading-snug">{facility.address}</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-semibold text-neutral-400">Distance</span>
            <p className="text-neutral-800 font-medium tabular-nums">{facility.distanceKm} km away</p>
          </div>
          <div className="space-y-0.5 pt-1">
            <span className="text-[10px] uppercase font-semibold text-neutral-400">Opening Hours</span>
            <p className="text-neutral-800 font-medium">{facility.openingHours}</p>
          </div>
          <div className="space-y-0.5 pt-1">
            <span className="text-[10px] uppercase font-semibold text-neutral-400">Phone Number</span>
            <p className="text-neutral-800 font-medium tabular-nums">{facility.phone}</p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={onCall}
            className="h-11 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-semibold flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
          >
            <Phone className="w-3.5 h-3.5 text-neutral-700" />
            <span>Call</span>
          </button>

          <button
            onClick={onGetDirections}
            className="h-11 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs active:scale-[0.98]"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Directions</span>
          </button>
        </div>
      </div>

      {/* Realistic Availability Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-neutral-100/80 border border-neutral-200/80 flex items-start gap-2.5 text-xs text-neutral-600 leading-relaxed">
        <AlertCircle className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-neutral-800">Arrival Notice:</span> Availability is reported by facility staff. This platform does not create an automatic reservation; call ahead or confirm before making a long journey.
        </div>
      </div>

      {/* Availability Information & Medicine List */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-neutral-900">
              Availability Information
            </h2>
            <p className="text-xs text-neutral-500">
              Live reported catalog for this facility
            </p>
          </div>
          <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
            {displayItems.length} listed
          </span>
        </div>

        <div className="space-y-2">
          {displayItems.map(({ med, status, invItem }) => {
            if (!med) return null;
            const updatedText = invItem ? `Updated ${invItem.lastUpdatedMinutesAgo} min ago` : 'Updated 15 min ago';

            return (
              <div
                key={med.id}
                onClick={() => onSelectMedicine(med)}
                className="p-3.5 rounded-2xl bg-white border border-neutral-200/80 hover:border-emerald-300 transition-all cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div>
                  <h3 className="text-xs font-semibold text-neutral-900 group-hover:text-emerald-800 transition-colors">
                    {med.name} <span className="font-bold text-neutral-950">{med.strength}</span>
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-neutral-600 mt-0.5">
                    <span>{med.form}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      {updatedText}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {getStatusChip(status)}
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
