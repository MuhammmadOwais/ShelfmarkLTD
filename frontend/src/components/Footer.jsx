import React, { useState } from 'react';
import { MapPin, Mail } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/categories';

const Footer = ({ logoUrl, onPrivacyClick, onTermsClick, onRefundClick, onAboutClick, onContactClick, onCategoryClick, onHomeClick, onPrivateLabelClick }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterLoading(true);
    setNewsletterSuccess('');
    setNewsletterError('');

    try {
      const res = await fetch('http://localhost:5000/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail })
      });
      const data = await res.json();
      if (res.ok) {
        setNewsletterSuccess('Subscribed!');
        setNewsletterEmail('');
      } else {
        setNewsletterError(data.message || 'Error');
      }
    } catch {
      setNewsletterError('Offline');
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <footer className="mt-auto bg-[#071527] text-white font-sans border-t border-slate-800">

      {/* ── Main Compact Footer Body ── */}
      <div className="py-8 md:py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* 1. BRAND COLUMN */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-3.5">
            {logoUrl ? (
              <img src={logoUrl} alt="Shelfmark Logo" className="h-9 object-contain mx-auto md:mx-0" onError={(e) => { e.target.style.display = 'none'; }} />
            ) : (
              <span className="text-white font-black text-xl tracking-wider uppercase">SHELFMARK</span>
            )}

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Shelfmark LTD is a registered UK company delivering quality electronics, home essentials, furniture, and lifestyle products nationwide.
            </p>

          </div>

          {/* 2. PAGES & CATEGORIES */}
          <div className="md:col-span-5 grid grid-cols-2 gap-4 text-left">
            
            {/* Left Column: Company & Legal Pages */}
            <div className="space-y-2">
              <h4 className="text-white font-extrabold text-xs uppercase tracking-[0.14em] mb-2">Company</h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li>
                  <a href="/" onClick={(e) => { e.preventDefault(); if (onHomeClick) onHomeClick(); else if (onCategoryClick) onCategoryClick('All'); }} className="hover:text-white transition-colors cursor-pointer font-medium block py-0.5">
                    Home Page
                  </a>
                </li>
                <li>
                  <a href="/private-label" onClick={(e) => { e.preventDefault(); if (onPrivateLabelClick) onPrivateLabelClick(); }} className="hover:text-white transition-colors cursor-pointer font-medium block py-0.5 text-amber-400">
                    Private Label &amp; Wholesale
                  </a>
                </li>
                <li>
                  <a href="/about" onClick={(e) => { e.preventDefault(); if (onAboutClick) onAboutClick(); }} className="hover:text-white transition-colors cursor-pointer font-medium block py-0.5">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" onClick={(e) => { e.preventDefault(); if (onContactClick) onContactClick(); }} className="hover:text-white transition-colors cursor-pointer font-medium block py-0.5">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); if (onPrivacyClick) onPrivacyClick(); }} className="hover:text-white transition-colors cursor-pointer font-medium block py-0.5">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms-of-service" onClick={(e) => { e.preventDefault(); if (onTermsClick) onTermsClick(); }} className="hover:text-white transition-colors cursor-pointer font-medium block py-0.5">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/refund-policy" onClick={(e) => { e.preventDefault(); if (onRefundClick) onRefundClick(); }} className="hover:text-white transition-colors cursor-pointer font-medium block py-0.5">
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Right Column: Shop Categories */}
            <div className="space-y-2">
              <h4 className="text-white font-extrabold text-xs uppercase tracking-[0.14em] mb-2">Categories</h4>
              <ul className="space-y-1.5 max-h-48 overflow-y-auto text-xs text-slate-400 scrollbar-hide">
                {CATEGORIES_DATA.map(cat => (
                  <li key={cat.id}>
                    <a
                      href={`/category/${cat.slug}`}
                      onClick={(e) => {
                        if (onCategoryClick) {
                          e.preventDefault();
                          onCategoryClick(cat.slug);
                        }
                      }}
                      className="hover:text-white transition-colors font-medium block py-0.5 truncate"
                    >
                      {cat.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* 3. NEWSLETTER COLUMN (Span 3 on desktop) */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left space-y-3">
            <h4 className="text-white font-extrabold text-xs uppercase tracking-[0.14em]">Newsletter</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe for exclusive deals and updates.
            </p>

            {newsletterSuccess ? (
              <div className="text-xs text-green-400 bg-green-950/40 border border-green-800/30 px-3 py-1.5 rounded-md font-semibold">
                Subscribed!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="w-full max-w-xs">
                {/* Minimal Underlined Input with Mail Icon on Right */}
                <div className="relative border-b border-slate-400 focus-within:border-white transition-colors py-1 flex items-center justify-between">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-transparent text-xs text-white placeholder:text-slate-400 focus:outline-none pr-7"
                  />
                  <button
                    type="submit"
                    disabled={newsletterLoading}
                    aria-label="Subscribe"
                    className="absolute right-0 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <Mail className="h-4 w-4" />
                  </button>
                </div>
                {newsletterError && <p className="text-[10px] text-red-400 font-semibold mt-1">{newsletterError}</p>}
              </form>
            )}

            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <p className="flex items-center justify-center md:justify-start gap-1">
                <MapPin className="h-3 w-3 shrink-0" />
                <span>1385 85 Dunstall Hill, Wolverhampton, UK</span>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-1">
                <span className="font-bold text-slate-300">📞 Phone:</span>
                <a href="tel:+447460013637" className="text-white hover:underline font-bold">+44 7460013637</a>
              </p>
              <p>Company No: <strong className="text-white">17319960</strong> | UTR: <strong className="text-white">43491 13593</strong></p>
              <div className="pt-1.5 flex items-center justify-center md:justify-start gap-1.5 text-[10px]">
                <span className="text-emerald-400 font-extrabold">★ 4.8 / 5</span>
                <span className="text-slate-300 font-semibold">Trustpilot Rated UK Wholesaler</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Compact Bottom Legal Bar ── */}
      <div className="border-t border-slate-800/80 py-4 px-6 bg-[#040e1a]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-slate-400 text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} Shelfmark LTD. Registered in England &amp; Wales.
          </p>

          <div className="flex flex-wrap justify-center gap-3 font-semibold text-[11px]">
            <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); if (onPrivacyClick) onPrivacyClick(); }} className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="/terms-of-service" onClick={(e) => { e.preventDefault(); if (onTermsClick) onTermsClick(); }} className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <span>•</span>
            <a href="/refund-policy" onClick={(e) => { e.preventDefault(); if (onRefundClick) onRefundClick(); }} className="hover:text-white transition-colors">
              Refund Policy
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
