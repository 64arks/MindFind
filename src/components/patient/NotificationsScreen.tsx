import React from 'react';
import { ArrowLeft, Bell, Clock, Building2, Bookmark, ShieldAlert, Check } from 'lucide-react';

interface NotificationsScreenProps {
  onBack: () => void;
  onSelectNotificationItem?: (type: string) => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  onBack,
  onSelectNotificationItem
}) => {
  const notifications = [
    {
      id: 'n1',
      title: 'Availability update',
      description: 'Woodlands Community Pharmacy recently updated its inventory (45 items verified).',
      time: '12 min ago',
      type: 'update',
      icon: Building2,
      unread: true
    },
    {
      id: 'n2',
      title: 'Saved medicine',
      description: 'Amoxicillin 500mg availability was updated across 3 facilities in Lusaka.',
      time: '35 min ago',
      type: 'medicine',
      icon: Bookmark,
      unread: true
    },
    {
      id: 'n3',
      title: 'Information reminder',
      description: 'Some medicine availability information may become outdated. Check the last updated time before visiting.',
      time: '2 hours ago',
      type: 'reminder',
      icon: Clock,
      unread: false
    },
    {
      id: 'n4',
      title: 'Regulatory compliance notice',
      description: 'ZAMRA Q3 pharmacy premise inspection registry has been synchronized for the Lusaka Central district.',
      time: '1 day ago',
      type: 'system',
      icon: ShieldAlert,
      unread: false
    }
  ];

  return (
    <div className="pb-24 px-4 pt-2 max-w-md mx-auto space-y-4">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-900 font-medium"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back</span>
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-neutral-900">
            Notifications
          </h1>
          <p className="text-xs text-neutral-500">
            Availability updates and freshness alerts
          </p>
        </div>
        <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
          2 new
        </span>
      </div>

      <div className="space-y-2.5">
        {notifications.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all ${
                item.unread
                  ? 'bg-white border-emerald-200/80 shadow-xs'
                  : 'bg-neutral-50/70 border-neutral-200/70 text-neutral-600'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    item.unread
                      ? 'bg-emerald-500/10 text-emerald-700'
                      : 'bg-neutral-100 text-neutral-500'
                  }`}
                >
                  <Icon className="w-4 h-4 stroke-[1.8]" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="text-xs font-bold text-neutral-900">
                      {item.title}
                    </h3>
                    <span className="text-[10px] text-neutral-400 font-medium">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 rounded-2xl bg-neutral-100 text-[11px] text-neutral-500 text-center">
        Notifications are strictly informational and do not promote medicine over-consumption.
      </div>
    </div>
  );
};
