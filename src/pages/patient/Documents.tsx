import { useState, useRef } from 'react';
import { Upload, FileText, X, Download, Eye } from 'lucide-react';
import { mockMedicalDocuments } from '../../lib/mock-data';

const categoryConfig = {
  resultat: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Resultat' },
  ordonnance: { bg: 'bg-green-100', text: 'text-green-700', label: 'Ordonnance' },
  rapport: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Rapport' },
  imagerie: { bg: 'bg-teal-100', text: 'text-teal-700', label: 'Imagerie' },
  autre: { bg: 'bg-slate-100', text: 'text-slate-700', label: 'Autre' },
};

export default function PatientDocuments() {
  const [documents, setDocuments] = useState(mockMedicalDocuments);
  const [uploading, setUploading] = useState(false);
  const [uploadCategory, setUploadCategory] = useState<string>('resultat');
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setUploadedFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = () => {
    if (uploadedFiles.length === 0) return;
    setUploading(true);
    setTimeout(() => {
      const newDocs = uploadedFiles.map((file, i) => ({
        id: `new-${Date.now()}-${i}`,
        patient_id: 'p1',
        filename: file.name,
        file_type: file.name.split('.').pop() || 'pdf',
        file_size: `${(file.size / 1024).toFixed(0)} KB`,
        category: uploadCategory as 'resultat' | 'ordonnance' | 'rapport' | 'imagerie' | 'autre',
        uploaded_by: 'Ousmane Diop',
        uploaded_at: new Date().toISOString(),
      }));
      setDocuments((prev) => [...newDocs, ...prev]);
      setUploadedFiles([]);
      setUploading(false);
    }, 1500);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Documents Medicaux</h1>
        <p className="mt-1 text-sm text-slate-500">Telechargez et consultez vos documents medicaux</p>
      </div>

      {/* Upload Zone */}
      <div className="mb-8 bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Telecharger un document</h2>

        <div className="mb-4">
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">Categorie du document</label>
          <select
            value={uploadCategory}
            onChange={(e) => setUploadCategory(e.target.value)}
            className="w-full sm:w-64 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          >
            <option value="resultat">Resultat d'examen</option>
            <option value="ordonnance">Ordonnance</option>
            <option value="rapport">Rapport medical</option>
            <option value="imagerie">Imagerie</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        {/* Drag & Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-blue-400 bg-blue-50'
              : 'border-slate-300 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/50'
          }`}
        >
          <Upload size={32} className={`mx-auto mb-3 ${dragActive ? 'text-blue-500' : 'text-slate-400'}`} />
          <p className="text-sm font-medium text-slate-700">
            Glissez-deposez vos fichiers ici
          </p>
          <p className="text-xs text-slate-500 mt-1">
            ou cliquez pour selectionner des fichiers
          </p>
          <p className="text-[10px] text-slate-400 mt-2">PDF, JPG, PNG, DICOM - Max 25 MB</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png,.dcm"
          />
        </div>

        {/* Selected Files */}
        {uploadedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-slate-700">Fichiers selectionnes:</p>
            {uploadedFiles.map((file, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">{file.name}</p>
                    <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(0)} KB</p>
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                  className="p-1 rounded hover:bg-red-100 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Upload size={16} />
                  Envoyer les fichiers
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-slate-900">Mes Documents</h2>
          <p className="text-xs text-slate-500 mt-1">{documents.length} document(s)</p>
        </div>
        <div className="space-y-3">
          {documents.map((doc) => {
            const config = categoryConfig[doc.category as keyof typeof categoryConfig];
            return (
              <div key={doc.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 hover:bg-blue-50 transition-colors">
                <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center flex-shrink-0`}>
                  <FileText size={18} className={config.text} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">{doc.filename}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${config.bg} ${config.text}`}>{config.label}</span>
                    <span className="text-xs text-slate-400">{doc.file_size}</span>
                    <span className="text-xs text-slate-400">
                      {new Date(doc.uploaded_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button className="p-1.5 rounded-lg hover:bg-white text-slate-400 hover:text-blue-600 transition-colors">
                    <Eye size={14} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-white text-slate-400 hover:text-green-600 transition-colors">
                    <Download size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
