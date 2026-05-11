import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
} from 'recharts';
import {
  TrendingUp, Building2, Filter, Calendar, ChevronDown, BarChart3, Users,
} from 'lucide-react';
import StatCard from '../../components/shared/StatCard';
import {
  readmissionTrendData, departmentComparisonData, mockPatients,
} from '../../lib/mock-data';

const departments = ['Tous les Departements', 'Cardiologie', 'Pneumologie', 'Neurologie', 'Orthopedie', 'Oncologie'];
const timeRanges = ['30 Derniers Jours', '90 Derniers Jours', '6 Derniers Mois', 'Derniere Annee'];

export default function Readmission() {
  const [selectedDept, setSelectedDept] = useState('Tous les Departements');
  const [selectedRange, setSelectedRange] = useState('6 Derniers Mois');
  const [showDeptFilter, setShowDeptFilter] = useState(false);
  const [showRangeFilter, setShowRangeFilter] = useState(false);

  const totalReadmissions = readmissionTrendData.reduce((s, d) => s + d.readmissions, 0);
  const avgRate = (readmissionTrendData.reduce((s, d) => s + d.rate, 0) / readmissionTrendData.length).toFixed(1);
  const highRiskCount = mockPatients.filter((p) => p.risk_level === 'high').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Analyses de Readmission</h1>
            <p className="text-sm text-slate-500 mt-1">Analyse approfondie des tendances de readmission, metriques departementales & segmentation des risques</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Department Filter */}
            <div className="relative">
              <button
                onClick={() => { setShowDeptFilter(!showDeptFilter); setShowRangeFilter(false); }}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:border-slate-300 transition-colors"
              >
                <Building2 className="w-4 h-4 text-slate-400" />
                {selectedDept}
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {showDeptFilter && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-10 py-1">
                  {departments.map((d) => (
                    <button
                      key={d}
                      onClick={() => { setSelectedDept(d); setShowDeptFilter(false); }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 ${selectedDept === d ? 'text-blue-600 font-medium bg-blue-50' : 'text-slate-700'}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Time Range Filter */}
            <div className="relative">
              <button
                onClick={() => { setShowRangeFilter(!showRangeFilter); setShowDeptFilter(false); }}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:border-slate-300 transition-colors"
              >
                <Calendar className="w-4 h-4 text-slate-400" />
                {selectedRange}
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {showRangeFilter && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-10 py-1">
                  {timeRanges.map((r) => (
                    <button
                      key={r}
                      onClick={() => { setSelectedRange(r); setShowRangeFilter(false); }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 ${selectedRange === r ? 'text-blue-600 font-medium bg-blue-50' : 'text-slate-700'}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Readmissions"
            value={totalReadmissions}
            subtitle="Total sur la periode"
            icon={<TrendingUp className="w-5 h-5" />}
            trend={{ value: 8.2, positive: false }}
            color="red"
          />
          <StatCard
            title="Taux Moyen de Readmission"
            value={`${avgRate}%`}
            subtitle="Tous departements confondus"
            icon={<BarChart3 className="w-5 h-5" />}
            trend={{ value: 2.1, positive: true }}
            color="blue"
          />
          <StatCard
            title="Patients a Risque Eleve"
            value={highRiskCount}
            subtitle="Actuellement signales"
            icon={<Users className="w-5 h-5" />}
            trend={{ value: 1, positive: false }}
            color="amber"
          />
          <StatCard
            title="Departements"
            value={departmentComparisonData.length}
            subtitle="Surveillance active"
            icon={<Building2 className="w-5 h-5" />}
            color="teal"
          />
        </div>

        {/* Readmission Trend Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Analyse de Tendance des Readmissions</h3>
                <p className="text-xs text-slate-500">Volume, total des sorties & taux dans le temps</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-blue-500 rounded" /> Readmissions</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-emerald-500 rounded" /> Total</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-violet-500 rounded" /> Taux</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={readmissionTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[0, 25]} unit="%" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <Line yAxisId="left" type="monotone" dataKey="readmissions" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
              <Line yAxisId="left" type="monotone" dataKey="total" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: '#10b981' }} />
              <Line yAxisId="right" type="monotone" dataKey="rate" stroke="#8b5cf6" strokeWidth={2.5} strokeDasharray="6 4" dot={{ r: 4, fill: '#8b5cf6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Comparison + Risk Segmentation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Comparison */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Comparaison des Departements</h3>
                <p className="text-xs text-slate-500">Taux de readmission & score de risque moyen par departement</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={departmentComparisonData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="readmissionRate" fill="#6366f1" radius={[4, 4, 0, 0]} name="Taux de Readmission %" />
                <Bar dataKey="avgRiskScore" fill="#a5b4fc" radius={[4, 4, 0, 0]} name="Score de Risque Moyen" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Segmentation Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                <Filter className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Repartition de la Segmentation des Risques</h3>
                <p className="text-xs text-slate-500">Distribution des patients par niveau de risque & departement</p>
              </div>
            </div>
            <div className="space-y-3">
              {departmentComparisonData.map((dept) => {
                const highPct = Math.round((dept.avgRiskScore / 100) * 60);
                const medPct = Math.round((dept.avgRiskScore / 100) * 25);
                const lowPct = 100 - highPct - medPct;
                return (
                  <div key={dept.name} className="p-3 rounded-lg bg-slate-50/80 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{dept.name}</span>
                      <span className="text-xs text-slate-500">{dept.patients} patients</span>
                    </div>
                    <div className="flex h-2 rounded-full overflow-hidden bg-slate-200">
                      <div className="bg-red-500 transition-all" style={{ width: `${highPct}%` }} />
                      <div className="bg-amber-400 transition-all" style={{ width: `${medPct}%` }} />
                      <div className="bg-emerald-500 transition-all" style={{ width: `${lowPct}%` }} />
                    </div>
                    <div className="flex items-center justify-between mt-1.5 text-[10px] text-slate-500">
                      <span>Eleve {highPct}%</span>
                      <span>Moyen {medPct}%</span>
                      <span>Faible {lowPct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
