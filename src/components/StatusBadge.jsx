import React from 'react';

export default function StatusBadge({ status, size = 'md' }) {
  const getStyle = () => {
    const s = String(status || '').toLowerCase();
    if (s.includes('active') || s.includes('online') || s.includes('completed') || s.includes('resolved') || s.includes('paid') || s.includes('compliant') || s.includes('optimal')) {
      return {
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
        dot: 'bg-emerald-500 ring-emerald-300'
      };
    }
    if (s.includes('pending') || s.includes('progress') || s.includes('warning') || s.includes('en route') || s.includes('dispatched') || s.includes('arrears')) {
      return {
        bg: 'bg-amber-50 text-amber-800 border-amber-200/80',
        dot: 'bg-amber-500 ring-amber-300'
      };
    }
    if (s.includes('critical') || s.includes('issue') || s.includes('alert') || s.includes('overdue') || s.includes('failed') || s.includes('non-compliant')) {
      return {
        bg: 'bg-rose-50 text-rose-800 border-rose-200/80',
        dot: 'bg-rose-500 ring-rose-300'
      };
    }
    return {
      bg: 'bg-emerald-900/10 text-emerald-900 border-emerald-900/20',
      dot: 'bg-emerald-600 ring-emerald-200'
    };
  };

  const style = getStyle();
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-semibold border ${style.bg} ${sizeClasses} shadow-xs`}>
      <span className={`w-1.5 h-1.5 rounded-full ring-2 ${style.dot} animate-pulse`} />
      {status}
    </span>
  );
}
