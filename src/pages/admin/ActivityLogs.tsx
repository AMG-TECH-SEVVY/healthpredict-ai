import { useState } from 'react';
import {
  Search,
  Calendar,
  Clock,
  ArrowUpDown,
  Monitor,
} from 'lucide-react';
import { mockActivityLogs, mockProfiles } from '../../lib/mock-data';

const actionTypeColors: Record<string, string> = {
  'Viewed Patient Record': 'bg-blue-100 text-blue-700',
  'Updated Vitals': 'bg-teal-100 text-teal-700',
  'Generated Risk Report': 'bg-purple-100 text-purple-700',
  'Created User Account': 'bg-green-100 text-green-700',
  'Exported Analytics Report': 'bg-amber-100 text-amber-700',
  'Completed Appointment': 'bg-teal-100 text-teal-700',
  'Updated Risk Score': 'bg-red-100 text-red-700',
  'Modified Role Permissions': 'bg-purple-100 text-purple-700',
  'Imported Dataset': 'bg-amber-100 text-amber-700',
  'Acknowledged Alert': 'bg-slate-100 text-slate-700',
};

const actionTypes = [...new Set(mockActivityLogs.map((l) => l.action))];

export default function ActivityLogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');

  const getUserName = (userId: string) => {
    const profile = mockProfiles.find((p) => p.id === userId);
    return profile ? profile.full_name : `Utilisateur ${userId}`;
  };

  const filtered = mockActivityLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.ip_address ?? 'N/A').includes(searchQuery) ||
      (log.details && Object.values(log.details).some(v => String(v).toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    const matchesUser = userFilter === 'all' || log.user_id === userFilter;
    return matchesSearch && matchesAction && matchesUser;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Journal d'Activite & Piste d'Audit</h1>
        <p className="mt-1 text-sm text-slate-500">
          Piste d'audit complete de toutes les actions systeme et activites des utilisateurs
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher les journaux par action, details ou adresse IP..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tous les Utilisateurs</option>
            {mockProfiles.map((p) => (
              <option key={p.id} value={p.id}>{p.full_name}</option>
            ))}
          </select>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Toutes les Actions</option>
            {actionTypes.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="date"
              className="pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Audit Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left py-3.5 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    Utilisateur <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="text-left py-3.5 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="text-left py-3.5 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Ressource
                </th>
                <th className="text-left py-3.5 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="text-left py-3.5 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <Monitor className="w-3 h-3" /> Adresse IP
                  </div>
                </th>
                <th className="text-left py-3.5 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Horodatage
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {getUserName(log.user_id).split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <span className="font-medium text-slate-900 text-sm">
                        {getUserName(log.user_id)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${actionTypeColors[log.action] || 'bg-slate-100 text-slate-700'}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-slate-600 text-xs font-mono">
                    {log.resource_type}
                    {log.resource_id && <span className="text-slate-400"> / {log.resource_id}</span>}
                  </td>
                  <td className="py-3.5 px-5 text-slate-500 text-xs max-w-[200px] truncate">
                    {log.details ? Object.entries(log.details).map(([k, v]) => `${k}: ${v}`).join(', ') : '--'}
                  </td>
                  <td className="py-3.5 px-5 text-slate-500 text-xs font-mono">
                    {log.ip_address}
                  </td>
                  <td className="py-3.5 px-5 text-slate-500 text-xs">
                    {new Date(log.created_at).toLocaleDateString('fr-FR', {
                      month: 'short',
                      day: 'numeric',
                    })}{' '}
                    {new Date(log.created_at).toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
          <span>Affichage de {filtered.length} sur {mockActivityLogs.length} entrees de journal</span>
          <div className="flex items-center gap-4">
            <span>Filtre : {actionFilter !== 'all' ? actionFilter : 'Toutes les actions'}</span>
            <span>Page 1 sur 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
