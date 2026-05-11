import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { Brain, Target, Database, AlertTriangle, TrendingUp, Activity } from 'lucide-react';
import StatCard from '../../components/shared/StatCard';
import RiskBadge from '../../components/shared/RiskBadge';
import {
  mockPredictions, readmissionTrendData, riskDistributionData,
} from '../../lib/mock-data';

export default function Dashboard() {
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tableau de Bord Analytique</h1>
            <p className="text-sm text-slate-500 mt-1">Intelligence hospitaliere en temps reel & surveillance des modeles</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-emerald-700">Surveillance en Direct</span>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onMouseEnter={() => setHoveredStat('predictions')}
            onMouseLeave={() => setHoveredStat(null)}
            className={`transition-transform duration-200 ${hoveredStat === 'predictions' ? 'scale-[1.02]' : ''}`}
          >
            <StatCard
              title="Total Predictions"
              value="1,247"
              subtitle="30 Derniers Jours"
              icon={<Brain className="w-5 h-5" />}
              trend={{ value: 12.3, positive: true }}
              color="blue"
            />
          </div>
          <div
            onMouseEnter={() => setHoveredStat('accuracy')}
            onMouseLeave={() => setHoveredStat(null)}
            className={`transition-transform duration-200 ${hoveredStat === 'accuracy' ? 'scale-[1.02]' : ''}`}
          >
            <StatCard
              title="Precision du Modele"
              value="92.8%"
              subtitle="Modele readmission v2.0"
              icon={<Target className="w-5 h-5" />}
              trend={{ value: 1.4, positive: true }}
              color="green"
            />
          </div>
          <div
            onMouseEnter={() => setHoveredStat('completeness')}
            onMouseLeave={() => setHoveredStat(null)}
            className={`transition-transform duration-200 ${hoveredStat === 'completeness' ? 'scale-[1.02]' : ''}`}
          >
            <StatCard
              title="Completude des Donnees"
              value="85%"
              subtitle="7 categories suivies"
              icon={<Database className="w-5 h-5" />}
              trend={{ value: 3.2, positive: true }}
              color="teal"
            />
          </div>
          <div
            onMouseEnter={() => setHoveredStat('alerts')}
            onMouseLeave={() => setHoveredStat(null)}
            className={`transition-transform duration-200 ${hoveredStat === 'alerts' ? 'scale-[1.02]' : ''}`}
          >
            <StatCard
              title="Alertes Actives"
              value="5"
              subtitle="3 critiques, 2 avertissements"
              icon={<AlertTriangle className="w-5 h-5" />}
              trend={{ value: 2, positive: false }}
              color="red"
            />
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Readmission Trends */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Tendance des Readmissions</h3>
                  <p className="text-xs text-slate-500">Taux et volume de readmissions mensuels</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-blue-500 rounded" /> Readmissions
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-violet-500 rounded" /> Taux (%)
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={readmissionTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[0, 25]} unit="%" />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                />
                <Line yAxisId="left" type="monotone" dataKey="readmissions" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }} />
                <Line yAxisId="right" type="monotone" dataKey="rate" stroke="#8b5cf6" strokeWidth={2.5} strokeDasharray="5 5" dot={{ r: 4, fill: '#8b5cf6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Distribution Pie */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Distribution des Risques</h3>
                <p className="text-xs text-slate-500">Niveaux de risque actuels des patients</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  iconSize={8}
                  formatter={(value: string) => <span className="text-xs text-slate-600">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 grid grid-cols-3 gap-2 text-center">
              {riskDistributionData.map((d) => (
                <div key={d.name} className="bg-slate-50 rounded-lg py-2">
                  <p className="text-lg font-bold text-slate-900">{d.value}</p>
                  <p className="text-[10px] text-slate-500">{d.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Predictions Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Predictions IA Recentes</h3>
                <p className="text-xs text-slate-500">Dernieres evaluations du risque de readmission</p>
              </div>
            </div>
            <span className="text-xs text-slate-400">Modele v2.0</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">ID Patient</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Score de Risque</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Niveau de Risque</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Confiance</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Caracteristiques Cles</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Genere</th>
                </tr>
              </thead>
              <tbody>
                {mockPredictions.map((pred) => {
                  const level = pred.predicted_value >= 70 ? 'high' : pred.predicted_value >= 40 ? 'medium' : 'low';
                  const features = Object.entries(pred.features_used)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join(', ');
                  return (
                    <tr key={pred.id} className="border-t border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3 font-mono text-xs text-slate-700">{pred.patient_id.toUpperCase()}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{
                              backgroundColor: level === 'high' ? '#fef2f2' : level === 'medium' ? '#fffbeb' : '#f0fdf4',
                              color: level === 'high' ? '#dc2626' : level === 'medium' ? '#d97706' : '#16a34a',
                            }}
                          >
                            {pred.predicted_value}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3"><RiskBadge level={level} /></td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pred.confidence_score}%` }} />
                          </div>
                          <span className="text-xs text-slate-600">{pred.confidence_score}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-xs text-slate-500 max-w-[200px] truncate">{features}</td>
                      <td className="px-5 py-3 text-xs text-slate-400">
                        {new Date(pred.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
