import {
  Users,
  Stethoscope,
  BedDouble,
  TrendingUp,
  Activity,
  Clock,
  ArrowRight,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import StatCard from '../../components/shared/StatCard';
import {
  mockProfiles,
  mockPatients,
  mockActivityLogs,
  departmentComparisonData,
  aiAccuracyData,
} from '../../lib/mock-data';

const recentLogs = mockActivityLogs.slice(0, 5);

const monthlyAdmissions = [
  { name: 'Jan', admissions: 156 },
  { name: 'Feb', admissions: 142 },
  { name: 'Mar', admissions: 168 },
  { name: 'Apr', admissions: 155 },
  { name: 'May', admissions: 98 },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Tableau de Bord</h1>
        <p className="mt-1 text-sm text-slate-500">
          Vue d'ensemble de l'hopital et metriques de performance du systeme
        </p>
      </div>

      {/* Top Row - Stat Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Utilisateurs"
          value={24}
          subtitle={`${mockProfiles.length} profils enregistres`}
          icon={<Users className="w-5 h-5" />}
          trend={{ value: 8, positive: true }}
          color="blue"
        />
        <StatCard
          title="Medecins Actifs"
          value={8}
          subtitle="En service aujourd'hui"
          icon={<Stethoscope className="w-5 h-5" />}
          trend={{ value: 2, positive: true }}
          color="teal"
        />
        <StatCard
          title="Total Patients"
          value={247}
          subtitle={`${mockPatients.filter(p => p.status === 'critical').length} critiques`}
          icon={<BedDouble className="w-5 h-5" />}
          trend={{ value: 12, positive: true }}
          color="amber"
        />
        <StatCard
          title="Taux de Readmission"
          value="15.3%"
          subtitle="Periode de 30 jours"
          icon={<TrendingUp className="w-5 h-5" />}
          trend={{ value: 1.2, positive: false }}
          color="red"
        />
      </div>

      {/* Middle Row - Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 mb-8">
        {/* Department Comparison Bar Chart */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-slate-900">Statistiques Hopital</h2>
            <p className="text-xs text-slate-500 mt-1">
              Taux de readmission et volumes de patients par departement
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis
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
              <Bar
                dataKey="readmissionRate"
                name="Taux de Readmission"
                fill="#1e40af"
                radius={[6, 6, 0, 0]}
                barSize={36}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Prediction Performance Card */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-slate-900">Performance des Predictions IA</h2>
            <p className="text-xs text-slate-500 mt-1">
              Tendances de precision et exactitude du modele
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={aiAccuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis
                domain={[85, 96]}
                tick={{ fontSize: 11, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
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
                formatter={(value: any) => [`${value}%`]}
              />
              <Line
                type="monotone"
                dataKey="accuracy"
                name="Precision"
                stroke="#1e40af"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#1e40af' }}
              />
              <Line
                type="monotone"
                dataKey="precision"
                name="Exactitude"
                stroke="#0d9488"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 3, fill: '#0d9488' }}
              />
              <Line
                type="monotone"
                dataKey="recall"
                name="Rappel"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="3 3"
                dot={{ r: 3, fill: '#f59e0b' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row - Activity Log and Monthly Admissions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Recent Activity Log */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Activite Recente</h2>
              <p className="text-xs text-slate-500 mt-1">Dernieres actions et evenements du systeme</p>
            </div>
            <button className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1">
              Voir Tout <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {recentLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Activity className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">{log.action}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {log.details && Object.values(log.details).join(' - ')}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400 flex-shrink-0">
                  <Clock className="w-3 h-3" />
                  {new Date(log.created_at).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Admissions Trend */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-slate-900">Admissions Mensuelles</h2>
            <p className="text-xs text-slate-500 mt-1">Tendances des admissions de patients</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyAdmissions}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
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
              <Bar
                dataKey="admissions"
                name="Admissions"
                fill="#0d9488"
                radius={[6, 6, 0, 0]}
                barSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
