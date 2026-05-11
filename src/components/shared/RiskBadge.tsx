interface RiskBadgeProps {
  level: 'high' | 'medium' | 'low';
}

const config = {
  high: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500', label: 'Eleve' },
  medium: { bg: 'bg-amber-100', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Moyen' },
  low: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500', label: 'Faible' },
};

export default function RiskBadge({ level }: RiskBadgeProps) {
  const c = config[level];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}
