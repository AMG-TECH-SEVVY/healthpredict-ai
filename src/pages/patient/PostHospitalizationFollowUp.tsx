import { useState } from 'react';
import { ClipboardCheck, Save, CheckCircle, AlertCircle } from 'lucide-react';

const followUpQuestions = [
  { id: 'q1', question: 'Avez-vous pris tous vos medicaments aujourd\'hui ?', category: 'Traitement' },
  { id: 'q2', question: 'Avez-vous respecte votre regime alimentaire ?', category: 'Alimentation' },
  { id: 'q3', question: 'Avez-vous fait votre exercice ou kinesitherapie ?', category: 'Activite' },
  { id: 'q4', question: 'Avez-vous mesure votre poids ce matin ?', category: 'Surveillance' },
  { id: 'q5', question: 'Avez-vous mesure votre tension arterielle ?', category: 'Surveillance' },
  { id: 'q6', question: 'Avez-vous ressenti des douleurs ?', category: 'Symptomes' },
  { id: 'q7', question: 'Avez-vous eu des essoufflements ?', category: 'Symptomes' },
  { id: 'q8', question: 'Avez-vous bien dormi la nuit derniere ?', category: 'Bien-etre' },
  { id: 'q9', question: 'Avez-vous eu des vertiges ou etourdissements ?', category: 'Symptomes' },
  { id: 'q10', question: 'Vous sentez-vous globalement en bonne sante aujourd\'hui ?', category: 'Bien-etre' },
];

export default function PostHospitalizationFollowUp() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>(
    Object.fromEntries(followUpQuestions.map((q) => [q.id, null]))
  );
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.values(answers).filter((a) => a !== null).length;
  const progress = Math.round((answeredCount / followUpQuestions.length) * 100);

  const handleAnswer = (id: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const categories = [...new Set(followUpQuestions.map((q) => q.category))];

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Suivi Post-Hospitalisation</h1>
        <p className="mt-1 text-sm text-slate-500">Formulaire de suivi quotidien de votre etat de sante</p>
      </div>

      {submitted ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Formulaire Envoye</h2>
          <p className="text-sm text-slate-500 mb-6">
            Votre suivi quotidien a ete enregistre. L'equipe medicale sera notifiee.
          </p>
          <button
            onClick={() => { setSubmitted(false); setAnswers(Object.fromEntries(followUpQuestions.map((q) => [q.id, null]))); setAdditionalNotes(''); }}
            className="px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Remplir un nouveau formulaire
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Progress */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ClipboardCheck size={18} className="text-blue-600" />
                <span className="text-sm font-semibold text-slate-900">Progression</span>
              </div>
              <span className="text-sm font-bold text-blue-600">{progress}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-slate-500 mt-2">{answeredCount}/{followUpQuestions.length} questions repondues</p>
          </div>

          {/* Questions by Category */}
          {categories.map((category) => (
            <div key={category} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
              <h2 className="text-base font-semibold text-slate-900 mb-4">{category}</h2>
              <div className="space-y-4">
                {followUpQuestions.filter((q) => q.category === category).map((q) => (
                  <div key={q.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 rounded-lg bg-slate-50">
                    <p className="text-sm text-slate-700">{q.question}</p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleAnswer(q.id, true)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          answers[q.id] === true
                            ? 'bg-green-100 text-green-700 border border-green-300'
                            : 'bg-white border border-slate-200 text-slate-500 hover:bg-green-50'
                        }`}
                      >
                        <CheckCircle size={14} /> Oui
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAnswer(q.id, false)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          answers[q.id] === false
                            ? 'bg-red-100 text-red-700 border border-red-300'
                            : 'bg-white border border-slate-200 text-slate-500 hover:bg-red-50'
                        }`}
                      >
                        <AlertCircle size={14} /> Non
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Additional Notes */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">Notes supplementaires</label>
            <textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Ajoutez des informations supplementaires sur votre etat..."
              rows={4}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={answeredCount < followUpQuestions.length}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <Save size={16} />
            Envoyer le formulaire
          </button>
        </form>
      )}
    </div>
  );
}
