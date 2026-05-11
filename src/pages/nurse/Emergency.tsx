import { useState } from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  ArrowUpCircle,
  CheckCircle2,
  Clock,
  User,
  MapPin,
  Activity,
  Siren,
} from 'lucide-react';
import { mockAlerts, mockPatients } from '../../lib/mock-data';
import RiskBadge from '../../components/shared/RiskBadge';

type AlertAction = 'none' | 'acknowledged' | 'escalated' | 'resolved';

export default function Emergency() {
  const criticalAlerts = mockAlerts.filter((a) => a.severity === 'critical');
  const [alertActions, setAlertActions] = useState<Record<string, AlertAction>>({});

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

  const getPatientDiagnosis = (patientId: string | null) => {
    if (!patientId) return '';
    const patient = mockPatients.find((p) => p.id === patientId);
    return patient?.diagnosis || '';
  };

  const handleAction = (alertId: string, action: AlertAction) => {
    setAlertActions((prev) => ({ ...prev, [alertId]: action }));
  };

  const getActionState = (alertId: string): AlertAction => {
    return alertActions[alertId] || 'none';
  };

  const actionConfig: Record<AlertAction, { label: string; bg: string; text: string; icon: React.ReactNode }> = {
    none: { label: '', bg: '', text: '', icon: null },
    acknowledged: { label: 'Acquittee', bg: 'bg-amber-100', text: 'text-amber-700', icon: <AlertTriangle className="w-4 h-4" /> },
    escalated: { label: 'Escaladee', bg: 'bg-purple-100', text: 'text-purple-700', icon: <ArrowUpCircle className="w-4 h-4" /> },
    resolved: { label: 'Resolue', bg: 'bg-green-100', text: 'text-green-700', icon: <CheckCircle2 className="w-4 h-4" /> },
  };

  const unattendedCount = criticalAlerts.filter((a) => getActionState(a.id) === 'none').length;

  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Siren className="w-7 h-7 text-red-600" />
          <h1 className="text-2xl font-bold text-slate-900">Alertes d'Urgence des Patients</h1>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-red-100 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <span className="text-sm font-bold text-red-700">{unattendedCount} Non traitees</span>
        </div>
      </div>

      {/* Emergency Banner */}
      {unattendedCount > 0 && (
        <div className="bg-red-600 text-white rounded-xl px-6 py-4 flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 flex-shrink-0" />
          <div>
            <p className="text-base font-bold">{unattendedCount} Alerte{unattendedCount > 1 ? 's' : ''} Critique{unattendedCount > 1 ? 's' : ''} Necessitent{unattendedCount === 1 ? '' : ''} Attention Immediate</p>
            <p className="text-sm text-red-200 mt-0.5">Reviser et acquitter toutes les alertes patient critiques immediatement.</p>
          </div>
        </div>
      )}

      {/* Critical Alert Cards */}
      <div className="space-y-5">
        {criticalAlerts.map((alert) => {
          const action = getActionState(alert.id);
          const actionCfg = actionConfig[action];
          const patientName = getPatientName(alert.patient_id);
          const room = getPatientRoom(alert.patient_id);
          const diagnosis = getPatientDiagnosis(alert.patient_id);
          const patient = alert.patient_id ? mockPatients.find((p) => p.id === alert.patient_id) : null;

          return (
            <div
              key={alert.id}
              className={`rounded-xl border-2 shadow-sm overflow-hidden transition-all ${
                action === 'resolved'
                  ? 'border-green-300 bg-green-50/30'
                  : action === 'escalated'
                  ? 'border-purple-300 bg-purple-50/30'
                  : action === 'acknowledged'
                  ? 'border-amber-300 bg-amber-50/30'
                  : 'border-red-300 bg-white'
              }`}
            >
              {/* Red accent bar */}
              <div className={`h-1.5 ${action === 'resolved' ? 'bg-green-500' : action === 'escalated' ? 'bg-purple-500' : action === 'acknowledged' ? 'bg-amber-500' : 'bg-red-500'}`} />

              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-5">
                    {/* Alert Icon */}
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      action === 'resolved' ? 'bg-green-100' : action === 'escalated' ? 'bg-purple-100' : action === 'acknowledged' ? 'bg-amber-100' : 'bg-red-100'
                    }`}>
                      <AlertTriangle className={`w-7 h-7 ${
                        action === 'resolved' ? 'text-green-600' : action === 'escalated' ? 'text-purple-600' : action === 'acknowledged' ? 'text-amber-600' : 'text-red-600'
                      }`} />
                    </div>

                    {/* Alert Content */}
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-bold text-slate-900">{alert.title}</p>
                        {action !== 'none' && (
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${actionCfg.bg} ${actionCfg.text}`}>
                            {actionCfg.icon}
                            {actionCfg.label}
                          </span>
                        )}
                      </div>
                      <p className="text-base text-slate-700 mt-2">{alert.message}</p>

                      {/* Patient Info */}
                      <div className="flex items-center gap-4 mt-3 text-sm">
                        <span className="flex items-center gap-1.5 font-medium text-slate-700">
                          <User className="w-4 h-4 text-slate-500" />
                          {patientName}
                        </span>
                        {room && (
                          <span className="flex items-center gap-1.5 text-slate-500">
                            <MapPin className="w-4 h-4" />
                            Chambre {room}
                          </span>
                        )}
                        {diagnosis && (
                          <span className="flex items-center gap-1.5 text-slate-500">
                            <Activity className="w-4 h-4" />
                            {diagnosis}
                          </span>
                        )}
                        {patient && (
                          <RiskBadge level={patient.risk_level} />
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400">
                        <Clock className="w-3 h-3" />
                        {new Date(alert.created_at).toLocaleString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 flex-shrink-0 ml-4">
                    {action === 'none' && (
                      <>
                        <button
                          onClick={() => handleAction(alert.id, 'acknowledged')}
                          className="flex items-center gap-2 px-4 py-2.5 bg-amber-100 text-amber-700 rounded-lg text-sm font-semibold hover:bg-amber-200 transition-colors"
                        >
                          <AlertTriangle className="w-4 h-4" />
                          Acquitter
                        </button>
                        <button
                          onClick={() => handleAction(alert.id, 'escalated')}
                          className="flex items-center gap-2 px-4 py-2.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold hover:bg-purple-200 transition-colors"
                        >
                          <ArrowUpCircle className="w-4 h-4" />
                          Escalader
                        </button>
                        <button
                          onClick={() => handleAction(alert.id, 'resolved')}
                          className="flex items-center gap-2 px-4 py-2.5 bg-green-100 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-200 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Resoudre
                        </button>
                      </>
                    )}
                    {action !== 'none' && action !== 'resolved' && (
                      <button
                        onClick={() => handleAction(alert.id, 'resolved')}
                        className="flex items-center gap-2 px-4 py-2.5 bg-green-100 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-200 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Resoudre
                      </button>
                    )}
                    {action === 'resolved' && (
                      <span className="flex items-center gap-2 px-4 py-2.5 text-green-700 text-sm font-semibold">
                        <CheckCircle2 className="w-5 h-5" />
                        Resolue
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
