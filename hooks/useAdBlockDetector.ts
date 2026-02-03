import { useState, useEffect } from 'react';

/**
 * Standalone function to check for ad blockers.
 * Returns true if adblock is detected.
 */
export const checkAdBlock = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Method 1: Bait Element
    const bait = document.createElement('div');
    bait.setAttribute('class', 'adsbox pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links');
    bait.setAttribute('style', 'width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;');
    document.body.appendChild(bait);

    let detected = false;

    // Method 2: Network Request
    const checkNetwork = async () => {
      try {
        const request = new Request('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', {
          method: 'HEAD',
          mode: 'no-cors'
        });
        await fetch(request);
      } catch (error) {
        detected = true;
      }
    };

    checkNetwork().then(() => {
        // Check bait after a short delay
        setTimeout(() => {
            if (
                bait.offsetParent === null || 
                bait.offsetHeight === 0 || 
                bait.offsetLeft === 0 || 
                bait.clientWidth === 0 || 
                window.getComputedStyle(bait).display === 'none' ||
                window.getComputedStyle(bait).visibility === 'hidden'
            ) {
                detected = true;
            }
            
            document.body.removeChild(bait);
            resolve(detected);
        }, 150); // Shorter timeout for imperative check
    });
  });
};

/**
 * A hook that attempts to detect ad blockers on mount.
 */
export const useAdBlockDetector = () => {
  const [isAdBlockDetected, setIsAdBlockDetected] = useState(false);

  useEffect(() => {
    const runCheck = async () => {
        const result = await checkAdBlock();
        setIsAdBlockDetected(result);
    };
    runCheck();
  }, []);

  return isAdBlockDetected;
};