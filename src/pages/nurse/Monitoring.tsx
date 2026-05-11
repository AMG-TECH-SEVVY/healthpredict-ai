import { useState } from 'react';
import {
  Activity,
  Thermometer,
  Heart,
  Wind,
  Eye,
  RefreshCw,
  Search,
} from 'lucide-react';
import { mockPatients, mockVitals } from '../../lib/mock-data';

function vitalColor(value: number, thresholds: { warning: number; critical: number }) {
  if (value >= thresholds.critical) return 'text-red-600 font-bold';
  if (value >= thresholds.warning) return 'text-amber-600 font-semibold';
  return 'text-green-600 font-semibold';
}

function vitalBg(value: number, thresholds: { warning: number; critical: number }) {
  if (value >= thresholds.critical) return 'bg-red-50';
  if (value >= thresholds.warning) return 'bg-amber-50';
  return 'bg-green-50';
}

export default function Monitoring() {
  const [searchTerm, setSearchTerm] = useState('');

  const monitoringData = mockVitals.map((vital) => {
    const patient = mockPatients.find((p) => p.id === vital.patient_id);
    return { vital, patient };
  }).filter((d) => d.patient);

  const filteredData = monitoringData.filter((d) => {
    if (!searchTerm) return true;
    const name = `${d.patient!.first_name} ${d.patient!.last_name}`.toLowerCase();
    return name.includes(searchTerm.toLowerCase()) ||
      d.patient!.room_number.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const followUpStatus = (patientId: string) => {
    const patient = mockPatients.find((p) => p.id === patientId);
    if (patient?.status === 'critical') return { label: 'Urgent', class: 'bg-red-100 text-red-700' };
    if (patient?.risk_level === 'high') return { label: 'Bientot Du', class: 'bg-amber-100 text-amber-700' };
    return { label: 'Routine', class: 'bg-green-100 text-green-700' };
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Surveillance des Patients</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher patient ou chambre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Actualiser
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-green-100 border border-green-300" /> Normal
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-amber-100 border border-amber-300" /> Attention
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-red-100 border border-red-300" /> Critique
        </span>
      </div>

      {/* Monitoring Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nom du Patient</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Chambre #</th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1 justify-center"><Thermometer className="w-3 h-3" /> Temp (C)</span>
                </th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1 justify-center"><Activity className="w-3 h-3" /> TA (mmHg)</span>
                </th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1 justify-center"><Heart className="w-3 h-3" /> FC (bpm)</span>
                </th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1 justify-center"><Wind className="w-3 h-3" /> O2 (%)</span>
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Derniere Mise a Jour</th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Suivi</th>
                <th className="px-5 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map(({ vital, patient }) => {
                if (!patient) return null;
                const fu = followUpStatus(patient.id);
                return (
                  <tr key={vital.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{patient.first_name} {patient.last_name}</p>
                          <p className="text-xs text-slate-500">{patient.diagnosis}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-medium text-slate-700">{patient.room_number}</span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-sm ${vitalColor(vital.temperature, { warning: 37.5, critical: 37.5 })} ${vitalBg(vital.temperature, { warning: 37.5, critical: 37.5 })}`}>
                        {vital.temperature.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-sm ${vitalColor(vital.blood_pressure_systolic, { warning: 140, critical: 140 })} ${vitalBg(vital.blood_pressure_systolic, { warning: 140, critical: 140 })}`}>
                        {vital.blood_pressure_systolic}/{vital.blood_pressure_diastolic}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-sm ${vitalColor(vital.heart_rate, { warning: 100, critical: 100 })} ${vitalBg(vital.heart_rate, { warning: 100, critical: 100 })}`}>
                        {vital.heart_rate}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-md text-sm ${vital.oxygen_saturation < 90 ? 'text-red-600 font-bold bg-red-50' : vital.oxygen_saturation < 95 ? 'text-amber-600 font-semibold bg-amber-50' : 'text-green-600 font-semibold bg-green-50'}`}>
                        {vital.oxygen_saturation}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-slate-600">{formatTime(vital.recorded_at)}</span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${fu.class}`}>
                        {fu.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors">
                          <RefreshCw className="w-3 h-3" />
                          Mettre a Jour Vitaux
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-100 transition-colors">
                          <Eye className="w-3 h-3" />
                          Voir Details
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
