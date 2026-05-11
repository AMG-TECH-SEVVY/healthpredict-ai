/*
  # HealthPredict AI - Initial Database Schema

  1. New Tables
    - `profiles` - User profiles linked to auth.users with role-based access
      - id (uuid, PK, FK to auth.users)
      - full_name (text)
      - email (text)
      - role (text: doctor, nurse, admin, analyst)
      - department (text)
      - avatar_url (text)
      - phone (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)

    - `patients` - Patient records with risk prediction data
      - id (uuid, PK)
      - patient_id (text, unique - hospital ID)
      - first_name (text)
      - last_name (text)
      - age (integer)
      - gender (text)
      - department (text)
      - diagnosis (text)
      - admission_date (date)
      - predicted_discharge_date (date)
      - risk_score (numeric 0-100)
      - risk_level (text: high, medium, low)
      - room_number (text)
      - attending_doctor_id (uuid, FK to profiles)
      - status (text: admitted, discharged, critical)
      - photo_url (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)

    - `vitals` - Patient vital signs records
      - id (uuid, PK)
      - patient_id (uuid, FK to patients)
      - temperature (numeric)
      - blood_pressure_systolic (integer)
      - blood_pressure_diastolic (integer)
      - heart_rate (integer)
      - oxygen_saturation (integer)
      - respiratory_rate (integer)
      - recorded_by (uuid, FK to profiles)
      - recorded_at (timestamptz)

    - `appointments` - Patient appointment tracking
      - id (uuid, PK)
      - patient_id (uuid, FK to patients)
      - assigned_nurse_id (uuid, FK to profiles)
      - appointment_type (text)
      - scheduled_date (date)
      - scheduled_time (time)
      - status (text: scheduled, completed, cancelled, missed)
      - notes (text)
      - created_at (timestamptz)

    - `alerts` - System and patient alerts
      - id (uuid, PK)
      - patient_id (uuid, FK to patients, nullable)
      - alert_type (text: critical_patient, missing_data, ai_performance, system)
      - severity (text: critical, warning, info)
      - title (text)
      - message (text)
      - is_read (boolean, default false)
      - created_by (uuid, FK to profiles, nullable)
      - created_at (timestamptz)
      - resolved_at (timestamptz, nullable)

    - `activity_logs` - User activity audit trail
      - id (uuid, PK)
      - user_id (uuid, FK to profiles)
      - action (text)
      - resource_type (text)
      - resource_id (uuid, nullable)
      - details (jsonb)
      - ip_address (text, nullable)
      - created_at (timestamptz)

    - `medications` - Patient medication tracking
      - id (uuid, PK)
      - patient_id (uuid, FK to patients)
      - medication_name (text)
      - dosage (text)
      - frequency (text)
      - adherence_rate (numeric 0-100)
      - prescribed_by (uuid, FK to profiles)
      - start_date (date)
      - end_date (date, nullable)
      - created_at (timestamptz)

    - `risk_factors` - AI model risk factor tracking
      - id (uuid, PK)
      - patient_id (uuid, FK to patients)
      - factor_name (text)
      - factor_weight (numeric)
      - factor_value (text)
      - created_at (timestamptz)

    - `ai_predictions` - AI model prediction history
      - id (uuid, PK)
      - patient_id (uuid, FK to patients)
      - prediction_type (text)
      - predicted_value (numeric)
      - confidence_score (numeric)
      - actual_outcome (text, nullable)
      - model_version (text)
      - features_used (jsonb)
      - created_at (timestamptz)

    - `imported_datasets` - Hospital data import tracking
      - id (uuid, PK)
      - imported_by (uuid, FK to profiles)
      - filename (text)
      - record_count (integer)
      - import_status (text: pending, processing, completed, failed)
      - error_details (text, nullable)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Policies restrict access based on user role and ownership
    - Doctors can view/manage their patients
    - Nurses can view assigned patients and update vitals
    - Admins have broad read access for management
    - Analysts have read access for analytics
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT 'doctor' CHECK (role IN ('doctor', 'nurse', 'admin', 'analyst')),
  department text DEFAULT '',
  avatar_url text DEFAULT '',
  phone text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Patients table
CREATE TABLE IF NOT EXISTS patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id text UNIQUE NOT NULL DEFAULT '',
  first_name text NOT NULL DEFAULT '',
  last_name text NOT NULL DEFAULT '',
  age integer NOT NULL DEFAULT 0,
  gender text DEFAULT '',
  department text DEFAULT '',
  diagnosis text DEFAULT '',
  admission_date date DEFAULT CURRENT_DATE,
  predicted_discharge_date date,
  risk_score numeric(5,2) DEFAULT 0 CHECK (risk_score >= 0 AND risk_score <= 100),
  risk_level text DEFAULT 'low' CHECK (risk_level IN ('high', 'medium', 'low')),
  room_number text DEFAULT '',
  attending_doctor_id uuid REFERENCES profiles(id),
  status text DEFAULT 'admitted' CHECK (status IN ('admitted', 'discharged', 'critical')),
  photo_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Vitals table
CREATE TABLE IF NOT EXISTS vitals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  temperature numeric(4,1) DEFAULT 0,
  blood_pressure_systolic integer DEFAULT 0,
  blood_pressure_diastolic integer DEFAULT 0,
  heart_rate integer DEFAULT 0,
  oxygen_saturation integer DEFAULT 0 CHECK (oxygen_saturation >= 0 AND oxygen_saturation <= 100),
  respiratory_rate integer DEFAULT 0,
  recorded_by uuid REFERENCES profiles(id),
  recorded_at timestamptz DEFAULT now()
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  assigned_nurse_id uuid REFERENCES profiles(id),
  appointment_type text DEFAULT 'follow_up',
  scheduled_date date DEFAULT CURRENT_DATE,
  scheduled_time time DEFAULT '09:00:00',
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'missed')),
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES patients(id) ON DELETE SET NULL,
  alert_type text DEFAULT 'system' CHECK (alert_type IN ('critical_patient', 'missing_data', 'ai_performance', 'system')),
  severity text DEFAULT 'info' CHECK (severity IN ('critical', 'warning', 'info')),
  title text NOT NULL DEFAULT '',
  message text DEFAULT '',
  is_read boolean DEFAULT false,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  resolved_at timestamptz
);

-- Activity logs table
CREATE TABLE IF NOT EXISTS activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  action text NOT NULL DEFAULT '',
  resource_type text DEFAULT '',
  resource_id uuid,
  details jsonb DEFAULT '{}',
  ip_address text,
  created_at timestamptz DEFAULT now()
);

-- Medications table
CREATE TABLE IF NOT EXISTS medications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  medication_name text NOT NULL DEFAULT '',
  dosage text DEFAULT '',
  frequency text DEFAULT '',
  adherence_rate numeric(5,2) DEFAULT 0 CHECK (adherence_rate >= 0 AND adherence_rate <= 100),
  prescribed_by uuid REFERENCES profiles(id),
  start_date date DEFAULT CURRENT_DATE,
  end_date date,
  created_at timestamptz DEFAULT now()
);

-- Risk factors table
CREATE TABLE IF NOT EXISTS risk_factors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  factor_name text NOT NULL DEFAULT '',
  factor_weight numeric(5,4) DEFAULT 0,
  factor_value text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- AI predictions table
CREATE TABLE IF NOT EXISTS ai_predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  prediction_type text NOT NULL DEFAULT 'readmission',
  predicted_value numeric(5,2) DEFAULT 0,
  confidence_score numeric(5,2) DEFAULT 0 CHECK (confidence_score >= 0 AND confidence_score <= 100),
  actual_outcome text,
  model_version text DEFAULT '1.0',
  features_used jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Imported datasets table
CREATE TABLE IF NOT EXISTS imported_datasets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  imported_by uuid NOT NULL REFERENCES profiles(id),
  filename text NOT NULL DEFAULT '',
  record_count integer DEFAULT 0,
  import_status text DEFAULT 'pending' CHECK (import_status IN ('pending', 'processing', 'completed', 'failed')),
  error_details text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE vitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_factors ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE imported_datasets ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Admins can read all profiles" ON profiles FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update any profile" ON profiles FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')) WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Patients policies
CREATE POLICY "Doctors can view their patients" ON patients FOR SELECT TO authenticated USING (attending_doctor_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst', 'nurse')));
CREATE POLICY "Doctors can insert patients" ON patients FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('doctor', 'admin')));
CREATE POLICY "Doctors and nurses can update patients" ON patients FOR UPDATE TO authenticated USING (attending_doctor_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('doctor', 'admin', 'nurse'))) WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('doctor', 'admin', 'nurse')));
CREATE POLICY "Admins can delete patients" ON patients FOR DELETE TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Vitals policies
CREATE POLICY "Staff can view vitals" ON vitals FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Nurses and doctors can insert vitals" ON vitals FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('doctor', 'nurse', 'admin')));
CREATE POLICY "Nurses and doctors can update vitals" ON vitals FOR UPDATE TO authenticated USING (recorded_by = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('doctor', 'admin'))) WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('doctor', 'nurse', 'admin')));

-- Appointments policies
CREATE POLICY "Staff can view appointments" ON appointments FOR SELECT TO authenticated USING (assigned_nurse_id = auth.uid() OR EXISTS (SELECT 1 FROM patients p WHERE p.id = appointments.patient_id AND p.attending_doctor_id = auth.uid()) OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst')));
CREATE POLICY "Staff can manage appointments" ON appointments FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('doctor', 'nurse', 'admin')));
CREATE POLICY "Staff can update appointments" ON appointments FOR UPDATE TO authenticated USING (assigned_nurse_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('doctor', 'admin'))) WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('doctor', 'nurse', 'admin')));

-- Alerts policies
CREATE POLICY "Staff can view alerts" ON alerts FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Staff can create alerts" ON alerts FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Staff can update alerts" ON alerts FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid())) WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid()));

-- Activity logs policies
CREATE POLICY "Users can view own activity" ON activity_logs FOR SELECT TO authenticated USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst')));
CREATE POLICY "System can insert activity logs" ON activity_logs FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid()));

-- Medications policies
CREATE POLICY "Staff can view medications" ON medications FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Doctors can manage medications" ON medications FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('doctor', 'admin')));
CREATE POLICY "Doctors can update medications" ON medications FOR UPDATE TO authenticated USING (prescribed_by = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('doctor', 'admin'))) WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('doctor', 'admin')));

-- Risk factors policies
CREATE POLICY "Staff can view risk factors" ON risk_factors FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid()));
CREATE POLICY "Doctors and analysts can manage risk factors" ON risk_factors FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('doctor', 'admin', 'analyst')));

-- AI predictions policies
CREATE POLICY "Staff can view predictions" ON ai_predictions FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid()));
CREATE POLICY "System can insert predictions" ON ai_predictions FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst')));

-- Imported datasets policies
CREATE POLICY "Admins and analysts can view imports" ON imported_datasets FOR SELECT TO authenticated USING (imported_by = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst')));
CREATE POLICY "Admins and analysts can import data" ON imported_datasets FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst')));

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_patients_doctor ON patients(attending_doctor_id);
CREATE INDEX IF NOT EXISTS idx_patients_department ON patients(department);
CREATE INDEX IF NOT EXISTS idx_patients_risk_level ON patients(risk_level);
CREATE INDEX IF NOT EXISTS idx_patients_status ON patients(status);
CREATE INDEX IF NOT EXISTS idx_vitals_patient ON vitals(patient_id);
CREATE INDEX IF NOT EXISTS idx_vitals_recorded_at ON vitals(recorded_at);
CREATE INDEX IF NOT EXISTS idx_appointments_patient ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_nurse ON appointments(assigned_nurse_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_alerts_patient ON alerts(patient_id);
CREATE INDEX IF NOT EXISTS idx_alerts_type ON alerts(alert_type);
CREATE INDEX IF NOT EXISTS idx_alerts_read ON alerts(is_read);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created ON activity_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_medications_patient ON medications(patient_id);
CREATE INDEX IF NOT EXISTS idx_ai_predictions_patient ON ai_predictions(patient_id);
