import React, { useState } from 'react';
import { SearchX, Clock, WifiOff, MapPinOff, ArrowLeft, RefreshCw, ChevronRight } from 'lucide-react';

interface EmptyStatesDemoProps {
  onBack: () => void;
}

export const EmptyStatesDemo: React.FC<EmptyStatesDemoProps> = ({ onBack }) => {
  const [selectedState, setSelectedState] = useState<'no-results' | 'old-data' | 'network-error' | 'no-nearby'>('no-results');

  return (
    <div className="pb-24 px-4 pt-2 max-w-md mx-auto space-y-4">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-900 font-medium"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back</span>
      </button>

      <div>
        <h1 className="text-xl font-bold tracking-tight text-neutral-900">
          System States
        </h1>
        <p className="text-xs text-neutral-500">
          Evaluator preview for empty, outdated, and error conditions
        </p>
      </div>

      {/* State Switcher Tabs */}
      <div className="grid grid-cols-2 gap-1.5 p-1 bg-neutral-100 rounded-2xl text-xs">
        <button
          onClick={() => setSelectedState('no-results')}
          className={`py-2 px-2.5 rounded-xl font-medium transition-all ${
            selectedState === 'no-results' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          No results
        </button>
        <button
          onClick={() => setSelectedState('old-data')}
          className={`py-2 px-2.5 rounded-xl font-medium transition-all ${
            selectedState === 'old-data' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          Old data
        </button>
        <button
          onClick={() => setSelectedState('network-error')}
          className={`py-2 px-2.5 rounded-xl font-medium transition-all ${
            selectedState === 'network-error' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          Network error
        </button>
        <button
          onClick={() => setSelectedState('no-nearby')}
          className={`py-2 px-2.5 rounded-xl font-medium transition-all ${
            selectedState === 'no-nearby' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'
          }`}
        >
          No facilities
        </button>
      </div>

      {/* Dynamic State View Container */}
      <div className="min-h-[380px] rounded-[28px] bg-white border border-neutral-200/90 p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-sm">
        {selectedState === 'no-results' && (
          <>
            <div className="w-14 h-14 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center">
              <SearchX className="w-7 h-7 stroke-[1.8]" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-neutral-900">
                No participating facilities reported this medicine.
              </h2>
              <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
                Check alternative dosages, search by generic salt name, or request notification when Lusaka facilities log stock.
              </p>
            </div>
            <button className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors">
              Broaden Search
            </button>
          </>
        )}

        {selectedState === 'old-data' && (
          <>
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-7 h-7 stroke-[1.8]" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-neutral-900">
                Availability information is not recently confirmed.
              </h2>
              <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
                The last stock record was logged over 6 hours ago. Please phone the facility to ensure current supply before making travel arrangements.
              </p>
            </div>
            <button className="px-4 py-2 rounded-xl bg-neutral-100 text-neutral-800 text-xs font-semibold hover:bg-neutral-200 transition-colors">
              Call Facility Directly
            </button>
          </>
        )}

        {selectedState === 'network-error' && (
          <>
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <WifiOff className="w-7 h-7 stroke-[1.8]" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-neutral-900">
                Unable to update availability.
              </h2>
              <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
                A connection interruption prevented sync with Lusaka health directory servers. Cached facility contacts remain accessible.
              </p>
            </div>
            <button className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-neutral-800 transition-colors">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry connection</span>
            </button>
          </>
        )}

        {selectedState === 'no-nearby' && (
          <>
            <div className="w-14 h-14 rounded-2xl bg-neutral-100 text-neutral-500 flex items-center justify-center">
              <MapPinOff className="w-7 h-7 stroke-[1.8]" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-neutral-900">
                No participating facilities found in this area.
              </h2>
              <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
                Currently displaying verified dispensaries in Lusaka. Expand radius to include surrounding sub-districts like Chongwe or Chilanga.
              </p>
            </div>
            <button className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors">
              Expand Search Radius
            </button>
          </>
        )}
      </div>
    </div>
  );
};
