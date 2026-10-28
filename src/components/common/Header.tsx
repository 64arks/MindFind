import React from 'react';
import { ArrowLeft, ShieldCheck, Bell, Sparkles } from 'lucide-react';
import { AccessLevel } from '../../types';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  showBack?: boolean;
  accessLevel?: AccessLevel;
  onNotificationClick?: () => void;
  unreadNotifications?: boolean;
  onSafetyClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onBack,
  showBack = false,
  accessLevel = 'Adult',
  onNotificationClick,
  unreadNotifications = false,
  onSafetyClick
}) => {
  return (
    <header className="sticky top-0 z-30 w-full px-4 py-3 flex items-center justify-between glass-panel transition-all">
      <div className="flex items-center gap-2.5 min-w-0">
        {showBack && onBack ? (
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-colors shrink-0"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-700 font-semibold text-xs tracking-wider shrink-0">
            MF
          </div>
        )}

        <div className="min-w-0">
          {title ? (
            <h1 className="text-base font-semibold text-neutral-900 truncate leading-snug tracking-tight">
              {title}
            </h1>
          ) : (
            <div className="text-sm font-semibold tracking-tight text-neutral-900">
              MediFind <span className="font-normal text-emerald-700 text-xs">Zambia</span>
            </div>
          )}
          {subtitle && (
            <p className="text-[11px] text-neutral-500 truncate leading-none mt-0.5 font-normal">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {onSafetyClick && (
          <button
            onClick={onSafetyClick}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/60 hover:bg-emerald-100 transition-colors"
            title="Safety & Verification"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden xs:inline text-[11px]">Safety</span>
          </button>
        )}

        {onNotificationClick && (
          <button
            onClick={onNotificationClick}
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifications && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
            )}
          </button>
        )}
      </div>
    </header>
  );
};
