import React, { useState } from 'react';
import { Package } from 'lucide-react';

export function getStudioProductDataUri(
  preset: string,
  title?: string,
  subtitle?: string,
  primaryHex: string = '#064E3B',
  creamHex: string = '#FAF8F2'
): string {
  const safeTitle = (title || 'Homemade Mango Pickle').replace(/[<>&"']/g, '');
  const safeSub = (subtitle || 'VILLAGE HARVEST').replace(/[<>&"']/g, '').toUpperCase();

  let svgContent = '';

  if (preset === 'mango-pickle') {
    svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#F6F4EC"/>
          <stop offset="55%" stop-color="#EDE9DC"/>
          <stop offset="100%" stop-color="#DFD9C8"/>
        </linearGradient>
        <linearGradient id="jarGlass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#B45309" stop-opacity="0.95"/>
          <stop offset="25%" stop-color="#D97706" stop-opacity="0.9"/>
          <stop offset="50%" stop-color="#92400E" stop-opacity="0.95"/>
          <stop offset="85%" stop-color="#78350F" stop-opacity="0.98"/>
          <stop offset="100%" stop-color="#451A03" stop-opacity="0.95"/>
        </linearGradient>
        <linearGradient id="clothTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FBF9F3"/>
          <stop offset="100%" stop-color="#E6E0D0"/>
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="22" stdDeviation="18" flood-color="#1C1917" flood-opacity="0.18"/>
        </filter>
      </defs>
      <rect width="800" height="600" fill="url(#bg)"/>
      <path d="M0 440 L800 410 L800 600 L0 600 Z" fill="#E3DEC9" opacity="0.7"/>
      <ellipse cx="400" cy="495" rx="195" ry="26" fill="#1C1917" opacity="0.14"/>
      <rect x="170" y="465" width="460" height="44" rx="8" fill="#EFECE2" stroke="#D7D1C0" stroke-width="1.5"/>

      <circle cx="230" cy="482" r="5" fill="#78350F"/>
      <circle cx="245" cy="488" r="4" fill="#92400E"/>
      <circle cx="218" cy="490" r="3.5" fill="#451A03"/>
      <circle cx="570" cy="484" r="4.5" fill="#78350F"/>
      <circle cx="585" cy="490" r="3.5" fill="#B45309"/>

      <g filter="url(#softShadow)">
        <rect x="275" y="165" width="250" height="315" rx="38" fill="url(#jarGlass)" stroke="#FDE68A" stroke-width="2" stroke-opacity="0.4"/>
        <path d="M292 200 Q340 185 385 210 T495 205 L505 450 Q400 468 295 450 Z" fill="#9A3412" opacity="0.55"/>
        <circle cx="325" cy="235" r="18" fill="#F59E0B" opacity="0.55"/>
        <circle cx="465" cy="245" r="22" fill="#D97706" opacity="0.5"/>
        <circle cx="340" cy="425" r="20" fill="#F59E0B" opacity="0.5"/>
        <circle cx="450" cy="420" r="24" fill="#B45309" opacity="0.6"/>
        <rect x="292" y="180" width="18" height="280" rx="9" fill="#FFFFFF" opacity="0.28"/>
        <rect x="500" y="185" width="8" height="270" rx="4" fill="#FFFFFF" opacity="0.14"/>

        <path d="M285 135 Q400 118 515 135 L532 182 Q400 194 268 182 Z" fill="url(#clothTop)" stroke="#D6CFC0" stroke-width="1.5"/>
        <rect x="282" y="160" width="236" height="10" rx="5" fill="#A16207"/>
        <rect x="282" y="164" width="236" height="4" rx="2" fill="#CA8A04"/>
        <path d="M400 165 C382 185, 368 198, 360 212" stroke="#A16207" stroke-width="4" stroke-linecap="round" fill="none"/>
        <path d="M400 165 C418 185, 430 198, 442 210" stroke="#92400E" stroke-width="4" stroke-linecap="round" fill="none"/>

        <rect x="296" y="232" width="208" height="176" rx="12" fill="#FAF8F2" stroke="#D6D1C4" stroke-width="1.5"/>
        <rect x="304" y="240" width="192" height="160" rx="8" fill="none" stroke="#065F46" stroke-width="1.2" stroke-opacity="0.4"/>
        
        <rect x="336" y="252" width="128" height="22" rx="4" fill="#064E3B"/>
        <text x="400" y="267" text-anchor="middle" fill="#FAF8F2" font-family="sans-serif" font-size="9.5" font-weight="700" letter-spacing="2">VILLAGE HARVEST</text>
        
        <text x="400" y="298" text-anchor="middle" fill="#141816" font-family="Georgia, serif" font-size="16" font-weight="700">Homemade</text>
        <text x="400" y="318" text-anchor="middle" fill="#141816" font-family="Georgia, serif" font-size="16" font-weight="700">Mango Pickle</text>
        <text x="400" y="336" text-anchor="middle" fill="#065F46" font-family="sans-serif" font-size="9" font-weight="600" letter-spacing="1.2">SUN-CURED · RATNAGIRI RAJAPURI</text>
        
        <line x1="330" y1="348" x2="470" y2="348" stroke="#D6D1C4" stroke-width="1"/>
        
        <rect x="318" y="356" width="32" height="32" rx="3" fill="#141816"/>
        <rect x="322" y="360" width="8" height="8" fill="#FAF8F2"/>
        <rect x="338" y="360" width="8" height="8" fill="#FAF8F2"/>
        <rect x="322" y="376" width="8" height="8" fill="#FAF8F2"/>
        <rect x="332" y="370" width="6" height="6" fill="#10B981"/>
        
        <text x="360" y="368" fill="#44403C" font-family="monospace" font-size="8.5" font-weight="600">BATCH: VH-MP-2609</text>
        <text x="360" y="380" fill="#065F46" font-family="sans-serif" font-size="8.5" font-weight="700">SCAN FOR QUALITY PROOF</text>
        <text x="360" y="391" fill="#78716C" font-family="sans-serif" font-size="8">NET WT. 500g · HANDCRAFTED</text>
      </g>
    </svg>`;
  } else if (preset === 'wild-honey') {
    svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <linearGradient id="bgHoney" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FDFBF5"/>
          <stop offset="100%" stop-color="#EAE3D2"/>
        </linearGradient>
        <linearGradient id="honeyGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#F59E0B"/>
          <stop offset="45%" stop-color="#D97706"/>
          <stop offset="100%" stop-color="#92400E"/>
        </linearGradient>
        <filter id="shadowH" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="20" stdDeviation="16" flood-color="#1C1917" flood-opacity="0.16"/>
        </filter>
      </defs>
      <rect width="800" height="600" fill="url(#bgHoney)"/>
      <ellipse cx="400" cy="492" rx="180" ry="22" fill="#1C1917" opacity="0.12"/>
      <rect x="190" y="465" width="420" height="38" rx="8" fill="#F4F0E6" stroke="#DED8C8"/>

      <g filter="url(#shadowH)">
        <rect x="285" y="170" width="230" height="305" rx="44" fill="url(#honeyGlow)" stroke="#FDE68A" stroke-width="2"/>
        <ellipse cx="400" cy="320" rx="85" ry="110" fill="#FBBF24" opacity="0.35"/>
        <rect x="304" y="190" width="16" height="260" rx="8" fill="#FFFFFF" opacity="0.35"/>
        <rect x="295" y="138" width="210" height="36" rx="8" fill="#D4AF37" stroke="#AA820A" stroke-width="1.5"/>
        <rect x="305" y="144" width="190" height="8" rx="4" fill="#FEF08A" opacity="0.5"/>
        <rect x="382" y="136" width="36" height="92" rx="4" fill="#064E3B"/>
        <text x="400" y="192" text-anchor="middle" fill="#FAF8F2" font-family="monospace" font-size="7.5" font-weight="700">SEALED</text>

        <rect x="302" y="235" width="196" height="168" rx="14" fill="#FAF8F2" stroke="#D6D1C4" stroke-width="1.5"/>
        <text x="400" y="264" text-anchor="middle" fill="#064E3B" font-family="sans-serif" font-size="9.5" font-weight="700" letter-spacing="2">VILLAGE HARVEST</text>
        <text x="400" y="294" text-anchor="middle" fill="#141816" font-family="Georgia, serif" font-size="16" font-weight="700">Raw Multifloral</text>
        <text x="400" y="315" text-anchor="middle" fill="#141816" font-family="Georgia, serif" font-size="16" font-weight="700">Forest Honey</text>
        <text x="400" y="334" text-anchor="middle" fill="#B45309" font-family="sans-serif" font-size="9" font-weight="600" letter-spacing="1.2">UNPASTEURIZED · WESTERN GHATS</text>
        <line x1="330" y1="346" x2="470" y2="346" stroke="#E5E0D5" stroke-width="1"/>
        <text x="400" y="366" text-anchor="middle" fill="#44403C" font-family="monospace" font-size="9" font-weight="600">BATCH: VH-FH-2608 · NMR TESTED</text>
        <text x="400" y="384" text-anchor="middle" fill="#065F46" font-family="sans-serif" font-size="8.5" font-weight="700">QR VERIFIED ORIGIN RECORD</text>
      </g>
    </svg>`;
  } else if (preset === 'lakadong-turmeric') {
    svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <linearGradient id="bgTurm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#F7F5EE"/>
          <stop offset="100%" stop-color="#E5DEC9"/>
        </linearGradient>
        <linearGradient id="turmJar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#D97706"/>
          <stop offset="50%" stop-color="#EA580C"/>
          <stop offset="100%" stop-color="#9A3412"/>
        </linearGradient>
        <filter id="shadowT" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="20" stdDeviation="16" flood-color="#1C1917" flood-opacity="0.16"/>
        </filter>
      </defs>
      <rect width="800" height="600" fill="url(#bgTurm)"/>
      <ellipse cx="400" cy="492" rx="185" ry="22" fill="#1C1917" opacity="0.13"/>
      <rect x="190" y="465" width="420" height="38" rx="8" fill="#EFECE1" stroke="#D8D2C1"/>
      <g filter="url(#shadowT)">
        <rect x="290" y="175" width="220" height="298" rx="28" fill="url(#turmJar)"/>
        <rect x="306" y="192" width="14" height="262" rx="7" fill="#FFFFFF" opacity="0.25"/>
        <rect x="298" y="140" width="204" height="38" rx="8" fill="#1C1917"/>
        <rect x="305" y="232" width="190" height="172" rx="10" fill="#FAF8F2" stroke="#D6D1C4"/>
        <rect x="335" y="248" width="130" height="20" rx="4" fill="#064E3B"/>
        <text x="400" y="262" text-anchor="middle" fill="#FAF8F2" font-family="sans-serif" font-size="9" font-weight="700" letter-spacing="2">VILLAGE HARVEST</text>
        <text x="400" y="292" text-anchor="middle" fill="#141816" font-family="Georgia, serif" font-size="15.5" font-weight="700">Single-Origin</text>
        <text x="400" y="312" text-anchor="middle" fill="#141816" font-family="Georgia, serif" font-size="15.5" font-weight="700">Lakadong Haldi</text>
        <text x="400" y="332" text-anchor="middle" fill="#C2410C" font-family="sans-serif" font-size="9" font-weight="700" letter-spacing="1">&gt; 7.2% CURCUMIN CONTENT</text>
        <line x1="328" y1="345" x2="472" y2="345" stroke="#E5E0D5"/>
        <text x="400" y="364" text-anchor="middle" fill="#44403C" font-family="monospace" font-size="8.5" font-weight="600">BATCH: VH-LT-2607 · JJA HILLS</text>
        <text x="400" y="382" text-anchor="middle" fill="#065F46" font-family="sans-serif" font-size="8.5" font-weight="700">LAB REPORT PENDING REVIEW</text>
      </g>
    </svg>`;
  } else if (preset === 'mustard-oil') {
    svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <linearGradient id="bgOil" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#F6F5F0"/>
          <stop offset="100%" stop-color="#E4E0D3"/>
        </linearGradient>
        <linearGradient id="emeraldGlass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#065F46"/>
          <stop offset="45%" stop-color="#047857"/>
          <stop offset="100%" stop-color="#022C22"/>
        </linearGradient>
        <filter id="shadowO" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="20" stdDeviation="16" flood-color="#1C1917" flood-opacity="0.18"/>
        </filter>
      </defs>
      <rect width="800" height="600" fill="url(#bgOil)"/>
      <ellipse cx="400" cy="496" rx="150" ry="20" fill="#1C1917" opacity="0.14"/>
      <rect x="210" y="470" width="380" height="36" rx="8" fill="#EFECE2" stroke="#D7D1C0"/>
      <g filter="url(#shadowO)">
        <rect x="376" y="74" width="48" height="34" rx="6" fill="#B45309"/>
        <rect x="370" y="102" width="60" height="75" rx="8" fill="url(#emeraldGlass)"/>
        <path d="M370 172 C325 192, 312 220, 312 260 L312 465 C312 478, 322 485, 335 485 L465 485 C478 485, 488 478, 488 465 L488 260 C488 220, 475 192, 430 172 Z" fill="url(#emeraldGlass)"/>
        <rect x="326" y="225" width="12" height="235" rx="6" fill="#FFFFFF" opacity="0.24"/>
        <rect x="326" y="250" width="148" height="175" rx="10" fill="#FAF8F2" stroke="#D6D1C4"/>
        <text x="400" y="276" text-anchor="middle" fill="#064E3B" font-family="sans-serif" font-size="8.5" font-weight="700" letter-spacing="1.8">VILLAGE HARVEST</text>
        <text x="400" y="304" text-anchor="middle" fill="#141816" font-family="Georgia, serif" font-size="14.5" font-weight="700">Wood-Pressed</text>
        <text x="400" y="323" text-anchor="middle" fill="#141816" font-family="Georgia, serif" font-size="14.5" font-weight="700">Mustard Oil</text>
        <text x="400" y="342" text-anchor="middle" fill="#065F46" font-family="sans-serif" font-size="8.5" font-weight="700" letter-spacing="1">KACHI GHANI · COLD PRESSED</text>
        <line x1="342" y1="355" x2="458" y2="355" stroke="#E5E0D5"/>
        <text x="400" y="374" text-anchor="middle" fill="#44403C" font-family="monospace" font-size="8" font-weight="600">BATCH: VH-MO-2609</text>
        <text x="400" y="392" text-anchor="middle" fill="#065F46" font-family="sans-serif" font-size="8" font-weight="700">500 ML · VERIFIED</text>
      </g>
    </svg>`;
  } else {
    svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <linearGradient id="bgCustom" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#F7F6F1"/>
          <stop offset="100%" stop-color="#E6E2D6"/>
        </linearGradient>
        <filter id="shadowC" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="20" stdDeviation="16" flood-color="#1C1917" flood-opacity="0.15"/>
        </filter>
      </defs>
      <rect width="800" height="600" fill="url(#bgCustom)"/>
      <ellipse cx="400" cy="492" rx="185" ry="22" fill="#1C1917" opacity="0.12"/>
      <rect x="190" y="465" width="420" height="38" rx="8" fill="#EFECE2" stroke="#D8D2C1"/>
      <g filter="url(#shadowC)">
        <rect x="280" y="160" width="240" height="315" rx="28" fill="${primaryHex}"/>
        <rect x="298" y="180" width="14" height="275" rx="7" fill="#FFFFFF" opacity="0.2"/>
        <rect x="292" y="132" width="216" height="34" rx="8" fill="#1F2937"/>
        <rect x="302" y="220" width="196" height="186" rx="12" fill="${creamHex}" stroke="#D6D1C4"/>
        <text x="400" y="252" text-anchor="middle" fill="${primaryHex}" font-family="sans-serif" font-size="9.5" font-weight="700" letter-spacing="2">${safeSub.slice(0, 22)}</text>
        <text x="400" y="292" text-anchor="middle" fill="#141816" font-family="Georgia, serif" font-size="15" font-weight="700">${safeTitle.slice(0, 22)}</text>
        <text x="400" y="314" text-anchor="middle" fill="#141816" font-family="Georgia, serif" font-size="13" font-weight="600">${safeTitle.slice(22, 42)}</text>
        <line x1="330" y1="338" x2="470" y2="338" stroke="#D6D1C4"/>
        <text x="400" y="362" text-anchor="middle" fill="${primaryHex}" font-family="monospace" font-size="9" font-weight="700">SMARTBRAND QR ENABLED</text>
        <text x="400" y="382" text-anchor="middle" fill="#57534E" font-family="sans-serif" font-size="8.5">TRANSPARENCY PROFILE ACTIVE</text>
      </g>
    </svg>`;
  }

  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
}

export function getArtisanWorkshopBannerUri(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
    <defs>
      <linearGradient id="warmSun" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#064E3B"/>
        <stop offset="55%" stop-color="#065F46"/>
        <stop offset="100%" stop-color="#022C22"/>
      </linearGradient>
      <linearGradient id="sunbeam" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FDE68A" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="#FDE68A" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="675" fill="url(#warmSun)"/>
    <polygon points="0,0 650,0 1050,675 0,675" fill="url(#sunbeam)"/>
    <rect x="80" y="120" width="1040" height="12" rx="6" fill="#FAF8F2" opacity="0.18"/>
    <rect x="80" y="290" width="1040" height="12" rx="6" fill="#FAF8F2" opacity="0.18"/>
    <rect x="60" y="485" width="1080" height="190" fill="#141816" opacity="0.35"/>
    <g transform="translate(150, 320)">
      <rect x="0" y="30" width="95" height="135" rx="16" fill="#D97706"/>
      <rect x="12" y="65" width="71" height="65" rx="6" fill="#FAF8F2"/>
      <rect x="6" y="14" width="83" height="20" rx="4" fill="#FDE68A"/>
    </g>
    <g transform="translate(290, 320)">
      <rect x="0" y="30" width="95" height="135" rx="16" fill="#B45309"/>
      <rect x="12" y="65" width="71" height="65" rx="6" fill="#FAF8F2"/>
      <rect x="6" y="14" width="83" height="20" rx="4" fill="#FDE68A"/>
    </g>
    <g transform="translate(430, 320)">
      <rect x="0" y="30" width="95" height="135" rx="16" fill="#D97706"/>
      <rect x="12" y="65" width="71" height="65" rx="6" fill="#FAF8F2"/>
      <rect x="6" y="14" width="83" height="20" rx="4" fill="#FDE68A"/>
    </g>
    <rect x="640" y="300" width="380" height="165" rx="16" fill="#FAF8F2" opacity="0.95"/>
    <text x="672" y="342" fill="#064E3B" font-family="sans-serif" font-size="13" font-weight="700" letter-spacing="2">VILLAGE HARVEST COLLECTIVE · RATNAGIRI</text>
    <text x="672" y="376" fill="#141816" font-family="Georgia, serif" font-size="24" font-weight="700">Small-Batch Quality Ledger</text>
    <text x="672" y="408" fill="#44403C" font-family="monospace" font-size="14">Batch #VH-MP-2609 · 420 Jars Inspected</text>
    <text x="672" y="436" fill="#047857" font-family="sans-serif" font-size="13" font-weight="600">Every jar linked to public lab &amp; origin records</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

interface ProductImageProps {
  src: string;
  alt: string;
  title?: string;
  category?: string;
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  title,
  category,
  className = 'w-full h-full object-cover',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-stone-100 via-stone-50 to-emerald-50/40 text-stone-700 p-6 text-center ${className}`}
      >
        <div className="w-12 h-12 rounded-2xl bg-emerald-900/10 text-emerald-900 flex items-center justify-center mb-3">
          <Package className="w-6 h-6" />
        </div>
        {category && (
          <span className="text-[11px] font-mono text-emerald-800 mb-1">{category}</span>
        )}
        <span className="text-sm font-semibold text-stone-900 line-clamp-2">
          {title || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
