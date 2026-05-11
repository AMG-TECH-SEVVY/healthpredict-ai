import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from 'recharts';
import {
  Cpu, Target, Gauge, Wrench, GitBranch, Clock, Shield, Zap,
} from 'lucide-react';
import StatCard from '../../components/shared/StatCard';
import { aiAccuracyData, riskFactorsData } from '../../lib/mock-data';

const confidenceBuckets = [
  { range: '60-70%', count: 1, pct: 20 },
  { range: '70-80%', count: 0, pct: 0 },
  { range: '80-90%', count: 1, pct: 20 },
  { range: '90-100%', count: 3, pct: 60 },
];

export default function AIModel() {
  const [activeModelTab, setActiveModelTab] = useState<'performance' | 'features' | 'confidence'>('performance');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Surveillance du Modele IA</h1>
            <p className="text-sm text-slate-500 mt-1">Performance du modele en temps reel, analyse des caracteristiques & suivi de confiance</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-full">
            <GitBranch className="w-3.5 h-3.5 text-purple-600" />
            <span className="text-xs font-medium text-purple-700">Modele v2.0</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Precision"
            value="92.8%"
            subtitle="7 Derniers Jours"
            icon={<Target className="w-5 h-5" />}
            trend={{ value: 1.4, positive: true }}
            color="green"
          />
          <StatCard
            title="Exactitude"
            value="90.9%"
            subtitle="Valeur predictive positive"
            icon={<Gauge className="w-5 h-5" />}
            trend={{ value: 0.8, positive: true }}
            color="blue"
          />
          <StatCard
            title="Rappel"
            value="89.6%"
            subtitle="Sensibilite / TPR"
            icon={<Shield className="w-5 h-5" />}
            trend={{ value: 0.5, positive: true }}
            color="teal"
          />
          <StatCard
            title="Score F1"
            value="90.2%"
            subtitle="Moyenne harmonique"
            icon={<Zap className="w-5 h-5" />}
            trend={{ value: 0.6, positive: true }}
            color="amber"
          />
        </div>

        {/* Model Version Info */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Informations sur la Version du Modele</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Version', value: '2.0.3', icon: <GitBranch className="w-3.5 h-3.5" /> },
              { label: 'Framework', value: 'XGBoost', icon: <Cpu className="w-3.5 h-3.5" /> },
              { label: 'Dernier Entrainement', value: '7 Mai 2025', icon: <Clock className="w-3.5 h-3.5" /> },
              { label: 'Caracteristiques', value: '26 entrees', icon: <Wrench className="w-3.5 h-3.5" /> },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                <div className="text-slate-400">{item.icon}</div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm font-semibold text-slate-800">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 w-fit">
          {(['performance', 'features', 'confidence'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveModelTab(tab)}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-all ${
                activeModelTab === tab
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab === 'performance' ? 'Performance' : tab === 'features' ? 'Importance des Caracteristiques' : 'Confiance'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeModelTab === 'performance' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Evolution de la Precision IA</h3>
                  <p className="text-xs text-slate-500">Metriques de performance hebdomadaires du modele</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-emerald-500 rounded" /> Precision</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-blue-500 rounded" /> Exactitude</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-violet-500 rounded" /> Rappel</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={aiAccuracyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis domain={[85, 96]} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} formatter={(v) => `${v}%`} />
                <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="precision" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: '#3b82f6' }} />
                <Line type="monotone" dataKey="recall" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3, fill: '#8b5cf6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeModelTab === 'features' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Analyse de l'Importance des Caracteristiques</h3>
                <p className="text-xs text-slate-500">Contribution ponderee de chaque caracteristique d'entree</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={riskFactorsData} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[0, 0.35]} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: '#475569' }} axisLine={false} tickLine={false} width={120} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} formatter={(v) => `${(Number(v) * 100).toFixed(0)}%`} />
                <Bar dataKey="weight" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} name="Poids" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {activeModelTab === 'confidence' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <Gauge className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Distribution de Confiance des Predictions</h3>
                <p className="text-xs text-slate-500">Niveau de confiance du modele a travers les predictions</p>
              </div>
            </div>
            <div className="space-y-4 mt-6">
              {confidenceBuckets.map((b) => (
                <div key={b.range} className="flex items-center gap-4">
                  <span className="text-xs font-medium text-slate-600 w-16 text-right">{b.range}</span>
                  <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${b.pct}%`,
                        background: b.pct > 50 ? '#10b981' : b.pct > 25 ? '#3b82f6' : '#f59e0b',
                      }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 w-20">{b.count} predictions</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-600">
                <span className="font-semibold">Apercu:</span> 60% des predictions ont une confiance superieure a 90%, indiquant une forte certitude du modele.
                Les 20% dans la plage 60-70% necessitent une revue de la completude des caracteristiques pour ces patients.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
