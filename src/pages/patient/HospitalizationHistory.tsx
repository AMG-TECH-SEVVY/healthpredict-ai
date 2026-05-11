import { History, Building2, Stethoscope, CalendarDays, Clock, User } from 'lucide-react';
import { mockHospitalizations } from '../../lib/mock-data';

export default function HospitalizationHistory() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Historique des Hospitalisations</h1>
        <p className="mt-1 text-sm text-slate-500">Toutes vos hospitalisations passees et en cours</p>
      </div>

      {/* Current Hospitalization */}
      {mockHospitalizations.filter((h) => h.status === 'en_cours').map((h) => (
        <div key={h.id} className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
            <h2 className="text-base font-semibold text-blue-900">Hospitalisation en Cours</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoItem icon={<CalendarDays size={16} />} label="Date d'admission" value={new Date(h.admission_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} />
            <InfoItem icon={<Building2 size={16} />} label="Service" value={h.department} />
            <InfoItem icon={<Stethoscope size={16} />} label="Diagnostic" value={h.diagnosis} />
            <InfoItem icon={<User size={16} />} label="Medecin responsable" value={h.attending_doctor} />
            <InfoItem icon={<Clock size={16} />} label="Duree" value={`${h.duration_days} jours`} />
            <InfoItem icon={<History size={16} />} label="Statut" value="En cours" highlight />
          </div>
        </div>
      ))}

      {/* Past Hospitalizations */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">Hospitalisations Anterieures</h2>
          <p className="text-xs text-slate-500 mt-1">{mockHospitalizations.filter((h) => h.status === 'terminee').length} hospitalisation(s) passee(s)</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Date d'admission</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Diagnostic</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Service</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Medecin</th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Duree</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Date de sortie</th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Etat</th>
              </tr>
            </thead>
            <tbody>
              {mockHospitalizations.filter((h) => h.status === 'terminee').map((h) => (
                <tr key={h.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="py-3 px-3 text-slate-600">
                    {new Date(h.admission_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="py-3 px-3 text-slate-900 font-medium">{h.diagnosis}</td>
                  <td className="py-3 px-3 text-slate-600">{h.department}</td>
                  <td className="py-3 px-3 text-slate-600">{h.attending_doctor}</td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                      {h.duration_days}j
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {h.discharge_date ? new Date(h.discharge_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      Terminee
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value, highlight }: { icon: React.ReactNode; label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="text-blue-500 mt-0.5">{icon}</span>
      <div>
        <p className="text-xs text-blue-600 font-medium">{label}</p>
        <p className={`text-sm font-semibold ${highlight ? 'text-blue-700' : 'text-slate-900'}`}>{value}</p>
      </div>
    </div>
  );
}
