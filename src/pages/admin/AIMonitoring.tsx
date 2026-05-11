import {
  Brain,
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import StatCard from '../../components/shared/StatCard';
import { aiAccuracyData } from '../../lib/mock-data';

const healthIndicators = [
  { label: 'Latence', value: '45ms', status: 'healthy', color: 'text-green-600' },
  { label: 'Memoire', value: '2.1 Go', status: 'healthy', color: 'text-green-600' },
  { label: 'CPU', value: '34%', status: 'healthy', color: 'text-green-600' },
  { label: 'Taux d\'Erreur', value: '0.8%', status: 'warning', color: 'text-amber-600' },
  { label: 'Disponibilite', value: '99.9%', status: 'healthy', color: 'text-green-600' },
  { label: 'Profondeur de File', value: '12', status: 'healthy', color: 'text-green-600' },
];

const recentPredictions = [
  { id: '1', patient: 'Robert Johnson', score: 87, confidence: 94, time: '06:00' },
  { id: '2', patient: 'Maria Garcia', score: 72, confidence: 89, time: '06:00' },
  { id: '3', patient: 'Eleanor Davis', score: 91, confidence: 96, time: '06:00' },
  { id: '4', patient: 'Charles Anderson', score: 95, confidence: 97, time: '06:00' },
  { id: '5', patient: 'Thomas Brown', score: 63, confidence: 82, time: '06:00' },
];

export default function AIMonitoring() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Surveillance IA</h1>
        <p className="mt-1 text-sm text-slate-500">
          Surveillance en temps reel du modele de prediction de readmission et de la sante du systeme
        </p>
      </div>

      {/* Top Row - Model Status + Stats */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 mb-8">
        {/* Model Status Card */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Brain className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Statut du Modele</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-green-600">Actif</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-xs text-slate-500">Version</span>
              <span className="text-xs font-semibold text-slate-900">v2.0</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-xs text-slate-500">Disponibilite</span>
              <span className="text-xs font-semibold text-slate-900">14j 7h 32m</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-xs text-slate-500">Dernier Entrainement</span>
              <span className="text-xs font-semibold text-slate-900">7 mai 2025</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-xs text-slate-500">Prochain Reentrainement</span>
              <span className="text-xs font-semibold text-amber-600">Programme</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-xs text-slate-500">Cadre</span>
              <span className="text-xs font-semibold text-slate-900">XGBoost</span>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard
            title="Predictions Aujourd'hui"
            value={156}
            subtitle="Readmission a 30 jours"
            icon={<Zap className="w-5 h-5" />}
            trend={{ value: 18, positive: true }}
            color="blue"
          />
          <StatCard
            title="Confiance Moyenne"
            value="91.6%"
            subtitle="Pour toutes les predictions"
            icon={<Activity className="w-5 h-5" />}
            trend={{ value: 1.2, positive: true }}
            color="teal"
          />
          <StatCard
            title="Taux d'Alerte"
            value="2.3%"
            subtitle="Alertes de chute de precision"
            icon={<AlertTriangle className="w-5 h-5" />}
            trend={{ value: 0.5, positive: false }}
            color="amber"
          />
        </div>
      </div>

      {/* Middle Row - Accuracy Chart + Health Indicators */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 mb-8">
        {/* AI Accuracy Chart */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-slate-900">Precision de l'IA dans le Temps</h2>
            <p className="text-xs text-slate-500 mt-1">
              Metriques de precision, exactitude et rappel hebdomadaires
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={aiAccuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis
                domain={[85, 96]}
                tick={{ fontSize: 12, fill: '#64748b' }}
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
              />
              <Line
                type="monotone"
                dataKey="precision"
                name="Exactitude"
                stroke="#0d9488"
                strokeWidth={2}
                dot={{ r: 4, fill: '#0d9488', strokeWidth: 2, stroke: '#fff' }}
              />
              <Line
                type="monotone"
                dataKey="recall"
                name="Rappel"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Health Indicators */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-slate-900">Sante du Modele</h2>
            <p className="text-xs text-slate-500 mt-1">
              Indicateurs d'infrastructure et de performance
            </p>
          </div>
          <div className="space-y-3">
            {healthIndicators.map((indicator) => (
              <div
                key={indicator.label}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm text-slate-700">{indicator.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${indicator.color}`}>
                    {indicator.value}
                  </span>
                  {indicator.status === 'healthy' ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row - Recent Predictions */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Predictions a Haute Confiance Recentes</h2>
            <p className="text-xs text-slate-500 mt-1">Dernieres evaluations de risque de readmission par l'IA</p>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-500">Dernieres 24h</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Score de Risque
                </th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Confiance
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Heure
                </th>
              </tr>
            </thead>
            <tbody>
              {recentPredictions.map((pred) => (
                <tr key={pred.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-900">{pred.patient}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold ${
                      pred.score >= 80 ? 'bg-red-50 text-red-700' : pred.score >= 50 ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'
                    }`}>
                      {pred.score}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-sm font-medium text-slate-600">{pred.confidence}%</span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-xs">{pred.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
