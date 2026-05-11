import { useState } from 'react';
import { Search, UserPlus, MoreHorizontal, CreditCard as Edit3, UserX, Mail, Shield } from 'lucide-react';
import { mockProfiles } from '../../lib/mock-data';

const roleColors: Record<string, string> = {
  doctor: 'bg-blue-100 text-blue-700',
  nurse: 'bg-teal-100 text-teal-700',
  admin: 'bg-purple-100 text-purple-700',
  analyst: 'bg-amber-100 text-amber-700',
};

const statusMap: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: 'bg-green-100', text: 'text-green-700', label: 'Actif' },
  inactive: { bg: 'bg-slate-100', text: 'text-slate-700', label: 'Inactif' },
};

export default function Users() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filtered = mockProfiles.filter((user) => {
    const matchesSearch =
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Simulate user status (alternate for demo)
  const enrichedUsers = filtered.map((user, idx) => ({
    ...user,
    status: idx % 4 === 3 ? 'inactive' : 'active' as string,
    lastLogin: idx === 0 ? '2025-05-09 08:30' : idx === 1 ? '2025-05-09 07:15' : idx === 2 ? '2025-05-08 16:45' : '2025-05-07 11:20',
  }));

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestion des Utilisateurs</h1>
          <p className="mt-1 text-sm text-slate-500">
            Gerer les comptes du personnel, les roles et les permissions d'acces
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors shadow-sm">
          <UserPlus className="w-4 h-4" />
          Ajouter un Utilisateur
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher par nom ou email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tous les Roles</option>
            <option value="doctor">Medecin</option>
            <option value="nurse">Infirmier</option>
            <option value="admin">Admin</option>
            <option value="analyst">Analyste</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left py-3.5 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="text-left py-3.5 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="text-left py-3.5 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="text-left py-3.5 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Departement
                </th>
                <th className="text-center py-3.5 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="text-left py-3.5 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Derniere Connexion
                </th>
                <th className="text-center py-3.5 px-5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {enrichedUsers.map((user) => {
                const status = statusMap[user.status] || statusMap.active;
                return (
                  <tr
                    key={user.id}
                    className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {user.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <span className="font-medium text-slate-900">{user.full_name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {user.email}
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${roleColors[user.role] || 'bg-slate-100 text-slate-700'}`}>
                        <Shield className="w-3 h-3" />
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-600">{user.department}</td>
                    <td className="py-3.5 px-5 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-500 text-xs">{user.lastLogin}</td>
                    <td className="py-3.5 px-5 text-center">
                      <div className="relative inline-block">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4 text-slate-500" />
                        </button>
                        {openMenuId === user.id && (
                          <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg border border-slate-200 shadow-lg z-10 py-1">
                            <button
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                              onClick={() => setOpenMenuId(null)}
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              Modifier l'Utilisateur
                            </button>
                            <button
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                              onClick={() => setOpenMenuId(null)}
                            >
                              <UserX className="w-3.5 h-3.5" />
                              Desactiver
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
          <span>Affichage de {enrichedUsers.length} sur {mockProfiles.length} utilisateurs</span>
          <span>Derniere mise a jour : A l'instant</span>
        </div>
      </div>
    </div>
  );
}
