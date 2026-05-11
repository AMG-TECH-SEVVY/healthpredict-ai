import { useState } from 'react';
import {
  Bell,
  Brain,
  Monitor,
  Download,
  Save,
} from 'lucide-react';

interface ToggleProps {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}

function Toggle({ label, description, enabled, onToggle }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-slate-900">{label}</p>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
          enabled ? 'bg-blue-600' : 'bg-slate-200'
        }`}
        role="switch"
        aria-checked={enabled}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ease-in-out ${
            enabled ? 'translate-x-5.5' : 'translate-x-0.5'
          }`}
          style={{ marginTop: '2px' }}
        />
      </button>
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  description: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

function SelectField({ label, description, value, options, onChange }: SelectFieldProps) {
  return (
    <div className="py-3">
      <p className="text-sm font-medium text-slate-900">{label}</p>
      <p className="text-xs text-slate-500 mt-0.5 mb-2">{description}</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full sm:w-64 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors bg-slate-50 text-slate-700 appearance-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function Settings() {
  // Notification Preferences
  const [notifications, setNotifications] = useState({
    criticalAlerts: true,
    warningAlerts: true,
    infoAlerts: false,
    emailNotifications: true,
    smsNotifications: false,
    dailyDigest: true,
  });

  // AI Model Settings
  const [sensitivity, setSensitivity] = useState('balanced');
  const [modelVersion, setModelVersion] = useState('v2.0');
  const [predictionWindow, setPredictionWindow] = useState('30');

  // Display Preferences
  const [display, setDisplay] = useState({
    compactView: false,
    showRiskScores: true,
    showTrendIndicators: true,
    darkMode: false,
  });

  // Data Export Settings
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportFrequency, setExportFrequency] = useState('weekly');
  const [includePhi, setIncludePhi] = useState(false);

  function toggleNotification(key: keyof typeof notifications) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function toggleDisplay(key: keyof typeof display) {
    setDisplay((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Parametres</h1>
          <p className="mt-1 text-sm text-slate-500">
            Configurez vos preferences et les parametres de l'application
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors shadow-sm">
          <Save className="w-4 h-4" />
          Enregistrer Tout
        </button>
      </div>

      <div className="space-y-6 max-w-3xl">
        {/* Notification Preferences */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Preferences de Notification</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Gerez la facon dont vous recevez les alertes et notifications
              </p>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            <Toggle
              label="Alertes Critiques"
              description="Recevez des notifications immediates pour les alertes critiques des patients"
              enabled={notifications.criticalAlerts}
              onToggle={() => toggleNotification('criticalAlerts')}
            />
            <Toggle
              label="Alertes d'Avertissement"
              description="Recevez des notifications pour les alertes de niveau avertissement"
              enabled={notifications.warningAlerts}
              onToggle={() => toggleNotification('warningAlerts')}
            />
            <Toggle
              label="Alertes d'Information"
              description="Recevez des notifications pour les alertes informatives"
              enabled={notifications.infoAlerts}
              onToggle={() => toggleNotification('infoAlerts')}
            />
            <Toggle
              label="Notifications par Email"
              description="Envoyez les notifications d'alerte a votre adresse email"
              enabled={notifications.emailNotifications}
              onToggle={() => toggleNotification('emailNotifications')}
            />
            <Toggle
              label="Notifications par SMS"
              description="Recevez les alertes critiques par SMS"
              enabled={notifications.smsNotifications}
              onToggle={() => toggleNotification('smsNotifications')}
            />
            <Toggle
              label="Resume Quotidien"
              description="Recevez un resume quotidien de toutes les alertes et activites"
              enabled={notifications.dailyDigest}
              onToggle={() => toggleNotification('dailyDigest')}
            />
          </div>
        </div>

        {/* AI Model Settings */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Parametres du Modele IA</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Configurez les parametres du modele de prediction de readmission
              </p>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            <SelectField
              label="Niveau de Sensibilite"
              description="Controle le compromis entre la detection de toutes les readmissions et les faux positifs"
              value={sensitivity}
              onChange={setSensitivity}
              options={[
                { value: 'high', label: 'Elevee — Maximiser le rappel (plus de faux positifs)' },
                { value: 'balanced', label: 'Equilibre — Optimiser le score F1' },
                { value: 'conservative', label: 'Conservateur — Minimiser les faux positifs' },
              ]}
            />
            <SelectField
              label="Version du Modele"
              description="Selectionnez la version du modele IA pour les predictions"
              value={modelVersion}
              onChange={setModelVersion}
              options={[
                { value: 'v1.0', label: 'v1.0 — Ancienne (deconseillee)' },
                { value: 'v2.0', label: 'v2.0 — Production actuelle' },
                { value: 'v2.1', label: 'v2.1 — Beta (precision superieure)' },
              ]}
            />
            <SelectField
              label="Fenetre de Prediction"
              description="Fenetre temporelle pour la prediction des risques de readmission"
              value={predictionWindow}
              onChange={setPredictionWindow}
              options={[
                { value: '7', label: '7 jours' },
                { value: '14', label: '14 jours' },
                { value: '30', label: '30 jours' },
                { value: '90', label: '90 jours' },
              ]}
            />
          </div>
        </div>

        {/* Display Preferences */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Preferences d'Affichage</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Personnalisez l'apparence visuelle et la mise en page
              </p>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            <Toggle
              label="Vue Compacte"
              description="Reduire l'espacement et afficher plus de donnees par ecran"
              enabled={display.compactView}
              onToggle={() => toggleDisplay('compactView')}
            />
            <Toggle
              label="Afficher Scores de Risque"
              description="Afficher les scores de risque numeriques a cote des badges"
              enabled={display.showRiskScores}
              onToggle={() => toggleDisplay('showRiskScores')}
            />
            <Toggle
              label="Afficher Indicateurs de Tendance"
              description="Afficher les fleches de tendance et indicateurs de changement sur les cartes de statistiques"
              enabled={display.showTrendIndicators}
              onToggle={() => toggleDisplay('showTrendIndicators')}
            />
            <Toggle
              label="Mode Sombre"
              description="Passer au schema de couleurs sombres"
              enabled={display.darkMode}
              onToggle={() => toggleDisplay('darkMode')}
            />
          </div>
        </div>

        {/* Data Export Settings */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Export de Donnees</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Configurez les exportations de donnees automatisees et les formats
              </p>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            <SelectField
              label="Format d'Export"
              description="Format de fichier par defaut pour les exportations de donnees"
              value={exportFormat}
              onChange={setExportFormat}
              options={[
                { value: 'csv', label: 'CSV — Valeurs separees par des virgules' },
                { value: 'xlsx', label: 'XLSX — Tableur Excel' },
                { value: 'json', label: 'JSON — Donnees structurees' },
                { value: 'pdf', label: 'PDF — Rapport formate' },
              ]}
            />
            <SelectField
              label="Frequence d'Export"
              description="A quelle frequence les exportations automatisees sont generees"
              value={exportFrequency}
              onChange={setExportFrequency}
              options={[
                { value: 'daily', label: 'Quotidien' },
                { value: 'weekly', label: 'Hebdomadaire' },
                { value: 'monthly', label: 'Mensuel' },
                { value: 'on-demand', label: 'A la demande uniquement' },
              ]}
            />
            <Toggle
              label="Inclure DMS dans les Exports"
              description="Inclure les Donnees Medicales Sensibles dans les donnees exportees (necessite une autorisation)"
              enabled={includePhi}
              onToggle={() => setIncludePhi(!includePhi)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
