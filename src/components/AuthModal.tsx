import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Store,
  ArrowRight,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Sparkles,
  Award,
  CheckCircle2,
  Smartphone,
  Check,
} from 'lucide-react';
import { SupportedLanguage, getTranslation } from '../utils/i18n';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignInSeller: (name: string, email: string) => void;
  onSignInAdmin: () => void;
  currentLang?: SupportedLanguage;
  isDark?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSignInSeller,
  onSignInAdmin,
  currentLang = 'en',
  isDark = false,
}) => {
  const [authRole, setAuthRole] = useState<'seller' | 'admin'>('seller');
  const [authType, setAuthType] = useState<'login' | 'signup' | 'otp'>('login');
  const [email, setEmail] = useState('care@villageharvest.in');
  const [password, setPassword] = useState('smartbrand2026');
  const [phoneNumber, setPhoneNumber] = useState('9820123456');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [businessName, setBusinessName] = useState('Village Harvest Collective');
  const [originLocation, setOriginLocation] = useState('Ratnagiri, Maharashtra');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const t = (key: string) => getTranslation(currentLang, key);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (authRole === 'admin') {
        onSignInAdmin();
        onClose();
        return;
      }

      if (authType === 'otp') {
        if (!phoneNumber || phoneNumber.length < 10) {
          setError('Please enter a valid 10-digit Indian phone number.');
          return;
        }
        if (!otpSent) {
          setOtpSent(true);
          setOtpCode('8921');
          return;
        }
      } else {
        if (!email.includes('@')) {
          setError('Please enter a valid business email address.');
          return;
        }
        if (password.length < 4) {
          setError('Password must be at least 4 characters.');
          return;
        }
      }

      onSignInSeller(businessName || 'Village Harvest Collective', email);
      onClose();
    }, 400);
  };

  const handleQuickDemoSeller = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignInSeller('Village Harvest Collective', 'care@villageharvest.in');
      onClose();
    }, 250);
  };

  const handleQuickDemoAdmin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignInAdmin();
      onClose();
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-4xl rounded-[28px] overflow-hidden border shadow-2xl transition-colors grid grid-cols-1 md:grid-cols-12 ${
          isDark
            ? 'bg-[#121922] border-stone-800 text-stone-100 shadow-black/80'
            : 'bg-white border-stone-200/90 text-stone-900 shadow-emerald-950/15'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-20 p-2 rounded-full transition-colors ${
            isDark
              ? 'text-stone-400 hover:text-white hover:bg-stone-800'
              : 'text-stone-500 hover:text-stone-950 hover:bg-stone-100'
          }`}
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Brand Value Showcase */}
        <div className="md:col-span-5 bg-gradient-to-br from-emerald-950 via-[#064e3b] to-[#022c22] text-white p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-amber-400/15 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-display font-bold text-white text-base">
                SB
              </div>
              <div>
                <span className="font-display font-bold text-lg tracking-tight">SmartBrand</span>
                <span className="block text-[10px] text-emerald-300 font-mono">
                  TRUST INFRASTRUCTURE
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[11px] font-semibold">
                <Sparkles className="w-3 h-3 text-emerald-300" />
                <span>Empowering Indian Emerging Brands</span>
              </div>
              <h3 className="font-display text-2xl font-bold leading-tight text-white">
                Turn Every Product Jar Into Proof of Quality.
              </h3>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Connect your business with real-time cryptographic QR packaging pages, NABL lab test
                records, and authentic customer trust.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-emerald-100">
                <div className="w-5 h-5 rounded-full bg-emerald-800/80 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-emerald-300" />
                </div>
                <span>Transparent NABL Lab microbial reports</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-emerald-100">
                <div className="w-5 h-5 rounded-full bg-emerald-800/80 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-emerald-300" />
                </div>
                <span>Printable 3×3 QR batch packaging stickers</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-emerald-100">
                <div className="w-5 h-5 rounded-full bg-emerald-800/80 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-emerald-300" />
                </div>
                <span>Full-Stack digital audit trail & consumer scans</span>
              </div>
            </div>
          </div>

          {/* Social Proof Quote */}
          <div className="relative z-10 pt-6 border-t border-emerald-800/60 mt-6">
            <div className="text-[11px] text-emerald-200/90 italic leading-relaxed">
              “SmartBrand doubled our offline repeat sales because customers could scan the jar and
              inspect our Konkan turmeric purity tests.”
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-emerald-300 font-mono">
              <span>Village Harvest Co-op</span>
              <span>Ratnagiri, MH</span>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Forms */}
        <div className="md:col-span-7 p-6 sm:p-9 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* Header Titles */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  {authRole === 'seller' ? 'Seller Brand Studio' : 'Platform Administration'}
                </span>
                <span className="text-stone-300 dark:text-stone-700">·</span>
                <span className="text-[11px] font-mono text-stone-500">v2.4 Secured</span>
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight mt-1 text-stone-900 dark:text-white">
                {authRole === 'admin'
                  ? 'Admin Verification Desk'
                  : authType === 'login'
                  ? 'Sign In to Your Studio'
                  : authType === 'signup'
                  ? 'Create Your Brand Studio'
                  : 'Instant Mobile OTP Login'}
              </h2>
            </div>

            {/* Role & Method Selectors */}
            <div className="space-y-2">
              {/* Role Toggle: Seller vs Admin */}
              <div
                className={`grid grid-cols-2 gap-1 p-1 rounded-xl border ${
                  isDark ? 'bg-stone-900 border-stone-800' : 'bg-stone-100 border-stone-200/80'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setAuthRole('seller');
                    setError('');
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    authRole === 'seller'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : isDark
                      ? 'text-stone-400 hover:text-white'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Seller Studio</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthRole('admin');
                    setError('');
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    authRole === 'admin'
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : isDark
                      ? 'text-stone-400 hover:text-white'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Console</span>
                </button>
              </div>

              {/* Sub-Tabs for Seller (Email Login vs Signup vs Mobile OTP) */}
              {authRole === 'seller' && (
                <div className="flex items-center gap-2 pt-1 border-b border-stone-200 dark:border-stone-800 pb-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthType('login');
                      setError('');
                    }}
                    className={`text-xs font-semibold pb-1 transition-all ${
                      authType === 'login'
                        ? 'text-emerald-800 dark:text-emerald-400 border-b-2 border-emerald-800 dark:border-emerald-400'
                        : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
                    }`}
                  >
                    Email Login
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthType('signup');
                      setError('');
                    }}
                    className={`text-xs font-semibold pb-1 transition-all ${
                      authType === 'signup'
                        ? 'text-emerald-800 dark:text-emerald-400 border-b-2 border-emerald-800 dark:border-emerald-400'
                        : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
                    }`}
                  >
                    New Registration
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthType('otp');
                      setError('');
                    }}
                    className={`text-xs font-semibold pb-1 transition-all flex items-center gap-1 ${
                      authType === 'otp'
                        ? 'text-emerald-800 dark:text-emerald-400 border-b-2 border-emerald-800 dark:border-emerald-400'
                        : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
                    }`}
                  >
                    <Smartphone className="w-3 h-3" />
                    <span>Mobile OTP</span>
                  </button>
                </div>
              )}
            </div>

            {/* Error Banner */}
            {error && (
              <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900/50 text-xs text-red-800 dark:text-red-300 font-medium">
                {error}
              </div>
            )}

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {authRole === 'seller' && authType === 'signup' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Brand / Business Name *
                    </label>
                    <div className="relative">
                      <Store className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Village Harvest"
                        className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Origin Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={originLocation}
                      onChange={(e) => setOriginLocation(e.target.value)}
                      placeholder="e.g. Ratnagiri, Maharashtra"
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                </div>
              )}

              {/* Mobile OTP Flow */}
              {authRole === 'seller' && authType === 'otp' ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Mobile Number (India +91)
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-2.5 rounded-xl border text-xs font-mono bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 shrink-0">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="98201 23456"
                        className="flex-1 px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-700 font-mono"
                      />
                    </div>
                  </div>

                  {otpSent && (
                    <div className="space-y-1 animate-in fade-in">
                      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                        Enter 4-Digit Verification Code
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="8921"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border tracking-widest text-center font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                      <span className="text-[11px] text-emerald-800 dark:text-emerald-400 font-mono">
                        Demo OTP: 8921 (auto-filled)
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                /* Email & Password Flow */
                <>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      {authRole === 'admin' ? 'Administrator Email' : 'Business Email Address *'}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={authRole === 'admin' ? 'admin@smartbrand.gov.in' : email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300">
                        {authRole === 'admin' ? 'Security Key / Password' : 'Password *'}
                      </label>
                      {authRole === 'seller' && (
                        <button
                          type="button"
                          onClick={() =>
                            setError('Password reset instructions sent to registered email.')
                          }
                          className="text-[11px] text-emerald-800 dark:text-emerald-400 hover:underline"
                        >
                          {t('forgotPassword')}
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-10 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-stone-600 dark:text-stone-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600"
                  />
                  <span>{t('rememberMe')}</span>
                </label>
                <span className="text-[11px] text-stone-400">256-bit SSL encrypted</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>
                      {authRole === 'admin'
                        ? 'Enter Admin Verification Console'
                        : authType === 'signup'
                        ? t('signUpBtn')
                        : authType === 'otp'
                        ? otpSent
                          ? 'Verify OTP & Enter Studio'
                          : 'Send Mobile OTP'
                        : t('signInBtn')}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick 1-Click Instant Demo Login Hub */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider">
                Instant 1-Click Demo Access
              </span>
              <span className="text-stone-400">No passwords needed</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleQuickDemoSeller}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all text-left flex items-center justify-between ${
                  isDark
                    ? 'bg-stone-800/80 border-stone-700 text-stone-200 hover:bg-stone-800'
                    : 'bg-emerald-50/80 border-emerald-200 text-emerald-950 hover:bg-emerald-100/80'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Store className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span className="truncate">Village Harvest (Seller)</span>
                </div>
                <ArrowRight className="w-3 h-3 opacity-60" />
              </button>

              <button
                type="button"
                onClick={handleQuickDemoAdmin}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all text-left flex items-center justify-between ${
                  isDark
                    ? 'bg-stone-800/80 border-stone-700 text-stone-200 hover:bg-stone-800'
                    : 'bg-stone-100 border-stone-200 text-stone-800 hover:bg-stone-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-700 dark:text-stone-300 shrink-0" />
                  <span className="truncate">Admin Verification Desk</span>
                </div>
                <ArrowRight className="w-3 h-3 opacity-60" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
