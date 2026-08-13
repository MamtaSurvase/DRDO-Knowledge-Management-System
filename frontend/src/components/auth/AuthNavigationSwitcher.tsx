import React from 'react';
import { useApp } from '../../context/AppContext';
import { KeyRound, Mail, Lock, ShieldCheck, Globe } from 'lucide-react';

export const AuthNavigationSwitcher: React.FC = () => {
  const { activePage, setActivePage } = useApp();

  const isLandingActive = activePage === 'landing' || activePage === 'dkip_landing';
  const isLoginActive = activePage === 'login' || activePage === 'login_page';
  const isRequestAccessActive = activePage === 'request_access' || activePage === 'register' || activePage === 'create_account';
  const isForgotPasswordActive = activePage === 'forgot_password';
  const isResetPasswordActive = activePage === 'reset_password';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-12 sm:h-13 bg-[#070D18]/95 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between text-xs shadow-lg">
      {/* Left side: Status Dot + Title */}
      <div className="flex items-center space-x-2 shrink-0">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        <span className="font-mono font-bold text-slate-300 uppercase tracking-wider text-[11px] sm:text-xs">
          DRDO PORTAL SWITCHER:
        </span>
      </div>

      {/* Right side: Navigation Items */}
      <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto scrollbar-none py-1">
        {/* Landing Page */}
        <button
          type="button"
          onClick={() => setActivePage('landing')}
          className={`px-2.5 py-1.5 rounded-md font-sans text-xs transition-all flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
            isLandingActive
              ? 'bg-blue-600/20 text-white border border-blue-500/50 shadow-[0_0_12px_rgba(37,99,235,0.3)] font-semibold'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent hover:border-slate-700/60 font-medium'
          }`}
        >
          <Globe className={`w-3.5 h-3.5 ${isLandingActive ? 'text-blue-400' : 'text-slate-400'}`} />
          <span>Landing Page</span>
        </button>

        {/* Login */}
        <button
          type="button"
          onClick={() => setActivePage('login')}
          className={`px-2.5 py-1.5 rounded-md font-sans text-xs transition-all flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
            isLoginActive
              ? 'bg-blue-600/20 text-white border border-blue-500/50 shadow-[0_0_12px_rgba(37,99,235,0.3)] font-semibold'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent hover:border-slate-700/60 font-medium'
          }`}
        >
          <KeyRound className={`w-3.5 h-3.5 ${isLoginActive ? 'text-blue-400' : 'text-slate-400'}`} />
          <span>Login</span>
        </button>

        {/* Request Access */}
        <button
          type="button"
          onClick={() => setActivePage('request_access')}
          className={`px-2.5 py-1.5 rounded-md font-sans text-xs transition-all flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
            isRequestAccessActive
              ? 'bg-blue-600/20 text-white border border-blue-500/50 shadow-[0_0_12px_rgba(37,99,235,0.3)] font-semibold'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent hover:border-slate-700/60 font-medium'
          }`}
        >
          <ShieldCheck className={`w-3.5 h-3.5 ${isRequestAccessActive ? 'text-blue-400' : 'text-slate-400'}`} />
          <span>Request Access</span>
        </button>

        {/* Forgot Password */}
        <button
          type="button"
          onClick={() => setActivePage('forgot_password')}
          className={`px-2.5 py-1.5 rounded-md font-sans text-xs transition-all flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
            isForgotPasswordActive
              ? 'bg-blue-600/20 text-white border border-blue-500/50 shadow-[0_0_12px_rgba(37,99,235,0.3)] font-semibold'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent hover:border-slate-700/60 font-medium'
          }`}
        >
          <Mail className={`w-3.5 h-3.5 ${isForgotPasswordActive ? 'text-blue-400' : 'text-slate-400'}`} />
          <span>Forgot Password</span>
        </button>

        {/* Reset Password */}
        <button
          type="button"
          onClick={() => setActivePage('reset_password')}
          className={`px-2.5 py-1.5 rounded-md font-sans text-xs transition-all flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
            isResetPasswordActive
              ? 'bg-blue-600/20 text-white border border-blue-500/50 shadow-[0_0_12px_rgba(37,99,235,0.3)] font-semibold'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent hover:border-slate-700/60 font-medium'
          }`}
        >
          <Lock className={`w-3.5 h-3.5 ${isResetPasswordActive ? 'text-blue-400' : 'text-slate-400'}`} />
          <span>Reset Password</span>
        </button>
      </div>
    </nav>
  );
};

