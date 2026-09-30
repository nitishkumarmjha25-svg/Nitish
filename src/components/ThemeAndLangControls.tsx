import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Globe, ChevronDown, Check, Sparkles } from 'lucide-react';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../utils/i18n';

interface ThemeToggleProps {
  isDark: boolean;
  onToggleTheme: () => void;
  showLabel?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  isDark,
  onToggleTheme,
  showLabel = true,
  className = '',
}) => {
  return (
    <button
      onClick={onToggleTheme}
      type="button"
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer border ${
        isDark
          ? 'bg-stone-800 text-amber-300 hover:bg-stone-700 hover:text-amber-200 border-amber-400/40 ring-1 ring-amber-400/20'
          : 'bg-stone-100 text-stone-900 hover:bg-stone-200 hover:text-stone-950 border-stone-300 ring-1 ring-stone-900/10'
      } ${className}`}
    >
      {isDark ? (
        <>
          <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          <span>{showLabel ? '☀️ Light' : '☀️'}</span>
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 text-indigo-700" />
          <span>{showLabel ? '🌙 Dark' : '🌙'}</span>
        </>
      )}
    </button>
  );
};

interface LanguageSelectorProps {
  currentLang: SupportedLanguage;
  onSelectLang: (lang: SupportedLanguage) => void;
  isDark?: boolean;
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLang,
  onSelectLang,
  isDark = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
          isDark
            ? 'bg-stone-800/90 text-stone-200 border-stone-700 hover:bg-stone-700 shadow-2xs'
            : 'bg-white text-stone-800 border-stone-300/90 hover:bg-stone-50 shadow-2xs'
        }`}
      >
        <span className="text-sm">{selected.flag}</span>
        <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        <span className="font-bold">{selected.nativeName}</span>
        <ChevronDown className="w-3 h-3 opacity-60" />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-1.5 w-52 rounded-2xl p-1.5 shadow-2xl border z-50 animate-in fade-in zoom-in-95 duration-100 ${
            isDark
              ? 'bg-stone-900 border-stone-700 text-stone-200 shadow-black/80'
              : 'bg-white border-stone-200 text-stone-800 shadow-stone-400/40'
          }`}
        >
          <div
            className={`px-3 py-2 text-[10px] font-bold uppercase tracking-wider border-b ${
              isDark ? 'text-stone-400 border-stone-800' : 'text-stone-500 border-stone-100'
            }`}
          >
            Select Language / भाषा चुनें
          </div>
          <div className="space-y-0.5 pt-1 max-h-60 overflow-y-auto">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isCurrent = lang.code === currentLang;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    onSelectLang(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${
                    isCurrent
                      ? 'bg-emerald-800 text-white font-semibold'
                      : isDark
                      ? 'text-stone-300 hover:bg-stone-800'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{lang.flag}</span>
                    <span className="font-bold">{lang.nativeName}</span>
                    <span className="text-[10px] opacity-75">({lang.name})</span>
                  </div>
                  {isCurrent && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

interface FloatingQuickDockProps {
  isDark: boolean;
  onToggleTheme: () => void;
  currentLang: SupportedLanguage;
  onSelectLang: (lang: SupportedLanguage) => void;
}

/**
 * Floating Quick Dock pinned to bottom right of every screen
 * ensuring Dark Mode and Language Switcher are ALWAYS 100% visible and accessible.
 */
export const FloatingQuickDock: React.FC<FloatingQuickDockProps> = ({
  isDark,
  onToggleTheme,
  currentLang,
  onSelectLang,
}) => {
  const selected =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  return (
    <aside
      aria-label="Display & Language Controls"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 animate-in fade-in duration-300 drop-shadow-2xl"
    >
      <div
        className={`flex items-center gap-2 p-2 rounded-2xl border-2 shadow-2xl backdrop-blur-md transition-all ring-4 ${
          isDark
            ? 'bg-stone-900/98 border-emerald-500 text-stone-100 ring-emerald-500/20 shadow-black'
            : 'bg-white/98 border-emerald-600 text-stone-900 ring-emerald-600/15 shadow-emerald-950/25'
        }`}
      >
        <span
          className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider rounded-lg border ${
            isDark
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
          <span>Settings</span>
        </span>

        {/* Language Selector */}
        <LanguageSelector
          currentLang={currentLang}
          onSelectLang={onSelectLang}
          isDark={isDark}
        />

        {/* Dark/Light Mode Toggle with explicit label */}
        <ThemeToggle isDark={isDark} onToggleTheme={onToggleTheme} showLabel={true} />
      </div>
    </aside>
  );
};
