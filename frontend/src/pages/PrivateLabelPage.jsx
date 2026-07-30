import React, { useState, useEffect } from 'react';
import { Building2, ShieldCheck, PackageCheck, Truck, CheckCircle2, ArrowRight, Phone, Mail, FileText, Send, Award, Layers, Zap } from 'lucide-react';

const PrivateLabelPage = ({ setView }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    name: '',
    email: '',
    phone: '',
    category: 'Electronics',
    estimatedQuantity: '100 - 500 Units',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Top England Private Labels & UK Wholesale Manufacturing | Shelfmark Ltd";

    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    const newDescText = "Shelfmark Ltd (shelfmarkltd) provides top England private labels, custom product manufacturing, bespoke brand packaging, and volume UK wholesale supply.";

    if (metaDesc) {
      metaDesc.setAttribute('content', newDescText);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.content = newDescText;
      document.head.appendChild(metaDesc);
    }

    try {
      window.history.pushState({}, '', '/private-label');
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        businessName: '',
        name: '',
        email: '',
        phone: '',
        category: 'Electronics',
        estimatedQuantity: '100 - 500 Units',
        notes: '',
      });
    }, 1000);
  };

  return (
    <article className="bg-slate-50 min-h-screen font-sans text-slate-800 animate-fadeIn">
      
      {/* ─────── 1. EXECUTIVE CORPORATE HERO HEADER ─────── */}
      <section className="bg-[#071527] text-white py-20 px-6 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#040e1a] border border-slate-700/80 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider text-slate-300">
            <Award className="h-4 w-4 text-emerald-400" />
            <span>UK PRIVATE LABEL &amp; WHOLESALE MANUFACTURING DIVISION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Corporate Private Label &amp; Wholesale Supply
          </h1>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Shelfmark LTD partners directly with UK retailers, e-commerce brands, and commercial buyers for custom product branding, volume wholesale distribution, and Wolverhampton fulfillment.
          </p>
        </div>
      </section>

      {/* ─────── 2. 4 EXECUTIVE PILLARS GRID ─────── */}
      <div className="max-w-7xl mx-auto -mt-8 px-6 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg space-y-3">
            <div className="h-11 w-11 rounded-lg bg-[#071527] text-white flex items-center justify-center">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Custom Private Labeling</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
              Bespoke brand logo printing, custom retail packaging design, and UK barcode assignment.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg space-y-3">
            <div className="h-11 w-11 rounded-lg bg-[#071527] text-white flex items-center justify-center">
              <PackageCheck className="h-5 w-5" />
            </div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Tiered Wholesale Rates</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
              Direct volume bulk pricing with transparent Net Ex VAT invoicing for UK trade accounts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg space-y-3">
            <div className="h-11 w-11 rounded-lg bg-[#071527] text-white flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">UK Regulatory Compliance</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
              Full UKCA &amp; CE certification compliance with batch quality inspection before dispatch.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg space-y-3">
            <div className="h-11 w-11 rounded-lg bg-[#071527] text-white flex items-center justify-center">
              <Truck className="h-5 w-5" />
            </div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Wolverhampton Hub</h3>
            <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
              Fast 24-48hr UK mainland pallet freight dispatch &amp; Amazon FBA prep capabilities.
            </p>
          </div>

        </div>
      </div>

      {/* ─────── 3. MANUFACTURING WORKFLOW STEPS ─────── */}
      <div className="max-w-7xl mx-auto py-16 px-6 space-y-16">
        
        <div className="bg-white p-8 md:p-10 rounded-xl border border-slate-200 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="bg-slate-100 text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded inline-block">
              Corporate Workflow
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Our 4-Step Private Label Process
            </h2>
            <p className="text-xs text-slate-500">
              From concept development to nationwide UK store delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {[
              { num: '01', title: 'Consultation & Sampling', desc: 'Discuss product specifications, target volume, and receive pre-production physical samples.' },
              { num: '02', title: 'Branding & Packaging', desc: 'Apply custom logo artwork, brand packaging inserts, and UK compliant barcode labeling.' },
              { num: '03', title: 'Quality Assurance', desc: 'Batch manufacturing with multi-point UK quality control and safety standard verification.' },
              { num: '04', title: 'UK Warehousing & Logistics', desc: 'Secure storage at Wolverhampton hub with fast pallet dispatch or drop-shipping.' }
            ].map((step) => (
              <div key={step.num} className="bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-3 relative group">
                <span className="text-2xl font-black font-mono text-[#071527] block">
                  {step.num}
                </span>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ─────── 4. CORPORATE QUOTE & INQUIRY FORM ─────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-xl border border-slate-200 shadow-lg space-y-6">
            <div>
              <span className="bg-slate-100 text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded inline-block mb-2">
                Corporate Quotation Portal
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Request a Private Label Quote
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Fill out the form below to receive a formal wholesale pricing proposal and private label manufacturing quote.
              </p>
            </div>

            {submitted ? (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center space-y-4 animate-fadeIn">
                <CheckCircle2 className="h-14 w-14 text-emerald-600 mx-auto" />
                <h4 className="text-xl font-black text-slate-900">Quotation Request Received</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for submitting your private label inquiry. Our dedicated UK trade account team will review your specifications and contact you within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 bg-[#071527] text-white text-xs font-black uppercase tracking-wider rounded-md hover:bg-slate-800 transition-colors shadow-md cursor-pointer"
                >
                  Submit Another Quote
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                      Business / Brand Name *
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      required
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Apex Trading Ltd"
                      className="w-full bg-slate-50 border border-slate-200 rounded-md px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#071527] focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                      Contact Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Sarah Jenkins"
                      className="w-full bg-slate-50 border border-slate-200 rounded-md px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#071527] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="sarah@apextrading.co.uk"
                      className="w-full bg-slate-50 border border-slate-200 rounded-md px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#071527] focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+44 7460013637"
                      className="w-full bg-slate-50 border border-slate-200 rounded-md px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#071527] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                      Product Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-md px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#071527] focus:bg-white transition-colors cursor-pointer"
                    >
                      <option value="Electronics">Electronics &amp; Gadgets</option>
                      <option value="Fashion">Fashion &amp; Apparel</option>
                      <option value="HomeLiving">Home &amp; Kitchenware</option>
                      <option value="Beauty">Beauty &amp; Skincare</option>
                      <option value="Tools">Tools &amp; Hardware</option>
                      <option value="Health">Health &amp; Wellness</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                      Estimated Initial Volume *
                    </label>
                    <select
                      name="estimatedQuantity"
                      value={formData.estimatedQuantity}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-md px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#071527] focus:bg-white transition-colors cursor-pointer"
                    >
                      <option value="100 - 500 Units">100 - 500 Units</option>
                      <option value="500 - 2,000 Units">500 - 2,000 Units</option>
                      <option value="2,000 - 10,000 Units">2,000 - 10,000 Units</option>
                      <option value="10,000+ Container Loads">10,000+ Container Loads</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                    Project Requirements / Branding Details *
                  </label>
                  <textarea
                    name="notes"
                    required
                    rows="4"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Specify target product details, custom packaging needs, target retail price, or delivery timeline..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#071527] focus:bg-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#071527] hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider rounded-md transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  <span>{loading ? 'Submitting Quote Request...' : 'Submit Quote Request'}</span>
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#071527] text-white p-7 rounded-xl space-y-5 shadow-lg border border-slate-800">
              <div className="flex items-center gap-2 text-slate-200">
                <Building2 className="h-5 w-5 text-emerald-400" />
                <h4 className="text-sm font-black uppercase tracking-wider text-white">UK Corporate Contact Hub</h4>
              </div>

              <div className="text-xs text-slate-300 space-y-3 border-t border-slate-800 pt-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Trade Hotline</span>
                    <a href="tel:+447460013637" className="text-white font-black hover:underline">+44 7460013637</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Trade Email</span>
                    <a href="mailto:admin@shelfmark.com" className="text-white font-bold hover:underline">admin@shelfmark.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-slate-800">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-slate-300 leading-relaxed font-medium">
                    Official UK Registered Entity: <strong>Shelfmark LTD</strong><br />
                    Company Registration No: <strong>17319960</strong><br />
                    Warehouse: <strong>1385 85 Dunstall Hill, Wolverhampton, WV60SR, UK</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </article>
  );
};

export default PrivateLabelPage;
