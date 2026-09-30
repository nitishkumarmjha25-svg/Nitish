import React from 'react';
import {
  X,
  Globe,
  Moon,
  Sun,
  LogOut,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  MousePointerClick,
} from 'lucide-react';
import { SupportedLanguage, SUPPORTED_LANGUAGES } from '../utils/i18n';

interface VisualControlsGuideProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  currentLang: SupportedLanguage;
  onSelectLang: (lang: SupportedLanguage) => void;
  onOpenDashboard?: () => void;
  onLogout?: () => void;
}

export const VisualControlsGuide: React.FC<VisualControlsGuideProps> = ({
  isOpen,
  onClose,
  isDark,
  onToggleTheme,
  currentLang,
  onSelectLang,
  onOpenDashboard,
  onLogout,
}) => {
  if (!isOpen) return null;

  const currentLangObj =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200 overflow-y-auto">
      <div
        className={`relative w-full max-w-3xl rounded-[28px] overflow-hidden border shadow-2xl transition-all my-auto ${
          isDark
            ? 'bg-[#121922] border-emerald-500/40 text-stone-100 shadow-black/90'
            : 'bg-white border-emerald-700/30 text-stone-900 shadow-emerald-950/25'
        }`}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-emerald-300 uppercase tracking-wider font-semibold">
                VISUAL SCREENSHOT GUIDE · दृश्य गाइड
              </div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-white">
                Dark Mode, Language & Logout Kidhar Hai?
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-7 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Visual UI Diagram (SVG Mockup) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
              <span className="font-bold uppercase tracking-wider">
                Website Interface Map (Kahan Kya Hai):
              </span>
              <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
                ● Live Position Diagram
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-600/60 dark:border-emerald-500/60 bg-stone-950 p-4 sm:p-6 text-white shadow-xl">
              {/* Simulated Browser Chrome */}
              <div className="flex items-center gap-1.5 pb-4 border-b border-stone-800 text-stone-500 text-xs font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-stone-400 text-[10px]">
                  https://smartbrand.io/app
                </span>
              </div>

              {/* Simulated Website Header with Red Pointer */}
              <div className="mt-3 p-3 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between relative">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-emerald-800 text-white font-bold text-[10px] flex items-center justify-center">
                    SB
                  </div>
                  <span className="font-display font-bold text-xs text-white">SmartBrand</span>
                </div>

                {/* Callout 1: Top Navbar Controls */}
                <div className="flex items-center gap-2 relative">
                  <div className="px-2.5 py-1 rounded-lg bg-emerald-950 border border-emerald-400 text-emerald-300 text-[11px] font-bold flex items-center gap-1 animate-pulse">
                    <Globe className="w-3 h-3" />
                    <span>{currentLangObj.flag} {currentLangObj.nativeName}</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-stone-800 border border-amber-400 text-amber-300 text-[11px] font-bold flex items-center gap-1">
                    {isDark ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                    <span>{isDark ? '☀️ Light' : '🌙 Dark'}</span>
                  </div>

                  {/* Red Arrow Pointer */}
                  <div className="absolute -top-7 right-6 text-red-400 font-bold text-xs flex items-center gap-1 bg-red-950/90 border border-red-500 px-2 py-0.5 rounded-full shadow-lg">
                    <span>▲ ① YAHAN HAI TOP CONTROLS</span>
                  </div>
                </div>
              </div>

              {/* Simulated Page Content */}
              <div className="mt-4 grid grid-cols-12 gap-3 h-36">
                {/* Left Sidebar Mockup */}
                <div className="col-span-4 rounded-xl bg-stone-900/90 border border-stone-800 p-2.5 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="h-2 w-16 bg-stone-700 rounded" />
                    <div className="h-2 w-20 bg-stone-800 rounded" />
                    <div className="h-2 w-14 bg-stone-800 rounded" />
                  </div>

                  {/* Callout 3: Logout Button in Sidebar */}
                  <div className="p-1.5 rounded-lg bg-red-950/60 border border-red-500/80 flex items-center justify-between text-[10px] text-red-300 font-bold relative">
                    <div className="flex items-center gap-1">
                      <LogOut className="w-3 h-3 text-red-400" />
                      <span>Log Out</span>
                    </div>
                    {/* Callout text */}
                    <span className="text-[9px] bg-red-800 text-white px-1 rounded">③ LOGOUT</span>
                  </div>
                </div>

                {/* Main Content Mockup */}
                <div className="col-span-8 rounded-xl bg-stone-900/40 border border-stone-800/80 p-3 flex flex-col justify-between relative">
                  <div className="space-y-1.5">
                    <div className="h-3 w-36 bg-emerald-800/70 rounded" />
                    <div className="h-2 w-48 bg-stone-700 rounded" />
                  </div>

                  {/* Callout 2: Floating Quick Dock in Bottom Right */}
                  <div className="self-end p-2 rounded-xl bg-gradient-to-r from-emerald-900 to-teal-900 border-2 border-emerald-400 text-white text-[11px] font-bold flex items-center gap-2 shadow-2xl relative">
                    <Globe className="w-3.5 h-3.5 text-emerald-300" />
                    <span>{currentLangObj.nativeName}</span>
                    <span className="text-emerald-300">|</span>
                    <span>{isDark ? '☀️ Light' : '🌙 Dark'}</span>

                    {/* Red Badge Indicator */}
                    <div className="absolute -top-7 right-0 text-red-300 font-bold text-[10px] bg-red-950 border border-red-500 px-2 py-0.5 rounded-full whitespace-nowrap shadow-lg">
                      <span>▼ ② SCREEN KE BOTTOM-RIGHT MEIN</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Step Direct Guide */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Step 1: Language */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <strong className="text-xs font-bold text-emerald-950 dark:text-emerald-300">
                  🌐 Language Switcher
                </strong>
              </div>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                Screen ke <strong>Top-Right</strong> aur <strong>Bottom-Right</strong> dono jagahon par Flag ke saath button hai:
              </p>
              <div className="pt-1 flex flex-wrap gap-1.5">
                {SUPPORTED_LANGUAGES.slice(0, 4).map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => onSelectLang(lang.code)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-all border ${
                      currentLang === lang.code
                        ? 'bg-emerald-800 text-white border-emerald-900'
                        : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    {lang.flag} {lang.nativeName}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Dark Mode */}
            <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-700 text-white font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <strong className="text-xs font-bold text-amber-950 dark:text-amber-300">
                  🌙 / ☀️ Dark & Light Mode
                </strong>
              </div>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                Ye button bhi Top-Right aur Bottom-Right dock mein hai. Yahan se bhi abhi try karein:
              </p>
              <button
                onClick={onToggleTheme}
                className="w-full py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>{isDark ? 'Switch to Light Mode ☀️' : 'Switch to Dark Mode 🌙'}</span>
              </button>
            </div>

            {/* Step 3: Logout */}
            <div className="p-4 rounded-2xl bg-red-50/80 dark:bg-red-950/30 border border-red-200 dark:border-red-800/60 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-700 text-white font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <strong className="text-xs font-bold text-red-950 dark:text-red-300">
                  🚪 Logout System
                </strong>
              </div>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                Seller Dashboard ke Left Sidebar ke bottom mein, aur Top bar mein Red Logout button hai:
              </p>
              {onLogout && (
                <button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Click to Log Out Now</span>
                </button>
              )}
            </div>
          </div>

          {/* Direct Try Controls inside Modal */}
          <div className="p-4 rounded-2xl bg-[#FAF9F5] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-stone-700 dark:text-stone-300">
                Aap website par direct kisi bhi samay niche diye gaye button se controls access kar sakte hain.
              </span>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-all shadow-sm"
            >
              OK, Samajh Gaya! (Close)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
