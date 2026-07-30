import React, { useEffect } from 'react';

const IMG_HERO = "https://res.cloudinary.com/sfjl53dg/image/upload/v1784853625/pexels-karola-g-5650023_hnuenn.jpg";
const IMG_FULFILLMENT = "https://res.cloudinary.com/sfjl53dg/image/upload/v1784853625/pexels-karola-g-5650016_m2vjdj.jpg";
const IMG_TEAM = "https://res.cloudinary.com/sfjl53dg/image/upload/v1784853627/pexels-kindelmedia-7054753_gn4rw6.jpg";
const IMG_STRATEGY = "https://res.cloudinary.com/sfjl53dg/image/upload/v1784853628/pexels-ivan-s-7621533_ac5hdu.jpg";
const IMG_DELIVERY = "https://res.cloudinary.com/sfjl53dg/image/upload/v1784853628/pexels-cup-of-couple-6633803_gh88xe.jpg";

const AboutPage = ({ setView }) => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "About Shelfmark Ltd | Top Corporate England Wholesaler & E-Commerce Entity";

    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    const newDescText = "Learn about Shelfmark Ltd (shelfmarkltd), a top corporate England entity, premier UK wholesale supplier, and private label manufacturer based in Wolverhampton.";

    if (metaDesc) {
      metaDesc.setAttribute('content', newDescText);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.content = newDescText;
      document.head.appendChild(metaDesc);
    }

    try {
      window.history.pushState({}, '', '/about');
    } catch {
      // Fallback
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      document.title = originalTitle || "Shelfmark Ltd | Shop Quality Products Online at Affordable Prices";
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute('content', originalDesc);
      }
    };
  }, []);

  return (
    <article className="bg-slate-50 min-h-screen font-sans text-slate-800 animate-fadeIn">
      
      {/* ─────── HERO HEADER BANNER ─────── */}
      <section className="relative bg-slate-950 text-white min-h-[480px] flex items-center justify-center overflow-hidden py-20 px-6">
        <img
          src={IMG_HERO}
          alt="ShelfMark LTD Corporate Fulfillment Warehouse"
          className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">


          <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-300">
            Corporate Profile &amp; Retail Operations
          </p>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            About ShelfMark LTD
          </h1>

          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Redefining online retail through premier ecommerce products, verified quality standards, direct distribution, and corporate agency excellence across the United Kingdom.
          </p>
        </div>
      </section>

      {/* ─────── STATS HIGHLIGHTS STRIP ─────── */}
      <section className="bg-[#071527] text-white py-12 px-6 border-y border-slate-800">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-black text-white">100%</p>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Verified Products</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-black text-white">15+</p>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Retail Departments</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-black text-white">30 Day</p>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Return Guarantee</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-black text-white">UK Reg</p>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">No: 17319960</p>
          </div>
        </div>
      </section>

      {/* ─────── MAIN STORYTELLING SECTIONS ─────── */}
      <div className="max-w-6xl mx-auto py-16 px-6 space-y-20">

        {/* SECTION 1: Welcome & Mission (Image Left) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 relative rounded-md overflow-hidden shadow-xl border border-slate-200 group h-80 sm:h-96">
            <img
              src={IMG_FULFILLMENT}
              alt="ShelfMark LTD Inspection & Fulfillment"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 text-xs font-bold text-white bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/20 uppercase tracking-wider">
              Quality Assurance Inspection
            </span>
          </div>

          <div className="md:col-span-6 space-y-5">
            <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
              Our Foundations
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Welcome to ShelfMark LTD
            </h2>
            <p className="text-sm leading-relaxed text-slate-700">
              ShelfMark LTD is an officially incorporated corporate enterprise in England and Wales. We specialize in high grade ecommerce products, direct retail supply chain operations, and consumer agency management. Founded to redefine the UK digital retail landscape, ShelfMark LTD brings electronics, home essentials, furniture, kitchen utilities, fashion, and lifestyle items straight to your doorstep.
            </p>
            <p className="text-sm leading-relaxed text-slate-700">
              As a dedicated retail agency and distribution organization, ShelfMark LTD works directly with top manufacturers to curate an expansive catalog. Every product offered on the ShelfMark store undergoes stringent quality screening to guarantee absolute reliability.
            </p>
          </div>
        </section>

        {/* SECTION 2: Customer Experience & Agency Model (Image Right) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 space-y-5 order-2 md:order-1">
            <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
              Customer Centric Excellence
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Dedicated Retail Agency Model
            </h2>
            <p className="text-sm leading-relaxed text-slate-700">
              ShelfMark LTD operates as a full service product sourcing agency. Our team analyzes global consumer trends to introduce state of the art ecommerce products across 15 distinct departments. By maintaining direct relationships with factories and eliminating intermediary markups, ShelfMark LTD delivers premium goods at competitive prices.
            </p>
            <p className="text-sm leading-relaxed text-slate-700">
              Our customer service division at ShelfMark ensures prompt inquiry responses, clear delivery tracking, and courteous after sales support. We treat every order placed on ShelfMark with precision and care.
            </p>
          </div>

          <div className="md:col-span-6 relative rounded-md overflow-hidden shadow-xl border border-slate-200 group h-80 sm:h-96 order-1 md:order-2">
            <img
              src={IMG_TEAM}
              alt="ShelfMark Customer Experience Team"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 text-xs font-bold text-white bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/20 uppercase tracking-wider">
              Customer Support Center
            </span>
          </div>
        </section>

        {/* SECTION 3: Strategy & Standards (Image Left) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 relative rounded-md overflow-hidden shadow-xl border border-slate-200 group h-80 sm:h-96">
            <img
              src={IMG_STRATEGY}
              alt="ShelfMark Strategic Planning & Management"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 text-xs font-bold text-white bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/20 uppercase tracking-wider">
              Strategic Sourcing Operations
            </span>
          </div>

          <div className="md:col-span-6 space-y-5">
            <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
              Corporate Rigor
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Strict Quality &amp; Compliance Standards
            </h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Quality is non negotiable at ShelfMark LTD. Our strategic agency team tests product durability, electrical safety, material composition, and ergonomic design before any product enters the ShelfMark online store.
            </p>
            <p className="text-sm leading-relaxed text-slate-700">
              ShelfMark LTD complies with all regulatory commerce framework standards in England and Wales. Our transparent corporate practice ensures secure SSL checkout, clear return policies, and transparent legal documentation.
            </p>
          </div>
        </section>

        {/* SECTION 4: Doorstep Delivery & Fulfillment (Image Right) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 space-y-5 order-2 md:order-1">
            <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
              Logistics Network
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Rapid UK Doorstep Shipping
            </h2>
            <p className="text-sm leading-relaxed text-slate-700">
              ShelfMark LTD collaborates with top logistics agency providers across the United Kingdom to ensure fast dispatch and safe transit. Whether you order compact electronics or substantial furniture, ShelfMark handles packaging with maximum protective care.
            </p>
            <p className="text-sm leading-relaxed text-slate-700">
              Every parcel shipped by ShelfMark LTD carries full shipment tracking, giving you total peace of mind from our warehouse dispatch right up to your doorstep arrival.
            </p>
          </div>

          <div className="md:col-span-6 relative rounded-md overflow-hidden shadow-xl border border-slate-200 group h-80 sm:h-96 order-1 md:order-2">
            <img
              src={IMG_DELIVERY}
              alt="ShelfMark Doorstep Delivery"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 text-xs font-bold text-white bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/20 uppercase tracking-wider">
              Doorstep Parcel Dispatch
            </span>
          </div>
        </section>

        {/* CORPORATE REGISTRATION DETAILS BLOCK */}
        <section className="bg-white border border-slate-200 rounded-md p-8 md:p-12 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight border-b border-slate-100 pb-4">
            ShelfMark LTD Corporate Directory &amp; Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700 leading-relaxed">
            <div>
              <p className="font-extrabold text-slate-900 uppercase text-xs tracking-wider mb-2">Corporate Entity Information</p>
              <p><strong>Company Name:</strong> ShelfMark LTD</p>
              <p><strong>Registered Company Number:</strong> 17319960</p>
              <p><strong>Tax / UTR Number:</strong> 43491 13593</p>
              <p><strong>Jurisdiction:</strong> Registered in England and Wales</p>
            </div>
            <div>
              <p className="font-extrabold text-slate-900 uppercase text-xs tracking-wider mb-2">Headquarters &amp; Support</p>
              <p><strong>Registered Office:</strong> 1385 85 Dunstall Hill, Wolverhampton, WV60SR, United Kingdom</p>
              <p><strong>Phone Hotline:</strong> +44 7460013637</p>
              <p><strong>Official Email:</strong> admin@shelfmark.com</p>
              <p><strong>Wholesale &amp; Trade:</strong> Registered UK Wholesaler &amp; Private Label Supplier</p>
            </div>
          </div>
        </section>

      </div>
    </article>
  );
};

export default AboutPage;
