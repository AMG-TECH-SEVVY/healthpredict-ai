import { NavLink } from 'react-router-dom';
import { useRole } from '../../hooks/useRole';
import type { UserRole } from '../../types';
import { LayoutDashboard, Users, Brain, HeartPulse, BarChart3, Bell, History, Settings, CircleUser as UserCircle, ClipboardList, Activity, FileUp, Shield, Database, TrendingUp, FileText, Stethoscope, CalendarCheck, AlertTriangle, ChevronLeft, ChevronRight, Thermometer, Calendar, FileText as Documents, MessageSquare, Pill, AlertCircle, ClipboardCheck } from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const navByRole: Record<UserRole, NavItem[]> = {
  doctor: [
    { label: 'Tableau de Bord', icon: <LayoutDashboard size={20} />, path: '/doctor' },
    { label: 'Patients', icon: <Users size={20} />, path: '/doctor/patients' },
    { label: 'Prediction Risque', icon: <Brain size={20} />, path: '/doctor/risk-prediction' },
    { label: 'Suivi Patients', icon: <HeartPulse size={20} />, path: '/doctor/follow-up' },
    { label: 'Analyses', icon: <BarChart3 size={20} />, path: '/doctor/analytics' },
    { label: 'Alertes', icon: <Bell size={20} />, path: '/doctor/alerts' },
    { label: 'Historique Readmissions', icon: <History size={20} />, path: '/doctor/readmission-history' },
    { label: 'Messages & Appels', icon: <MessageSquare size={20} />, path: '/doctor/messages' },
    { label: 'Parametres', icon: <Settings size={20} />, path: '/doctor/settings' },
    { label: 'Profil', icon: <UserCircle size={20} />, path: '/doctor/profile' },
  ],
  nurse: [
    { label: 'Tableau de Bord', icon: <LayoutDashboard size={20} />, path: '/nurse' },
    { label: 'Surveillance Patients', icon: <Activity size={20} />, path: '/nurse/monitoring' },
    { label: 'Mise a Jour Patient', icon: <ClipboardList size={20} />, path: '/nurse/update' },
    { label: 'Rendez-vous', icon: <CalendarCheck size={20} />, path: '/nurse/appointments' },
    { label: 'Signes Vitaux', icon: <HeartPulse size={20} />, path: '/nurse/vitals' },
    { label: 'Donnees Manquantes', icon: <AlertTriangle size={20} />, path: '/nurse/missing-data' },
    { label: 'Suivi Quotidien', icon: <Stethoscope size={20} />, path: '/nurse/follow-up' },
    { label: 'Notifications', icon: <Bell size={20} />, path: '/nurse/notifications' },
    { label: 'Alertes Urgence', icon: <AlertTriangle size={20} />, path: '/nurse/emergency' },
    { label: 'Messages & Appels', icon: <MessageSquare size={20} />, path: '/nurse/messages' },
  ],
  admin: [
    { label: 'Tableau de Bord', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { label: 'Gestion Utilisateurs', icon: <Users size={20} />, path: '/admin/users' },
    { label: 'Roles & Permissions', icon: <Shield size={20} />, path: '/admin/roles' },
    { label: 'Statistiques Hopital', icon: <BarChart3 size={20} />, path: '/admin/stats' },
    { label: 'Import Donnees', icon: <FileUp size={20} />, path: '/admin/import' },
    { label: 'Journal Activite', icon: <History size={20} />, path: '/admin/activity-logs' },
    { label: 'Surveillance IA', icon: <Brain size={20} />, path: '/admin/ai-monitoring' },
    { label: 'Departements', icon: <Database size={20} />, path: '/admin/departments' },
    { label: 'Messages & Appels', icon: <MessageSquare size={20} />, path: '/admin/messages' },
    { label: 'Parametres Systeme', icon: <Settings size={20} />, path: '/admin/settings' },
  ],
  analyst: [
    { label: 'Tableau de Bord', icon: <LayoutDashboard size={20} />, path: '/analyst' },
    { label: 'Analyses Readmission', icon: <TrendingUp size={20} />, path: '/analyst/readmission' },
    { label: 'Modele IA', icon: <Brain size={20} />, path: '/analyst/ai-model' },
    { label: 'Qualite Donnees', icon: <Database size={20} />, path: '/analyst/data-quality' },
    { label: 'Rapports Predictifs', icon: <FileText size={20} />, path: '/analyst/predictive' },
    { label: 'Performance Hopital', icon: <BarChart3 size={20} />, path: '/analyst/performance' },
    { label: 'Insights ML', icon: <Brain size={20} />, path: '/analyst/ml-insights' },
    { label: 'Tableau KPIs', icon: <Activity size={20} />, path: '/analyst/kpis' },
    { label: 'Visualisation Donnees', icon: <BarChart3 size={20} />, path: '/analyst/visualization' },
    { label: 'Rapports', icon: <FileText size={20} />, path: '/analyst/reports' },
    { label: 'Messages & Appels', icon: <MessageSquare size={20} />, path: '/analyst/messages' },
  ],
  patient: [
    { label: 'Tableau de Bord', icon: <LayoutDashboard size={20} />, path: '/patient' },
    { label: 'Signes Vitaux', icon: <Thermometer size={20} />, path: '/patient/vitals' },
    { label: 'Rendez-vous', icon: <Calendar size={20} />, path: '/patient/appointments' },
    { label: 'Notifications', icon: <Bell size={20} />, path: '/patient/notifications' },
    { label: 'Hospitalisations', icon: <History size={20} />, path: '/patient/hospitalizations' },
    { label: 'Resultats Medicaux', icon: <FileText size={20} />, path: '/patient/results' },
    { label: 'Documents', icon: <Documents size={20} />, path: '/patient/documents' },
    { label: 'Niveau de Risque', icon: <AlertCircle size={20} />, path: '/patient/risk' },
    { label: 'Traitement', icon: <Pill size={20} />, path: '/patient/treatment' },
    { label: 'Signaler Symptome', icon: <AlertTriangle size={20} />, path: '/patient/symptoms' },
    { label: 'Suivi Post-Hospit.', icon: <ClipboardCheck size={20} />, path: '/patient/follow-up' },
    { label: 'Messages', icon: <MessageSquare size={20} />, path: '/patient/communication' },
    { label: 'Mon Profil', icon: <UserCircle size={20} />, path: '/patient/profile' },
  ],
};

const roleLabels: Record<UserRole, string> = {
  doctor: 'Medecin',
  nurse: 'Infirmier(e)',
  admin: 'Administrateur',
  analyst: 'Analyste Donnees',
  patient: 'Patient',
};

export default function Sidebar() {
  const { role } = useRole();
  const [collapsed, setCollapsed] = useState(false);
  const items = navByRole[role];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-slate-900 text-white flex flex-col transition-all duration-300 z-40 ${
        collapsed ? 'w-[68px]' : 'w-[260px]'
      }`}
    >
      <div className="flex items-center gap-3 px-4 h-16 border-b border-slate-700/50">
        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
          <Activity size={20} className="text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-bold tracking-tight text-white whitespace-nowrap">HealthPredict AI</h1>
            <p className="text-[10px] text-slate-400 whitespace-nowrap">Vue {roleLabels[role]}</p>
          </div>
        )}
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === `/${role}`}
            className={({ isActive }) =>
              `flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 font-medium'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-10 border-t border-slate-700/50 text-slate-400 hover:text-white transition-colors"
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </aside>
  );
}
