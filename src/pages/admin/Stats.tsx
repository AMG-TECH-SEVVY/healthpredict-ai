import {
  Users,
  BedDouble,
  Clock,
  Stethoscope,
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
  LineChart,
  Line,
} from 'recharts';
import StatCard from '../../components/shared/StatCard';
import { departmentComparisonData } from '../../lib/mock-data';

const patientDistribution = [
  { name: 'Cardiologie', value: 34, color: '#1e40af' },
  { name: 'Pneumologie', value: 28, color: '#0d9488' },
  { name: 'Neurologie', value: 22, color: '#7c3aed' },
  { name: 'Orthopedie', value: 41, color: '#f59e0b' },
  { name: 'Oncologie', value: 19, color: '#dc2626' },
];

const monthlyAdmissions = [
  { name: 'Jan', admissions: 156, discharges: 142 },
  { name: 'Feb', admissions: 142, discharges: 138 },
  { name: 'Mar', admissions: 168, discharges: 155 },
  { name: 'Apr', admissions: 155, discharges: 149 },
  { name: 'May', admissions: 98, discharges: 112 },
];

export default function Stats() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Statistiques Hopital</h1>
        <p className="mt-1 text-sm text-slate-500">
          Analyses completes et metriques de performance pour tous les departements
        </p>
      </div>

      {/* Top Row - Stat Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Patients"
          value={247}
          subtitle="Actuellement admis"
          icon={<Users className="w-5 h-5" />}
          trend={{ value: 12, positive: true }}
          color="blue"
        />
        <StatCard
          title="Duree Moyenne Sejour"
          value="6.2 jours"
          subtitle="Tous les departements"
          icon={<Clock className="w-5 h-5" />}
          trend={{ value: 0.3, positive: false }}
          color="teal"
        />
        <StatCard
          title="Occupation des Lits"
          value="82.4%"
          subtitle="204 sur 248 lits"
          icon={<BedDouble className="w-5 h-5" />}
          trend={{ value: 4, positive: false }}
          color="amber"
        />
        <StatCard
          title="Personnel en Service"
          value={56}
          subtitle="Equipe de jour active"
          icon={<Stethoscope className="w-5 h-5" />}
          trend={{ value: 2, positive: true }}
          color="green"
        />
      </div>

      {/* Middle Row - Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
        {/* Department Comparison Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-slate-900">Comparaison</h2>
            <p className="text-xs text-slate-500 mt-1">
              Taux de readmission et volume de patients par departement
            </p>
          </div>
          <ResponsiveContainer width="100%" height={320}>
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
                dataKey="patients"
                name="Patients"
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

        {/* Patient Distribution Pie Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-slate-900">Distribution des Patients</h2>
            <p className="text-xs text-slate-500 mt-1">
              Admissions actuelles par departement
            </p>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={patientDistribution}
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {patientDistribution.map((entry, index) => (
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

      {/* Bottom Row - Monthly Admissions Trend */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-base font-semibold text-slate-900">Tendances des Admissions Mensuelles</h2>
          <p className="text-xs text-slate-500 mt-1">
            Admissions contre sorties sur les 5 derniers mois
          </p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyAdmissions}>
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
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12, paddingBottom: 16 }}
            />
            <Line
              type="monotone"
              dataKey="admissions"
              name="Admissions"
              stroke="#1e40af"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#1e40af', strokeWidth: 2, stroke: '#fff' }}
            />
            <Line
              type="monotone"
              dataKey="discharges"
              name="Sorties"
              stroke="#0d9488"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#0d9488', strokeWidth: 2, stroke: '#fff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
