import { Bell, Search, CircleUser as UserCircle } from 'lucide-react';
import { useRole } from '../../hooks/useRole';
import type { UserRole } from '../../types';
import { mockAlerts } from '../../lib/mock-data';
import { useState } from 'react';

const roleLabels: Record<UserRole, string> = {
  doctor: 'Dr. Fatou Diallo',
  nurse: 'Aminata Ndiaye, Inf.',
  admin: 'Mamadou Sow',
  analyst: 'Dr. Khady Ba',
  patient: 'Ousmane Diop',
};

const roleColors: Record<UserRole, string> = {
  doctor: 'bg-blue-100 text-blue-700',
  nurse: 'bg-teal-100 text-teal-700',
  admin: 'bg-slate-100 text-slate-700',
  analyst: 'bg-amber-100 text-amber-700',
  patient: 'bg-green-100 text-green-700',
};

const roleDisplayNames: Record<UserRole, string> = {
  doctor: 'Medecin',
  nurse: 'Infirmier',
  admin: 'Admin',
  analyst: 'Analyste',
  patient: 'Patient',
};

export default function Header() {
  const { role, setRole } = useRole();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const unreadAlerts = mockAlerts.filter((a) => !a.is_read).length;

  const roles: UserRole[] = ['doctor', 'nurse', 'admin', 'analyst', 'patient'];

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher patients, rapports..."
            className="pl-10 pr-4 py-2 w-72 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-slate-50 rounded-lg p-1">
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                role === r
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {roleDisplayNames[r]}
            </button>
          ))}
        </div>

        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <Bell size={20} className="text-slate-600" />
          {unreadAlerts > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadAlerts}
            </span>
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="text-right">
              <p className="text-sm font-medium text-slate-800">{roleLabels[role]}</p>
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${roleColors[role]}`}>
                {role.toUpperCase()}
              </span>
            </div>
            <UserCircle size={32} className="text-slate-400" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
              <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                Parametres Profil
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                Aide & Support
              </button>
              <hr className="my-1 border-slate-100" />
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                Deconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
