import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Building2, ChevronRight, Layers, ZoomIn, ZoomOut, Compass } from 'lucide-react';
import { Facility, Medicine, FacilityInventoryItem, AvailabilityStatus } from '../../types';

interface MapScreenProps {
  facilities: Facility[];
  inventory: FacilityInventoryItem[];
  selectedMedicine?: Medicine | null;
  onSelectFacility: (facility: Facility) => void;
  onGetDirections: (facility: Facility) => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({
  facilities,
  inventory,
  selectedMedicine,
  onSelectFacility,
  onGetDirections
}) => {
  const [activeFacilityId, setActiveFacilityId] = useState<string>(facilities[0]?.id || 'fac-woodlands');
  const [selectedArea, setSelectedArea] = useState<string>('All');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const activeFacility = facilities.find(f => f.id === activeFacilityId) || facilities[0];

  // Areas in Lusaka
  const areas = ['All', 'Woodlands', 'Cairo Road', 'Kabulonga', 'Ridgeway', 'Northmead', 'Chelstone'];

  // Calculate status for each facility relative to selected medicine or general stock
  const getFacilityStatus = (facility: Facility): { status: AvailabilityStatus; updateTime: string; medicineName: string } => {
    if (selectedMedicine) {
      const inv = inventory.find(i => i.facilityId === facility.id && i.medicineId === selectedMedicine.id);
      if (inv) {
        return {
          status: inv.status,
          updateTime: `${inv.lastUpdatedMinutesAgo} min ago`,
          medicineName: `${selectedMedicine.name} ${selectedMedicine.strength}`
        };
      }
      return {
        status: 'Not recently confirmed',
        updateTime: '4 hours ago',
        medicineName: `${selectedMedicine.name} ${selectedMedicine.strength}`
      };
    }

    // Default to Amoxicillin 500mg as reference
    const amoxInv = inventory.find(i => i.facilityId === facility.id && i.medicineId === 'med-amox-500');
    if (amoxInv) {
      return {
        status: amoxInv.status,
        updateTime: `${amoxInv.lastUpdatedMinutesAgo} min ago`,
        medicineName: 'Amoxicillin 500mg'
      };
    }

    return {
      status: 'Available',
      updateTime: '15 min ago',
      medicineName: 'Essential Medicines'
    };
  };

  const activeDetails = getFacilityStatus(activeFacility);

  const filteredFacilities = selectedArea === 'All'
    ? facilities
    : facilities.filter(f => f.area === selectedArea);

  // Approximate relative 2D positions for Lusaka geography map representation
  const getMarkerPosition = (facId: string) => {
    switch (facId) {
      case 'fac-cairo': // Central Lusaka
        return { left: '38%', top: '48%' };
      case 'fac-northmead': // North along Great East Rd
        return { left: '46%', top: '28%' };
      case 'fac-ridgeway': // Near UTH / Nationalist Rd
        return { left: '48%', top: '56%' };
      case 'fac-woodlands': // South-East
        return { left: '68%', top: '65%' };
      case 'fac-kabulonga': // East / South-East
        return { left: '72%', top: '44%' };
      case 'fac-chelstone': // North-East
        return { left: '84%', top: '22%' };
      default:
        return { left: '50%', top: '50%' };
    }
  };

  const getStatusColor = (status: AvailabilityStatus) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-500 border-white ring-2 ring-emerald-400/40 text-white';
      case 'Low stock':
        return 'bg-amber-500 border-white ring-2 ring-amber-400/40 text-white';
      case 'Not recently confirmed':
      default:
        return 'bg-neutral-400 border-white ring-2 ring-neutral-300 text-white';
    }
  };

  return (
    <div className="relative h-[calc(100vh-140px)] min-h-[580px] w-full max-w-md mx-auto overflow-hidden bg-neutral-100 flex flex-col justify-between">
      {/* Top Floating Area & Filter bar */}
      <div className="absolute top-3 left-3 right-3 z-20 space-y-2 pointer-events-auto">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {areas.map(area => (
            <button
              key={area}
              onClick={() => setSelectedArea(area)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shadow-xs backdrop-blur-md transition-all ${
                selectedArea === area
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white/90 text-neutral-700 hover:bg-white border border-neutral-200/80'
              }`}
            >
              {area === 'All' ? 'All Lusaka' : area}
            </button>
          ))}
        </div>

        {/* Legend pill */}
        <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-neutral-200/80 text-[11px] text-neutral-600 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Reported
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Low stock
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-neutral-400" /> Unconfirmed
            </span>
          </div>
          <span className="text-[10px] text-neutral-400 font-medium">Lusaka</span>
        </div>
      </div>

      {/* Interactive Minimal Vector Map Canvas */}
      <div className="relative w-full h-full bg-[#f3f4f6] overflow-hidden flex items-center justify-center select-none">
        {/* Vector SVG Roadmap of Lusaka */}
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full object-cover transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Subtle grid and terrain */}
          <rect width="500" height="500" fill="#f8fafc" />
          <path d="M 0,220 Q 250,230 500,210" stroke="#e2e8f0" strokeWidth="8" fill="none" />
          <path d="M 190,0 Q 200,250 180,500" stroke="#e2e8f0" strokeWidth="8" fill="none" />

          {/* Major Lusaka Roads */}
          {/* Great East Road (T4 highway running east-northeast toward Chelstone / Airport) */}
          <path
            d="M 180,240 L 260,200 L 480,100"
            stroke="#cbd5e1"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <text x="320" y="150" fill="#94a3b8" fontSize="9" fontWeight="600">Great East Rd</text>

          {/* Cairo Road & CBD Core */}
          <path
            d="M 180,120 L 190,240 L 200,340"
            stroke="#cbd5e1"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <text x="140" y="240" fill="#94a3b8" fontSize="9" fontWeight="600">Cairo Rd (CBD)</text>

          {/* Independence Avenue towards Woodlands & Ridgeway */}
          <path
            d="M 190,260 L 260,300 L 360,350 L 440,380"
            stroke="#cbd5e1"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <text x="270" y="325" fill="#94a3b8" fontSize="9" fontWeight="600">Independence Ave</text>

          {/* Addis Ababa Drive */}
          <path
            d="M 230,160 L 250,280"
            stroke="#e2e8f0"
            strokeWidth="4"
            fill="none"
          />

          {/* Mosi-o-Tunya Road in Woodlands */}
          <path
            d="M 330,300 L 350,420"
            stroke="#e2e8f0"
            strokeWidth="4"
            fill="none"
          />
          <text x="360" y="390" fill="#94a3b8" fontSize="8" fontWeight="500">Mosi-o-Tunya Rd</text>

          {/* Area Labels */}
          <text x="170" y="200" fill="#64748b" fontSize="11" fontWeight="700">Central Lusaka</text>
          <text x="240" y="290" fill="#64748b" fontSize="10" fontWeight="600">Ridgeway (UTH)</text>
          <text x="320" y="360" fill="#64748b" fontSize="10" fontWeight="600">Woodlands</text>
          <text x="350" y="240" fill="#64748b" fontSize="10" fontWeight="600">Kabulonga</text>
          <text x="220" y="140" fill="#64748b" fontSize="10" fontWeight="600">Northmead</text>
          <text x="410" y="110" fill="#64748b" fontSize="10" fontWeight="600">Chelstone</text>
        </svg>

        {/* Map Markers Overlay */}
        {filteredFacilities.map(fac => {
          const pos = getMarkerPosition(fac.id);
          const st = getFacilityStatus(fac);
          const isSelected = fac.id === activeFacilityId;

          return (
            <button
              key={fac.id}
              onClick={() => setActiveFacilityId(fac.id)}
              style={{ left: pos.left, top: pos.top }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform ${
                isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-10'
              }`}
              title={fac.name}
            >
              <div
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shadow-md transition-all ${
                  getStatusColor(st.status)
                } ${isSelected ? 'ring-4 ring-neutral-900/30 ring-offset-2' : ''}`}
              >
                <Building2 className="w-3.5 h-3.5 text-white" />
              </div>
              {isSelected && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-neutral-900 text-white text-[10px] font-semibold whitespace-nowrap shadow-md pointer-events-none">
                  {fac.name.split(' ')[0]}
                </div>
              )}
            </button>
          );
        })}

        {/* Map Zoom & Orientation Controls */}
        <div className="absolute right-3 top-20 flex flex-col gap-1.5 z-20">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 1.8))}
            className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-md border border-neutral-200/80 flex items-center justify-center text-neutral-700 shadow-sm active:scale-95 hover:bg-white"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.9))}
            className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-md border border-neutral-200/80 flex items-center justify-center text-neutral-700 shadow-sm active:scale-95 hover:bg-white"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Bottom Frosted-Glass Facility Card */}
      <div className="p-3 z-20 pointer-events-auto">
        <div className="glass-card rounded-[24px] p-4 border border-neutral-200/90 shadow-lg space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {activeFacility.type}
                </span>
                <span className="text-xs text-neutral-500 tabular-nums">
                  {activeFacility.distanceKm} km away
                </span>
              </div>
              <h3 className="text-sm font-bold text-neutral-900 tracking-tight">
                {activeFacility.name}
              </h3>
              <p className="text-xs text-neutral-500 truncate">
                {activeFacility.address}
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full inline-block ${
                activeDetails.status === 'Available'
                  ? 'bg-emerald-100 text-emerald-800'
                  : activeDetails.status === 'Low stock'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-neutral-100 text-neutral-700'
              }`}>
                {activeDetails.status}
              </span>
              <p className="text-[10px] text-neutral-400 mt-1 flex items-center justify-end gap-1">
                <Clock className="w-3 h-3" />
                <span>Updated {activeDetails.updateTime}</span>
              </p>
            </div>
          </div>

          <p className="text-xs text-neutral-600 font-medium">
            {activeDetails.medicineName} — <span className="font-semibold">{activeDetails.status}</span>
          </p>

          <p className="text-[10px] text-neutral-600 italic">
            * Green status indicates reported availability, not a guaranteed reservation.
          </p>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => onSelectFacility(activeFacility)}
              className="h-10 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
            >
              <span>View Facility</span>
            </button>

            <button
              onClick={() => onGetDirections(activeFacility)}
              className="h-10 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Directions</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
