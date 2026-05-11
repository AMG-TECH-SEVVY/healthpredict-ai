import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend,
} from 'recharts';
import {
  FileText, Brain, Download, TrendingUp, Target, Building2, BarChart3,
} from 'lucide-react';
import StatCard from '../../components/shared/StatCard';
import { mockPredictions, departmentComparisonData } from '../../lib/mock-data';

const deptAccuracy = departmentComparisonData.map((d) => ({
  name: d.name,
  accuracy: Math.max(80, 100 - d.readmissionRate * 2.5 + Math.random() * 5),
}));

const confidenceDistribution = [
  { range: '50-60%', count: 0, fill: '#ef4444' },
  { range: '60-70%', count: 1, fill: '#f59e0b' },
  { range: '70-80%', count: 0, fill: '#eab308' },
  { range: '80-90%', count: 1, fill: '#3b82f6' },
  { range: '90-100%', count: 3, fill: '#10b981' },
].filter((d) => d.count > 0);

export default function Predictive() {
  const avgConfidence = Math.round(mockPredictions.reduce((s, p) => s + p.confidence_score, 0) / mockPredictions.length);
  const highRiskPreds = mockPredictions.filter((p) => p.predicted_value >= 70).length;
  const accuracyRate = Math.round(mockPredictions.filter((p) => p.confidence_score >= 85).length / mockPredictions.length * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Rapports Predictifs</h1>
            <p className="text-sm text-slate-500 mt-1">Resumes des predictions, metriques de precision & capacites d'export</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-sm">
              <Download className="w-4 h-4" /> PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm">
              <Download className="w-4 h-4" /> Excel
            </button>
          </div>
        </div>

        {/* Prediction Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Predictions"
            value={mockPredictions.length}
            subtitle="Modeles de readmission actifs"
            icon={<Brain className="w-5 h-5" />}
            trend={{ value: 12.3, positive: true }}
            color="blue"
          />
          <StatCard
            title="Confiance Moyenne"
            value={`${avgConfidence}%`}
            subtitle="Toutes predictions confondues"
            icon={<Target className="w-5 h-5" />}
            trend={{ value: 2.1, positive: true }}
            color="green"
          />
          <StatCard
            title="Predictions a Risque Eleve"
            value={highRiskPreds}
            subtitle="Score >= 70"
            icon={<TrendingUp className="w-5 h-5" />}
            color="red"
          />
          <StatCard
            title="Predictions Fiables"
            value={`${accuracyRate}%`}
            subtitle="Confiance >= 85%"
            icon={<BarChart3 className="w-5 h-5" />}
            color="teal"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Prediction Accuracy by Department */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Precision par Departement</h3>
                <p className="text-xs text-slate-500">Performance du modele par departement</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={deptAccuracy}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis domain={[70, 100]} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} formatter={(v) => `${Number(v).toFixed(1)}%`} />
                <Bar dataKey="accuracy" radius={[4, 4, 0, 0]} barSize={40}>
                  {deptAccuracy.map((entry, i) => (
                    <Cell key={i} fill={entry.accuracy >= 90 ? '#6366f1' : entry.accuracy >= 85 ? '#818cf8' : '#a5b4fc'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Confidence Score Distribution */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Distribution de Confiance</h3>
                <p className="text-xs text-slate-500">Plages de confiance des predictions</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={confidenceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="count"
                  stroke="none"
                >
                  {confidenceDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  iconSize={8}
                  formatter={(value: string) => <span className="text-xs text-slate-600">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 text-center">
              <p className="text-lg font-bold text-slate-900">{avgConfidence}%</p>
              <p className="text-xs text-slate-500">Confiance moyenne</p>
            </div>
          </div>
        </div>

        {/* Export Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Exporter les Rapports</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Resume des Predictions', desc: 'Toutes les predictions actives avec scores de risque & confiance', format: 'PDF', color: 'bg-red-50 border-red-200 hover:bg-red-100' },
              { title: 'Analyse Departementale', desc: 'Precision, distribution des risques & metriques par departement', format: 'Excel', color: 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100' },
              { title: 'Donnees Brutes des Predictions', desc: 'Enregistrements complets des predictions avec caracteristiques utilisees', format: 'CSV', color: 'bg-blue-50 border-blue-200 hover:bg-blue-100' },
            ].map((r) => (
              <div key={r.title} className={`p-4 rounded-xl border ${r.color} transition-colors cursor-pointer`}>
                <p className="text-sm font-semibold text-slate-800 mb-1">{r.title}</p>
                <p className="text-xs text-slate-500 mb-3">{r.desc}</p>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                  <Download className="w-3 h-3" />
                  Exporter en {r.format}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
