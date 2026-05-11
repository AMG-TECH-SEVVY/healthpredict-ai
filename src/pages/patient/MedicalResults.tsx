import { FileText, Download, Eye, Search } from 'lucide-react';
import { useState } from 'react';
import { mockMedicalDocuments } from '../../lib/mock-data';

const categoryConfig = {
  resultat: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Resultat' },
  ordonnance: { bg: 'bg-green-100', text: 'text-green-700', label: 'Ordonnance' },
  rapport: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Rapport' },
  imagerie: { bg: 'bg-teal-100', text: 'text-teal-700', label: 'Imagerie' },
  autre: { bg: 'bg-slate-100', text: 'text-slate-700', label: 'Autre' },
};

export default function MedicalResults() {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = mockMedicalDocuments.filter((doc) => {
    const matchCategory = filter === 'all' || doc.category === filter;
    const matchSearch = doc.filename.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Resultats Medicaux</h1>
        <p className="mt-1 text-sm text-slate-500">Consultez vos resultats et documents medicaux</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un document..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'Tous' },
            { key: 'resultat', label: 'Resultats' },
            { key: 'ordonnance', label: 'Ordonnances' },
            { key: 'rapport', label: 'Rapports' },
            { key: 'imagerie', label: 'Imagerie' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                filter === tab.key ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-3">
        {filtered.map((doc) => {
          const config = categoryConfig[doc.category as keyof typeof categoryConfig];
          return (
            <div key={doc.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}>
                  <FileText size={20} className={config.text} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{doc.filename}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${config.bg} ${config.text}`}>
                      {config.label}
                    </span>
                    <span className="text-xs text-slate-400">{doc.file_size}</span>
                    <span className="text-xs text-slate-400">
                      {new Date(doc.uploaded_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Envoye par {doc.uploaded_by}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-500 hover:text-blue-600">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-500 hover:text-green-600">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
