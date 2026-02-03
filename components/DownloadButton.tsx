import React from 'react';
import { Lock, Download, Sparkles } from 'lucide-react';

interface DownloadButtonProps {
  isUnlocked: boolean;
  progress: number;
  total: number;
  onClick: () => void;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ isUnlocked, progress, total, onClick }) => {
  return (
    <div className="mt-8 w-full">
      <div className="flex justify-between items-end mb-2 px-1">
        <span className="text-sm font-medium text-gray-400">Progress</span>
        <span className={`text-sm font-bold ${isUnlocked ? 'text-gold-400' : 'text-gray-500'}`}>
          {progress} / {total}
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-6">
        <div 
          className="h-full bg-gradient-to-r from-yellow-700 to-yellow-400 transition-all duration-500 ease-out"
          style={{ width: `${(progress / total) * 100}%` }}
        ></div>
      </div>

      <button
        onClick={onClick}
        disabled={!isUnlocked}
        className={`
          relative w-full py-5 px-6 rounded-2xl flex items-center justify-center gap-3 font-extrabold text-xl tracking-wide uppercase transition-all duration-300
          ${
            isUnlocked
              ? 'bg-gradient-to-r from-yellow-600 to-yellow-400 text-black shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:shadow-[0_0_50px_rgba(234,179,8,0.6)] hover:scale-[1.02] active:scale-95 animate-pulse-slow cursor-pointer'
              : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50'
          }
        `}
      >
        {isUnlocked ? (
          <>
            <Download className="animate-bounce-small" size={28} />
            <span>Download Beat</span>
            <Sparkles className="absolute top-2 right-3 text-yellow-100 opacity-50" size={16} />
            <Sparkles className="absolute bottom-3 left-4 text-yellow-100 opacity-30" size={12} />
          </>
        ) : (
          <>
            <Lock size={24} />
            <span>Beat Locked</span>
          </>
        )}
      </button>
      
      {!isUnlocked && (
        <p className="text-center text-xs text-gray-500 mt-3">
          Complete all {total} steps to unlock.
        </p>
      )}
    </div>
  );
};