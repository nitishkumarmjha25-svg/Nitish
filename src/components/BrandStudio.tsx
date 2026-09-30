import React, { useState } from 'react';
import {
  Download,
  Palette,
  Printer,
  Sparkles,
  Type,
  LayoutTemplate,
  Check,
  RotateCcw,
  Leaf,
  Award,
  ShieldCheck,
  Stamp,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { BrandIdentity, Product } from '../types/smartbrand';
import { INITIAL_BRAND_IDENTITY } from '../data/initialData';

interface BrandStudioProps {
  brand: BrandIdentity;
  products: Product[];
  onUpdateBrand: (updated: BrandIdentity) => void;
  onNotify: (title: string, description?: string, tone?: 'success' | 'info') => void;
}

const COLOR_PALETTES = [
  {
    name: 'Konkan Emerald & Cream',
    primary: '#064E3B',
    secondary: '#FAF8F2',
    accent: '#D97706',
  },
  {
    name: 'Royal Indigo & Parchment',
    primary: '#1E3A8A',
    secondary: '#F8FAFC',
    accent: '#B45309',
  },
  {
    name: 'Malabar Spice Terracotta',
    primary: '#7C2D12',
    secondary: '#FFFBEB',
    accent: '#065F46',
  },
  {
    name: 'Charcoal Apothecary',
    primary: '#18181B',
    secondary: '#F5F5F4',
    accent: '#047857',
  },
  {
    name: 'Nilgiri Tea Olive',
    primary: '#365314',
    secondary: '#FAF9F5',
    accent: '#A16207',
  },
];

export const BrandStudio: React.FC<BrandStudioProps> = ({
  brand,
  products,
  onUpdateBrand,
  onNotify,
}) => {
  const [activeCanvasTab, setActiveCanvasTab] = useState<'logo' | 'packaging' | 'social-poster'>(
    'packaging'
  );
  const [selectedProductId, setSelectedProductId] = useState<string>(
    products[0]?.id || 'prod-mango-pickle'
  );

  const activeProduct =
    products.find((p) => p.id === selectedProductId) || products[0];

  const publicShareUrl = activeProduct
    ? `${window.location.origin}${window.location.pathname}?product=${activeProduct.id}`
    : window.location.origin;

  const fontFamilyClass =
    brand.fontPairing === 'editorial-serif'
      ? 'font-display'
      : brand.fontPairing === 'craft-slab'
      ? 'font-mono'
      : 'font-sans';

  const handleDownloadPng = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 900;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = brand.secondaryColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = brand.primaryColor;
    ctx.lineWidth = 14;
    ctx.strokeRect(48, 48, canvas.width - 96, canvas.height - 96);

    ctx.strokeStyle = brand.accentColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(68, 68, canvas.width - 136, canvas.height - 136);

    ctx.fillStyle = brand.primaryColor;
    ctx.fillRect(360, 120, 480, 64);

    ctx.fillStyle = brand.secondaryColor;
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(brand.brandName.toUpperCase(), 600, 160);

    ctx.fillStyle = '#57534E';
    ctx.font = '600 20px monospace';
    ctx.fillText(
      `EST. ${brand.foundedYear} · ${brand.originLocation.toUpperCase()}`,
      600,
      235
    );

    ctx.fillStyle = '#141816';
    ctx.font =
      brand.fontPairing === 'editorial-serif'
        ? 'bold 58px Georgia, serif'
        : 'bold 54px sans-serif';
    const mainHeadline =
      activeCanvasTab === 'logo'
        ? brand.brandName
        : activeProduct?.name || 'Homemade Mango Pickle';
    ctx.fillText(mainHeadline, 600, 340);

    ctx.fillStyle = brand.primaryColor;
    ctx.font = 'italic 26px Georgia, serif';
    ctx.fillText(brand.tagline, 600, 405);

    ctx.strokeStyle = '#D6D1C4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(220, 455);
    ctx.lineTo(980, 455);
    ctx.stroke();

    if (activeProduct) {
      ctx.fillStyle = '#292524';
      ctx.font = '600 24px monospace';
      ctx.fillText(
        `BATCH: ${activeProduct.batchNumber}   |   NET WT: ${activeProduct.netWeight}   |   MRP: Rs.${activeProduct.priceInr}`,
        600,
        520
      );

      ctx.fillStyle = '#44403C';
      ctx.font = '21px sans-serif';
      const ingredientsLine = `Ingredients: ${activeProduct.ingredientsOrMaterials
        .slice(0, 4)
        .join(', ')}`;
      ctx.fillText(ingredientsLine.slice(0, 78), 600, 580);

      ctx.fillStyle = brand.primaryColor;
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(
        'SMARTBRAND QR TRANSPARENCY PROFILE ENABLED — SCAN ON JAR FOR LAB & ORIGIN RECORDS',
        600,
        665
      );
    }

    ctx.fillStyle = '#57534E';
    ctx.font = '19px monospace';
    ctx.fillText(
      `${brand.contactPhone}  ·  ${brand.contactEmail}  ·  ${brand.fssaiDisplayNumber}`,
      600,
      765
    );

    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${brand.brandName.toLowerCase().replace(/\s+/g, '_')}_${activeCanvasTab}.png`;
    a.click();

    onNotify(
      'Brand Asset Downloaded (PNG)',
      `Saved high-resolution ${activeCanvasTab} artwork for ${brand.brandName}.`,
      'success'
    );
  };

  const handlePrintPdf = () => {
    window.print();
    onNotify(
      'Print / PDF Dialog Opened',
      'Select "Save as PDF" in your browser print destination to export printable label sheets.',
      'info'
    );
  };

  const renderLogoMark = (size: 'sm' | 'lg' = 'lg') => {
    const dim = size === 'lg' ? 'w-24 h-24' : 'w-14 h-14';
    const iconDim = size === 'lg' ? 'w-10 h-10' : 'w-6 h-6';

    return (
      <div
        className={`${dim} rounded-2xl flex flex-col items-center justify-center shadow-sm border-2 transition-all`}
        style={{
          backgroundColor: brand.primaryColor,
          borderColor: brand.accentColor,
          color: brand.secondaryColor,
        }}
      >
        {brand.logoTemplate === 'botanical-crest' && <Leaf className={iconDim} />}
        {brand.logoTemplate === 'heritage-stamp' && <Stamp className={iconDim} />}
        {brand.logoTemplate === 'modern-minimal' && <Sparkles className={iconDim} />}
        {brand.logoTemplate === 'artisan-seal' && <Award className={iconDim} />}
        <span className="text-[10px] font-mono tracking-widest uppercase mt-1 opacity-90">
          EST {brand.foundedYear}
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-stone-200/90 rounded-[22px] p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span>Brand Studio Workspace</span>
            <span aria-hidden="true">·</span>
            <span>Interactive Identity, Packaging Label & Social Poster Builder</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-stone-900 mt-0.5">
            Design Your Brand Identity & Smart QR Labels
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              onUpdateBrand(INITIAL_BRAND_IDENTITY);
              onNotify('Brand Studio Reset', 'Restored default Village Harvest styling.', 'info');
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200/80 rounded-xl transition-colors whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Preset</span>
          </button>
          <button
            onClick={handlePrintPdf}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Save as PDF</span>
          </button>
          <button
            onClick={handleDownloadPng}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Design (PNG)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 bg-white border border-stone-200/90 rounded-[22px] p-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-stone-900 flex items-center gap-2">
              <Type className="w-4 h-4 text-emerald-800" />
              <span>01. Brand Identity Details</span>
            </h3>
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Brand Name</label>
              <input
                type="text"
                value={brand.brandName}
                onChange={(e) => onUpdateBrand({ ...brand, brandName: e.target.value })}
                className="w-full px-3 py-2 text-xs font-semibold bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">
                Brand Tagline / Promise
              </label>
              <input
                type="text"
                value={brand.tagline}
                onChange={(e) => onUpdateBrand({ ...brand, tagline: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">Origin Region</label>
                <input
                  type="text"
                  value={brand.originLocation}
                  onChange={(e) => onUpdateBrand({ ...brand, originLocation: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Product for Label
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200/80 space-y-3">
            <h3 className="text-xs font-bold text-stone-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-800" />
              <span>02. Emblem & Logo Template</span>
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              {(
                [
                  { id: 'botanical-crest', label: 'Botanical Crest' },
                  { id: 'heritage-stamp', label: 'Heritage Stamp' },
                  { id: 'modern-minimal', label: 'Modern Minimal' },
                  { id: 'artisan-seal', label: 'Artisan Seal' },
                ] as const
              ).map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => onUpdateBrand({ ...brand, logoTemplate: tpl.id })}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold border text-left flex items-center justify-between transition-colors ${
                    brand.logoTemplate === tpl.id
                      ? 'bg-emerald-950/5 border-emerald-800 text-emerald-950'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  <span>{tpl.label}</span>
                  {brand.logoTemplate === tpl.id && (
                    <Check className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200/80 space-y-3">
            <h3 className="text-xs font-bold text-stone-900 flex items-center gap-2">
              <Palette className="w-4 h-4 text-emerald-800" />
              <span>03. Brand Color System</span>
            </h3>
            <div className="space-y-2">
              {COLOR_PALETTES.map((pal) => {
                const isSelected = brand.primaryColor.toLowerCase() === pal.primary.toLowerCase();
                return (
                  <button
                    key={pal.name}
                    type="button"
                    onClick={() =>
                      onUpdateBrand({
                        ...brand,
                        primaryColor: pal.primary,
                        secondaryColor: pal.secondary,
                        accentColor: pal.accent,
                      })
                    }
                    className={`w-full px-3 py-2 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                      isSelected
                        ? 'border-emerald-800 bg-emerald-50/40 font-semibold text-stone-900'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-300'
                    }`}
                  >
                    <span>{pal.name}</span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-4 h-4 rounded-full border border-black/10"
                        style={{ backgroundColor: pal.primary }}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-black/10"
                        style={{ backgroundColor: pal.secondary }}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-black/10"
                        style={{ backgroundColor: pal.accent }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200/80 space-y-3">
            <h3 className="text-xs font-bold text-stone-900 flex items-center gap-2">
              <LayoutTemplate className="w-4 h-4 text-emerald-800" />
              <span>04. Typography Character</span>
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'editorial-serif', label: 'Fraunces Serif' },
                  { id: 'modern-sans', label: 'Jakarta Sans' },
                  { id: 'craft-slab', label: 'Mono Ledger' },
                ] as const
              ).map((font) => (
                <button
                  key={font.id}
                  type="button"
                  onClick={() => onUpdateBrand({ ...brand, fontPairing: font.id })}
                  className={`px-2.5 py-2 rounded-xl text-xs font-semibold border text-center transition-colors ${
                    brand.fontPairing === font.id
                      ? 'bg-emerald-950/5 border-emerald-800 text-emerald-950'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  {font.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-stone-200/90 rounded-2xl p-2 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              {(
                [
                  { id: 'packaging', label: 'Packaging Label Preview' },
                  { id: 'logo', label: 'Brand Logo Lockup' },
                  { id: 'social-poster', label: 'Social Media Trust Poster' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCanvasTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap ${
                    activeCanvasTab === tab.id
                      ? 'bg-emerald-800 text-white'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeCanvasTab === 'packaging' && (
              <div className="flex items-center gap-1 pr-2">
                {(
                  [
                    { id: 'jar-front-label', label: 'Front Label' },
                    { id: 'neck-seal-badge', label: 'Neck Seal' },
                    { id: 'back-trust-label', label: 'Back QR Label' },
                  ] as const
                ).map((sub) => (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => onUpdateBrand({ ...brand, packagingTemplate: sub.id })}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors whitespace-nowrap ${
                      brand.packagingTemplate === sub.id
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}

            {activeCanvasTab === 'social-poster' && (
              <div className="flex items-center gap-1 pr-2">
                {(
                  [
                    { id: 'launch-showcase', label: 'Launch Post' },
                    { id: 'transparency-story', label: 'Trust Story' },
                    { id: 'artisan-quote', label: 'Founder Note' },
                  ] as const
                ).map((sub) => (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => onUpdateBrand({ ...brand, posterTemplate: sub.id })}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors whitespace-nowrap ${
                      brand.posterTemplate === sub.id
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-stone-200/50 border border-stone-200/90 rounded-[24px] p-6 sm:p-10 min-h-[480px] flex items-center justify-center">
            {activeCanvasTab === 'logo' && (
              <div
                className="w-full max-w-lg rounded-[24px] p-10 shadow-lg border-2 text-center space-y-5 transition-all"
                style={{
                  backgroundColor: brand.secondaryColor,
                  borderColor: brand.primaryColor,
                }}
              >
                <div className="flex justify-center">{renderLogoMark('lg')}</div>
                <div>
                  <div
                    className="text-xs font-mono tracking-widest uppercase"
                    style={{ color: brand.accentColor }}
                  >
                    {brand.originLocation}
                  </div>
                  <h3
                    className={`${fontFamilyClass} text-3xl sm:text-4xl font-bold mt-1`}
                    style={{ color: brand.primaryColor }}
                  >
                    {brand.brandName}
                  </h3>
                  <p className="text-sm text-stone-700 mt-2 max-w-md mx-auto">{brand.tagline}</p>
                </div>
                <div className="pt-4 border-t border-stone-300/70 flex items-center justify-center gap-4 text-xs font-mono text-stone-600">
                  <span>Small-Batch Craft</span>
                  <span>·</span>
                  <span>QR Batch Verified</span>
                  <span>·</span>
                  <span>Est. {brand.foundedYear}</span>
                </div>
              </div>
            )}

            {activeCanvasTab === 'packaging' && activeProduct && (
              <div
                className="w-full max-w-xl rounded-[22px] p-8 shadow-xl border-2 transition-all"
                style={{
                  backgroundColor: brand.secondaryColor,
                  borderColor: brand.primaryColor,
                }}
              >
                {brand.packagingTemplate === 'jar-front-label' && (
                  <div
                    className="border p-6 rounded-2xl space-y-5"
                    style={{ borderColor: brand.accentColor }}
                  >
                    <div className="flex items-center justify-between gap-4 border-b border-stone-300/70 pb-4">
                      <div className="flex items-center gap-3">
                        {renderLogoMark('sm')}
                        <div>
                          <div
                            className="text-xs font-bold tracking-wider uppercase"
                            style={{ color: brand.primaryColor }}
                          >
                            {brand.brandName}
                          </div>
                          <div className="text-[11px] text-stone-600">{brand.originLocation}</div>
                        </div>
                      </div>
                      <div className="text-right font-mono text-xs text-stone-700">
                        <div>NET WT: {activeProduct.netWeight}</div>
                        <div className="font-bold text-stone-900">MRP ₹{activeProduct.priceInr}</div>
                      </div>
                    </div>

                    <div className="text-center py-3">
                      <span
                        className="text-[11px] font-mono font-semibold uppercase tracking-widest"
                        style={{ color: brand.accentColor }}
                      >
                        {activeProduct.category}
                      </span>
                      <h3
                        className={`${fontFamilyClass} text-2xl sm:text-3xl font-bold text-stone-900 mt-1`}
                      >
                        {activeProduct.name}
                      </h3>
                      <p className="text-xs text-stone-600 mt-1.5 max-w-md mx-auto">
                        {brand.tagline}
                      </p>
                    </div>

                    <div className="bg-white/90 border border-stone-200 rounded-xl p-4 flex items-center justify-between gap-4">
                      <div className="space-y-1 text-xs">
                        <div className="font-bold text-stone-900 flex items-center gap-1.5">
                          <ShieldCheck
                            className="w-4 h-4 shrink-0"
                            style={{ color: brand.primaryColor }}
                          />
                          <span>Scan for Batch & Quality Records</span>
                        </div>
                        <div className="font-mono text-[11px] text-stone-600">
                          Batch: {activeProduct.batchNumber} · Mfg: {activeProduct.manufacturingDate}
                        </div>
                        <div className="text-[11px] text-stone-500">
                          View ingredients, origin & uploaded test records
                        </div>
                      </div>
                      <div className="bg-white p-1.5 rounded-lg border border-stone-200 shrink-0">
                        <QRCodeSVG
                          value={publicShareUrl}
                          size={64}
                          bgColor="#FFFFFF"
                          fgColor="#141816"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {brand.packagingTemplate === 'neck-seal-badge' && (
                  <div className="text-center space-y-5 py-4">
                    <div
                      className="inline-block px-5 py-1.5 rounded-md text-xs font-mono font-bold tracking-widest uppercase text-white"
                      style={{ backgroundColor: brand.primaryColor }}
                    >
                      TAMPER-EVIDENT QUALITY SEAL
                    </div>
                    <h3 className={`${fontFamilyClass} text-2xl font-bold text-stone-900`}>
                      {brand.brandName} · {activeProduct.name}
                    </h3>
                    <div className="flex justify-center">
                      <div className="bg-white p-3 rounded-2xl border-2 border-stone-900 shadow-xs">
                        <QRCodeSVG value={publicShareUrl} size={96} />
                      </div>
                    </div>
                    <div className="font-mono text-xs text-stone-700">
                      BATCH #{activeProduct.batchNumber} · EXP {activeProduct.expiryDate}
                    </div>
                    <p className="text-xs text-stone-600 max-w-sm mx-auto">
                      Do not accept if seal is broken. Scan QR to inspect batch manufacturing date
                      and seller quality documentation.
                    </p>
                  </div>
                )}

                {brand.packagingTemplate === 'back-trust-label' && (
                  <div className="space-y-4 text-xs text-stone-800">
                    <div className="flex items-center justify-between border-b border-stone-300 pb-3">
                      <strong className="text-sm font-bold text-stone-900">
                        {activeProduct.name} — Batch Ledger
                      </strong>
                      <span className="font-mono font-semibold">{activeProduct.batchNumber}</span>
                    </div>
                    <div>
                      <strong className="block text-stone-900 mb-1">Ingredients / Materials:</strong>
                      <p className="text-stone-700 leading-relaxed">
                        {activeProduct.ingredientsOrMaterials.join(', ')}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 font-mono text-[11px] bg-white/80 p-3 rounded-xl border border-stone-200">
                      <div>Mfg Date: {activeProduct.manufacturingDate}</div>
                      <div>Best Before: {activeProduct.expiryDate}</div>
                      <div>Net Weight: {activeProduct.netWeight}</div>
                      <div>MRP: ₹{activeProduct.priceInr} (Incl. taxes)</div>
                    </div>
                    <div className="flex items-center justify-between gap-4 pt-2">
                      <div className="text-[11px] text-stone-600 space-y-0.5">
                        <div className="font-bold text-stone-900">{brand.brandName}</div>
                        <div>{activeProduct.businessLocation}</div>
                        <div>Customer Care: {brand.contactPhone}</div>
                        <div className="font-mono">{brand.fssaiDisplayNumber}</div>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-stone-300 shrink-0">
                        <QRCodeSVG value={publicShareUrl} size={60} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeCanvasTab === 'social-poster' && activeProduct && (
              <div
                className="w-full max-w-md rounded-[24px] overflow-hidden shadow-xl border-2 transition-all"
                style={{
                  backgroundColor: brand.primaryColor,
                  borderColor: brand.accentColor,
                  color: brand.secondaryColor,
                }}
              >
                <div className="p-8 space-y-5">
                  <div className="flex items-center justify-between text-xs font-mono opacity-90">
                    <span>{brand.brandName.toUpperCase()}</span>
                    <span>BATCH #{activeProduct.batchNumber}</span>
                  </div>

                  {brand.posterTemplate === 'launch-showcase' && (
                    <>
                      <h3 className={`${fontFamilyClass} text-3xl font-bold leading-tight`}>
                        Every Jar Tells Its Full Story.
                      </h3>
                      <p className="text-xs opacity-90 leading-relaxed">
                        Our {activeProduct.name} is crafted in {brand.originLocation} and linked to
                        a public SmartBrand QR profile showing exact batch dates, ingredients, and
                        uploaded quality documents.
                      </p>
                    </>
                  )}

                  {brand.posterTemplate === 'transparency-story' && (
                    <>
                      <h3 className={`${fontFamilyClass} text-3xl font-bold leading-tight`}>
                        Don’t Just Read the Front Label. Scan It.
                      </h3>
                      <ul className="space-y-1.5 text-xs opacity-95">
                        <li>01. Sourced from {activeProduct.sourcingOrigin}</li>
                        <li>02. Small-batch packed on {activeProduct.manufacturingDate}</li>
                        <li>03. Publicly accessible quality records & customer reviews</li>
                      </ul>
                    </>
                  )}

                  {brand.posterTemplate === 'artisan-quote' && (
                    <>
                      <h3 className={`${fontFamilyClass} text-2xl font-bold italic leading-snug`}>
                        “{brand.story.slice(0, 145)}...”
                      </h3>
                      <p className="text-xs font-mono opacity-85">
                        — {brand.brandName}, {brand.originLocation}
                      </p>
                    </>
                  )}

                  <div className="bg-white text-stone-900 rounded-2xl p-4 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold">{activeProduct.name}</div>
                      <div className="text-[11px] text-stone-600 mt-0.5">
                        Scan QR to inspect batch transparency
                      </div>
                      <div className="text-xs font-mono font-bold text-emerald-800 mt-1">
                        MRP ₹{activeProduct.priceInr} · {activeProduct.netWeight}
                      </div>
                    </div>
                    <QRCodeSVG value={publicShareUrl} size={56} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
