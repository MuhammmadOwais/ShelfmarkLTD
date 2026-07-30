import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Search, Menu, X, User, Bell, ChevronRight, Phone, Clock, Globe, ShieldCheck, Truck, Zap, Star, Gift, ChevronDown, Check } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/categories';

const LANG_OPTIONS = [
  { code: 'GB', name: 'GB (UK English)', flag: '🇬🇧' },
  { code: 'US', name: 'US (USD)', flag: '🇺🇸' },
  { code: 'EU', name: 'EU (EUR)', flag: '🇪🇺' },
  { code: 'DE', name: 'DE (EUR)', flag: '🇩🇪' },
  { code: 'FR', name: 'FR (EUR)', flag: '🇫🇷' },
];

const Navbar = ({
  cartCount,
  onSearch,
  selectedCategory,
  onSelectCategory,
  logoUrl,
  logoMobileUrl,
  user,
  onAuthClick,
  onLogout,
  onAdminClick,
  onNewsletterClick,
  onCartClick,
  products,
  onProductClick,
  onAboutClick,
  onContactClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [selectedLang, setSelectedLang] = useState(LANG_OPTIONS[0]);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [countdown, setCountdown] = useState({ hrs: '06', mins: '24', secs: '16' });
  const searchRef = useRef(null);
  const langRef = useRef(null);

  // Live local device time clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-GB', { hour12: true }));
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Same-Day Dispatch Live Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(17, 0, 0, 0); // 5:00 PM cutoff
      let diff = Math.floor((endOfDay - now) / 1000);
      if (diff < 0) diff += 24 * 3600;

      const hrs = String(Math.floor(diff / 3600)).padStart(2, '0');
      const mins = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
      const secs = String(diff % 60).padStart(2, '0');
      setCountdown({ hrs, mins, secs });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Lock background scroll when mobile navigation drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  // Close suggestions and lang dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
      if (langRef.current && !langRef.current.contains(e.target)) {
        setShowLangDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Compute search suggestions
  const computeSuggestions = (val) => {
    if (!val.trim() || !products?.length) return [];
    const q = val.toLowerCase();
    return products
      .filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
      )
      .slice(0, 6);
  };

  const handleSearchChange = (val) => {
    setSearchVal(val);
    onSearch(val);
    const s = computeSuggestions(val);
    setSuggestions(s);
    setShowSuggestions(val.trim().length > 0);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchVal);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (product) => {
    setSearchVal(product.name);
    onSearch(product.name);
    setShowSuggestions(false);
    if (onProductClick) onProductClick(product);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#071527] shadow-2xl text-white font-sans">

      {/* ─────── 1. TOP UK TRADE ANNOUNCEMENT BAR ─────── */}
      <div className="bg-[#030914] text-xs font-bold border-b border-slate-800 py-2.5 px-4 lg:px-8 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">

          {/* Left: Shipping & Hotline */}
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-slate-200">
              <Truck className="h-3.5 w-3.5 text-slate-300" />
              <span><strong>FREE UK Shipping</strong> Over £150 Ex. VAT</span>
            </span>
            <span className="hidden md:inline text-slate-700">•</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Zap className="h-3.5 w-3.5 text-slate-300" />
              <span>Next Day UK Dispatch</span>
            </span>
          </div>

          {/* Center: Trustpilot & Phone Hotline */}
          <div className="hidden lg:flex items-center gap-4">
            <span className="flex items-center gap-1 bg-[#071527] border border-slate-700/80 px-2.5 py-1 rounded text-[11px]">
              <Star className="h-3 w-3 fill-emerald-400 text-emerald-400" />
              <span className="text-emerald-400 font-black">4.8 / 5</span>
              <span className="text-slate-300 font-semibold">Trustpilot Rated</span>
            </span>
            <span className="text-slate-700">•</span>
            <a href="tel:+447460013637" className="hover:text-white transition-colors flex items-center gap-1.5 text-xs">
              <Phone className="h-3.5 w-3.5 text-slate-300" />
              <span>Hotline: <strong className="text-white">+44 7460013637</strong></span>
            </a>
          </div>

          {/* Right: Account & Sign In */}
          <div className="flex items-center gap-4 text-xs">
            {user ? (
              <span className="text-white font-bold">Hello, {user.name}</span>
            ) : (
              <button
                onClick={onAuthClick}
                className="hover:text-white text-slate-300 font-bold transition-colors cursor-pointer"
              >
                Sign In / Register
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ─────── 2. MAIN HEADER ROW (LARGER LOGO, PROMINENT SEARCH, TIME/FLAG/BAG RIGHT) ─────── */}
      <div className="bg-[#071527] py-4 px-4 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">

          {/* ── LEFT: LARGER LOGO ── */}
          <div
            className="flex items-center cursor-pointer shrink-0 py-1"
            onClick={() => { onSelectCategory('All'); onSearch(''); setSearchVal(''); setSuggestions([]); }}
          >
            {logoUrl ? (
              <img src={logoUrl} alt="Shelfmark Logo" className="hidden lg:block h-14 md:h-16 max-h-16 object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
            ) : (
              <span className="hidden lg:block text-white font-black text-3xl lg:text-4xl tracking-wider uppercase font-sans">SHELFMARK</span>
            )}
            {logoMobileUrl ? (
              <img src={logoMobileUrl} alt="Shelfmark Mobile Logo" className="lg:hidden h-10 object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
            ) : (
              <span className="lg:hidden text-white font-black text-2xl tracking-wider uppercase font-sans">SHELFMARK</span>
            )}
          </div>

          {/* ── MIDDLE: LARGE PROMINENT EXECUTIVE SEARCH BAR ── */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-2xl relative">
            <form onSubmit={handleSearchSubmit} className="w-full flex items-center bg-white rounded-md overflow-hidden shadow-md border border-slate-300 focus-within:border-slate-900 transition-colors">
              <input
                type="text"
                placeholder="Search products, categories, SKUs..."
                value={searchVal}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full bg-white text-slate-900 text-sm px-4 py-3 focus:outline-none placeholder:text-slate-400 font-medium"
              />
              <button
                type="submit"
                className="bg-[#030914] hover:bg-slate-900 text-white px-6 py-3 flex items-center justify-center transition-colors cursor-pointer border-none"
                aria-label="Search"
              >
                <Search className="h-4.5 w-4.5 text-white" />
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-[#09182b] border border-slate-700 rounded-md shadow-2xl overflow-hidden animate-fadeIn z-50">
                <div className="px-3.5 py-2 border-b border-slate-800 bg-[#071324] flex justify-between items-center">
                  <p className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">
                    {suggestions.length} Product Result{suggestions.length !== 1 ? 's' : ''}
                  </p>
                  <span className="text-[10px] text-slate-400">Click to view</span>
                </div>
                <div className="py-1">
                  {suggestions.map((prod) => (
                    <button
                      key={prod._id}
                      onClick={() => handleSuggestionClick(prod)}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 hover:bg-slate-800/60 transition-colors text-left group"
                    >
                      <img
                        src={prod.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80'}
                        alt={prod.name}
                        className="h-8 w-8 object-cover rounded-md shrink-0 border border-slate-700"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate group-hover:text-slate-200 transition-colors">
                          {prod.name}
                        </p>
                        <span className="text-[11px] font-extrabold text-white">£{prod.price?.toFixed(2)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT WIDGETS: LIVE TIME, CUSTOM LANGUAGE DROPDOWN (MAIN HEADER), BELL, YOUR BAG ── */}
          <div className="flex items-center gap-2.5 sm:gap-3 lg:gap-4 shrink-0">

            {/* Live Local Time Widget */}
            {currentTime && (
              <div className="hidden xl:flex items-center gap-1.5 bg-[#030914] border border-slate-700 px-3 py-1.5 rounded-md text-xs font-bold text-slate-300">
                <Clock className="h-3.5 w-3.5 text-slate-300" />
                <span className="text-white font-mono">{currentTime}</span>
              </div>
            )}

            {/* Custom Flag Language Selector (VISIBLE ON MAIN HEADER ON MOBILE & DESKTOP) */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center gap-1 bg-[#030914] hover:bg-slate-900 border border-slate-700 px-2.5 py-1.5 rounded-md text-xs font-bold text-white transition-colors cursor-pointer"
              >
                <span className="text-base">{selectedLang.flag}</span>
                <span className="hidden sm:inline">{selectedLang.code}</span>
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </button>

              {showLangDropdown && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-[#071527] border border-slate-700 rounded-md shadow-xl py-1.5 z-50 animate-fadeIn">
                  {LANG_OPTIONS.map((opt) => (
                    <button
                      key={opt.code}
                      onClick={() => { setSelectedLang(opt); setShowLangDropdown(false); }}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 hover:text-white transition-colors text-left"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{opt.flag}</span>
                        <span className="font-semibold">{opt.name}</span>
                      </div>
                      {selectedLang.code === opt.code && <Check className="h-3.5 w-3.5 text-emerald-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Newsletter Bell Icon */}
            <button
              onClick={onNewsletterClick}
              className="p-2 text-slate-300 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
              title="Newsletter"
            >
              <Bell className="h-5 w-5" />
            </button>

            {/* User Account Dropdown (Only when logged in) */}
            {user && (
              <div className="relative group shrink-0">
                <button
                  className="p-2 text-slate-300 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                  title={user.name}
                >
                  <User className="h-5 w-5" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#071527] border border-slate-700 rounded-md shadow-xl py-2 hidden group-hover:block z-50">
                  {user.isAdmin && (
                    <button
                      onClick={onAdminClick}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      Admin Dashboard
                    </button>
                  )}
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-red-400 hover:bg-slate-800 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}

            {/* 🛒 YOUR BAG / CART WIDGET */}
            <button
              onClick={onCartClick}
              className="flex items-center gap-2 bg-[#030914] hover:bg-slate-900 border border-slate-700 text-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-md transition-all cursor-pointer shadow-sm shrink-0"
            >
              <ShoppingCart className="h-4 w-4 text-white" />
              <span className="hidden sm:inline font-black text-xs uppercase tracking-wider">Your Bag</span>
              {cartCount > 0 && (
                <span className="bg-white text-slate-950 font-black text-xs px-2 py-0.5 rounded-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-white cursor-pointer bg-slate-900 border border-slate-700 rounded-md shrink-0"
              aria-label="Toggle Mobile Navigation Menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden mt-3">
          <form onSubmit={handleSearchSubmit} className="flex items-center bg-white rounded-md overflow-hidden shadow-md">
            <input
              type="text"
              placeholder="Search products..."
              value={searchVal}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full bg-white text-slate-900 text-xs px-3 py-2.5 focus:outline-none font-medium"
            />
            <button type="submit" className="bg-[#030914] text-white px-3.5 py-2.5">
              <Search className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* ─────── 3. SUB-NAVIGATION CATEGORY BAR (FULL SCREEN WIDTH COMPACT FIT) ─────── */}
      <nav className="bg-[#0b1a2f] border-b border-slate-800 px-4 lg:px-6 py-2">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-3 text-[10px] xl:text-[11px] font-black uppercase tracking-wider text-slate-300">

          <div className="flex items-center gap-3 lg:gap-3.5 xl:gap-4 overflow-x-auto scrollbar-hide py-1 flex-1">
            <button
              onClick={() => {
                onSelectCategory('All');
                onSearch('');
                const catalogEl = document.getElementById('catalog');
                if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`shrink-0 hover:text-white transition-colors cursor-pointer whitespace-nowrap ${selectedCategory === 'All' ? 'text-white font-black underline underline-offset-4 decoration-2' : ''
                }`}
            >
              All Departments
            </button>

            {CATEGORIES_DATA.map((cat) => {
              const isActive = selectedCategory === cat.slug || selectedCategory === cat.name;
              return (
                <a
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectCategory(cat.slug);
                    const catalogEl = document.getElementById('catalog');
                    if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`shrink-0 transition-colors cursor-pointer whitespace-nowrap ${isActive ? 'text-white font-black underline underline-offset-4 decoration-2' : 'hover:text-white'
                    }`}
                >
                  {cat.name}
                </a>
              );
            })}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('All');
              const catalogEl = document.getElementById('catalog');
              if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hidden lg:flex items-center gap-1 bg-[#071527] hover:bg-slate-800 border border-slate-700 px-3 py-1 rounded text-[10px] font-black text-white shrink-0 cursor-pointer shadow-sm"
          >
            <span>VIEW CATALOGUES</span>
            <ChevronRight className="h-3 w-3" />
          </button>

        </div>
      </nav>

      {/* ─────── 4. SLEEK THIN SINGLE-LINE DISPATCH COUNTDOWN STRIP ─────── */}
      <div className="bg-[#040c17] border-b border-slate-800 py-1 px-4 text-[10px] sm:text-xs font-bold text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto scrollbar-hide whitespace-nowrap">

          {/* Left: Dispatch Countdown */}
          <div className="flex items-center gap-1.5 shrink-0">
            <Clock className="h-3 w-3 text-slate-400 shrink-0" />
            <span className="uppercase font-extrabold text-slate-300">
              FOR SAME DAY DISPATCH order within:
            </span>
            <div className="flex items-center gap-0.5 font-mono font-black text-white text-[11px] bg-[#071527] px-2 py-0.5 rounded border border-slate-700">
              <span>{countdown.hrs}h</span>:
              <span>{countdown.mins}m</span>:
              <span>{countdown.secs}s</span>
            </div>
          </div>

          {/* Center: Trustpilot Rating */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0 text-slate-300">
            <span>Trustpilot Rated</span>
            <div className="flex items-center gap-0.5">
              <Star className="h-2.5 w-2.5 fill-emerald-400 text-emerald-400" />
              <Star className="h-2.5 w-2.5 fill-emerald-400 text-emerald-400" />
              <Star className="h-2.5 w-2.5 fill-emerald-400 text-emerald-400" />
              <Star className="h-2.5 w-2.5 fill-emerald-400 text-emerald-400" />
              <Star className="h-2.5 w-2.5 fill-emerald-400 text-emerald-400" />
            </div>
            <span className="text-emerald-400 font-black">4.8/5</span>
          </div>

          {/* Right: First Order Discount */}
          <div className="flex items-center gap-1.5 shrink-0">
            <Gift className="h-3 w-3 text-slate-300 shrink-0" />
            <span>First Order Discount:</span>
            <strong className="bg-[#071527] text-white font-black px-2 py-0.5 rounded border border-slate-700">
              FIRST10
            </strong>
          </div>

        </div>
      </div>

      {/* ─────── 5. HIGHLY PROFESSIONAL MOBILE NAVIGATION DRAWER ─────── */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#040e1a] overflow-y-auto animate-fadeIn flex flex-col">

          {/* Mobile Drawer Header (LOGO + CLOSE BUTTON) */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#030914]">
            {logoMobileUrl || logoUrl ? (
              <img src={logoMobileUrl || logoUrl} alt="Shelfmark Logo" className="h-9 object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
            ) : (
              <span className="text-white font-black text-2xl tracking-wider uppercase font-sans">SHELFMARK</span>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-slate-300 hover:text-white bg-slate-900 rounded-md border border-slate-700 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Drawer Content */}
          <div className="p-5 space-y-6 flex-1 text-sm font-sans">

            {/* Department Categories List */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                Store Departments
              </h4>
              <div className="grid grid-cols-1 gap-1">
                <button
                  onClick={() => { onSelectCategory('All'); setIsOpen(false); }}
                  className={`w-full text-left px-4 py-3 rounded-md text-xs font-extrabold transition-all flex items-center justify-between ${selectedCategory === 'All' ? 'bg-white text-slate-950 font-black shadow-md' : 'text-slate-200 hover:bg-slate-800/80'
                    }`}
                >
                  <span>All Departments</span>
                  <ChevronRight className="h-4 w-4" />
                </button>

                {CATEGORIES_DATA.map((cat) => {
                  const isActive = selectedCategory === cat.slug || selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => { onSelectCategory(cat.slug); setIsOpen(false); }}
                      className={`w-full text-left px-4 py-3 rounded-md text-xs font-bold transition-all flex items-center justify-between ${isActive ? 'bg-white text-slate-950 font-black shadow-md' : 'text-slate-300 hover:bg-slate-800/80'
                        }`}
                    >
                      <span>{cat.name}</span>
                      <ChevronRight className="h-4 w-4 text-slate-500" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Company Pages */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                Company &amp; Legal
              </h4>
              <div className="space-y-2 text-xs text-slate-300 font-bold">
                <button onClick={() => { if (onAboutClick) onAboutClick(); setIsOpen(false); }} className="block hover:text-white py-1.5 w-full text-left">About Us</button>
                <button onClick={() => { if (onContactClick) onContactClick(); setIsOpen(false); }} className="block hover:text-white py-1.5 w-full text-left">Contact Us &amp; Trade Inquiry</button>
              </div>
            </div>

          </div>

          {/* Drawer Bottom Actions */}
          <div className="p-4 border-t border-slate-800 bg-[#030914] space-y-2">
            {user ? (
              <div className="flex items-center justify-between text-xs text-slate-300 font-bold">
                <span>Signed in as {user.name}</span>
                <button onClick={onLogout} className="text-red-400 hover:underline">Sign Out</button>
              </div>
            ) : (
              <button
                onClick={() => { onAuthClick(); setIsOpen(false); }}
                className="w-full py-3.5 bg-white text-slate-950 font-black text-xs uppercase tracking-wider rounded-md text-center shadow-md cursor-pointer"
              >
                Sign In / Register Account
              </button>
            )}
          </div>

        </div>
      )}

    </header>
  );
};

export default Navbar;
