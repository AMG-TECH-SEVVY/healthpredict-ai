import { useState } from 'react';
import {
  Thermometer,
  Activity,
  Heart,
  Wind,
  Plus,
  Clock,
  Search,
} from 'lucide-react';
import { mockPatients, mockVitals } from '../../lib/mock-data';
import RiskBadge from '../../components/shared/RiskBadge';

type VitalStatus = 'normal' | 'warning' | 'critical';

interface VitalIndicatorProps {
  label: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  getStatus: (v: number) => VitalStatus;
}

function VitalIndicator({ label, value, unit, icon, getStatus }: VitalIndicatorProps) {
  const status = getStatus(value);
  const colorMap: Record<VitalStatus, { bg: string; text: string; border: string; dot: string }> = {
    normal: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' },
    warning: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
    critical: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
  };
  const c = colorMap[status];

  const statusLabelMap: Record<VitalStatus, string> = {
    normal: 'Normal',
    warning: 'Attention',
    critical: 'Critique',
  };

  return (
    <div className={`flex flex-col items-center p-3 rounded-lg border ${c.border} ${c.bg}`}>
      <div className="flex items-center gap-1 mb-1">
        {icon}
        <span className="text-xs font-medium text-slate-500">{label}</span>
      </div>
      <span className={`text-2xl font-bold ${c.text}`}>{value}</span>
      <span className="text-xs text-slate-400">{unit}</span>
      <span className={`mt-1 inline-flex items-center gap-1 text-xs font-semibold ${c.text}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
        {statusLabelMap[status]}
      </span>
    </div>
  );
}

export default function Vitals() {
  const [searchTerm, setSearchTerm] = useState('');

  const patientVitals = mockVitals.map((vital) => {
    const patient = mockPatients.find((p) => p.id === vital.patient_id);
    return { vital, patient };
  }).filter((d) => d.patient);

  const filteredData = patientVitals.filter((d) => {
    if (!searchTerm) return true;
    const name = `${d.patient!.first_name} ${d.patient!.last_name}`.toLowerCase();
    return name.includes(searchTerm.toLowerCase());
  });

  const tempStatus = (v: number): VitalStatus => v > 37.5 ? 'critical' : v >= 37.0 ? 'warning' : 'normal';
  const bpStatus = (v: number): VitalStatus => v > 140 ? 'critical' : v >= 130 ? 'warning' : 'normal';
  const hrStatus = (v: number): VitalStatus => v > 100 ? 'critical' : v >= 90 ? 'warning' : 'normal';
  const o2Status = (v: number): VitalStatus => v < 90 ? 'critical' : v < 95 ? 'warning' : 'normal';
  const rrStatus = (v: number): VitalStatus => v > 20 ? 'critical' : v >= 18 ? 'warning' : 'normal';

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Surveillance des Signes Vitaux</h1>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un patient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
          />
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" /> Normal
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Attention
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Critique
        </span>
      </div>

      {/* Patient Vital Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredData.map(({ vital, patient }) => {
          if (!patient) return null;
          return (
            <div key={vital.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Card Header */}
              <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-base font-semibold text-slate-900">{patient.first_name} {patient.last_name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Chambre {patient.room_number} | {patient.diagnosis}</p>
                </div>
                <div className="flex items-center gap-2">
                  <RiskBadge level={patient.risk_level} />
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                    Enregistrer Nouveau
                  </button>
                </div>
              </div>

              {/* Vital Indicators */}
              <div className="p-4 grid grid-cols-5 gap-2">
                <VitalIndicator
                  label="Temp"
                  value={vital.temperature}
                  unit="C"
                  icon={<Thermometer className="w-3 h-3 text-red-400" />}
                  getStatus={tempStatus}
                />
                <VitalIndicator
                  label="TA"
                  value={vital.blood_pressure_systolic}
                  unit="mmHg"
                  icon={<Activity className="w-3 h-3 text-blue-400" />}
                  getStatus={bpStatus}
                />
                <VitalIndicator
                  label="FC"
                  value={vital.heart_rate}
                  unit="bpm"
                  icon={<Heart className="w-3 h-3 text-red-400" />}
                  getStatus={hrStatus}
                />
                <VitalIndicator
                  label="O2"
                  value={vital.oxygen_saturation}
                  unit="%"
                  icon={<Wind className="w-3 h-3 text-teal-400" />}
                  getStatus={o2Status}
                />
                <VitalIndicator
                  label="FR"
                  value={vital.respiratory_rate}
                  unit="resp/min"
                  icon={<Wind className="w-3 h-3 text-teal-400" />}
                  getStatus={rrStatus}
                />
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="w-3 h-3" />
                Dernier enregistrement : {formatTime(vital.recorded_at)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
