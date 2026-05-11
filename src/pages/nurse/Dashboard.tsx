import {
  CalendarCheck,
  UserCheck,
  AlertTriangle,
  RefreshCw,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { mockPatients, mockAlerts, mockAppointments } from '../../lib/mock-data';
import StatCard from '../../components/shared/StatCard';
import StatusBadge from '../../components/shared/StatusBadge';

export default function Dashboard() {
  const criticalAlerts = mockAlerts.filter((a) => a.severity === 'critical');
  const todayAppointments = mockAppointments.filter(
    (a) => a.scheduled_date === '2025-05-09'
  );

  const getPatientName = (patientId: string) => {
    const patient = mockPatients.find((p) => p.id === patientId);
    return patient ? `${patient.first_name} ${patient.last_name}` : 'Inconnu';
  };

  const recentUpdates = [
    { id: 1, patient: getPatientName('p1'), action: 'Vitaux mis a jour', time: '08:30', type: 'vitals' },
    { id: 2, patient: getPatientName('p4'), action: 'Score de risque passe a 91', time: '06:00', type: 'risk' },
    { id: 3, patient: getPatientName('p9'), action: 'Alerte acquittee', time: '05:45', type: 'alert' },
    { id: 4, patient: getPatientName('p2'), action: 'Medicament administre', time: '09:00', type: 'medication' },
    { id: 5, patient: getPatientName('p6'), action: 'Soins de plaie termines', time: '10:15', type: 'appointment' },
  ];

  const updateTypeIcon = (type: string) => {
    switch (type) {
      case 'vitals': return <RefreshCw className="w-4 h-4 text-blue-500" />;
      case 'risk': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'alert': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <UserCheck className="w-4 h-4 text-green-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Tableau de Bord Infirmier</h1>
        <span className="text-sm text-slate-500">Aujourd'hui : 9 mai 2025</span>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Rendez-vous du Jour"
          value={8}
          subtitle="3 restants"
          icon={<CalendarCheck className="w-5 h-5" />}
          color="blue"
        />
        <StatCard
          title="Patients a Suivre"
          value={5}
          subtitle="Dus aujourd'hui"
          icon={<UserCheck className="w-5 h-5" />}
          color="teal"
        />
        <StatCard
          title="Alertes Critiques"
          value={3}
          subtitle="Necessitent attention"
          icon={<AlertTriangle className="w-5 h-5" />}
          color="red"
        />
        <StatCard
          title="Mises a Jour Recentes"
          value={12}
          subtitle="Depuis le dernier quart"
          icon={<RefreshCw className="w-5 h-5" />}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Rendez-vous du Jour</h2>
            <span className="text-sm text-blue-600 font-medium">{todayAppointments.length} total</span>
          </div>
          <div className="divide-y divide-slate-100">
            {todayAppointments.map((apt) => {
              const patient = mockPatients.find((p) => p.id === apt.patient_id);
              return (
                <div key={apt.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center bg-blue-50 rounded-lg px-3 py-2 min-w-[60px]">
                      <span className="text-xs font-medium text-blue-600">HEURE</span>
                      <span className="text-sm font-bold text-blue-800">{apt.scheduled_time}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {patient ? `${patient.first_name} ${patient.last_name}` : 'Inconnu'}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{apt.appointment_type}</p>
                      {apt.notes && (
                        <p className="text-xs text-slate-400 mt-0.5">{apt.notes}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={apt.status} />
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Critical Alerts */}
          <div className="bg-white rounded-xl border border-red-200 shadow-sm">
            <div className="px-6 py-4 border-b border-red-100 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-semibold text-red-900">Alertes Critiques</h2>
            </div>
            <div className="divide-y divide-red-100">
              {criticalAlerts.map((alert) => (
                <div key={alert.id} className="px-6 py-4 bg-red-50/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {alert.patient_id ? getPatientName(alert.patient_id) : 'Systeme'}
                      </p>
                      <p className="text-xs text-slate-600 mt-1">{alert.message}</p>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-700">
                      Critique
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    {new Date(alert.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Patient Updates */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100">
              <h2 className="text-lg font-semibold text-slate-900">Mises a Jour Recentes</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {recentUpdates.map((update) => (
                <div key={update.id} className="px-6 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                    {updateTypeIcon(update.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{update.patient}</p>
                    <p className="text-xs text-slate-500">{update.action}</p>
                  </div>
                  <span className="text-xs text-slate-400 flex-shrink-0">{update.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
