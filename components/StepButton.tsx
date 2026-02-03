import React from 'react';
import { CheckCircle2, Circle, ExternalLink } from 'lucide-react';

interface StepButtonProps {
  id: number;
  label: string;
  isClicked: boolean;
  onClick: () => void;
  index: number; // Added index for staggered animation
}

export const StepButton: React.FC<StepButtonProps> = ({ id, label, isClicked, onClick, index }) => {
  return (
    <button
      onClick={onClick}
      style={{ animationDelay: `${index * 100}ms` }} // Staggered delay based on index
      className={`
        opacity-0 animate-fade-in-up
        group relative w-full flex items-center justify-between p-4 md:p-5 mb-4 rounded-xl border transition-all duration-300 transform active:scale-[0.98]
        ${
          isClicked
            ? 'bg-zinc-900/50 border-gold-600/30 text-gold-500 shadow-[0_0_15px_rgba(234,179,8,0.1)]'
            : 'bg-zinc-800/80 border-zinc-700 text-white hover:bg-zinc-700 hover:border-zinc-500 shadow-lg'
        }
      `}
    >
      <div className="flex items-center gap-4">
        <div className={`
          flex items-center justify-center w-10 h-10 min-w-[2.5rem] rounded-full transition-all duration-500
          ${isClicked ? 'bg-gold-500 text-black rotate-0' : 'bg-zinc-900 text-zinc-500'}
        `}>
          {isClicked ? <CheckCircle2 size={24} /> : <span className="font-bold">{id}</span>}
        </div>
        <div className="flex flex-col items-start text-left">
          <span className={`text-base md:text-lg font-bold ${isClicked ? 'text-gold-400' : 'text-gray-100'}`}>
            {label}
          </span>
          <span className="text-[10px] md:text-xs text-gray-400 font-medium uppercase tracking-wider">
            {isClicked ? 'Completed' : 'Tap to open'}
          </span>
        </div>
      </div>
      
      <ExternalLink 
        size={20} 
        className={`transition-opacity duration-300 ${isClicked ? 'opacity-0' : 'opacity-50 group-hover:opacity-100'}`} 
      />
      
      {/* Progress Line Connector */}
      <div className="absolute left-[2.4rem] md:left-[2.4rem] -bottom-6 w-0.5 h-4 bg-zinc-800 -z-10 last:hidden"></div>
    </button>
  );
};