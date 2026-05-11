import { useState } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  Info,
  CheckCheck,
  X,
  Eye,
  Bell,
} from 'lucide-react';
import { mockAlerts, mockPatients } from '../../lib/mock-data';
import type { Alert } from '../../types';

type SeverityFilter = 'all' | 'critical' | 'warning' | 'info';

const severityConfig: Record<Alert['severity'], { icon: typeof AlertOctagon; border: string; iconBg: string; iconColor: string }> = {
  critical: { icon: AlertOctagon, border: 'border-l-red-500', iconBg: 'bg-red-100', iconColor: 'text-red-600' },
  warning: { icon: AlertTriangle, border: 'border-l-amber-500', iconBg: 'bg-amber-100', iconColor: 'text-amber-600' },
  info: { icon: Info, border: 'border-l-blue-500', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
};

function getPatientName(patientId: string | null): string {
  if (!patientId) return 'Systeme';
  const patient = mockPatients.find((p) => p.id === patientId);
  return patient ? `${patient.first_name} ${patient.last_name}` : 'Inconnu';
}

function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleString('fr-FR', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function Alerts() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filter, setFilter] = useState<SeverityFilter>('all');

  const filteredAlerts =
    filter === 'all' ? alerts : alerts.filter((a) => a.severity === filter);

  const criticalCount = alerts.filter((a) => a.severity === 'critical').length;
  const warningCount = alerts.filter((a) => a.severity === 'warning').length;
  const infoCount = alerts.filter((a) => a.severity === 'info').length;
  const unreadCount = alerts.filter((a) => !a.is_read).length;

  function handleMarkAsRead(id: string) {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, is_read: true } : a))
    );
  }

  function handleResolve(id: string) {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, is_read: true, resolved_at: new Date().toISOString() } : a))
    );
  }

  function handleDismiss(id: string) {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Alertes & Notifications</h1>
          <p className="mt-1 text-sm text-slate-500">
            {unreadCount} alerte{unreadCount !== 1 ? 's' : ''} non lue{unreadCount !== 1 ? 's' : ''} necessitant une attention
          </p>
        </div>
        <button
          onClick={() => setAlerts((prev) => prev.map((a) => ({ ...a, is_read: true })))}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <CheckCheck className="w-4 h-4" />
          Tout Marquer comme Lu
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6">
        {(
          [
            { key: 'all', label: 'Tous', count: alerts.length },
            { key: 'critical', label: 'Critique', count: criticalCount },
            { key: 'warning', label: 'Avertissement', count: warningCount },
            { key: 'info', label: 'Information', count: infoCount },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              filter === tab.key
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.key === 'critical' && <AlertOctagon className="w-3.5 h-3.5" />}
            {tab.key === 'warning' && <AlertTriangle className="w-3.5 h-3.5" />}
            {tab.key === 'info' && <Info className="w-3.5 h-3.5" />}
            {tab.key === 'all' && <Bell className="w-3.5 h-3.5" />}
            {tab.label}
            <span
              className={`text-xs ${
                filter === tab.key ? 'opacity-80' : 'text-slate-400'
              }`}
            >
              ({tab.count})
            </span>
          </button>
        ))}
      </div>

      {/* Alert Cards */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
            <Bell className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">Aucune alerte ne correspond au filtre selectionne.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const cfg = severityConfig[alert.severity];
            const SeverityIcon = cfg.icon;

            return (
              <div
                key={alert.id}
                className={`bg-white rounded-xl border border-slate-200 shadow-sm border-l-4 ${cfg.border} hover:shadow-md transition-shadow ${
                  !alert.is_read ? '' : 'opacity-70'
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Severity Icon */}
                    <div
                      className={`w-10 h-10 rounded-lg ${cfg.iconBg} ${cfg.iconColor} flex items-center justify-center flex-shrink-0`}
                    >
                      <SeverityIcon className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold text-slate-900">
                            {alert.title}
                            {!alert.is_read && (
                              <span className="ml-2 inline-flex items-center w-2 h-2 rounded-full bg-blue-500" />
                            )}
                          </h3>
                          <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                            {alert.message}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
                        <span className="font-medium text-slate-600">
                          {getPatientName(alert.patient_id)}
                        </span>
                        <span>{formatTimestamp(alert.created_at)}</span>
                        {alert.resolved_at && (
                          <span className="text-green-600 font-medium">Resolu</span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {!alert.is_read && (
                        <button
                          onClick={() => handleMarkAsRead(alert.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors"
                          title="Marquer comme Lu"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Lu
                        </button>
                      )}
                      {!alert.resolved_at && (
                        <button
                          onClick={() => handleResolve(alert.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
                          title="Resoudre"
                        >
                          <CheckCheck className="w-3.5 h-3.5" />
                          Resoudre
                        </button>
                      )}
                      <button
                        onClick={() => handleDismiss(alert.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                        title="Ignorer"
                      >
                        <X className="w-3.5 h-3.5" />
                        Ignorer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
