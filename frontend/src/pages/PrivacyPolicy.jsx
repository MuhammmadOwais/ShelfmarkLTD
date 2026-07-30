import React, { useEffect } from 'react';

const PrivacyPolicy = ({ setView }) => {
  // SEO Optimization: Update Document Title & Meta Description on Mount
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Privacy Policy - ShelfmarkLTD";

    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    const newDescText = "Read Shelfmark's Privacy Policy to learn how we collect, use, protect, and safeguard your personal information when you use our website and services.";
    
    if (metaDesc) {
      metaDesc.setAttribute('content', newDescText);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.content = newDescText;
      document.head.appendChild(metaDesc);
    }

    try {
      window.history.pushState({}, '', '/privacy-policy');
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

  // Schema.org JSON-LD structured data for Google Search Engine indexing
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - ShelfmarkLTD",
    "url": "https://shelfmark.com/privacy-policy",
    "description": "Read Shelfmark's Privacy Policy to learn how we collect, use, protect, and safeguard your personal information when you use our website and services.",
    "publisher": {
      "@type": "Organization",
      "name": "ShelfmarkLTD",
      "legalName": "Shelfmark LTD",
      "url": "https://shelfmark.com",
      "email": "admin@shelfmark.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1385 85 Dunstall Hill",
        "addressLocality": "Wolverhampton",
        "postalCode": "WV60SR",
        "addressCountry": "UK"
      }
    }
  };

  return (
    <article className="bg-slate-50 min-h-screen py-12 px-6 font-sans">
      
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-md p-8 md:p-14 shadow-sm">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8 border-b border-slate-100 pb-4">
          <button onClick={() => setView('shop')} className="hover:text-slate-900 transition-colors cursor-pointer">
            Home
          </button>
          <span>/</span>
          <span className="text-slate-900 font-bold">Privacy Policy</span>
        </div>

        {/* Document Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Privacy Policy Shelfmark LTD
          </h1>
          <p className="text-xs text-slate-500 font-semibold">
            Effective Date: January 1, 2026 | Official Data Protection Document of Shelfmark LTD
          </p>
        </header>

        {/* Full Width Paragraph Editorial Context */}
        <div className="space-y-8 text-sm leading-relaxed text-slate-700">
          
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              1. Introduction and Data Controller Information
            </h2>
            <p>
              At Shelfmark LTD (operating as Shelfmark and ShelfmarkLTD), protecting your personal privacy and safeguarding your personal data is a foundational priority. This Privacy Policy details how Shelfmark LTD collects, uses, processes, stores, and protects customer information when you visit the official Shelfmark website or place an order with Shelfmark.
            </p>
            <p>
              Shelfmark LTD acts as the primary data controller for all personal information collected through the Shelfmark platform. Shelfmark LTD is a registered company in England and Wales under Company Registration Number 17319960 and Tax UTR Number 43491 13593. The registered corporate office of Shelfmark LTD is situated at 1385 85 Dunstall Hill, Wolverhampton, WV60SR, United Kingdom. If you have any inquiries regarding how Shelfmark LTD handles your personal data, you may reach the Shelfmark privacy department directly via email at admin@shelfmark.com.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              2. Personal Information Shelfmark Collects
            </h2>
            <p>
              When you interact with Shelfmark, Shelfmark LTD collects specific categories of personal data necessary to provide seamless e-commerce services, process orders, and fulfill legal obligations. The data collected by Shelfmark includes your full name, email address, postal shipping address, billing address, contact phone number, and transaction history with Shelfmark LTD.
            </p>
            <p>
              Additionally, Shelfmark automatically collects technical device data when you browse the Shelfmark website. This data encompasses IP addresses, browser types, device information, operating systems, and page navigation metrics. Collecting this technical information allows Shelfmark LTD to optimize website performance, improve user experience across Shelfmark, and maintain robust cybersecurity protocols.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              3. Purpose and Legal Basis for Processing Data at ShelfmarkLTD
            </h2>
            <p>
              Shelfmark LTD processes customer data strictly under legitimate legal bases recognized under UK GDPR and Data Protection laws. Shelfmark uses your information to process transactions, dispatch Shelfmark orders, communicate order updates, provide customer support, and prevent fraudulent activities on the Shelfmark platform.
            </p>
            <p>
              Shelfmark LTD also utilizes anonymized customer analytics to refine the Shelfmark product catalog, optimize inventory across Shelfmark categories, and personalize marketing notifications when explicit consent is provided to Shelfmark.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              4. Third Party Data Sharing and Service Providers
            </h2>
            <p>
              Shelfmark LTD respects customer privacy and never sells, rents, or trades customer data to third party marketing agencies. Shelfmark LTD shares necessary information solely with trusted third party service providers who assist in operating the Shelfmark store. These providers include courier delivery partners, encrypted payment processors, hosting services, and legal compliance advisors working on behalf of Shelfmark LTD.
            </p>
            <p>
              All third party partners associated with Shelfmark LTD are legally bound to uphold strict data confidentiality and comply fully with UK GDPR security standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              5. Customer Rights under UK GDPR at Shelfmark
            </h2>
            <p>
              Under United Kingdom Data Protection legislation, every customer shopping with Shelfmark LTD holds full statutory rights regarding their personal data. You hold the right to request access to the personal records Shelfmark LTD maintains about you, the right to request correction of inaccurate Shelfmark account details, and the right to request deletion of your Shelfmark personal data where legal retention requirements permit.
            </p>
            <p>
              To exercise any of your data rights with Shelfmark LTD, please submit your written request to the Shelfmark privacy officer at admin@shelfmark.com. Shelfmark LTD responds to all verified data requests within statutory timeframes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              6. Data Security and Retention Standards
            </h2>
            <p>
              Shelfmark LTD implements enterprise grade technical and organizational security measures to protect customer data against unauthorized access, loss, or alteration. All transaction data submitted to Shelfmark is encrypted using SSL technology. Shelfmark LTD retains personal data only for as long as necessary to fulfill order processing and legal record keeping requirements.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              7. Contacting Shelfmark LTD Privacy Office
            </h2>
            <p>
              If you have any questions, comments, or concerns regarding this Privacy Policy or the data protection practices of Shelfmark LTD, please contact Shelfmark directly:
            </p>
            <p className="font-semibold text-slate-900">
              Shelfmark LTD<br />
              Company Number: 17319960<br />
              Tax UTR Number: 43491 13593<br />
              Address: 1385 85 Dunstall Hill, Wolverhampton, WV60SR, United Kingdom<br />
              Phone: +44 7460013637<br />
              Email: admin@shelfmark.com
            </p>
          </section>

        </div>
      </div>
    </article>
  );
};

export default PrivacyPolicy;
