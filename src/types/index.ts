export type UserRole = 'doctor' | 'nurse' | 'admin' | 'analyst' | 'patient';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  department: string;
  avatar_url: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface Patient {
  id: string;
  patient_id: string;
  first_name: string;
  last_name: string;
  age: number;
  gender: string;
  department: string;
  diagnosis: string;
  admission_date: string;
  predicted_discharge_date: string;
  risk_score: number;
  risk_level: 'high' | 'medium' | 'low';
  room_number: string;
  attending_doctor_id: string;
  status: 'admitted' | 'discharged' | 'critical';
  photo_url: string;
  created_at: string;
  updated_at: string;
}

export interface Vital {
  id: string;
  patient_id: string;
  temperature: number;
  blood_pressure_systolic: number;
  blood_pressure_diastolic: number;
  heart_rate: number;
  oxygen_saturation: number;
  respiratory_rate: number;
  recorded_by: string;
  recorded_at: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  assigned_nurse_id: string;
  appointment_type: string;
  scheduled_date: string;
  scheduled_time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'missed';
  notes: string;
  created_at: string;
}

export interface Alert {
  id: string;
  patient_id: string | null;
  alert_type: 'critical_patient' | 'missing_data' | 'ai_performance' | 'system';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  is_read: boolean;
  created_by: string | null;
  created_at: string;
  resolved_at: string | null;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  resource_type: string;
  resource_id: string | null;
  details: Record<string, unknown>;
  ip_address: string | null;
  created_at: string;
}

export interface Medication {
  id: string;
  patient_id: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  adherence_rate: number;
  prescribed_by: string;
  start_date: string;
  end_date: string | null;
  created_at: string;
}

export interface RiskFactor {
  id: string;
  patient_id: string;
  factor_name: string;
  factor_weight: number;
  factor_value: string;
  created_at: string;
}

export interface AIPrediction {
  id: string;
  patient_id: string;
  prediction_type: string;
  predicted_value: number;
  confidence_score: number;
  actual_outcome: string | null;
  model_version: string;
  features_used: Record<string, unknown>;
  created_at: string;
}

export interface ImportedDataset {
  id: string;
  imported_by: string;
  filename: string;
  record_count: number;
  import_status: 'pending' | 'processing' | 'completed' | 'failed';
  error_details: string | null;
  created_at: string;
}

export interface NavItem {
  label: string;
  icon: string;
  path: string;
  badge?: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface PatientVitalEntry {
  id: string;
  patient_id: string;
  temperature: number;
  blood_pressure_systolic: number;
  blood_pressure_diastolic: number;
  heart_rate: number;
  blood_sugar: number;
  oxygen_saturation: number;
  weight: number;
  height: number;
  pain_level: number;
  symptoms: string[];
  recorded_at: string;
}

export interface HospitalizationRecord {
  id: string;
  patient_id: string;
  admission_date: string;
  discharge_date: string | null;
  diagnosis: string;
  department: string;
  attending_doctor: string;
  duration_days: number;
  status: 'en_cours' | 'terminee';
}

export interface MedicalDocument {
  id: string;
  patient_id: string;
  filename: string;
  file_type: string;
  file_size: string;
  category: 'resultat' | 'ordonnance' | 'rapport' | 'imagerie' | 'autre';
  uploaded_by: string;
  uploaded_at: string;
}

export interface PatientNotification {
  id: string;
  patient_id: string;
  type: 'traitement' | 'medicale' | 'suivi' | 'medecin' | 'systeme';
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface TreatmentEntry {
  id: string;
  patient_id: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  time: string;
  taken: boolean;
  date: string;
}

export interface SymptomEntry {
  id: string;
  patient_id: string;
  symptoms: string[];
  severity: 'legere' | 'moderee' | 'severe';
  notes: string;
  reported_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  sender_name: string;
  sender_role: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  sent_at: string;
}

export interface HealthTip {
  id: string;
  title: string;
  description: string;
  icon: string;
}
