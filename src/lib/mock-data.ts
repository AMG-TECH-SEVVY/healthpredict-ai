import type { Patient, Vital, Appointment, Alert, ActivityLog, Medication, AIPrediction, ImportedDataset, Profile, PatientVitalEntry, HospitalizationRecord, MedicalDocument, PatientNotification, TreatmentEntry, SymptomEntry, Message, HealthTip } from '../types';

const pexelsBase = 'https://images.pexels.com/photos';

export const mockProfiles: Profile[] = [
  { id: '1', full_name: 'Dr. Fatou Diallo', email: 'fatou.diallo@hopital.sn', role: 'doctor', department: 'Cardiologie', avatar_url: `${pexelsBase}/5214949/pexels-photo-5214949.jpeg?auto=compress&cs=tinysrgb&w=80`, phone: '+221 77 123 45 67', created_at: '2025-01-15', updated_at: '2025-01-15' },
  { id: '2', full_name: 'Aminata Ndiaye', email: 'aminata.ndiaye@hopital.sn', role: 'nurse', department: 'Urgences', avatar_url: `${pexelsBase}/5214950/pexels-photo-5214950.jpeg?auto=compress&cs=tinysrgb&w=80`, phone: '+221 76 234 56 78', created_at: '2025-02-01', updated_at: '2025-02-01' },
  { id: '3', full_name: 'Mamadou Sow', email: 'mamadou.sow@hopital.sn', role: 'admin', department: 'Administration', avatar_url: `${pexelsBase}/5214951/pexels-photo-5214951.jpeg?auto=compress&cs=tinysrgb&w=80`, phone: '+221 78 345 67 89', created_at: '2025-01-10', updated_at: '2025-01-10' },
  { id: '4', full_name: 'Dr. Khady Ba', email: 'khady.ba@hopital.sn', role: 'analyst', department: 'Science des Donnees', avatar_url: `${pexelsBase}/5214952/pexels-photo-5214952.jpeg?auto=compress&cs=tinysrgb&w=80`, phone: '+221 77 456 78 90', created_at: '2025-03-01', updated_at: '2025-03-01' },
];

export const mockPatients: Patient[] = [
  { id: 'p1', patient_id: 'PT-2025-001', first_name: 'Ousmane', last_name: 'Diop', age: 72, gender: 'Homme', department: 'Cardiologie', diagnosis: 'Insuffisance Cardiaque Congestive', admission_date: '2025-04-20', predicted_discharge_date: '2025-05-15', risk_score: 87, risk_level: 'high', room_number: '301-A', attending_doctor_id: '1', status: 'critical', photo_url: `${pexelsBase}/5214949/pexels-photo-5214949.jpeg?auto=compress&cs=tinysrgb&w=60`, created_at: '2025-04-20', updated_at: '2025-05-01' },
  { id: 'p2', patient_id: 'PT-2025-002', first_name: 'Mariama', last_name: 'Fall', age: 65, gender: 'Femme', department: 'Pneumologie', diagnosis: 'Exacerbation BPCO', admission_date: '2025-04-25', predicted_discharge_date: '2025-05-20', risk_score: 72, risk_level: 'high', room_number: '205-B', attending_doctor_id: '1', status: 'admitted', photo_url: `${pexelsBase}/5214950/pexels-photo-5214950.jpeg?auto=compress&cs=tinysrgb&w=60`, created_at: '2025-04-25', updated_at: '2025-05-01' },
  { id: 'p3', patient_id: 'PT-2025-003', first_name: 'Ibrahima', last_name: 'Seck', age: 58, gender: 'Homme', department: 'Orthopedie', diagnosis: 'Recuperation Prothese Hanche', admission_date: '2025-04-28', predicted_discharge_date: '2025-05-18', risk_score: 45, risk_level: 'medium', room_number: '412-C', attending_doctor_id: '1', status: 'admitted', photo_url: `${pexelsBase}/5214951/pexels-photo-5214951.jpeg?auto=compress&cs=tinysrgb&w=60`, created_at: '2025-04-28', updated_at: '2025-05-01' },
  { id: 'p4', patient_id: 'PT-2025-004', first_name: 'Yacine', last_name: 'Mboup', age: 81, gender: 'Femme', department: 'Neurologie', diagnosis: 'Recuperation AVC', admission_date: '2025-04-15', predicted_discharge_date: '2025-05-25', risk_score: 91, risk_level: 'high', room_number: '108-A', attending_doctor_id: '1', status: 'critical', photo_url: `${pexelsBase}/5214952/pexels-photo-5214952.jpeg?auto=compress&cs=tinysrgb&w=60`, created_at: '2025-04-15', updated_at: '2025-05-01' },
  { id: 'p5', patient_id: 'PT-2025-005', first_name: 'Moussa', last_name: 'Gueye', age: 44, gender: 'Homme', department: 'Cardiologie', diagnosis: 'Infarctus du Myocarde', admission_date: '2025-05-01', predicted_discharge_date: '2025-05-12', risk_score: 63, risk_level: 'medium', room_number: '302-B', attending_doctor_id: '1', status: 'admitted', photo_url: `${pexelsBase}/5214953/pexels-photo-5214953.jpeg?auto=compress&cs=tinysrgb&w=60`, created_at: '2025-05-01', updated_at: '2025-05-01' },
  { id: 'p6', patient_id: 'PT-2025-006', first_name: 'Aissatou', last_name: 'Sarr', age: 55, gender: 'Femme', department: 'Oncologie', diagnosis: 'Cancer du Sein - Post Chirurgie', admission_date: '2025-04-30', predicted_discharge_date: '2025-05-10', risk_score: 38, risk_level: 'low', room_number: '501-A', attending_doctor_id: '1', status: 'admitted', photo_url: `${pexelsBase}/5214954/pexels-photo-5214954.jpeg?auto=compress&cs=tinysrgb&w=60`, created_at: '2025-04-30', updated_at: '2025-05-01' },
  { id: 'p7', patient_id: 'PT-2025-007', first_name: 'Cheikh', last_name: 'Sy', age: 69, gender: 'Homme', department: 'Pneumologie', diagnosis: 'Pneumonie', admission_date: '2025-05-02', predicted_discharge_date: '2025-05-14', risk_score: 55, risk_level: 'medium', room_number: '206-A', attending_doctor_id: '1', status: 'admitted', photo_url: `${pexelsBase}/5214955/pexels-photo-5214955.jpeg?auto=compress&cs=tinysrgb&w=60`, created_at: '2025-05-02', updated_at: '2025-05-02' },
  { id: 'p8', patient_id: 'PT-2025-008', first_name: 'Fatoumata', last_name: 'Kane', age: 77, gender: 'Femme', department: 'Cardiologie', diagnosis: 'Fibrillation Auriculaire', admission_date: '2025-04-22', predicted_discharge_date: '2025-05-08', risk_score: 22, risk_level: 'low', room_number: '303-A', attending_doctor_id: '1', status: 'admitted', photo_url: `${pexelsBase}/5214956/pexels-photo-5214956.jpeg?auto=compress&cs=tinysrgb&w=60`, created_at: '2025-04-22', updated_at: '2025-05-01' },
  { id: 'p9', patient_id: 'PT-2025-009', first_name: 'Abdoulaye', last_name: 'Wade', age: 83, gender: 'Homme', department: 'Neurologie', diagnosis: 'Demence avec Delire', admission_date: '2025-04-18', predicted_discharge_date: '2025-06-01', risk_score: 95, risk_level: 'high', room_number: '110-B', attending_doctor_id: '1', status: 'critical', photo_url: `${pexelsBase}/5214957/pexels-photo-5214957.jpeg?auto=compress&cs=tinysrgb&w=60`, created_at: '2025-04-18', updated_at: '2025-05-01' },
  { id: 'p10', patient_id: 'PT-2025-010', first_name: 'Sokhna', last_name: 'Thiam', age: 61, gender: 'Femme', department: 'Orthopedie', diagnosis: 'Prothese du Genou', admission_date: '2025-05-03', predicted_discharge_date: '2025-05-16', risk_score: 15, risk_level: 'low', room_number: '413-A', attending_doctor_id: '1', status: 'admitted', photo_url: `${pexelsBase}/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=60`, created_at: '2025-05-03', updated_at: '2025-05-03' },
];

export const mockVitals: Vital[] = [
  { id: 'v1', patient_id: 'p1', temperature: 38.2, blood_pressure_systolic: 158, blood_pressure_diastolic: 95, heart_rate: 102, oxygen_saturation: 91, respiratory_rate: 22, recorded_by: '2', recorded_at: '2025-05-09T08:30:00Z' },
  { id: 'v2', patient_id: 'p2', temperature: 37.5, blood_pressure_systolic: 142, blood_pressure_diastolic: 88, heart_rate: 88, oxygen_saturation: 93, respiratory_rate: 20, recorded_by: '2', recorded_at: '2025-05-09T08:45:00Z' },
  { id: 'v3', patient_id: 'p3', temperature: 36.8, blood_pressure_systolic: 130, blood_pressure_diastolic: 82, heart_rate: 76, oxygen_saturation: 97, respiratory_rate: 16, recorded_by: '2', recorded_at: '2025-05-09T09:00:00Z' },
  { id: 'v4', patient_id: 'p4', temperature: 37.1, blood_pressure_systolic: 165, blood_pressure_diastolic: 100, heart_rate: 95, oxygen_saturation: 89, respiratory_rate: 24, recorded_by: '2', recorded_at: '2025-05-09T09:15:00Z' },
  { id: 'v5', patient_id: 'p5', temperature: 36.9, blood_pressure_systolic: 148, blood_pressure_diastolic: 92, heart_rate: 82, oxygen_saturation: 96, respiratory_rate: 18, recorded_by: '2', recorded_at: '2025-05-09T09:30:00Z' },
  { id: 'v6', patient_id: 'p6', temperature: 36.7, blood_pressure_systolic: 120, blood_pressure_diastolic: 78, heart_rate: 72, oxygen_saturation: 98, respiratory_rate: 14, recorded_by: '2', recorded_at: '2025-05-09T09:45:00Z' },
  { id: 'v7', patient_id: 'p7', temperature: 37.8, blood_pressure_systolic: 135, blood_pressure_diastolic: 85, heart_rate: 90, oxygen_saturation: 94, respiratory_rate: 21, recorded_by: '2', recorded_at: '2025-05-09T10:00:00Z' },
  { id: 'v8', patient_id: 'p8', temperature: 36.6, blood_pressure_systolic: 128, blood_pressure_diastolic: 80, heart_rate: 68, oxygen_saturation: 97, respiratory_rate: 15, recorded_by: '2', recorded_at: '2025-05-09T10:15:00Z' },
  { id: 'v9', patient_id: 'p9', temperature: 37.9, blood_pressure_systolic: 170, blood_pressure_diastolic: 105, heart_rate: 108, oxygen_saturation: 87, respiratory_rate: 26, recorded_by: '2', recorded_at: '2025-05-09T10:30:00Z' },
  { id: 'v10', patient_id: 'p10', temperature: 36.5, blood_pressure_systolic: 118, blood_pressure_diastolic: 75, heart_rate: 70, oxygen_saturation: 99, respiratory_rate: 14, recorded_by: '2', recorded_at: '2025-05-09T10:45:00Z' },
];

export const mockAppointments: Appointment[] = [
  { id: 'a1', patient_id: 'p1', assigned_nurse_id: '2', appointment_type: 'Controle Signes Vitaux', scheduled_date: '2025-05-09', scheduled_time: '08:00', status: 'completed', notes: 'Vitaux du matin', created_at: '2025-05-09' },
  { id: 'a2', patient_id: 'p2', assigned_nurse_id: '2', appointment_type: 'Medication', scheduled_date: '2025-05-09', scheduled_time: '09:00', status: 'scheduled', notes: 'Administration inhalateur', created_at: '2025-05-09' },
  { id: 'a3', patient_id: 'p4', assigned_nurse_id: '2', appointment_type: 'Evaluation Neuro', scheduled_date: '2025-05-09', scheduled_time: '10:00', status: 'scheduled', notes: 'Evaluation post-AVC', created_at: '2025-05-09' },
  { id: 'a4', patient_id: 'p3', assigned_nurse_id: '2', appointment_type: 'Kinesitherapie', scheduled_date: '2025-05-09', scheduled_time: '11:00', status: 'scheduled', notes: 'Evaluation mobilite', created_at: '2025-05-09' },
  { id: 'a5', patient_id: 'p9', assigned_nurse_id: '2', appointment_type: 'Controle Signes Vitaux', scheduled_date: '2025-05-09', scheduled_time: '12:00', status: 'scheduled', notes: 'Surveillance critique', created_at: '2025-05-09' },
  { id: 'a6', patient_id: 'p5', assigned_nurse_id: '2', appointment_type: 'Surveillance Cardiaque', scheduled_date: '2025-05-09', scheduled_time: '14:00', status: 'scheduled', notes: 'Surveillance ECG', created_at: '2025-05-09' },
  { id: 'a7', patient_id: 'p6', assigned_nurse_id: '2', appointment_type: 'Soins de Plaie', scheduled_date: '2025-05-09', scheduled_time: '15:00', status: 'scheduled', notes: 'Changement pansement post-chirurgical', created_at: '2025-05-09' },
  { id: 'a8', patient_id: 'p7', assigned_nurse_id: '2', appointment_type: 'Kinesitherapie Respiratoire', scheduled_date: '2025-05-09', scheduled_time: '16:00', status: 'scheduled', notes: 'Exercices respiratoires', created_at: '2025-05-09' },
];

export const mockAlerts: Alert[] = [
  { id: 'al1', patient_id: 'p1', alert_type: 'critical_patient', severity: 'critical', title: 'Critique: Aggravation Insuffisance Cardiaque', message: 'Le patient Ousmane Diop presente des signes de decompensation aigue. Intervention immediate requise.', is_read: false, created_by: null, created_at: '2025-05-09T07:30:00Z', resolved_at: null },
  { id: 'al2', patient_id: 'p4', alert_type: 'critical_patient', severity: 'critical', title: 'Critique: Patient AVC - O2 Bas', message: 'Yacine Mboup - la saturation en oxygene est tombee sous 90%. Prevenir le medecin traitant.', is_read: false, created_by: null, created_at: '2025-05-09T08:15:00Z', resolved_at: null },
  { id: 'al3', patient_id: 'p9', alert_type: 'critical_patient', severity: 'critical', title: 'Critique: Episode de Delire', message: 'Abdoulaye Wade presente un episode de delire aigu. Securite et neurologie prevenus.', is_read: false, created_by: null, created_at: '2025-05-09T06:45:00Z', resolved_at: null },
  { id: 'al4', patient_id: 'p2', alert_type: 'missing_data', severity: 'warning', title: 'Donnees Manquantes: Resultats Labo', message: 'Mariama Fall - resultats de gaz du sang manquants. Donnees necessaires pour la precision de la prediction IA.', is_read: false, created_by: null, created_at: '2025-05-09T07:00:00Z', resolved_at: null },
  { id: 'al5', patient_id: 'p5', alert_type: 'missing_data', severity: 'warning', title: 'Donnees Manquantes: Echocardiogramme', message: 'Moussa Gueye - donnees echocardiogramme d\'hier manquantes. Donnees cardiologie incompletes.', is_read: true, created_by: null, created_at: '2025-05-08T14:00:00Z', resolved_at: null },
  { id: 'al6', patient_id: null, alert_type: 'ai_performance', severity: 'warning', title: 'Modele IA: Chute de Precision Detectee', message: 'La precision du modele de prediction de readmission a baisse de 2,3% ces 48 dernieres heures. Revision recommandee.', is_read: false, created_by: null, created_at: '2025-05-09T05:00:00Z', resolved_at: null },
  { id: 'al7', patient_id: null, alert_type: 'ai_performance', severity: 'info', title: 'Modele IA: Reentrainement Programme', message: 'Le reentrainement du modele v2.1 est programme ce soir a 02h00. Temps d\'arret prevu: 30 minutes.', is_read: true, created_by: null, created_at: '2025-05-08T16:00:00Z', resolved_at: null },
  { id: 'al8', patient_id: 'p7', alert_type: 'missing_data', severity: 'info', title: 'Donnees Manquantes: Resume de Sortie', message: 'Cheikh Sy - formulaire d\'evaluation du plan de sortie manquant.', is_read: true, created_by: null, created_at: '2025-05-08T10:00:00Z', resolved_at: null },
];

export const mockActivityLogs: ActivityLog[] = [
  { id: 'log1', user_id: '1', action: 'Consultation Dossier Patient', resource_type: 'patient', resource_id: 'p1', details: { patient_name: 'Ousmane Diop' }, ip_address: '192.168.1.10', created_at: '2025-05-09T08:00:00Z' },
  { id: 'log2', user_id: '2', action: 'Mise a jour Signes Vitaux', resource_type: 'vitals', resource_id: 'v1', details: { patient_name: 'Ousmane Diop' }, ip_address: '192.168.1.22', created_at: '2025-05-09T08:30:00Z' },
  { id: 'log3', user_id: '1', action: 'Generation Rapport Risque', resource_type: 'report', resource_id: null, details: { report_type: 'risque_hebdomadaire' }, ip_address: '192.168.1.10', created_at: '2025-05-09T07:00:00Z' },
  { id: 'log4', user_id: '3', action: 'Creation Compte Utilisateur', resource_type: 'user', resource_id: '5', details: { new_user: 'Dr. Aminata Faye' }, ip_address: '192.168.1.5', created_at: '2025-05-08T16:00:00Z' },
  { id: 'log5', user_id: '4', action: 'Export Rapport Analytique', resource_type: 'report', resource_id: null, details: { format: 'PDF', date_range: 'Avril 2025' }, ip_address: '192.168.1.30', created_at: '2025-05-08T14:30:00Z' },
  { id: 'log6', user_id: '2', action: 'Rendez-vous Termine', resource_type: 'appointment', resource_id: 'a1', details: { patient_name: 'Ousmane Diop' }, ip_address: '192.168.1.22', created_at: '2025-05-09T08:15:00Z' },
  { id: 'log7', user_id: '1', action: 'Mise a jour Score Risque', resource_type: 'patient', resource_id: 'p4', details: { old_score: 85, new_score: 91 }, ip_address: '192.168.1.10', created_at: '2025-05-09T06:00:00Z' },
  { id: 'log8', user_id: '3', action: 'Modification Permissions Role', resource_type: 'role', resource_id: null, details: { role: 'infirmier', changes: 'permission export ajoutee' }, ip_address: '192.168.1.5', created_at: '2025-05-08T11:00:00Z' },
  { id: 'log9', user_id: '4', action: 'Import Jeu de Donnees', resource_type: 'dataset', resource_id: 'ds1', details: { filename: 'readmissions_mars.csv', records: 1250 }, ip_address: '192.168.1.30', created_at: '2025-05-07T09:00:00Z' },
  { id: 'log10', user_id: '2', action: 'Alerte Acquittee', resource_type: 'alert', resource_id: 'al5', details: { alert_title: 'Donnees Manquantes: Echocardiogramme' }, ip_address: '192.168.1.22', created_at: '2025-05-08T14:30:00Z' },
];

export const mockMedications: Medication[] = [
  { id: 'm1', patient_id: 'p1', medication_name: 'Furosemide', dosage: '40mg', frequency: '2x par jour', adherence_rate: 92, prescribed_by: '1', start_date: '2025-04-20', end_date: null, created_at: '2025-04-20' },
  { id: 'm2', patient_id: 'p1', medication_name: 'Lisinopril', dosage: '10mg', frequency: '1x par jour', adherence_rate: 88, prescribed_by: '1', start_date: '2025-04-20', end_date: null, created_at: '2025-04-20' },
  { id: 'm3', patient_id: 'p2', medication_name: 'Tiotropium', dosage: '18mcg', frequency: '1x par jour', adherence_rate: 75, prescribed_by: '1', start_date: '2025-04-25', end_date: null, created_at: '2025-04-25' },
  { id: 'm4', patient_id: 'p4', medication_name: 'Clopidogrel', dosage: '75mg', frequency: '1x par jour', adherence_rate: 95, prescribed_by: '1', start_date: '2025-04-15', end_date: null, created_at: '2025-04-15' },
  { id: 'm5', patient_id: 'p5', medication_name: 'Metoprolol', dosage: '50mg', frequency: '2x par jour', adherence_rate: 82, prescribed_by: '1', start_date: '2025-05-01', end_date: null, created_at: '2025-05-01' },
  { id: 'm6', patient_id: 'p6', medication_name: 'Tamoxifene', dosage: '20mg', frequency: '1x par jour', adherence_rate: 98, prescribed_by: '1', start_date: '2025-04-30', end_date: null, created_at: '2025-04-30' },
  { id: 'm7', patient_id: 'p8', medication_name: 'Warfarine', dosage: '5mg', frequency: '1x par jour', adherence_rate: 90, prescribed_by: '1', start_date: '2025-04-22', end_date: null, created_at: '2025-04-22' },
  { id: 'm8', patient_id: 'p9', medication_name: 'Risperidone', dosage: '1mg', frequency: '1x par jour', adherence_rate: 60, prescribed_by: '1', start_date: '2025-04-18', end_date: null, created_at: '2025-04-18' },
];

export const mockPredictions: AIPrediction[] = [
  { id: 'pred1', patient_id: 'p1', prediction_type: 'readmission', predicted_value: 87, confidence_score: 94, actual_outcome: null, model_version: '2.0', features_used: { age: 72, diagnosis: 'ICC', prior_admissions: 3 }, created_at: '2025-05-09T06:00:00Z' },
  { id: 'pred2', patient_id: 'p2', prediction_type: 'readmission', predicted_value: 72, confidence_score: 89, actual_outcome: null, model_version: '2.0', features_used: { age: 65, diagnosis: 'BPCO', prior_admissions: 2 }, created_at: '2025-05-09T06:00:00Z' },
  { id: 'pred3', patient_id: 'p4', prediction_type: 'readmission', predicted_value: 91, confidence_score: 96, actual_outcome: null, model_version: '2.0', features_used: { age: 81, diagnosis: 'AVC', prior_admissions: 4 }, created_at: '2025-05-09T06:00:00Z' },
  { id: 'pred4', patient_id: 'p9', prediction_type: 'readmission', predicted_value: 95, confidence_score: 97, actual_outcome: null, model_version: '2.0', features_used: { age: 83, diagnosis: 'Demence', prior_admissions: 5 }, created_at: '2025-05-09T06:00:00Z' },
  { id: 'pred5', patient_id: 'p5', prediction_type: 'readmission', predicted_value: 63, confidence_score: 82, actual_outcome: null, model_version: '2.0', features_used: { age: 44, diagnosis: 'IM', prior_admissions: 1 }, created_at: '2025-05-09T06:00:00Z' },
];

export const mockImportedDatasets: ImportedDataset[] = [
  { id: 'ds1', imported_by: '4', filename: 'readmissions_mars.csv', record_count: 1250, import_status: 'completed', error_details: null, created_at: '2025-05-07T09:00:00Z' },
  { id: 'ds2', imported_by: '4', filename: 'donnees_patients_avril.xlsx', record_count: 890, import_status: 'completed', error_details: null, created_at: '2025-05-01T10:00:00Z' },
  { id: 'ds3', imported_by: '3', filename: 'stats_departements_t1.csv', record_count: 340, import_status: 'completed', error_details: null, created_at: '2025-04-15T14:00:00Z' },
  { id: 'ds4', imported_by: '4', filename: 'export_vitaux_mai.json', record_count: 0, import_status: 'processing', error_details: null, created_at: '2025-05-09T08:00:00Z' },
  { id: 'ds5', imported_by: '3', filename: 'donnees_corrompues.csv', record_count: 0, import_status: 'failed', error_details: 'Format CSV invalide a la ligne 45: delimiteur inattendu', created_at: '2025-05-08T16:00:00Z' },
];

export const readmissionTrendData = [
  { name: 'Jan', readmissions: 23, total: 156, rate: 14.7 },
  { name: 'Fev', readmissions: 19, total: 142, rate: 13.4 },
  { name: 'Mar', readmissions: 28, total: 168, rate: 16.7 },
  { name: 'Avr', readmissions: 21, total: 155, rate: 13.5 },
  { name: 'Mai', readmissions: 15, total: 98, rate: 15.3 },
];

export const riskDistributionData = [
  { name: 'Risque Eleve', value: 4, color: '#dc2626' },
  { name: 'Risque Moyen', value: 3, color: '#f59e0b' },
  { name: 'Risque Faible', value: 3, color: '#16a34a' },
];

export const riskFactorsData = [
  { name: 'Admissions Anterieures', weight: 0.28 },
  { name: 'Age > 70', weight: 0.22 },
  { name: 'Comorbidites', weight: 0.19 },
  { name: 'Duree de Sejour', weight: 0.14 },
  { name: 'Mode de Sortie', weight: 0.10 },
  { name: 'Observance Medicamenteuse', weight: 0.07 },
];

export const departmentComparisonData = [
  { name: 'Cardiologie', readmissionRate: 18.2, avgRiskScore: 72, patients: 34 },
  { name: 'Pneumologie', readmissionRate: 15.8, avgRiskScore: 65, patients: 28 },
  { name: 'Neurologie', readmissionRate: 22.1, avgRiskScore: 78, patients: 22 },
  { name: 'Orthopedie', readmissionRate: 8.5, avgRiskScore: 35, patients: 41 },
  { name: 'Oncologie', readmissionRate: 12.3, avgRiskScore: 48, patients: 19 },
];

export const aiAccuracyData = [
  { name: 'Sem 1', accuracy: 91.2, precision: 89.5, recall: 87.8 },
  { name: 'Sem 2', accuracy: 92.1, precision: 90.3, recall: 88.5 },
  { name: 'Sem 3', accuracy: 91.8, precision: 89.8, recall: 89.1 },
  { name: 'Sem 4', accuracy: 93.4, precision: 91.7, recall: 90.2 },
  { name: 'Sem 5', accuracy: 92.8, precision: 90.9, recall: 89.6 },
  { name: 'Sem 6', accuracy: 91.1, precision: 89.2, recall: 87.3 },
];

export const dataCompletenessData = [
  { name: 'Demographie', completeness: 98 },
  { name: 'Diagnostics', completeness: 95 },
  { name: 'Resultats Labo', completeness: 82 },
  { name: 'Signes Vitaux', completeness: 91 },
  { name: 'Medicaments', completeness: 88 },
  { name: 'Plan de Sortie', completeness: 73 },
  { name: 'Suivi', completeness: 67 },
];

// Patient-specific mock data
export const currentPatient = {
  id: 'p1',
  patient_id: 'PT-2025-001',
  first_name: 'Ousmane',
  last_name: 'Diop',
  age: 72,
  gender: 'Homme',
  department: 'Cardiologie',
  diagnosis: 'Insuffisance Cardiaque Congestive',
  admission_date: '2025-04-20',
  risk_score: 87,
  risk_level: 'high' as const,
  attending_doctor: 'Dr. Fatou Diallo',
  room_number: '301-A',
  phone: '+221 77 123 45 67',
  email: 'ousmane.diop@email.sn',
  blood_type: 'A+',
  allergies: ['Penicilline', 'Iode'],
  emergency_contact: 'Mariama Diop - +221 76 234 56 78',
};

export const mockPatientVitals: PatientVitalEntry[] = [
  { id: 'pv1', patient_id: 'p1', temperature: 38.2, blood_pressure_systolic: 158, blood_pressure_diastolic: 95, heart_rate: 102, blood_sugar: 1.4, oxygen_saturation: 91, weight: 78, height: 172, pain_level: 4, symptoms: ['fatigue', 'essoufflement'], recorded_at: '2025-05-09T08:30:00Z' },
  { id: 'pv2', patient_id: 'p1', temperature: 37.8, blood_pressure_systolic: 152, blood_pressure_diastolic: 92, heart_rate: 98, blood_sugar: 1.3, oxygen_saturation: 92, weight: 78, height: 172, pain_level: 3, symptoms: ['fatigue'], recorded_at: '2025-05-08T08:30:00Z' },
  { id: 'pv3', patient_id: 'p1', temperature: 37.5, blood_pressure_systolic: 148, blood_pressure_diastolic: 90, heart_rate: 95, blood_sugar: 1.2, oxygen_saturation: 93, weight: 78.2, height: 172, pain_level: 3, symptoms: [], recorded_at: '2025-05-07T08:30:00Z' },
  { id: 'pv4', patient_id: 'p1', temperature: 37.9, blood_pressure_systolic: 155, blood_pressure_diastolic: 94, heart_rate: 100, blood_sugar: 1.5, oxygen_saturation: 90, weight: 78.1, height: 172, pain_level: 5, symptoms: ['fatigue', 'douleur thoracique'], recorded_at: '2025-05-06T08:30:00Z' },
  { id: 'pv5', patient_id: 'p1', temperature: 37.3, blood_pressure_systolic: 145, blood_pressure_diastolic: 88, heart_rate: 92, blood_sugar: 1.1, oxygen_saturation: 94, weight: 78.3, height: 172, pain_level: 2, symptoms: [], recorded_at: '2025-05-05T08:30:00Z' },
  { id: 'pv6', patient_id: 'p1', temperature: 37.0, blood_pressure_systolic: 140, blood_pressure_diastolic: 85, heart_rate: 88, blood_sugar: 1.0, oxygen_saturation: 95, weight: 78.5, height: 172, pain_level: 2, symptoms: [], recorded_at: '2025-05-04T08:30:00Z' },
  { id: 'pv7', patient_id: 'p1', temperature: 37.6, blood_pressure_systolic: 150, blood_pressure_diastolic: 91, heart_rate: 96, blood_sugar: 1.3, oxygen_saturation: 92, weight: 78.4, height: 172, pain_level: 4, symptoms: ['essoufflement'], recorded_at: '2025-05-03T08:30:00Z' },
];

export const mockHospitalizations: HospitalizationRecord[] = [
  { id: 'h1', patient_id: 'p1', admission_date: '2025-04-20', discharge_date: null, diagnosis: 'Insuffisance Cardiaque Congestive', department: 'Cardiologie', attending_doctor: 'Dr. Fatou Diallo', duration_days: 19, status: 'en_cours' },
  { id: 'h2', patient_id: 'p1', admission_date: '2024-11-15', discharge_date: '2024-11-28', diagnosis: 'Decompensation Cardiaque Aigue', department: 'Cardiologie', attending_doctor: 'Dr. Fatou Diallo', duration_days: 13, status: 'terminee' },
  { id: 'h3', patient_id: 'p1', admission_date: '2024-06-03', discharge_date: '2024-06-12', diagnosis: 'Oedeme Pulmonaire', department: 'Reanimation', attending_doctor: 'Dr. Ibrahima Seck', duration_days: 9, status: 'terminee' },
  { id: 'h4', patient_id: 'p1', admission_date: '2023-12-20', discharge_date: '2024-01-05', diagnosis: 'Crise Hypertensive', department: 'Cardiologie', attending_doctor: 'Dr. Fatou Diallo', duration_days: 16, status: 'terminee' },
];

export const mockMedicalDocuments: MedicalDocument[] = [
  { id: 'doc1', patient_id: 'p1', filename: 'echocardiogramme_0905.pdf', file_type: 'pdf', file_size: '2.4 MB', category: 'resultat', uploaded_by: 'Dr. Fatou Diallo', uploaded_at: '2025-05-09T10:00:00Z' },
  { id: 'doc2', patient_id: 'p1', filename: 'prise_en_charge_cardiaque.pdf', file_type: 'pdf', file_size: '1.1 MB', category: 'rapport', uploaded_by: 'Dr. Fatou Diallo', uploaded_at: '2025-05-08T14:00:00Z' },
  { id: 'doc3', patient_id: 'p1', filename: 'ordonnance_sortie.pdf', file_type: 'pdf', file_size: '340 KB', category: 'ordonnance', uploaded_by: 'Dr. Fatou Diallo', uploaded_at: '2025-05-07T16:00:00Z' },
  { id: 'doc4', patient_id: 'p1', filename: 'radiographie_thorax.dcm', file_type: 'dcm', file_size: '8.2 MB', category: 'imagerie', uploaded_by: 'Dr. Fatou Diallo', uploaded_at: '2025-05-06T09:00:00Z' },
  { id: 'doc5', patient_id: 'p1', filename: 'bilan_sanguin_mai.pdf', file_type: 'pdf', file_size: '560 KB', category: 'resultat', uploaded_by: 'Dr. Fatou Diallo', uploaded_at: '2025-05-05T11:00:00Z' },
];

export const mockPatientNotifications: PatientNotification[] = [
  { id: 'pn1', patient_id: 'p1', type: 'traitement', title: 'Rappel Medication', message: 'Il est temps de prendre votre Furosemide 40mg.', is_read: false, created_at: '2025-05-09T08:00:00Z' },
  { id: 'pn2', patient_id: 'p1', type: 'medecin', title: 'Message du Dr. Diallo', message: 'Bonjour Ousmane, vos resultats d\'echocardiogramme sont stables. Continuez le traitement actuel.', is_read: false, created_at: '2025-05-09T07:30:00Z' },
  { id: 'pn3', patient_id: 'p1', type: 'suivi', title: 'Suivi Post-Hospitalisation', message: 'N\'oubliez pas de remplir votre formulaire de suivi quotidien.', is_read: false, created_at: '2025-05-09T06:00:00Z' },
  { id: 'pn4', patient_id: 'p1', type: 'medicale', title: 'Alerte Tension Arterielle', message: 'Votre tension arterielle est elevee ce matin. Veuillez rester au repos et prevenir l\'infirmiere.', is_read: true, created_at: '2025-05-08T09:00:00Z' },
  { id: 'pn5', patient_id: 'p1', type: 'traitement', title: 'Medicament a prendre', message: 'Prenez votre Lisinopril 10mg apres le dejeuner.', is_read: true, created_at: '2025-05-08T12:00:00Z' },
  { id: 'pn6', patient_id: 'p1', type: 'systeme', title: 'Rendez-vous Confirme', message: 'Votre rendez-vous de suivi en Cardiologie est confirme pour le 12 mai a 10h00.', is_read: true, created_at: '2025-05-07T15:00:00Z' },
];

export const mockTreatmentEntries: TreatmentEntry[] = [
  { id: 'te1', patient_id: 'p1', medication_name: 'Furosemide', dosage: '40mg', frequency: '2x par jour', time: '08:00', taken: true, date: '2025-05-09' },
  { id: 'te2', patient_id: 'p1', medication_name: 'Lisinopril', dosage: '10mg', frequency: '1x par jour', time: '12:00', taken: false, date: '2025-05-09' },
  { id: 'te3', patient_id: 'p1', medication_name: 'Furosemide', dosage: '40mg', frequency: '2x par jour', time: '20:00', taken: false, date: '2025-05-09' },
  { id: 'te4', patient_id: 'p1', medication_name: 'Furosemide', dosage: '40mg', frequency: '2x par jour', time: '08:00', taken: true, date: '2025-05-08' },
  { id: 'te5', patient_id: 'p1', medication_name: 'Lisinopril', dosage: '10mg', frequency: '1x par jour', time: '12:00', taken: true, date: '2025-05-08' },
  { id: 'te6', patient_id: 'p1', medication_name: 'Furosemide', dosage: '40mg', frequency: '2x par jour', time: '20:00', taken: true, date: '2025-05-08' },
];

export const mockSymptoms: SymptomEntry[] = [
  { id: 's1', patient_id: 'p1', symptoms: ['fatigue', 'essoufflement'], severity: 'moderee', notes: 'Essoufflement en montant les escaliers', reported_at: '2025-05-09T08:00:00Z' },
  { id: 's2', patient_id: 'p1', symptoms: ['douleur thoracique'], severity: 'severe', notes: 'Douleur legere dans la poitrine ce matin', reported_at: '2025-05-06T07:00:00Z' },
  { id: 's3', patient_id: 'p1', symptoms: ['fatigue'], severity: 'legere', notes: 'Fatigue generale', reported_at: '2025-05-04T09:00:00Z' },
];

export const mockMessages: Message[] = [
  { id: 'msg1', sender_id: '1', sender_name: 'Dr. Fatou Diallo', sender_role: 'Medecin', receiver_id: 'p1', content: 'Bonjour Ousmane, comment vous sentez-vous aujourd\'hui ? J\'ai vu que votre tension etait un peu elevee ce matin.', is_read: true, sent_at: '2025-05-09T07:30:00Z' },
  { id: 'msg2', sender_id: 'p1', sender_name: 'Ousmane Diop', sender_role: 'Patient', receiver_id: '1', content: 'Bonjour Docteur. Je me sens un peu fatigue, mais la douleur a diminue.', is_read: true, sent_at: '2025-05-09T07:45:00Z' },
  { id: 'msg3', sender_id: '1', sender_name: 'Dr. Fatou Diallo', sender_role: 'Medecin', receiver_id: 'p1', content: 'C\'est bien pour la douleur. Continuez a vous reposer. Je passerai vous voir cet apres-midi pour l\'echocardiogramme.', is_read: false, sent_at: '2025-05-09T08:00:00Z' },
  { id: 'msg4', sender_id: '2', sender_name: 'Aminata Ndiaye', sender_role: 'Infirmiere', receiver_id: 'p1', content: 'Bonjour Monsieur Diop, n\'oubliez pas de prendre votre medicament a midi. Je passerai pour vos signes vitaux a 14h.', is_read: false, sent_at: '2025-05-09T09:00:00Z' },
];

export const mockHealthTips: HealthTip[] = [
  { id: 'ht1', title: 'Limitez le sel', description: 'Reduisez votre consommation de sel a moins de 2g par jour pour aider votre coeur.', icon: 'heart' },
  { id: 'ht2', title: 'Levez-vous doucement', description: 'Quand vous passez de la position allongee a debout, levez-vous lentement pour eviter les vertiges.', icon: 'activity' },
  { id: 'ht3', title: 'Surveillez votre poids', description: 'Pesez-vous chaque matin. Une prise de poids rapide peut indiquer une retention d\'eau.', icon: 'scale' },
  { id: 'ht4', title: 'Reposez-vous', description: 'Faites des pauses regulieres et ne forcez pas sur les activites physiques.', icon: 'moon' },
];

export const patientVitalsTrend = [
  { name: '3 Mai', tension: 150, cardiaque: 96, temperature: 37.6, oxygene: 92 },
  { name: '4 Mai', tension: 140, cardiaque: 88, temperature: 37.0, oxygene: 95 },
  { name: '5 Mai', tension: 145, cardiaque: 92, temperature: 37.3, oxygene: 94 },
  { name: '6 Mai', tension: 155, cardiaque: 100, temperature: 37.9, oxygene: 90 },
  { name: '7 Mai', tension: 148, cardiaque: 95, temperature: 37.5, oxygene: 93 },
  { name: '8 Mai', tension: 152, cardiaque: 98, temperature: 37.8, oxygene: 92 },
  { name: '9 Mai', tension: 158, cardiaque: 102, temperature: 38.2, oxygene: 91 },
];

export const patientAppointments = [
  { id: 'pa1', type: 'Consultation Cardiologie', doctor: 'Dr. Fatou Diallo', date: '2025-05-12', time: '10:00', status: 'confirmed' as const },
  { id: 'pa2', type: 'Bilan Sanguin', doctor: 'Labo Analyse', date: '2025-05-14', time: '08:00', status: 'confirmed' as const },
  { id: 'pa3', type: 'Echocardiogramme', doctor: 'Dr. Fatou Diallo', date: '2025-05-16', time: '14:00', status: 'pending' as const },
  { id: 'pa4', type: 'Consultation Suivi', doctor: 'Dr. Fatou Diallo', date: '2025-05-20', time: '10:00', status: 'pending' as const },
  { id: 'pa5', type: 'Kinesitherapie Cardiaque', doctor: 'Kin. Mamadou Ba', date: '2025-05-22', time: '09:00', status: 'pending' as const },
];
