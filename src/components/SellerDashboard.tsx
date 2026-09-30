import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  Palette,
  QrCode,
  FileCheck2,
  MessageSquare,
  BarChart3,
  Settings,
  Plus,
  Search,
  ExternalLink,
  Edit3,
  Trash2,
  Upload,
  CheckCircle2,
  Clock,
  ShieldAlert,
  FileText,
  Star,
  Printer,
  Menu,
  X,
  Compass,
  EyeOff,
  RotateCcw,
  ShieldCheck,
  Database,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  Zap,
  Activity,
  MapPin,
  Smartphone,
  Award,
  Check,
  ArrowRight,
  Filter,
  Flame,
  Globe2,
  Globe,
  ChevronDown,
  LogOut,
  User,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import {
  BrandIdentity,
  CustomerReview,
  DocumentType,
  DocumentVerificationStatus,
  Product,
  QualityDocument,
  ScanAnalyticsPoint,
  SellerSidebarTab,
} from '../types/smartbrand';
import { ProductImage, getStudioProductDataUri } from '../utils/productArtwork';
import { BrandStudio } from './BrandStudio';
import { SupportedLanguage, getTranslation, SUPPORTED_LANGUAGES } from '../utils/i18n';
import { ThemeToggle, LanguageSelector } from './ThemeAndLangControls';

interface SellerDashboardProps {
  activeTab: SellerSidebarTab;
  onChangeTab: (tab: SellerSidebarTab) => void;
  brand: BrandIdentity;
  onUpdateBrand: (updated: BrandIdentity) => void;
  products: Product[];
  onSaveProduct: (product: Product, isEdit: boolean) => void;
  onDeleteProduct: (productId: string) => void;
  documents: QualityDocument[];
  onAddDocument: (doc: QualityDocument) => void;
  reviews: CustomerReview[];
  onModerateReview: (reviewId: string, status: CustomerReview['moderationStatus']) => void;
  scanAnalytics: ScanAnalyticsPoint[];
  onIncrementScan: (productId: string) => void;
  onOpenQRProfile: (productId: string) => void;
  onOpenAdminPanel: () => void;
  onBackToLanding: () => void;
  onStartDemoTour: () => void;
  onResetDemoData: () => void;
  onNotify: (title: string, description?: string, tone?: 'success' | 'info' | 'warning') => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
  currentLang?: SupportedLanguage;
  onSelectLang?: (lang: SupportedLanguage) => void;
  onLogout?: () => void;
}

const DOCUMENT_TYPES: DocumentType[] = [
  'FSSAI Registration Record',
  'NABL Lab Microbial Report',
  'Pesticide Residue Analysis',
  'Organic Input Declaration',
  'Food-Grade Packaging Certificate',
  'Artisan Craft & Origin Record',
];

export const SellerDashboard: React.FC<SellerDashboardProps> = ({
  activeTab,
  onChangeTab,
  brand,
  onUpdateBrand,
  products,
  onSaveProduct,
  onDeleteProduct,
  documents,
  onAddDocument,
  reviews,
  onModerateReview,
  scanAnalytics,
  onIncrementScan,
  onOpenQRProfile,
  onOpenAdminPanel,
  onBackToLanding,
  onStartDemoTour,
  onResetDemoData,
  onNotify,
  isDark = false,
  onToggleTheme = () => {},
  currentLang = 'en',
  onSelectLang = () => {},
  onLogout = () => {},
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Product Management State
  const [productSearch, setProductSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [qrModalProduct, setQrModalProduct] = useState<Product | null>(null);

  // Product Form Fields
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('Artisanal Preserves & Pickles');
  const [prodDesc, setProdDesc] = useState('');
  const [prodIngredients, setProdIngredients] = useState('');
  const [prodOrigin, setProdOrigin] = useState('Ratnagiri, Maharashtra');
  const [prodMfgDate, setProdMfgDate] = useState('2026-09-25');
  const [prodExpDate, setProdExpDate] = useState('2027-09-24');
  const [prodBatch, setProdBatch] = useState('VH-NEW-2610');
  const [prodWeight, setProdWeight] = useState('500 g');
  const [prodPrice, setProdPrice] = useState('350');
  const [prodPreset, setProdPreset] = useState<Product['artworkPreset']>('mango-pickle');
  const [prodCustomImage, setProdCustomImage] = useState('');
  const [prodBusinessName, setProdBusinessName] = useState(brand.brandName);
  const [prodBusinessLoc, setProdBusinessLoc] = useState(brand.originLocation);

  // Document Upload Modal State
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  const [docType, setDocType] = useState<DocumentType>('NABL Lab Microbial Report');
  const [docProductId, setDocProductId] = useState(products[0]?.id || 'prod-mango-pickle');
  const [docRefNumber, setDocRefNumber] = useState('LAB-VH-2026-501');
  const [docIssueDate, setDocIssueDate] = useState('2026-09-20');
  const [docExpiryDate, setDocExpiryDate] = useState('2027-09-19');
  const [docFileName, setDocFileName] = useState('batch_quality_report.pdf');
  const [docSummaryText, setDocSummaryText] = useState(
    'Moisture & Acidity within standard limits\nNo synthetic dyes or adulterants detected'
  );
  const [previewDoc, setPreviewDoc] = useState<QualityDocument | null>(null);

  // Review Filter State
  const [reviewFilterProduct, setReviewFilterProduct] = useState('ALL');

  // Sidebar Language Selector State
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  // Overview Interactive Tab & Live Stream State
  const [overviewTimeRange, setOverviewTimeRange] = useState<'7d' | '14d' | '30d'>('7d');
  const [overviewSubTab, setOverviewSubTab] = useState<'analytics' | 'compliance' | 'live-stream'>('analytics');
  const [liveScansList, setLiveScansList] = useState<
    Array<{
      id: string;
      city: string;
      time: string;
      device: string;
      productName: string;
      batchNumber: string;
      productId: string;
    }>
  >([
    {
      id: 'scan-1',
      city: 'Mumbai (Bandra West)',
      time: 'Just now',
      device: 'iPhone 15 Pro · Safari',
      productName: 'Homemade Mango Pickle',
      batchNumber: 'VH-MP-2609',
      productId: 'prod-mango-pickle',
    },
    {
      id: 'scan-2',
      city: 'Bengaluru (Indiranagar)',
      time: '3 min ago',
      device: 'Pixel 8 · Chrome',
      productName: 'Raw Multifloral Forest Honey',
      batchNumber: 'VH-WH-2608',
      productId: 'prod-wild-honey',
    },
    {
      id: 'scan-3',
      city: 'Pune (Kothrud)',
      time: '11 min ago',
      device: 'Samsung Galaxy S24 · Edge',
      productName: 'Single-Origin Lakadong Turmeric',
      batchNumber: 'VH-LT-2607',
      productId: 'prod-lakadong-turmeric',
    },
    {
      id: 'scan-4',
      city: 'New Delhi (Hauz Khas)',
      time: '24 min ago',
      device: 'iPhone 14 · Safari',
      productName: 'Wood-Pressed Black Mustard Oil',
      batchNumber: 'VH-MO-2606',
      productId: 'prod-mustard-oil',
    },
  ]);

  const handleSimulateNewScan = (targetProduct?: Product) => {
    const chosenProduct =
      targetProduct || products[Math.floor(Math.random() * products.length)] || products[0];
    if (!chosenProduct) return;

    const indianCities = [
      'Mumbai (Colaba)',
      'Bengaluru (Koramangala)',
      'Pune (Aundh)',
      'New Delhi (Connaught Place)',
      'Hyderabad (Jubilee Hills)',
      'Ahmedabad (Bodakdev)',
      'Goa (Panaji)',
      'Kolkata (Salt Lake)',
    ];
    const devices = [
      'iPhone 15 · Safari',
      'OnePlus 12 · Chrome',
      'Pixel 8 Pro · Chrome',
      'Samsung S23 · Samsung Browser',
    ];

    const randomCity = indianCities[Math.floor(Math.random() * indianCities.length)];
    const randomDevice = devices[Math.floor(Math.random() * devices.length)];

    const newScanEntry = {
      id: `scan-${Date.now()}`,
      city: randomCity,
      time: 'Just now',
      device: randomDevice,
      productName: chosenProduct.name,
      batchNumber: chosenProduct.batchNumber,
      productId: chosenProduct.id,
    };

    setLiveScansList((prev) => [newScanEntry, ...prev.slice(0, 9)]);
    onIncrementScan(chosenProduct.id);
    onNotify(
      'Consumer QR Scanned!',
      `Live verification scan recorded from ${randomCity} for ${chosenProduct.name} (Batch ${chosenProduct.batchNumber})`,
      'success'
    );
  };

  // Computed Dashboard Metrics
  const totalProducts = products.length;
  const totalQrScans = products.reduce((acc, p) => acc + p.qrScans, 0);
  const publishedReviews = reviews.filter((r) => r.moderationStatus === 'Published');
  const avgRating =
    publishedReviews.length > 0
      ? (
          publishedReviews.reduce((acc, r) => acc + r.rating, 0) / publishedReviews.length
        ).toFixed(1)
      : '5.0';

  const categories = ['ALL', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.batchNumber.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = categoryFilter === 'ALL' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const openAddProductModal = () => {
    setEditingProduct(null);
    setProdName('');
    setProdCategory('Artisanal Preserves & Pickles');
    setProdDesc('');
    setProdIngredients(
      'Farm-harvested raw ingredients, Cold-pressed oil, Natural sea salt, Heirloom spices'
    );
    setProdOrigin(brand.originLocation);
    setProdMfgDate('2026-09-28');
    setProdExpDate('2027-09-27');
    setProdBatch(`VH-B${Math.floor(1000 + Math.random() * 9000)}`);
    setProdWeight('500 g');
    setProdPrice('360');
    setProdPreset('custom');
    setProdCustomImage('');
    setProdBusinessName(brand.brandName);
    setProdBusinessLoc(brand.originLocation);
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setProdName(product.name);
    setProdCategory(product.category);
    setProdDesc(product.description);
    setProdIngredients(product.ingredientsOrMaterials.join(', '));
    setProdOrigin(product.sourcingOrigin);
    setProdMfgDate(product.manufacturingDate);
    setProdExpDate(product.expiryDate);
    setProdBatch(product.batchNumber);
    setProdWeight(product.netWeight);
    setProdPrice(String(product.priceInr));
    setProdPreset(product.artworkPreset);
    setProdCustomImage('');
    setProdBusinessName(product.businessName);
    setProdBusinessLoc(product.businessLocation);
    setIsProductModalOpen(true);
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProdCustomImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProductFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim() || !prodBatch.trim()) return;

    const finalImageUrl =
      prodCustomImage ||
      getStudioProductDataUri(
        prodPreset,
        prodName.trim(),
        prodBusinessName.trim(),
        brand.primaryColor,
        brand.secondaryColor
      );

    const newProd: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      sellerId: 'seller-village-harvest',
      name: prodName.trim(),
      category: prodCategory.trim(),
      description:
        prodDesc.trim() ||
        `Small-batch ${prodName.trim()} crafted by ${prodBusinessName.trim()} with full batch transparency.`,
      ingredientsOrMaterials: prodIngredients
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      sourcingOrigin: prodOrigin.trim() || brand.originLocation,
      manufacturingDate: prodMfgDate,
      expiryDate: prodExpDate,
      batchNumber: prodBatch.trim(),
      netWeight: prodWeight.trim() || '500 g',
      priceInr: Math.max(1, Number(prodPrice) || 299),
      imageUrl: finalImageUrl,
      artworkPreset: prodPreset,
      qrScans: editingProduct ? editingProduct.qrScans : 1,
      storageInstructions: 'Store in a cool, dry place away from direct sunlight.',
      businessName: prodBusinessName.trim() || brand.brandName,
      businessLocation: prodBusinessLoc.trim() || brand.originLocation,
      sellerContactPhone: brand.contactPhone,
      sellerContactEmail: brand.contactEmail,
      createdAt: editingProduct
        ? editingProduct.createdAt
        : new Date().toISOString().slice(0, 10),
      isSampleData: false,
    };

    onSaveProduct(newProd, Boolean(editingProduct));
    setIsProductModalOpen(false);
    setQrModalProduct(newProd);
  };

  const handleDocumentUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim()) return;

    const newDoc: QualityDocument = {
      id: `doc-${Date.now()}`,
      productId: docProductId,
      sellerId: 'seller-village-harvest',
      title: docTitle.trim(),
      type: docType,
      referenceNumber: docRefNumber.trim() || `DOC-${Date.now().toString().slice(-5)}`,
      issueDate: docIssueDate,
      expiryDate: docExpiryDate,
      status: 'Pending Review',
      fileName: docFileName || 'uploaded_quality_record.pdf',
      fileSize: '640 KB',
      uploadedAt: new Date().toISOString().slice(0, 10),
      adminNotes: 'Uploaded by seller; queued for SmartBrand Admin verification.',
      summaryPoints: docSummaryText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    onAddDocument(newDoc);
    setIsDocModalOpen(false);
    setDocTitle('');
  };

  const renderDocStatus = (status: DocumentVerificationStatus) => {
    if (status === 'Verified by Admin') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
          <span>Verified by Admin</span>
        </span>
      );
    }
    if (status === 'Pending Review') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800">
          <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span>Pending Review</span>
        </span>
      );
    }
    if (status === 'Revision Requested') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-800">
          <ShieldAlert className="w-3.5 h-3.5 text-red-700 shrink-0" />
          <span>Revision Requested</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700">
        <FileText className="w-3.5 h-3.5 text-stone-600 shrink-0" />
        <span>Uploaded</span>
      </span>
    );
  };

  const t = (key: string) => getTranslation(currentLang, key);
  const currentLangObj =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  const sidebarItems: { id: SellerSidebarTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: t('overview'), icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'products', label: t('myProducts'), icon: <Package className="w-4 h-4" /> },
    { id: 'brand-studio', label: t('brandStudio'), icon: <Palette className="w-4 h-4" /> },
    { id: 'qr-verification', label: t('qrVerification'), icon: <QrCode className="w-4 h-4" /> },
    { id: 'quality-documents', label: t('qualityDocuments'), icon: <FileCheck2 className="w-4 h-4" /> },
    { id: 'customer-reviews', label: t('customerReviews'), icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'analytics', label: t('analytics'), icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'settings', label: t('settings'), icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F5] dark:bg-stone-950 text-[#141816] dark:text-stone-100 flex">
      {/* Desktop Left Sidebar */}
      <aside className="hidden lg:flex w-[272px] shrink-0 bg-white dark:bg-stone-900 border-r border-stone-200/90 dark:border-stone-800 flex-col justify-between sticky top-0 h-screen overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* UPAR ME THEME (Theme toggle at the top of the sidebar) */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 dark:border-stone-800">
            <button
              onClick={onBackToLanding}
              className="font-display text-xl font-bold tracking-tight text-emerald-950 dark:text-emerald-400 hover:opacity-85 transition-opacity"
            >
              SmartBrand
            </button>
            <ThemeToggle isDark={isDark} onToggleTheme={onToggleTheme} showLabel={true} />
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF9F5] dark:bg-stone-800/80 border border-stone-200/90 dark:border-stone-700/80 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-display font-bold text-sm shrink-0"
              style={{ backgroundColor: brand.primaryColor }}
            >
              {brand.brandName
                .split(' ')
                .map((w) => w[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">{brand.brandName}</div>
              <div className="text-[11px] text-stone-500 dark:text-stone-400 truncate">{brand.originLocation}</div>
            </div>
          </div>

          {/* SIDEBAR NAVIGATION ITEMS (My Product, Brand Studio, etc.) */}
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onChangeTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* JIDHAR MY PRODUCT, BRAND STUDIO HAI UDHAR EK OPTION ME CHANGE LANGUAGE */}
            <div className="pt-2 mt-2 border-t border-stone-200/70 dark:border-stone-800">
              <button
                type="button"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  isLangMenuOpen
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700/60 shadow-xs'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border-stone-200/80 dark:border-stone-700/60 bg-stone-50/70 dark:bg-stone-800/40'
                }`}
                title="Change Website Language / भाषा बदलें"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="truncate">Change Language</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-bold">
                    {currentLangObj.flag} {currentLangObj.nativeName}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${
                      isLangMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Expandable Language Drawer */}
              {isLangMenuOpen && (
                <div className="mt-1.5 p-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-xl space-y-1 animate-in fade-in duration-150">
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 border-b border-stone-100 dark:border-stone-800">
                    Select Language / भाषा चुनें
                  </div>
                  <div className="max-h-52 overflow-y-auto space-y-0.5 pt-0.5">
                    {SUPPORTED_LANGUAGES.map((lang) => {
                      const isCurrent = lang.code === currentLang;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            onSelectLang(lang.code);
                            setIsLangMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
                            isCurrent
                              ? 'bg-emerald-800 text-white font-semibold'
                              : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{lang.flag}</span>
                            <span className="font-semibold">{lang.nativeName}</span>
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
          </nav>
        </div>

        {/* BOTTOM SECTION OF SIDEBAR */}
        <div className="p-4 border-t border-stone-200/80 dark:border-stone-800 space-y-2.5">
          <button
            onClick={() => onOpenQRProfile('prod-mango-pickle')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-emerald-900 bg-emerald-50/80 hover:bg-emerald-100/80 dark:bg-emerald-950/30 dark:text-emerald-300 dark:hover:bg-emerald-950/60 transition-colors"
          >
            <span>Public QR Trust Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenAdminPanel}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-400 dark:hover:text-stone-200 dark:hover:bg-stone-800 transition-colors"
          >
            <span>{t('adminPanel')}</span>
            <ShieldCheck className="w-3.5 h-3.5" />
          </button>

          {/* User Profile Card */}
          <div className="pt-2 border-t border-stone-200/80 dark:border-stone-800 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                {brand.brandName}
              </div>
              <div className="text-[10px] text-stone-500 dark:text-stone-400 truncate">care@villageharvest.in</div>
            </div>
          </div>

          {/* NICHE ME LOGOUT (Dedicated full-width Logout button) */}
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 dark:bg-red-950/40 dark:hover:bg-red-900/50 dark:text-red-300 text-xs font-bold transition-all border border-red-200/90 dark:border-red-900/50 shadow-xs cursor-pointer"
            title="Log out from SmartBrand"
          >
            <LogOut className="w-4 h-4 text-red-600 dark:text-red-400" />
            <span>{t('logout')}</span>
          </button>
        </div>
      </aside>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/50 backdrop-blur-xs flex">
          <div className="w-72 bg-white dark:bg-stone-900 h-full p-5 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-5">
              {/* Mobile Top Header: SmartBrand + ThemeToggle */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
                <span className="font-display text-xl font-bold text-emerald-950 dark:text-emerald-400">SmartBrand</span>
                <div className="flex items-center gap-2">
                  <ThemeToggle isDark={isDark} onToggleTheme={onToggleTheme} showLabel={false} />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onChangeTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                      activeTab === item.id
                        ? 'bg-emerald-800 text-white'
                        : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}

                {/* Change Language in Mobile Menu */}
                <div className="pt-2 mt-2 border-t border-stone-200/70 dark:border-stone-800">
                  <div className="text-[11px] font-bold text-stone-500 dark:text-stone-400 mb-1.5 px-1">
                    Language / भाषा:
                  </div>
                  <div className="grid grid-cols-2 gap-1 max-h-48 overflow-y-auto p-1 bg-stone-50 dark:bg-stone-800 rounded-xl">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => onSelectLang(lang.code)}
                        className={`flex items-center gap-1.5 p-2 rounded-lg text-xs font-medium text-left ${
                          currentLang === lang.code
                            ? 'bg-emerald-800 text-white font-bold'
                            : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/70 dark:hover:bg-stone-700'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span className="truncate">{lang.nativeName}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </nav>
            </div>

            <div className="space-y-2 pt-4 border-t border-stone-200 dark:border-stone-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQRProfile('prod-mango-pickle');
                }}
                className="w-full py-2 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 text-xs font-semibold text-left flex items-center justify-between"
              >
                <span>Sample QR Trust Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminPanel();
                }}
                className="w-full py-2 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold text-left flex items-center justify-between"
              >
                <span>{t('adminPanel')}</span>
                <ShieldCheck className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Logout Button */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs font-bold text-left flex items-center justify-between border border-red-200/80 dark:border-red-900/50"
              >
                <span>{t('logout')}</span>
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0 pb-24">
        {/* Sticky Top Header (Clean: Theme and Language removed from top as requested) */}
        <header className="sticky top-0 z-30 bg-[#FAF9F5]/95 dark:bg-stone-900/95 backdrop-blur border-b border-stone-200/80 dark:border-stone-800 px-4 sm:px-8 py-3.5">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300"
              >
                <Menu className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                <span className="font-semibold text-stone-800 dark:text-stone-200">{brand.brandName}</span>
                <span aria-hidden="true">/</span>
                <span className="capitalize">{activeTab.replace('-', ' ')}</span>
                <span className="hidden md:inline" aria-hidden="true">
                  ·
                </span>
                <span className="hidden md:inline text-stone-500 dark:text-stone-400">
                  Backend API & Database Connected
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onStartDemoTour}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-900 dark:text-emerald-300 bg-emerald-950/5 hover:bg-emerald-950/10 dark:bg-emerald-900/30 border border-emerald-800/20 dark:border-emerald-700/40 rounded-xl transition-colors whitespace-nowrap"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Guided Tour</span>
              </button>

              <button
                onClick={openAddProductModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors whitespace-nowrap shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t('addProduct')}</span>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-7 space-y-7">
          {activeTab === 'overview' && (
            <>
              {/* Refined Artisanal Producer Welcome Card */}
              <div className="bg-[#102a20] text-stone-100 rounded-2xl p-6 sm:p-7 border border-emerald-900/60 shadow-xs">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-display font-bold text-lg shrink-0 shadow-sm"
                      style={{ backgroundColor: brand.primaryColor || '#065F46' }}
                    >
                      {brand.brandName
                        .split(' ')
                        .map((w) => w[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-300/90 font-medium">
                        <span>{brand.originLocation}</span>
                        <span aria-hidden="true">·</span>
                        <span>FSSAI Lic #11521034000128</span>
                        <span aria-hidden="true">·</span>
                        <span>Est. {brand.foundedYear || '2021'}</span>
                      </div>
                      <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                        Welcome back, {brand.brandName}
                      </h1>
                      <p className="text-xs sm:text-sm text-stone-300/90 max-w-2xl leading-relaxed">
                        {brand.tagline ||
                          'Transparent digital trust platform for artisanal and small-batch produce.'}
                        {' '}All {totalProducts} handcrafted batches are live with verified public QR trust pages, lab test records, and verified buyer reviews.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    <button
                      onClick={openAddProductModal}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-emerald-950 bg-stone-100 hover:bg-white rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
                    >
                      <Plus className="w-4 h-4 text-emerald-800" />
                      <span>Add New Batch</span>
                    </button>
                    <button
                      onClick={() => onOpenQRProfile('prod-mango-pickle')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-700/60 rounded-xl transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Sample QR Page</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 4 Clean, Honest Key Metrics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-xl p-4.5 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 font-medium">
                    <span>Active Batches</span>
                    <Package className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  </div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mt-2 tabular-nums">
                    {totalProducts}
                  </div>
                  <div className="mt-2 pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400 flex items-center justify-between">
                    <span>In-store verification</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-medium">100% Online</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-xl p-4.5 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 font-medium">
                    <span>Total Shopper Scans</span>
                    <TrendingUp className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  </div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mt-2 tabular-nums">
                    {totalQrScans.toLocaleString()}
                  </div>
                  <div className="mt-2 pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400 flex items-center justify-between">
                    <span>Across 5 Metros</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-medium">▲ +18.4%</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-xl p-4.5 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 font-medium">
                    <span>Lab Test Records</span>
                    <FileCheck2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  </div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mt-2 tabular-nums">
                    {documents.length}
                  </div>
                  <div className="mt-2 pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400 flex items-center justify-between">
                    <span>NABL & FSSAI on file</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                      {documents.filter((d) => d.status === 'Verified by Admin').length} Verified
                    </span>
                  </div>
                </div>

                <div className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-xl p-4.5 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 font-medium">
                    <span>Customer Rating</span>
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  </div>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mt-2 tabular-nums flex items-baseline gap-1.5">
                    <span>{avgRating}</span>
                    <span className="text-amber-500 text-base">★</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400 flex items-center justify-between">
                    <span>{publishedReviews.length} Verified Reviews</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-medium">94% Buyer Match</span>
                  </div>
                </div>
              </div>

              {/* Shopper Scan Trends & Geography */}
              <div className="bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200/80 dark:border-stone-800">
                  <div>
                    <h2 className="font-display text-lg font-bold text-stone-900 dark:text-white">
                      Shopper Scan Velocity
                    </h2>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Daily in-store QR scans logged from consumer smartphones
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="p-1 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center gap-1 text-xs">
                      {(['7d', '14d', '30d'] as const).map((range) => (
                        <button
                          key={range}
                          onClick={() => setOverviewTimeRange(range)}
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                            overviewTimeRange === range
                              ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-2xs'
                              : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 dark:hover:text-stone-200'
                          }`}
                        >
                          {range.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handleSimulateNewScan()}
                      className="px-2.5 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      title="Simulate a real-time scan"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>Simulate Scan</span>
                    </button>
                  </div>
                </div>

                <div className="h-56 sm:h-64 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={
                        overviewTimeRange === '7d'
                          ? scanAnalytics.slice(-7)
                          : overviewTimeRange === '14d'
                          ? scanAnalytics.slice(-14)
                          : scanAnalytics
                      }
                    >
                      <defs>
                        <linearGradient id="scanGradHuman" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#065F46" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#065F46" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" strokeOpacity={0.5} />
                      <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#78716C' }} />
                      <YAxis tick={{ fontSize: 11, fill: '#78716C' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#FFFFFF',
                          borderColor: '#E7E5E4',
                          borderRadius: '12px',
                          fontSize: '12px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="scans"
                        name="Total Scans"
                        stroke="#065F46"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#scanGradHuman)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Regional Metro Spread */}
                <div className="pt-3 border-t border-stone-100 dark:border-stone-800">
                  <div className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                    Shoppers by Region
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60">
                      <div className="text-[11px] text-stone-500 dark:text-stone-400">Mumbai (MMR)</div>
                      <div className="font-mono font-bold text-stone-900 dark:text-white mt-0.5">37% · 684 scans</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60">
                      <div className="text-[11px] text-stone-500 dark:text-stone-400">Bengaluru</div>
                      <div className="font-mono font-bold text-stone-900 dark:text-white mt-0.5">27% · 492 scans</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60">
                      <div className="text-[11px] text-stone-500 dark:text-stone-400">Pune</div>
                      <div className="font-mono font-bold text-stone-900 dark:text-white mt-0.5">21% · 380 scans</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60">
                      <div className="text-[11px] text-stone-500 dark:text-stone-400">New Delhi</div>
                      <div className="font-mono font-bold text-stone-900 dark:text-white mt-0.5">11% · 210 scans</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Brand Catalog Spotlight */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-display text-xl font-bold text-stone-900">
                      Active Brand Catalog & Batch Registry
                    </h2>
                    <p className="text-xs text-stone-500">
                      Every product batch has a public scannable QR trust page with honest ingredient origins and lab certificates
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onChangeTab('products')}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 hover:text-emerald-950 hover:underline"
                    >
                      <span>Open Catalog Manager</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {products.map((prod) => {
                    const prodDocs = documents.filter((d) => d.productId === prod.id);
                    const verifiedCount = prodDocs.filter(
                      (d) => d.status === 'Verified by Admin'
                    ).length;

                    return (
                      <div
                        key={prod.id}
                        className="bg-white border border-stone-200/90 rounded-[22px] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-200 group hover:-translate-y-0.5"
                      >
                        <div>
                          <div className="aspect-4/3 bg-stone-100 border-b border-stone-200/70 relative overflow-hidden">
                            <ProductImage
                              src={prod.imageUrl}
                              alt={prod.name}
                              title={prod.name}
                              category={prod.category}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-xs text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-md">
                              ₹{prod.priceInr}
                            </div>
                            <div className="absolute bottom-2.5 left-2.5 bg-emerald-900/85 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-md flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>{verifiedCount} Verified Doc{verifiedCount !== 1 ? 's' : ''}</span>
                            </div>
                          </div>

                          <div className="p-4 space-y-2">
                            <div className="flex items-center justify-between text-[11px] font-mono text-stone-500">
                              <span>Batch #{prod.batchNumber}</span>
                              <span>{prod.netWeight}</span>
                            </div>
                            <h3 className="text-sm font-bold text-stone-900 line-clamp-1 group-hover:text-emerald-900 transition-colors">
                              {prod.name}
                            </h3>
                            <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                              {prod.description}
                            </p>
                            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                              <span>Shopper scans:</span>
                              <strong className="font-mono text-emerald-900 font-bold tabular-nums">
                                {prod.qrScans} scans
                              </strong>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 pt-0 space-y-2">
                          <button
                            onClick={() => onOpenQRProfile(prod.id)}
                            className="w-full py-2 px-3 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs whitespace-nowrap"
                          >
                            <QrCode className="w-3.5 h-3.5" />
                            <span>View Public QR Profile</span>
                          </button>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setQrModalProduct(prod)}
                              className="flex-1 py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded-xl transition-colors flex items-center justify-center gap-1"
                            >
                              <Printer className="w-3.5 h-3.5 text-stone-600" />
                              <span>QR Sticker</span>
                            </button>
                            <button
                              onClick={() => handleSimulateNewScan(prod)}
                              className="py-1.5 px-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-medium rounded-xl transition-colors flex items-center justify-center gap-1"
                              title="Simulate a consumer scan on this batch"
                            >
                              <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                              <span>Scan</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick-Launch Studio Hub (4 Interactive Action Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => onChangeTab('brand-studio')}
                  className="p-5 bg-white border border-stone-200/90 rounded-[20px] text-left hover:border-emerald-700/50 hover:shadow-sm transition-all group space-y-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-stone-900">Brand Studio</h3>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Customize label stamps, typography, and palette styling.
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => onChangeTab('quality-documents')}
                  className="p-5 bg-white border border-stone-200/90 rounded-[20px] text-left hover:border-emerald-700/50 hover:shadow-sm transition-all group space-y-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-stone-900">Quality Vault</h3>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Upload NABL lab reports, FSSAI records, and purity certificates.
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => onChangeTab('qr-verification')}
                  className="p-5 bg-white border border-stone-200/90 rounded-[20px] text-left hover:border-emerald-700/50 hover:shadow-sm transition-all group space-y-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                    <Printer className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-stone-900">Printable Stickers</h3>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Generate 3×3 packaging sticker sheets with batch QR codes.
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => onChangeTab('customer-reviews')}
                  className="p-5 bg-white border border-stone-200/90 rounded-[20px] text-left hover:border-emerald-700/50 hover:shadow-sm transition-all group space-y-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-stone-900">Customer Feedback</h3>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Moderate verified order reviews and shopper testimonials.
                    </p>
                  </div>
                </button>
              </div>

              {/* Verified Feedback & Real-Time Studio Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Recent Customer Feedback */}
                <div className="lg:col-span-7 bg-white border border-stone-200/90 rounded-[22px] p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-lg font-bold text-stone-900">
                        Recent Verified Feedback
                      </h2>
                      <p className="text-xs text-stone-500">
                        Customer ratings submitted through product QR transparency pages
                      </p>
                    </div>
                    <button
                      onClick={() => onChangeTab('customer-reviews')}
                      className="text-xs font-semibold text-emerald-800 hover:underline"
                    >
                      All Reviews →
                    </button>
                  </div>

                  <div className="divide-y divide-stone-200/80">
                    {publishedReviews.slice(0, 3).map((rev) => {
                      const prod = products.find((p) => p.id === rev.productId);
                      return (
                        <div key={rev.id} className="py-3.5 first:pt-0 last:pb-0 space-y-1.5">
                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                            <div className="flex items-center gap-2">
                              <strong className="text-stone-900 font-bold">{rev.customerName}</strong>
                              <span className="text-stone-400">·</span>
                              <span className="text-stone-600">{prod?.name}</span>
                              {rev.isVerifiedPurchase && (
                                <>
                                  <span className="text-stone-400">·</span>
                                  <span className="text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">
                                    Verified Order #{rev.orderId || 'VH-892'}
                                  </span>
                                </>
                              )}
                            </div>
                            <span className="font-mono font-bold text-amber-600 flex items-center gap-0.5">
                              <span>{rev.rating}.0</span>
                              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 leading-relaxed italic">
                            “{rev.comment}”
                          </p>
                          <div className="text-[10px] text-stone-500 font-mono">
                            {rev.customerLocation} · {rev.date}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Studio Activity Audit Log */}
                <div className="lg:col-span-5 bg-white border border-stone-200/90 rounded-[22px] p-6 space-y-4 shadow-xs">
                  <div>
                    <h2 className="font-display text-lg font-bold text-stone-900">
                      Studio Audit & Event Log
                    </h2>
                    <p className="text-xs text-stone-500">
                      Automated events logged across batches & documents
                    </p>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-stone-200/80 flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                        <QrCode className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-bold text-stone-900">
                          Batch #VH-MP-2609 QR Scanned
                        </div>
                        <div className="text-stone-600 text-[11px] mt-0.5">
                          Homemade Mango Pickle · 684 cumulative consumer scans logged
                        </div>
                        <div className="text-stone-400 font-mono text-[10px] mt-1">2 minutes ago · Live</div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-stone-200/80 flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      </div>
                      <div>
                        <div className="font-bold text-stone-900">
                          NABL Lab Microbial Report Approved
                        </div>
                        <div className="text-stone-600 text-[11px] mt-0.5">
                          Ref: LAB-KONKAN-2026-8841 · Admin verified and published to QR page
                        </div>
                        <div className="text-stone-400 font-mono text-[10px] mt-1">Today at 10:14 AM</div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-stone-200/80 flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                        <Palette className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-bold text-stone-900">
                          Packaging Label Theme Updated
                        </div>
                        <div className="text-stone-600 text-[11px] mt-0.5">
                          Konkan Emerald & Cream palette applied to Village Harvest branding
                        </div>
                        <div className="text-stone-400 font-mono text-[10px] mt-1">Yesterday at 4:30 PM</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="bg-white border border-stone-200/90 rounded-[22px] p-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold text-stone-900">
                    Product Catalog & QR Batch Manager
                  </h2>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Add, edit, or delete products. Every saved product automatically receives a
                    scannable QR code linked to its public transparency profile.
                  </p>
                </div>
                <button
                  onClick={openAddProductModal}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              <div className="bg-white border border-stone-200/90 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search by product name, batch number, or category..."
                    className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                        categoryFilter === cat
                          ? 'bg-emerald-800 text-white'
                          : 'bg-stone-100 text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="bg-white border border-stone-200/90 rounded-[22px] p-12 text-center space-y-3">
                  <Package className="w-10 h-10 text-stone-400 mx-auto" />
                  <h3 className="text-base font-bold text-stone-900">
                    No Matching Products Found
                  </h3>
                  <p className="text-xs text-stone-500 max-w-md mx-auto">
                    Try clearing your search filter or add a new small-batch product to generate its
                    QR transparency page.
                  </p>
                  <button
                    onClick={openAddProductModal}
                    className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 rounded-xl"
                  >
                    + Add Product
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-white border border-stone-200/90 rounded-[22px] p-5 flex flex-col sm:flex-row gap-5"
                    >
                      <div className="sm:w-44 aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/80 shrink-0">
                        <ProductImage
                          src={prod.imageUrl}
                          alt={prod.name}
                          title={prod.name}
                          category={prod.category}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-center justify-between gap-2 text-xs text-stone-500">
                            <span>{prod.category}</span>
                            <span className="font-mono font-bold text-stone-900 tabular-nums">
                              MRP ₹{prod.priceInr} · {prod.netWeight}
                            </span>
                          </div>
                          <h3 className="font-display text-lg font-bold text-stone-900 mt-0.5">
                            {prod.name}
                          </h3>
                          <p className="text-xs text-stone-600 line-clamp-2 mt-1">
                            {prod.description}
                          </p>
                          <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px] font-mono text-stone-600">
                            <span>Batch: {prod.batchNumber}</span>
                            <span>·</span>
                            <span>Mfg: {prod.manufacturingDate}</span>
                            <span>·</span>
                            <span>Exp: {prod.expiryDate}</span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => onOpenQRProfile(prod.id)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors whitespace-nowrap"
                            >
                              <QrCode className="w-3.5 h-3.5" />
                              <span>View QR Profile</span>
                            </button>
                            <button
                              onClick={() => setQrModalProduct(prod)}
                              className="px-2.5 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors whitespace-nowrap"
                            >
                              QR Code
                            </button>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => openEditProductModal(prod)}
                              className="p-1.5 text-stone-600 hover:text-stone-950 hover:bg-stone-100 rounded-lg"
                              title="Edit Product"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onDeleteProduct(prod.id)}
                              className="p-1.5 text-red-700 hover:bg-red-50 rounded-lg"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'brand-studio' && (
            <BrandStudio
              brand={brand}
              products={products}
              onUpdateBrand={onUpdateBrand}
              onNotify={onNotify}
            />
          )}

          {activeTab === 'qr-verification' && (
            <div className="space-y-6">
              <div className="bg-white border border-stone-200/90 rounded-[22px] p-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold text-stone-900">
                    Scannable QR Batch Codes & Print Sheet
                  </h2>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Every QR code below encodes the live URL for that product’s mobile transparency
                    profile. Scan with your phone or click “Open QR Trust Page”.
                  </p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print QR Sticker Sheet</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {products.map((prod) => {
                  const qrUrl = `${window.location.origin}${window.location.pathname}?product=${prod.id}`;
                  return (
                    <div
                      key={prod.id}
                      className="bg-white border border-stone-200/90 rounded-[22px] p-5 flex flex-col items-center text-center justify-between space-y-4"
                    >
                      <div className="space-y-1">
                        <div className="text-[11px] font-mono text-emerald-800 font-bold">
                          {brand.brandName.toUpperCase()}
                        </div>
                        <h3 className="text-sm font-bold text-stone-900">{prod.name}</h3>
                        <div className="text-xs font-mono text-stone-500">
                          Batch: {prod.batchNumber}
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded-2xl border-2 border-stone-900 shadow-xs">
                        <QRCodeSVG value={qrUrl} size={132} bgColor="#FFFFFF" fgColor="#141816" />
                      </div>

                      <div className="w-full space-y-2">
                        <div className="text-xs font-mono text-stone-600 tabular-nums">
                          {prod.qrScans.toLocaleString()} scans recorded
                        </div>
                        <button
                          onClick={() => onOpenQRProfile(prod.id)}
                          className="w-full py-2 px-3 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl transition-colors"
                        >
                          Open QR Trust Page
                        </button>
                        <button
                          onClick={() => onIncrementScan(prod.id)}
                          className="w-full py-1.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-colors"
                        >
                          +1 Simulate Scan
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'quality-documents' && (
            <div className="space-y-6">
              <div className="bg-white border border-stone-200/90 rounded-[22px] p-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-bold text-stone-900">
                    Quality & Compliance Document Vault
                  </h2>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Upload FSSAI registrations, lab microbial reports, and material certificates.
                    Only Platform Admin can approve records as “Verified by Admin”.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={onOpenAdminPanel}
                    className="px-3.5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
                  >
                    Open Admin Review Queue
                  </button>
                  <button
                    onClick={() => setIsDocModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Document</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {documents.map((doc) => {
                  const prod = products.find((p) => p.id === doc.productId);
                  return (
                    <div
                      key={doc.id}
                      className="bg-white border border-stone-200/90 rounded-[20px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                          <span className="font-semibold text-stone-800">{doc.type}</span>
                          <span>·</span>
                          <span className="font-mono">{doc.referenceNumber}</span>
                          <span>·</span>
                          <span>
                            Linked to: <strong className="text-stone-800">{prod?.name}</strong>
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-stone-900">{doc.title}</h3>
                        <div className="text-xs font-mono text-stone-500 tabular-nums">
                          File: {doc.fileName} ({doc.fileSize}) · Issue: {doc.issueDate} · Expiry:{' '}
                          {doc.expiryDate}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 shrink-0">
                        {renderDocStatus(doc.status)}
                        <button
                          onClick={() => setPreviewDoc(doc)}
                          className="px-3 py-1.5 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                        >
                          Preview
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'customer-reviews' && (
            <div className="space-y-6">
              <div className="bg-white border border-stone-200/90 rounded-[22px] p-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-stone-500">
                    Customer Feedback & Moderation · Database Backed
                  </div>
                  <h2 className="font-display text-2xl font-bold text-stone-900 mt-0.5">
                    Customer Reviews ({reviews.length}) · Average {avgRating} ★
                  </h2>
                  <p className="text-xs text-stone-600 mt-1">
                    “Verified Purchase” appears strictly when a review includes a valid matching
                    order record ID.
                  </p>
                </div>

                <select
                  value={reviewFilterProduct}
                  onChange={(e) => setReviewFilterProduct(e.target.value)}
                  className="px-3.5 py-2 text-xs font-semibold bg-stone-50 border border-stone-200 rounded-xl"
                >
                  <option value="ALL">All Products ({reviews.length})</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                {reviews
                  .filter(
                    (r) => reviewFilterProduct === 'ALL' || r.productId === reviewFilterProduct
                  )
                  .map((rev) => {
                    const prod = products.find((p) => p.id === rev.productId);
                    return (
                      <div
                        key={rev.id}
                        className="bg-white border border-stone-200/90 rounded-[20px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <strong className="text-stone-900">{rev.customerName}</strong>
                            <span className="text-stone-400">·</span>
                            <span className="text-stone-600">{rev.customerLocation}</span>
                            <span className="text-stone-400">·</span>
                            <span className="font-mono font-bold text-amber-600">
                              {rev.rating}.0 ★
                            </span>
                            <span className="text-stone-400">·</span>
                            <span className="text-stone-700 font-medium">{prod?.name}</span>
                            {rev.isVerifiedPurchase ? (
                              <>
                                <span className="text-stone-400">·</span>
                                <span className="inline-flex items-center gap-1 text-emerald-800 font-semibold">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Verified Purchase ({rev.orderId})</span>
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="text-stone-400">·</span>
                                <span className="text-stone-500">Unverified Order</span>
                              </>
                            )}
                            {rev.isSampleData && (
                              <>
                                <span className="text-stone-400">·</span>
                                <span className="text-stone-400 italic">Demo Review</span>
                              </>
                            )}
                          </div>
                          <p className="text-sm text-stone-700 leading-relaxed">{rev.comment}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs font-mono text-stone-500">
                            {rev.moderationStatus}
                          </span>
                          <button
                            onClick={() =>
                              onModerateReview(
                                rev.id,
                                rev.moderationStatus === 'Published' ? 'Hidden' : 'Published'
                              )
                            }
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg"
                          >
                            {rev.moderationStatus === 'Published' ? (
                              <>
                                <EyeOff className="w-3.5 h-3.5" />
                                <span>Hide</span>
                              </>
                            ) : (
                              <>
                                <span>Publish</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-white border border-stone-200/90 rounded-[22px] p-6">
                <h2 className="font-display text-2xl font-bold text-stone-900">
                  QR Scan & Transparency Engagement Analytics
                </h2>
                <p className="text-xs text-stone-600 mt-0.5">
                  Backend-synced telemetry showing how shoppers interact with Village Harvest QR
                  packaging labels across batches.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-stone-200/90 rounded-[22px] p-6 space-y-4">
                  <h3 className="font-display text-lg font-bold text-stone-900">
                    Scans by Product Batch
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={products.map((p) => ({
                          name: p.name.split(' ').slice(0, 2).join(' '),
                          scans: p.qrScans,
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" />
                        <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#57534E' }} />
                        <YAxis tick={{ fontSize: 11, fill: '#57534E' }} />
                        <Tooltip />
                        <Bar dataKey="scans" name="QR Scans" fill="#065F46" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white border border-stone-200/90 rounded-[22px] p-6 space-y-4">
                  <h3 className="font-display text-lg font-bold text-stone-900">
                    Daily Scan Trend (Last 10 Days)
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={scanAnalytics}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" />
                        <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#57534E' }} />
                        <YAxis tick={{ fontSize: 11, fill: '#57534E' }} />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="scans"
                          stroke="#065F46"
                          fill="#065F46"
                          fillOpacity={0.18}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white border border-stone-200/90 rounded-[22px] p-6 space-y-5">
                <div>
                  <h2 className="font-display text-2xl font-bold text-stone-900">
                    Seller Account & Contact Settings
                  </h2>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Update your public seller contact details displayed on all QR Product Trust
                    Pages.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Brand / Collective Name
                    </label>
                    <input
                      type="text"
                      value={brand.brandName}
                      onChange={(e) => onUpdateBrand({ ...brand, brandName: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Origin Location
                    </label>
                    <input
                      type="text"
                      value={brand.originLocation}
                      onChange={(e) => onUpdateBrand({ ...brand, originLocation: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Customer Support Phone
                    </label>
                    <input
                      type="text"
                      value={brand.contactPhone}
                      onChange={(e) => onUpdateBrand({ ...brand, contactPhone: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs font-mono bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Support Email
                    </label>
                    <input
                      type="email"
                      value={brand.contactEmail}
                      onChange={(e) => onUpdateBrand({ ...brand, contactEmail: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>
                </div>

                <button
                  onClick={() =>
                    onNotify(
                      'Seller Profile Saved',
                      'Updated contact details synced to database and QR pages.',
                      'success'
                    )
                  }
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl"
                >
                  Save Profile Changes
                </button>
              </div>

              <div className="bg-white border border-stone-200/90 rounded-[22px] p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                  <Database className="w-4 h-4" />
                  <span>Full-Stack Architecture & Persistence Status</span>
                </div>
                <h3 className="font-display text-lg font-bold text-stone-900">
                  Express Backend Active (Data Persisted to disk in /data/database.json)
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed max-w-3xl">
                  Your application is now backed by a complete Express API router running on{' '}
                  <code className="font-mono bg-stone-100 px-1.5 py-0.5 rounded">/api/*</code>.
                  Products, quality documents, reviews, brand customizer styles, and scan telemetry
                  are saved to server storage and synced with your frontend in real time.
                </p>

                <div className="pt-2">
                  <button
                    onClick={onResetDemoData}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-red-800 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Demo Data to Factory Defaults</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[24px] max-w-xl w-full p-6 sm:p-8 border border-stone-200 shadow-2xl my-8 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <h3 className="font-display text-xl font-bold text-stone-900">
                  {editingProduct ? `Edit ${editingProduct.name}` : 'Add New Product & Generate QR'}
                </h3>
                <p className="text-xs text-stone-500">
                  Saving generates a unique scannable QR code linked to this product’s public page
                </p>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProductFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    placeholder="e.g. Homemade Lemon Chilli Pickle"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category *</label>
                  <input
                    type="text"
                    required
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Batch Number *</label>
                  <input
                    type="text"
                    required
                    value={prodBatch}
                    onChange={(e) => setProdBatch(e.target.value)}
                    className="w-full px-3 py-2 font-mono bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    className="w-full px-3 py-2 font-mono bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Mfg Date *</label>
                  <input
                    type="date"
                    required
                    value={prodMfgDate}
                    onChange={(e) => setProdMfgDate(e.target.value)}
                    className="w-full px-2.5 py-2 font-mono bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={prodExpDate}
                    onChange={(e) => setProdExpDate(e.target.value)}
                    className="w-full px-2.5 py-2 font-mono bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Product Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  placeholder="Describe how this product is crafted, cured, or harvested..."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Ingredients / Materials (Comma-separated) *
                </label>
                <input
                  type="text"
                  required
                  value={prodIngredients}
                  onChange={(e) => setProdIngredients(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Studio Packaging Artwork Preset
                  </label>
                  <select
                    value={prodPreset}
                    onChange={(e) =>
                      setProdPreset(e.target.value as Product['artworkPreset'])
                    }
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg"
                  >
                    <option value="custom">Custom Brand Jar Mockup</option>
                    <option value="mango-pickle">Artisanal Glass Pickle Jar</option>
                    <option value="wild-honey">Golden Forest Honey Jar</option>
                    <option value="lakadong-turmeric">Amber Spice Apothecary Jar</option>
                    <option value="mustard-oil">Emerald Cold-Pressed Oil Bottle</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Or Upload Custom Product Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileUpload}
                    className="w-full text-xs text-stone-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-800"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 text-stone-600 hover:text-stone-900 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-xl transition-colors"
                >
                  {editingProduct ? 'Save Product Changes' : 'Save & Generate QR Code'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {qrModalProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-md w-full p-6 text-center space-y-5 border border-stone-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <span className="text-xs font-mono font-bold text-emerald-800">
                SMARTBRAND QR GENERATED
              </span>
              <button
                onClick={() => setQrModalProduct(null)}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="font-display text-xl font-bold text-stone-900">
                {qrModalProduct.name}
              </h3>
              <p className="text-xs font-mono text-stone-500">
                Batch #{qrModalProduct.batchNumber} · {qrModalProduct.businessName}
              </p>
            </div>

            <div className="inline-block p-4 bg-white rounded-2xl border-2 border-stone-900 shadow-sm">
              <QRCodeSVG
                value={`${window.location.origin}${window.location.pathname}?product=${qrModalProduct.id}`}
                size={168}
              />
            </div>

            <p className="text-xs text-stone-600 max-w-xs mx-auto">
              Scan this QR code with a smartphone camera or click below to open the live public
              product transparency profile.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  const id = qrModalProduct.id;
                  setQrModalProduct(null);
                  onOpenQRProfile(id);
                }}
                className="flex-1 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl transition-colors"
              >
                Open Public QR Profile
              </button>
              <button
                onClick={() => setQrModalProduct(null)}
                className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isDocModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-lg w-full p-6 sm:p-8 border border-stone-200 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <h3 className="font-display text-xl font-bold text-stone-900">
                  Upload Quality or Registration Record
                </h3>
                <p className="text-xs text-stone-500">
                  Uploaded documents enter “Pending Review” until verified by Platform Admin
                </p>
              </div>
              <button
                onClick={() => setIsDocModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDocumentUploadSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  placeholder="e.g. Batch #VH-MP-2609 Pesticide Residue Test Report"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Document Type</label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value as DocumentType)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg"
                  >
                    {DOCUMENT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Linked Product</label>
                  <select
                    value={docProductId}
                    onChange={(e) => setDocProductId(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.batchNumber})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Ref Number</label>
                  <input
                    type="text"
                    value={docRefNumber}
                    onChange={(e) => setDocRefNumber(e.target.value)}
                    className="w-full px-2.5 py-2 font-mono bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Issue Date</label>
                  <input
                    type="date"
                    value={docIssueDate}
                    onChange={(e) => setDocIssueDate(e.target.value)}
                    className="w-full px-2.5 py-2 font-mono bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={docExpiryDate}
                    onChange={(e) => setDocExpiryDate(e.target.value)}
                    className="w-full px-2.5 py-2 font-mono bg-stone-50 border border-stone-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Select PDF or Image File
                </label>
                <input
                  type="file"
                  accept=".pdf,image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setDocFileName(f.name);
                  }}
                  className="w-full text-xs text-stone-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Key Test Highlights (One per line)
                </label>
                <textarea
                  rows={2}
                  value={docSummaryText}
                  onChange={(e) => setDocSummaryText(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsDocModalOpen(false)}
                  className="px-4 py-2 text-stone-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-xl"
                >
                  Upload & Submit for Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-lg w-full p-6 border border-stone-200 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-stone-200 pb-3">
              <div>
                <div className="text-xs font-mono text-stone-500">{previewDoc.referenceNumber}</div>
                <h3 className="font-display text-lg font-bold text-stone-900 mt-0.5">
                  {previewDoc.title}
                </h3>
              </div>
              {renderDocStatus(previewDoc.status)}
            </div>

            <div className="space-y-2 text-xs text-stone-700">
              <div>
                <strong>Document Type:</strong> {previewDoc.type}
              </div>
              <div>
                <strong>File Name:</strong> <span className="font-mono">{previewDoc.fileName}</span>
              </div>
              <div>
                <strong>Validity:</strong> {previewDoc.issueDate} to {previewDoc.expiryDate}
              </div>
              <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-stone-200 space-y-1 mt-2">
                {previewDoc.summaryPoints.map((pt, i) => (
                  <div key={i}>• {pt}</div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
