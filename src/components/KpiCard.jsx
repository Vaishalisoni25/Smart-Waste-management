import React from 'react';
import * as LucideIcons from 'lucide-react';

export default function KpiCard({
  title,
  value,
  unit = '',
  change,
  isPositive = true,
  subtitle,
  icon = 'Activity',
  theme = 'light', // 'light' | 'forest'
  onClick
}) {
  const IconComponent = LucideIcons[icon] || LucideIcons.Activity;

  if (theme === 'forest') {
    return (
      <div 
        onClick={onClick}
        className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a2d21] to-[#061e16] p-5 text-white shadow-lg border border-emerald-800/40 transition-all duration-300 hover:-translate-y-1 hover:border-[#a3e635]/60 hover:shadow-xl cursor-pointer"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#a3e635]/5 rounded-full blur-2xl group-hover:bg-[#a3e635]/15 transition-all pointer-events-none" />
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/90">{title}</span>
          <div className="w-10 h-10 rounded-xl bg-[#a3e635]/15 text-[#a3e635] flex items-center justify-center border border-[#a3e635]/20 group-hover:bg-[#a3e635] group-hover:text-[#061e16] transition-colors">
            <IconComponent className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white">{value}</span>
          {unit && <span className="text-sm font-medium text-emerald-300/80">{unit}</span>}
        </div>

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-emerald-800/50 text-xs">
          {change && (
            <span className={`inline-flex items-center gap-1 font-semibold ${isPositive ? 'text-[#a3e635]' : 'text-rose-400'}`}>
              {isPositive ? '↑' : '↓'} {change}
            </span>
          )}
          {subtitle && <span className="text-emerald-300/70 truncate">{subtitle}</span>}
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-white p-5 text-[#0d281e] shadow-sm border border-emerald-950/10 transition-all duration-300 hover:-translate-y-1 hover:border-[#84cc16]/50 hover:shadow-md cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-900/70">{title}</span>
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#166534] flex items-center justify-center border border-emerald-100 group-hover:bg-[#84cc16] group-hover:text-emerald-950 transition-colors">
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#0a2d21]">{value}</span>
        {unit && <span className="text-sm font-semibold text-emerald-700">{unit}</span>}
      </div>

      <div className="flex items-center justify-between mt-2 pt-2 border-t border-emerald-50 text-xs">
        {change && (
          <span className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
            {isPositive ? '↑' : '↓'} {change}
          </span>
        )}
        {subtitle && <span className="text-emerald-900/60 truncate">{subtitle}</span>}
      </div>
    </div>
  );
}
