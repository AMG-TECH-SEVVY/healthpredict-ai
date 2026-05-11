import { useState } from 'react';
import {
  ClipboardList,
  FileWarning,
  ArrowRight,
  CheckCircle,
  Clock,
  User,
} from 'lucide-react';
import { mockAlerts, mockPatients } from '../../lib/mock-data';

export default function MissingData() {
  const missingDataAlerts = mockAlerts.filter((a) => a.alert_type === 'missing_data');
  const [completed, setCompleted] = useState<string[]>([]);

  const getPatientName = (patientId: string | null) => {
    if (!patientId) return 'Systeme';
    const patient = mockPatients.find((p) => p.id === patientId);
    return patient ? `${patient.first_name} ${patient.last_name}` : 'Inconnu';
  };

  const getPatientRoom = (patientId: string | null) => {
    if (!patientId) return '';
    const patient = mockPatients.find((p) => p.id === patientId);
    return patient?.room_number || '';
  };

  const urgencyConfig: Record<string, { bg: string; text: string; border: string; label: string }> = {
    critical: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', label: 'Urgent' },
    warning: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: 'Elevee' },
    info: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', label: 'Normal' },
  };

  const handleComplete = (alertId: string) => {
    setCompleted((prev) => [...prev, alertId]);
  };

  const isCompleted = (alertId: string) => completed.includes(alertId);

  const pendingCount = missingDataAlerts.filter((a) => !isCompleted(a.id)).length;
  const completedCount = missingDataAlerts.filter((a) => isCompleted(a.id)).length;

  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Completer les Donnees Manquantes</h1>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1.5 text-amber-600 font-medium">
            <FileWarning className="w-4 h-4" />
            {pendingCount} En attente
          </span>
          <span className="flex items-center gap-1.5 text-green-600 font-medium">
            <CheckCircle className="w-4 h-4" />
            {completedCount} Termine
          </span>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
            <ClipboardList className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900">{missingDataAlerts.length} Elements de Donnees Necessitent Attention</p>
            <p className="text-sm text-slate-500">Completer les donnees manquantes des patients pour ameliorer la precision des predictions IA</p>
          </div>
        </div>
      </div>

      {/* Missing Data Cards */}
      <div className="space-y-4">
        {missingDataAlerts.map((alert) => {
          const done = isCompleted(alert.id);
          const urgency = urgencyConfig[alert.severity] || urgencyConfig.info;
          const patientName = getPatientName(alert.patient_id);
          const room = getPatientRoom(alert.patient_id);

          return (
            <div
              key={alert.id}
              className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-all ${
                done ? 'border-green-200 opacity-60' : `${urgency.border} hover:shadow-md`
              }`}
            >
              <div className="px-6 py-5 flex items-center justify-between">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    done ? 'bg-green-100' : urgency.bg
                  }`}>
                    {done ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <FileWarning className={`w-5 h-5 ${urgency.text}`} />
                    )}
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-base font-semibold text-slate-900">{alert.title}</p>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${urgency.bg} ${urgency.text}`}>
                        {urgency.label}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{alert.message}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {patientName}
                      </span>
                      {room && (
                        <span>Chambre {room}</span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(alert.created_at).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="flex-shrink-0">
                  {done ? (
                    <span className="flex items-center gap-1.5 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      Termine
                    </span>
                  ) : (
                    <button
                      onClick={() => handleComplete(alert.id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Completer
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
