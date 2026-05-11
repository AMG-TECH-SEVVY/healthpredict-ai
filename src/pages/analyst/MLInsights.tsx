import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import {
  Brain, Layers, Sparkles, Grid3x3, ArrowRight,
} from 'lucide-react';
import { riskFactorsData } from '../../lib/mock-data';

const shapValues = [
  { feature: 'Admissions Anterieures', shapValue: 0.34, direction: 'positive' as const, impact: 'Augmente le risque de 34%' },
  { feature: 'Age > 70', shapValue: 0.28, direction: 'positive' as const, impact: 'Augmente le risque de 28%' },
  { feature: 'Comorbidites', shapValue: 0.22, direction: 'positive' as const, impact: 'Augmente le risque de 22%' },
  { feature: 'Duree de Sejour', shapValue: 0.15, direction: 'positive' as const, impact: 'Augmente le risque de 15%' },
  { feature: 'Mode de Sortie', shapValue: -0.12, direction: 'negative' as const, impact: 'Reduit le risque de 12%' },
  { feature: 'Observance Medicamenteuse', shapValue: -0.08, direction: 'negative' as const, impact: 'Reduit le risque de 8%' },
];

const correlationMatrix = [
  ['', 'Age', 'Admissions', 'Sejour', 'Comorb', 'Observance'],
  ['Age', 1.0, 0.42, 0.35, 0.61, -0.18],
  ['Admissions', 0.42, 1.0, 0.55, 0.38, -0.22],
  ['Sejour', 0.35, 0.55, 1.0, 0.29, -0.15],
  ['Comorb', 0.61, 0.38, 0.29, 1.0, -0.27],
  ['Observance', -0.18, -0.22, -0.15, -0.27, 1.0],
];

const getCorrColor = (val: number) => {
  if (val === 1) return 'bg-blue-600 text-white';
  if (val >= 0.5) return 'bg-red-100 text-red-700';
  if (val >= 0.3) return 'bg-orange-50 text-orange-700';
  if (val > 0) return 'bg-yellow-50 text-yellow-700';
  if (val === 0) return 'bg-white text-slate-400';
  if (val > -0.3) return 'bg-blue-50 text-blue-700';
  return 'bg-indigo-100 text-indigo-700';
};

export default function MLInsights() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Insights ML</h1>
          <p className="text-sm text-slate-500 mt-1">Importance des caracteristiques, explications SHAP, analyse de correlation & interpretabilité du modele</p>
        </div>

        {/* Feature Importance Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Importance des Caracteristiques</h3>
              <p className="text-xs text-slate-500">Contribution ponderee de chaque caracteristique a la prediction de readmission</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskFactorsData} layout="vertical" margin={{ left: 50 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[0, 0.35]} tickFormatter={(v: number) => `${(v * 100).toFixed(0)}%`} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: '#475569' }} axisLine={false} tickLine={false} width={130} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} formatter={(v) => `${(Number(v) * 100).toFixed(0)}%`} />
              <Bar dataKey="weight" radius={[0, 6, 6, 0]} barSize={22}>
                {riskFactorsData.map((_, i) => {
                  const colors = ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe'];
                  return <Cell key={i} fill={colors[i]} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Decision Boundary + SHAP Values */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Decision Boundary Visualization */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Frontiere de Decision du Modele</h3>
                <p className="text-xs text-slate-500">Visualisation conceptuelle des regions de classification</p>
              </div>
            </div>
            <div className="relative h-64 bg-gradient-to-br from-red-50 via-amber-50 to-green-50 rounded-lg overflow-hidden border border-slate-100">
              {/* Decision regions */}
              <div className="absolute inset-0 flex">
                <div className="w-1/3 bg-red-100/60 border-r border-red-200/50 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xs font-bold text-red-700">RISQUE ELEVE</p>
                    <p className="text-[10px] text-red-500 mt-1">Score &gt; 70</p>
                    <div className="mt-2 grid grid-cols-2 gap-1">
                      {['P1', 'P4', 'P9', 'P2'].map((p) => (
                        <div key={p} className="w-6 h-6 rounded-full bg-red-400/30 flex items-center justify-center text-[8px] font-bold text-red-700">{p}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-1/3 bg-amber-100/40 border-r border-amber-200/50 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xs font-bold text-amber-700">RISQUE MOYEN</p>
                    <p className="text-[10px] text-amber-500 mt-1">Score 40-70</p>
                    <div className="mt-2 grid grid-cols-2 gap-1">
                      {['P3', 'P5', 'P7'].map((p) => (
                        <div key={p} className="w-6 h-6 rounded-full bg-amber-400/30 flex items-center justify-center text-[8px] font-bold text-amber-700">{p}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-1/3 bg-green-100/40 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xs font-bold text-green-700">RISQUE FAIBLE</p>
                    <p className="text-[10px] text-green-500 mt-1">Score &lt; 40</p>
                    <div className="mt-2 grid grid-cols-2 gap-1">
                      {['P6', 'P8', 'P10'].map((p) => (
                        <div key={p} className="w-6 h-6 rounded-full bg-green-400/30 flex items-center justify-center text-[8px] font-bold text-green-700">{p}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Boundary lines */}
              <div className="absolute top-0 bottom-0 left-1/3 w-0.5 border-l-2 border-dashed border-slate-400" />
              <div className="absolute top-0 bottom-0 left-2/3 w-0.5 border-l-2 border-dashed border-slate-400" />
              {/* Threshold labels */}
              <div className="absolute top-2 left-1/3 -translate-x-1/2 text-[9px] bg-white/80 px-1.5 py-0.5 rounded text-slate-500 font-medium">t=70</div>
              <div className="absolute top-2 left-2/3 -translate-x-1/2 text-[9px] bg-white/80 px-1.5 py-0.5 rounded text-slate-500 font-medium">t=40</div>
            </div>
          </div>

          {/* SHAP Values */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Explications des Valeurs SHAP</h3>
                <p className="text-xs text-slate-500">Comment chaque caracteristique contribue aux predictions individuelles</p>
              </div>
            </div>
            <div className="space-y-3">
              {shapValues.map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50/80 hover:bg-slate-50 transition-colors">
                  <div className="w-32 text-xs font-medium text-slate-700 flex-shrink-0">{s.feature}</div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden relative">
                      {s.direction === 'positive' ? (
                        <div className="h-full bg-red-400 rounded-full" style={{ width: `${Math.abs(s.shapValue) * 250}%` }} />
                      ) : (
                        <div className="h-full bg-blue-400 rounded-full absolute right-0" style={{ width: `${Math.abs(s.shapValue) * 250}%` }} />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 w-8">
                    <ArrowRight className={`w-3 h-3 ${s.direction === 'positive' ? 'text-red-500 rotate-0' : 'text-blue-500 rotate-180'}`} />
                  </div>
                  <span className="text-[10px] text-slate-500 w-28 flex-shrink-0">{s.impact}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-4 text-[10px]">
              <span className="flex items-center gap-1"><span className="w-3 h-2 rounded bg-red-400" /> Augmente le risque</span>
              <span className="flex items-center gap-1"><span className="w-3 h-2 rounded bg-blue-400" /> Diminue le risque</span>
            </div>
          </div>
        </div>

        {/* Correlation Matrix */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Grid3x3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Matrice de Correlation des Caracteristiques</h3>
              <p className="text-xs text-slate-500">Coefficients de correlation par paire entre les caracteristiques cles</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr>
                  {correlationMatrix[0].map((h, i) => (
                    <th key={i} className="px-3 py-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider text-center">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {correlationMatrix.slice(1).map((row, i) => (
                  <tr key={i}>
                    <td className="px-3 py-2 text-[10px] font-semibold text-slate-600 text-left">{correlationMatrix[0][i + 1]}</td>
                    {row.slice(1).map((val, j) => (
                      <td key={j} className="px-1 py-1 text-center">
                        <div className={`inline-flex items-center justify-center w-12 h-8 rounded-md text-[10px] font-medium ${getCorrColor(val as number)}`}>
                          {(val as number).toFixed(2)}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-500">
            <span>Force de correlation:</span>
            <span className="flex items-center gap-1"><span className="w-3 h-2 rounded bg-indigo-100" /> Negative forte</span>
            <span className="flex items-center gap-1"><span className="w-3 h-2 rounded bg-blue-50" /> Negative faible</span>
            <span className="flex items-center gap-1"><span className="w-3 h-2 rounded bg-yellow-50" /> Positive faible</span>
            <span className="flex items-center gap-1"><span className="w-3 h-2 rounded bg-orange-50" /> Positive moderee</span>
            <span className="flex items-center gap-1"><span className="w-3 h-2 rounded bg-red-100" /> Positive forte</span>
          </div>
        </div>
      </div>
    </div>
  );
}
