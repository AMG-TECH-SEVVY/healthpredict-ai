import {
  Upload,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  Loader2,
  Trash2,
  Download,
  FileText,
} from 'lucide-react';
import StatusBadge from '../../components/shared/StatusBadge';
import { mockImportedDatasets } from '../../lib/mock-data';

const statusIcons: Record<string, typeof CheckCircle> = {
  completed: CheckCircle,
  processing: Loader2,
  failed: AlertCircle,
};

export default function ImportData() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Import de Donnees</h1>
        <p className="mt-1 text-sm text-slate-500">
          Televerser et gerer les imports de donnees hospitalieres pour l'analyse et l'entrainement du modele IA
        </p>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-10 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-colors cursor-pointer">
          <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-1">
            Glisser-deposer les fichiers ici
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            ou cliquez pour parcourir depuis votre ordinateur
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              CSV
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              XLSX
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              JSON
            </span>
          </div>
          <button className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors shadow-sm">
            <Upload className="w-4 h-4" />
            Parcourir les fichiers
          </button>
        </div>
      </div>

      {/* Recent Imports Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-base font-semibold text-slate-900">Imports Recents</h2>
          <p className="text-xs text-slate-500 mt-1">
            Historique et statut des imports de donnees recents
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left py-3.5 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Nom du Fichier
                </th>
                <th className="text-center py-3.5 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Enregistrements
                </th>
                <th className="text-center py-3.5 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="text-left py-3.5 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-center py-3.5 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {mockImportedDatasets.map((dataset) => {
                const StatusIcon = statusIcons[dataset.import_status] || CheckCircle;
                return (
                  <tr
                    key={dataset.id}
                    className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                          <FileSpreadsheet className="w-4 h-4 text-slate-500" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{dataset.filename}</p>
                          {dataset.error_details && (
                            <p className="text-xs text-red-500 mt-0.5">{dataset.error_details}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-center text-slate-600 font-mono">
                      {dataset.record_count > 0 ? dataset.record_count.toLocaleString() : '--'}
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <StatusIcon
                          className={`w-3.5 h-3.5 ${
                            dataset.import_status === 'completed'
                              ? 'text-green-500'
                              : dataset.import_status === 'failed'
                              ? 'text-red-500'
                              : 'text-blue-500 animate-spin'
                          }`}
                        />
                        <StatusBadge status={dataset.import_status as 'processing' | 'completed' | 'failed'} />
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-slate-500 text-xs">
                      {new Date(dataset.created_at).toLocaleDateString('fr-FR', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {dataset.import_status === 'completed' && (
                          <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors" title="Telecharger">
                            <Download className="w-4 h-4 text-slate-500" />
                          </button>
                        )}
                        <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Supprimer">
                          <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
          <span>{mockImportedDatasets.length} imports au total</span>
          <span>
            {mockImportedDatasets.filter(d => d.import_status === 'completed').length} termines,{' '}
            {mockImportedDatasets.filter(d => d.import_status === 'processing').length} en cours,{' '}
            {mockImportedDatasets.filter(d => d.import_status === 'failed').length} echoues
          </span>
        </div>
      </div>
    </div>
  );
}
