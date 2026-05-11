import { useState } from 'react';
import { AlertTriangle, Send, Clock, Frown, Meh, Smile } from 'lucide-react';
import { mockSymptoms } from '../../lib/mock-data';

const symptomOptions = [
  'Fatigue', 'Essoufflement', 'Douleur thoracique', 'Vertiges',
  'Nausees', 'Maux de tete', 'Gonflement des jambes', 'Toux',
  'Palpitations', 'Sueurs nocturnes', 'Fievre', 'Perte d\'appetit',
  'Confusion', 'Douleur abdominale', 'Douleur articulaire',
];

const severityConfig = {
  legere: { icon: <Smile size={20} />, bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', label: 'Legere' },
  moderee: { icon: <Meh size={20} />, bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300', label: 'Moderee' },
  severe: { icon: <Frown size={20} />, bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', label: 'Severe' },
};

export default function SymptomReport() {
  const [symptoms, setSymptoms] = useState(mockSymptoms);
  const [showForm, setShowForm] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState<'legere' | 'moderee' | 'severe'>('legere');
  const [notes, setNotes] = useState('');

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSymptoms.length === 0) return;
    const newEntry = {
      id: `s-${Date.now()}`,
      patient_id: 'p1',
      symptoms: selectedSymptoms,
      severity,
      notes,
      reported_at: new Date().toISOString(),
    };
    setSymptoms([newEntry, ...symptoms]);
    setSelectedSymptoms([]);
    setSeverity('legere');
    setNotes('');
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Signaler un Symptome</h1>
          <p className="mt-1 text-sm text-slate-500">Signalez vos symptomes pour un suivi medical optimal</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          <AlertTriangle size={16} />
          {showForm ? 'Annuler' : 'Nouveau Signalement'}
        </button>
      </div>

      {/* Report Form */}
      {showForm && (
        <div className="mb-8 bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-5">Decrivez vos symptomes</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Symptom Selection */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-3 block">Selectionnez vos symptomes</label>
              <div className="flex flex-wrap gap-2">
                {symptomOptions.map((symptom) => (
                  <button
                    key={symptom}
                    type="button"
                    onClick={() => toggleSymptom(symptom)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedSymptoms.includes(symptom)
                        ? 'bg-blue-100 text-blue-700 border border-blue-300'
                        : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>

            {/* Severity */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-3 block">Niveau de severite</label>
              <div className="flex gap-3">
                {(['legere', 'moderee', 'severe'] as const).map((sev) => {
                  const config = severityConfig[sev];
                  return (
                    <button
                      key={sev}
                      type="button"
                      onClick={() => setSeverity(sev)}
                      className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        severity === sev ? `${config.bg} ${config.border}` : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className={severity === sev ? config.text : 'text-slate-400'}>{config.icon}</span>
                      <span className={`text-xs font-semibold ${severity === sev ? config.text : 'text-slate-500'}`}>{config.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Notes supplementaires</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Decrivez vos symptomes plus en detail..."
                rows={3}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={selectedSymptoms.length === 0}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
              Envoyer le signalement
            </button>
          </form>
        </div>
      )}

      {/* Symptom History */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">Historique des Signalements</h2>
          <p className="text-xs text-slate-500 mt-1">Vos signalements de symptomes</p>
        </div>
        <div className="space-y-3">
          {symptoms.map((entry) => {
            const config = severityConfig[entry.severity];
            return (
              <div key={entry.id} className={`p-4 rounded-xl border ${config.bg} ${config.border}`}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={config.text}>{config.icon}</span>
                    <span className={`text-xs font-semibold ${config.text}`}>{config.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock size={12} />
                    {new Date(entry.reported_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {entry.symptoms.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/70 text-slate-700">{s}</span>
                  ))}
                </div>
                {entry.notes && <p className="text-xs text-slate-600 mt-1">{entry.notes}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
