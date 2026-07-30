import React from 'react';
import { X, User } from 'lucide-react';

const AuthModal = ({
  show,
  onClose,
  authMode,
  setAuthMode,
  authForm,
  handleAuthFormChange,
  handleAuthSubmit,
  authLoading,
  authError,
  authSuccess,
  setAuthError,
  setAuthSuccess,
}) => {
  if (!show) return null;

  const switchMode = (mode) => {
    setAuthMode(mode);
    setAuthError('');
    setAuthSuccess('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Box */}
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md p-8 relative z-10 shadow-2xl animate-fadeIn text-slate-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Brand header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-[#0b2545] flex items-center justify-center">
            <User className="h-5 w-5 text-[#c29a4a]" />
          </div>
          <div>
            <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Shelfmark LTD</p>
            <p className="text-sm font-black text-slate-900">
              {authMode === 'login' && 'Sign In'}
              {authMode === 'signup' && 'Create Account'}
              {authMode === 'forgot' && 'Reset Password'}
              {authMode === 'reset' && 'Set New Password'}
            </p>
          </div>
        </div>

        {/* ── Login Mode ── */}
        {authMode === 'login' && (
          <div>
            <p className="text-xs text-slate-500 mb-5">Sign in to manage orders and checkout faster.</p>
            {authSuccess && <div className="text-xs text-green-600 bg-green-50 p-3 rounded-xl mb-4 font-semibold border border-green-100">{authSuccess}</div>}
            {authError && <div className="text-xs text-red-500 bg-red-50 p-3 rounded-xl mb-4 font-semibold border border-red-100">{authError}</div>}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5">Email Address</label>
                <input
                  type="email" required name="email" value={authForm.email} onChange={handleAuthFormChange}
                  placeholder="your@email.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#c29a4a] placeholder:text-slate-400"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5">Password</label>
                <input
                  type="password" required name="password" value={authForm.password} onChange={handleAuthFormChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#c29a4a]"
                />
              </div>
              <button
                type="submit" disabled={authLoading}
                className="w-full py-3.5 bg-[#0b2545] hover:bg-[#07172a] text-white font-bold rounded-xl transition-all text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {authLoading ? (
                  <><div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white" /> Signing In...</>
                ) : 'Sign In'}
              </button>
            </form>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mt-4 border-t border-slate-100 pt-3">
              <button onClick={() => switchMode('forgot')} className="hover:text-[#0b2545] transition-colors cursor-pointer">Forgot Password?</button>
              <button onClick={() => switchMode('signup')} className="hover:text-[#0b2545] transition-colors cursor-pointer">Create Account →</button>
            </div>
          </div>
        )}

        {/* ── Signup Mode ── */}
        {authMode === 'signup' && (
          <div>
            <p className="text-xs text-slate-500 mb-5">Register to get fast UK tracking details.</p>
            {authError && <div className="text-xs text-red-500 bg-red-50 p-3 rounded-xl mb-4 font-semibold border border-red-100">{authError}</div>}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5">Full Name</label>
                <input
                  type="text" required name="name" value={authForm.name} onChange={handleAuthFormChange}
                  placeholder="John Doe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#c29a4a] placeholder:text-slate-400"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5">Email Address</label>
                <input
                  type="email" required name="email" value={authForm.email} onChange={handleAuthFormChange}
                  placeholder="your@email.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#c29a4a] placeholder:text-slate-400"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5">Password (min. 6 chars)</label>
                <input
                  type="password" required minLength={6} name="password" value={authForm.password} onChange={handleAuthFormChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#c29a4a]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5">Phone Number (Optional)</label>
                <input
                  type="text" name="phone" placeholder="+44 20 XXXX XXXX" value={authForm.phone} onChange={handleAuthFormChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#c29a4a] placeholder:text-slate-400"
                />
              </div>
              <button
                type="submit" disabled={authLoading}
                className="w-full py-3.5 bg-[#0b2545] hover:bg-[#07172a] text-white font-bold rounded-xl transition-all text-xs uppercase tracking-wider cursor-pointer disabled:opacity-60"
              >
                {authLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
            <div className="text-center text-xs font-semibold text-slate-500 mt-4 border-t border-slate-100 pt-3">
              Already have an account?{' '}
              <button onClick={() => switchMode('login')} className="text-[#0b2545] font-bold hover:underline cursor-pointer">Sign In</button>
            </div>
          </div>
        )}

        {/* ── Forgot Password Mode ── */}
        {authMode === 'forgot' && (
          <div>
            <p className="text-xs text-slate-500 mb-5">Enter your registered email and we'll send a verification code.</p>
            {authError && <div className="text-xs text-red-500 bg-red-50 p-3 rounded-xl mb-4 font-semibold border border-red-100">{authError}</div>}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5">Email Address</label>
                <input
                  type="email" required name="email" value={authForm.email} onChange={handleAuthFormChange}
                  placeholder="your@email.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#c29a4a] placeholder:text-slate-400"
                />
              </div>
              <button
                type="submit" disabled={authLoading}
                className="w-full py-3.5 bg-[#0b2545] hover:bg-[#07172a] text-white font-bold rounded-xl transition-all text-xs uppercase tracking-wider cursor-pointer disabled:opacity-60"
              >
                {authLoading ? 'Generating Code...' : 'Get Reset Code'}
              </button>
            </form>
            <div className="text-center text-xs font-semibold text-slate-500 mt-4 border-t border-slate-100 pt-3">
              <button onClick={() => switchMode('login')} className="text-[#0b2545] font-bold hover:underline cursor-pointer">← Back to Login</button>
            </div>
          </div>
        )}

        {/* ── Reset Password Mode ── */}
        {authMode === 'reset' && (
          <div>
            <p className="text-xs text-slate-500 mb-5">Enter the code sent to your email and your new password.</p>
            {authSuccess && <div className="text-xs text-green-700 bg-green-50 p-3 rounded-xl mb-4 font-semibold border border-green-100">{authSuccess}</div>}
            {authError && <div className="text-xs text-red-500 bg-red-50 p-3 rounded-xl mb-4 font-semibold border border-red-100">{authError}</div>}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5">Verification Code</label>
                <input
                  type="text" required name="resetCode" placeholder="6-Digit Code" value={authForm.resetCode} onChange={handleAuthFormChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 text-center font-bold tracking-widest focus:outline-none focus:border-[#c29a4a]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-500 font-bold mb-1.5">New Password (min. 6 chars)</label>
                <input
                  type="password" required minLength={6} name="newPassword" value={authForm.newPassword} onChange={handleAuthFormChange}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#c29a4a]"
                />
              </div>
              <button
                type="submit" disabled={authLoading}
                className="w-full py-3.5 bg-[#0b2545] hover:bg-[#07172a] text-white font-bold rounded-xl transition-all text-xs uppercase tracking-wider cursor-pointer disabled:opacity-60"
              >
                {authLoading ? 'Saving Password...' : 'Change Password'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
