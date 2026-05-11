# HealthPredict AI - Documentation Complete

## 1. Presentation du Projet

**HealthPredict AI** est un systeme de gestion hospitaliere intelligent base sur l'intelligence artificielle pour la prediction des readmissions. L'application offre une interface multi-roles (Medecin, Infirmier, Administrateur, Analyste, Patient) avec des tableaux de bord dedies, des outils de communication integres et des capacites d'analyse predictive.

---

## 2. Stack Technique

| Composant | Technologie | Version |
|-----------|-------------|---------|
| Frontend | React + TypeScript | 18.3.1 / 5.5.3 |
| Routage | React Router DOM | 7.15.0 |
| Style | Tailwind CSS | 3.4.1 |
| Graphiques | Recharts | 3.8.1 |
| Icones | Lucide React | 0.344.0 |
| Build | Vite | 5.4.2 |
| Base de donnees | Supabase (PostgreSQL) | - |
| SDK Client | @supabase/supabase-js | 2.57.4 |
| Utilitaires | date-fns | 4.1.0 |

---

## 3. Architecture du Projet

```
project/
├── public/                     # Fichiers statiques
├── src/
│   ├── components/
│   │   └── shared/             # Composants partages
│   │       ├── Header.tsx      # Barre de navigation superieure
│   │       ├── Layout.tsx      # Layout principal (Sidebar + Header + Outlet)
│   │       ├── Messaging.tsx   # Messagerie et appels video/audio
│   │       ├── RiskBadge.tsx   # Badge de niveau de risque
│   │       ├── Sidebar.tsx     # Navigation laterale par role
│   │       ├── StatCard.tsx    # Carte de statistique
│   │       └── StatusBadge.tsx # Badge de statut
│   ├── hooks/
│   │   └── useRole.tsx         # Contexte de gestion des roles
│   ├── lib/
│   │   ├── mock-data.ts        # Donnees de demonstration
│   │   └── supabase.ts         # Client Supabase
│   ├── pages/
│   │   ├── admin/              # 9 pages administrateur
│   │   ├── analyst/            # 10 pages analyste
│   │   ├── doctor/             # 9 pages medecin
│   │   ├── nurse/              # 9 pages infirmier
│   │   └── patient/            # 13 pages patient
│   ├── types/
│   │   └── index.ts            # Definitions TypeScript
│   ├── App.tsx                 # Routage principal (53 routes)
│   ├── index.css               # Styles globaux Tailwind
│   ├── main.tsx                # Point d'entree React
│   └── vite-env.d.ts           # Types Vite
├── supabase/
│   └── migrations/
│       └── 20260509123016_create_healthpredict_schema.sql
├── .env                        # Variables d'environnement
├── index.html                  # Template HTML
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 4. Systeme de Roles et Navigation

L'application gere 5 roles distincts, chacun avec son propre ensemble de pages et permissions.

### 4.1 Medecin (`/doctor`)

| Route | Page | Description |
|-------|------|-------------|
| `/doctor` | Tableau de Bord | Vue d'ensemble : patients a risque, tendances readmission, upload de documents medicaux |
| `/doctor/patients` | Patients | Liste des patients avec filtres (departement, risque, statut) |
| `/doctor/risk-prediction` | Prediction Risque | Outils d'evaluation des risques par IA |
| `/doctor/follow-up` | Suivi Patients | Suivi des rendez-vous de suivi |
| `/doctor/analytics` | Analyses | Analyses detaillees des resultats patients |
| `/doctor/alerts` | Alertes | Gestion des alertes critiques et systeme |
| `/doctor/readmission-history` | Historique Readmissions | Donnees historiques et tendances |
| `/doctor/messages` | Messages & Appels | Messagerie et appels video/audio |
| `/doctor/settings` | Parametres | Preferences du medecin |
| `/doctor/profile` | Profil | Informations du medecin |

### 4.2 Infirmier (`/nurse`)

| Route | Page | Description |
|-------|------|-------------|
| `/nurse` | Tableau de Bord | Rendez-vous du jour, alertes critiques, mises a jour |
| `/nurse/monitoring` | Surveillance Patients | Monitoring en temps reel des signes vitaux |
| `/nurse/update` | Mise a Jour Patient | Saisie des donnees cliniques et vitales |
| `/nurse/appointments` | Rendez-vous | Gestion du planning |
| `/nurse/vitals` | Signes Vitaux | Enregistrement temperature, PA, O2, FC |
| `/nurse/missing-data` | Donnees Manquantes | Identification des dossiers incomplets |
| `/nurse/follow-up` | Suivi Quotidien | Check-lists de soins |
| `/nurse/notifications` | Notifications | Alertes et rappels infirmiers |
| `/nurse/emergency` | Alertes Urgence | Gestion des situations critiques |
| `/nurse/messages` | Messages & Appels | Messagerie et appels video/audio |

### 4.3 Administrateur (`/admin`)

| Route | Page | Description |
|-------|------|-------------|
| `/admin` | Tableau de Bord | Vue globale : utilisateurs, departements, performance IA |
| `/admin/users` | Gestion Utilisateurs | CRUD des comptes utilisateurs |
| `/admin/roles` | Roles & Permissions | Configuration des droits d'acces |
| `/admin/stats` | Statistiques Hopital | Metriques de performance hospitaliere |
| `/admin/import` | Import Donnees | Import CSV, Excel, JSON |
| `/admin/activity-logs` | Journal Activite | Piste d'audit complete |
| `/admin/ai-monitoring` | Surveillance IA | Performance et reentrainement des modeles |
| `/admin/departments` | Departements | Gestion des services hospitaliers |
| `/admin/messages` | Messages & Appels | Messagerie et appels video/audio |
| `/admin/settings` | Parametres Systeme | Configuration globale |

### 4.4 Analyste (`/analyst`)

| Route | Page | Description |
|-------|------|-------------|
| `/analyst` | Tableau de Bord | Predictions, precision modele, completude donnees |
| `/analyst/readmission` | Analyses Readmission | Tendances et analyses de readmission |
| `/analyst/ai-model` | Modele IA | Monitoring et validation du modele |
| `/analyst/data-quality` | Qualite Donnees | Metriques de completude |
| `/analyst/predictive` | Rapports Predictifs | Previsions analytiques |
| `/analyst/performance` | Performance Hopital | KPIs hospitaliers |
| `/analyst/ml-insights` | Insights ML | Recommandations du Machine Learning |
| `/analyst/kpis` | Tableau KPIs | Indicateurs cles de performance |
| `/analyst/visualization` | Visualisation Donnees | Outils de visualisation avancee |
| `/analyst/reports` | Rapports | Generation et gestion des rapports |
| `/analyst/messages` | Messages & Appels | Messagerie et appels video/audio |

### 4.5 Patient (`/patient`)

| Route | Page | Description |
|-------|------|-------------|
| `/patient` | Tableau de Bord | Resume sante, tendances vitales, rendez-vous |
| `/patient/vitals` | Signes Vitaux | Suivi des constantes dans le temps |
| `/patient/appointments` | Rendez-vous | Rendez-vous programmés |
| `/patient/notifications` | Notifications | Alertes de traitement et rappels |
| `/patient/hospitalizations` | Hospitalisations | Historique des sejours |
| `/patient/results` | Resultats Medicaux | Resultats d'analyses et examens |
| `/patient/documents` | Documents | Gestion des documents medicaux |
| `/patient/profile` | Profil | Informations personnelles |
| `/patient/risk` | Niveau de Risque | Score de risque personnel |
| `/patient/treatment` | Traitement | Suivi de l'adherence medicamenteuse |
| `/patient/symptoms` | Signaler Symptome | Declaration de symptomes |
| `/patient/follow-up` | Suivi Post-Hospit. | Instructions post-sortie |
| `/patient/communication` | Messages & Appels | Messagerie et appels video/audio |

---

## 5. Composants Partages

### 5.1 Layout.tsx
Structure principale de l'application. Combine la Sidebar fixe (260px, reduisible a 68px) et la zone de contenu avec Header sticky. Utilise `<Outlet />` de React Router pour le rendu des pages.

### 5.2 Header.tsx
Barre de navigation superieure (64px, sticky) avec :
- **Recherche** : Champ de recherche patients/rapports
- **Selecteur de role** : 5 boutons (Medecin, Infirmier, Admin, Analyste, Patient) pour basculer entre les vues
- **Notifications** : Cloche avec badge de compteur non lu
- **Profil utilisateur** : Menu deroulant avec deconnexion

### 5.3 Sidebar.tsx
Navigation laterale fixe avec :
- Logo HealthPredict AI et label du role actif
- Liste de liens de navigation adaptee au role courant
- Indicateur de lien actif (fond bleu, texte bleu)
- Bouton de reduction/extension (chevron)
- Transition fluide 300ms entre les etats

### 5.4 StatCard.tsx
Carte de statistique reutilisable.

**Props :**
```typescript
interface StatCardProps {
  title: string;           // Titre de la metrique
  value: string | number;  // Valeur affichee
  subtitle?: string;       // Texte secondaire
  icon: ReactNode;         // Icone Lucide
  trend?: {                // Tendance optionnelle
    value: number;         // Valeur du trend
    positive: boolean;     // Positif (vert) ou negatif (rouge)
  };
  color?: 'blue' | 'red' | 'amber' | 'green' | 'slate' | 'teal';
}
```

### 5.5 RiskBadge.tsx
Badge de niveau de risque patient.

**Props :**
```typescript
interface RiskBadgeProps {
  level: 'high' | 'medium' | 'low';
}
```
- **high** : Point rouge + "Eleve" sur fond rouge clair
- **medium** : Point ambre + "Moyen" sur fond ambre clair
- **low** : Point vert + "Faible" sur fond vert clair

### 5.6 StatusBadge.tsx
Badge de statut pour patients et rendez-vous.

**Props :**
```typescript
interface StatusBadgeProps {
  status: 'admitted' | 'discharged' | 'critical' | 'scheduled' | 'completed' | 'cancelled' | 'missed' | 'pending' | 'processing' | 'failed';
}
```
Chaque statut est mappe a un schema de couleurs specifique (rouge pour critique, vert pour complete, etc.).

### 5.7 Messaging.tsx
Interface complete de messagerie et appels video/audio, partagee entre tous les roles.

**Fonctionnalites :**
- Liste de contacts avec indicateur en ligne/hors ligne
- Historique de messages avec bulles stylees (envoye/reçu)
- Appels video avec miniature PiP (Picture-in-Picture)
- Appels vocaux avec interface dediee
- Controles : micro on/off, video on/off, raccrocher
- Mode plein ecran
- Contacts adaptes par role (medecin voit patients + infirmiers, etc.)

---

## 6. Types TypeScript

### 6.1 Types Principaux

```typescript
type UserRole = 'doctor' | 'nurse' | 'admin' | 'analyst' | 'patient';

interface Profile {
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

interface Patient {
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
  risk_score: number;       // 0-100
  risk_level: 'high' | 'medium' | 'low';
  room_number: string;
  attending_doctor_id: string;
  status: 'admitted' | 'discharged' | 'critical';
  photo_url: string;
  created_at: string;
  updated_at: string;
}

interface Vital {
  id: string;
  patient_id: string;
  temperature: number;
  blood_pressure_systolic: number;
  blood_pressure_diastolic: number;
  heart_rate: number;
  oxygen_saturation: number;  // 0-100
  respiratory_rate: number;
  recorded_by: string;
  recorded_at: string;
}

interface Appointment {
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

interface Alert {
  id: string;
  patient_id: string | null;
  alert_type: 'critical_patient' | 'missing_data' | 'ai_performance' | 'system';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  is_read: boolean;
  created_by: string;
  created_at: string;
  resolved_at: string | null;
}

interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  resource_type: string;
  resource_id: string | null;
  details: Record<string, unknown>;
  ip_address: string;
  created_at: string;
}

interface Medication {
  id: string;
  patient_id: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  adherence_rate: number;  // 0-100
  prescribed_by: string;
  start_date: string;
  end_date: string | null;
  created_at: string;
}

interface RiskFactor {
  id: string;
  patient_id: string;
  factor_name: string;
  factor_weight: number;
  factor_value: string;
  created_at: string;
}

interface AIPrediction {
  id: string;
  patient_id: string;
  prediction_type: string;
  predicted_value: number;
  confidence_score: number;  // 0-100
  actual_outcome: number | null;
  model_version: string;
  features_used: Record<string, unknown>;
  created_at: string;
}

interface ImportedDataset {
  id: string;
  imported_by: string;
  filename: string;
  record_count: number;
  import_status: 'pending' | 'processing' | 'completed' | 'failed';
  error_details: string | null;
  created_at: string;
}
```

### 6.2 Types Patient

```typescript
interface PatientVitalEntry {
  id: string;
  patient_id: string;
  temperature: number;
  blood_pressure: string;
  heart_rate: number;
  blood_sugar: number;
  oxygen_saturation: number;
  weight: number;
  height: number;
  pain_level: number;
  symptoms: string[];
  recorded_at: string;
}

interface HospitalizationRecord {
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

interface MedicalDocument {
  id: string;
  patient_id: string;
  filename: string;
  file_type: string;
  file_size: string;
  category: 'resultat' | 'ordonnance' | 'rapport' | 'imagerie' | 'autre';
  uploaded_by: string;
  uploaded_at: string;
}

interface PatientNotification {
  id: string;
  patient_id: string;
  type: 'traitement' | 'medicale' | 'suivi' | 'medecin' | 'systeme';
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface TreatmentEntry {
  id: string;
  patient_id: string;
  medication_name: string;
  dosage: string;
  frequency: string;
  time: string;
  taken: boolean;
  date: string;
}

interface SymptomEntry {
  id: string;
  patient_id: string;
  symptoms: string[];
  severity: 'legere' | 'moderee' | 'severe';
  notes: string;
  reported_at: string;
}

interface Message {
  id: string;
  sender_id: string;
  sender_name: string;
  sender_role: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  sent_at: string;
}

interface HealthTip {
  id: string;
  title: string;
  description: string;
  icon: string;
}
```

---

## 7. Base de Donnees (Supabase)

### 7.1 Schema

La migration initiale cree 9 tables avec RLS et index.

#### Table `profiles`
| Colonne | Type | Contraintes |
|---------|------|-------------|
| id | uuid | PK, references auth.users |
| full_name | text | NOT NULL |
| email | text | UNIQUE NOT NULL |
| role | text | CHECK (doctor/nurse/admin/analyst) |
| department | text | DEFAULT '' |
| avatar_url | text | DEFAULT '' |
| phone | text | DEFAULT '' |
| created_at | timestamptz | DEFAULT now() |
| updated_at | timestamptz | DEFAULT now() |

#### Table `patients`
| Colonne | Type | Contraintes |
|---------|------|-------------|
| id | uuid | PK, DEFAULT gen_random_uuid() |
| patient_id | text | UNIQUE NOT NULL |
| first_name | text | NOT NULL |
| last_name | text | NOT NULL |
| age | integer | NOT NULL |
| gender | text | NOT NULL |
| department | text | NOT NULL |
| diagnosis | text | NOT NULL |
| admission_date | date | NOT NULL |
| predicted_discharge_date | date | |
| risk_score | numeric(5,2) | DEFAULT 0, CHECK (0-100) |
| risk_level | text | CHECK (high/medium/low), DEFAULT 'low' |
| room_number | text | DEFAULT '' |
| attending_doctor_id | uuid | FK references profiles |
| status | text | CHECK (admitted/discharged/critical), DEFAULT 'admitted' |
| photo_url | text | DEFAULT '' |
| created_at | timestamptz | DEFAULT now() |
| updated_at | timestamptz | DEFAULT now() |

#### Table `vitals`
| Colonne | Type | Contraintes |
|---------|------|-------------|
| id | uuid | PK |
| patient_id | uuid | FK references patients, NOT NULL |
| temperature | numeric(4,1) | NOT NULL |
| blood_pressure_systolic | integer | NOT NULL |
| blood_pressure_diastolic | integer | NOT NULL |
| heart_rate | integer | NOT NULL |
| oxygen_saturation | integer | CHECK (0-100) |
| respiratory_rate | integer | |
| recorded_by | uuid | FK references profiles |
| recorded_at | timestamptz | DEFAULT now() |

#### Table `appointments`
| Colonne | Type | Contraintes |
|---------|------|-------------|
| id | uuid | PK |
| patient_id | uuid | FK references patients |
| assigned_nurse_id | uuid | FK references profiles |
| appointment_type | text | NOT NULL |
| scheduled_date | date | NOT NULL |
| scheduled_time | time | NOT NULL |
| status | text | CHECK (scheduled/completed/cancelled/missed) |
| notes | text | DEFAULT '' |
| created_at | timestamptz | DEFAULT now() |

#### Table `alerts`
| Colonne | Type | Contraintes |
|---------|------|-------------|
| id | uuid | PK |
| patient_id | uuid | FK references patients, nullable |
| alert_type | text | CHECK (critical_patient/missing_data/ai_performance/system) |
| severity | text | CHECK (critical/warning/info) |
| title | text | NOT NULL |
| message | text | NOT NULL |
| is_read | boolean | DEFAULT false |
| created_by | uuid | FK references profiles |
| created_at | timestamptz | DEFAULT now() |
| resolved_at | timestamptz | nullable |

#### Table `activity_logs`
| Colonne | Type | Contraintes |
|---------|------|-------------|
| id | uuid | PK |
| user_id | uuid | FK references profiles |
| action | text | NOT NULL |
| resource_type | text | NOT NULL |
| resource_id | text | nullable |
| details | jsonb | DEFAULT '{}' |
| ip_address | text | DEFAULT '' |
| created_at | timestamptz | DEFAULT now() |

#### Table `medications`
| Colonne | Type | Contraintes |
|---------|------|-------------|
| id | uuid | PK |
| patient_id | uuid | FK references patients |
| medication_name | text | NOT NULL |
| dosage | text | NOT NULL |
| frequency | text | NOT NULL |
| adherence_rate | numeric(5,2) | DEFAULT 0, CHECK (0-100) |
| prescribed_by | uuid | FK references profiles |
| start_date | date | NOT NULL |
| end_date | date | nullable |
| created_at | timestamptz | DEFAULT now() |

#### Table `risk_factors`
| Colonne | Type | Contraintes |
|---------|------|-------------|
| id | uuid | PK |
| patient_id | uuid | FK references patients |
| factor_name | text | NOT NULL |
| factor_weight | numeric(5,4) | NOT NULL |
| factor_value | text | NOT NULL |
| created_at | timestamptz | DEFAULT now() |

#### Table `ai_predictions`
| Colonne | Type | Contraintes |
|---------|------|-------------|
| id | uuid | PK |
| patient_id | uuid | FK references patients |
| prediction_type | text | NOT NULL |
| predicted_value | numeric(5,2) | NOT NULL |
| confidence_score | numeric(5,2) | CHECK (0-100) |
| actual_outcome | numeric(5,2) | nullable |
| model_version | text | NOT NULL |
| features_used | jsonb | DEFAULT '{}' |
| created_at | timestamptz | DEFAULT now() |

#### Table `imported_datasets`
| Colonne | Type | Contraintes |
|---------|------|-------------|
| id | uuid | PK |
| imported_by | uuid | FK references profiles |
| filename | text | NOT NULL |
| record_count | integer | DEFAULT 0 |
| import_status | text | CHECK (pending/processing/completed/failed) |
| error_details | text | nullable |
| created_at | timestamptz | DEFAULT now() |

### 7.2 Securite - Row Level Security (RLS)

RLS est active sur toutes les tables. Les politiques definissent l'acces par role :

- **Medecins** : Lecture/ecriture sur leurs patients, acces aux predictions et alertes
- **Infirmiers** : Lecture des patients assignes, mise a jour des signes vitaux
- **Administrateurs** : Acces lecture large pour la gestion, ecriture sur les imports et journaux
- **Analystes** : Acces lecture pour les analyses et predictions
- **Patients** : Acces a leurs propres donnees uniquement

### 7.3 Index de Performance

19 index sont crees sur les colonnes les plus requetees :
- `idx_patients_doctor` sur attending_doctor_id
- `idx_patients_department` sur department
- `idx_patients_risk_level` sur risk_level
- `idx_patients_status` sur status
- `idx_vitals_patient` sur patient_id
- `idx_vitals_recorded_at` sur recorded_at
- `idx_appointments_patient` sur patient_id
- `idx_appointments_nurse` sur assigned_nurse_id
- `idx_appointments_date` sur scheduled_date
- `idx_alerts_patient` sur patient_id
- `idx_alerts_type` sur alert_type
- `idx_alerts_severity` sur severity
- `idx_activity_logs_user` sur user_id
- `idx_activity_logs_created` sur created_at
- `idx_medications_patient` sur patient_id
- `idx_risk_factors_patient` sur patient_id
- `idx_predictions_patient` sur patient_id
- `idx_predictions_type` sur prediction_type
- `idx_datasets_status` sur import_status

---

## 8. Donnees de Demonstration

Le fichier `mock-data.ts` contient des donnees realistes pour le developpement et les demonstrations :

| Collection | Quantite | Description |
|------------|----------|-------------|
| mockProfiles | 4 | Dr. Fatou Diallo, Aminata Ndiaye, Mamadou Sow, Dr. Khady Ba |
| mockPatients | 10 | Mix de departements, niveaux de risque et statuts |
| mockVitals | 10 | Signes vitaux enregistres |
| mockAppointments | 8 | Types variés, statuts mixtes |
| mockAlerts | 8 | Critiques, avertissements, info |
| mockActivityLogs | 10 | Piste d'audit multi-jours |
| mockMedications | 8 | Noms reels, adherence 60-98% |
| mockPredictions | 5 | Type readmission, confiance 82-97% |
| mockImportedDatasets | 5 | Statuts completes/processing/echoue |
| readmissionTrendData | 5 mois | Tendances Janvier-Mai |
| riskDistributionData | 3 niveaux | Haut:4, Moyen:3, Faible:3 |
| riskFactorsData | 6 facteurs | Poids des caracteristiques IA |
| departmentComparisonData | 5 departements | Taux readmission, score risque |
| aiAccuracyData | 6 semaines | Precision, rappel, exactitude |
| dataCompletenessData | 7 categories | Completude 67-98% |
| currentPatient | 1 | Ousmane Diop, 72 ans, Cardiologie |
| mockPatientVitals | 7 entrees | Tendance hebdomadaire |
| mockHospitalizations | 4 sejours | 1 en cours + 3 passes |
| mockMedicalDocuments | 5 docs | Echo, rapports, ordonnances |
| mockPatientNotifications | 6 notifs | Rappels, messages, alertes |
| mockTreatmentEntries | 6 entrees | Suivi adherence |
| mockSymptoms | 3 rapports | Severite legere/severe |
| mockMessages | 4 messages | Conversation medecin-patient |
| mockHealthTips | 4 conseils | Conseils sante |
| patientVitalsTrend | 7 jours | Tendance des constantes |
| patientAppointments | 5 RDV | Prochains rendez-vous |

---

## 9. Gestion des Roles (useRole)

Le hook `useRole` fournit un contexte React pour gerer le role actif de l'utilisateur.

```typescript
const { role, setRole } = useRole();
// role: UserRole ('doctor' | 'nurse' | 'admin' | 'analyst' | 'patient')
// setRole: (role: UserRole) => void
```

**Fonctionnement :**
1. `RoleProvider` englobe l'application dans `App.tsx`
2. Le role par defaut est `'doctor'`
3. Le Header contient des boutons pour basculer entre les roles
4. La Sidebar s'adapte automatiquement au role courant
5. Toutes les pages utilisent `useRole()` pour adapter leur contenu

---

## 10. Systeme de Style

### 10.1 Palette de Couleurs

| Usage | Couleur | Classes Tailwind |
|-------|---------|------------------|
| Primaire | Bleu | blue-50 a blue-700 |
| Succes | Vert | green-50 a green-700 |
| Attention | Ambre | amber-50 a amber-700 |
| Erreur | Rouge | red-50 a red-700 |
| Neutre | Ardoise | slate-50 a slate-900 |
| Secondaire | Sarcelle | teal-50 a teal-700 |

### 10.2 Conventions de Design

- **Arrondis** : `rounded-lg` (boutons), `rounded-xl` (cartes), `rounded-full` (avatars, badges)
- **Ombres** : `shadow-sm` (cartes), `shadow-md` (survol)
- **Espacement** : Base 4px (systeme Tailwind par defaut)
- **Typographie** : Inter (systeme), poids medium/semibold/bold
- **Transitions** : `transition-all duration-200` (interactions), `duration-300` (sidebar)
- **Scrollbars** : Personnalisees (6px, slate-300, hover slate-400)

### 10.3 Responsive

- Mobile first avec breakpoints Tailwind (`sm:`, `lg:`)
- Grilles adaptatives : 1 colonne mobile, 2 tablette, 4 desktop
- Sidebar reduisible (260px / 68px)
- Tables avec scroll horizontal sur petit ecran

---

## 11. Fonctionnalites Cles

### 11.1 Prediction de Readmission par IA
- Score de risque 0-100 par patient
- Niveaux : Eleve (>70), Moyen (40-70), Faible (<40)
- Modele v2.0 avec 92.8% de precision
- Facteurs : Antecedents d'admission, age, comorbidites, duree de sejour, mode de sortie, adherence medicamenteuse

### 11.2 Upload de Documents Medicaux (Dashboard Medecin)
- Selection du patient et categorie (resultat, ordonnance, rapport, imagerie, autre)
- Zone de telechargement drag & drop ou clic
- Support PDF, JPG, PNG, DICOM
- Affichage des derniers documents envoyes
- Message de confirmation apres envoi

### 11.3 Messagerie et Appels Video
- Interface de chat avec bulles stylees
- Liste de contacts avec statut en ligne
- Appels video avec miniature PiP
- Appels vocaux avec interface dediee
- Controles : micro, video, raccrocher, plein ecran
- Contacts adaptes par role

### 11.4 Monitoring en Temps Reel
- Signes vitaux : temperature, PA, FC, O2, frequence respiratoire
- Alertes critiques avec niveaux de severite
- Tableau de bord infirmier avec surveillance continue

### 11.5 Gestion Administrative
- CRUD utilisateurs et roles
- Import de donnees (CSV, Excel, JSON)
- Journal d'audit complet
- Surveillance de la performance IA
- Gestion des departements

---

## 12. Configuration et Deploiement

### 12.1 Variables d'Environnement (.env)

```
VITE_SUPABASE_URL=<url_supabase>
VITE_SUPABASE_ANON_KEY=<cle_anon_supabase>
```

### 12.2 Scripts Disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de developpement Vite (localhost:5173) |
| `npm run build` | Build de production dans dist/ |
| `npm run preview` | Apercu du build de production |
| `npm run lint` | Linting ESLint |
| `npm run typecheck` | Verification TypeScript |

### 12.3 Deploiement GitHub

Le projet est heberge sur : `https://github.com/AMG-TECH-SEVVY/healthpredict-ai`

---

## 13. Structure des Routes (Resume)

| Role | Nombre de routes | Route par defaut |
|------|-----------------|------------------|
| Medecin | 10 | `/doctor` |
| Infirmier | 10 | `/nurse` |
| Administrateur | 10 | `/admin` |
| Analyste | 11 | `/analyst` |
| Patient | 13 | `/patient` |
| **Total** | **54** | `/` (redirige vers `/doctor`) |

---

## 14. Securite

- **RLS** : Active sur toutes les tables Supabase
- **Politiques** : 20+ politiques d'acces basees sur l'authentification et l'appartenance
- **Cle anonyme** : Utilisee cote client avec restrictions RLS
- **Validation** : Types TypeScript stricts pour toutes les donnees
- **Contraintes BD** : CHECK constraints sur les colonnes critiques (risk_score, risk_level, status, etc.)

---

## 15. Auteurs et Contexte

- **Projet** : HealthPredict AI
- **Organisation** : AMG-TECH-SEVVY
- **Langue de l'interface** : Francais (contexte Senegal)
- **Donnees de test** : Noms senegalais (Diop, Ndiaye, Fall, Sow, Ba, Mboup)
