import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RoleProvider } from './hooks/useRole';
import Layout from './components/shared/Layout';

import DoctorDashboard from './pages/doctor/Dashboard';
import PatientManagement from './pages/doctor/Patients';
import RiskPrediction from './pages/doctor/RiskPrediction';
import DoctorFollowUp from './pages/doctor/FollowUp';
import DoctorAnalytics from './pages/doctor/Analytics';
import DoctorAlerts from './pages/doctor/Alerts';
import ReadmissionHistory from './pages/doctor/ReadmissionHistory';
import DoctorSettings from './pages/doctor/Settings';
import DoctorProfile from './pages/doctor/Profile';

import NurseDashboard from './pages/nurse/Dashboard';
import PatientMonitoring from './pages/nurse/Monitoring';
import UpdatePatient from './pages/nurse/UpdatePatient';
import NurseAppointments from './pages/nurse/Appointments';
import VitalSigns from './pages/nurse/Vitals';
import MissingData from './pages/nurse/MissingData';
import NurseFollowUp from './pages/nurse/FollowUp';
import NurseNotifications from './pages/nurse/Notifications';
import EmergencyAlerts from './pages/nurse/Emergency';

import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/Users';
import RoleManagement from './pages/admin/Roles';
import HospitalStats from './pages/admin/Stats';
import ImportData from './pages/admin/ImportData';
import ActivityLogs from './pages/admin/ActivityLogs';
import AIMonitoring from './pages/admin/AIMonitoring';
import Departments from './pages/admin/Departments';
import AdminSettings from './pages/admin/Settings';

import AnalystDashboard from './pages/analyst/Dashboard';
import ReadmissionAnalytics from './pages/analyst/Readmission';
import AIModelMonitor from './pages/analyst/AIModel';
import DataQuality from './pages/analyst/DataQuality';
import PredictiveReports from './pages/analyst/Predictive';
import HospitalPerformance from './pages/analyst/Performance';
import MLInsights from './pages/analyst/MLInsights';
import KPIsDashboard from './pages/analyst/KPIs';
import DataVisualization from './pages/analyst/Visualization';
import AnalystReports from './pages/analyst/Reports';

import PatientDashboard from './pages/patient/Dashboard';
import PatientVitals from './pages/patient/Vitals';
import PatientAppointments from './pages/patient/Appointments';
import PatientNotifications from './pages/patient/Notifications';
import HospitalizationHistory from './pages/patient/HospitalizationHistory';
import MedicalResults from './pages/patient/MedicalResults';
import PatientDocuments from './pages/patient/Documents';
import PatientProfile from './pages/patient/Profile';
import RiskLevel from './pages/patient/RiskLevel';
import TreatmentAdherence from './pages/patient/TreatmentAdherence';
import SymptomReport from './pages/patient/SymptomReport';
import PostHospitalizationFollowUp from './pages/patient/PostHospitalizationFollowUp';
import Communication from './pages/patient/Communication';
import Messaging from './components/shared/Messaging';

function App() {
  return (
    <RoleProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/doctor" replace />} />

            {/* Doctor Routes */}
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/doctor/patients" element={<PatientManagement />} />
            <Route path="/doctor/risk-prediction" element={<RiskPrediction />} />
            <Route path="/doctor/follow-up" element={<DoctorFollowUp />} />
            <Route path="/doctor/analytics" element={<DoctorAnalytics />} />
            <Route path="/doctor/alerts" element={<DoctorAlerts />} />
            <Route path="/doctor/readmission-history" element={<ReadmissionHistory />} />
            <Route path="/doctor/settings" element={<DoctorSettings />} />
            <Route path="/doctor/profile" element={<DoctorProfile />} />
            <Route path="/doctor/messages" element={<Messaging />} />

            {/* Nurse Routes */}
            <Route path="/nurse" element={<NurseDashboard />} />
            <Route path="/nurse/monitoring" element={<PatientMonitoring />} />
            <Route path="/nurse/update" element={<UpdatePatient />} />
            <Route path="/nurse/appointments" element={<NurseAppointments />} />
            <Route path="/nurse/vitals" element={<VitalSigns />} />
            <Route path="/nurse/missing-data" element={<MissingData />} />
            <Route path="/nurse/follow-up" element={<NurseFollowUp />} />
            <Route path="/nurse/notifications" element={<NurseNotifications />} />
            <Route path="/nurse/emergency" element={<EmergencyAlerts />} />
            <Route path="/nurse/messages" element={<Messaging />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/roles" element={<RoleManagement />} />
            <Route path="/admin/stats" element={<HospitalStats />} />
            <Route path="/admin/import" element={<ImportData />} />
            <Route path="/admin/activity-logs" element={<ActivityLogs />} />
            <Route path="/admin/ai-monitoring" element={<AIMonitoring />} />
            <Route path="/admin/departments" element={<Departments />} />
            <Route path="/admin/messages" element={<Messaging />} />
            <Route path="/admin/settings" element={<AdminSettings />} />

            {/* Analyst Routes */}
            <Route path="/analyst" element={<AnalystDashboard />} />
            <Route path="/analyst/readmission" element={<ReadmissionAnalytics />} />
            <Route path="/analyst/ai-model" element={<AIModelMonitor />} />
            <Route path="/analyst/data-quality" element={<DataQuality />} />
            <Route path="/analyst/predictive" element={<PredictiveReports />} />
            <Route path="/analyst/performance" element={<HospitalPerformance />} />
            <Route path="/analyst/ml-insights" element={<MLInsights />} />
            <Route path="/analyst/kpis" element={<KPIsDashboard />} />
            <Route path="/analyst/visualization" element={<DataVisualization />} />
            <Route path="/analyst/reports" element={<AnalystReports />} />
            <Route path="/analyst/messages" element={<Messaging />} />

            {/* Patient Routes */}
            <Route path="/patient" element={<PatientDashboard />} />
            <Route path="/patient/vitals" element={<PatientVitals />} />
            <Route path="/patient/appointments" element={<PatientAppointments />} />
            <Route path="/patient/notifications" element={<PatientNotifications />} />
            <Route path="/patient/hospitalizations" element={<HospitalizationHistory />} />
            <Route path="/patient/results" element={<MedicalResults />} />
            <Route path="/patient/documents" element={<PatientDocuments />} />
            <Route path="/patient/profile" element={<PatientProfile />} />
            <Route path="/patient/risk" element={<RiskLevel />} />
            <Route path="/patient/treatment" element={<TreatmentAdherence />} />
            <Route path="/patient/symptoms" element={<SymptomReport />} />
            <Route path="/patient/follow-up" element={<PostHospitalizationFollowUp />} />
            <Route path="/patient/communication" element={<Communication />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RoleProvider>
  );
}

export default App;
