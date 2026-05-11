import { useState } from 'react';
import {
  CalendarPlus,
  Eye,
  CheckCircle2,
  Clock,
  Stethoscope,
} from 'lucide-react';
import { mockPatients } from '../../lib/mock-data';
import RiskBadge from '../../components/shared/RiskBadge';
import type { Patient } from '../../types';

type FollowUpStatus = 'pending' | 'scheduled' | 'completed';

interface FollowUpPatient extends Patient {
  followUpStatus: FollowUpStatus;
  lastUpdated: string;
}

const followUpStatusConfig: Record<FollowUpStatus, { bg: string; text: string; label: string }> = {
  pending: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'En attente' },
  scheduled: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Programme' },
  completed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Termine' },
};

const followUpPatients: FollowUpPatient[] = mockPatients
  .filter((p) => p.risk_level === 'high' || p.risk_level === 'medium')
  .map((p, i) => ({
    ...p,
    followUpStatus: (['pending', 'scheduled', 'completed'] as FollowUpStatus[])[i % 3],
    lastUpdated: p.updated_at,
  }));

export default function FollowUp() {
  const [patients, setPatients] = useState<FollowUpPatient[]>(followUpPatients);
  const [filter, setFilter] = useState<'all' | 'pending' | 'scheduled' | 'completed'>('all');

  const filteredPatients =
    filter === 'all' ? patients : patients.filter((p) => p.followUpStatus === filter);

  const pendingCount = patients.filter((p) => p.followUpStatus === 'pending').length;
  const scheduledCount = patients.filter((p) => p.followUpStatus === 'scheduled').length;
  const completedCount = patients.filter((p) => p.followUpStatus === 'completed').length;

  function handleSchedule(id: string) {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, followUpStatus: 'scheduled' as FollowUpStatus } : p))
    );
  }

  function handleComplete(id: string) {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, followUpStatus: 'completed' as FollowUpStatus } : p))
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Suivi des Patients</h1>
        <p className="mt-1 text-sm text-slate-500">
          Suivre et gerer le suivi des soins pour les patients a risque eleve et moyen
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
        <div
          className={`rounded-xl border p-4 cursor-pointer transition-shadow hover:shadow-md ${
            filter === 'pending'
              ? 'border-amber-200 bg-amber-50'
              : 'border-slate-200 bg-white'
          }`}
          onClick={() => setFilter(filter === 'pending' ? 'all' : 'pending')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">En attente</p>
              <p className="text-2xl font-bold text-slate-900">{pendingCount}</p>
            </div>
          </div>
        </div>
        <div
          className={`rounded-xl border p-4 cursor-pointer transition-shadow hover:shadow-md ${
            filter === 'scheduled'
              ? 'border-blue-200 bg-blue-50'
              : 'border-slate-200 bg-white'
          }`}
          onClick={() => setFilter(filter === 'scheduled' ? 'all' : 'scheduled')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <CalendarPlus className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Programme</p>
              <p className="text-2xl font-bold text-slate-900">{scheduledCount}</p>
            </div>
          </div>
        </div>
        <div
          className={`rounded-xl border p-4 cursor-pointer transition-shadow hover:shadow-md ${
            filter === 'completed'
              ? 'border-green-200 bg-green-50'
              : 'border-slate-200 bg-white'
          }`}
          onClick={() => setFilter(filter === 'completed' ? 'all' : 'completed')}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Termine</p>
              <p className="text-2xl font-bold text-slate-900">{completedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6">
        {(['all', 'pending', 'scheduled', 'completed'] as const).map((tab) => {
          const tabLabels: Record<string, string> = {
            all: 'Tous',
            pending: 'En attente',
            scheduled: 'Programme',
            completed: 'Termine',
          };
          return (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                filter === tab
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tabLabels[tab]}
              {tab === 'all' && (
                <span className="ml-1.5 text-xs opacity-80">({patients.length})</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Patient Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filteredPatients.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
            <p className="text-slate-400 text-sm">Aucun patient ne correspond au filtre selectionne.</p>
          </div>
        ) : (
          filteredPatients.map((patient) => {
            const statusCfg = followUpStatusConfig[patient.followUpStatus];
            return (
              <div
                key={patient.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {patient.photo_url ? (
                      <img
                        src={patient.photo_url}
                        alt={`${patient.first_name} ${patient.last_name}`}
                        className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {patient.first_name[0]}
                        {patient.last_name[0]}
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {patient.first_name} {patient.last_name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {patient.patient_id}
                      </p>
                    </div>
                  </div>
                  <RiskBadge level={patient.risk_level} />
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Stethoscope className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span className="text-slate-600">{patient.department}</span>
                  </div>
                  <div className="text-sm text-slate-600">
                    <span className="font-medium text-slate-700">Diagnostic:</span>{' '}
                    {patient.diagnosis}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Derniere mise a jour: {new Date(patient.lastUpdated).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>

                {/* Follow-up Status */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-slate-500">Statut du Suivi</span>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusCfg.bg} ${statusCfg.text}`}
                  >
                    {statusCfg.label}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  {patient.followUpStatus !== 'scheduled' && patient.followUpStatus !== 'completed' && (
                    <button
                      onClick={() => handleSchedule(patient.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <CalendarPlus className="w-3.5 h-3.5" />
                      Planifier un Suivi
                    </button>
                  )}
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                    Voir Details
                  </button>
                  {patient.followUpStatus !== 'completed' && (
                    <button
                      onClick={() => handleComplete(patient.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors ml-auto"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Marquer Termine
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
