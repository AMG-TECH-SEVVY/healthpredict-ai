import { useState } from 'react';
import { Bell, Pill, Stethoscope, AlertTriangle, MessageSquare, CheckCheck } from 'lucide-react';
import { mockPatientNotifications } from '../../lib/mock-data';

const typeConfig = {
  traitement: { icon: <Pill size={16} />, bg: 'bg-green-100', iconColor: 'text-green-600', label: 'Traitement' },
  medicale: { icon: <AlertTriangle size={16} />, bg: 'bg-red-100', iconColor: 'text-red-600', label: 'Medicale' },
  suivi: { icon: <Stethoscope size={16} />, bg: 'bg-blue-100', iconColor: 'text-blue-600', label: 'Suivi' },
  medecin: { icon: <MessageSquare size={16} />, bg: 'bg-teal-100', iconColor: 'text-teal-600', label: 'Medecin' },
  systeme: { icon: <Bell size={16} />, bg: 'bg-slate-100', iconColor: 'text-slate-600', label: 'Systeme' },
};

export default function PatientNotifications() {
  const [notifications, setNotifications] = useState(mockPatientNotifications);
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all' ? notifications : notifications.filter((n) => n.type === filter);
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, is_read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="mt-1 text-sm text-slate-500">{unreadCount} notification(s) non lue(s)</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
          >
            <CheckCheck size={16} />
            Tout marquer comme lu
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: 'all', label: 'Toutes' },
          { key: 'traitement', label: 'Traitement' },
          { key: 'medicale', label: 'Medicale' },
          { key: 'suivi', label: 'Suivi' },
          { key: 'medecin', label: 'Medecin' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              filter === tab.key
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map((notif) => {
          const config = typeConfig[notif.type as keyof typeof typeConfig];
          return (
            <div
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all hover:shadow-sm ${
                notif.is_read
                  ? 'bg-white border-slate-200'
                  : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0 ${config.iconColor}`}>
                {config.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className={`text-sm font-semibold ${notif.is_read ? 'text-slate-500' : 'text-slate-900'}`}>{notif.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{notif.message}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${config.bg} ${config.iconColor}`}>
                      {config.label}
                    </span>
                    {!notif.is_read && <span className="w-2 h-2 rounded-full bg-blue-500" />}
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-2">
                  {new Date(notif.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
