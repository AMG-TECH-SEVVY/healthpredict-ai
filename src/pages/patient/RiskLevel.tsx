import { Shield, AlertTriangle, TrendingUp, Brain, CheckCircle } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import RiskBadge from '../../components/shared/RiskBadge';
import { currentPatient, riskFactorsData } from '../../lib/mock-data';

const riskFactors = [
  { name: 'Admissions anterieures multiples', status: true, detail: '3 admissions dans les 6 derniers mois' },
  { name: 'Age superieur a 70 ans', status: true, detail: '72 ans' },
  { name: 'Comorbidites cardiaques', status: true, detail: 'Insuffisance cardiaque, hypertension' },
  { name: 'Duree de sejour prolongee', status: true, detail: '19 jours et plus' },
  { name: 'Observance medicamenteuse', status: false, detail: 'Taux d\'adherence: 88%' },
  { name: 'Support social a domicile', status: false, detail: 'Famille presente' },
];

const recommendations = [
  'Suivez rigoureusement votre traitement medicamenteux',
  'Surveillez votre poids quotidiennement',
  'Limitez votre consommation de sel et de liquides',
  'Reposez-vous suffisamment et evitez les efforts',
  'Signalez immediatement tout symptome inhabituel',
  'Assistez a tous vos rendez-vous de suivi',
];

export default function RiskLevel() {
  const riskColor = currentPatient.risk_level === 'high' ? '#dc2626' : currentPatient.risk_level === 'medium' ? '#f59e0b' : '#16a34a';

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Niveau de Risque de Readmission</h1>
        <p className="mt-1 text-sm text-slate-500">Evaluation par intelligence artificielle de votre risque</p>
      </div>

      {/* Risk Score Hero */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          {/* Score Circle */}
          <div className="relative w-40 h-40 flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#e2e8f0" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="52" fill="none"
                stroke={riskColor}
                strokeWidth="10"
                strokeDasharray={`${(currentPatient.risk_score / 100) * 327} 327`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-slate-900">{currentPatient.risk_score}</span>
              <span className="text-xs text-slate-500">/100</span>
            </div>
          </div>

          {/* Risk Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center gap-3 justify-center sm:justify-start mb-3">
              <h2 className="text-xl font-bold text-slate-900">Risque de Readmission</h2>
              <RiskBadge level={currentPatient.risk_level} />
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Votre score de risque de readmission est actuellement de <span className="font-bold text-slate-900">{currentPatient.risk_score}/100</span>.
              Ce score est calcule par notre modele d'intelligence artificielle en analysant vos donnees medicales.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Brain size={14} />
              <span>Modele IA v2.0 - Confiance: 94%</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <TrendingUp size={14} />
              <span>Derniere mise a jour: 9 Mai 2025</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Risk Factors */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-slate-900">Facteurs de Risque</h2>
            <p className="text-xs text-slate-500 mt-1">Elements contribuant a votre score</p>
          </div>
          <div className="space-y-3">
            {riskFactors.map((factor, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                {factor.status ? (
                  <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-sm font-medium text-slate-900">{factor.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{factor.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Factor Weights Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-slate-900">Poids des Facteurs</h2>
            <p className="text-xs text-slate-500 mt-1">Importance de chaque facteur dans le modele</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskFactorsData} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis type="number" domain={[0, 0.35]} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(v: number) => `${(v * 100).toFixed(0)}%`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#475569' }} width={130} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: 12 }} formatter={(v: any) => [`${(Number(v) * 100).toFixed(1)}%`, 'Poids']} />
              <Bar dataKey="weight" radius={[0, 6, 6, 0]} barSize={18}>
                {riskFactorsData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={index < 3 ? '#dc2626' : index < 5 ? '#f59e0b' : '#16a34a'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">Recommandations pour Reduire le Risque</h2>
          <p className="text-xs text-slate-500 mt-1">Conseils personnalises bases sur votre profil</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {recommendations.map((rec, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-teal-50 border border-teal-100">
              <Shield size={16} className="text-teal-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-teal-800">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
