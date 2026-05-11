import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import {
  Database, AlertTriangle, CheckCircle2, TrendingUp, Shield, FileWarning,
} from 'lucide-react';
import StatCard from '../../components/shared/StatCard';
import { dataCompletenessData } from '../../lib/mock-data';

const missingDataIndicators = [
  { category: 'Resultats Labo', field: 'Analyse des Gaz Sanguins', affected: 3, severity: 'high' as const },
  { category: 'Resultats Labo', field: 'Panel CBC', affected: 1, severity: 'medium' as const },
  { category: 'Plan de Sortie', field: 'Suivi Programme', affected: 5, severity: 'high' as const },
  { category: 'Plan de Sortie', field: 'Mode de Sortie', affected: 2, severity: 'medium' as const },
  { category: 'Suivi', field: 'Evaluation Post-sortie', affected: 4, severity: 'high' as const },
  { category: 'Suivi', field: 'Reconciliation des Medicaments', affected: 2, severity: 'medium' as const },
  { category: 'Medicaments', field: 'Taux d\'Observance', affected: 1, severity: 'low' as const },
  { category: 'Signes Vitaux', field: 'Frequence Respiratoire', affected: 1, severity: 'low' as const },
];

const recommendations = [
  { priority: 'Critique', text: 'Completer les evaluations de suivi manquantes pour 4 patients en Neurologie et Cardiologie.', impact: 'Ameliore la precision des predictions d\'environ 3,2%' },
  { priority: 'Eleve', text: 'Planifier les suivis post-sortie pour 5 patients manquant de plans de sortie.', impact: 'Reduit l\'erreur d\'estimation du taux de readmission' },
  { priority: 'Moyen', text: 'Ajouter les resultats d\'analyse des gaz sanguins pour 3 patients en Pneumologie.', impact: 'Ameliore la confiance des predictions BPCO' },
  { priority: 'Faible', text: 'Completer le suivi de l\'observance medicamenteuse pour 1 patient.', impact: 'Amelioration mineure du poids du modele' },
];

const severityColors: Record<string, { bg: string; text: string }> = {
  high: { bg: 'bg-red-100', text: 'text-red-700' },
  medium: { bg: 'bg-amber-100', text: 'text-amber-700' },
  low: { bg: 'bg-green-100', text: 'text-green-700' },
};

const severityLabels: Record<string, string> = {
  high: 'Eleve',
  medium: 'Moyen',
  low: 'Faible',
};

export default function DataQuality() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const avgCompleteness = Math.round(dataCompletenessData.reduce((s, d) => s + d.completeness, 0) / dataCompletenessData.length);
  const criticalMissing = missingDataIndicators.filter((m) => m.severity === 'high').length;
  const totalAffected = missingDataIndicators.reduce((s, m) => s + m.affected, 0);
  const categoriesBelow90 = dataCompletenessData.filter((d) => d.completeness < 90).length;

  const filteredIndicators = selectedCategory
    ? missingDataIndicators.filter((m) => m.category === selectedCategory)
    : missingDataIndicators;

  const getBarColor = (val: number) => {
    if (val >= 90) return '#10b981';
    if (val >= 75) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Gestion de la Qualite des Donnees</h1>
          <p className="text-sm text-slate-500 mt-1">Surveiller la completude, identifier les lacunes & ameliorer l'integrite des donnees pour la precision IA</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Score de Qualite"
            value={`${avgCompleteness}%`}
            subtitle="Moyenne par categorie"
            icon={<Shield className="w-5 h-5" />}
            trend={{ value: 3.2, positive: true }}
            color="green"
          />
          <StatCard
            title="Donnees Critiques Manquantes"
            value={criticalMissing}
            subtitle="Lacunes de haute gravite"
            icon={<AlertTriangle className="w-5 h-5" />}
            trend={{ value: 1, positive: false }}
            color="red"
          />
          <StatCard
            title="Total Affectes"
            value={totalAffected}
            subtitle="Dossiers patients impactes"
            icon={<FileWarning className="w-5 h-5" />}
            color="amber"
          />
          <StatCard
            title="Categories sous 90%"
            value={categoriesBelow90}
            subtitle="Necessitent amelioration"
            icon={<TrendingUp className="w-5 h-5" />}
            color="blue"
          />
        </div>

        {/* Data Completeness Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Completude des Donnees par Categorie</h3>
                <p className="text-xs text-slate-500">Pourcentage d'enregistrements avec des donnees completes par categorie</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> &gt;90%</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> 75-90%</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> &lt;75%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataCompletenessData} margin={{ bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} formatter={(v) => `${v}%`} />
              <Bar dataKey="completeness" radius={[4, 4, 0, 0]} barSize={32}>
                {dataCompletenessData.map((entry, index) => (
                  <Cell key={index} fill={getBarColor(entry.completeness)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Missing Data + Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Missing Data Indicators */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                  <FileWarning className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900">Indicateurs de Donnees Manquantes</h3>
              </div>
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 text-slate-600 bg-white"
              >
                <option value="">Toutes les Categories</option>
                {Array.from(new Set(missingDataIndicators.map((m) => m.category))).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2 max-h-[350px] overflow-y-auto">
              {filteredIndicators.map((m, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50/80 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700">{m.field}</p>
                    <p className="text-xs text-slate-500">{m.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-600">{m.affected} affectes</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${severityColors[m.severity].bg} ${severityColors[m.severity].text}`}>
                      {severityLabels[m.severity]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">Recommandations pour Amelioration</h3>
            </div>
            <div className="space-y-3">
              {recommendations.map((r, i) => (
                <div key={i} className="p-4 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      r.priority === 'Critique' ? 'bg-red-100 text-red-700' :
                      r.priority === 'Eleve' ? 'bg-amber-100 text-amber-700' :
                      r.priority === 'Moyen' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {r.priority}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 mb-1">{r.text}</p>
                  <p className="text-xs text-slate-500"><span className="font-medium">Impact:</span> {r.impact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
