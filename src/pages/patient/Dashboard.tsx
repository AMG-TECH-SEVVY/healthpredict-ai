import {
  Activity,
  Calendar,
  Bell,
  Pill,
  Heart,
  AlertTriangle,
  Lightbulb,
  Thermometer,
  Droplets,
  Wind,
  Scale,
  Stethoscope,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import RiskBadge from '../../components/shared/RiskBadge';
import {
  currentPatient,
  mockPatientVitals,
  mockPatientNotifications,
  mockTreatmentEntries,
  mockHealthTips,
  patientVitalsTrend,
  patientAppointments,
} from '../../lib/mock-data';

const tipIcons: Record<string, React.ReactNode> = {
  heart: <Heart size={18} className="text-red-500" />,
  activity: <Activity size={18} className="text-blue-500" />,
  scale: <Scale size={18} className="text-amber-500" />,
  moon: <Wind size={18} className="text-teal-500" />,
};

export default function PatientDashboard() {
  const latestVitals = mockPatientVitals[0];
  const unreadNotifs = mockPatientNotifications.filter((n) => !n.is_read).length;
  const todayTreatments = mockTreatmentEntries.filter((t) => t.date === '2025-05-09');
  const takenCount = todayTreatments.filter((t) => t.taken).length;
  const upcomingAppts = patientAppointments.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Bonjour, {currentPatient.first_name}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Voici votre resume de sante pour aujourd'hui
            </p>
          </div>
          <div className="flex items-center gap-3">
            <RiskBadge level={currentPatient.risk_level} />
            <span className="text-sm text-slate-500">
              Score de risque: <span className="font-bold text-slate-900">{currentPatient.risk_score}/100</span>
            </span>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      {currentPatient.risk_level === 'high' && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800">Attention - Risque de readmission eleve</p>
            <p className="text-xs text-amber-700 mt-1">
              Votre score de risque est actuellement eleve. Suivez bien votre traitement et signalez tout symptome inhabituel.
            </p>
          </div>
        </div>
      )}

      {/* Vital Signs Quick Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
        <VitalMiniCard
          icon={<Thermometer size={16} />}
          label="Temperature"
          value={`${latestVitals.temperature}°C`}
          color={latestVitals.temperature > 37.5 ? 'red' : 'green'}
        />
        <VitalMiniCard
          icon={<Heart size={16} />}
          label="Tension"
          value={`${latestVitals.blood_pressure_systolic}/${latestVitals.blood_pressure_diastolic}`}
          color={latestVitals.blood_pressure_systolic > 140 ? 'red' : 'green'}
        />
        <VitalMiniCard
          icon={<Activity size={16} />}
          label="Cardiaque"
          value={`${latestVitals.heart_rate} bpm`}
          color={latestVitals.heart_rate > 100 ? 'red' : 'green'}
        />
        <VitalMiniCard
          icon={<Droplets size={16} />}
          label="Oxygene"
          value={`${latestVitals.oxygen_saturation}%`}
          color={latestVitals.oxygen_saturation < 93 ? 'red' : 'green'}
        />
        <VitalMiniCard
          icon={<Scale size={16} />}
          label="Glycemie"
          value={`${latestVitals.blood_sugar} g/L`}
          color={latestVitals.blood_sugar > 1.26 ? 'red' : 'green'}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Health Evolution Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-slate-900">Evolution de votre etat de sante</h2>
            <p className="text-xs text-slate-500 mt-1">Tendance de vos signes vitaux sur 7 jours</p>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={patientVitalsTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
              <YAxis yAxisId="right" orientation="right" domain={[35, 40]} tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: 12 }} />
              <Line yAxisId="left" type="monotone" dataKey="tension" name="Tension" stroke="#1e40af" strokeWidth={2} dot={{ r: 3, fill: '#1e40af' }} />
              <Line yAxisId="left" type="monotone" dataKey="cardiaque" name="Cardiaque" stroke="#dc2626" strokeWidth={2} dot={{ r: 3, fill: '#dc2626' }} />
              <Line yAxisId="right" type="monotone" dataKey="temperature" name="Temperature" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3, fill: '#f59e0b' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Prochains Rendez-vous</h2>
              <p className="text-xs text-slate-500 mt-1">{patientAppointments.length} rendez-vous a venir</p>
            </div>
            <Calendar size={18} className="text-blue-500" />
          </div>
          <div className="space-y-3">
            {upcomingAppts.map((appt) => (
              <div key={appt.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-blue-50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Stethoscope size={16} className="text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{appt.type}</p>
                  <p className="text-xs text-slate-500">{appt.doctor}</p>
                  <p className="text-xs text-blue-600 font-medium mt-1">
                    {new Date(appt.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} a {appt.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Medications Today */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Medicaments du Jour</h2>
              <p className="text-xs text-slate-500 mt-1">{takenCount}/{todayTreatments.length} pris</p>
            </div>
            <Pill size={18} className="text-green-500" />
          </div>
          <div className="space-y-2.5">
            {todayTreatments.map((t) => (
              <div key={t.id} className={`flex items-center justify-between p-3 rounded-lg ${t.taken ? 'bg-green-50' : 'bg-amber-50'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${t.taken ? 'bg-green-200' : 'bg-amber-200'}`}>
                    <Pill size={14} className={t.taken ? 'text-green-700' : 'text-amber-700'} />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${t.taken ? 'text-slate-500 line-through' : 'text-slate-900'}`}>{t.medication_name}</p>
                    <p className="text-xs text-slate-500">{t.dosage} - {t.time}</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${t.taken ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                  {t.taken ? 'Pris' : 'A prendre'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Alertes & Notifications</h2>
              <p className="text-xs text-slate-500 mt-1">{unreadNotifs} non lues</p>
            </div>
            <Bell size={18} className="text-amber-500" />
          </div>
          <div className="space-y-2.5">
            {mockPatientNotifications.slice(0, 4).map((notif) => (
              <div key={notif.id} className={`flex items-start gap-3 p-3 rounded-lg ${notif.is_read ? 'bg-slate-50' : 'bg-blue-50 border border-blue-100'}`}>
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${notif.is_read ? 'bg-slate-300' : 'bg-blue-500'}`} />
                <div className="min-w-0">
                  <p className={`text-sm font-medium truncate ${notif.is_read ? 'text-slate-500' : 'text-slate-900'}`}>{notif.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{notif.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Tips */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Conseils Sante</h2>
              <p className="text-xs text-slate-500 mt-1">Recommandations personnalisees</p>
            </div>
            <Lightbulb size={18} className="text-amber-500" />
          </div>
          <div className="space-y-2.5">
            {mockHealthTips.map((tip) => (
              <div key={tip.id} className="flex items-start gap-3 p-3 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                  {tipIcons[tip.icon] || <Lightbulb size={16} className="text-teal-600" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">{tip.title}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row - Consultation History */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">Historique des Consultations</h2>
          <p className="text-xs text-slate-500 mt-1">Dernieres consultations et examens</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Medecin</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Resultat</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="py-3 px-3 text-slate-600">09 Mai 2025</td>
                <td className="py-3 px-3 text-slate-900 font-medium">Echocardiogramme</td>
                <td className="py-3 px-3 text-slate-600">Dr. Fatou Diallo</td>
                <td className="py-3 px-3"><span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Stable</span></td>
              </tr>
              <tr className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="py-3 px-3 text-slate-600">05 Mai 2025</td>
                <td className="py-3 px-3 text-slate-900 font-medium">Bilan Sanguin</td>
                <td className="py-3 px-3 text-slate-600">Labo Analyse</td>
                <td className="py-3 px-3"><span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">A surveiller</span></td>
              </tr>
              <tr className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="py-3 px-3 text-slate-600">02 Mai 2025</td>
                <td className="py-3 px-3 text-slate-900 font-medium">Consultation Cardiologie</td>
                <td className="py-3 px-3 text-slate-600">Dr. Fatou Diallo</td>
                <td className="py-3 px-3"><span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">En cours</span></td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-3 text-slate-600">28 Avr 2025</td>
                <td className="py-3 px-3 text-slate-900 font-medium">Radiographie Thorax</td>
                <td className="py-3 px-3 text-slate-600">Dr. Ibrahima Seck</td>
                <td className="py-3 px-3"><span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Normal</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function VitalMiniCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: 'red' | 'green' }) {
  const isAlert = color === 'red';
  return (
    <div className={`rounded-xl border p-4 transition-shadow hover:shadow-md ${isAlert ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200'}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={isAlert ? 'text-red-500' : 'text-slate-400'}>{icon}</span>
        <span className="text-xs font-medium text-slate-500">{label}</span>
      </div>
      <p className={`text-lg font-bold ${isAlert ? 'text-red-700' : 'text-slate-900'}`}>{value}</p>
      {isAlert && <p className="text-[10px] text-red-500 mt-1 font-medium">Valeur elevee</p>}
    </div>
  );
}
