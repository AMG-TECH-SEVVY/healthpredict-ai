import { useState } from 'react';
import {
  MapPin,
  Clock,
  CheckSquare,
  Square,
  Stethoscope,
} from 'lucide-react';
import { mockPatients, mockMedications } from '../../lib/mock-data';
import RiskBadge from '../../components/shared/RiskBadge';

interface FollowUpItem {
  id: string;
  label: string;
  checked: boolean;
}

interface PatientFollowUp {
  patientId: string;
  patientName: string;
  room: string;
  diagnosis: string;
  lastFollowUp: string;
  items: FollowUpItem[];
}

function generateFollowUpItems(patientId: string): FollowUpItem[] {
  const patient = mockPatients.find((p) => p.id === patientId);
  const meds = mockMedications.filter((m) => m.patient_id === patientId);
  const items: FollowUpItem[] = [
    { id: `${patientId}-vitals`, label: 'Enregistrer les vitaux', checked: false },
    { id: `${patientId}-meds`, label: meds.length > 0 ? `Administrer les medicaments (${meds.map(m => m.medication_name).join(', ')})` : 'Reviser les medicaments', checked: false },
    { id: `${patientId}-pain`, label: 'Evaluation de la douleur', checked: false },
    { id: `${patientId}-notes`, label: 'Mettre a jour les notes cliniques', checked: false },
  ];
  if (patient?.status === 'critical') {
    items.unshift({ id: `${patientId}-critical`, label: 'Controle patient critique', checked: false });
  }
  return items;
}

export default function FollowUp() {
  const followUpPatients: PatientFollowUp[] = mockPatients
    .filter((p) => p.status === 'critical' || p.risk_level === 'high' || p.risk_level === 'medium')
    .map((p) => ({
      patientId: p.id,
      patientName: `${p.first_name} ${p.last_name}`,
      room: p.room_number,
      diagnosis: p.diagnosis,
      lastFollowUp: '08:00',
      items: generateFollowUpItems(p.id),
    }));

  const [checkStates, setCheckStates] = useState<Record<string, Record<string, boolean>>>({});

  const toggleItem = (patientId: string, itemId: string) => {
    setCheckStates((prev) => ({
      ...prev,
      [patientId]: {
        ...prev[patientId],
        [itemId]: !prev[patientId]?.[itemId],
      },
    }));
  };

  const isChecked = (patientId: string, itemId: string) => {
    return checkStates[patientId]?.[itemId] || false;
  };

  const getCheckedCount = (patient: PatientFollowUp) => {
    return patient.items.filter((item) => isChecked(patient.patientId, item.id)).length;
  };

  const progressPercent = (patient: PatientFollowUp) => {
    return Math.round((getCheckedCount(patient) / patient.items.length) * 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Suivi Quotidien des Patients</h1>
        <span className="text-sm text-slate-500">{followUpPatients.length} patients a suivre</span>
      </div>

      {/* Follow-up Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {followUpPatients.map((patient) => {
          const pct = progressPercent(patient);
          const allDone = pct === 100;
          const checkedCount = getCheckedCount(patient);

          return (
            <div
              key={patient.patientId}
              className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-all ${
                allDone ? 'border-green-200' : 'border-slate-200 hover:shadow-md'
              }`}
            >
              {/* Card Header */}
              <div className={`px-5 py-4 border-b ${allDone ? 'bg-green-50 border-green-100' : 'bg-slate-50 border-slate-100'}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-base font-semibold text-slate-900">{patient.patientName}</p>
                      <RiskBadge level={mockPatients.find((p) => p.id === patient.patientId)?.risk_level || 'low'} />
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Chambre {patient.room}
                      </span>
                      <span className="flex items-center gap-1">
                        <Stethoscope className="w-3 h-3" />
                        {patient.diagnosis}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Dernier : {patient.lastFollowUp}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${allDone ? 'text-green-600' : 'text-blue-600'}`}>
                      {pct}%
                    </p>
                    <p className="text-xs text-slate-400">{checkedCount}/{patient.items.length}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      allDone ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {/* Checklist */}
              <div className="px-5 py-3 divide-y divide-slate-100">
                {patient.items.map((item) => {
                  const checked = isChecked(patient.patientId, item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(patient.patientId, item.id)}
                      className="w-full flex items-center gap-3 py-3 text-left hover:bg-slate-50 transition-colors -mx-2 px-2 rounded"
                    >
                      {checked ? (
                        <CheckSquare className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-300 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${checked ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
