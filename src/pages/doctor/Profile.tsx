import { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Building2,
  Shield,
  Pencil,
  Save,
  X,
  Lock,
  Camera,
} from 'lucide-react';
import { mockProfiles } from '../../lib/mock-data';

const doctorProfile = mockProfiles[0];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: doctorProfile.full_name,
    email: doctorProfile.email,
    phone: doctorProfile.phone,
    department: doctorProfile.department,
    role: doctorProfile.role,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState('');

  function handleSave() {
    setIsEditing(false);
  }

  function handleCancel() {
    setFormData({
      full_name: doctorProfile.full_name,
      email: doctorProfile.email,
      phone: doctorProfile.phone,
      department: doctorProfile.department,
      role: doctorProfile.role,
    });
    setIsEditing(false);
  }

  function handlePasswordChange() {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      setPasswordError('Le mot de passe doit contenir au moins 8 caracteres');
      return;
    }
    setPasswordError('');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Gestion du Profil</h1>
        <p className="mt-1 text-sm text-slate-500">
          Consultez et gerez les informations de votre profil
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
            {/* Avatar */}
            <div className="relative inline-block mb-4">
              <img
                src={doctorProfile.avatar_url}
                alt={doctorProfile.full_name}
                className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-slate-100"
              />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <h2 className="text-lg font-bold text-slate-900">{doctorProfile.full_name}</h2>
            <p className="text-sm text-slate-500 mt-0.5">{doctorProfile.email}</p>

            <div className="mt-5 space-y-3 text-left">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Departement</p>
                  <p className="font-medium text-slate-700">{doctorProfile.department}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Role</p>
                  <p className="font-medium text-slate-700 capitalize">{doctorProfile.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Telephone</p>
                  <p className="font-medium text-slate-700">{doctorProfile.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Email</p>
                  <p className="font-medium text-slate-700 break-all">{doctorProfile.email}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400">
                Membre depuis{' '}
                {new Date(doctorProfile.created_at).toLocaleDateString('fr-FR', {
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Edit Form + Change Password */}
        <div className="lg:col-span-2 space-y-6">
          {/* Edit Profile Form */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Informations du Profil</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Mettez a jour vos coordonnees personnelles et de contact
                  </p>
                </div>
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Modifier
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    Annuler
                  </button>
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Enregistrer
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  Nom Complet
                </label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 text-sm border rounded-lg transition-colors ${
                    isEditing
                      ? 'border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400'
                      : 'border-slate-100 bg-slate-50 text-slate-600 cursor-default'
                  }`}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 text-sm border rounded-lg transition-colors ${
                    isEditing
                      ? 'border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400'
                      : 'border-slate-100 bg-slate-50 text-slate-600 cursor-default'
                  }`}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  Telephone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 text-sm border rounded-lg transition-colors ${
                    isEditing
                      ? 'border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400'
                      : 'border-slate-100 bg-slate-50 text-slate-600 cursor-default'
                  }`}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  Departement
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 text-sm border rounded-lg transition-colors ${
                    isEditing
                      ? 'border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400'
                      : 'border-slate-100 bg-slate-50 text-slate-600 cursor-default'
                  }`}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  Role
                </label>
                <input
                  type="text"
                  value={formData.role}
                  disabled
                  className="w-full px-3 py-2 text-sm border border-slate-100 bg-slate-50 text-slate-600 cursor-default rounded-lg capitalize"
                />
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">Changer le Mot de Passe</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Mettez a jour votre mot de passe pour securiser votre compte
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-2xl">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  Mot de Passe Actuel
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, currentPassword: e.target.value })
                  }
                  placeholder="Entrez le mot de passe actuel"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  Nouveau Mot de Passe
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                  placeholder="Entrez le nouveau mot de passe"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">
                  Confirmer le Mot de Passe
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                  }
                  placeholder="Confirmez le nouveau mot de passe"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors bg-white"
                />
              </div>
            </div>

            {passwordError && (
              <p className="mt-2 text-xs text-red-600 font-medium">{passwordError}</p>
            )}

            <div className="mt-4">
              <button
                onClick={handlePasswordChange}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500/20 transition-colors shadow-sm"
              >
                <Lock className="w-4 h-4" />
                Mettre a Jour le Mot de Passe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
