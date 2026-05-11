import { useState } from 'react';
import {
  RotateCcw,
  Clock,
  AlertTriangle,
  Search,
  Filter,
} from 'lucide-react';
import { mockPatients } from '../../lib/mock-data';
import StatCard from '../../components/shared/StatCard';

interface ReadmissionEntry {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  department: string;
  daysBetween: number;
  reason: string;
  outcome: 'Gueri' | 'En cours' | 'Transfere' | 'Decede';
}

const reasons = [
  'Non-observance du traitement',
  'Aggravation de la condition principale',
  'Nouvelle complication',
  'Planification de sortie inadaptee',
  'Manque de soins de suivi',
  'Rechute infectieuse',
];

const outcomes: ReadmissionEntry['outcome'][] = ['Gueri', 'En cours', 'Transfere', 'Decede'];

function generateReadmissionHistory(): ReadmissionEntry[] {
  const highRisk = mockPatients.filter(
    (p) => p.risk_level === 'high' || p.risk_level === 'medium'
  );
  const entries: ReadmissionEntry[] = [];

  highRisk.forEach((patient, i) => {
    const readmissionCount = patient.risk_level === 'high' ? 2 : 1;
    for (let j = 0; j < readmissionCount; j++) {
      const month = String(Math.max(1, (i * 2 + j + 1) % 12 || 1)).padStart(2, '0');
      const day = String(Math.min(28, (i + j) * 4 + 3)).padStart(2, '0');
      entries.push({
        id: `rh-${patient.id}-${j}`,
        patientName: `${patient.first_name} ${patient.last_name}`,
        patientId: patient.patient_id,
        date: `2025-${month}-${day}`,
        department: patient.department,
        daysBetween: Math.floor(Math.random() * 25) + 5,
        reason: reasons[(i + j) % reasons.length],
        outcome: outcomes[(i + j) % outcomes.length],
      });
    }
  });

  return entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

const readmissionHistory = generateReadmissionHistory();

const totalReadmissions = readmissionHistory.length;
const avgDaysToReadmission = Math.round(
  readmissionHistory.reduce((sum, e) => sum + e.daysBetween, 0) / totalReadmissions
);
const reasonCounts = readmissionHistory.reduce<Record<string, number>>((acc, e) => {
  acc[e.reason] = (acc[e.reason] || 0) + 1;
  return acc;
}, {});
const mostCommonReason = Object.entries(reasonCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

const outcomeConfig: Record<ReadmissionEntry['outcome'], { bg: string; text: string }> = {
  Gueri: { bg: 'bg-green-100', text: 'text-green-700' },
  'En cours': { bg: 'bg-amber-100', text: 'text-amber-700' },
  Transfere: { bg: 'bg-blue-100', text: 'text-blue-700' },
  Decede: { bg: 'bg-red-100', text: 'text-red-700' },
};

export default function ReadmissionHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [outcomeFilter, setOutcomeFilter] = useState<string>('all');

  const filteredEntries = readmissionHistory.filter((entry) => {
    const matchesSearch =
      !searchQuery.trim() ||
      entry.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.reason.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesOutcome =
      outcomeFilter === 'all' || entry.outcome === outcomeFilter;

    return matchesSearch && matchesOutcome;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Historique des Readmissions</h1>
        <p className="mt-1 text-sm text-slate-500">
          Historique des readmissions et analyse des resultats
        </p>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
        <StatCard
          title="Total Readmissions"
          value={totalReadmissions}
          subtitle="Tous les enregistrements"
          icon={<RotateCcw className="w-5 h-5" />}
          color="red"
        />
        <StatCard
          title="Moyenne Jours avant Readmission"
          value={`${avgDaysToReadmission} jours`}
          subtitle="Intervalle moyen"
          icon={<Clock className="w-5 h-5" />}
          color="amber"
        />
        <StatCard
          title="Raison la Plus Frequente"
          value={mostCommonReason}
          subtitle="Cause principale"
          icon={<AlertTriangle className="w-5 h-5" />}
          color="slate"
        />
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center w-full sm:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, ID ou raison..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors bg-slate-50 placeholder:text-slate-400"
              />
            </div>

            {/* Outcome Filter */}
            <div className="relative w-full sm:w-auto">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                value={outcomeFilter}
                onChange={(e) => setOutcomeFilter(e.target.value)}
                className="w-full sm:w-44 pl-10 pr-8 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors bg-slate-50 text-slate-700 appearance-none cursor-pointer"
              >
                <option value="all">Tous les Resultats</option>
                <option value="Gueri">Gueri</option>
                <option value="En cours">En cours</option>
                <option value="Transfere">Transfere</option>
                <option value="Decede">Decede</option>
              </select>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Affichage <span className="font-semibold text-slate-700">{filteredEntries.length}</span> sur{' '}
            <span className="font-semibold text-slate-700">{totalReadmissions}</span> enregistrements
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Departement
                </th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Jours Entre
                </th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Raison
                </th>
                <th className="text-center py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Resultat
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 text-sm">
                    Aucun enregistrement de readmission ne correspond a vos criteres.
                  </td>
                </tr>
              ) : (
                filteredEntries.map((entry) => {
                  const oc = outcomeConfig[entry.outcome];
                  return (
                    <tr
                      key={entry.id}
                      className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-slate-900">{entry.patientName}</p>
                          <p className="text-xs text-slate-400 font-mono">{entry.patientId}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                        {new Date(entry.date).toLocaleDateString('fr-FR', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                        {entry.department}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold ${
                              entry.daysBetween <= 10
                                ? 'bg-red-50 text-red-700'
                                : entry.daysBetween <= 20
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-green-50 text-green-700'
                            }`}
                          >
                            {entry.daysBetween}
                          </span>
                          <span className="text-xs text-slate-400">jours</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 max-w-[220px] truncate">
                        {entry.reason}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${oc.bg} ${oc.text}`}
                        >
                          {entry.outcome}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
