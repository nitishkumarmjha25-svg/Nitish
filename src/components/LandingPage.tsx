import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Play,
  ExternalLink,
  Eye,
  Smartphone,
  FileCheck2,
  ShieldCheck,
  BarChart3,
  Sparkles,
  Star,
  MapPin,
  TrendingUp,
  Zap,
  Check,
  Package,
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
    <div className="min-h-screen bg-[#FAF9F5] text-[#141816]">
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur border-b border-stone-200/80 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <a
            href="#top"
            className="font-display text-xl font-bold tracking-tight text-emerald-950 dark:text-emerald-400 whitespace-nowrap"
          >
            {t('brandName')}
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600 dark:text-stone-300">
            <a
              href="#top"
              className="hover:text-stone-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              {t('home')}
            </a>
            <a
              href="#features"
              className="hover:text-stone-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              {t('features')}
            </a>
            <a
              href="#how-it-works"
              className="hover:text-stone-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              {t('howItWorks')}
            </a>
            <a
              href="#for-sellers"
              className="hover:text-stone-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              {t('forSellers')}
            </a>
            <a
              href="#about"
              className="hover:text-stone-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              {t('about')}
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Language Selector */}
            <LanguageSelector
              currentLang={currentLang}
              onSelectLang={onSelectLang}
              isDark={isDark}
            />

            {/* Dark / Light Mode Toggle */}
            <ThemeToggle isDark={isDark} onToggleTheme={onToggleTheme} />

            {/* Auth Actions */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onStartBuilding}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors whitespace-nowrap shadow-xs"
                >
                  {t('overview')}
                </button>
                <button
                  onClick={onLogout}
                  className="px-3 py-1.5 text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-red-700 dark:hover:text-red-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-colors whitespace-nowrap"
                  title="Log out of your current session"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenLogin}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:text-stone-950 dark:hover:text-white transition-colors whitespace-nowrap"
                >
                  {t('login')}
                </button>
                <button
                  onClick={onStartBuilding}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors whitespace-nowrap shadow-xs"
                >
                  {t('getStarted')}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <section id="top" className="pt-12 pb-20 sm:pt-16 sm:pb-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900 dark:text-emerald-400">
              <span>Full-Stack Digital Trust & Brand Infrastructure for Emerging Producers</span>
              <span aria-hidden="true">·</span>
              <span>Backend API Live</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-bold text-stone-950 dark:text-white leading-[1.1] tracking-tight">
              {t('heroHeadline')}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl">
              {t('heroSubheadline')}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onStartBuilding}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-2xl transition-all shadow-sm whitespace-nowrap"
              >
                <span>{t('startBuilding')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreDemo}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-stone-900 dark:text-white bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 rounded-2xl transition-all whitespace-nowrap"
              >
                <Play className="w-4 h-4 text-emerald-800 dark:text-emerald-400 fill-emerald-800 dark:fill-emerald-400" />
                <span>{t('exploreDemo')}</span>
              </button>
            </div>

            <div className="pt-4 border-t border-stone-200/80 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">
                  {totalScans.toLocaleString()}+
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  Demo QR Scans Logged Across Batches
                </div>
              </div>
              <div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">
                  100%
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  Transparent Document Status Distinction
                </div>
              </div>
              <div>
                <div className="font-mono text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">
                  &lt; 3 min
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  To Launch a QR Product Trust Page
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white border border-stone-200/90 rounded-[28px] p-5 sm:p-6 shadow-xl space-y-4 relative overflow-hidden">
              {/* Interactive Mode Selector */}
              <div className="flex items-center justify-between gap-2 border-b border-stone-200/80 pb-3">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider hidden sm:inline">
                  Interactive Preview
                </span>
                <div className="p-1 rounded-xl bg-stone-100 flex items-center gap-1 w-full sm:w-auto">
                  <button
                    onClick={() => setHeroPreviewMode('packaging')}
                    className={`flex-1 sm:flex-initial px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      heroPreviewMode === 'packaging'
                        ? 'bg-white text-emerald-950 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Package className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Packaging & QR</span>
                  </button>
                  <button
                    onClick={() => setHeroPreviewMode('mobile')}
                    className={`flex-1 sm:flex-initial px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      heroPreviewMode === 'mobile'
                        ? 'bg-white text-emerald-950 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Consumer View</span>
                  </button>
                  <button
                    onClick={() => setHeroPreviewMode('lab')}
                    className={`flex-1 sm:flex-initial px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      heroPreviewMode === 'lab'
                        ? 'bg-white text-emerald-950 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <FileCheck2 className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Lab Vault</span>
                  </button>
                  <button
                    onClick={() => setHeroPreviewMode('analytics')}
                    className={`flex-1 sm:flex-initial px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      heroPreviewMode === 'analytics'
                        ? 'bg-white text-emerald-950 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Live Reach</span>
                  </button>
                </div>
              </div>

              {/* View 1: Packaging & QR */}
              {heroPreviewMode === 'packaging' && (
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                  <div className="sm:col-span-7 relative rounded-[20px] overflow-hidden border border-stone-200/80 aspect-4/3 bg-stone-100 group shadow-inner">
                    <ProductImage
                      src={featuredProduct.imageUrl}
                      alt={featuredProduct.name}
                      title={featuredProduct.name}
                      category={featuredProduct.category}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-4 text-white">
                      <div className="text-[11px] font-mono opacity-90">
                        VILLAGE HARVEST · BATCH #{featuredProduct.batchNumber}
                      </div>
                      <div className="text-sm font-bold">{featuredProduct.name}</div>
                    </div>
                  </div>

                  <div className="sm:col-span-5 bg-[#FAF9F5] border border-stone-200/90 rounded-[20px] p-4 flex flex-col items-center text-center justify-between h-full space-y-3">
                    <div className="text-xs font-bold text-emerald-900">
                      Live Sample Product QR
                    </div>
                    <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-sm">
                      <QRCodeSVG
                        value={mangoPickleUrl}
                        size={104}
                        bgColor="#FFFFFF"
                        fgColor="#141816"
                        level="M"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-stone-900">Scan with Phone</div>
                      <div className="text-[11px] font-mono text-stone-500">
                        Batch: {featuredProduct.batchNumber} · MRP ₹{featuredProduct.priceInr}
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenQRProfile(featuredProduct.id)}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-all shadow-xs active:scale-95 whitespace-nowrap"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Open Live Trust Page</span>
                    </button>
                  </div>
                </div>
              )}

              {/* View 2: Simulated Mobile Consumer Screen */}
              {heroPreviewMode === 'mobile' && (
                <div className="bg-stone-900 text-stone-100 rounded-[22px] p-4 sm:p-5 space-y-3 shadow-inner">
                  <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-800 pb-2">
                    <div className="flex items-center gap-1.5 font-mono text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>smartbrand.io/p/{featuredProduct.batchNumber}</span>
                    </div>
                    <span className="text-[10px] bg-stone-800 px-2 py-0.5 rounded text-stone-300">
                      Consumer View
                    </span>
                  </div>

                  <div className="space-y-2 bg-stone-800/80 rounded-xl p-3.5 border border-stone-700/60">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded">
                        ✓ Genuine Producer Batch
                      </span>
                      <span className="text-xs font-mono text-stone-300">₹{featuredProduct.priceInr}</span>
                    </div>
                    <div className="text-sm font-bold text-white">{featuredProduct.name}</div>
                    <div className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                      Small-batch sun-dried raw mangoes in cold-pressed mustard oil with heirloom spices from Ratnagiri, Maharashtra.
                    </div>
                    <div className="pt-2 border-t border-stone-700 flex items-center justify-between text-[11px]">
                      <span className="text-stone-400">NABL Microbial Report:</span>
                      <span className="text-emerald-400 font-semibold">Verified Safe ✓</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="text-xs text-stone-300 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <strong>4.8</strong>
                      <span className="text-stone-400">(5 verified buyer reviews)</span>
                    </div>
                    <button
                      onClick={() => onOpenQRProfile(featuredProduct.id)}
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline"
                    >
                      Open in Mobile View →
                    </button>
                  </div>
                </div>
              )}

              {/* View 3: Lab Vault Record Preview */}
              {heroPreviewMode === 'lab' && (
                <div className="bg-[#FAF9F5] border border-stone-200/90 rounded-[22px] p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                        NABL
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-900">
                          Microbial & Purity Analysis Report
                        </div>
                        <div className="text-[10px] font-mono text-stone-500">
                          Ref: LAB-KONKAN-2026-8841 · NABL Accredited
                        </div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Admin Verified ✓
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2.5 bg-white rounded-xl border border-stone-200/80">
                      <div className="text-[10px] text-stone-500 font-mono">Moisture & Acidity</div>
                      <div className="font-bold text-stone-900 mt-0.5">64.2% (Within limit)</div>
                      <div className="text-[10px] text-emerald-800 font-semibold">Passed Standard ✓</div>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-stone-200/80">
                      <div className="text-[10px] text-stone-500 font-mono">Plate Count (CFU/g)</div>
                      <div className="font-bold text-stone-900 mt-0.5">&lt; 10 CFU/g</div>
                      <div className="text-[10px] text-emerald-800 font-semibold">Microbial Safe ✓</div>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-stone-200/80">
                      <div className="text-[10px] text-stone-500 font-mono">Synthetic Colorants</div>
                      <div className="font-bold text-stone-900 mt-0.5">Not Detected</div>
                      <div className="text-[10px] text-emerald-800 font-semibold">100% Pure ✓</div>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-stone-200/80">
                      <div className="text-[10px] text-stone-500 font-mono">FSSAI License</div>
                      <div className="font-bold text-stone-900 mt-0.5">#21524021000189</div>
                      <div className="text-[10px] text-emerald-800 font-semibold">Active Record ✓</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-stone-500 italic pt-1">
                    * Authenticity notice: Displays verified seller records without claiming statutory agency seals.
                  </div>
                </div>
              )}

              {/* View 4: Live Telemetry & Metro Reach */}
              {heroPreviewMode === 'analytics' && (
                <div className="bg-[#FAF9F5] border border-stone-200/90 rounded-[22px] p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-stone-900">Live Consumer Scan Telemetry</div>
                      <div className="text-[10px] text-stone-500 font-mono">
                        {totalScans.toLocaleString()} scans recorded across batches
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      <span>Live Stream</span>
                    </span>
                  </div>

                  <div className="space-y-2 text-xs pt-1">
                    {[
                      { city: 'Mumbai (MMR)', scans: '684 scans', pct: '37%', color: 'bg-emerald-800' },
                      { city: 'Bengaluru (KA)', scans: '492 scans', pct: '27%', color: 'bg-teal-700' },
                      { city: 'Pune (MH)', scans: '380 scans', pct: '21%', color: 'bg-emerald-600' },
                      { city: 'New Delhi (NCR)', scans: '210 scans', pct: '11%', color: 'bg-amber-600' },
                    ].map((item) => (
                      <div key={item.city} className="space-y-0.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-medium text-stone-800">{item.city}</span>
                          <span className="font-mono text-stone-500">{item.scans} ({item.pct})</span>
                        </div>
                        <div className="w-full bg-stone-200/80 h-1.5 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color} rounded-full`} style={{ width: item.pct }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between text-[11px] text-stone-600">
                    <span>Shopper conversion rate:</span>
                    <strong className="text-emerald-900 font-mono">71.9% Unique Visitors</strong>
                  </div>
                </div>
              )}

              {/* Bottom Trust Pills */}
              <div className="pt-3 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-[#FAF9F5] border border-stone-200/80 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-800">Quality Document Verification</span>
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>2 Verified · 1 Pending</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    Transparent NABL & FSSAI document states with clear admin audit badges.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF9F5] border border-stone-200/80 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-800">Village Harvest Studio</span>
                    <span className="font-mono font-bold text-emerald-800 tabular-nums">
                      4.8 ★ (5 Reviews)
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-stone-200/60 text-[11px] text-stone-600">
                    <span className="font-mono tabular-nums">
                      {featuredProduct.qrScans} scans on this batch
                    </span>
                    <button
                      onClick={onStartBuilding}
                      className="font-bold text-emerald-800 hover:underline"
                    >
                      Open Studio →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-stone-200/80 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-semibold text-emerald-800">
              Honest Product Transparency Architecture
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
              Why Emerging Brands Lose Buyer Trust — And How SmartBrand Solves It.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Customers want to support home-based food makers, farmer collectives, and local
              artisans—but generic unverified labels leave shoppers guessing about hygiene, batch
              freshness, and ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-[20px] bg-[#FAF9F5] border border-stone-200/90 space-y-3">
              <div className="text-xs font-mono font-semibold text-emerald-800">
                01. TRANSPARENT BATCH LEDGER
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                Every Jar Linked to Its Exact Batch
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Instead of static packaging, each product batch generates a unique scannable QR
                profile displaying manufacturing date, expiry date, sourcing origin, and full
                ingredient breakdowns.
              </p>
            </div>

            <div className="p-6 rounded-[20px] bg-[#FAF9F5] border border-stone-200/90 space-y-3">
              <div className="text-xs font-mono font-semibold text-emerald-800">
                02. VERIFIABLE DOCUMENT STATES
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                Clear Distinction: Uploaded vs. Verified
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Sellers upload FSSAI registrations, NABL lab reports, and packaging records. SmartBrand
                clearly labels each record as <strong>Uploaded</strong>,{' '}
                <strong>Pending Review</strong>, or <strong>Verified by Admin</strong>—never
                overclaiming certification.
              </p>
            </div>

            <div className="p-6 rounded-[20px] bg-[#FAF9F5] border border-stone-200/90 space-y-3">
              <div className="text-xs font-mono font-semibold text-emerald-800">
                03. ORDER-BACKED BUYER REVIEWS
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                Authentic Feedback & Order Matching
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Customers scanning a product QR code can leave star ratings and feedback. The{' '}
                <strong>Verified Purchase</strong> indicator appears strictly when a valid order
                record confirms the transaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="text-xs font-semibold text-emerald-800">Platform Capabilities</div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
                Four Integrated Modules for Small-Batch Producers.
              </h2>
            </div>
            <button
              onClick={onExploreDemo}
              className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-emerald-900 bg-emerald-950/5 hover:bg-emerald-950/10 border border-emerald-800/20 rounded-xl transition-colors whitespace-nowrap"
            >
              <span>Launch Guided 2-Minute Demo Tour</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-stone-200/90 rounded-[22px] p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="font-mono font-semibold text-emerald-800">01. QR TRUST ENGINE</span>
                  <span aria-hidden="true">·</span>
                  <span>Mobile-First Consumer Experience</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-stone-900">
                  Instant QR Product Trust Pages That Answer Buyer Questions on the Spot
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed max-w-2xl">
                  When a buyer scans your jar or packet at a bazaar, organic store, or home
                  delivery box, they see your brand story, batch manufacturing dates, ingredient
                  origins, and downloadable quality test summaries—complete with honest authenticity
                  disclaimers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {allProducts.slice(0, 3).map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => onOpenQRProfile(prod.id)}
                    className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-stone-200/90 hover:border-emerald-800 text-left transition-all group"
                  >
                    <div className="text-[11px] font-mono text-stone-500">{prod.batchNumber}</div>
                    <div className="text-xs font-bold text-stone-900 mt-0.5 group-hover:text-emerald-900 truncate">
                      {prod.name}
                    </div>
                    <div className="text-[11px] font-semibold text-emerald-800 mt-2 flex items-center gap-1">
                      <span>Preview QR Page</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white border border-stone-200/90 rounded-[22px] p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-mono font-semibold text-emerald-800">
                  02. BRAND STUDIO
                </div>
                <h3 className="font-display text-2xl font-bold text-stone-900">
                  Packaging Labels & Logos in Minutes
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Customize heritage crests, color palettes, front jar labels, tamper-evident neck
                  seals, and social launch posters with embedded QR codes. Export directly as PNG
                  or printable PDF.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-stone-200/80 space-y-2">
                <div className="text-xs font-semibold text-stone-900">
                  Included Label Templates:
                </div>
                <div className="text-xs text-stone-600">
                  Front Jar Label · Neck Seal Wrap · Back Batch Ledger · Social Trust Card
                </div>
              </div>
            </div>

            <div className="bg-white border border-stone-200/90 rounded-[22px] p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="text-xs font-mono font-semibold text-emerald-800">
                  03. QUALITY DOCUMENT VAULT
                </div>
                <h3 className="font-display text-2xl font-bold text-stone-900">
                  Structured Lab & FSSAI Record Management
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Organize FSSAI basic registrations, NABL microbial reports, and food-grade
                  packaging declarations by batch and expiry date.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-stone-200/80 text-xs text-stone-600 space-y-1">
                <div className="font-semibold text-stone-900">Admin Governance Workflow</div>
                <div>
                  Only platform administrators can transition records from Uploaded to Verified by
                  Admin.
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white border border-stone-200/90 rounded-[22px] p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="font-mono font-semibold text-emerald-800">
                    04. SCAN TELEMETRY & GOVERNANCE
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Seller & Admin Dashboards</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-stone-900">
                  Track Customer QR Engagement & Moderate Platform Trust
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed max-w-2xl">
                  Monitor daily QR scans across batches, moderate buyer reviews, and switch into the
                  Admin Governance console to review pending seller quality documents in real time.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={onStartBuilding}
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors"
                >
                  Open Seller Dashboard
                </button>
                <button
                  onClick={onOpenAdminPanel}
                  className="px-4 py-2.5 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
                >
                  Inspect Admin Verification Panel
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="py-20 bg-white border-y border-stone-200/80 px-4 sm:px-8"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-semibold text-emerald-800">Simple 3-Step Workflow</div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
              From Kitchen or Workshop to QR-Enabled Packaging in Three Steps.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="font-mono text-sm font-bold text-emerald-800">
                01. Create Your Brand & Product Batch
              </div>
              <h3 className="text-xl font-bold text-stone-900">
                Configure Identity & Enter Batch Details
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Pick a logo crest and label palette in Brand Studio, then add your product name,
                ingredients or craft materials, batch number, and manufacturing/expiry dates.
              </p>
            </div>

            <div className="space-y-3">
              <div className="font-mono text-sm font-bold text-emerald-800">
                02. Attach Supporting Quality Records
              </div>
              <h3 className="text-xl font-bold text-stone-900">
                Upload FSSAI, Lab, or Origin Documents
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Attach PDF or image copies of your food registration, microbial lab assays, or raw
                material declarations so customers can inspect your transparency commitment.
              </p>
            </div>

            <div className="space-y-3">
              <div className="font-mono text-sm font-bold text-emerald-800">
                03. Print Smart QR Labels & Collect Reviews
              </div>
              <h3 className="text-xl font-bold text-stone-900">
                Customers Scan to View Proof & Rate
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Download your ready-to-print jar label with the unique product QR code. Every scan
                opens your mobile trust profile and lets verified buyers leave reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="for-sellers" className="py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="text-xs font-semibold text-emerald-800">
                Featured Demo Brand Showcase · Sample Case Study
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
                How “Village Harvest” Transformed Local Jar Pickles into a Trusted Regional Brand.
              </h2>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                In our interactive demo, explore <strong>Village Harvest</strong>—a sample
                18-member women’s farm and kitchen collective in Ratnagiri, Maharashtra. See how
                they use SmartBrand to showcase sun-cured Rajapuri mango pickles, raw Sahyadri
                forest honey, and single-origin spices.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-stone-200/90">
                  <div className="font-mono text-2xl font-bold text-emerald-900 tabular-nums">
                    4 Products
                  </div>
                  <div className="text-xs text-stone-600 mt-1">
                    Active QR-linked product batches in catalog
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-stone-200/90">
                  <div className="font-mono text-2xl font-bold text-emerald-900 tabular-nums">
                    6 Records
                  </div>
                  <div className="text-xs text-stone-600 mt-1">
                    Sample FSSAI, NABL lab & packaging documents
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenQRProfile('prod-mango-pickle')}
                  className="px-5 py-3 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors"
                >
                  Inspect “Homemade Mango Pickle” QR Page
                </button>
                <button
                  onClick={onExploreDemo}
                  className="px-5 py-3 text-xs font-semibold text-stone-800 bg-white border border-stone-300 hover:bg-stone-100 rounded-xl transition-colors"
                >
                  Start Guided Demo Walkthrough
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-[24px] overflow-hidden border border-stone-200 shadow-md bg-emerald-950">
                <ProductImage
                  src={workshopBannerUri}
                  alt="Village Harvest Collective Workshop Showcase"
                  title="Village Harvest Collective"
                  category="Artisanal Food Workshop"
                  className="w-full aspect-16/9 object-cover"
                />
              </div>
            </div>
          </div>

          <div id="about" className="pt-12 border-t border-stone-200/80 space-y-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-emerald-800">
                  Sample Seller Testimonials (Illustrative Demo Scenarios)
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                  Built for India’s Makers, Farmers, and Home Entrepreneurs.
                </h3>
              </div>
              <span className="text-xs text-stone-500 italic">
                Labeled as sample demonstration testimonials
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-[20px] bg-white border border-stone-200/90 flex flex-col justify-between space-y-4">
                <p className="text-sm text-stone-700 leading-relaxed">
                  “Before adding QR batch profiles to our mango pickle jars, urban retail buyers
                  hesitated to stock a home-collective brand. Showing our exact Ratnagiri orchard
                  batch dates and microbial test summary doubled repeat orders in 3 months.”
                </p>
                <div className="pt-3 border-t border-stone-100 text-xs">
                  <div className="font-bold text-stone-900">Sunita Sawant</div>
                  <div className="text-stone-500">
                    Co-Founder, Village Harvest Collective · Ratnagiri (Demo Profile)
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-[20px] bg-white border border-stone-200/90 flex flex-col justify-between space-y-4">
                <p className="text-sm text-stone-700 leading-relaxed">
                  “Honey customers always ask if our forest honey is heated or sugar-fed. Having a
                  single QR code on the neck seal that opens our HMF and moisture lab report solved
                  our biggest customer trust hurdle.”
                </p>
                <div className="pt-3 border-t border-stone-100 text-xs">
                  <div className="font-bold text-stone-900">Devendra Bisht</div>
                  <div className="text-stone-500">
                    Apiarist, Kumaon Hills Apiary Co-op · Uttarakhand (Demo Profile)
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-[20px] bg-white border border-stone-200/90 flex flex-col justify-between space-y-4">
                <p className="text-sm text-stone-700 leading-relaxed">
                  “We couldn’t afford a branding agency for our handloom and spice packaging. Brand
                  Studio let us create cohesive labels with embedded batch QR codes in fifteen
                  minutes.”
                </p>
                <div className="pt-3 border-t border-stone-100 text-xs">
                  <div className="font-bold text-stone-900">Fathima Beevi</div>
                  <div className="text-stone-500">
                    Coordinator, Malabar Weavers & Craft Guild · Kerala (Demo Profile)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto bg-emerald-950 text-[#FAF9F5] rounded-[28px] p-8 sm:p-12 text-center space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Ready to Give Your Products the Brand & Trust They Deserve?
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/85 max-w-2xl mx-auto leading-relaxed">
            Jump straight into the interactive Village Harvest demo workspace or start adding your
            own products, quality records, and printable QR labels right now.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onStartBuilding}
              className="px-6 py-3.5 text-sm font-semibold text-emerald-950 bg-[#FAF9F5] hover:bg-white rounded-2xl transition-colors"
            >
              Enter Seller Brand Studio
            </button>
            <button
              onClick={onExploreDemo}
              className="px-6 py-3.5 text-sm font-semibold text-white bg-emerald-800/80 hover:bg-emerald-800 border border-emerald-700 rounded-2xl transition-colors"
            >
              Launch Guided Demo Flow
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-stone-200/80 py-12 px-4 sm:px-8 text-xs text-stone-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-display text-base font-bold text-stone-900">
              SmartBrand — Trust That Builds Brands
            </div>
            <p className="text-stone-500">
              Full-Stack digital branding, QR batch transparency, and quality document management.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={onStartBuilding}
              className="hover:text-stone-900 transition-colors"
            >
              Seller Dashboard
            </button>
            <button
              onClick={() => onOpenQRProfile('prod-mango-pickle')}
              className="hover:text-stone-900 transition-colors"
            >
              Sample QR Trust Page
            </button>
            <button
              onClick={onOpenAdminPanel}
              className="hover:text-stone-900 transition-colors"
            >
              Admin Verification Console
            </button>
            <button
              onClick={onExploreDemo}
              className="hover:text-stone-900 transition-colors"
            >
              Interactive Demo Tour
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
