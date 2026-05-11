interface StatusBadgeProps {
  status: 'admitted' | 'discharged' | 'critical' | 'scheduled' | 'completed' | 'cancelled' | 'missed' | 'pending' | 'processing' | 'failed';
}

const config: Record<string, { bg: string; text: string; label: string }> = {
  admitted: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Admis' },
  discharged: { bg: 'bg-green-100', text: 'text-green-700', label: 'Sorti' },
  critical: { bg: 'bg-red-100', text: 'text-red-700', label: 'Critique' },
  scheduled: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Programme' },
  completed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Termine' },
  cancelled: { bg: 'bg-slate-100', text: 'text-slate-700', label: 'Annule' },
  missed: { bg: 'bg-red-100', text: 'text-red-700', label: 'Manque' },
  pending: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'En attente' },
  processing: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'En cours' },
  failed: { bg: 'bg-red-100', text: 'text-red-700', label: 'Echoue' },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const c = config[status] || config.admitted;
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      {c.label}
    </span>
  );
}
