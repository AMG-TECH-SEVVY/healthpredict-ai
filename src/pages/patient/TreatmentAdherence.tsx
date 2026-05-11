import { useState } from 'react';
import { Pill, Check, X, Clock, TrendingUp, Calendar } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { mockTreatmentEntries, mockMedications } from '../../lib/mock-data';

const adherenceData = [
  { name: 'Lun', prise: 100 },
  { name: 'Mar', prise: 100 },
  { name: 'Mer', prise: 67 },
  { name: 'Jeu', prise: 100 },
  { name: 'Ven', prise: 100 },
  { name: 'Sam', prise: 67 },
  { name: 'Dim', prise: 100 },
];

export default function TreatmentAdherence() {
  const [treatments, setTreatments] = useState(mockTreatmentEntries);
  const todayTreatments = treatments.filter((t) => t.date === '2025-05-09');
  const takenToday = todayTreatments.filter((t) => t.taken).length;
  const totalToday = todayTreatments.length;

  const toggleTaken = (id: string) => {
    setTreatments((prev) =>
      prev.map((t) => t.id === id ? { ...t, taken: !t.taken } : t)
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Adherence au Traitement</h1>
        <p className="mt-1 text-sm text-slate-500">Suivez la prise de vos medicaments</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <TrendingUp size={18} className="text-green-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Adherence Globale</p>
              <p className="text-2xl font-bold text-slate-900">88%</p>
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '88%' }} />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Pill size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Aujourd'hui</p>
              <p className="text-2xl font-bold text-slate-900">{takenToday}/{totalToday}</p>
              <p className="text-xs text-slate-500">medicaments pris</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Calendar size={18} className="text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Medicaments Actifs</p>
              <p className="text-2xl font-bold text-slate-900">{mockMedications.filter((m) => m.patient_id === 'p1').length}</p>
              <p className="text-xs text-slate-500">traitements en cours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Treatments */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6 mb-8">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">Medicaments du Jour</h2>
          <p className="text-xs text-slate-500 mt-1">Cliquez pour marquer comme pris/non pris</p>
        </div>
        <div className="space-y-3">
          {todayTreatments.map((t) => (
            <div
              key={t.id}
              onClick={() => toggleTaken(t.id)}
              className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                t.taken ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  t.taken ? 'bg-green-200' : 'bg-amber-200'
                }`}>
                  <Pill size={16} className={t.taken ? 'text-green-700' : 'text-amber-700'} />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${t.taken ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                    {t.medication_name} - {t.dosage}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock size={12} className="text-slate-400" />
                    <span className="text-xs text-slate-500">{t.time} - {t.frequency}</span>
                  </div>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${
                t.taken ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {t.taken ? <Check size={12} /> : <X size={12} />}
                {t.taken ? 'Pris' : 'A prendre'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Adherence Chart */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6 mb-8">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">Adherence Hebdomadaire</h2>
          <p className="text-xs text-slate-500 mt-1">Pourcentage de prise cette semaine</p>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={adherenceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} tickFormatter={(v: number) => `${v}%`} />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: 12 }} formatter={(v: any) => [`${v}%`, 'Adherence']} />
            <Bar dataKey="prise" fill="#16a34a" radius={[6, 6, 0, 0]} barSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Active Medications */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">Traitements en Cours</h2>
          <p className="text-xs text-slate-500 mt-1">Liste de vos medicaments actuels</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Medicament</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Dosage</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Frequence</th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Adherence</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Debut</th>
              </tr>
            </thead>
            <tbody>
              {mockMedications.filter((m) => m.patient_id === 'p1').map((med) => (
                <tr key={med.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="py-3 px-3 font-medium text-slate-900">{med.medication_name}</td>
                  <td className="py-3 px-3 text-slate-600">{med.dosage}</td>
                  <td className="py-3 px-3 text-slate-600">{med.frequency}</td>
                  <td className="py-3 px-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 bg-slate-100 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${med.adherence_rate >= 90 ? 'bg-green-500' : med.adherence_rate >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${med.adherence_rate}%` }}
                        />
                      </div>
                      <span className={`text-xs font-semibold ${med.adherence_rate >= 90 ? 'text-green-700' : med.adherence_rate >= 70 ? 'text-amber-700' : 'text-red-700'}`}>
                        {med.adherence_rate}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-600 text-xs">
                    {new Date(med.start_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
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
