import { useState } from 'react';
import {
  Bell,
  AlertTriangle,
  Info,
  Check,
  Clock,
  Mail,
  MailOpen,
} from 'lucide-react';
import { mockAlerts } from '../../lib/mock-data';

type NotificationFilter = 'all' | 'alerts' | 'reminders' | 'updates';

export default function Notifications() {
  const [filter, setFilter] = useState<NotificationFilter>('all');
  const [readState, setReadState] = useState<Record<string, boolean>>({});

  const notifications = mockAlerts.map((alert) => ({
    id: alert.id,
    type: alert.alert_type === 'critical_patient' || alert.alert_type === 'missing_data'
      ? 'alerts' as const
      : alert.alert_type === 'ai_performance'
      ? 'updates' as const
      : 'reminders' as const,
    title: alert.title,
    message: alert.message,
    time: alert.created_at,
    isRead: readState[alert.id] !== undefined ? readState[alert.id] : alert.is_read,
    severity: alert.severity,
  }));

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  const markAsRead = (id: string) => {
    setReadState((prev) => ({ ...prev, [id]: true }));
  };

  const markAllAsRead = () => {
    const newState: Record<string, boolean> = {};
    notifications.forEach((n) => {
      newState[n.id] = true;
    });
    setReadState(newState);
  };

  const unreadCount = filteredNotifications.filter((n) => !n.isRead).length;

  const typeIcon = (type: string, severity: string) => {
    if (type === 'alerts') {
      return <AlertTriangle className={`w-5 h-5 ${severity === 'critical' ? 'text-red-500' : 'text-amber-500'}`} />;
    }
    if (type === 'reminders') {
      return <Bell className="w-5 h-5 text-blue-500" />;
    }
    return <Info className="w-5 h-5 text-teal-500" />;
  };

  const typeBg = (type: string, severity: string) => {
    if (type === 'alerts' && severity === 'critical') return 'bg-red-100';
    if (type === 'alerts') return 'bg-amber-100';
    if (type === 'reminders') return 'bg-blue-100';
    return 'bg-teal-100';
  };

  const filterConfig: { label: string; value: NotificationFilter }[] = [
    { label: 'Tous', value: 'all' },
    { label: 'Rappels', value: 'reminders' },
    { label: 'Alertes', value: 'alerts' },
    { label: 'Mises a Jour', value: 'updates' },
  ];

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Notifications et Rappels</h1>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              Marquer Tous comme Lu
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {filterConfig.map((f) => {
          const count = f.value === 'all'
            ? notifications.length
            : notifications.filter((n) => n.type === f.value).length;
          return (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {f.label}
              <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                filter === f.value ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Aucune notification dans cette categorie.</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`px-6 py-4 flex items-start gap-4 transition-colors ${
                !notification.isRead ? 'bg-blue-50/50' : 'bg-white'
              } hover:bg-slate-50`}
            >
              {/* Type Icon */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${typeBg(notification.type, notification.severity)}`}>
                {typeIcon(notification.type, notification.severity)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-semibold ${!notification.isRead ? 'text-slate-900' : 'text-slate-600'}`}>
                    {notification.title}
                  </p>
                  {!notification.isRead && (
                    <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm text-slate-500 mt-1">{notification.message}</p>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400">
                  <Clock className="w-3 h-3" />
                  {formatTime(notification.time)}
                </div>
              </div>

              {/* Mark as Read */}
              <div className="flex-shrink-0">
                {!notification.isRead ? (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-200 transition-colors"
                    title="Marquer comme lu"
                  >
                    <MailOpen className="w-3.5 h-3.5" />
                    Marquer Lu
                  </button>
                ) : (
                  <span className="flex items-center gap-1 px-3 py-1.5 text-slate-400 text-xs">
                    <Mail className="w-3.5 h-3.5" />
                    Lu
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
