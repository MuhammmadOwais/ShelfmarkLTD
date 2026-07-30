import React, { useState, useEffect } from 'react';
import { Shield, Settings, X, Check, Cookie, ArrowRight, Info } from 'lucide-react';

const CookieBanner = ({ onPrivacyClick }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
    preferences: true,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem('shelfmark_cookie_consent');
    if (!savedConsent) {
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const fullConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('shelfmark_cookie_consent', JSON.stringify(fullConsent));
    setShowBanner(false);
    setShowCustomizeModal(false);
  };

  const handleRejectAll = () => {
    const minimalConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('shelfmark_cookie_consent', JSON.stringify(minimalConsent));
    setShowBanner(false);
    setShowCustomizeModal(false);
  };

  const handleSavePreferences = () => {
    const customConsent = {
      ...preferences,
      necessary: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('shelfmark_cookie_consent', JSON.stringify(customConsent));
    setShowBanner(false);
    setShowCustomizeModal(false);
  };

  const openCookieSettings = () => {
    setShowBanner(true);
    setShowCustomizeModal(true);
  };

  return (
    <>
      {/* ─────── FLOATING REOPEN COOKIE TRIGGER (BOTTOM RIGHT) ─────── */}
      {!showBanner && (
        <button
          onClick={openCookieSettings}
          className="fixed bottom-4 right-4 z-40 p-3 bg-[#071527] hover:bg-slate-900 text-white rounded-full shadow-2xl border border-slate-700/80 transition-all duration-300 hover:scale-110 group cursor-pointer"
          title="Cookie & Privacy Settings"
          aria-label="Cookie Settings"
        >
          <Cookie className="h-4 w-4 text-slate-300 group-hover:text-white transition-colors" />
        </button>
      )}

      {/* ─────── LUXURY FLOATING BOTTOM-RIGHT BANNER ─────── */}
      {showBanner && !showCustomizeModal && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto max-w-sm sm:max-w-md z-50 animate-slideUp">
          <div className="bg-[#071527]/95 border border-slate-800/90 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-5 backdrop-blur-2xl text-white">
            
            {/* Header Badge Row */}
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-slate-800/80 rounded-lg border border-slate-700/60">
                  <Shield className="h-4 w-4 text-slate-200" />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-white">
                    Cookie & Privacy Control
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">Shelfmark Ltd Official Policy</p>
                </div>
              </div>
              <button
                onClick={handleRejectAll}
                className="text-slate-400 hover:text-white transition-colors p-1 rounded-md cursor-pointer"
                title="Decline Non-Essential"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Concise Message */}
            <p className="text-xs text-slate-300 leading-relaxed mb-4 font-normal">
              We use cookies to analyze site traffic, protect transactions, and personalize your experience under UK GDPR. You can manage your preferences or accept all cookies below.
            </p>

            {/* Primary Action Row */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={handleAcceptAll}
                className="w-full py-2.5 px-3 bg-white hover:bg-slate-200 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Accept All</span>
                <Check className="h-3.5 w-3.5" />
              </button>
              
              <button
                onClick={handleRejectAll}
                className="w-full py-2.5 px-3 bg-slate-800/90 hover:bg-slate-800 text-slate-200 font-bold text-xs uppercase tracking-wider rounded-xl transition-all border border-slate-700/80 flex items-center justify-center cursor-pointer"
              >
                Reject All
              </button>
            </div>

            {/* Footer Control Links */}
            <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-[11px]">
              <button
                onClick={() => setShowCustomizeModal(true)}
                className="text-slate-300 hover:text-white font-bold flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 transition-colors"
              >
                <Settings className="h-3 w-3 text-slate-400" />
                <span>Customize Preferences</span>
              </button>
              
              {onPrivacyClick && (
                <button
                  onClick={onPrivacyClick}
                  className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer bg-transparent border-none p-0 underline"
                >
                  Privacy Policy
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ─────── HIGH-END PREFERENCE CENTER MODAL ─────── */}
      {showCustomizeModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn font-sans">
          <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
            
            {/* Modal Top Header */}
            <div className="bg-[#071527] text-white p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-slate-800/80 rounded-xl border border-slate-700/60">
                  <Cookie className="h-5 w-5 text-slate-200" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-black tracking-wide">
                    Privacy Preference Center
                  </h3>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Shelfmark Ltd Governance</p>
                </div>
              </div>
              <button
                onClick={() => setShowCustomizeModal(false)}
                className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg cursor-pointer hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 md:p-6 overflow-y-auto space-y-5 text-left">
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex items-start gap-2.5">
                <Info className="h-4 w-4 text-slate-600 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-relaxed">
                  Shelfmark Ltd values your privacy. Manage your consent preferences for different cookie categories below. Essential cookies are required to process checkout transactions and cannot be disabled.
                </p>
              </div>

              {/* Cookie Categories Accordions / Switches */}

              {/* 1. Essential Cookies */}
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs md:text-sm font-extrabold text-slate-900">Strictly Necessary Cookies</span>
                  <span className="text-[9px] font-black uppercase tracking-wider bg-slate-900 text-white px-2.5 py-1 rounded-md">
                    Required
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Essential for basic platform operations including cart state retention, user authentication, security verification, and compliance logging.
                </p>
              </div>

              {/* 2. Analytics Cookies */}
              <div className="border border-slate-200 rounded-xl p-4 flex items-start justify-between gap-4 hover:border-slate-300 transition-colors">
                <div className="space-y-1">
                  <span className="text-xs md:text-sm font-extrabold text-slate-900">Analytics & Performance</span>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Helps Shelfmark Ltd analyze visitor traffic volumes, monitor page load speeds, and identify catalog improvements.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#071527]"></div>
                </label>
              </div>

              {/* 3. Marketing Cookies */}
              <div className="border border-slate-200 rounded-xl p-4 flex items-start justify-between gap-4 hover:border-slate-300 transition-colors">
                <div className="space-y-1">
                  <span className="text-xs md:text-sm font-extrabold text-slate-900">Marketing & Personalization</span>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Used to display relevant product highlights and tailor promotional offers on verified partner networks.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#071527]"></div>
                </label>
              </div>

              {/* 4. Preference Cookies */}
              <div className="border border-slate-200 rounded-xl p-4 flex items-start justify-between gap-4 hover:border-slate-300 transition-colors">
                <div className="space-y-1">
                  <span className="text-xs md:text-sm font-extrabold text-slate-900">Functional Preferences</span>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Remembers your customized catalog view layout, regional language, and currency settings.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={preferences.preferences}
                    onChange={(e) => setPreferences({ ...preferences, preferences: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#071527]"></div>
                </label>
              </div>
            </div>

            {/* Modal Bottom Controls */}
            <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between gap-3">
              <button
                onClick={handleRejectAll}
                className="px-3 py-2 text-xs font-black uppercase tracking-wider text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Reject All
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSavePreferences}
                  className="px-4 py-2.5 text-xs font-black uppercase tracking-wider text-slate-900 bg-slate-200 hover:bg-slate-300 rounded-xl transition-all cursor-pointer"
                >
                  Save Selection
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white bg-[#071527] hover:bg-slate-800 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Accept All
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default CookieBanner;
