import React, { useState } from 'react';
import { X, Navigation, Car, Bus, Footprints, MapPin, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Facility } from '../../types';

interface DirectionsModalProps {
  facility: Facility;
  onClose: () => void;
}

export const DirectionsModal: React.FC<DirectionsModalProps> = ({ facility, onClose }) => {
  const [transitMode, setTransitMode] = useState<'car' | 'bus' | 'walk'>('car');

  const timeEstimates = {
    car: Math.max(5, Math.round(facility.distanceKm * 2.8)),
    bus: Math.max(10, Math.round(facility.distanceKm * 4.2)),
    walk: Math.round(facility.distanceKm * 14)
  };

  const routeSteps = [
    { text: 'Start from your current Lusaka location', subtext: 'Head towards the nearest main avenue' },
    { text: `Follow signs along ${facility.area} arterial link towards ${facility.address.split(',')[0]}`, subtext: 'Continue for approximately ' + (facility.distanceKm * 0.7).toFixed(1) + ' km' },
    { text: `Turn into ${facility.address}`, subtext: `Arrive at ${facility.name} (ZAMRA premises)` }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-neutral-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-t-[32px] sm:rounded-[28px] p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900">Directions</h2>
              <p className="text-xs text-neutral-500">{facility.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Transit Mode Selector */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-neutral-100 rounded-2xl">
          <button
            onClick={() => setTransitMode('car')}
            className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              transitMode === 'car' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>{timeEstimates.car} min</span>
          </button>
          <button
            onClick={() => setTransitMode('bus')}
            className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              transitMode === 'bus' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <Bus className="w-4 h-4" />
            <span>{timeEstimates.bus} min</span>
          </button>
          <button
            onClick={() => setTransitMode('walk')}
            className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              transitMode === 'walk' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <Footprints className="w-4 h-4" />
            <span>{timeEstimates.walk} min</span>
          </button>
        </div>

        {/* Destination Card */}
        <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/70 text-xs space-y-1">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="font-semibold text-neutral-700">Destination</span>
            <span className="tabular-nums font-semibold text-neutral-900">{facility.distanceKm} km</span>
          </div>
          <p className="text-neutral-900 font-medium">{facility.address}</p>
          <p className="text-[11px] text-emerald-700">Operating hours: {facility.openingHours}</p>
        </div>

        {/* Turn-by-Turn Steps */}
        <div className="space-y-3 pt-1">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
            Suggested route steps
          </span>
          <div className="space-y-3">
            {routeSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-800 font-semibold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div>
                  <p className="font-medium text-neutral-900">{step.text}</p>
                  <p className="text-neutral-400 text-[11px]">{step.subtext}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full h-11 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center justify-center transition-colors"
        >
          Close Directions
        </button>
      </div>
    </div>
  );
};
