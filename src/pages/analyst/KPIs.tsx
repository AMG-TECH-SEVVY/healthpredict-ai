import {
  Activity, Clock, BedDouble, Star, Brain, Database, TrendingUp, TrendingDown, Minus,
} from 'lucide-react';
import { aiAccuracyData, dataCompletenessData } from '../../lib/mock-data';

interface KPICardProps {
  title: string;
  value: string;
  unit?: string;
  target: string;
  actual: string;
  trend: { value: number; positive: boolean };
  icon: React.ReactNode;
  color: string;
}

const kpis: KPICardProps[] = [
  {
    title: 'Taux de Readmission', value: '14.7', unit: '%', target: '< 12%', actual: '14.7%',
    trend: { value: 2.3, positive: true }, icon: <Activity className="w-5 h-5" />, color: 'red',
  },
  {
    title: 'Duree Moyenne de Sejour', value: '4.6', unit: 'jours', target: '< 5.0 jours', actual: '4.6 jours',
    trend: { value: 11.5, positive: true }, icon: <Clock className="w-5 h-5" />, color: 'blue',
  },
  {
    title: 'Occupation des Lits', value: '77', unit: '%', target: '75-85%', actual: '77%',
    trend: { value: 3.8, positive: false }, icon: <BedDouble className="w-5 h-5" />, color: 'amber',
  },
  {
    title: 'Satisfaction Patient', value: '88', unit: '%', target: '> 85%', actual: '88%',
    trend: { value: 4.8, positive: true }, icon: <Star className="w-5 h-5" />, color: 'green',
  },
  {
    title: 'Precision IA', value: '92.8', unit: '%', target: '> 90%', actual: '92.8%',
    trend: { value: 1.4, positive: true }, icon: <Brain className="w-5 h-5" />, color: 'purple',
  },
  {
    title: 'Completude des Donnees', value: '85', unit: '%', target: '> 90%', actual: '85%',
    trend: { value: 3.2, positive: true }, icon: <Database className="w-5 h-5" />, color: 'teal',
  },
];

const colorStyles: Record<string, { bg: string; iconBg: string; iconText: string; border: string; accent: string }> = {
  red: { bg: 'bg-red-50', iconBg: 'bg-red-100', iconText: 'text-red-600', border: 'border-red-100', accent: '#ef4444' },
  blue: { bg: 'bg-blue-50', iconBg: 'bg-blue-100', iconText: 'text-blue-600', border: 'border-blue-100', accent: '#3b82f6' },
  amber: { bg: 'bg-amber-50', iconBg: 'bg-amber-100', iconText: 'text-amber-600', border: 'border-amber-100', accent: '#f59e0b' },
  green: { bg: 'bg-green-50', iconBg: 'bg-green-100', iconText: 'text-green-600', border: 'border-green-100', accent: '#10b981' },
  purple: { bg: 'bg-purple-50', iconBg: 'bg-purple-100', iconText: 'text-purple-600', border: 'border-purple-100', accent: '#8b5cf6' },
  teal: { bg: 'bg-teal-50', iconBg: 'bg-teal-100', iconText: 'text-teal-600', border: 'border-teal-100', accent: '#14b8a6' },
};

export default function KPIs() {
  const latestAccuracy = aiAccuracyData[aiAccuracyData.length - 1];
  const avgCompleteness = Math.round(dataCompletenessData.reduce((s, d) => s + d.completeness, 0) / dataCompletenessData.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tableau KPIs Medical</h1>
          <p className="text-sm text-slate-500 mt-1">Indicateurs cles de performance executifs avec objectifs & tendances</p>
        </div>

        {/* Summary Banner */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-5 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">ICP sur Objectif</p>
              <p className="text-2xl font-bold mt-1">4 <span className="text-sm font-normal text-slate-400">/ 6</span></p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Necessite Attention</p>
              <p className="text-2xl font-bold mt-1 text-amber-400">2</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Modele IA</p>
              <p className="text-2xl font-bold mt-1">{latestAccuracy.accuracy}% <span className="text-xs text-emerald-400">+1.6%</span></p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Score des Donnees</p>
              <p className="text-2xl font-bold mt-1">{avgCompleteness}% <span className="text-xs text-amber-400">sous objectif</span></p>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {kpis.map((kpi) => {
            const style = colorStyles[kpi.color] || colorStyles.blue;
            const numericValue = parseFloat(kpi.value);
            const isOnTarget = kpi.color === 'green' || kpi.color === 'blue' || kpi.color === 'purple';

            return (
              <div key={kpi.title} className={`rounded-xl border ${style.border} ${style.bg} p-5 transition-shadow hover:shadow-md`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{kpi.title}</p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl font-bold text-slate-900">{kpi.value}</span>
                      {kpi.unit && <span className="text-sm text-slate-500">{kpi.unit}</span>}
                    </div>
                  </div>
                  <div className={`w-10 h-10 rounded-lg ${style.iconBg} ${style.iconText} flex items-center justify-center flex-shrink-0`}>
                    {kpi.icon}
                  </div>
                </div>

                {/* Trend */}
                <div className="flex items-center gap-1 mb-3">
                  {kpi.trend.positive ? (
                    <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-red-600" />
                  )}
                  <span className={`text-xs font-medium ${kpi.trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.trend.positive ? '+' : ''}{kpi.trend.value}% vs mois dernier
                  </span>
                </div>

                {/* Target vs Actual */}
                <div className="bg-white/60 rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Objectif</span>
                    <span className="font-medium text-slate-700">{kpi.target}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Reel</span>
                    <span className="font-medium text-slate-700">{kpi.actual}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.min(100, numericValue)}%`,
                          backgroundColor: isOnTarget ? style.accent : '#f59e0b',
                        }}
                      />
                    </div>
                    <span className={`text-[10px] font-semibold ${isOnTarget ? 'text-green-600' : 'text-amber-600'}`}>
                      {isOnTarget ? 'Sur la Bonne Voie' : 'Attention'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* KPI Target Status Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900">Resume du Statut des Objectifs ICP</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">ICP</th>
                  <th className="text-center px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Objectif</th>
                  <th className="text-center px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Reel</th>
                  <th className="text-center px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Tendance</th>
                  <th className="text-center px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Statut</th>
                </tr>
              </thead>
              <tbody>
                {kpis.map((kpi) => {
                  const isOnTarget = kpi.color === 'green' || kpi.color === 'blue' || kpi.color === 'purple';
                  return (
                    <tr key={kpi.title} className="border-t border-slate-100 hover:bg-slate-50/50">
                      <td className="px-5 py-3 font-medium text-slate-700">{kpi.title}</td>
                      <td className="px-5 py-3 text-center text-slate-500">{kpi.target}</td>
                      <td className="px-5 py-3 text-center font-medium text-slate-800">{kpi.actual}</td>
                      <td className="px-5 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {kpi.trend.positive ? (
                            <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                          ) : (
                            <TrendingDown className="w-3.5 h-3.5 text-red-600" />
                          )}
                          <span className={`text-xs ${kpi.trend.positive ? 'text-green-600' : 'text-red-600'}`}>
                            {kpi.trend.positive ? '+' : ''}{kpi.trend.value}%
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                          isOnTarget ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {isOnTarget ? <TrendingUp className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                          {isOnTarget ? 'Sur la Bonne Voie' : 'Necessite Attention'}
                        </span>
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
