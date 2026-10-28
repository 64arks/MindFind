import React from 'react';
import { User, Shield, MapPin, Bell, Bookmark, Search, Lock, ShieldCheck, LogOut, ChevronRight, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { UserState, Facility, Medicine, AccessLevel } from '../../types';

interface ProfileScreenProps {
  user: UserState;
  facilities: Facility[];
  medicines: Medicine[];
  onToggleAccessLevel: (newLevel: AccessLevel) => void;
  onOpenSavedFacilities: () => void;
  onOpenNotifications: () => void;
  onOpenSafetySettings: () => void;
  onResetOnboarding: () => void;
  onSelectFacility: (facility: Facility) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  facilities,
  medicines,
  onToggleAccessLevel,
  onOpenSavedFacilities,
  onOpenNotifications,
  onOpenSafetySettings,
  onResetOnboarding,
  onSelectFacility
}) => {
  const savedFacs = facilities.filter(f => user.savedFacilities.includes(f.id));

  return (
    <div className="pb-24 px-4 pt-2 max-w-md mx-auto space-y-4">
      {/* Profile Card */}
      <div className="rounded-[28px] bg-white border border-neutral-200/90 p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-13 h-13 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-700 font-semibold text-base shrink-0">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="text-base font-bold text-neutral-900 truncate">
              {user.name}
            </h1>
            <p className="text-xs text-neutral-500">
              {user.locationPreference}
            </p>
          </div>

          {/* Access level badge */}
          <div className="shrink-0">
            {user.accessLevel === 'Adult' ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Adult access
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                Restricted access
              </span>
            )}
          </div>
        </div>

        {/* Demo Switcher for University Presentation */}
        <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200/70 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-neutral-700">Project Evaluation Toggle:</span>
            <span className="text-[11px] text-neutral-500 font-mono">
              Age: {user.age || 28} yrs
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => onToggleAccessLevel('Adult')}
              className={`py-1.5 px-2 rounded-xl font-medium transition-all ${
                user.accessLevel === 'Adult'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              Test Adult (18+)
            </button>
            <button
              onClick={() => onToggleAccessLevel('Restricted')}
              className={`py-1.5 px-2 rounded-xl font-medium transition-all ${
                user.accessLevel === 'Restricted'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              Test Minor (&lt;18)
            </button>
          </div>
        </div>
      </div>

      {/* Profile Settings Menu */}
      <div className="space-y-1.5">
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider pl-1">
          Preferences & Saved
        </span>

        <div className="rounded-2xl bg-white border border-neutral-200/80 divide-y divide-neutral-100 overflow-hidden text-xs">
          <button
            onClick={onOpenSavedFacilities}
            className="w-full p-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Bookmark className="w-4 h-4 text-emerald-700" />
              <span className="font-medium text-neutral-900">Saved facilities</span>
            </div>
            <div className="flex items-center gap-1 text-neutral-500">
              <span>{user.savedFacilities.length} saved</span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </div>
          </button>

          <button
            onClick={onOpenNotifications}
            className="w-full p-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Bell className="w-4 h-4 text-emerald-700" />
              <span className="font-medium text-neutral-900">Notifications & availability alerts</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </button>

          <button
            onClick={onOpenSafetySettings}
            className="w-full p-3.5 flex items-center justify-between hover:bg-neutral-50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-emerald-700" />
              <span className="font-medium text-neutral-900">Safety & privacy policies</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </button>
        </div>
      </div>

      {/* Saved Facilities Preview */}
      {savedFacs.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider pl-1">
            Bookmarked Dispensaries
          </span>
          <div className="space-y-2">
            {savedFacs.map(fac => (
              <div
                key={fac.id}
                onClick={() => onSelectFacility(fac)}
                className="p-3 rounded-2xl bg-white border border-neutral-200/80 flex items-center justify-between cursor-pointer hover:border-emerald-300"
              >
                <div>
                  <h4 className="text-xs font-semibold text-neutral-900">{fac.name}</h4>
                  <p className="text-[11px] text-neutral-500">{fac.address}</p>
                </div>
                <span className="text-xs font-medium text-emerald-700">{fac.distanceKm} km</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Logout / Restart Onboarding */}
      <div className="pt-2">
        <button
          onClick={onResetOnboarding}
          className="w-full p-3 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-xs font-medium text-neutral-600 flex items-center justify-center gap-2 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-neutral-400" />
          <span>Restart Onboarding Walkthrough</span>
        </button>
      </div>
    </div>
  );
};
