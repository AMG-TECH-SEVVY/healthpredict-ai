import { useState } from 'react';
import { Clock, CheckCircle, Plus, Send } from 'lucide-react';
import { patientAppointments } from '../../lib/mock-data';

export default function PatientAppointments() {
  const [showRequest, setShowRequest] = useState(false);
  const [requestForm, setRequestForm] = useState({ type: '', preferred_date: '', preferred_time: '', notes: '' });

  const statusConfig = {
    confirmed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Confirme' },
    pending: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'En attente' },
    cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'Annule' },
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRequest(false);
    setRequestForm({ type: '', preferred_date: '', preferred_time: '', notes: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Rendez-vous</h1>
          <p className="mt-1 text-sm text-slate-500">Gerez vos rendez-vous medicaux</p>
        </div>
        <button
          onClick={() => setShowRequest(!showRequest)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={16} />
          Demander un Rendez-vous
        </button>
      </div>

      {/* Request Form */}
      {showRequest && (
        <div className="mb-8 bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-5">Demande de rendez-vous</h2>
          <form onSubmit={handleSubmitRequest} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Type de consultation</label>
                <select
                  value={requestForm.type}
                  onChange={(e) => setRequestForm({ ...requestForm, type: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                >
                  <option value="">Selectionnez...</option>
                  <option value="cardiologie">Consultation Cardiologie</option>
                  <option value="suivi">Consultation de Suivi</option>
                  <option value="bilan">Bilan de Sante</option>
                  <option value="kinesitherapie">Kinesitherapie</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Date souhaitee</label>
                <input
                  type="date"
                  value={requestForm.preferred_date}
                  onChange={(e) => setRequestForm({ ...requestForm, preferred_date: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Heure souhaitee</label>
                <input
                  type="time"
                  value={requestForm.preferred_time}
                  onChange={(e) => setRequestForm({ ...requestForm, preferred_time: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Notes</label>
                <input
                  type="text"
                  value={requestForm.notes}
                  onChange={(e) => setRequestForm({ ...requestForm, notes: e.target.value })}
                  placeholder="Informations supplementaires..."
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              <Send size={16} />
              Envoyer la demande
            </button>
          </form>
        </div>
      )}

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6 mb-8">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">Prochains Rendez-vous</h2>
          <p className="text-xs text-slate-500 mt-1">Vos rendez-vous a venir</p>
        </div>
        <div className="space-y-3">
          {patientAppointments.map((appt) => {
            const status = statusConfig[appt.status as keyof typeof statusConfig];
            return (
              <div key={appt.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors">
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-blue-700">
                    {new Date(appt.date).getDate()}
                  </span>
                  <span className="text-[10px] font-medium text-blue-500 uppercase">
                    {new Date(appt.date).toLocaleDateString('fr-FR', { month: 'short' })}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{appt.type}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{appt.doctor}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Clock size={12} className="text-slate-400" />
                    <span className="text-xs text-slate-500">{appt.time}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}>
                  {status.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Past Consultations */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">Historique des Consultations</h2>
          <p className="text-xs text-slate-500 mt-1">Consultations passees</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Date</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Type</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Medecin</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Statut</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: '02 Mai 2025', type: 'Consultation Cardiologie', doctor: 'Dr. Fatou Diallo', status: 'Terminee' },
                { date: '25 Avr 2025', type: 'Bilan Sanguin', doctor: 'Labo Analyse', status: 'Terminee' },
                { date: '20 Avr 2025', type: 'Admission', doctor: 'Dr. Fatou Diallo', status: 'Terminee' },
                { date: '28 Nov 2024', type: 'Consultation Sortie', doctor: 'Dr. Fatou Diallo', status: 'Terminee' },
                { date: '15 Nov 2024', type: 'Admission Urgence', doctor: 'Dr. Ibrahima Seck', status: 'Terminee' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="py-3 px-3 text-slate-600">{row.date}</td>
                  <td className="py-3 px-3 text-slate-900 font-medium">{row.type}</td>
                  <td className="py-3 px-3 text-slate-600">{row.doctor}</td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      <CheckCircle size={12} /> {row.status}
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
