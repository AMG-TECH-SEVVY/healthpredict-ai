import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: { value: number; positive: boolean };
  color?: 'blue' | 'red' | 'amber' | 'green' | 'slate' | 'teal';
}

const colorMap = {
  blue: { bg: 'bg-blue-50', icon: 'bg-blue-100 text-blue-600', border: 'border-blue-100' },
  red: { bg: 'bg-red-50', icon: 'bg-red-100 text-red-600', border: 'border-red-100' },
  amber: { bg: 'bg-amber-50', icon: 'bg-amber-100 text-amber-600', border: 'border-amber-100' },
  green: { bg: 'bg-green-50', icon: 'bg-green-100 text-green-600', border: 'border-green-100' },
  slate: { bg: 'bg-slate-50', icon: 'bg-slate-100 text-slate-600', border: 'border-slate-100' },
  teal: { bg: 'bg-teal-50', icon: 'bg-teal-100 text-teal-600', border: 'border-teal-100' },
};

export default function StatCard({ title, value, subtitle, icon, trend, color = 'blue' }: StatCardProps) {
  const c = colorMap[color];
  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} p-5 transition-shadow hover:shadow-md`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
          {trend && (
            <p className={`mt-1 text-xs font-medium ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.positive ? '+' : ''}{trend.value}% vs last month
            </p>
          )}
        </div>
        <div className={`w-10 h-10 rounded-lg ${c.icon} flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
