import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Lock, Server, Cpu, Network } from 'lucide-react';
import { ClearanceLevel } from '../../types';

interface SecurityBannerProps {
  clearance?: ClearanceLevel;
}

export const SecurityBanner: React.FC<SecurityBannerProps> = ({ clearance }) => {
  const { currentUser } = useApp();
  const activeClearance = clearance || currentUser?.clearance || 'LEVEL_4_TOP_SECRET';

  const formatClearance = (lvl: string) => {
    switch (lvl) {
      case 'LEVEL_4_TOP_SECRET': return 'TOP SECRET // LEVEL 4';
      case 'LEVEL_3_SECRET': return 'SECRET // LEVEL 3';
      case 'LEVEL_2_CONFIDENTIAL': return 'CONFIDENTIAL // LEVEL 2';
      default: return 'RESTRICTED // LEVEL 1';
    }
  };

  return (
    <div className="w-full bg-[#070C15] border-b border-[#1E293B] text-white py-1.5 px-4 lg:px-8 text-[11px] select-none z-50 shrink-0">
      <div className="max-w-[1800px] mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
        
        {/* Left Security Classification & System Badge */}
        <div className="flex items-center gap-3 font-mono">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-[10px] tracking-wider uppercase">
            <Shield className="w-3 h-3 text-amber-400 animate-pulse" />
            <span>{formatClearance(activeClearance)}</span>
          </div>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
            GOVERNMENT OF INDIA • MINISTRY OF DEFENCE
          </span>
        </div>

        {/* Right Status Ribbon Badges with Green Indicators */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap text-[10px] font-mono">
          
          {/* System Status */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#0B1220] border border-[#1E293B] text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-400">System Status:</span>
            <span className="font-bold text-emerald-400">Online</span>
          </div>

          {/* Environment */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#0B1220] border border-[#1E293B] text-slate-300">
            <Server className="w-3 h-3 text-blue-400" />
            <span className="text-slate-400">Env:</span>
            <span className="font-bold text-slate-200">Production</span>
          </div>

          {/* Security */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#0B1220] border border-[#1E293B] text-slate-300">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span className="text-slate-400">Security:</span>
            <span className="font-bold text-emerald-300">AES-256 Encrypted</span>
          </div>

          {/* Clearance Level */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#0B1220] border border-[#1E293B] text-slate-300">
            <Shield className="w-3 h-3 text-amber-400" />
            <span className="text-slate-400">Clearance:</span>
            <span className="font-bold text-amber-300">{activeClearance.replace('LEVEL_', 'L').replace(/_/g, ' ')}</span>
          </div>

          {/* Knowledge Graph Status */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#0B1220] border border-[#1E293B] text-slate-300">
            <Network className="w-3 h-3 text-blue-400" />
            <span className="text-slate-400">Knowledge Graph:</span>
            <span className="relative flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            <span className="font-bold text-emerald-400">Synchronized</span>
          </div>

          {/* AI Engine Status */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#0B1220] border border-[#1E293B] text-slate-300">
            <Cpu className="w-3 h-3 text-indigo-400" />
            <span className="text-slate-400">AI Engine:</span>
            <span className="relative flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            <span className="font-bold text-emerald-400">Gemini 2.5 Active</span>
          </div>

        </div>

      </div>
    </div>
  );
};

