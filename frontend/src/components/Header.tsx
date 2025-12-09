import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  status?: 'speaking' | 'listening' | 'connected' | 'disconnected';
}

export const Header: React.FC<HeaderProps> = ({ status }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center pointer-events-none">
      {/* Brand */}
      <div className="flex items-center gap-2 pointer-events-auto bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-white/50">
        <Sparkles className="text-primary w-5 h-5" />
        <span className="font-bold text-gray-800 tracking-tight">INT. AI</span>
      </div>

      {/* Status Pill */}
      {status && status !== 'disconnected' && (
        <div className="flex items-center gap-2 pointer-events-auto bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-white/50 transition-all duration-500">
          <div className="relative flex h-2.5 w-2.5">
            {(status === 'speaking' || status === 'listening') && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              status === 'speaking' ? 'bg-green-500' : 
              status === 'listening' ? 'bg-indigo-500' : 'bg-gray-400'
            }`}></span>
          </div>
          <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">
            {status}
          </span>
        </div>
      )}
    </nav>
  );
};