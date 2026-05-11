import { useState, useRef } from 'react';
import {
  Users,
  AlertTriangle,
  TrendingUp,
  Brain,
  Upload,
  FileText,
  X,
  CheckCircle,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import StatCard from '../../components/shared/StatCard';
import RiskBadge from '../../components/shared/RiskBadge';
import {
  mockPatients,
  mockAlerts,
  mockMedicalDocuments,
  readmissionTrendData,
  riskDistributionData,
  riskFactorsData,
} from '../../lib/mock-data';
import type { MedicalDocument } from '../../types';

const highRiskPatients = mockPatients.filter((p) => p.risk_level === 'high');

const unreadAlerts = mockAlerts.filter((a) => !a.is_read).length;

const categoryConfig: Record<string, { bg: string; text: string; label: string }> = {
  resultat: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Resultat' },
  ordonnance: { bg: 'bg-green-100', text: 'text-green-700', label: 'Ordonnance' },
  rapport: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Rapport' },
  imagerie: { bg: 'bg-teal-100', text: 'text-teal-700', label: 'Imagerie' },
  autre: { bg: 'bg-slate-100', text: 'text-slate-700', label: 'Autre' },
};

export default function DoctorDashboard() {
  const [documents, setDocuments] = useState<MedicalDocument[]>(mockMedicalDocuments);
  const [uploading, setUploading] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploadCategory, setUploadCategory] = useState<string>('resultat');
  const [uploadPatient, setUploadPatient] = useState<string>(mockPatients[0].id);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFiles(Array.from(e.target.files));
      setUploadSuccess(false);
    }
  };

  const handleUpload = () => {
    if (uploadFiles.length === 0) return;
    setUploading(true);
    setTimeout(() => {
      const newDocs = uploadFiles.map((file, i) => ({
        id: `doc-${Date.now()}-${i}`,
        patient_id: uploadPatient,
        filename: file.name,
        file_type: file.name.split('.').pop() || 'pdf',
        file_size: `${(file.size / 1024).toFixed(0)} KB`,
        category: uploadCategory as 'resultat' | 'ordonnance' | 'rapport' | 'imagerie' | 'autre',
        uploaded_by: 'Dr. Fatou Diallo',
        uploaded_at: new Date().toISOString(),
      }));
      setDocuments((prev) => [...newDocs, ...prev]);
      setUploadFiles([]);
      setUploading(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }, 1500);
  };

  const removeFile = (index: number) => {
    setUploadFiles((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Tableau de Bord</h1>
        <p className="mt-1 text-sm text-slate-500">
          Predictions de readmission par IA et apercu des risques patients
        </p>
      </div>

      {/* Top Row - Stat Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Patients Analyses"
          value={247}
          subtitle={`${unreadAlerts} alertes non lues`}
          icon={<Users className="w-5 h-5" />}
          trend={{ value: 12, positive: true }}
          color="blue"
        />
        <StatCard
          title="Readmissions Predites"
          value={34}
          subtitle="Dans les 30 jours"
          icon={<AlertTriangle className="w-5 h-5" />}
          trend={{ value: 8, positive: false }}
          color="red"
        />
        <StatCard
          title="Taux de Readmission"
          value="15.3%"
          subtitle="Periode actuelle"
          icon={<TrendingUp className="w-5 h-5" />}
          color="amber"
        />
        <StatCard
          title="Precision du Modele IA"
          value="92.8%"
          subtitle="Modele v2.0"
          icon={<Brain className="w-5 h-5" />}
          trend={{ value: 2.1, positive: true }}
          color="green"
        />
      </div>

      {/* Middle Row - Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 mb-8">
        {/* Readmission Trend Line Chart */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-slate-900">Tendance des Readmissions</h2>
            <p className="text-xs text-slate-500 mt-1">
              Readmissions mensuelles et taux au fil du temps
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={readmissionTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12, fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
                domain={[0, 25]}
                tickFormatter={(v: number) => `${v}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  fontSize: 12,
                }}
                formatter={(value: any, name: any) => {
                  if (name === 'Taux') return [`${value}%`, name];
                  return [value, name];
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, paddingBottom: 16 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="readmissions"
                name="Readmissions"
                stroke="#1e40af"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#1e40af', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6, stroke: '#1e40af', strokeWidth: 2, fill: '#fff' }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="rate"
                name="Taux"
                stroke="#f59e0b"
                strokeWidth={2.5}
                strokeDasharray="5 5"
                dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2, fill: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution Pie Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-slate-900">Distribution des Risques</h2>
            <p className="text-xs text-slate-500 mt-1">
              Repartition actuelle des risques patients
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskDistributionData}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {riskDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  fontSize: 12,
                }}
                formatter={(value: any, name: any) => [value, name]}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row - Table, Risk Factors, and File Upload */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* High-Risk Patients Table */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Patients a Risque Eleve</h2>
              <p className="text-xs text-slate-500 mt-1">
                {highRiskPatients.length} patients necessitant une attention immediate
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              Critique
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Departement
                  </th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Diagnostic
                  </th>
                  <th className="text-center py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Score de Risque
                  </th>
                  <th className="text-center py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Niveau
                  </th>
                  <th className="text-left py-3 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Sortie Prevue
                  </th>
                </tr>
              </thead>
              <tbody>
                {highRiskPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={patient.photo_url}
                          alt={`${patient.first_name} ${patient.last_name}`}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="font-medium text-slate-900">
                          {patient.first_name} {patient.last_name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-600 font-mono text-xs">
                      {patient.patient_id}
                    </td>
                    <td className="py-3 px-3 text-slate-600">{patient.department}</td>
                    <td className="py-3 px-3 text-slate-600 max-w-[180px] truncate">
                      {patient.diagnosis}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-red-50 text-red-700 font-bold text-sm">
                        {patient.risk_score}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <RiskBadge level={patient.risk_level} />
                    </td>
                    <td className="py-3 px-3 text-slate-600 text-xs">
                      {new Date(patient.predicted_discharge_date).toLocaleDateString('fr-FR', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Risk Factors + File Upload */}
        <div className="lg:col-span-2 space-y-6">
          {/* Risk Factors Horizontal Bar Chart */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-base font-semibold text-slate-900">Facteurs de Risque Principaux</h2>
              <p className="text-xs text-slate-500 mt-1">
                Poids des caracteristiques dans le modele de readmission
              </p>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={riskFactorsData}
                layout="vertical"
                margin={{ top: 0, right: 20, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, 0.35]}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickFormatter={(v: number) => `${(v * 100).toFixed(0)}%`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#475569' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                  width={120}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    fontSize: 12,
                  }}
                  formatter={(value: any) => [`${(value * 100).toFixed(1)}%`, 'Poids']}
                />
                <Bar
                  dataKey="weight"
                  fill="#1e40af"
                  radius={[0, 6, 6, 0]}
                  barSize={18}
                >
                  {riskFactorsData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0
                          ? '#1e40af'
                          : index === 1
                          ? '#1d4ed8'
                          : index === 2
                          ? '#2563eb'
                          : index === 3
                          ? '#3b82f6'
                          : index === 4
                          ? '#60a5fa'
                          : '#93bbfd'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* File Upload Panel */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="mb-4">
              <h2 className="text-base font-semibold text-slate-900">Envoyer un Document</h2>
              <p className="text-xs text-slate-500 mt-1">Telechargez des fichiers pour un patient</p>
            </div>

            {uploadSuccess && (
              <div className="mb-4 flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-sm font-medium text-green-700">Fichiers envoyes avec succes</span>
              </div>
            )}

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">Patient</label>
                  <select
                    value={uploadPatient}
                    onChange={(e) => setUploadPatient(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  >
                    {mockPatients.map((p) => (
                      <option key={p.id} value={p.id}>{p.first_name} {p.last_name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">Categorie</label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  >
                    <option value="resultat">Resultat</option>
                    <option value="ordonnance">Ordonnance</option>
                    <option value="rapport">Rapport</option>
                    <option value="imagerie">Imagerie</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
              </div>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center cursor-pointer hover:border-blue-300 hover:bg-blue-50/50 transition-all"
              >
                <Upload size={20} className="mx-auto mb-1.5 text-slate-400" />
                <p className="text-xs font-medium text-slate-700">Cliquez pour selectionner</p>
                <p className="text-[10px] text-slate-400 mt-0.5">PDF, JPG, PNG, DICOM</p>
                <input ref={fileInputRef} type="file" multiple onChange={handleFileSelect} className="hidden" />
              </div>

              {uploadFiles.length > 0 && (
                <div className="space-y-2">
                  {uploadFiles.map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText size={14} className="text-blue-500 flex-shrink-0" />
                        <span className="text-xs font-medium text-slate-900 truncate">{file.name}</span>
                        <span className="text-[10px] text-slate-400 flex-shrink-0">({(file.size / 1024).toFixed(0)} KB)</span>
                      </div>
                      <button onClick={() => removeFile(i)} className="p-1 rounded hover:bg-red-100 text-slate-400 hover:text-red-500 flex-shrink-0">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {uploading ? (
                      <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Envoi en cours...</>
                    ) : (
                      <><Upload size={14} /> Envoyer les fichiers</>
                    )}
                  </button>
                </div>
              )}

              {/* Recent Documents */}
              {documents.length > 0 && (
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-[10px] font-semibold text-slate-500 uppercase mb-2">Derniers documents</p>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto">
                    {documents.slice(0, 4).map((doc) => {
                      const config = categoryConfig[doc.category] || categoryConfig.autre;
                      return (
                        <div key={doc.id} className="flex items-center gap-2 p-1.5 rounded bg-slate-50">
                          <FileText size={12} className={config.text} />
                          <span className="text-[10px] text-slate-700 truncate flex-1">{doc.filename}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-medium ${config.bg} ${config.text}`}>{config.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
