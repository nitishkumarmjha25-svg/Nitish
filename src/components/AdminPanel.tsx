import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ShieldAlert,
  ArrowLeft,
  ExternalLink,
  Search,
  Eye,
  EyeOff,
  Trash2,
  LogOut,
} from 'lucide-react';
import {
  CustomerReview,
  DocumentVerificationStatus,
  Product,
  QualityDocument,
  SellerAccount,
} from '../types/smartbrand';
import { SupportedLanguage, getTranslation } from '../utils/i18n';
import { ThemeToggle, LanguageSelector } from './ThemeAndLangControls';

interface AdminPanelProps {
  sellers: SellerAccount[];
  products: Product[];
  documents: QualityDocument[];
  reviews: CustomerReview[];
  onUpdateDocumentStatus: (
    docId: string,
    newStatus: DocumentVerificationStatus,
    adminNotes?: string
  ) => void;
  onUpdateSellerStatus: (sellerId: string, status: SellerAccount['status']) => void;
  onModerateReview: (reviewId: string, status: CustomerReview['moderationStatus']) => void;
  onDeleteReview: (reviewId: string) => void;
  onOpenQRProfile: (productId: string) => void;
  onBackToSellerDashboard: () => void;
  onBackToLanding: () => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
  currentLang?: SupportedLanguage;
  onSelectLang?: (lang: SupportedLanguage) => void;
  onLogout?: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  sellers,
  products,
  documents,
  reviews,
  onUpdateDocumentStatus,
  onUpdateSellerStatus,
  onModerateReview,
  onDeleteReview,
  onOpenQRProfile,
  onBackToSellerDashboard,
  onBackToLanding,
  isDark = false,
  onToggleTheme = () => {},
  currentLang = 'en',
  onSelectLang = () => {},
  onLogout = () => {},
}) => {
  const [activeTab, setActiveTab] = useState<'documents' | 'sellers' | 'products' | 'reviews'>(
    'documents'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [noteInputs, setNoteInputs] = useState<Record<string, string>>({});

  const t = (key: string) => getTranslation(currentLang, key);

  const pendingDocsCount = documents.filter(
    (d) => d.status === 'Pending Review' || d.status === 'Uploaded'
  ).length;
  const verifiedDocsCount = documents.filter((d) => d.status === 'Verified by Admin').length;

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#141816] pb-16">
      <header className="sticky top-0 z-30 bg-stone-950 text-stone-100 border-b border-stone-800 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-lg font-bold text-white">
              SmartBrand Admin Governance
            </span>
            <span className="text-xs text-stone-400 hidden sm:inline">
              · Backend Verified Document Queue & Review Moderation
            </span>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSelector currentLang={currentLang} onSelectLang={onSelectLang} isDark={true} />
            <ThemeToggle isDark={isDark} onToggleTheme={onToggleTheme} />

            <button
              onClick={onBackToSellerDashboard}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-200 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-lg transition-colors whitespace-nowrap"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Seller Studio</span>
            </button>
            <button
              onClick={onBackToLanding}
              className="px-3 py-1.5 text-xs font-medium text-stone-400 hover:text-white transition-colors whitespace-nowrap hidden sm:inline-block"
            >
              {t('home')}
            </button>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-red-300 hover:text-white bg-red-950/60 hover:bg-red-900 border border-red-800/60 rounded-lg transition-colors whitespace-nowrap"
              title="Logout as Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t('logout')}</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-6">
        <div className="bg-white border border-stone-200/90 rounded-[20px] p-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-800">
              Role-Restricted Verification Authority
            </div>
            <h1 className="font-display text-2xl font-bold text-stone-900 mt-0.5">
              Platform Trust & Quality Document Review Queue
            </h1>
            <p className="text-xs text-stone-600 mt-1">
              Only administrators can transition seller-uploaded documents to{' '}
              <strong>Verified by Admin</strong>. Status updates persist in the database and reflect
              immediately on public QR pages.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-stone-200/90 rounded-[20px] p-5">
            <div className="text-xs text-stone-500">Registered Sellers</div>
            <div className="font-mono text-2xl font-bold text-stone-900 mt-1 tabular-nums">
              {sellers.length}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              {sellers.filter((s) => s.status === 'Active').length} Active Accounts
            </div>
          </div>

          <div className="bg-white border border-stone-200/90 rounded-[20px] p-5">
            <div className="text-xs text-stone-500">Catalog Products</div>
            <div className="font-mono text-2xl font-bold text-stone-900 mt-1 tabular-nums">
              {products.length}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              {products.reduce((s, p) => s + p.qrScans, 0).toLocaleString()} Cumulative QR Scans
            </div>
          </div>

          <div className="bg-white border border-stone-200/90 rounded-[20px] p-5">
            <div className="text-xs text-stone-500">Document Review Queue</div>
            <div className="font-mono text-2xl font-bold text-amber-700 mt-1 tabular-nums">
              {pendingDocsCount} Pending
            </div>
            <div className="text-xs text-stone-500 mt-1">
              {verifiedDocsCount} Verified by Admin
            </div>
          </div>

          <div className="bg-white border border-stone-200/90 rounded-[20px] p-5">
            <div className="text-xs text-stone-500">Customer Reviews</div>
            <div className="font-mono text-2xl font-bold text-stone-900 mt-1 tabular-nums">
              {reviews.length}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              {reviews.filter((r) => r.isVerifiedPurchase).length} Order-Verified Reviews
            </div>
          </div>
        </div>

        <div className="bg-white border border-stone-200/90 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'documents'
                  ? 'bg-emerald-800 text-white'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Document Review Queue ({documents.length})
            </button>
            <button
              onClick={() => setActiveTab('sellers')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'sellers'
                  ? 'bg-emerald-800 text-white'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Seller Management ({sellers.length})
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'products'
                  ? 'bg-emerald-800 text-white'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Product Audit ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'bg-emerald-800 text-white'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              Review Moderation ({reviews.length})
            </button>
          </div>

          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter records..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>
        </div>

        {activeTab === 'documents' && (
          <div className="space-y-4">
            {documents
              .filter(
                (d) =>
                  d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  d.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  d.type.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((doc) => {
                const linkedProduct = products.find((p) => p.id === doc.productId);
                return (
                  <div
                    key={doc.id}
                    className="bg-white border border-stone-200/90 rounded-[20px] p-5 space-y-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                          <span className="font-semibold text-stone-800">{doc.type}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono">{doc.referenceNumber}</span>
                          <span aria-hidden="true">·</span>
                          <span>
                            Product:{' '}
                            <strong className="text-stone-800">
                              {linkedProduct?.name || 'Brand-Wide'}
                            </strong>
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-stone-900 mt-1">{doc.title}</h3>
                        <div className="text-xs font-mono text-stone-500 mt-1 tabular-nums">
                          File: {doc.fileName} ({doc.fileSize}) · Issued: {doc.issueDate} · Expires:{' '}
                          {doc.expiryDate}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone-500">Current Status:</span>
                        <span className="text-xs font-bold text-stone-900">{doc.status}</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-stone-200/80 text-xs text-stone-700 space-y-1">
                      {doc.summaryPoints.map((pt, i) => (
                        <div key={i}>• {pt}</div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-stone-200/70">
                      <input
                        type="text"
                        value={noteInputs[doc.id] ?? doc.adminNotes ?? ''}
                        onChange={(e) =>
                          setNoteInputs((prev) => ({ ...prev, [doc.id]: e.target.value }))
                        }
                        placeholder="Add admin verification note..."
                        className="flex-1 px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                      />

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() =>
                            onUpdateDocumentStatus(
                              doc.id,
                              'Verified by Admin',
                              noteInputs[doc.id] ||
                                doc.adminNotes ||
                                'Reviewed and verified by SmartBrand Admin.'
                            )
                          }
                          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                            doc.status === 'Verified by Admin'
                              ? 'bg-emerald-800 text-white'
                              : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Verify Document</span>
                        </button>

                        <button
                          onClick={() =>
                            onUpdateDocumentStatus(
                              doc.id,
                              'Pending Review',
                              noteInputs[doc.id] || 'Queued for secondary admin check.'
                            )
                          }
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                            doc.status === 'Pending Review'
                              ? 'bg-amber-700 text-white'
                              : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>Mark Pending</span>
                        </button>

                        <button
                          onClick={() =>
                            onUpdateDocumentStatus(
                              doc.id,
                              'Revision Requested',
                              noteInputs[doc.id] ||
                                'Batch number or expiry date requires clearer scan upload.'
                            )
                          }
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                            doc.status === 'Revision Requested'
                              ? 'bg-red-700 text-white'
                              : 'bg-red-50 text-red-900 hover:bg-red-100 border border-red-200'
                          }`}
                        >
                          <ShieldAlert className="w-3.5 h-3.5" />
                          <span>Request Revision</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {activeTab === 'sellers' && (
          <div className="bg-white border border-stone-200/90 rounded-[20px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50 text-xs font-semibold text-stone-600">
                    <th className="py-3.5 px-4">Seller Business</th>
                    <th className="py-3.5 px-4">Founder / Lead</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4 text-right">Products</th>
                    <th className="py-3.5 px-4">Account Status</th>
                    <th className="py-3.5 px-4 text-right">Governance Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200/80 text-xs">
                  {sellers.map((seller) => (
                    <tr key={seller.id} className="hover:bg-stone-50/80">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-stone-900">{seller.businessName}</div>
                        <div className="text-stone-500">{seller.category}</div>
                      </td>
                      <td className="py-3.5 px-4 text-stone-700">{seller.founderName}</td>
                      <td className="py-3.5 px-4 text-stone-600">{seller.location}</td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold">
                        {seller.productsCount}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-stone-900">{seller.status}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => onUpdateSellerStatus(seller.id, 'Active')}
                            className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-900 hover:bg-emerald-100 font-semibold"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => onUpdateSellerStatus(seller.id, 'Under Review')}
                            className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 hover:bg-stone-200 font-semibold"
                          >
                            Hold
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white border border-stone-200/90 rounded-[20px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50 text-xs font-semibold text-stone-600">
                    <th className="py-3.5 px-4">Product Name</th>
                    <th className="py-3.5 px-4">Batch ID</th>
                    <th className="py-3.5 px-4">Mfg / Expiry</th>
                    <th className="py-3.5 px-4 text-right">MRP</th>
                    <th className="py-3.5 px-4 text-right">QR Scans</th>
                    <th className="py-3.5 px-4 text-right">Public Profile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200/80 text-xs">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-stone-50/80">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-stone-900">{prod.name}</div>
                        <div className="text-stone-500">{prod.category}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-stone-800">
                        {prod.batchNumber}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-stone-600 tabular-nums">
                        {prod.manufacturingDate} → {prod.expiryDate}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-semibold tabular-nums">
                        ₹{prod.priceInr}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums">
                        {prod.qrScans.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => onOpenQRProfile(prod.id)}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-800 text-white font-semibold hover:bg-emerald-900"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Inspect QR Page</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-3">
            {reviews.map((rev) => {
              const prod = products.find((p) => p.id === rev.productId);
              return (
                <div
                  key={rev.id}
                  className="bg-white border border-stone-200/90 rounded-[20px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <strong className="text-stone-900">{rev.customerName}</strong>
                      <span className="text-stone-400">·</span>
                      <span className="text-stone-600">{rev.customerLocation}</span>
                      <span className="text-stone-400">·</span>
                      <span className="font-mono font-semibold text-amber-700">
                        {rev.rating}.0 ★
                      </span>
                      <span className="text-stone-400">·</span>
                      <span className="text-stone-600">
                        Product: <strong>{prod?.name}</strong>
                      </span>
                      {rev.isVerifiedPurchase && (
                        <>
                          <span className="text-stone-400">·</span>
                          <span className="text-emerald-800 font-semibold">
                            Verified Order ({rev.orderId})
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed">{rev.comment}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-mono text-stone-500 mr-2">
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
                          <Eye className="w-3.5 h-3.5" />
                          <span>Publish</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => onDeleteReview(rev.id)}
                      className="p-1.5 text-red-700 hover:bg-red-50 rounded-lg"
                      title="Delete review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
