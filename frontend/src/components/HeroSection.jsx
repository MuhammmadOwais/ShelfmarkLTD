import React from 'react';
import { ArrowRight, PhoneCall } from 'lucide-react';

const HERO_IMAGES = [
  'https://res.cloudinary.com/sfjl53dg/image/upload/v1784760816/compressed-pexels-negativespace-34577_nwuemn.webp',
  'https://res.cloudinary.com/sfjl53dg/image/upload/v1784760817/compressed-pexels-ai25studioai-6207767_xabyyf.webp',
  'https://res.cloudinary.com/sfjl53dg/image/upload/v1784760817/compressed-pexels-tasso-mitsarakis-4849571-7996793_uqhslq.webp',
];

const HeroSection = ({ heroIndex, onContactClick }) => {
  return (
    <div className="relative h-[88vh] min-h-[560px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      {HERO_IMAGES.map((imgUrl, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2500ms] ease-in-out ${idx === heroIndex ? 'opacity-100 z-10 animate-kenburns' : 'opacity-0 z-0'}`}
          style={{ backgroundImage: `url(${imgUrl})` }}
        />
      ))}

      {/* Multi-layer overlay for depth */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
      {/* Bottom white fade */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent z-20" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12">
        <div className="max-w-2xl text-white space-y-6">

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] drop-shadow-xl text-white break-words">
            Shop Smarter{' '}
            <span className="text-white">
              Live Better
            </span>
          </h1>

          {/* UK Wholesale & Private Label Description */}
          <p className="text-sm md:text-lg text-slate-200 max-w-xl leading-relaxed font-medium">
            ShelfMark LTD is a premier UK registered e-commerce store, wholesaler, and private label distributor delivering quality electronics, home essentials, and lifestyle products nationwide from our Wolverhampton warehouse.
          </p>

          {/* Action CTAs: Explore Products & Contact Us */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-200 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full transition-all shadow-lg hover:shadow-white/20 group cursor-pointer"
            >
              <span>Explore Products</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            
            <button
              onClick={onContactClick}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all border border-white/20 hover:border-white/40 cursor-pointer"
            >
              <PhoneCall className="h-3.5 w-3.5 text-white" />
              <span>Contact Us</span>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6 sm:gap-8 pt-2 border-t border-white/10">
            {[
              { val: '1,200+', label: 'Products Available' },
              { val: 'UK Stock', label: 'Wolverhampton Hub' },
              { val: 'Trade & Private Label', label: 'Bulk Wholesale Ready' },
            ].map(({ val, label }) => (
              <div key={label}>
                <p className="text-lg sm:text-xl font-black text-white leading-none">{val}</p>
                <p className="text-[10px] text-slate-300 uppercase tracking-wider mt-1">{label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;
