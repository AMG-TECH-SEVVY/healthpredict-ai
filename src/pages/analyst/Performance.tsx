import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line,
} from 'recharts';
import {
  Building2, Activity, Clock, TrendingUp, BedDouble, Star,
} from 'lucide-react';
import StatCard from '../../components/shared/StatCard';
import { departmentComparisonData } from '../../lib/mock-data';

const performanceTrends = [
  { month: 'Jan', avgStay: 5.2, satisfaction: 82, occupancy: 78 },
  { month: 'Fev', avgStay: 5.0, satisfaction: 84, occupancy: 76 },
  { month: 'Mar', avgStay: 5.4, satisfaction: 81, occupancy: 82 },
  { month: 'Avr', avgStay: 4.8, satisfaction: 86, occupancy: 80 },
  { month: 'Mai', avgStay: 4.6, satisfaction: 88, occupancy: 77 },
];

export default function Performance() {
  const [chartView, setChartView] = useState<'bar' | 'trend'>('bar');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Performance Hopital</h1>
          <p className="text-sm text-slate-500 mt-1">ICP departementaux, tendances & analyses comparatives</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Duree Moyenne de Sejour"
            value="4.6 jours"
            subtitle="En baisse par rapport a 5.2 le mois dernier"
            icon={<Clock className="w-5 h-5" />}
            trend={{ value: 11.5, positive: true }}
            color="blue"
          />
          <StatCard
            title="Taux de Readmission"
            value="14.7%"
            subtitle="Tous departements confondus"
            icon={<Activity className="w-5 h-5" />}
            trend={{ value: 2.3, positive: true }}
            color="green"
          />
          <StatCard
            title="Occupation des Lits"
            value="77%"
            subtitle="144 sur 187 lits"
            icon={<BedDouble className="w-5 h-5" />}
            trend={{ value: 3.8, positive: false }}
            color="amber"
          />
          <StatCard
            title="Satisfaction Patient"
            value="88%"
            subtitle="Basee sur les enquetes de sortie"
            icon={<Star className="w-5 h-5" />}
            trend={{ value: 4.8, positive: true }}
            color="teal"
          />
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 w-fit">
          <button
            onClick={() => setChartView('bar')}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-all ${
              chartView === 'bar' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Comparaison des Departements
          </button>
          <button
            onClick={() => setChartView('trend')}
            className={`px-4 py-2 text-xs font-medium rounded-md transition-all ${
              chartView === 'trend' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Tendances de Performance
          </button>
        </div>

        {/* Main Chart */}
        {chartView === 'bar' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Comparaison des Departements</h3>
                  <p className="text-xs text-slate-500">Taux de readmission, score de risque moyen & volume de patients</p>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={departmentComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="readmissionRate" fill="#6366f1" radius={[4, 4, 0, 0]} name="Taux de Readmission %" />
                <Bar dataKey="avgRiskScore" fill="#a5b4fc" radius={[4, 4, 0, 0]} name="Score de Risque Moyen" />
                <Bar dataKey="patients" fill="#c7d2fe" radius={[4, 4, 0, 0]} name="Patients" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {chartView === 'trend' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Tendances de Performance dans le Temps</h3>
                  <p className="text-xs text-slate-500">ICP hospitaliers mensuels</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-blue-500 rounded" /> Sejour Moyen</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-emerald-500 rounded" /> Satisfaction</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-amber-500 rounded" /> Occupation</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={performanceTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                <Line type="monotone" dataKey="avgStay" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, fill: '#3b82f6' }} name="Sejour Moyen (jours)" />
                <Line type="monotone" dataKey="satisfaction" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: '#10b981' }} name="Satisfaction %" />
                <Line type="monotone" dataKey="occupancy" stroke="#f59e0b" strokeWidth={2.5} strokeDasharray="6 4" dot={{ r: 4, fill: '#f59e0b' }} name="Occupation %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Department Detail Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departmentComparisonData.map((dept) => (
            <div key={dept.name} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-slate-800">{dept.name}</h4>
                <span className="text-xs text-slate-400">{dept.patients} patients</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">Taux de Readmission</p>
                  <p className="text-lg font-bold text-slate-900">{dept.readmissionRate}%</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">Score de Risque Moyen</p>
                  <p className="text-lg font-bold text-slate-900">{dept.avgRiskScore}</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                  <span>Niveau de Risque</span>
                  <span>{dept.avgRiskScore >= 70 ? 'Eleve' : dept.avgRiskScore >= 50 ? 'Moyen' : 'Faible'}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${dept.avgRiskScore}%`,
                      backgroundColor: dept.avgRiskScore >= 70 ? '#ef4444' : dept.avgRiskScore >= 50 ? '#f59e0b' : '#10b981',
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
