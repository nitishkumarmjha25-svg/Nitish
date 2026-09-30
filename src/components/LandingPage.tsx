import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Eye,
  Smartphone,
  FileCheck2,
  ShieldCheck,
  BarChart3,
  Star,
  MapPin,
  Package,
  QrCode,
  Sparkles,
  Award,
  ChevronRight,
  Heart,
  Calendar,
  Check,
  Play,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Product } from '../types/smartbrand';
import { ProductImage, getArtisanWorkshopBannerUri } from '../utils/productArtwork';
import { SupportedLanguage, getTranslation } from '../utils/i18n';
import { ThemeToggle, LanguageSelector } from './ThemeAndLangControls';

interface LandingPageProps {
  featuredProduct: Product;
  allProducts: Product[];
  totalScans: number;
  onStartBuilding: () => void;
  onExploreDemo: () => void;
  onOpenLogin: () => void;
  onOpenQRProfile: (productId: string) => void;
  onOpenAdminPanel: () => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
  currentLang?: SupportedLanguage;
  onSelectLang?: (lang: SupportedLanguage) => void;
  currentUser?: { name: string; email: string; role: 'seller' | 'admin' } | null;
  onLogout?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  featuredProduct,
  allProducts,
  totalScans,
  onStartBuilding,
  onExploreDemo,
  onOpenLogin,
  onOpenQRProfile,
  onOpenAdminPanel,
  isDark = false,
  onToggleTheme = () => {},
  currentLang = 'en',
  onSelectLang = () => {},
  currentUser = null,
  onLogout = () => {},
}) => {
  const mangoPickleUrl = `${window.location.origin}${window.location.pathname}?product=${featuredProduct.id}`;
  const workshopBannerUri = getArtisanWorkshopBannerUri();
  const [heroPreviewMode, setHeroPreviewMode] = useState<
    'packaging' | 'mobile' | 'lab' | 'analytics'
  >('packaging');

  const t = (key: string) => getTranslation(currentLang, key);

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#101614] text-[#1A1E1C] dark:text-[#EBF2EE] selection:bg-emerald-200 selection:text-emerald-950">
      {/* Editorial Announcement Banner */}
      <div className="bg-[#17382B] text-[#E8F0EB] px-4 py-2 text-xs text-center border-b border-emerald-900/60 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-800/80 text-[11px] font-semibold text-emerald-200">
            🌿 Handcrafted in Bharat
          </span>
          <span>
            Digital provenance & batch QR labels for India's independent food-makers, farm collectives & artisans.
          </span>
          <button
            onClick={onExploreDemo}
            className="underline underline-offset-2 font-bold hover:text-white transition-colors cursor-pointer ml-1"
          >
            Explore Village Harvest Demo →
          </button>
        </div>
      </div>

      {/* Main Artisan Header / Navbar */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 dark:bg-[#101614]/95 backdrop-blur border-b border-[#E8E1D5] dark:border-[#24332D] px-4 sm:px-8 py-3.5 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <a
              href="#top"
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-[#17382B] text-white flex items-center justify-center font-display font-bold text-base shadow-xs group-hover:scale-105 transition-transform">
                SB
              </div>
              <div className="leading-tight">
                <span className="font-display text-xl font-bold tracking-tight text-[#17382B] dark:text-emerald-400">
                  SmartBrand
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Artisanal Provenance
                </span>
              </div>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-stone-600 dark:text-stone-300">
            <a
              href="#why-provenance"
              className="hover:text-emerald-900 dark:hover:text-emerald-300 hover:underline underline-offset-4 transition-colors"
            >
              Why Provenance?
            </a>
            <a
              href="#how-it-works"
              className="hover:text-emerald-900 dark:hover:text-emerald-300 hover:underline underline-offset-4 transition-colors"
            >
              {t('howItWorks')}
            </a>
            <a
              href="#packaging-station"
              className="hover:text-emerald-900 dark:hover:text-emerald-300 hover:underline underline-offset-4 transition-colors"
            >
              Packaging & Labels
            </a>
            <a
              href="#producer-story"
              className="hover:text-emerald-900 dark:hover:text-emerald-300 hover:underline underline-offset-4 transition-colors"
            >
              Village Harvest Story
            </a>
          </nav>

          {/* Controls: Language, Theme & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector */}
            <LanguageSelector
              currentLang={currentLang}
              onSelectLang={onSelectLang}
              isDark={isDark}
            />

            {/* Theme Toggle */}
            <ThemeToggle isDark={isDark} onToggleTheme={onToggleTheme} />

            {/* Auth Actions */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onStartBuilding}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#17382B] hover:bg-[#122C22] rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  {t('overview')}
                </button>
                <button
                  onClick={onLogout}
                  className="px-3 py-1.5 text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-red-700 dark:hover:text-red-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-colors cursor-pointer"
                  title="Log out of your current session"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenLogin}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:text-stone-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  {t('login')}
                </button>
                <button
                  onClick={onStartBuilding}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#17382B] hover:bg-[#122C22] rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  Enter Studio
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section: Handcrafted Workshop & Provenance */}
      <section id="top" className="pt-10 pb-16 sm:pt-14 sm:pb-20 px-4 sm:px-8 border-b border-[#E8E1D5] dark:border-[#24332D]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Human Story & Value */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF3ED] dark:bg-[#1B2C24] border border-[#C5DDD0] dark:border-[#2D4D3E] text-xs font-semibold text-[#17382B] dark:text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Built for True Producers · No Tech Experience Needed</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-[50px] font-bold text-[#14231C] dark:text-white leading-[1.14] tracking-tight">
              Your jars and packets hold months of hard work.
              <span className="block italic text-[#17382B] dark:text-emerald-400 font-normal">
                Let your customers see that story.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl">
              When shoppers pick up your honey, pickle, tea, or cold-pressed oil, a quick camera scan reveals your exact harvest orchard, FSSAI registration, and certified lab purity. Turn first-time buyers into lifelong regulars.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                onClick={onStartBuilding}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#17382B] hover:bg-[#112920] rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Open Seller Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreDemo}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-stone-800 dark:text-stone-100 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 border border-[#D9D1C3] dark:border-[#34453D] rounded-xl transition-all cursor-pointer shadow-2xs"
              >
                <Play className="w-4 h-4 text-emerald-700 dark:text-emerald-400 fill-emerald-700 dark:fill-emerald-400" />
                <span>See Demo (Village Harvest)</span>
              </button>
            </div>

            {/* 3 Real Human Commitments */}
            <div className="pt-4 border-t border-[#E8E1D5] dark:border-[#24332D] grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-[#17382B] dark:text-emerald-400 tabular-nums">
                  {totalScans.toLocaleString()}+
                </div>
                <div className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 leading-snug">
                  Shoppers scanned sample jars in Dadar & Bengaluru stores
                </div>
              </div>
              <div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-[#17382B] dark:text-emerald-400 tabular-nums">
                  0 Apps
                </div>
                <div className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 leading-snug">
                  Scans straight from standard iPhone & Android camera
                </div>
              </div>
              <div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-[#17382B] dark:text-emerald-400 tabular-nums">
                  A4 Ready
                </div>
                <div className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 leading-snug">
                  Print label sheets on any household or local printer
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The Artisan Workbench & Packaging Station */}
          <div className="lg:col-span-6" id="packaging-station">
            <div className="bg-white dark:bg-[#15201B] border border-[#E2DBD0] dark:border-[#263730] rounded-2xl p-5 sm:p-6 shadow-lg space-y-4 relative">
              {/* Station Header & View Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EBE5DB] dark:border-[#24332D] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                    Artisan Packaging & Trust Workbench
                  </span>
                </div>

                <div className="p-1 rounded-xl bg-[#F4EFE6] dark:bg-[#1A2621] flex items-center gap-1">
                  <button
                    onClick={() => setHeroPreviewMode('packaging')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      heroPreviewMode === 'packaging'
                        ? 'bg-white dark:bg-[#25362F] text-[#17382B] dark:text-emerald-300 shadow-2xs font-bold'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    <Package className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Physical Jar</span>
                  </button>
                  <button
                    onClick={() => setHeroPreviewMode('mobile')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      heroPreviewMode === 'mobile'
                        ? 'bg-white dark:bg-[#25362F] text-[#17382B] dark:text-emerald-300 shadow-2xs font-bold'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Phone View</span>
                  </button>
                  <button
                    onClick={() => setHeroPreviewMode('lab')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      heroPreviewMode === 'lab'
                        ? 'bg-white dark:bg-[#25362F] text-[#17382B] dark:text-emerald-300 shadow-2xs font-bold'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    <FileCheck2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Lab Certificate</span>
                  </button>
                  <button
                    onClick={() => setHeroPreviewMode('analytics')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      heroPreviewMode === 'analytics'
                        ? 'bg-white dark:bg-[#25362F] text-[#17382B] dark:text-emerald-300 shadow-2xs font-bold'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Shopper Scans</span>
                  </button>
                </div>
              </div>

              {/* View 1: Physical Jar & Printable Sticker */}
              {heroPreviewMode === 'packaging' && (
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-7 relative rounded-xl overflow-hidden border border-[#DED7CB] dark:border-[#2C3E36] aspect-4/3 bg-stone-100 dark:bg-stone-900 group">
                    <ProductImage
                      src={featuredProduct.imageUrl}
                      alt={featuredProduct.name}
                      title={featuredProduct.name}
                      category={featuredProduct.category}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-3.5 text-white">
                      <div className="text-[10px] font-mono tracking-wider opacity-90 text-emerald-300">
                        VILLAGE HARVEST COLLECTIVE · RATNAGIRI, MH
                      </div>
                      <div className="text-sm font-bold">{featuredProduct.name}</div>
                      <div className="text-[11px] opacity-85 mt-0.5">
                        Batch #{featuredProduct.batchNumber} · Packed with Cold-Pressed Mustard Oil
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-5 bg-[#FAF7F2] dark:bg-[#19241F] border border-[#E4DDD1] dark:border-[#2B3B34] rounded-xl p-4 flex flex-col items-center text-center justify-between h-full space-y-3">
                    <div className="text-xs font-bold text-[#17382B] dark:text-emerald-300 flex items-center gap-1">
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Tamper-Seal Product QR</span>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-stone-200 shadow-xs">
                      <QRCodeSVG
                        value={mangoPickleUrl}
                        size={108}
                        bgColor="#FFFFFF"
                        fgColor="#162E24"
                        level="M"
                      />
                    </div>

                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                        Scan with your phone
                      </div>
                      <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                        MRP ₹{featuredProduct.priceInr} · Net Wt. 400g
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenQRProfile(featuredProduct.id)}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-[#17382B] hover:bg-[#122A20] rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 whitespace-nowrap"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Open Customer Trust Page</span>
                    </button>
                  </div>
                </div>
              )}

              {/* View 2: What the Shopper Sees on Phone */}
              {heroPreviewMode === 'mobile' && (
                <div className="bg-[#17221D] text-stone-100 rounded-xl p-4 sm:p-5 space-y-3 shadow-inner">
                  <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-700/60 pb-2">
                    <div className="flex items-center gap-1.5 font-mono text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>smartbrand.io/p/{featuredProduct.batchNumber}</span>
                    </div>
                    <span className="text-[10px] bg-stone-800 px-2 py-0.5 rounded text-stone-300">
                      Shopper Mobile Browser
                    </span>
                  </div>

                  <div className="space-y-2 bg-[#202E28] rounded-xl p-3.5 border border-[#2B3E36]">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/90 border border-emerald-700/60 px-2 py-0.5 rounded">
                        ✓ Genuine Orchard Harvest
                      </span>
                      <span className="text-xs font-mono text-stone-300">₹{featuredProduct.priceInr}</span>
                    </div>
                    <div className="text-sm font-bold text-white">{featuredProduct.name}</div>
                    <div className="text-xs text-stone-300 leading-relaxed">
                      Hand-cut sun-cured Rajapuri raw mangoes in wood-pressed mustard oil with heirloom fenugreek & whole red chillies from Ratnagiri, Maharashtra.
                    </div>
                    <div className="pt-2 border-t border-stone-700/60 flex items-center justify-between text-[11px]">
                      <span className="text-stone-400">Microbial Analysis:</span>
                      <span className="text-emerald-300 font-semibold">Passed & Safe (NABL Ref #8841) ✓</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="text-xs text-stone-300 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <strong>4.8 ★</strong>
                      <span className="text-stone-400">(5 verified buyer reviews)</span>
                    </div>
                    <button
                      onClick={() => onOpenQRProfile(featuredProduct.id)}
                      className="text-xs font-semibold text-emerald-300 hover:underline cursor-pointer"
                    >
                      Open Live Screen →
                    </button>
                  </div>
                </div>
              )}

              {/* View 3: Authentic NABL Lab Certificate Card */}
              {heroPreviewMode === 'lab' && (
                <div className="bg-[#FAF7F2] dark:bg-[#19241F] border border-[#E4DDD1] dark:border-[#2B3B34] rounded-xl p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 flex items-center justify-center font-bold text-xs border border-emerald-300 dark:border-emerald-700">
                        NABL
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                          Microbial & Heavy Metal Purity Report
                        </div>
                        <div className="text-[10px] font-mono text-stone-500 dark:text-stone-400">
                          Ref: LAB-KONKAN-2026-8841 · NABL Accredited Testing Facility
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                      Admin Verified ✓
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2.5 bg-white dark:bg-[#202E28] rounded-xl border border-stone-200/90 dark:border-[#2B3E36]">
                      <div className="text-[10px] text-stone-500 dark:text-stone-400 font-mono">Moisture & Salt Ratio</div>
                      <div className="font-bold text-stone-900 dark:text-stone-100 mt-0.5">14.2% (Preserves freshness naturally)</div>
                      <div className="text-[10px] text-emerald-800 dark:text-emerald-300 font-semibold">Standard Passed ✓</div>
                    </div>
                    <div className="p-2.5 bg-white dark:bg-[#202E28] rounded-xl border border-stone-200/90 dark:border-[#2B3E36]">
                      <div className="text-[10px] text-stone-500 dark:text-stone-400 font-mono">Total Plate Count</div>
                      <div className="font-bold text-stone-900 dark:text-stone-100 mt-0.5">&lt; 10 CFU/g</div>
                      <div className="text-[10px] text-emerald-800 dark:text-emerald-300 font-semibold">Microbial Safe ✓</div>
                    </div>
                    <div className="p-2.5 bg-white dark:bg-[#202E28] rounded-xl border border-stone-200/90 dark:border-[#2B3E36]">
                      <div className="text-[10px] text-stone-500 dark:text-stone-400 font-mono">Synthetic Colorants</div>
                      <div className="font-bold text-stone-900 dark:text-stone-100 mt-0.5">Zero (Not Detected)</div>
                      <div className="text-[10px] text-emerald-800 dark:text-emerald-300 font-semibold">100% Unadulterated ✓</div>
                    </div>
                    <div className="p-2.5 bg-white dark:bg-[#202E28] rounded-xl border border-stone-200/90 dark:border-[#2B3E36]">
                      <div className="text-[10px] text-stone-500 dark:text-stone-400 font-mono">FSSAI Basic License</div>
                      <div className="font-bold text-stone-900 dark:text-stone-100 mt-0.5">#21524021000189</div>
                      <div className="text-[10px] text-emerald-800 dark:text-emerald-300 font-semibold">Active Record ✓</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-stone-500 dark:text-stone-400 italic pt-1">
                    * Authenticity note: Displays producer lab certificates with explicit distinction between uploaded documents and admin-verified records.
                  </div>
                </div>
              )}

              {/* View 4: Live Shopper Scan Telemetry */}
              {heroPreviewMode === 'analytics' && (
                <div className="bg-[#FAF7F2] dark:bg-[#19241F] border border-[#E4DDD1] dark:border-[#2B3B34] rounded-xl p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                        In-Store Shopper Scan Log
                      </div>
                      <div className="text-[10px] text-stone-500 dark:text-stone-400 font-mono">
                        {totalScans.toLocaleString()} real shopper scans recorded across batches
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-900 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-300 dark:border-emerald-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      <span>Live Stream</span>
                    </span>
                  </div>

                  <div className="space-y-2 text-xs pt-1">
                    {[
                      { city: 'Mumbai (Dadar Farmers Market & Bandra Organic)', scans: '684 scans', pct: '37%', color: 'bg-emerald-800' },
                      { city: 'Bengaluru (Indiranagar Gourmet Bazaar)', scans: '492 scans', pct: '27%', color: 'bg-teal-700' },
                      { city: 'Pune (Kothrud Cooperative Store)', scans: '380 scans', pct: '21%', color: 'bg-emerald-600' },
                      { city: 'New Delhi (Dilli Haat Craft Pavilion)', scans: '210 scans', pct: '11%', color: 'bg-amber-600' },
                    ].map((item) => (
                      <div key={item.city} className="space-y-0.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-medium text-stone-800 dark:text-stone-200">{item.city}</span>
                          <span className="font-mono text-stone-500 dark:text-stone-400">{item.scans} ({item.pct})</span>
                        </div>
                        <div className="w-full bg-stone-200 dark:bg-stone-700 h-1.5 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color} rounded-full`} style={{ width: item.pct }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#E8E1D5] dark:border-[#24332D] flex items-center justify-between text-[11px] text-stone-600 dark:text-stone-400">
                    <span>Shoppers who scanned & subsequently bought:</span>
                    <strong className="text-[#17382B] dark:text-emerald-300 font-mono">71.9% Conversion</strong>
                  </div>
                </div>
              )}

              {/* Bottom Workbench Trust Pill */}
              <div className="pt-3 border-t border-[#E8E1D5] dark:border-[#24332D] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
                  <span className="text-stone-700 dark:text-stone-300 font-medium">
                    Village Harvest Collective · 4 active batch codes online
                  </span>
                </div>
                <button
                  onClick={onStartBuilding}
                  className="font-bold text-[#17382B] dark:text-emerald-400 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>Open Studio</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Why Good Small-Batch Products Get Overlooked (Human Problem & Honest Solution) */}
      <section id="why-provenance" className="py-16 bg-white dark:bg-[#121B17] border-b border-[#E8E1D5] dark:border-[#24332D] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#17382B] dark:text-emerald-400">
              The Reality on Grocery Shelves
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#14231C] dark:text-white">
              Why Great Handcrafted Products Struggle on Crowded Shelves.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
              Customers want to support local kitchen collectives, organic farmers, and regional makers. But unverified stickers and generic labels make shoppers hesitate about hygiene, batch freshness, and ingredient purity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF7F2] dark:bg-[#18241F] border border-[#E6DFD4] dark:border-[#293B33] space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#17382B] dark:text-emerald-300 flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                Uncertain Harvest Dates
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                When shoppers pick up a jar, they don't know if the honey or pickle was packed last week or sitting in a godown for 10 months. SmartBrand displays the exact harvest date and batch size.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] dark:bg-[#18241F] border border-[#E6DFD4] dark:border-[#293B33] space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#17382B] dark:text-emerald-300 flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                Customer Fear of Adulteration
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Shoppers worry about synthetic food dyes, industrial preservatives, and sugar syrup. Scanning your QR code immediately opens your NABL microbial purity and test results.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF7F2] dark:bg-[#18241F] border border-[#E6DFD4] dark:border-[#293B33] space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#17382B] dark:text-emerald-300 flex items-center justify-center font-mono font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100">
                No Direct Way for Word-of-Mouth
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Once a jar is taken home, the producer loses contact. With SmartBrand, the customer scans the jar at breakfast to re-order or leave an authentic verified review.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Simple 3-Step Maker Workflow */}
      <section id="how-it-works" className="py-16 px-4 sm:px-8 border-b border-[#E8E1D5] dark:border-[#24332D]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#17382B] dark:text-emerald-400">
              Simple 3-Step Process
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#14231C] dark:text-white">
              From Kitchen or Workshop to Labeled Jars in Minutes.
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-300">
              Designed for busy makers who spend their time crafting produce, not writing code or managing servers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="font-mono text-sm font-bold text-[#17382B] dark:text-emerald-400">
                01. Enter Batch & Origin
              </div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                Fill in Your Harvest Details
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Enter your product name, ingredients, harvest village or orchard, batch number, and manufacturing & expiry dates.
              </p>
            </div>

            <div className="space-y-3">
              <div className="font-mono text-sm font-bold text-[#17382B] dark:text-emerald-400">
                02. Attach Real Proof
              </div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                Upload FSSAI & Lab Documents
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Add PDF or photo copies of your food registration, lab assays, or raw material certificates with clear transparent audit states.
              </p>
            </div>

            <div className="space-y-3">
              <div className="font-mono text-sm font-bold text-[#17382B] dark:text-emerald-400">
                03. Print QR Sticker Sheets
              </div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                Stick to Jars & Sell with Pride
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Download your label with the scannable product QR code. Print on standard A4 adhesive paper or roll labels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Real Maker Case Study — Village Harvest Collective */}
      <section id="producer-story" className="py-16 bg-white dark:bg-[#121B17] border-b border-[#E8E1D5] dark:border-[#24332D] px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#17382B] dark:text-emerald-400">
                Featured Maker Collective · Demo Workspace Case Study
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#14231C] dark:text-white">
                How 18 Women in Ratnagiri Built a Trusted Gourmet Pickle Brand.
              </h2>
              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
                In our interactive demo, explore <strong>Village Harvest Collective</strong>—a rural self-help group in Konkan, Maharashtra. See how they used SmartBrand to label sun-cured Rajapuri mango pickle jars, raw forest honey bottles, and stone-ground turmeric packets.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-xl bg-[#FAF7F2] dark:bg-[#18241F] border border-[#E6DFD4] dark:border-[#293B33]">
                  <div className="font-mono text-2xl font-bold text-[#17382B] dark:text-emerald-400 tabular-nums">
                    4 Products
                  </div>
                  <div className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                    Live batch profiles ready to inspect
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF7F2] dark:bg-[#18241F] border border-[#E6DFD4] dark:border-[#293B33]">
                  <div className="font-mono text-2xl font-bold text-[#17382B] dark:text-emerald-400 tabular-nums">
                    6 Lab Records
                  </div>
                  <div className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                    NABL testing sheets & FSSAI licenses on file
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenQRProfile('prod-mango-pickle')}
                  className="px-5 py-3 text-xs font-semibold text-white bg-[#17382B] hover:bg-[#112920] rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  Inspect "Alphonso Mango Pickle" QR Page
                </button>
                <button
                  onClick={onExploreDemo}
                  className="px-5 py-3 text-xs font-semibold text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
                >
                  Start Guided Tour
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-[#D9D1C3] dark:border-[#2A3C34] shadow-md bg-stone-900">
                <ProductImage
                  src={workshopBannerUri}
                  alt="Village Harvest Collective Workshop Showcase"
                  title="Village Harvest Collective"
                  category="Artisanal Food Workshop"
                  className="w-full aspect-16/9 object-cover"
                />
                <div className="p-4 bg-[#14241D] text-stone-200 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Ratnagiri Orchard Workshop, Maharashtra</span>
                  </div>
                  <span className="font-mono text-[11px] text-emerald-400">Est. 2021</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sample Product Batch Pills to Click */}
          <div className="space-y-4 pt-4 border-t border-[#E8E1D5] dark:border-[#24332D]">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Click Any Product to Test Its Public Trust QR Page:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {allProducts.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => onOpenQRProfile(prod.id)}
                  className="p-4 rounded-xl bg-[#FAF7F2] dark:bg-[#18241F] border border-[#E6DFD4] dark:border-[#293B33] hover:border-[#17382B] dark:hover:border-emerald-500 text-left transition-all group cursor-pointer"
                >
                  <div className="text-[10px] font-mono text-stone-500 dark:text-stone-400">
                    BATCH #{prod.batchNumber}
                  </div>
                  <div className="text-xs font-bold text-stone-900 dark:text-stone-100 mt-1 group-hover:text-[#17382B] dark:group-hover:text-emerald-400 truncate">
                    {prod.name}
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    MRP ₹{prod.priceInr} · {prod.category}
                  </div>
                  <div className="text-[11px] font-semibold text-[#17382B] dark:text-emerald-400 mt-2 flex items-center gap-1">
                    <span>Inspect QR Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section: Maker Testimonials */}
      <section className="py-16 px-4 sm:px-8 border-b border-[#E8E1D5] dark:border-[#24332D]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#17382B] dark:text-emerald-400">
              From the Producers
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#14231C] dark:text-white">
              Built for India's Makers, Farmers, and Kitchen Entrepreneurs.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#15201B] border border-[#E2DBD0] dark:border-[#263730] flex flex-col justify-between space-y-4">
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic">
                "Before printing QR codes on our mango pickle jars, retail shops in Pune hesitated to stock our home brand. Showing our exact Ratnagiri orchard harvest dates and microbial test results doubled repeat orders in three months."
              </p>
              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 text-xs">
                <div className="font-bold text-stone-900 dark:text-stone-100">Sunita Sawant</div>
                <div className="text-stone-500 dark:text-stone-400">
                  Co-Founder, Village Harvest Collective · Ratnagiri
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#15201B] border border-[#E2DBD0] dark:border-[#263730] flex flex-col justify-between space-y-4">
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic">
                "Honey customers always ask if our forest honey is heated or diluted with sugar syrup. Having a QR code right on the jar neck seal that opens our moisture and HMF lab test solved our biggest hurdle."
              </p>
              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 text-xs">
                <div className="font-bold text-stone-900 dark:text-stone-100">Devendra Bisht</div>
                <div className="text-stone-500 dark:text-stone-400">
                  Apiarist, Kumaon Hills Apiary Co-op · Uttarakhand
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#15201B] border border-[#E2DBD0] dark:border-[#263730] flex flex-col justify-between space-y-4">
              <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic">
                "We couldn't afford expensive branding agencies for our single-origin spices. SmartBrand let us create clean jar labels with batch QR codes in fifteen minutes on our home printer."
              </p>
              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 text-xs">
                <div className="font-bold text-stone-900 dark:text-stone-100">Fathima Beevi</div>
                <div className="text-stone-500 dark:text-stone-400">
                  Coordinator, Malabar Spices Guild · Kerala
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto bg-[#17382B] text-white rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-700/60 text-xs font-semibold text-emerald-200">
            🌱 Start Small, Grow Honest
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight">
            Ready to give your produce the credibility it deserves?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl mx-auto leading-relaxed">
            Jump straight into the Village Harvest demo workspace or start adding your own products, quality records, and printable QR labels right now.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={onStartBuilding}
              className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#17382B] bg-[#FAF8F5] hover:bg-white rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Enter Seller Brand Studio
            </button>
            <button
              onClick={onExploreDemo}
              className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700 rounded-xl transition-all cursor-pointer"
            >
              Launch Guided Demo Flow
            </button>
          </div>
        </div>
      </section>

      {/* Human Editorial Footer */}
      <footer className="bg-white dark:bg-[#121B17] border-t border-[#E8E1D5] dark:border-[#24332D] py-10 px-4 sm:px-8 text-xs text-stone-600 dark:text-stone-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-display text-base font-bold text-stone-900 dark:text-stone-100">
              SmartBrand — Trust That Builds Brands
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              Honest digital provenance, batch QR traceability, and food quality document management.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-medium">
            <button
              onClick={onStartBuilding}
              className="hover:text-stone-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              Seller Dashboard
            </button>
            <button
              onClick={() => onOpenQRProfile('prod-mango-pickle')}
              className="hover:text-stone-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              Sample QR Trust Page
            </button>
            <button
              onClick={onOpenAdminPanel}
              className="hover:text-stone-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              Admin Verification Console
            </button>
            <button
              onClick={onExploreDemo}
              className="hover:text-stone-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              Interactive Demo Tour
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
