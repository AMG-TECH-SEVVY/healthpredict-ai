import { User, Mail, Phone, Heart, Shield, AlertTriangle, MapPin, Calendar, Droplets } from 'lucide-react';
import { currentPatient } from '../../lib/mock-data';

export default function PatientProfile() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Mon Profil</h1>
        <p className="mt-1 text-sm text-slate-500">Vos informations personnelles et medicales</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <User size={32} className="text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">{currentPatient.first_name} {currentPatient.last_name}</h2>
            <p className="text-sm text-slate-500 mt-1">Patient ID: {currentPatient.patient_id}</p>
            <p className="text-xs text-blue-600 font-medium mt-2">{currentPatient.department}</p>
          </div>

          <div className="space-y-3">
            <ProfileItem icon={<Mail size={16} />} label="Email" value={currentPatient.email} />
            <ProfileItem icon={<Phone size={16} />} label="Telephone" value={currentPatient.phone} />
            <ProfileItem icon={<Calendar size={16} />} label="Age" value={`${currentPatient.age} ans`} />
            <ProfileItem icon={<User size={16} />} label="Sexe" value={currentPatient.gender} />
            <ProfileItem icon={<MapPin size={16} />} label="Chambre" value={currentPatient.room_number} />
          </div>
        </div>

        {/* Medical Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vital Medical Info */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-5">Informations Medicales</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <Heart size={16} className="text-blue-600" />
                  <span className="text-xs font-medium text-blue-600">Groupe Sanguin</span>
                </div>
                <p className="text-2xl font-bold text-blue-700">{currentPatient.blood_type}</p>
              </div>
              <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={16} className="text-red-600" />
                  <span className="text-xs font-medium text-red-600">Allergies</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {currentPatient.allergies.map((allergy) => (
                    <span key={allergy} className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                <div className="flex items-center gap-2 mb-2">
                  <Shield size={16} className="text-amber-600" />
                  <span className="text-xs font-medium text-amber-600">Diagnostic Principal</span>
                </div>
                <p className="text-sm font-semibold text-amber-800">{currentPatient.diagnosis}</p>
              </div>
              <div className="p-4 rounded-xl bg-teal-50 border border-teal-100">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets size={16} className="text-teal-600" />
                  <span className="text-xs font-medium text-teal-600">Medecin Traitant</span>
                </div>
                <p className="text-sm font-semibold text-teal-800">{currentPatient.attending_doctor}</p>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-4">Contact d'Urgence</h2>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-sm font-medium text-slate-900">{currentPatient.emergency_contact.split(' - ')[0]}</p>
              <p className="text-sm text-slate-600 mt-1">{currentPatient.emergency_contact.split(' - ')[1]}</p>
            </div>
          </div>

          {/* Hospitalization Info */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-4">Hospitalisation Actuelle</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-slate-500 font-medium">Date d'admission</p>
                <p className="text-sm font-semibold text-slate-900 mt-1">
                  {new Date(currentPatient.admission_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Service</p>
                <p className="text-sm font-semibold text-slate-900 mt-1">{currentPatient.department}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Chambre</p>
                <p className="text-sm font-semibold text-slate-900 mt-1">{currentPatient.room_number}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
      <span className="text-slate-400">{icon}</span>
      <div>
        <p className="text-[10px] text-slate-400 font-medium uppercase">{label}</p>
        <p className="text-sm text-slate-900">{value}</p>
      </div>
    </div>
  );
}
