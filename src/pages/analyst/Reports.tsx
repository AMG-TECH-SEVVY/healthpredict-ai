import { useState } from 'react';
import {
  FileText, Download, Clock, Calendar, CheckCircle2, AlertCircle, FileSpreadsheet, FileType, Archive,
} from 'lucide-react';
import StatusBadge from '../../components/shared/StatusBadge';

const reportTypes = [
  {
    id: 'weekly',
    title: 'Rapport Hebdomadaire',
    description: 'Apercu hebdomadaire complet des predictions de readmission, de la performance du modele et des metriques de qualite des donnees.',
    lastGenerated: '2025-05-05',
    nextScheduled: '2025-05-12',
    icon: <Calendar className="w-5 h-5" />,
    color: 'bg-blue-50 border-blue-200 text-blue-600',
    iconBg: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'monthly',
    title: 'Rapport Analytique Mensuel',
    description: 'Analyse mensuelle approfondie avec tendances, comparaisons departementales et suivi de l\'evolution du modele IA.',
    lastGenerated: '2025-05-01',
    nextScheduled: '2025-06-01',
    icon: <FileText className="w-5 h-5" />,
    color: 'bg-purple-50 border-purple-200 text-purple-600',
    iconBg: 'bg-purple-100 text-purple-600',
  },
  {
    id: 'department',
    title: 'Rapport Departemental',
    description: 'Metriques au niveau du departement incluant les taux de readmission, scores de risque, volumes de patients et ICP.',
    lastGenerated: '2025-05-03',
    nextScheduled: '2025-05-10',
    icon: <Archive className="w-5 h-5" />,
    color: 'bg-emerald-50 border-emerald-200 text-emerald-600',
    iconBg: 'bg-emerald-100 text-emerald-600',
  },
  {
    id: 'ai',
    title: 'Rapport Performance IA',
    description: 'Suivi de la precision, exactitude et rappel du modele, analyse de l\'importance des caracteristiques et recommandations de reentrainement.',
    lastGenerated: '2025-05-07',
    nextScheduled: '2025-05-14',
    icon: <AlertCircle className="w-5 h-5" />,
    color: 'bg-amber-50 border-amber-200 text-amber-600',
    iconBg: 'bg-amber-100 text-amber-600',
  },
];

const recentExports = [
  { id: 'exp1', name: 'Resume_Hebdomadaire_Mai5.pdf', format: 'PDF', size: '2.4 Mo', generatedAt: '2025-05-05T09:00:00Z', status: 'completed' as const },
  { id: 'exp2', name: 'Analyses_Mensuelles_Mai.xlsx', format: 'Excel', size: '5.1 Mo', generatedAt: '2025-05-01T10:30:00Z', status: 'completed' as const },
  { id: 'exp3', name: 'Rapport_Departemental_Mai3.pdf', format: 'PDF', size: '1.8 Mo', generatedAt: '2025-05-03T14:00:00Z', status: 'completed' as const },
  { id: 'exp4', name: 'Performance_IA_Mai7.csv', format: 'CSV', size: '340 Ko', generatedAt: '2025-05-07T08:00:00Z', status: 'completed' as const },
  { id: 'exp5', name: 'Export_Risque_Patient_Mai8.xlsx', format: 'Excel', size: '3.2 Mo', generatedAt: '2025-05-08T16:00:00Z', status: 'completed' as const },
  { id: 'exp6', name: 'Rapport_Qualite_Donnees_Mai9.pdf', format: 'PDF', size: '0 Ko', generatedAt: '2025-05-09T11:00:00Z', status: 'processing' as const },
];

const formatOptions = [
  { key: 'pdf', label: 'PDF', icon: <FileType className="w-4 h-4" />, desc: 'Format de document portable', color: 'bg-red-50 border-red-200' },
  { key: 'excel', label: 'Excel', icon: <FileSpreadsheet className="w-4 h-4" />, desc: 'Tableur avec graphiques', color: 'bg-emerald-50 border-emerald-200' },
  { key: 'csv', label: 'CSV', icon: <Archive className="w-4 h-4" />, desc: 'Export de donnees brutes', color: 'bg-blue-50 border-blue-200' },
];

export default function Reports() {
  const [generating, setGenerating] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string>('pdf');

  const handleGenerate = (reportId: string) => {
    setGenerating(reportId);
    setTimeout(() => setGenerating(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Rapports & Exports</h1>
          <p className="text-sm text-slate-500 mt-1">Generer, planifier & exporter des rapports analytiques dans plusieurs formats</p>
        </div>

        {/* Report Generation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reportTypes.map((report) => (
            <div key={report.id} className={`rounded-xl border p-5 transition-shadow hover:shadow-md ${report.color}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${report.iconBg} flex items-center justify-center`}>
                    {report.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{report.title}</h3>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">{report.description}</p>
              <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Dernier: {new Date(report.lastGenerated).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Prochain: {new Date(report.nextScheduled).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleGenerate(report.id)}
                  disabled={generating === report.id}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  {generating === report.id ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                      Generation en cours...
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      Generer Maintenant
                    </>
                  )}
                </button>
                <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors">
                  <Calendar className="w-3.5 h-3.5" />
                  Planifier
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Export Format Options */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Options de Format d'Export</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {formatOptions.map((fmt) => (
              <button
                key={fmt.key}
                onClick={() => setSelectedFormat(fmt.key)}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                  selectedFormat === fmt.key
                    ? `${fmt.color} border-current`
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className={`flex-shrink-0 ${selectedFormat === fmt.key ? 'text-slate-700' : 'text-slate-400'}`}>
                  {fmt.icon}
                </div>
                <div className="text-left">
                  <p className={`text-sm font-medium ${selectedFormat === fmt.key ? 'text-slate-900' : 'text-slate-700'}`}>{fmt.label}</p>
                  <p className="text-xs text-slate-500">{fmt.desc}</p>
                </div>
                {selectedFormat === fmt.key && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Exports Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">Exports Recents</h3>
            </div>
            <span className="text-xs text-slate-400">{recentExports.length} exports</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Nom du Fichier</th>
                  <th className="text-center px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Format</th>
                  <th className="text-center px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Taille</th>
                  <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Genere</th>
                  <th className="text-center px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Statut</th>
                  <th className="text-center px-5 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentExports.map((exp) => (
                  <tr key={exp.id} className="border-t border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        {exp.format === 'PDF' ? (
                          <FileType className="w-4 h-4 text-red-500" />
                        ) : exp.format === 'Excel' ? (
                          <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Archive className="w-4 h-4 text-blue-500" />
                        )}
                        <span className="font-medium text-slate-700 text-xs">{exp.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        exp.format === 'PDF' ? 'bg-red-100 text-red-700' :
                        exp.format === 'Excel' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {exp.format}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-center text-xs text-slate-500">{exp.size}</td>
                    <td className="px-5 py-3 text-xs text-slate-500">
                      {new Date(exp.generatedAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-5 py-3 text-center">
                      <StatusBadge status={exp.status} />
                    </td>
                    <td className="px-5 py-3 text-center">
                      <button
                        disabled={exp.status === 'processing'}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-50"
                      >
                        <Download className="w-3 h-3" />
                        Telecharger
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
