import { useState } from 'react';
import {
  Thermometer,
  Heart,
  Activity,
  Droplets,
  Scale,
  Ruler,
  Frown,
  Save,
  Plus,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { mockPatientVitals, patientVitalsTrend } from '../../lib/mock-data';

const symptomOptions = [
  'Fatigue', 'Essoufflement', 'Douleur thoracique', 'Vertiges',
  'Nausees', 'Maux de tete', 'Gonflement des jambes', 'Toux',
  'Palpitations', 'Sueurs nocturnes',
];

export default function PatientVitals() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    temperature: '',
    blood_pressure_systolic: '',
    blood_pressure_diastolic: '',
    heart_rate: '',
    blood_sugar: '',
    oxygen_saturation: '',
    weight: '',
    height: '',
    pain_level: 0,
    symptoms: [] as string[],
  });

  const latestVitals = mockPatientVitals[0];

  const handleSymptomToggle = (symptom: string) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowForm(false);
    setFormData({
      temperature: '', blood_pressure_systolic: '', blood_pressure_diastolic: '',
      heart_rate: '', blood_sugar: '', oxygen_saturation: '', weight: '', height: '',
      pain_level: 0, symptoms: [],
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Signes Vitaux</h1>
          <p className="mt-1 text-sm text-slate-500">Suivez et enregistrez vos signes vitaux</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={16} />
          {showForm ? 'Annuler' : 'Nouvel Enregistrement'}
        </button>
      </div>

      {/* Input Form */}
      {showForm && (
        <div className="mb-8 bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-5">Entrez vos signes vitaux</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <VitalInput
                icon={<Thermometer size={16} />}
                label="Temperature (°C)"
                value={formData.temperature}
                onChange={(v) => setFormData({ ...formData, temperature: v })}
                placeholder="ex: 37.2"
              />
              <VitalInput
                icon={<Heart size={16} />}
                label="Tension systolique (mmHg)"
                value={formData.blood_pressure_systolic}
                onChange={(v) => setFormData({ ...formData, blood_pressure_systolic: v })}
                placeholder="ex: 120"
              />
              <VitalInput
                icon={<Heart size={16} />}
                label="Tension diastolique (mmHg)"
                value={formData.blood_pressure_diastolic}
                onChange={(v) => setFormData({ ...formData, blood_pressure_diastolic: v })}
                placeholder="ex: 80"
              />
              <VitalInput
                icon={<Activity size={16} />}
                label="Frequence cardiaque (bpm)"
                value={formData.heart_rate}
                onChange={(v) => setFormData({ ...formData, heart_rate: v })}
                placeholder="ex: 72"
              />
              <VitalInput
                icon={<Droplets size={16} />}
                label="Glycemie (g/L)"
                value={formData.blood_sugar}
                onChange={(v) => setFormData({ ...formData, blood_sugar: v })}
                placeholder="ex: 1.0"
              />
              <VitalInput
                icon={<Droplets size={16} />}
                label="Saturation O2 (%)"
                value={formData.oxygen_saturation}
                onChange={(v) => setFormData({ ...formData, oxygen_saturation: v })}
                placeholder="ex: 98"
              />
              <VitalInput
                icon={<Scale size={16} />}
                label="Poids (kg)"
                value={formData.weight}
                onChange={(v) => setFormData({ ...formData, weight: v })}
                placeholder="ex: 75"
              />
              <VitalInput
                icon={<Ruler size={16} />}
                label="Taille (cm)"
                value={formData.height}
                onChange={(v) => setFormData({ ...formData, height: v })}
                placeholder="ex: 170"
              />
            </div>

            {/* Pain Level */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
                <Frown size={16} /> Niveau de douleur: <span className="text-blue-600 font-bold">{formData.pain_level}/10</span>
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={formData.pain_level}
                onChange={(e) => setFormData({ ...formData, pain_level: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Aucune</span>
                <span>Moderee</span>
                <span>Intense</span>
              </div>
            </div>

            {/* Symptoms */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-3 block">Symptomes ressentis</label>
              <div className="flex flex-wrap gap-2">
                {symptomOptions.map((symptom) => (
                  <button
                    key={symptom}
                    type="button"
                    onClick={() => handleSymptomToggle(symptom)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      formData.symptoms.includes(symptom)
                        ? 'bg-blue-100 text-blue-700 border border-blue-300'
                        : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-sm"
            >
              <Save size={16} />
              Enregistrer
            </button>
          </form>
        </div>
      )}

      {/* Current Vitals Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
        <VitalCard icon={<Thermometer size={20} />} label="Temperature" value={`${latestVitals.temperature}°C`} normal="36.5-37.5°C" isAlert={latestVitals.temperature > 37.5} />
        <VitalCard icon={<Heart size={20} />} label="Tension Arterielle" value={`${latestVitals.blood_pressure_systolic}/${latestVitals.blood_pressure_diastolic}`} normal="< 140/90" isAlert={latestVitals.blood_pressure_systolic > 140} />
        <VitalCard icon={<Activity size={20} />} label="Frequence Cardiaque" value={`${latestVitals.heart_rate} bpm`} normal="60-100 bpm" isAlert={latestVitals.heart_rate > 100} />
        <VitalCard icon={<Droplets size={20} />} label="Saturation O2" value={`${latestVitals.oxygen_saturation}%`} normal="> 95%" isAlert={latestVitals.oxygen_saturation < 93} />
        <VitalCard icon={<Scale size={20} />} label="Glycemie" value={`${latestVitals.blood_sugar} g/L`} normal="0.7-1.1 g/L" isAlert={latestVitals.blood_sugar > 1.26} />
      </div>

      {/* Trend Chart */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6 mb-8">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">Evolution des Signes Vitaux</h2>
          <p className="text-xs text-slate-500 mt-1">Tendance sur les 7 derniers jours</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={patientVitalsTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: 12 }} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="tension" name="Tension" stroke="#1e40af" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="cardiaque" name="Cardiaque" stroke="#dc2626" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="oxygene" name="O2 %" stroke="#16a34a" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">Historique des Enregistrements</h2>
          <p className="text-xs text-slate-500 mt-1">Derniers signes vitaux enregistres</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Date</th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Temp.</th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Tension</th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Card.</th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-slate-500 uppercase">O2</th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Douleur</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 uppercase">Symptomes</th>
              </tr>
            </thead>
            <tbody>
              {mockPatientVitals.map((v) => (
                <tr key={v.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="py-3 px-3 text-slate-600">
                    {new Date(v.recorded_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                  </td>
                  <td className={`py-3 px-3 text-center font-medium ${v.temperature > 37.5 ? 'text-red-600' : 'text-slate-900'}`}>
                    {v.temperature}°C
                  </td>
                  <td className={`py-3 px-3 text-center font-medium ${v.blood_pressure_systolic > 140 ? 'text-red-600' : 'text-slate-900'}`}>
                    {v.blood_pressure_systolic}/{v.blood_pressure_diastolic}
                  </td>
                  <td className={`py-3 px-3 text-center font-medium ${v.heart_rate > 100 ? 'text-red-600' : 'text-slate-900'}`}>
                    {v.heart_rate}
                  </td>
                  <td className={`py-3 px-3 text-center font-medium ${v.oxygen_saturation < 93 ? 'text-red-600' : 'text-slate-900'}`}>
                    {v.oxygen_saturation}%
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                      v.pain_level >= 7 ? 'bg-red-100 text-red-700' : v.pain_level >= 4 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {v.pain_level}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex flex-wrap gap-1">
                      {v.symptoms.length > 0 ? v.symptoms.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">{s}</span>
                      )) : <span className="text-xs text-slate-400">Aucun</span>}
                    </div>
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

function VitalInput({ icon, label, value, onChange, placeholder }: {
  icon: React.ReactNode; label: string; value: string; onChange: (v: string) => void; placeholder: string;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1.5">{icon} {label}</label>
      <input
        type="number"
        step="any"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
      />
    </div>
  );
}

function VitalCard({ icon, label, value, normal, isAlert }: {
  icon: React.ReactNode; label: string; value: string; normal: string; isAlert: boolean;
}) {
  return (
    <div className={`rounded-xl border p-4 ${isAlert ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200'}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={isAlert ? 'text-red-500' : 'text-blue-500'}>{icon}</span>
        <span className="text-xs font-medium text-slate-500">{label}</span>
      </div>
      <p className={`text-xl font-bold ${isAlert ? 'text-red-700' : 'text-slate-900'}`}>{value}</p>
      <p className="text-[10px] text-slate-400 mt-1">Normal: {normal}</p>
      {isAlert && <p className="text-[10px] text-red-500 font-medium mt-0.5">Hors norme</p>}
    </div>
  );
}
