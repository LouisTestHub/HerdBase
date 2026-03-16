'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Check visit count
    const visits = parseInt(localStorage.getItem('herdbase-visits') || '0', 10) + 1;
    localStorage.setItem('herdbase-visits', String(visits));

    const dismissed = localStorage.getItem('herdbase-install-dismissed');
    if (dismissed) return;

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    // iOS detection
    const ua = navigator.userAgent;
    const isiOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIOS(isiOS);

    if (visits >= 3) {
      if (isiOS) {
        setShowBanner(true);
      }
    }

    // Android/Chrome prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (visits >= 3) {
        setShowBanner(true);
      }
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIOSInstructions(true);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('herdbase-install-dismissed', '1');
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-5">
        {showIOSInstructions ? (
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Install HerdBase on iOS</h3>
            <ol className="text-sm text-gray-600 space-y-2">
              <li>1. Tap the <strong>Share</strong> button (box with arrow) at the bottom of Safari</li>
              <li>2. Scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong></li>
              <li>3. Tap <strong>&quot;Add&quot;</strong> in the top right</li>
            </ol>
            <button onClick={() => setShowIOSInstructions(false)} className="mt-4 text-sm text-emerald-700 font-medium">
              Got it
            </button>
          </div>
        ) : (
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-700 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">Install HerdBase</h3>
              <p className="text-sm text-gray-600 mt-1">Add to your home screen for quick access — works offline too</p>
              <div className="flex gap-3 mt-3">
                <button onClick={handleInstall} className="bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-800 transition">
                  Install
                </button>
                <button onClick={handleDismiss} className="text-gray-500 text-sm hover:text-gray-700">
                  Not now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
