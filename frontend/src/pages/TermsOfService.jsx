import React, { useEffect } from 'react';

const TermsOfService = ({ setView }) => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Terms of Service | Shelfmark Ltd";

    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    const newDescText = "Read Shelfmark Ltd's Terms of Service to understand the rules, conditions, user responsibilities, and policies governing the use of our website and services.";

    if (metaDesc) {
      metaDesc.setAttribute('content', newDescText);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.content = newDescText;
      document.head.appendChild(metaDesc);
    }

    try {
      window.history.pushState({}, '', '/terms-of-service');
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
    <article className="bg-slate-50 min-h-screen py-12 px-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-md p-8 md:p-14 shadow-sm">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8 border-b border-slate-100 pb-4">
          <button onClick={() => setView('shop')} className="hover:text-slate-900 transition-colors cursor-pointer">
            Home
          </button>
          <span>/</span>
          <span className="text-slate-900 font-bold">Terms of Service</span>
        </div>

        {/* Document Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Terms of Service Shelfmark LTD
          </h1>
          <p className="text-xs text-slate-500 font-semibold">
            Effective Date: January 1, 2026 | Official Legal Terms of Shelfmark LTD
          </p>
        </header>

        {/* Full Width Paragraph Editorial Context */}
        <div className="space-y-8 text-sm leading-relaxed text-slate-700">
          
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              1. Agreement to Terms with Shelfmark LTD
            </h2>
            <p>
              Welcome to Shelfmark LTD operating as Shelfmark and ShelfmarkLTD. By accessing the Shelfmark online platform or placing an order with Shelfmark LTD, you acknowledge that you have read, understood, and agreed to be legally bound by these Terms of Service. If you do not accept these terms, you should refrain from using the Shelfmark website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              2. Corporate Identification and Registered Entity
            </h2>
            <p>
              Shelfmark LTD is an officially incorporated company registered in England and Wales under Company Registration Number 17319960. The Tax UTR Number for Shelfmark LTD is 43491 13593. The registered corporate headquarters of Shelfmark LTD is located at 1385 85 Dunstall Hill, Wolverhampton, WV60SR, United Kingdom. All official correspondence with Shelfmark LTD may be submitted via email to admin@shelfmark.com.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              3. Product Catalog and Pricing Policies at Shelfmark
            </h2>
            <p>
              Shelfmark LTD makes every reasonable effort to ensure that product descriptions, pricing, specifications, and availability displayed on the Shelfmark store are accurate. All pricing across Shelfmark is rendered in British Pounds. Shelfmark LTD reserves the right to correct typographical errors, amend prices, or update product lines without prior notification.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              4. Order Acceptance and Payment Conditions
            </h2>
            <p>
              Submitting an order on Shelfmark represents an offer to purchase goods from Shelfmark LTD. Shelfmark LTD reserves the right to decline or cancel any order for reasons including inventory constraints, pricing discrepancies, or payment verification issues. All payments submitted to Shelfmark are processed through secure encrypted channels.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              5. Shipping and Delivery Terms
            </h2>
            <p>
              Shelfmark LTD provides UK nationwide delivery services for items purchased on Shelfmark. Delivery dates communicated by Shelfmark are estimates. Shelfmark LTD is not responsible for minor delays resulting from third party courier schedules.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              6. Legal Inquiries and Contact
            </h2>
            <p>
              For legal or wholesale trade inquiries regarding Shelfmark LTD or these Terms of Service, please contact our team by phone at +44 7460013637 or by email at admin@shelfmark.com.
            </p>
          </section>

        </div>
      </div>
    </article>
  );
};

export default TermsOfService;
