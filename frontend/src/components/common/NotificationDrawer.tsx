import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Bell, Check, Trash2, AlertTriangle, CheckCircle, Info, ShieldAlert } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, clearAllNotifications } = useApp();

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'SUCCESS':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'WARNING':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'ALERT':
        return <ShieldAlert className="w-4 h-4 text-red-500" />;
      case 'INFO':
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Tactical Alerts & Notifications</h2>
          </div>
          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="text-[11px] text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 flex items-center gap-1 font-medium transition-colors"
                title="Clear All"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center text-slate-400 dark:text-slate-500 space-y-2">
              <Bell className="w-8 h-8 opacity-30" />
              <p className="text-xs font-medium">No active tactical alerts</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3 rounded-xl border text-xs transition-all ${
                  n.read
                    ? 'bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-70'
                    : 'bg-white dark:bg-slate-850 border-blue-200 dark:border-blue-900/50 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    {getIcon(n.type)}
                    <span className="font-semibold text-slate-900 dark:text-white">{n.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">{n.timestamp}</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed pl-6">
                  {n.message}
                </p>
                {!n.read && (
                  <div className="mt-2 text-right">
                    <button
                      onClick={() => markNotificationRead(n.id)}
                      className="text-[10px] font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" /> Mark as read
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-center">
          <span className="text-[10px] font-mono text-slate-400">
            DRDO AI KM Secure Alerting Node
          </span>
        </div>
      </div>
    </div>
  );
};
