import {
  Building2,
  Users,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from 'recharts';
import RiskBadge from '../../components/shared/RiskBadge';
import { departmentComparisonData } from '../../lib/mock-data';

const getRiskLevel = (score: number): 'high' | 'medium' | 'low' => {
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
};

const radarData = departmentComparisonData.map((d) => ({
  department: d.name,
  Readmission: d.readmissionRate,
  Risque: d.avgRiskScore,
  Patients: d.patients,
}));

export default function Departments() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Departements</h1>
        <p className="mt-1 text-sm text-slate-500">
          Metriques de performance et analyses de readmission pour les departements de l'hopital
        </p>
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-8">
        {departmentComparisonData.map((dept) => {
          const riskLevel = getRiskLevel(dept.avgRiskScore);
          const riskColor = riskLevel === 'high' ? 'from-red-500 to-red-700' : riskLevel === 'medium' ? 'from-amber-500 to-amber-700' : 'from-green-500 to-green-700';
          return (
            <div
              key={dept.name}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className={`bg-gradient-to-r ${riskColor} px-5 py-4`}>
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-5 h-5 text-white/80" />
                  <h3 className="text-sm font-semibold text-white">{dept.name}</h3>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Patients</span>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-sm font-bold text-slate-900">{dept.patients}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Taux de Readmission</span>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                    <span className={`text-sm font-bold ${dept.readmissionRate >= 15 ? 'text-red-600' : dept.readmissionRate >= 10 ? 'text-amber-600' : 'text-green-600'}`}>
                      {dept.readmissionRate}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Score de Risque Moyen</span>
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-sm font-bold text-slate-900">{dept.avgRiskScore}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Niveau de Risque</span>
                    <RiskBadge level={riskLevel} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Department Comparison Bar Chart */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-slate-900">Comparaison</h2>
            <p className="text-xs text-slate-500 mt-1">
              Taux de readmission et score de risque moyen par departement
            </p>
          </div>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={departmentComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
                domain={[0, 25]}
                tickFormatter={(v: number) => `${v}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  fontSize: 12,
                }}
                formatter={(value: any, name: any) => {
                  if (name === 'Taux de Readmission') return [`${value}%`, name];
                  return [value, name];
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, paddingBottom: 16 }}
              />
              <Bar
                yAxisId="left"
                dataKey="avgRiskScore"
                name="Score de Risque Moyen"
                fill="#1e40af"
                radius={[6, 6, 0, 0]}
                barSize={28}
              />
              <Bar
                yAxisId="right"
                dataKey="readmissionRate"
                name="Taux de Readmission"
                fill="#0d9488"
                radius={[6, 6, 0, 0]}
                barSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-slate-900">Profil des Departements</h2>
            <p className="text-xs text-slate-500 mt-1">
              Comparaison multidimensionnelle des departements
            </p>
          </div>
          <ResponsiveContainer width="100%" height={340}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis
                dataKey="department"
                tick={{ fontSize: 11, fill: '#64748b' }}
              />
              <PolarRadiusAxis
                tick={{ fontSize: 10, fill: '#94a3b8' }}
                domain={[0, 100]}
              />
              <Radar
                name="Readmission"
                dataKey="Readmission"
                stroke="#1e40af"
                fill="#1e40af"
                fillOpacity={0.15}
                strokeWidth={2}
              />
              <Radar
                name="Score de Risque"
                dataKey="Risque"
                stroke="#dc2626"
                fill="#dc2626"
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  fontSize: 12,
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
