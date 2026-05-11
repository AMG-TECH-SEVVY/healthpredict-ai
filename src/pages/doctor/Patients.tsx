import { useState, useMemo, useRef } from 'react';
import { Search, Filter, UserPlus, Eye, Pencil, ChevronLeft, ChevronRight, Upload, X, FileText, Download } from 'lucide-react';
import { mockPatients, mockMedicalDocuments } from '../../lib/mock-data';
import RiskBadge from '../../components/shared/RiskBadge';
import StatusBadge from '../../components/shared/StatusBadge';
import type { Patient, MedicalDocument } from '../../types';

const ITEMS_PER_PAGE = 8;

type RiskFilter = 'all' | 'high' | 'medium' | 'low';

function getInitials(patient: Patient): string {
  return `${patient.first_name[0]}${patient.last_name[0]}`;
}

function getRiskBarColor(level: Patient['risk_level']): string {
  switch (level) {
    case 'high':
      return 'bg-red-500';
    case 'medium':
      return 'bg-amber-500';
    case 'low':
      return 'bg-green-500';
  }
}

function getRiskTrackColor(level: Patient['risk_level']): string {
  switch (level) {
    case 'high':
      return 'bg-red-100';
    case 'medium':
      return 'bg-amber-100';
    case 'low':
      return 'bg-green-100';
  }
}

export default function PatientManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<RiskFilter>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patientDocs, setPatientDocs] = useState<MedicalDocument[]>(mockMedicalDocuments);
  const [uploading, setUploading] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploadCategory, setUploadCategory] = useState<string>('resultat');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = () => {
    if (uploadFiles.length === 0) return;
    setUploading(true);
    setTimeout(() => {
      const newDocs = uploadFiles.map((file, i) => ({
        id: `doc-${Date.now()}-${i}`,
        patient_id: selectedPatient?.id || 'p1',
        filename: file.name,
        file_type: file.name.split('.').pop() || 'pdf',
        file_size: `${(file.size / 1024).toFixed(0)} KB`,
        category: uploadCategory as 'resultat' | 'ordonnance' | 'rapport' | 'imagerie' | 'autre',
        uploaded_by: 'Dr. Fatou Diallo',
        uploaded_at: new Date().toISOString(),
      }));
      setPatientDocs((prev) => [...newDocs, ...prev]);
      setUploadFiles([]);
      setUploading(false);
    }, 1500);
  };

  const removeFile = (index: number) => {
    setUploadFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const categoryConfig: Record<string, { bg: string; text: string; label: string }> = {
    resultat: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Resultat' },
    ordonnance: { bg: 'bg-green-100', text: 'text-green-700', label: 'Ordonnance' },
    rapport: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Rapport' },
    imagerie: { bg: 'bg-teal-100', text: 'text-teal-700', label: 'Imagerie' },
    autre: { bg: 'bg-slate-100', text: 'text-slate-700', label: 'Autre' },
  };

  const filteredPatients = useMemo(() => {
    let result = mockPatients;

    if (riskFilter !== 'all') {
      result = result.filter((p) => p.risk_level === riskFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          `${p.first_name} ${p.last_name}`.toLowerCase().includes(query) ||
          p.patient_id.toLowerCase().includes(query)
      );
    }

    return result;
  }, [searchQuery, riskFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredPatients.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedPatients = useMemo(() => {
    const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredPatients.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPatients, safeCurrentPage]);

  const showingStart = filteredPatients.length === 0 ? 0 : (safeCurrentPage - 1) * ITEMS_PER_PAGE + 1;
  const showingEnd = Math.min(safeCurrentPage * ITEMS_PER_PAGE, filteredPatients.length);

  function handleRiskFilterChange(value: string) {
    setRiskFilter(value as RiskFilter);
    setCurrentPage(1);
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    setCurrentPage(1);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Gestion des Patients</h1>
        <p className="mt-1 text-sm text-slate-500">
          Gerer et surveiller tous les dossiers patients
        </p>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher par nom ou ID patient..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors bg-slate-50 placeholder:text-slate-400"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative w-full sm:w-auto">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                value={riskFilter}
                onChange={(e) => handleRiskFilterChange(e.target.value)}
                className="w-full sm:w-44 pl-10 pr-8 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors bg-slate-50 text-slate-700 appearance-none cursor-pointer"
              >
                <option value="all">Tous</option>
                <option value="high">Risque Eleve</option>
                <option value="medium">Risque Moyen</option>
                <option value="low">Risque Faible</option>
              </select>
            </div>
          </div>

          {/* Add Patient Button */}
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors shadow-sm whitespace-nowrap">
            <UserPlus className="w-4 h-4" />
            Ajouter un Patient
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  ID Patient
                </th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Departement
                </th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Diagnostic
                </th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Score de Risque
                </th>
                <th className="text-center py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Niveau de Risque
                </th>
                <th className="text-left py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Sortie Prevue
                </th>
                <th className="text-center py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="text-center py-3.5 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedPatients.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400 text-sm">
                    Aucun patient ne correspond a vos criteres.
                  </td>
                </tr>
              ) : (
                paginatedPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-b border-slate-50 hover:bg-slate-50/70 transition-colors"
                  >
                    {/* Patient - Photo + Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {patient.photo_url ? (
                          <img
                            src={patient.photo_url}
                            alt={`${patient.first_name} ${patient.last_name}`}
                            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {getInitials(patient)}
                          </div>
                        )}
                        <span className="font-medium text-slate-900 whitespace-nowrap">
                          {patient.first_name} {patient.last_name}
                        </span>
                      </div>
                    </td>

                    {/* Patient ID */}
                    <td className="py-3 px-4 text-slate-600 font-mono text-xs">
                      {patient.patient_id}
                    </td>

                    {/* Age */}
                    <td className="py-3 px-4 text-slate-600">
                      {patient.age}
                    </td>

                    {/* Department */}
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                      {patient.department}
                    </td>

                    {/* Diagnosis */}
                    <td className="py-3 px-4 text-slate-600 max-w-[200px] truncate">
                      {patient.diagnosis}
                    </td>

                    {/* Risk Score - Colored Progress Bar */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <div className={`flex-1 h-2 rounded-full ${getRiskTrackColor(patient.risk_level)}`}>
                          <div
                            className={`h-2 rounded-full ${getRiskBarColor(patient.risk_level)} transition-all`}
                            style={{ width: `${patient.risk_score}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-600 w-7 text-right">
                          {patient.risk_score}
                        </span>
                      </div>
                    </td>

                    {/* Risk Level */}
                    <td className="py-3 px-4 text-center">
                      <RiskBadge level={patient.risk_level} />
                    </td>

                    {/* Predicted Discharge */}
                    <td className="py-3 px-4 text-slate-600 text-xs whitespace-nowrap">
                      {new Date(patient.predicted_discharge_date).toLocaleDateString('fr-FR', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 text-center">
                      <StatusBadge status={patient.status} />
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => setSelectedPatient(patient)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                          title="Voir"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Voir
                        </button>
                        <button
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors"
                          title="Modifier"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          Modifier
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3.5 border-t border-slate-100 bg-slate-50/40">
          <p className="text-xs text-slate-500">
            Affichage <span className="font-semibold text-slate-700">{showingStart}</span> a{' '}
            <span className="font-semibold text-slate-700">{showingEnd}</span> sur{' '}
            <span className="font-semibold text-slate-700">{filteredPatients.length}</span> patients
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safeCurrentPage === 1}
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-white hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Page precedente"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                  page === safeCurrentPage
                    ? 'bg-blue-600 text-white border border-blue-600'
                    : 'border border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage === totalPages}
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 text-slate-500 hover:bg-white hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Page suivante"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Patient Detail Modal with File Upload */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedPatient(null)}>
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{selectedPatient.first_name} {selectedPatient.last_name}</h2>
                <p className="text-xs text-slate-500">{selectedPatient.patient_id} - {selectedPatient.department}</p>
              </div>
              <button onClick={() => setSelectedPatient(null)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Patient Info */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-slate-50">
                  <p className="text-[10px] text-slate-500 font-medium uppercase">Age</p>
                  <p className="text-sm font-bold text-slate-900">{selectedPatient.age} ans</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50">
                  <p className="text-[10px] text-slate-500 font-medium uppercase">Diagnostic</p>
                  <p className="text-sm font-bold text-slate-900 truncate">{selectedPatient.diagnosis}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50">
                  <p className="text-[10px] text-slate-500 font-medium uppercase">Risque</p>
                  <p className="text-sm font-bold text-slate-900">{selectedPatient.risk_score}/100</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50">
                  <p className="text-[10px] text-slate-500 font-medium uppercase">Statut</p>
                  <StatusBadge status={selectedPatient.status} />
                </div>
              </div>

              {/* File Upload Section */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Envoyer des documents au patient</h3>
                <div className="mb-3">
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full sm:w-48 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  >
                    <option value="resultat">Resultat</option>
                    <option value="ordonnance">Ordonnance</option>
                    <option value="rapport">Rapport</option>
                    <option value="imagerie">Imagerie</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-300 hover:bg-blue-50/50 transition-all"
                >
                  <Upload size={24} className="mx-auto mb-2 text-slate-400" />
                  <p className="text-sm font-medium text-slate-700">Cliquez pour selectionner des fichiers</p>
                  <p className="text-xs text-slate-400 mt-1">PDF, JPG, PNG, DICOM</p>
                  <input ref={fileInputRef} type="file" multiple onChange={handleFileSelect} className="hidden" />
                </div>

                {uploadFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {uploadFiles.map((file, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                        <div className="flex items-center gap-2">
                          <FileText size={14} className="text-blue-500" />
                          <span className="text-xs font-medium text-slate-900">{file.name}</span>
                          <span className="text-[10px] text-slate-400">({(file.size / 1024).toFixed(0)} KB)</span>
                        </div>
                        <button onClick={() => removeFile(i)} className="p-1 rounded hover:bg-red-100 text-slate-400 hover:text-red-500">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={handleUpload}
                      disabled={uploading}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {uploading ? (
                        <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Envoi...</>
                      ) : (
                        <><Upload size={14} /> Envoyer</>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Existing Documents */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Documents du patient</h3>
                <div className="space-y-2">
                  {patientDocs.map((doc) => {
                    const config = categoryConfig[doc.category] || categoryConfig.autre;
                    return (
                      <div key={doc.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-blue-50 transition-colors">
                        <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                          <FileText size={14} className={config.text} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-900 truncate">{doc.filename}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${config.bg} ${config.text}`}>{config.label}</span>
                            <span className="text-[10px] text-slate-400">{doc.file_size}</span>
                          </div>
                        </div>
                        <button className="p-1.5 rounded-lg hover:bg-white text-slate-400 hover:text-green-600 transition-colors">
                          <Download size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
