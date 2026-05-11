import { useState } from 'react';
import {
  Shield,
  Database,
  Link2,
  Save,
  Globe,
  Bell,
  FileText,
  Server,
} from 'lucide-react';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: () => void;
}

function ToggleSwitch({ enabled, onChange }: ToggleSwitchProps) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-600' : 'bg-slate-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export default function Settings() {
  const [generalSettings, setGeneralSettings] = useState({
    hospitalName: 'Metro General Hospital',
    timezone: 'America/New_York',
    language: 'en',
    darkMode: false,
    emailNotifications: true,
    maintenanceMode: false,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: '30',
    passwordExpiry: '90',
    ipWhitelist: false,
    auditLogging: true,
    loginAttempts: '5',
  });

  const [dataRetention, setDataRetention] = useState({
    patientRecords: '7',
    auditLogs: '3',
    aiPredictions: '5',
    autoArchive: true,
    gdprCompliance: true,
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    ehrSync: true,
    labSystem: false,
    pharmacySystem: true,
    billingSystem: true,
    syncInterval: '15',
    apiRateLimit: '1000',
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Parametres Systeme</h1>
          <p className="mt-1 text-sm text-slate-500">
            Configurer les preferences et integrations du systeme de gestion hospitaliere
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors shadow-sm">
          <Save className="w-4 h-4" />
          Enregistrer Tout
        </button>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Globe className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Parametres Generaux</h2>
              <p className="text-xs text-slate-500">Configuration de base et preferences du systeme</p>
            </div>
          </div>
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Nom de l'Hopital</label>
                <input
                  type="text"
                  value={generalSettings.hospitalName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, hospitalName: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Fuseau Horaire</label>
                <select
                  value={generalSettings.timezone}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="America/New_York">Heure de l'Est (ET)</option>
                  <option value="America/Chicago">Heure Centrale (CT)</option>
                  <option value="America/Denver">Heure des Rocheuses (MT)</option>
                  <option value="America/Los_Angeles">Heure du Pacifique (PT)</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Langue</label>
                <select
                  value={generalSettings.language}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, language: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="en">Anglais</option>
                  <option value="es">Espagnol</option>
                  <option value="fr">Francais</option>
                  <option value="de">Allemand</option>
                </select>
              </div>
              <div className="flex items-end">
                <div className="flex items-center justify-between w-full py-2.5">
                  <div>
                    <p className="text-sm font-medium text-slate-700">Notifications par Email</p>
                    <p className="text-xs text-slate-500">Recevoir les alertes systeme par email</p>
                  </div>
                  <ToggleSwitch
                    enabled={generalSettings.emailNotifications}
                    onChange={() => setGeneralSettings({ ...generalSettings, emailNotifications: !generalSettings.emailNotifications })}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between py-2.5 border-t border-slate-100">
              <div>
                <p className="text-sm font-medium text-slate-700">Mode Maintenance</p>
                <p className="text-xs text-slate-500">Restreindre l'acces aux administrateurs uniquement</p>
              </div>
              <ToggleSwitch
                enabled={generalSettings.maintenanceMode}
                onChange={() => setGeneralSettings({ ...generalSettings, maintenanceMode: !generalSettings.maintenanceMode })}
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
              <Shield className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Parametres Securite</h2>
              <p className="text-xs text-slate-500">Configuration de l'authentification et du controle d'acces</p>
            </div>
          </div>
          <div className="p-6 space-y-5">
            <div className="flex items-center justify-between py-2.5">
              <div>
                <p className="text-sm font-medium text-slate-700">Authentification a Deux Facteurs</p>
                <p className="text-xs text-slate-500">Exiger l'authentification a deux facteurs pour tous les comptes</p>
              </div>
              <ToggleSwitch
                enabled={securitySettings.twoFactorAuth}
                onChange={() => setSecuritySettings({ ...securitySettings, twoFactorAuth: !securitySettings.twoFactorAuth })}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Expiration de Session (minutes)</label>
                <select
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="120">120 minutes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Expiration Mot de Passe (jours)</label>
                <select
                  value={securitySettings.passwordExpiry}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, passwordExpiry: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="30">30 jours</option>
                  <option value="60">60 jours</option>
                  <option value="90">90 jours</option>
                  <option value="180">180 jours</option>
                  <option value="never">Jamais</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-between py-2.5 border-t border-slate-100">
              <div>
                <p className="text-sm font-medium text-slate-700">Liste Blanche IP</p>
                <p className="text-xs text-slate-500">Restreindre l'acces aux adresses IP approuvees</p>
              </div>
              <ToggleSwitch
                enabled={securitySettings.ipWhitelist}
                onChange={() => setSecuritySettings({ ...securitySettings, ipWhitelist: !securitySettings.ipWhitelist })}
              />
            </div>
            <div className="flex items-center justify-between py-2.5 border-t border-slate-100">
              <div>
                <p className="text-sm font-medium text-slate-700">Journal d'Audit</p>
                <p className="text-xs text-slate-500">Enregistrer toutes les actions des utilisateurs pour la conformite</p>
              </div>
              <ToggleSwitch
                enabled={securitySettings.auditLogging}
                onChange={() => setSecuritySettings({ ...securitySettings, auditLogging: !securitySettings.auditLogging })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Tentatives de Connexion Max</label>
              <select
                value={securitySettings.loginAttempts}
                onChange={(e) => setSecuritySettings({ ...securitySettings, loginAttempts: e.target.value })}
                className="w-full md:w-1/2 px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="3">3 tentatives</option>
                <option value="5">5 tentatives</option>
                <option value="10">10 tentatives</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Retention */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
              <Database className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Conservation des Donnees</h2>
              <p className="text-xs text-slate-500">Politiques de stockage et periodes de conservation des donnees</p>
            </div>
          </div>
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Dossiers Patients (annees)</label>
                <select
                  value={dataRetention.patientRecords}
                  onChange={(e) => setDataRetention({ ...dataRetention, patientRecords: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="3">3 annees</option>
                  <option value="5">5 annees</option>
                  <option value="7">7 annees</option>
                  <option value="10">10 annees</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Journaux d'Audit (annees)</label>
                <select
                  value={dataRetention.auditLogs}
                  onChange={(e) => setDataRetention({ ...dataRetention, auditLogs: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="1">1 annee</option>
                  <option value="3">3 annees</option>
                  <option value="5">5 annees</option>
                  <option value="7">7 annees</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Predictions IA (annees)</label>
                <select
                  value={dataRetention.aiPredictions}
                  onChange={(e) => setDataRetention({ ...dataRetention, aiPredictions: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="2">2 annees</option>
                  <option value="3">3 annees</option>
                  <option value="5">5 annees</option>
                  <option value="7">7 annees</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-between py-2.5 border-t border-slate-100">
              <div>
                <p className="text-sm font-medium text-slate-700">Archivage Automatique</p>
                <p className="text-xs text-slate-500">Archiver automatiquement les enregistrements au-dela de la periode de conservation</p>
              </div>
              <ToggleSwitch
                enabled={dataRetention.autoArchive}
                onChange={() => setDataRetention({ ...dataRetention, autoArchive: !dataRetention.autoArchive })}
              />
            </div>
            <div className="flex items-center justify-between py-2.5 border-t border-slate-100">
              <div>
                <p className="text-sm font-medium text-slate-700">Conformite RGPD</p>
                <p className="text-xs text-slate-500">Appliquer les regles strictes de protection des donnees</p>
              </div>
              <ToggleSwitch
                enabled={dataRetention.gdprCompliance}
                onChange={() => setDataRetention({ ...dataRetention, gdprCompliance: !dataRetention.gdprCompliance })}
              />
            </div>
          </div>
        </div>

        {/* Integration Settings */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <Link2 className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Parametres d'Integration</h2>
              <p className="text-xs text-slate-500">Connexions aux systemes externes et synchronisation des donnees</p>
            </div>
          </div>
          <div className="p-6 space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Systeme DME</p>
                    <p className="text-xs text-slate-500">Synchroniser les donnees patients avec les dossiers medicaux electroniques</p>
                  </div>
                </div>
                <ToggleSwitch
                  enabled={integrationSettings.ehrSync}
                  onChange={() => setIntegrationSettings({ ...integrationSettings, ehrSync: !integrationSettings.ehrSync })}
                />
              </div>
              <div className="flex items-center justify-between py-2.5 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                    <Server className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Systeme Laboratoire</p>
                    <p className="text-xs text-slate-500">Se connecter au systeme d'information du laboratoire</p>
                  </div>
                </div>
                <ToggleSwitch
                  enabled={integrationSettings.labSystem}
                  onChange={() => setIntegrationSettings({ ...integrationSettings, labSystem: !integrationSettings.labSystem })}
                />
              </div>
              <div className="flex items-center justify-between py-2.5 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                    <Database className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Systeme Pharmacie</p>
                    <p className="text-xs text-slate-500">Synchroniser les donnees de medicaments et d'ordonnances</p>
                  </div>
                </div>
                <ToggleSwitch
                  enabled={integrationSettings.pharmacySystem}
                  onChange={() => setIntegrationSettings({ ...integrationSettings, pharmacySystem: !integrationSettings.pharmacySystem })}
                />
              </div>
              <div className="flex items-center justify-between py-2.5 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                    <Bell className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Systeme Facturation</p>
                    <p className="text-xs text-slate-500">Se connecter a la plateforme de facturation hospitaliere</p>
                  </div>
                </div>
                <ToggleSwitch
                  enabled={integrationSettings.billingSystem}
                  onChange={() => setIntegrationSettings({ ...integrationSettings, billingSystem: !integrationSettings.billingSystem })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-slate-100">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Intervalle de Synchronisation (minutes)</label>
                <select
                  value={integrationSettings.syncInterval}
                  onChange={(e) => setIntegrationSettings({ ...integrationSettings, syncInterval: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="5">5 minutes</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Limite de Debit API (req/min)</label>
                <input
                  type="number"
                  value={integrationSettings.apiRateLimit}
                  onChange={(e) => setIntegrationSettings({ ...integrationSettings, apiRateLimit: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
