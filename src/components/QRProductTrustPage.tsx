import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileCheck2,
  FileText,
  Info,
  MapPin,
  Phone,
  Mail,
  QrCode,
  ShieldAlert,
  Smartphone,
  Monitor,
  Star,
  Sparkles,
  Download,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import {
  BrandIdentity,
  CustomerReview,
  DocumentVerificationStatus,
  Product,
  QualityDocument,
  VerifiedOrderRecord,
} from '../types/smartbrand';
import { ProductImage } from '../utils/productArtwork';
import { SupportedLanguage, getTranslation } from '../utils/i18n';
import { ThemeToggle, LanguageSelector } from './ThemeAndLangControls';

interface QRProductTrustPageProps {
  product: Product;
  allProducts: Product[];
  brand: BrandIdentity;
  documents: QualityDocument[];
  reviews: CustomerReview[];
  verifiedOrders: VerifiedOrderRecord[];
  onSelectProduct: (productId: string) => void;
  onAddReview: (review: Omit<CustomerReview, 'id' | 'date' | 'isVerifiedPurchase' | 'moderationStatus' | 'isSampleData'>, orderIdInput: string) => boolean;
  onBackToDashboard: () => void;
  onBackToLanding: () => void;
  onOpenBrandStudio: () => void;
  onIncrementScan: (productId: string) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
  currentLang?: SupportedLanguage;
  onSelectLang?: (lang: SupportedLanguage) => void;
}

export const QRProductTrustPage: React.FC<QRProductTrustPageProps> = ({
  product,
  allProducts,
  brand,
  documents,
  reviews,
  verifiedOrders,
  onSelectProduct,
  onAddReview,
  onBackToDashboard,
  onBackToLanding,
  onOpenBrandStudio,
  onIncrementScan,
  isDark = false,
  onToggleTheme = () => {},
  currentLang = 'en',
  onSelectLang = () => {},
}) => {
  const [viewMode, setViewMode] = useState<'mobile-frame' | 'full-width'>('full-width');
  const [selectedDocModal, setSelectedDocModal] = useState<QualityDocument | null>(null);
  const [copiedBatch, setCopiedBatch] = useState(false);

  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerLocation, setReviewerLocation] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [orderIdInput, setOrderIdInput] = useState('');
  const [formError, setFormError] = useState('');

  const productDocs = documents.filter((d) => d.productId === product.id);
  const productReviews = reviews.filter(
    (r) => r.productId === product.id && r.moderationStatus === 'Published'
  );

  const avgRating =
    productReviews.length > 0
      ? (
          productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length
        ).toFixed(1)
      : 'New';

  const getOverallDocStatus = (): {
    label: string;
    tone: 'verified' | 'pending' | 'uploaded' | 'none';
    detail: string;
  } => {
    if (productDocs.length === 0) {
      return {
        label: 'Not submitted',
        tone: 'none',
        detail: 'No quality documents have been uploaded for this product batch yet.',
      };
    }
    const verifiedCount = productDocs.filter((d) => d.status === 'Verified by Admin').length;
    const pendingCount = productDocs.filter((d) => d.status === 'Pending Review').length;

    if (verifiedCount === productDocs.length) {
      return {
        label: `Verified (${verifiedCount}/${productDocs.length} records reviewed by Admin)`,
        tone: 'verified',
        detail: 'All uploaded batch and registration records have been reviewed by SmartBrand Admin.',
      };
    }
    if (verifiedCount > 0) {
      return {
        label: `Verified (${verifiedCount} reviewed · ${productDocs.length - verifiedCount} pending)`,
        tone: 'verified',
        detail: `${verifiedCount} record(s) verified by Admin; ${
          productDocs.length - verifiedCount
        } additional record(s) awaiting review.`,
      };
    }
    if (pendingCount > 0) {
      return {
        label: 'Pending Review',
        tone: 'pending',
        detail: 'Seller has uploaded supporting records; awaiting SmartBrand Admin review.',
      };
    }
    return {
      label: 'Uploaded (Unverified)',
      tone: 'uploaded',
      detail: 'Documents uploaded by seller; not yet queued or verified by Admin.',
    };
  };

  const overallDocStatus = getOverallDocStatus();
  const publicShareUrl = `${window.location.origin}${window.location.pathname}?product=${product.id}`;

  const handleCopyBatch = () => {
    navigator.clipboard?.writeText(product.batchNumber);
    setCopiedBatch(true);
    setTimeout(() => setCopiedBatch(false), 1800);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) {
      setFormError('Please enter your name and review feedback.');
      return;
    }
    setFormError('');
    onAddReview(
      {
        productId: product.id,
        customerName: reviewerName.trim(),
        customerLocation: reviewerLocation.trim() || 'India',
        rating: reviewRating,
        comment: reviewComment.trim(),
      },
      orderIdInput.trim()
    );
    setReviewerName('');
    setReviewerLocation('');
    setReviewComment('');
    setOrderIdInput('');
    setShowReviewForm(false);
  };

  const handleDownloadDocumentSummary = (doc: QualityDocument) => {
    const content = [
      `SMARTBRAND QUALITY DOCUMENT RECORD SUMMARY`,
      `==========================================`,
      `Document Title: ${doc.title}`,
      `Document Type: ${doc.type}`,
      `Reference Number: ${doc.referenceNumber}`,
      `Product: ${product.name} (Batch: ${product.batchNumber})`,
      `Seller: ${product.businessName}`,
      `Issue Date: ${doc.issueDate}`,
      `Expiry Date: ${doc.expiryDate}`,
      `Platform Verification State: ${doc.status}`,
      ``,
      `KEY RECORD HIGHLIGHTS:`,
      ...doc.summaryPoints.map((pt, i) => `${i + 1}. ${pt}`),
      ``,
      `IMPORTANT TRANSPARENCY NOTICE:`,
      `This summary reflects records uploaded by the seller on SmartBrand.`,
      `A QR scan or admin document review does not replace statutory government inspection.`,
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.referenceNumber.toLowerCase()}_summary.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderDocStatusLine = (status: DocumentVerificationStatus) => {
    if (status === 'Verified by Admin') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Verified by Admin</span>
        </span>
      );
    }
    if (status === 'Pending Review') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800">
          <Clock className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Pending Review</span>
        </span>
      );
    }
    if (status === 'Revision Requested') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-800">
          <ShieldAlert className="w-4 h-4 text-red-700 shrink-0" />
          <span>Revision Requested</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700">
        <FileText className="w-4 h-4 text-stone-600 shrink-0" />
        <span>Uploaded</span>
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#141816] pb-20">
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-stone-200/90 px-4 sm:px-8 py-3">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToDashboard}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200/80 rounded-lg transition-colors whitespace-nowrap"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Seller Dashboard</span>
            </button>
            <button
              onClick={onBackToLanding}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors whitespace-nowrap"
            >
              <span>Landing Page</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="qr-product-select" className="text-xs text-stone-500 hidden md:inline">
              Viewing QR Profile:
            </label>
            <select
              id="qr-product-select"
              value={product.id}
              onChange={(e) => onSelectProduct(e.target.value)}
              className="text-xs font-semibold bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              {allProducts.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.batchNumber})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSelector currentLang={currentLang} onSelectLang={onSelectLang} isDark={isDark} />
            <ThemeToggle isDark={isDark} onToggleTheme={onToggleTheme} />

            <div className="hidden sm:flex items-center p-0.5 bg-stone-100 rounded-lg border border-stone-200/70">
              <button
                onClick={() => setViewMode('full-width')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  viewMode === 'full-width'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Responsive View</span>
              </button>
              <button
                onClick={() => setViewMode('mobile-frame')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  viewMode === 'mobile-frame'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Phone Scan Frame</span>
              </button>
            </div>

            <button
              onClick={onOpenBrandStudio}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Open Brand Studio</span>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mx-auto transition-all duration-200 ${
          viewMode === 'mobile-frame'
            ? 'max-w-[440px] my-8 bg-white rounded-[32px] border-[6px] border-stone-900 shadow-2xl overflow-hidden'
            : 'max-w-5xl px-4 sm:px-8 pt-8'
        }`}
      >
        <div className="bg-stone-100/90 border border-stone-200/90 rounded-2xl px-4 py-2.5 mb-6 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <QrCode className="w-4 h-4 text-emerald-800 shrink-0" />
            <span>
              <strong>Public QR Product Profile</strong> · Consumer-facing transparency view
              {product.isSampleData ? ' · Sample Demo Data' : ''}
            </span>
          </div>
          <button
            onClick={() => onIncrementScan(product.id)}
            className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-2 whitespace-nowrap"
          >
            Simulate +1 Customer QR Scan ({product.qrScans.toLocaleString()} total)
          </button>
        </div>

        <div className="bg-white border border-stone-200/90 rounded-[22px] p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center text-white shrink-0 shadow-xs"
                style={{ backgroundColor: brand.primaryColor }}
              >
                <span className="font-display text-lg font-bold tracking-tight leading-none">
                  {brand.brandName
                    .split(' ')
                    .map((w) => w[0])
                    .join('')
                    .slice(0, 2)}
                </span>
                <span className="text-[9px] font-mono opacity-80 mt-0.5">EST {brand.foundedYear}</span>
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span>{brand.brandName}</span>
                  <span aria-hidden="true">·</span>
                  <span>{brand.originLocation}</span>
                </div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mt-0.5">
                  {product.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 mt-1">
                  <span>{product.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">Net Wt: {product.netWeight}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono font-semibold text-stone-900 tabular-nums">
                    MRP ₹{product.priceInr}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#FAF9F5] border border-stone-200/90 rounded-xl p-3 self-start sm:self-auto">
              <div className="bg-white p-1.5 rounded-lg border border-stone-200">
                <QRCodeSVG
                  value={publicShareUrl}
                  size={56}
                  bgColor="#FFFFFF"
                  fgColor="#141816"
                  level="M"
                />
              </div>
              <div className="text-xs">
                <div className="font-mono font-semibold text-stone-900 tabular-nums">
                  {product.batchNumber}
                </div>
                <div className="text-stone-500 mt-0.5">Scannable Product QR</div>
                <button
                  onClick={handleCopyBatch}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 mt-1"
                >
                  {copiedBatch ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Copied Batch ID</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Batch ID</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div
            className={`grid grid-cols-1 ${
              viewMode === 'mobile-frame' ? '' : 'lg:grid-cols-12'
            } gap-8 pt-6 items-start`}
          >
            <div className={viewMode === 'mobile-frame' ? '' : 'lg:col-span-5'}>
              <div className="aspect-4/3 rounded-[18px] overflow-hidden border border-stone-200/80 bg-stone-100">
                <ProductImage
                  src={product.imageUrl}
                  alt={product.name}
                  title={product.name}
                  category={product.category}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-stone-600 leading-relaxed mt-4">{product.description}</p>
            </div>

            <div className={`${viewMode === 'mobile-frame' ? '' : 'lg:col-span-7'} space-y-5`}>
              <div className="bg-[#FAF9F5] border border-stone-200 rounded-[18px] p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-semibold text-emerald-900">
                      SmartBrand Transparency Record
                    </span>
                    <h2 className="text-base font-bold text-stone-900 mt-0.5">
                      Product information available
                    </h2>
                  </div>
                  <FileCheck2 className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                </div>

                <div className="mt-4 pt-3 border-t border-stone-200/80 space-y-2 text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-stone-600">Document status:</span>
                    <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                      {overallDocStatus.tone === 'verified' && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      )}
                      {overallDocStatus.tone === 'pending' && (
                        <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                      )}
                      {overallDocStatus.tone === 'none' && (
                        <Info className="w-4 h-4 text-stone-500 shrink-0" />
                      )}
                      <span>{overallDocStatus.label}</span>
                    </span>
                  </div>
                  <p className="text-xs text-stone-600">{overallDocStatus.detail}</p>
                </div>

                <div className="mt-4 p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/90 text-xs text-amber-950 leading-relaxed flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold">Important Authenticity Distinction:</strong> A
                    QR scan displays product details and quality records uploaded by the seller.{' '}
                    <span className="underline decoration-amber-700/60">
                      A QR scan alone does not prove physical product authenticity or statutory
                      government certification.
                    </span>{' '}
                    Always verify that the physical jar seal and printed batch number (
                    <span className="font-mono font-semibold">{product.batchNumber}</span>) match
                    this page.
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
                  <div className="text-[11px] text-stone-500">Batch Number</div>
                  <div className="font-mono text-sm font-semibold text-stone-900 mt-1 tabular-nums">
                    {product.batchNumber}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
                  <div className="text-[11px] text-stone-500">Manufactured</div>
                  <div className="font-mono text-sm font-semibold text-stone-900 mt-1 tabular-nums">
                    {product.manufacturingDate}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
                  <div className="text-[11px] text-stone-500">Best Before</div>
                  <div className="font-mono text-sm font-semibold text-stone-900 mt-1 tabular-nums">
                    {product.expiryDate || 'N/A'}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
                  <div className="text-[11px] text-stone-500">Customer Rating</div>
                  <div className="font-mono text-sm font-semibold text-stone-900 mt-1 tabular-nums flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{avgRating}</span>
                    <span className="text-xs text-stone-500 font-normal">
                      ({productReviews.length})
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-[18px] bg-stone-50/70 border border-stone-200/80">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <h3 className="text-sm font-bold text-stone-900">
                    Ingredients & Material Transparency
                  </h3>
                  <span className="text-xs text-stone-500">
                    Origin: <strong className="text-stone-800">{product.sourcingOrigin}</strong>
                  </span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                  {product.ingredientsOrMaterials.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-800 font-mono font-bold">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {product.storageInstructions && (
                  <div className="mt-3 pt-3 border-t border-stone-200/70 text-xs text-stone-600">
                    <strong className="text-stone-800">Storage Care:</strong>{' '}
                    {product.storageInstructions}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`grid grid-cols-1 ${
            viewMode === 'mobile-frame' ? '' : 'lg:grid-cols-12'
          } gap-6 mb-6`}
        >
          <div
            className={`${
              viewMode === 'mobile-frame' ? '' : 'lg:col-span-7'
            } bg-white border border-stone-200/90 rounded-[22px] p-6`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <h2 className="font-display text-xl font-bold text-stone-900">
                  Quality & Compliance Records
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Each record shows its exact review status on SmartBrand
                </p>
              </div>
              <span className="text-xs font-mono text-stone-600 tabular-nums">
                {productDocs.length} record(s) linked
              </span>
            </div>

            {productDocs.length === 0 ? (
              <div className="p-8 rounded-2xl bg-stone-50 border border-stone-200/80 text-center">
                <FileText className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-stone-800">
                  No Quality Documents Submitted Yet
                </p>
                <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                  The seller has not attached lab reports or registration documents to this product
                  yet.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {productDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-2xl bg-[#FAF9F5] border border-stone-200/90 hover:border-stone-300 transition-colors"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-stone-500">
                          <span>{doc.type}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono">{doc.referenceNumber}</span>
                        </div>
                        <h3 className="text-sm font-bold text-stone-900 mt-1">{doc.title}</h3>
                      </div>
                      {renderDocStatusLine(doc.status)}
                    </div>

                    <ul className="mt-3 space-y-1 text-xs text-stone-600">
                      {doc.summaryPoints.map((pt, i) => (
                        <li key={i}>• {pt}</li>
                      ))}
                    </ul>

                    <div className="mt-3 pt-3 border-t border-stone-200/70 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
                      <div className="font-mono tabular-nums">
                        Issued: {doc.issueDate} · Valid till: {doc.expiryDate}
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setSelectedDocModal(doc)}
                          className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:text-emerald-950"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Preview Record</span>
                        </button>
                        <button
                          onClick={() => handleDownloadDocumentSummary(doc)}
                          className="inline-flex items-center gap-1 font-semibold text-stone-700 hover:text-stone-950"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            className={`${
              viewMode === 'mobile-frame' ? '' : 'lg:col-span-5'
            } bg-white border border-stone-200/90 rounded-[22px] p-6 flex flex-col justify-between space-y-6`}
          >
            <div>
              <span className="text-xs font-semibold text-emerald-800">Producer Story</span>
              <h2 className="font-display text-xl font-bold text-stone-900 mt-0.5">
                About {brand.brandName}
              </h2>
              <p className="text-xs font-medium text-stone-500 mt-0.5">{brand.tagline}</p>
              <p className="text-sm text-stone-700 leading-relaxed mt-3">{brand.story}</p>
            </div>

            <div className="pt-5 border-t border-stone-200/80 space-y-3">
              <h3 className="text-xs font-bold text-stone-900">
                Seller & Producer Contact Information
              </h3>
              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-stone-900">{product.businessName}</strong> —{' '}
                    {product.businessLocation}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span className="font-mono">{product.sellerContactPhone}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-emerald-800 shrink-0" />
                  <span>{product.sellerContactEmail}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-stone-200/90 rounded-[22px] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200/80">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span>Customer Feedback</span>
                <span aria-hidden="true">·</span>
                <span>Sample Demo Reviews Included</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
                Buyer Reviews & Batch Feedback ({productReviews.length})
              </h2>
            </div>

            <button
              onClick={() => setShowReviewForm((prev) => !prev)}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors whitespace-nowrap"
            >
              {showReviewForm ? 'Cancel Review' : 'Write a Customer Review'}
            </button>
          </div>

          {showReviewForm && (
            <form
              onSubmit={handleReviewSubmit}
              className="my-6 p-5 rounded-2xl bg-[#FAF9F5] border border-stone-200 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-stone-900">
                  Submit Feedback for {product.name}
                </h3>
                <span className="text-xs text-stone-500">
                  Verified Purchase status requires a matching Order ID
                </span>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 font-medium">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    City / State
                  </label>
                  <input
                    type="text"
                    value={reviewerLocation}
                    onChange={(e) => setReviewerLocation(e.target.value)}
                    placeholder="e.g. Nashik, Maharashtra"
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Order ID (Optional for Verified Purchase)
                  </label>
                  <input
                    type="text"
                    value={orderIdInput}
                    onChange={(e) => setOrderIdInput(e.target.value)}
                    placeholder="Try ORD-VH-2026"
                    className="w-full px-3 py-2 text-xs font-mono bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                  <span className="block text-[11px] text-stone-500 mt-1">
                    Demo valid order IDs:{' '}
                    {verifiedOrders
                      .filter((o) => o.productId === product.id)
                      .map((o) => o.orderId)
                      .join(', ') || 'ORD-VH-2026'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Star Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="p-1.5 rounded-lg hover:bg-stone-200/60 transition-colors"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= reviewRating
                            ? 'fill-amber-500 text-amber-500'
                            : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-mono font-semibold text-stone-700 ml-2">
                    {reviewRating}.0 / 5.0
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Your Review *
                </label>
                <textarea
                  rows={3}
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your experience with the packaging, taste, or batch transparency..."
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors"
                >
                  Publish Review
                </button>
              </div>
            </form>
          )}

          <div className="divide-y divide-stone-200/80 mt-2">
            {productReviews.map((rev) => (
              <div key={rev.id} className="py-5 first:pt-4 last:pb-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-stone-900">{rev.customerName}</span>
                    <span className="text-xs text-stone-400" aria-hidden="true">
                      ·
                    </span>
                    <span className="text-xs text-stone-600">{rev.customerLocation}</span>
                    {rev.isVerifiedPurchase ? (
                      <>
                        <span className="text-xs text-stone-400" aria-hidden="true">
                          ·
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Verified Purchase ({rev.orderId})</span>
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-xs text-stone-400" aria-hidden="true">
                          ·
                        </span>
                        <span className="text-xs text-stone-500">
                          Public QR Reviewer (Unverified Order)
                        </span>
                      </>
                    )}
                    {rev.isSampleData && (
                      <>
                        <span className="text-xs text-stone-400" aria-hidden="true">
                          ·
                        </span>
                        <span className="text-xs text-stone-500 italic">Demo Review</span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating
                              ? 'fill-amber-500 text-amber-500'
                              : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-mono text-stone-500 tabular-nums">
                      {rev.date}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-stone-700 leading-relaxed mt-2">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedDocModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-lg w-full p-6 border border-stone-200 shadow-xl space-y-4">
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <div className="text-xs font-mono text-stone-500">
                  {selectedDocModal.referenceNumber}
                </div>
                <h3 className="font-display text-lg font-bold text-stone-900 mt-0.5">
                  {selectedDocModal.title}
                </h3>
              </div>
              {renderDocStatusLine(selectedDocModal.status)}
            </div>

            <div className="space-y-3 text-xs text-stone-700">
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
                <div>
                  <span className="text-stone-500 block">Document Type</span>
                  <strong className="text-stone-900">{selectedDocModal.type}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">File Attached</span>
                  <strong className="text-stone-900 font-mono">
                    {selectedDocModal.fileName} ({selectedDocModal.fileSize})
                  </strong>
                </div>
                <div>
                  <span className="text-stone-500 block">Issue Date</span>
                  <strong className="text-stone-900 font-mono">{selectedDocModal.issueDate}</strong>
                </div>
                <div>
                  <span className="text-stone-500 block">Valid Until</span>
                  <strong className="text-stone-900 font-mono">
                    {selectedDocModal.expiryDate}
                  </strong>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 mb-1.5">Extracted Key Parameters:</h4>
                <ul className="space-y-1.5 bg-[#FAF9F5] p-3.5 rounded-xl border border-stone-200/80">
                  {selectedDocModal.summaryPoints.map((pt, i) => (
                    <li key={i}>• {pt}</li>
                  ))}
                </ul>
              </div>

              {selectedDocModal.adminNotes && (
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950">
                  <strong>Admin Review Log:</strong> {selectedDocModal.adminNotes}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
              <button
                onClick={() => handleDownloadDocumentSummary(selectedDocModal)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Summary (.txt)</span>
              </button>
              <button
                onClick={() => setSelectedDocModal(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
