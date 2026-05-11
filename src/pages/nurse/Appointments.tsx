import { useState } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle,
  RotateCcw,
  XCircle,
  Filter,
  StickyNote,
} from 'lucide-react';
import { mockAppointments, mockPatients } from '../../lib/mock-data';
import StatusBadge from '../../components/shared/StatusBadge';

type FilterStatus = 'all' | 'scheduled' | 'completed' | 'cancelled';

export default function Appointments() {
  const [filter, setFilter] = useState<FilterStatus>('all');

  const todayAppointments = mockAppointments
    .filter((a) => a.scheduled_date === '2025-05-09')
    .filter((a) => filter === 'all' || a.status === filter)
    .sort((a, b) => a.scheduled_time.localeCompare(b.scheduled_time));

  const getPatientName = (patientId: string) => {
    const patient = mockPatients.find((p) => p.id === patientId);
    return patient ? `${patient.first_name} ${patient.last_name}` : 'Inconnu';
  };

  const getPatientRoom = (patientId: string) => {
    const patient = mockPatients.find((p) => p.id === patientId);
    return patient?.room_number || '';
  };

  const filters: { label: string; value: FilterStatus; count: number }[] = [
    { label: 'Tous', value: 'all', count: mockAppointments.filter((a) => a.scheduled_date === '2025-05-09').length },
    { label: 'Programme', value: 'scheduled', count: mockAppointments.filter((a) => a.scheduled_date === '2025-05-09' && a.status === 'scheduled').length },
    { label: 'Termine', value: 'completed', count: mockAppointments.filter((a) => a.scheduled_date === '2025-05-09' && a.status === 'completed').length },
    { label: 'Annule', value: 'cancelled', count: mockAppointments.filter((a) => a.scheduled_date === '2025-05-09' && a.status === 'cancelled').length },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Suivi des Rendez-vous</h1>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Calendar className="w-4 h-4" />
          9 mai 2025
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-slate-400" />
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f.value
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {f.label}
            <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
              filter === f.value ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">Programme du Jour</h2>
        </div>
        <div className="p-6">
          {todayAppointments.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Aucun rendez-vous ne correspond au filtre actuel.</p>
            </div>
          ) : (
            <div className="relative">
              {todayAppointments.map((apt, index) => {
                const isCompleted = apt.status === 'completed';
                const isCancelled = apt.status === 'cancelled';
                return (
                  <div key={apt.id} className="flex gap-4 pb-8 last:pb-0">
                    {/* Timeline Line & Dot */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        isCompleted
                          ? 'bg-green-500 border-green-500'
                          : isCancelled
                          ? 'bg-slate-300 border-slate-300'
                          : 'bg-white border-blue-400'
                      }`}>
                        {isCompleted && <CheckCircle className="w-3 h-3 text-white" />}
                      </div>
                      {index < todayAppointments.length - 1 && (
                        <div className="w-0.5 flex-1 bg-slate-200 mt-1" />
                      )}
                    </div>

                    {/* Card Content */}
                    <div className={`flex-1 -mt-1 rounded-xl border p-5 transition-all ${
                      isCancelled
                        ? 'bg-slate-50 border-slate-200 opacity-60'
                        : isCompleted
                        ? 'bg-green-50/50 border-green-200'
                        : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex flex-col items-center bg-blue-50 rounded-lg px-4 py-2.5 min-w-[70px]">
                            <Clock className="w-4 h-4 text-blue-400 mb-1" />
                            <span className="text-base font-bold text-blue-800">{apt.scheduled_time}</span>
                          </div>
                          <div>
                            <p className="text-base font-semibold text-slate-900">{getPatientName(apt.patient_id)}</p>
                            <p className="text-sm text-slate-500 mt-0.5">
                              {apt.appointment_type}
                              {getPatientRoom(apt.patient_id) && (
                                <span className="ml-2 text-slate-400">Chambre {getPatientRoom(apt.patient_id)}</span>
                              )}
                            </p>
                            {apt.notes && (
                              <div className="flex items-start gap-1.5 mt-2 text-xs text-slate-500">
                                <StickyNote className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                {apt.notes}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <StatusBadge status={apt.status} />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {!isCancelled && (
                        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-semibold hover:bg-green-100 transition-colors">
                            <CheckCircle className="w-3.5 h-3.5" />
                            Terminer
                          </button>
                          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-semibold hover:bg-amber-100 transition-colors">
                            <RotateCcw className="w-3.5 h-3.5" />
                            Replanifier
                          </button>
                          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-100 transition-colors">
                            <XCircle className="w-3.5 h-3.5" />
                            Annuler
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
