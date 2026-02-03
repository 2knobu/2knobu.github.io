import React, { useState, useEffect } from 'react';
import { StepButton } from './components/StepButton';
import { DownloadButton } from './components/DownloadButton';
import { AdBlockOverlay } from './components/AdBlockOverlay';
import { useAdBlockDetector } from './hooks/useAdBlockDetector';
import { STEP_LINKS, APP_CONFIG } from './constants';
import { FileText, ShieldCheck, Music2 } from 'lucide-react';

// Use a Set-like structure (array of IDs) to track clicks
type ClickedStepsState = number[];

const App: React.FC = () => {
  const [clickedSteps, setClickedSteps] = useState<ClickedStepsState>([]);
  const isAdBlockDetected = useAdBlockDetector();

  // Handle clicking a step
  const handleStepClick = (id: number, url: string) => {
    // Open in new tab
    window.open(url, '_blank');
    
    // Add to clicked state if not already there
    setClickedSteps((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  // Check if all steps are done
  const totalSteps = STEP_LINKS.length;
  const isUnlocked = clickedSteps.length === totalSteps;

  // Handle final download click
  const handleDownloadClick = () => {
    if (isUnlocked) {
      window.location.href = APP_CONFIG.finalUrl;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-zinc-900 to-yellow-950/40 text-white font-sans overflow-x-hidden selection:bg-gold-500/30">
      
      {/* AdBlock Protection */}
      {isAdBlockDetected && <AdBlockOverlay />}

      {/* Main Container */}
      <main className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        
        {/* Header Section */}
        <header className="text-center mb-10 max-w-md w-full animate-fade-in-up">
          <div className="inline-flex items-center justify-center p-3 bg-zinc-800/50 rounded-2xl mb-4 border border-zinc-700/50 backdrop-blur-md">
            <Music2 className="text-gold-500 mr-2" size={24} />
            <span className="text-xs md:text-sm font-bold tracking-widest text-gray-300 uppercase">Secure File Transfer</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-4 drop-shadow-sm leading-tight">
            {APP_CONFIG.title}
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed px-2">
            {APP_CONFIG.subtitle}
          </p>
        </header>

        {/* Card Container */}
        <div className="w-full max-w-md relative">
            
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-3xl -z-10 border border-white/10 shadow-2xl animate-fade-in-up" style={{ animationDelay: '100ms' }}></div>

            <div className="p-5 md:p-8">
              
              {/* Steps List */}
              <div className="space-y-4">
                {STEP_LINKS.map((step, index) => (
                  <StepButton
                    key={step.id}
                    id={step.id}
                    label={step.label}
                    isClicked={clickedSteps.includes(step.id)}
                    onClick={() => handleStepClick(step.id, step.url)}
                    index={index}
                  />
                ))}
              </div>

              {/* Progress Connector (CSS trick for visual vertical line) */}
              <div className="absolute left-[3.65rem] md:left-[4.4rem] top-12 bottom-48 w-0.5 bg-zinc-800 -z-20 hidden md:block opacity-30"></div>

              {/* Download Section */}
              <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                <DownloadButton 
                    isUnlocked={isUnlocked}
                    progress={clickedSteps.length}
                    total={totalSteps}
                    onClick={handleDownloadClick}
                />
              </div>
            </div>

            {/* Footer / Trust Badges */}
            <div className="mt-6 text-center opacity-0 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
              <div className="flex items-center justify-center gap-2 text-zinc-500 text-xs">
                 <ShieldCheck size={14} />
                 <span>Verified Secure • Virus Free • High Speed</span>
              </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;