import React from 'react';
import { X, Mail } from 'lucide-react';

const NewsletterModal = ({
  show,
  onClose,
  email,
  setEmail,
  onSubmit,
  loading,
  success,
  error,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Box */}
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md p-8 relative z-10 shadow-2xl animate-fadeIn text-slate-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="text-center space-y-4">
          {/* Icon */}
          <div className="h-14 w-14 bg-[#c29a4a]/10 border border-[#c29a4a]/20 rounded-full flex items-center justify-center mx-auto">
            <Mail className="h-6 w-6 text-[#c29a4a]" />
          </div>

          {/* Heading */}
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-1">Subscribe to Newsletter</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Join our newsletter and receive automatic launch notifications when new products are added to our premium store.
            </p>
          </div>

          {/* Benefits list */}
          <div className="text-left bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2">
            {[
              '🆕 New product launch alerts',
              '💥 Exclusive member-only deals',
              '📦 Restock & availability updates',
            ].map(item => (
              <p key={item} className="text-xs text-slate-600 font-medium">{item}</p>
            ))}
          </div>

          {/* Success state */}
          {success && (
            <div className="text-xs text-green-600 bg-green-50 p-3.5 rounded-xl font-semibold border border-green-100">
              {success}
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="text-xs text-red-500 bg-red-50 p-3.5 rounded-xl font-semibold border border-red-100">
              {error}
            </div>
          )}

          {/* Form */}
          {!success && (
            <form onSubmit={onSubmit} className="space-y-3 pt-2">
              <div>
                <label className="block text-left text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5 pl-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#c29a4a] placeholder:text-slate-400 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#0b2545] hover:bg-[#07172a] text-white font-bold rounded-xl transition-all text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white" />
                    Subscribing...
                  </>
                ) : (
                  'Subscribe Now'
                )}
              </button>
              <p className="text-[10px] text-slate-400 text-center">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterModal;
