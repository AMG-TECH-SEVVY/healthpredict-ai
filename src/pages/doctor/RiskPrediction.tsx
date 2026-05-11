import { useState } from 'react';
import {
  ShieldAlert,
  Activity,
  ChevronDown,
  Calendar,
  TrendingUp,
  Brain,
  History,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import RiskBadge from '../../components/shared/RiskBadge';
import {
  mockPatients,
  riskFactorsData,
  riskDistributionData,
} from '../../lib/mock-data';
const predictionHistory = [
  { date: '2025-05-09', prediction: 'Readmission Elevee', confidence: 94, outcome: 'En attente' },
  { date: '2025-05-08', prediction: 'Readmission Moyenne', confidence: 82, outcome: 'En attente' },
  { date: '2025-05-07', prediction: 'Readmission Faible', confidence: 91, outcome: 'Non Readmis' },
  { date: '2025-05-06', prediction: 'Readmission Elevee', confidence: 88, outcome: 'Readmis' },
  { date: '2025-05-05', prediction: 'Readmission Moyenne', confidence: 79, outcome: 'Non Readmis' },
];

function getRiskColor(score: number): string {
  if (score >= 70) return '#dc2626';
  if (score >= 40) return '#f59e0b';
  return '#16a34a';
}

function getRiskGradient(score: number): { start: string; end: string } {
  if (score >= 70) return { start: '#dc2626', end: '#fca5a5' };
  if (score >= 40) return { start: '#f59e0b', end: '#fcd34d' };
  return { start: '#16a34a', end: '#86efac' };
}

function RiskGauge({ score }: { score: number }) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const gap = circumference * 0.25;
  const dashOffset = gap / 2;
  const color = getRiskColor(score);

  return (
    <div className="relative flex items-center justify-center">
      <svg width="220" height="220" viewBox="0 0 220 220" className="transform -rotate-90">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={getRiskGradient(score).start} />
            <stop offset="100%" stopColor={getRiskGradient(score).end} />
          </linearGradient>
        </defs>
        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="14"
          strokeDasharray={`${circumference - gap} ${gap}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="14"
          strokeDasharray={`${progress > circumference - gap ? circumference - gap : progress} ${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.8s ease-in-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold" style={{ color }}>
          {score}
        </span>
        <span className="text-xs text-slate-500 mt-0.5">Score de Risque</span>
      </div>
    </div>
  );
}

function RiskFactorBar({ name, weight }: { name: string; weight: number }) {
  const percentage = weight * 100;
  const barColor = weight >= 0.2 ? '#1e40af' : weight >= 0.15 ? '#2563eb' : '#3b82f6';

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-slate-600 w-36 truncate">{name}</span>
      <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${percentage}%`, backgroundColor: barColor }}
        />
      </div>
      <span className="text-xs font-semibold text-slate-700 w-10 text-right">
        {percentage.toFixed(0)}%
      </span>
    </div>
  );
}

export default function RiskPrediction() {
  const [selectedPatientId, setSelectedPatientId] = useState<string>(mockPatients[0].id);

  const selectedPatient = mockPatients.find((p) => p.id === selectedPatientId) ?? mockPatients[0];

  const handlePatientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPatientId(e.target.value);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Centre de Prediction des Risques</h1>
            <p className="mt-1 text-sm text-slate-500">
              Prediction de readmission par IA et evaluation des risques patients
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
              <Brain className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">Modele v2.0</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg">
              <Activity className="w-4 h-4 text-green-600" />
              <span className="text-xs font-medium text-green-700">Precision 92.8%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Selector */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <label className="text-sm font-medium text-slate-700 whitespace-nowrap">
            Selectionner un Patient:
          </label>
          <div className="relative w-full sm:w-80">
            <select
              value={selectedPatientId}
              onChange={handlePatientChange}
              className="w-full pl-4 pr-10 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors bg-slate-50 text-slate-700 appearance-none cursor-pointer"
            >
              {mockPatients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.first_name} {p.last_name} ({p.patient_id})
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Risk Profile Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-blue-400" />
            <h2 className="text-base font-semibold text-white">Profil de Risque du Patient</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Evaluation complete des risques pour le patient selectionne
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Patient Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {selectedPatient.photo_url ? (
                  <img
                    src={selectedPatient.photo_url}
                    alt={`${selectedPatient.first_name} ${selectedPatient.last_name}`}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-slate-100"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-lg font-bold">
                    {selectedPatient.first_name[0]}
                    {selectedPatient.last_name[0]}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {selectedPatient.first_name} {selectedPatient.last_name}
                  </h3>
                  <p className="text-sm text-slate-500 font-mono">
                    {selectedPatient.patient_id}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-lg px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                    Departement
                  </p>
                  <p className="text-sm font-medium text-slate-800 mt-0.5">
                    {selectedPatient.department}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-lg px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                    Age / Sexe
                  </p>
                  <p className="text-sm font-medium text-slate-800 mt-0.5">
                    {selectedPatient.age} / {selectedPatient.gender}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-lg px-3 py-2.5 col-span-2">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                    Diagnostic
                  </p>
                  <p className="text-sm font-medium text-slate-800 mt-0.5">
                    {selectedPatient.diagnosis}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-lg px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                    Chambre
                  </p>
                  <p className="text-sm font-medium text-slate-800 mt-0.5">
                    {selectedPatient.room_number}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-lg px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                    Statut
                  </p>
                  <p className="text-sm font-medium text-slate-800 mt-0.5 capitalize">
                    {selectedPatient.status}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <span className="text-xs text-slate-500 font-medium">Niveau de Risque:</span>
                <RiskBadge level={selectedPatient.risk_level} />
              </div>
            </div>

            {/* Center: Risk Score Gauge */}
            <div className="flex flex-col items-center justify-center">
              <RiskGauge score={selectedPatient.risk_score} />
              <div className="mt-3 text-center">
                <p className="text-xs text-slate-500">
                  Probabilite de readmission predite dans les 30 jours
                </p>
              </div>
            </div>

            {/* Right: Key Risk Factors */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                Facteurs de Risque Cles
              </h3>
              <div className="space-y-3">
                {riskFactorsData.map((factor) => (
                  <RiskFactorBar key={factor.name} name={factor.name} weight={factor.weight} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Left: Risk Factor Contribution Bar Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-slate-900">
              Contribution des Facteurs de Risque
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Poids des caracteristiques dans le modele de prediction de readmission
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={riskFactorsData}
              layout="vertical"
              margin={{ top: 0, right: 20, bottom: 0, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                horizontal={false}
              />
              <XAxis
                type="number"
                domain={[0, 0.35]}
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
                tickFormatter={(v: number) => `${(v * 100).toFixed(0)}%`}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 11, fill: '#475569' }}
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
                width={120}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  fontSize: 12,
                }}
                formatter={(value: any) => [
                  `${(value * 100).toFixed(1)}%`,
                  'Poids',
                ]}
              />
              <Bar
                dataKey="weight"
                fill="#1e40af"
                radius={[0, 6, 6, 0]}
                barSize={18}
              >
                {riskFactorsData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      index === 0
                        ? '#1e40af'
                        : index === 1
                        ? '#1d4ed8'
                        : index === 2
                        ? '#2563eb'
                        : index === 3
                        ? '#3b82f6'
                        : index === 4
                        ? '#60a5fa'
                        : '#93bbfd'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Right: Risk Distribution Pie Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-slate-900">
              Distribution des Risques
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Repartition actuelle des niveaux de risque des patients
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistributionData}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {riskDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  fontSize: 12,
                }}
                formatter={(value: any, name: any) => [value, name]}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Prediction History */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <History className="w-5 h-5 text-slate-600" />
          <div>
            <h2 className="text-base font-semibold text-slate-900">Historique des Predictions</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Predictions de readmission passees et resultats
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="text-left py-3.5 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left py-3.5 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Prediction
                </th>
                <th className="text-left py-3.5 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Confiance
                </th>
                <th className="text-left py-3.5 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Resultat
                </th>
              </tr>
            </thead>
            <tbody>
              {predictionHistory.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors"
                >
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-700">
                        {new Date(row.date).toLocaleDateString('fr-FR', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-5">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        row.prediction === 'Readmission Elevee'
                          ? 'bg-red-100 text-red-700'
                          : row.prediction === 'Readmission Moyenne'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {row.prediction}
                    </span>
                  </td>
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-blue-600"
                          style={{ width: `${row.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-700">
                        {row.confidence}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-5">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        row.outcome === 'Readmis'
                          ? 'bg-red-100 text-red-700'
                          : row.outcome === 'Non Readmis'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {row.outcome}
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
