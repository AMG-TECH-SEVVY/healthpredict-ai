import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, AreaChart as AreaChartIcon, Calendar, RefreshCw,
} from 'lucide-react';
import {
  readmissionTrendData, riskDistributionData, departmentComparisonData,
  aiAccuracyData, dataCompletenessData, riskFactorsData,
} from '../../lib/mock-data';

type ChartType = 'line' | 'bar' | 'pie' | 'area';
type Dataset = 'readmission' | 'department' | 'aiAccuracy' | 'dataQuality' | 'riskFactors';

const chartTypes: { key: ChartType; label: string; icon: React.ReactNode }[] = [
  { key: 'line', label: 'Ligne', icon: <LineChartIcon className="w-4 h-4" /> },
  { key: 'bar', label: 'Barres', icon: <BarChart3 className="w-4 h-4" /> },
  { key: 'pie', label: 'Circulaire', icon: <PieChartIcon className="w-4 h-4" /> },
  { key: 'area', label: 'Aire', icon: <AreaChartIcon className="w-4 h-4" /> },
];

const datasets: { key: Dataset; label: string; description: string }[] = [
  { key: 'readmission', label: 'Tendances de Readmission', description: 'Volume et taux de readmissions mensuels' },
  { key: 'department', label: 'Comparaison des Departements', description: 'Metriques a travers les departements hospitaliers' },
  { key: 'aiAccuracy', label: 'Precision du Modele IA', description: 'Evolution de la performance hebdomadaire du modele' },
  { key: 'dataQuality', label: 'Qualite des Donnees', description: 'Scores de completude par categorie' },
  { key: 'riskFactors', label: 'Facteurs de Risque', description: 'Poids et importance des caracteristiques' },
];

const colorPalette = ['#6366f1', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6'];

export default function Visualization() {
  const [selectedChart, setSelectedChart] = useState<ChartType>('line');
  const [selectedDataset, setSelectedDataset] = useState<Dataset>('readmission');
  const [dateFrom, setDateFrom] = useState('2025-01-01');
  const [dateTo, setDateTo] = useState('2025-05-31');

  const renderChart = () => {
    // Line charts
    if (selectedChart === 'line') {
      if (selectedDataset === 'readmission') {
        return (
          <ResponsiveContainer width="100%" height={380}>
            <LineChart data={readmissionTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="readmissions" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4 }} name="Readmissions" />
              <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="Total" />
              <Line type="monotone" dataKey="rate" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} name="Taux %" />
            </LineChart>
          </ResponsiveContainer>
        );
      }
      if (selectedDataset === 'aiAccuracy') {
        return (
          <ResponsiveContainer width="100%" height={380}>
            <LineChart data={aiAccuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis domain={[85, 96]} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} formatter={(v) => `${v}%`} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} name="Precision" />
              <Line type="monotone" dataKey="precision" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="Exactitude" />
              <Line type="monotone" dataKey="recall" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} name="Rappel" />
            </LineChart>
          </ResponsiveContainer>
        );
      }
      if (selectedDataset === 'dataQuality') {
        return (
          <ResponsiveContainer width="100%" height={380}>
            <LineChart data={dataCompletenessData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis domain={[50, 100]} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} formatter={(v) => `${v}%`} />
              <Line type="monotone" dataKey="completeness" stroke="#14b8a6" strokeWidth={2.5} dot={{ r: 4 }} name="Completude" />
            </LineChart>
          </ResponsiveContainer>
        );
      }
      // Fallback for department & riskFactors
      return (
        <ResponsiveContainer width="100%" height={380}>
          <LineChart data={departmentComparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
            <Line type="monotone" dataKey="readmissionRate" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4 }} name="Taux de Readmission" />
            <Line type="monotone" dataKey="avgRiskScore" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} name="Score de Risque Moyen" />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    // Bar charts
    if (selectedChart === 'bar') {
      if (selectedDataset === 'dataQuality') {
        return (
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={dataCompletenessData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <Bar dataKey="completeness" radius={[4, 4, 0, 0]} barSize={36}>
                {dataCompletenessData.map((_, i) => (
                  <Cell key={i} fill={colorPalette[i % colorPalette.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
      }
      if (selectedDataset === 'riskFactors') {
        return (
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={riskFactorsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <Bar dataKey="weight" radius={[4, 4, 0, 0]} barSize={36}>
                {riskFactorsData.map((_, i) => (
                  <Cell key={i} fill={colorPalette[i % colorPalette.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
      }
      if (selectedDataset === 'aiAccuracy') {
        return (
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={aiAccuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis domain={[85, 96]} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="accuracy" fill="#10b981" radius={[4, 4, 0, 0]} name="Precision" />
              <Bar dataKey="precision" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Exactitude" />
              <Bar dataKey="recall" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Rappel" />
            </BarChart>
          </ResponsiveContainer>
        );
      }
      if (selectedDataset === 'department') {
        return (
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={departmentComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="readmissionRate" fill="#6366f1" radius={[4, 4, 0, 0]} name="Taux de Readmission" />
              <Bar dataKey="avgRiskScore" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Score de Risque Moyen" />
              <Bar dataKey="patients" fill="#a5b4fc" radius={[4, 4, 0, 0]} name="Patients" />
            </BarChart>
          </ResponsiveContainer>
        );
      }
      return (
        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={readmissionTrendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="readmissions" fill="#6366f1" radius={[4, 4, 0, 0]} name="Readmissions" />
            <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Total" />
            <Bar dataKey="rate" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Taux %" />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    // Pie charts
    if (selectedChart === 'pie') {
      const pieData = riskDistributionData;
      return (
        <ResponsiveContainer width="100%" height={380}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={130}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {pieData.map((entry, i) => (
                <Cell key={i} fill={entry.color || colorPalette[i % colorPalette.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    // Area charts
    if (selectedChart === 'area') {
      if (selectedDataset === 'aiAccuracy') {
        return (
          <ResponsiveContainer width="100%" height={380}>
            <AreaChart data={aiAccuracyData}>
              <defs>
                <linearGradient id="accGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="precGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis domain={[85, 96]} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} formatter={(v) => `${v}%`} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
              <Area type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} fill="url(#accGrad)" name="Precision" />
              <Area type="monotone" dataKey="precision" stroke="#3b82f6" strokeWidth={2} fill="url(#precGrad)" name="Exactitude" />
            </AreaChart>
          </ResponsiveContainer>
        );
      }
      if (selectedDataset === 'dataQuality') {
        return (
          <ResponsiveContainer width="100%" height={380}>
            <AreaChart data={dataCompletenessData}>
              <defs>
                <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis domain={[50, 100]} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} formatter={(v) => `${v}%`} />
              <Area type="monotone" dataKey="completeness" stroke="#14b8a6" strokeWidth={2} fill="url(#compGrad)" name="Completude" />
            </AreaChart>
          </ResponsiveContainer>
        );
      }
      return (
        <ResponsiveContainer width="100%" height={380}>
          <AreaChart data={readmissionTrendData}>
            <defs>
              <linearGradient id="readmGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
            <Area type="monotone" dataKey="readmissions" stroke="#6366f1" strokeWidth={2} fill="url(#readmGrad)" name="Readmissions" />
            <Area type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} fill="url(#totalGrad)" name="Total" />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Centre de Visualisation des Donnees</h1>
            <p className="text-sm text-slate-500 mt-1">Constructeur de graphiques interactif avec plusieurs jeux de donnees & types de graphiques</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 hover:border-slate-300 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Actualiser les Donnees
          </button>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          {/* Chart Type Selector */}
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Type de Graphique</p>
            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 w-fit">
              {chartTypes.map((ct) => (
                <button
                  key={ct.key}
                  onClick={() => setSelectedChart(ct.key)}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium rounded-md transition-all ${
                    selectedChart === ct.key
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {ct.icon} {ct.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dataset Selector */}
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Jeu de Donnees</p>
            <div className="flex flex-wrap gap-2">
              {datasets.map((ds) => (
                <button
                  key={ds.key}
                  onClick={() => setSelectedDataset(ds.key)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    selectedDataset === ds.key
                      ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                      : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {ds.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Plage de Dates</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <span className="text-xs text-slate-400">a</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Chart Display */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                {datasets.find((d) => d.key === selectedDataset)?.label}
              </h3>
              <p className="text-xs text-slate-500">
                {datasets.find((d) => d.key === selectedDataset)?.description} &middot; Graphique en {chartTypes.find((c) => c.key === selectedChart)?.label}
              </p>
            </div>
          </div>
          {renderChart()}
        </div>
      </div>
    </div>
  );
}
