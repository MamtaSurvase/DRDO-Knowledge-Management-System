import React from 'react';
import { ClearanceLevel } from '../../types';
import { ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

interface ClearanceBadgeProps {
  level: ClearanceLevel;
  size?: 'sm' | 'md' | 'lg';
}

export const ClearanceBadge: React.FC<ClearanceBadgeProps> = ({ level, size = 'sm' }) => {
  const getConfig = () => {
    switch (level) {
      case 'LEVEL_4_TOP_SECRET':
        return {
          label: 'L4 TOP SECRET',
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          icon: ShieldAlert
        };
      case 'LEVEL_3_SECRET':
        return {
          label: 'L3 SECRET',
          bg: 'bg-red-500/10 text-red-400 border-red-500/30',
          icon: ShieldCheck
        };
      case 'LEVEL_2_CONFIDENTIAL':
        return {
          label: 'L2 CONFIDENTIAL',
          bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
          icon: Shield
        };
      default:
        return {
          label: 'L1 RESTRICTED',
          bg: 'bg-slate-500/10 text-slate-300 border-slate-500/30',
          icon: Shield
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2 font-semibold'
  }[size];

  return (
    <span className={`inline-flex items-center font-mono rounded-full border ${config.bg} ${sizeClasses}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
};
