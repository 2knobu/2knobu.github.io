// --- Main React Application ---
// This file contains the Header, Navigation, Footer, and Logic.
// It reads content from window.APP_CONFIG which is defined in the HTML shell.

const { useState, useEffect } = React;

// --- Icons Component Collection ---
const Icons = {
    Lock: ({ className }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    ),
    Unlock: ({ className }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>
    ),
    Check: ({ className }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className || "lucide lucide-check"}><path d="M20 6 9 17l-5-5"/></svg>
    ),
    Download: ({ className }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
    ),
    Alert: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-alert text-primary mb-4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
    ),
    Loader: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader-2 animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
    ),
    Youtube: ({ className }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
    ),
    Mail: ({ className }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
    ),
    ArrowRight: ({ className }) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    )
};

// --- Utilities ---
const checkAdBlock = () => {
    return new Promise((resolve) => {
        const bait = document.createElement('div');
        bait.setAttribute('class', 'adsbox ad-banner-728 pub_300x250 pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links');
        bait.style.position = 'absolute';
        bait.style.top = '-1000px';
        bait.style.left = '-1000px';
        bait.style.width = '1px';
        bait.style.height = '1px';
        document.body.appendChild(bait);

        setTimeout(() => {
            const isBlocked = 
                bait.offsetParent === null || 
                bait.offsetHeight === 0 || 
                bait.offsetWidth === 0 || 
                window.getComputedStyle(bait).display === 'none';
            
            document.body.removeChild(bait);
            
            if (isBlocked) {
                resolve(true);
            } else {
                fetch('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', { 
                    method: 'HEAD', 
                    mode: 'no-cors' 
                })
                .then(() => resolve(false))
                .catch(() => resolve(true));
            }
        }, 150);
    });
};

const useAdBlockDetector = () => {
    const [isAdBlockActive, setIsAdBlockActive] = useState(false);
    useEffect(() => { checkAdBlock().then(setIsAdBlockActive); }, []);
    return isAdBlockActive;
};

// --- Sub-Components ---

const AdBlockModal = () => {
    const [isChecking, setIsChecking] = useState(false);
    const [checkFailed, setCheckFailed] = useState(false);

    const handleDisableCheck = async () => {
        if (isChecking) return;
        setIsChecking(true);
        setCheckFailed(false);
        const stillActive = await checkAdBlock();
        setIsChecking(false);
        if (stillActive) {
            setCheckFailed(true);
        } else {
            window.location.reload();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-500">
            <div className="bg-gray-900/90 border border-primary/30 rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl shadow-primary/20 transform scale-100 fade-in-up">
                <div className="flex justify-center"><Icons.Alert /></div>
                <h2 className="text-2xl font-bold text-white mb-2">Adblock Detected</h2>
                <p className="text-gray-400 mb-6 text-sm">We rely on ads to keep these beats free. Please disable your ad blocker to proceed.</p>
                <button 
                    onClick={handleDisableCheck}
                    className={`
                        w-full font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2
                        ${checkFailed 
                            ? 'bg-blue-900 text-white animate-shake ring-2 ring-primary' 
                            : 'bg-primary hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/40 text-white'}
                    `}
                >
                    {isChecking ? <Icons.Loader /> : checkFailed ? "Still On! Please turn it off." : "I've Disabled It"}
                </button>
            </div>
        </div>
    );
};

const StepButton = ({ number, link, isCompleted, onClick, index }) => {
    return (
        <button
            onClick={() => onClick(number)}
            style={{ animationDelay: `${index * 100}ms` }}
            className={`
                fade-in-up
                group relative w-full mb-4 p-4 rounded-xl border transition-all duration-300 transform active:scale-[0.98]
                flex items-center justify-between overflow-hidden
                ${isCompleted 
                    ? 'bg-green-950/20 border-green-500/50 hover:bg-green-900/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]' 
                    : 'bg-gray-900/40 border-gray-700 hover:border-primary hover:bg-gray-800 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)]'
                }
            `}
        >
            <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none opacity-0 group-hover:opacity-100 bg-gradient-to-r ${isCompleted ? 'from-green-500/10' : 'from-primary/10'} to-transparent`}></div>
            <div className="flex items-center gap-5 relative z-10">
                <div className={`
                    flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg transition-all duration-500 shadow-xl border
                    ${isCompleted 
                        ? 'bg-green-500 border-green-400 text-black scale-100 rotate-0' 
                        : 'bg-gray-800 border-gray-700 text-gray-500 group-hover:bg-primary group-hover:border-primary group-hover:text-black group-hover:scale-110 group-hover:rotate-12'
                    }
                `}>
                    {isCompleted ? <Icons.Check className="w-6 h-6 animate-bounce-in" /> : number}
                </div>
                <div className="flex flex-col items-start">
                    <span className={`font-bold text-lg transition-colors duration-300 ${isCompleted ? 'text-green-400' : 'text-gray-300 group-hover:text-white'}`}>Step {number}</span>
                    <span className={`text-xs uppercase tracking-wide font-medium transition-colors duration-300 ${isCompleted ? 'text-green-600' : 'text-gray-500 group-hover:text-primary/80'}`}>
                        {isCompleted ? "Completed" : "Tap to open"}
                    </span>
                </div>
            </div>
            <div className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                {isCompleted ? (
                   <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/30"><Icons.Check className="w-4 h-4 text-green-500" /></div>
                ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-primary transition-colors duration-300"><Icons.ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-black" /></div>
                )}
            </div>
        </button>
    );
};

// --- Main Application ---

const MainApp = () => {
    const config = window.APP_CONFIG || { stepLinks: [], title: "Error", subtitle: "Configuration not loaded" };
    const isAdBlockActive = useAdBlockDetector();
    const [completedSteps, setCompletedSteps] = useState([]);
    const [stepClickCounts, setStepClickCounts] = useState({});

    const totalSteps = config.stepLinks.length;
    const isUnlocked = completedSteps.length === totalSteps;

    const handleStepClick = (stepNumber) => {
        const linkIndex = stepNumber - 1;
        if (linkIndex >= 0 && linkIndex < config.stepLinks.length) {
            window.open(config.stepLinks[linkIndex], '_blank');
        }

        setStepClickCounts(prev => {
            const currentCount = (prev[stepNumber] || 0) + 1;
            let requiredClicks = (stepNumber === 3 || stepNumber === 5) ? 2 : 1;
            
            if (!completedSteps.includes(stepNumber)) {
                if (currentCount >= requiredClicks) {
                    setCompletedSteps(prevSteps => {
                        if (!prevSteps.includes(stepNumber)) return [...prevSteps, stepNumber];
                        return prevSteps;
                    });
                }
            }
            return { ...prev, [stepNumber]: currentCount };
        });
    };

    const handleDownload = () => {
        if (isUnlocked) window.location.href = config.downloadLink;
    };

    const progressPercentage = (completedSteps.length / totalSteps) * 100;

    if (isAdBlockActive) return <AdBlockModal />;

    return (
        <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-blue-950/30 animate-gradient opacity-80"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

            <div className="w-full max-w-md z-10 fade-in-up">
                {/* Header */}
                <div className="text-center mb-8 space-y-3">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-blue-600 mb-2 shadow-lg shadow-primary/20 transform hover:scale-105 transition-transform duration-300">
                        {isUnlocked ? <Icons.Unlock className="text-black w-8 h-8" /> : <Icons.Lock className="text-black w-8 h-8" />}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-sm uppercase">{config.title}</h1>
                    <p className="text-gray-400 text-sm md:text-base px-4 leading-relaxed font-light">{config.subtitle}</p>
                </div>

                {/* Progress Bar */}
                <div className="relative w-full h-3 bg-gray-800/50 rounded-full mb-8 overflow-hidden backdrop-blur-sm border border-white/5">
                    <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-700 via-primary to-blue-600 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]" style={{ width: `${progressPercentage}%` }}></div>
                </div>

                {/* Steps */}
                <div className="space-y-3 mb-10">
                    {config.stepLinks.map((link, index) => (
                        <StepButton 
                            key={index}
                            index={index}
                            number={index + 1}
                            link={link}
                            isCompleted={completedSteps.includes(index + 1)}
                            onClick={handleStepClick}
                        />
                    ))}
                </div>

                {/* Download Button */}
                <div className="relative group fade-in-up delay-5">
                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-700 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-500 ${!isUnlocked && 'hidden'}`}></div>
                    <button
                        disabled={!isUnlocked}
                        onClick={handleDownload}
                        className={`
                            relative w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 border
                            ${isUnlocked 
                                ? 'bg-gradient-to-r from-primary to-blue-600 border-blue-400 text-black shadow-xl shadow-primary/20 translate-y-0 cursor-pointer glow-active hover:brightness-110' 
                                : 'bg-gray-800/50 border-white/5 text-gray-500 cursor-not-allowed'
                            }
                        `}
                    >
                        {isUnlocked ? (
                            <><Icons.Download className="w-6 h-6 animate-bounce" />Download Beat</>
                        ) : (
                            <><Icons.Lock className="w-5 h-5 opacity-70" /><span>Beat Locked <span className="text-sm font-normal opacity-70 ml-1">({completedSteps.length}/{totalSteps})</span></span></>
                        )}
                    </button>
                </div>
                
                {/* Footer */}
                <div className="mt-12 text-center fade-in-up delay-5">
                     <div className="h-px w-16 bg-gradient-to-r from-transparent via-gray-700 to-transparent mx-auto mb-6"></div>
                     <div className="flex items-center justify-center gap-10 mb-8">
                        <a href="https://youtube.com/@2knobu" target="_blank" rel="noopener noreferrer" className="group relative transition-transform duration-300 hover:scale-125 focus:outline-none">
                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <Icons.Youtube className="w-8 h-8 text-gray-500 group-hover:text-primary transition-colors duration-300 relative z-10" />
                        </a>
                        <a href="mailto:2knobu@gmail.com" className="group relative transition-transform duration-300 hover:scale-125 focus:outline-none">
                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <Icons.Mail className="w-8 h-8 text-gray-500 group-hover:text-primary transition-colors duration-300 relative z-10" />
                        </a>
                     </div>
                     <p className="text-gray-600 text-xs">&copy; 2026 Free For Profit Beats. <br className="hidden md:block" />Secure Gateway protected.</p>
                </div>
            </div>
        </div>
    );
};

// Render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MainApp />);