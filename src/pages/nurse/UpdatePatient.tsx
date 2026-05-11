import { useState } from 'react';
import {
  Save,
  User,
  Thermometer,
  Activity,
  Heart,
  Wind,
  FileText,
  CheckCircle,
  ChevronDown,
} from 'lucide-react';
import { mockPatients, mockVitals } from '../../lib/mock-data';

export default function UpdatePatient() {
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    temperature: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    heartRate: '',
    oxygenSaturation: '',
    respiratoryRate: '',
    notes: '',
    followUpStatus: 'routine',
  });

  const selectedPatient = mockPatients.find((p) => p.id === selectedPatientId);
  const currentVitals = mockVitals.find((v) => v.patient_id === selectedPatientId);

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handlePatientChange = (patientId: string) => {
    setSelectedPatientId(patientId);
    const vitals = mockVitals.find((v) => v.patient_id === patientId);
    if (vitals) {
      setForm({
        temperature: vitals.temperature.toString(),
        bloodPressureSystolic: vitals.blood_pressure_systolic.toString(),
        bloodPressureDiastolic: vitals.blood_pressure_diastolic.toString(),
        heartRate: vitals.heart_rate.toString(),
        oxygenSaturation: vitals.oxygen_saturation.toString(),
        respiratoryRate: vitals.respiratory_rate.toString(),
        notes: '',
        followUpStatus: 'routine',
      });
    } else {
      setForm({
        temperature: '',
        bloodPressureSystolic: '',
        bloodPressureDiastolic: '',
        heartRate: '',
        oxygenSaturation: '',
        respiratoryRate: '',
        notes: '',
        followUpStatus: 'routine',
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Mise a Jour Patient</h1>

      {/* Success Banner */}
      {showSuccess && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-4">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-sm font-medium text-green-800">Informations du patient enregistrees avec succes.</p>
        </div>
      )}

      {/* Patient Selector */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">Selectionner un Patient</label>
        <div className="relative">
          <select
            value={selectedPatientId}
            onChange={(e) => handlePatientChange(e.target.value)}
            className="w-full md:w-96 appearance-none border border-slate-300 rounded-lg px-4 py-3 text-base text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">-- Choisir un patient --</option>
            {mockPatients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.first_name} {p.last_name} - Chambre {p.room_number}
              </option>
            ))}
          </select>
          <ChevronDown className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {selectedPatient && (
          <div className="mt-4 flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{selectedPatient.first_name} {selectedPatient.last_name}</p>
              <p className="text-xs text-slate-500">Chambre {selectedPatient.room_number} | {selectedPatient.diagnosis} | {selectedPatient.department}</p>
            </div>
          </div>
        )}
      </div>

      {selectedPatientId && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vitals Form */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-5 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Signes Vitaux
            </h2>
            {currentVitals && (
              <p className="text-xs text-slate-400 mb-4">
                Dernier enregistrement : {new Date(currentVitals.recorded_at).toLocaleString()}
              </p>
            )}
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5">
                    <Thermometer className="w-4 h-4 text-red-500" /> Temperature (C)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={form.temperature}
                    onChange={(e) => setForm({ ...form, temperature: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 text-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="36.5"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5">
                    <Heart className="w-4 h-4 text-red-500" /> Frequence Cardiaque (bpm)
                  </label>
                  <input
                    type="number"
                    value={form.heartRate}
                    onChange={(e) => setForm({ ...form, heartRate: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 text-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="72"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5">
                  <Activity className="w-4 h-4 text-blue-500" /> Tension Arterielle (mmHg)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={form.bloodPressureSystolic}
                    onChange={(e) => setForm({ ...form, bloodPressureSystolic: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 text-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Systolique"
                  />
                  <input
                    type="number"
                    value={form.bloodPressureDiastolic}
                    onChange={(e) => setForm({ ...form, bloodPressureDiastolic: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 text-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Diastolique"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5">
                    <Wind className="w-4 h-4 text-teal-500" /> Saturation O2 (%)
                  </label>
                  <input
                    type="number"
                    value={form.oxygenSaturation}
                    onChange={(e) => setForm({ ...form, oxygenSaturation: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 text-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="98"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5">
                    <Wind className="w-4 h-4 text-teal-500" /> Frequence Respiratoire
                  </label>
                  <input
                    type="number"
                    value={form.respiratoryRate}
                    onChange={(e) => setForm({ ...form, respiratoryRate: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 text-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="16"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notes & Follow-up */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-5 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Notes
              </h2>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={5}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Ajouter des notes cliniques, observations ou mises a jour..."
              />
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-5">Statut du Suivi</h2>
              <div className="space-y-3">
                {['routine', 'due_soon', 'urgent'].map((status) => {
                  const labels: Record<string, { label: string; color: string }> = {
                    routine: { label: 'Routine', color: 'border-green-400 bg-green-50 text-green-700' },
                    due_soon: { label: 'Bientot Du', color: 'border-amber-400 bg-amber-50 text-amber-700' },
                    urgent: { label: 'Urgent', color: 'border-red-400 bg-red-50 text-red-700' },
                  };
                  const cfg = labels[status];
                  return (
                    <label
                      key={status}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        form.followUpStatus === status ? cfg.color : 'border-slate-200 bg-white text-slate-500'
                      }`}
                    >
                      <input
                        type="radio"
                        name="followUpStatus"
                        value={status}
                        checked={form.followUpStatus === status}
                        onChange={(e) => setForm({ ...form, followUpStatus: e.target.value })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-semibold">{cfg.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white rounded-xl text-base font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Save className="w-5 h-5" />
              Enregistrer les Informations du Patient
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
