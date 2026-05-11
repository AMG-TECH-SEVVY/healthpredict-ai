import { useState } from 'react';
import { Shield, Users, CheckCircle, Circle, CreditCard as Edit3, Save, X } from 'lucide-react';

interface RoleData {
  id: string;
  name: string;
  userCount: number;
  color: string;
  icon: string;
  permissions: { name: string; enabled: boolean }[];
}

const initialRoles: RoleData[] = [
  {
    id: 'doctor',
    name: 'Medecin',
    userCount: 8,
    color: 'from-blue-500 to-blue-700',
    icon: 'D',
    permissions: [
      { name: 'Voir les Dossiers Patients', enabled: true },
      { name: 'Modifier les Donnees Patients', enabled: true },
      { name: 'Voir les Predictions IA', enabled: true },
      { name: 'Generer des Rapports', enabled: true },
      { name: 'Prescrire des Medicaments', enabled: true },
      { name: 'Exporter les Donnees', enabled: false },
      { name: 'Gerer les Utilisateurs', enabled: false },
      { name: 'Parametres Systeme', enabled: false },
    ],
  },
  {
    id: 'nurse',
    name: 'Infirmier',
    userCount: 12,
    color: 'from-teal-500 to-teal-700',
    icon: 'N',
    permissions: [
      { name: 'Voir les Dossiers Patients', enabled: true },
      { name: 'Modifier les Donnees Patients', enabled: true },
      { name: 'Enregistrer les Constantes', enabled: true },
      { name: 'Voir les Predictions IA', enabled: true },
      { name: 'Gerer les Rendez-vous', enabled: true },
      { name: 'Generer des Rapports', enabled: false },
      { name: 'Exporter les Donnees', enabled: true },
      { name: 'Gerer les Utilisateurs', enabled: false },
    ],
  },
  {
    id: 'admin',
    name: 'Admin',
    userCount: 3,
    color: 'from-purple-500 to-purple-700',
    icon: 'A',
    permissions: [
      { name: 'Voir les Dossiers Patients', enabled: true },
      { name: 'Modifier les Donnees Patients', enabled: true },
      { name: 'Gerer les Utilisateurs', enabled: true },
      { name: 'Parametres Systeme', enabled: true },
      { name: 'Exporter les Donnees', enabled: true },
      { name: 'Gerer les Roles', enabled: true },
      { name: 'Import de Donnees', enabled: true },
      { name: 'Voir les Journaux d\'Audit', enabled: true },
    ],
  },
  {
    id: 'analyst',
    name: 'Analyste',
    userCount: 2,
    color: 'from-amber-500 to-amber-700',
    icon: 'An',
    permissions: [
      { name: 'Voir les Dossiers Patients', enabled: true },
      { name: 'Voir les Predictions IA', enabled: true },
      { name: 'Generer des Rapports', enabled: true },
      { name: 'Exporter les Donnees', enabled: true },
      { name: 'Import de Donnees', enabled: true },
      { name: 'Modifier les Donnees Patients', enabled: false },
      { name: 'Gerer les Utilisateurs', enabled: false },
      { name: 'Parametres Systeme', enabled: false },
    ],
  },
];

export default function Roles() {
  const [roles, setRoles] = useState<RoleData[]>(initialRoles);
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);

  const togglePermission = (roleId: string, permIndex: number) => {
    setRoles((prev) =>
      prev.map((role) =>
        role.id === roleId
          ? {
              ...role,
              permissions: role.permissions.map((p, i) =>
                i === permIndex ? { ...p, enabled: !p.enabled } : p
              ),
            }
          : role
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Roles & Permissions</h1>
        <p className="mt-1 text-sm text-slate-500">
          Configurer les niveaux d'acces et les permissions pour chaque role hospitalier
        </p>
      </div>

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {roles.map((role) => {
          const isEditing = editingRoleId === role.id;
          const enabledCount = role.permissions.filter((p) => p.enabled).length;
          return (
            <div
              key={role.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
            >
              {/* Role Header */}
              <div className={`bg-gradient-to-r ${role.color} px-6 py-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                      {role.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{role.name}</h3>
                      <p className="text-xs text-white/80 mt-0.5">{role.userCount} utilisateurs assignes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-white text-xs font-medium">
                      <Shield className="w-3 h-3" />
                      {enabledCount}/{role.permissions.length} permissions
                    </span>
                  </div>
                </div>
              </div>

              {/* Permission List */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-700">Permissions</span>
                  </div>
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingRoleId(null)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                      >
                        <Save className="w-3.5 h-3.5" />
                        Enregistrer
                      </button>
                      <button
                        onClick={() => setEditingRoleId(null)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        Annuler
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditingRoleId(role.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Modifier les Permissions
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {role.permissions.map((perm, idx) => (
                    <div
                      key={perm.name}
                      className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                        perm.enabled ? 'bg-slate-50' : 'bg-slate-50/50'
                      }`}
                    >
                      <span
                        className={`text-sm ${
                          perm.enabled ? 'text-slate-900 font-medium' : 'text-slate-400'
                        }`}
                      >
                        {perm.name}
                      </span>
                      {isEditing ? (
                        <button
                          onClick={() => togglePermission(role.id, idx)}
                          className={`w-10 h-5.5 rounded-full transition-colors relative ${
                            perm.enabled ? 'bg-blue-600' : 'bg-slate-300'
                          }`}
                          style={{ width: 40, height: 22 }}
                        >
                          <span
                            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                              perm.enabled ? 'translate-x-5' : 'translate-x-0.5'
                            }`}
                          />
                        </button>
                      ) : perm.enabled ? (
                        <CheckCircle className="w-4.5 h-4.5 text-blue-600 flex-shrink-0" />
                      ) : (
                        <Circle className="w-4.5 h-4.5 text-slate-300 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
