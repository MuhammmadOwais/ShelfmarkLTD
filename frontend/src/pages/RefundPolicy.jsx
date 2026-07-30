import React, { useEffect } from 'react';

const RefundPolicy = ({ setView }) => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Refund Policy | Shelfmark Ltd";

    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    const newDescText = "Read Shelfmark Ltd's Refund Policy to learn about our return, refund, and exchange process, eligibility requirements, and how we handle customer requests.";

    if (metaDesc) {
      metaDesc.setAttribute('content', newDescText);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.content = newDescText;
      document.head.appendChild(metaDesc);
    }

    try {
      window.history.pushState({}, '', '/refund-policy');
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
          <span className="text-slate-900 font-bold">Refund Policy</span>
        </div>

        {/* Document Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Refund Policy Shelfmark LTD
          </h1>
          <p className="text-xs text-slate-500 font-semibold">
            Effective Date: January 1, 2026 | Official Customer Satisfaction Guarantee of Shelfmark LTD
          </p>
        </header>

        {/* Full Width Paragraph Editorial Context */}
        <div className="space-y-8 text-sm leading-relaxed text-slate-700">
          
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              1. 30 Day Money Back Guarantee at Shelfmark LTD
            </h2>
            <p>
              At Shelfmark LTD operating as Shelfmark and ShelfmarkLTD, customer satisfaction is our paramount commitment. Shelfmark LTD provides a comprehensive 30 Day Money Back Guarantee for products purchased directly through the official Shelfmark e-commerce website. If you are not completely satisfied with your purchase from Shelfmark, you may be eligible to return the item for a refund or replacement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              2. Eligibility Criteria for Shelfmark Returns
            </h2>
            <p>
              To qualify for a refund from Shelfmark LTD, your returned product must meet specific Shelfmark eligibility standards. The item must remain unused, undamaged, and in the exact original condition as dispatched by Shelfmark LTD. The item must be returned inside its original manufacturer packaging accompanied by valid Shelfmark proof of purchase. Return requests must be logged with Shelfmark LTD within 30 days of item receipt.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              3. Return Procedure and Contact Instructions
            </h2>
            <p>
              To initiate a return with Shelfmark LTD, please send an email to the official Shelfmark support team at admin@shelfmark.com. Please state your Shelfmark order confirmation number and the specific item you wish to return. The Shelfmark support team will issue a return authorization and provide return shipping address details for Shelfmark LTD.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              4. Damaged or Defective Deliveries
            </h2>
            <p>
              In the event that a product arrives damaged or defective from Shelfmark LTD, please report the issue to Shelfmark support within 48 hours of delivery. Shelfmark LTD will provide a pre-paid return label and dispatch a replacement or issue a full refund including shipping costs.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              5. Corporate Information
            </h2>
            <p>
              Shelfmark LTD<br />
              Company Number: 17319960<br />
              Tax UTR Number: 43491 13593<br />
              Registered Address: 1385 85 Dunstall Hill, Wolverhampton, WV60SR, United Kingdom<br />
              Phone Hotline: +44 7460013637<br />
              Email: admin@shelfmark.com
            </p>
          </section>

        </div>
      </div>
    </article>
  );
};

export default RefundPolicy;
