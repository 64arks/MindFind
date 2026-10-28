import React from 'react';
import { Home, Search, MapPin, Bookmark, User } from 'lucide-react';

export type NavTab = 'home' | 'search' | 'map' | 'saved' | 'profile';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  savedCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  savedCount = 0
}) => {
  const tabs = [
    { id: 'home' as NavTab, label: 'Home', icon: Home },
    { id: 'search' as NavTab, label: 'Search', icon: Search },
    { id: 'map' as NavTab, label: 'Map', icon: MapPin },
    { id: 'saved' as NavTab, label: 'Saved', icon: Bookmark, badge: savedCount > 0 ? savedCount : undefined },
    { id: 'profile' as NavTab, label: 'Profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto glass-nav border-t border-neutral-200/60 transition-all">
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center h-full w-full relative transition-all active:scale-95 ${
                isActive ? 'text-emerald-700' : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 bg-emerald-600 text-white text-[9px] font-semibold px-1 rounded-full min-w-3.5 h-3.5 flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium tracking-tight mt-1 transition-all ${
                  isActive ? 'font-semibold text-emerald-800' : 'text-neutral-500'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-emerald-600 absolute bottom-1.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
