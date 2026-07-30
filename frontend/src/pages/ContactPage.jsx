import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Building2, Send, CheckCircle2, Phone, Clock, ShieldCheck, HelpCircle, FileText, PackageCheck, Award } from 'lucide-react';

const ContactPage = ({ setView }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Retail',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Contact Shelfmark Ltd | UK Corporate Office & Trade Inquiry";

    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    const newDescText = "Contact Shelfmark Ltd UK headquarters for customer support, trade account applications, private label manufacturing quotes, or wholesale distribution inquiries. Call +44 7460013637.";

    if (metaDesc) {
      metaDesc.setAttribute('content', newDescText);
    } else {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.content = newDescText;
      document.head.appendChild(metaDesc);
    }

    try {
      window.history.pushState({}, '', '/contact');
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
      setFormData({ name: '', email: '', phone: '', inquiryType: 'Retail', subject: '', message: '' });
    }, 1000);
  };

  const FAQS = [
    {
      q: 'How do I open a UK Trade or Wholesale Account?',
      a: 'Simply select "B2B Trade Account Application" in our inquiry form or contact our trade team directly at +44 7460013637. We process trade applications within 24 business hours.'
    },
    {
      q: 'What is the order lead time for UK mainland dispatch?',
      a: 'All orders placed before 5:00 PM GMT are dispatched same-day from our Wolverhampton warehouse hub via tracked UK courier services.'
    },
    {
      q: 'Do you provide Private Label Product Manufacturing?',
      a: 'Yes, Shelfmark LTD works directly with UK brands and retailers to offer custom private label packaging, custom branding, and bulk product manufacturing solutions.'
    },
    {
      q: 'Are official UK VAT invoices provided with all purchases?',
      a: 'Yes, every order dispatched by Shelfmark LTD includes an official itemized UK VAT invoice featuring our Registered Company Number (17319960) and Tax UTR Number (43491 13593).'
    }
  ];

  return (
    <article className="bg-slate-50 min-h-screen font-sans text-slate-800 animate-fadeIn">
      
      {/* ─────── 1. EXECUTIVE HERO HEADER ─────── */}
      <section className="bg-[#071527] text-white py-20 px-6 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#040e1a] border border-slate-700/80 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider text-slate-300">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>REGISTERED UK CORPORATE OFFICE &amp; DISTRIBUTION HUB</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Contact Shelfmark Ltd
          </h1>

          <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Get in touch with our Wolverhampton head office for customer assistance, UK trade account applications, bulk wholesale quotes, or private label product manufacturing inquiries.
          </p>
        </div>
      </section>

      {/* ─────── 2. EXECUTIVE 4-CARD CONTACT GRID ─────── */}
      <div className="max-w-7xl mx-auto -mt-8 px-6 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Direct Phone Hotline */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg hover:border-slate-900 transition-all duration-300 flex flex-col justify-between space-y-4 group">
            <div className="flex items-center justify-between">
              <div className="h-11 w-11 rounded-lg bg-[#071527] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <Phone className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider">
                Direct Line
              </span>
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">UK Phone Hotline</h3>
              <p className="text-[11px] text-slate-500 mt-1 mb-2">Direct Customer &amp; Trade Support</p>
              <a href="tel:+447460013637" className="text-base font-black text-[#071527] hover:underline block">
                +44 7460013637
              </a>
            </div>
          </div>

          {/* Card 2: Official Support Email */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg hover:border-slate-900 transition-all duration-300 flex flex-col justify-between space-y-4 group">
            <div className="flex items-center justify-between">
              <div className="h-11 w-11 rounded-lg bg-[#071527] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <Mail className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-black text-slate-600 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">
                24 Hours
              </span>
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Official Email Inbox</h3>
              <p className="text-[11px] text-slate-500 mt-1 mb-2">Corporate &amp; Order Support</p>
              <a href="mailto:admin@shelfmark.com" className="text-sm font-black text-[#071527] hover:underline block truncate">
                admin@shelfmark.com
              </a>
            </div>
          </div>

          {/* Card 3: UK Registered Office */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg hover:border-slate-900 transition-all duration-300 flex flex-col justify-between space-y-4 group">
            <div className="flex items-center justify-between">
              <div className="h-11 w-11 rounded-lg bg-[#071527] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <MapPin className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-black text-slate-600 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">
                Headquarters
              </span>
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Registered Office</h3>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed font-medium">
                1385 85 Dunstall Hill, Wolverhampton, WV60SR, UK
              </p>
            </div>
          </div>

          {/* Card 4: Operating Hours */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-lg hover:border-slate-900 transition-all duration-300 flex flex-col justify-between space-y-4 group">
            <div className="flex items-center justify-between">
              <div className="h-11 w-11 rounded-lg bg-[#071527] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <Clock className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-black text-slate-600 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">
                GMT Hours
              </span>
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">UK Support Hours</h3>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed font-medium">
                Mon to Fri: 9:00 AM - 6:00 PM GMT<br />
                Replies within 24 business hours
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ─────── 3. MAIN CONTENT: FORM + MAP & CREDENTIALS ─────── */}
      <div className="max-w-7xl mx-auto py-16 px-6 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* LEFT COLUMN: EXECUTIVE TRADE & CUSTOMER INQUIRY FORM */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-xl border border-slate-200 shadow-lg space-y-6">
            <div>
              <span className="bg-slate-100 text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded inline-block mb-2">
                Official Inquiry Portal
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Send an Official Message
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Complete the form below for general order support, UK trade account applications, bulk volume pricing, or private label product quotes.
              </p>
            </div>

            {submitted ? (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center space-y-4 animate-fadeIn">
                <CheckCircle2 className="h-14 w-14 text-emerald-600 mx-auto" />
                <h3 className="text-xl font-black text-slate-900">Message Delivered Successfully</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Shelfmark Ltd. Your inquiry has been logged and our corporate support team will contact you shortly via phone (+44 7460013637) or email.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 bg-[#071527] text-white text-xs font-black uppercase tracking-wider rounded-md hover:bg-slate-800 transition-colors shadow-md cursor-pointer"
                >
                  Submit Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      className="w-full bg-slate-50 border border-slate-200 rounded-md px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#071527] focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-md px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#071527] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                      Inquiry Category *
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-md px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#071527] focus:bg-white transition-colors cursor-pointer"
                    >
                      <option value="Retail">Retail Customer Support</option>
                      <option value="Wholesale">UK Wholesale Bulk Order</option>
                      <option value="PrivateLabel">Private Label Manufacturing</option>
                      <option value="TradeAccount">B2B Trade Account Application</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                    Subject Line *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g., Wholesale Price List Request / Order Status Inquiry"
                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#071527] focus:bg-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                    Message &amp; Requirements *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please include product requirements, target quantities, or trade questions..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#071527] focus:bg-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#071527] hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider rounded-md transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  <span>{loading ? 'Sending Request...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            )}
          </div>

          {/* RIGHT COLUMN: MAP & UK CORPORATE CREDENTIALS */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Embedded Live Google Map */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Wolverhampton Head Office &amp; Dispatch
                </h3>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 font-bold px-2 py-0.5 rounded">
                  UK Warehouse
                </span>
              </div>
              <div className="w-full h-64 rounded-lg overflow-hidden border border-slate-200 shadow-inner">
                <iframe
                  title="Shelfmark Ltd Wolverhampton Head Office Map"
                  src="https://maps.google.com/maps?q=1385+85+Dunstall+Hill,+Wolverhampton,+WV60SR,+UK&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            </div>

            {/* Corporate & Trade Credentials Box */}
            <div className="bg-[#071527] text-white p-6 rounded-xl space-y-4 shadow-lg border border-slate-800">
              <div className="flex items-center gap-2 text-slate-200">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <h4 className="text-sm font-black uppercase tracking-wider text-white">UK Corporate Credentials</h4>
              </div>
              <div className="text-xs text-slate-300 space-y-2 border-t border-slate-800 pt-3">
                <p className="flex justify-between">
                  <span className="text-slate-400">Registered Entity:</span>
                  <strong className="text-white">Shelfmark LTD</strong>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-400">Company Registration No:</span>
                  <strong className="text-white">17319960</strong>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-400">Tax &amp; UTR Number:</span>
                  <strong className="text-white">43491 13593</strong>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-400">UK Phone Hotline:</span>
                  <a href="tel:+447460013637" className="text-white hover:underline font-bold">+44 7460013637</a>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-400">Jurisdiction:</span>
                  <span className="text-white font-semibold">England &amp; Wales</span>
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* ─────── 4. UK TRADE FAQ ACCORDION SECTION ─────── */}
        <div className="bg-white p-8 md:p-10 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="bg-slate-100 text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded inline-block">
              Trade &amp; Customer Support
            </span>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-slate-500">
              Find instant answers to common UK trade, dispatch, and ordering questions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-slate-50 p-5 rounded-lg border border-slate-200 space-y-2">
                <h4 className="text-xs font-black text-slate-900 tracking-tight flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 text-[#071527] shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
};

export default ContactPage;
