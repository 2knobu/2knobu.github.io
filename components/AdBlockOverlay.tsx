import React, { useState } from 'react';
import { ShieldAlert, RefreshCw, XCircle } from 'lucide-react';
import { checkAdBlock } from '../hooks/useAdBlockDetector';

export const AdBlockOverlay: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'checking' | 'detected'>('idle');

  const handleVerify = async () => {
    setStatus('checking');
    
    // Add a small artificial delay so the user sees the "Checking..." state
    await new Promise(r => setTimeout(r, 800));

    const isBlocked = await checkAdBlock();
    
    if (isBlocked) {
      setStatus('detected');
    } else {
      // If it's cleared, we reload the page to ensure all scripts load correctly
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-6">
      <div className="bg-zinc-900 border border-red-900/50 p-8 rounded-2xl max-w-md w-full text-center shadow-[0_0_50px_rgba(220,38,38,0.2)] animate-in fade-in zoom-in duration-300">
        <div className="mx-auto w-20 h-20 bg-red-900/20 rounded-full flex items-center justify-center mb-6 relative">
          <ShieldAlert size={40} className="text-red-500" />
          {status === 'detected' && (
            <div className="absolute -right-1 -top-1 bg-red-500 rounded-full p-1 animate-ping"></div>
          )}
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-3">AdBlock Detected</h2>
        
        <p className="text-gray-400 mb-8 leading-relaxed">
          Our content is free thanks to our sponsors. Please disable your ad blocker to continue and access the download link.
        </p>
        
        <button 
          onClick={handleVerify}
          disabled={status === 'checking'}
          className={`
            w-full py-4 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2
            ${status === 'detected' 
                ? 'bg-red-600 text-white animate-bounce-small hover:bg-red-700 shadow-[0_0_20px_rgba(220,38,38,0.5)]' 
                : 'bg-zinc-800 hover:bg-zinc-700 text-white'
            }
          `}
        >
          {status === 'idle' && (
            <span>I've Disabled It</span>
          )}
          
          {status === 'checking' && (
            <>
              <RefreshCw className="animate-spin" size={20} />
              <span>Verifying...</span>
            </>
          )}

          {status === 'detected' && (
            <>
              <XCircle size={20} />
              <span>Still Active! Turn it off & Try Again</span>
            </>
          )}
        </button>
        
        <p className="mt-4 text-xs text-gray-600">
          If you are seeing this by mistake, try opening this page in a different browser.
        </p>
      </div>
    </div>
  );
};