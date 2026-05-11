import {
  Users,
  Clock,
  TrendingUp,
  Building2,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import StatCard from '../../components/shared/StatCard';
import {
  readmissionTrendData,
  departmentComparisonData,
  aiAccuracyData,
} from '../../lib/mock-data';

export default function Analytics() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Analyses Medicales & Rapports</h1>
        <p className="mt-1 text-sm text-slate-500">
          Analyses completes sur les readmissions, la performance des departements et la precision du modele IA
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Patients"
          value={247}
          subtitle="Actuellement surveilles"
          icon={<Users className="w-5 h-5" />}
          trend={{ value: 12, positive: true }}
          color="blue"
        />
        <StatCard
          title="Duree Moyenne Sejour"
          value="5.2 jours"
          subtitle="Periode actuelle"
          icon={<Clock className="w-5 h-5" />}
          trend={{ value: 3.8, positive: true }}
          color="teal"
        />
        <StatCard
          title="Taux de Readmission"
          value="15.3%"
          subtitle="Fenetre de 30 jours"
          icon={<TrendingUp className="w-5 h-5" />}
          trend={{ value: 1.2, positive: false }}
          color="red"
        />
        <StatCard
          title="Efficacite Departement"
          value="87%"
          subtitle="Tous departements"
          icon={<Building2 className="w-5 h-5" />}
          trend={{ value: 2.5, positive: true }}
          color="green"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
        {/* Readmission Trend Line Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-slate-900">Tendance des Readmissions</h2>
            <p className="text-xs text-slate-500 mt-1">
              Comptes et taux de readmission mensuels
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={readmissionTrendData}>
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
                  if (name === 'Taux') return [`${value}%`, name];
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
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="readmissions"
                name="Readmissions"
                stroke="#1e40af"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#1e40af', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6, stroke: '#1e40af', strokeWidth: 2, fill: '#fff' }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="rate"
                name="Taux"
                stroke="#f59e0b"
                strokeWidth={2.5}
                strokeDasharray="5 5"
                dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2, fill: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Comparison Bar Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-slate-900">Comparaison des Departements</h2>
            <p className="text-xs text-slate-500 mt-1">
              Taux de readmission et scores de risque moyens par departement
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentComparisonData} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
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
                domain={[0, 100]}
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
                  if (name === 'Score de Risque Moyen') return [value, name];
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
                dataKey="readmissionRate"
                name="Taux de Readmission"
                fill="#1e40af"
                radius={[4, 4, 0, 0]}
                barSize={24}
              />
              <Bar
                dataKey="avgRiskScore"
                name="Score de Risque Moyen"
                fill="#60a5fa"
                radius={[4, 4, 0, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 - AI Accuracy */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-base font-semibold text-slate-900">Evolution de la Precision IA</h2>
          <p className="text-xs text-slate-500 mt-1">
            Precision, precision et rappel du modele au cours des recentes semaines
          </p>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={aiAccuracyData}>
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
              domain={[85, 96]}
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
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12, paddingBottom: 16 }}
            />
            <Line
              type="monotone"
              dataKey="accuracy"
              name="Precision"
              stroke="#1e40af"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#1e40af', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, stroke: '#1e40af', strokeWidth: 2, fill: '#fff' }}
            />
            <Line
              type="monotone"
              dataKey="precision"
              name="Precision"
              stroke="#16a34a"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#16a34a', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, stroke: '#16a34a', strokeWidth: 2, fill: '#fff' }}
            />
            <Line
              type="monotone"
              dataKey="recall"
              name="Rappel"
              stroke="#f59e0b"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2, fill: '#fff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
