import React, { useState, useEffect } from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import {
  ActiveWorkspace,
  BrandIdentity,
  CustomerReview,
  DocumentVerificationStatus,
  Product,
  QualityDocument,
  ScanAnalyticsPoint,
  SellerAccount,
  SellerSidebarTab,
  ToastMessage,
} from './types/smartbrand';
import {
  INITIAL_BRAND_IDENTITY,
  INITIAL_DOCUMENTS,
  INITIAL_PRODUCTS,
  INITIAL_REVIEWS,
  INITIAL_SCAN_ANALYTICS,
  INITIAL_SELLERS,
  VERIFIED_ORDER_RECORDS,
} from './data/initialData';
import { apiClient } from './services/api';
import { LandingPage } from './components/LandingPage';
import { SellerDashboard } from './components/SellerDashboard';
import { QRProductTrustPage } from './components/QRProductTrustPage';
import { AdminPanel } from './components/AdminPanel';
import { DemoTourBar, DEMO_TOUR_STEPS } from './components/DemoTourBar';
import { AuthModal } from './components/AuthModal';
import { SupportedLanguage } from './utils/i18n';

export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [documents, setDocuments] = useState<QualityDocument[]>(INITIAL_DOCUMENTS);
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [brand, setBrand] = useState<BrandIdentity>(INITIAL_BRAND_IDENTITY);
  const [sellers, setSellers] = useState<SellerAccount[]>(INITIAL_SELLERS);
  const [scanAnalytics, setScanAnalytics] = useState<ScanAnalyticsPoint[]>(INITIAL_SCAN_ANALYTICS);

  // Theme & Language State
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('smartbrand_theme') === 'dark';
  });
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(() => {
    return (localStorage.getItem('smartbrand_lang') as SupportedLanguage) || 'en';
  });

  // User Authentication & Session State
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    role: 'seller' | 'admin';
  } | null>({
    name: 'Village Harvest Collective',
    email: 'care@villageharvest.in',
    role: 'seller',
  });

  // Dark mode effect on root element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('smartbrand_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('smartbrand_theme', 'light');
    }
  }, [isDark]);

  // Language change effect
  useEffect(() => {
    localStorage.setItem('smartbrand_lang', currentLang);
  }, [currentLang]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setWorkspace('landing');
    addToast(
      'Logged Out Successfully',
      'You have signed out of your SmartBrand workspace. Click Login anytime to re-enter.',
      'info'
    );
  };

  // Navigation & Workspace State
  const [workspace, setWorkspace] = useState<ActiveWorkspace>('landing');
  const [sellerTab, setSellerTab] = useState<SellerSidebarTab>('overview');
  const [selectedQrProductId, setSelectedQrProductId] = useState<string>('prod-mango-pickle');

  // Demo Presentation Tour State
  const [isDemoTourActive, setIsDemoTourActive] = useState<boolean>(false);
  const [demoStepIndex, setDemoStepIndex] = useState<number>(0);

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (
    title: string,
    description?: string,
    tone: ToastMessage['tone'] = 'success'
  ) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, description, tone }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4200);
  };

  // Hydrate data from backend on startup
  useEffect(() => {
    apiClient
      .getBootstrap()
      .then((data) => {
        if (data.products && Array.isArray(data.products)) setProducts(data.products);
        if (data.documents && Array.isArray(data.documents)) setDocuments(data.documents);
        if (data.reviews && Array.isArray(data.reviews)) setReviews(data.reviews);
        if (data.brand) setBrand(data.brand);
        if (data.sellers && Array.isArray(data.sellers)) setSellers(data.sellers);
        if (data.analytics && Array.isArray(data.analytics)) setScanAnalytics(data.analytics);
      })
      .catch((err) => {
        console.warn('[SmartBrand App] Backend bootstrap fetch fallback:', err);
      });
  }, []);

  // Check URL query parameter on initial load for real QR code scans (?product=...)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scannedProdId = params.get('product');
    if (scannedProdId) {
      const found = products.find((p) => p.id === scannedProdId);
      if (found) {
        setSelectedQrProductId(found.id);
        setWorkspace('qr-trust-page');
      }
    }
  }, [products]);

  // Guided Demo Step Synchronization
  const applyDemoStep = (stepIdx: number) => {
    setDemoStepIndex(stepIdx);
    if (stepIdx === 0) {
      setWorkspace('seller-dashboard');
      setSellerTab('overview');
    } else if (stepIdx === 1) {
      setWorkspace('seller-dashboard');
      setSellerTab('products');
    } else if (stepIdx === 2) {
      setSelectedQrProductId('prod-mango-pickle');
      setWorkspace('qr-trust-page');
    } else if (stepIdx === 3) {
      setWorkspace('seller-dashboard');
      setSellerTab('brand-studio');
    } else if (stepIdx === 4) {
      setWorkspace('admin-panel');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartExploreDemo = () => {
    setIsDemoTourActive(true);
    applyDemoStep(0);
    addToast(
      'Explore Demo Activated',
      'Showing sample local brand “Village Harvest” & Homemade Mango Pickle workflow.',
      'info'
    );
  };

  const handleNextDemoStep = () => {
    if (demoStepIndex < DEMO_TOUR_STEPS.length - 1) {
      applyDemoStep(demoStepIndex + 1);
    } else {
      setIsDemoTourActive(false);
      setWorkspace('seller-dashboard');
      setSellerTab('overview');
      addToast(
        'Demo Walkthrough Completed',
        'You can continue exploring all Seller, QR, and Admin features freely.',
        'success'
      );
    }
  };

  const handlePrevDemoStep = () => {
    if (demoStepIndex > 0) {
      applyDemoStep(demoStepIndex - 1);
    }
  };

  // Product Handlers
  const handleSaveProduct = async (product: Product, isEdit: boolean) => {
    if (isEdit) {
      setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
      try {
        await apiClient.updateProduct(product.id, product);
      } catch (e) {
        console.error(e);
      }
      addToast(
        'Product Updated',
        `${product.name} (${product.batchNumber}) has been updated.`,
        'success'
      );
    } else {
      setProducts((prev) => [product, ...prev]);
      try {
        await apiClient.createProduct(product);
      } catch (e) {
        console.error(e);
      }
      addToast(
        'Product & QR Profile Created',
        `Generated scannable QR code for ${product.name} (Batch ${product.batchNumber}).`,
        'success'
      );
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    const target = products.find((p) => p.id === productId);
    if (products.length <= 1) {
      addToast(
        'Cannot Delete Last Product',
        'At least one product must remain in the catalog for QR profile previews.',
        'warning'
      );
      return;
    }
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    if (selectedQrProductId === productId) {
      const remaining = products.find((p) => p.id !== productId);
      if (remaining) setSelectedQrProductId(remaining.id);
    }
    try {
      await apiClient.deleteProduct(productId);
    } catch (e) {
      console.error(e);
    }
    addToast('Product Removed', `Removed ${target?.name || 'product'} from catalog.`, 'info');
  };

  const handleIncrementScan = async (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, qrScans: p.qrScans + 1 } : p))
    );
    setScanAnalytics((prev) => {
      if (prev.length === 0) return prev;
      const updated = [...prev];
      const lastIdx = updated.length - 1;
      updated[lastIdx] = {
        ...updated[lastIdx],
        scans: updated[lastIdx].scans + 1,
        uniqueVisitors: updated[lastIdx].uniqueVisitors + 1,
      };
      return updated;
    });

    try {
      await apiClient.incrementScan(productId);
    } catch (e) {
      console.error(e);
    }

    addToast(
      'QR Scan Recorded',
      `Incremented live scan telemetry for ${prod?.name || 'Product'}.`,
      'success'
    );
  };

  // Quality Document Handlers
  const handleAddDocument = async (doc: QualityDocument) => {
    setDocuments((prev) => [doc, ...prev]);
    try {
      await apiClient.createDocument(doc);
    } catch (e) {
      console.error(e);
    }
    addToast(
      'Quality Document Uploaded',
      `${doc.title} added with status “Pending Review”. Switch to Admin Panel to verify it.`,
      'success'
    );
  };

  const handleUpdateDocumentStatus = async (
    docId: string,
    newStatus: DocumentVerificationStatus,
    adminNotes?: string
  ) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === docId ? { ...d, status: newStatus, adminNotes: adminNotes ?? d.adminNotes } : d
      )
    );
    try {
      await apiClient.updateDocumentStatus(docId, newStatus, adminNotes);
    } catch (e) {
      console.error(e);
    }
    addToast(
      `Document Status → ${newStatus}`,
      'Updated verification status on Seller Studio and Public QR Trust Page.',
      'success'
    );
  };

  // Customer Review Handlers
  const handleAddReview = (
    newReviewData: Omit<
      CustomerReview,
      'id' | 'date' | 'isVerifiedPurchase' | 'moderationStatus' | 'isSampleData'
    >,
    orderIdInput: string
  ): boolean => {
    const normalizedOrder = orderIdInput.trim().toUpperCase();
    const matchedOrder = VERIFIED_ORDER_RECORDS.find(
      (o) =>
        o.orderId.toUpperCase() === normalizedOrder && o.productId === newReviewData.productId
    );

    const isVerified = Boolean(matchedOrder);

    const created: CustomerReview = {
      ...newReviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      orderId: isVerified ? normalizedOrder : undefined,
      isVerifiedPurchase: isVerified,
      moderationStatus: 'Published',
      isSampleData: false,
    };

    setReviews((prev) => [created, ...prev]);

    apiClient.createReview(newReviewData, orderIdInput).catch(console.error);

    if (isVerified) {
      addToast(
        'Verified Purchase Review Published!',
        `Order ${normalizedOrder} confirmed. Review posted with Verified Purchase status.`,
        'success'
      );
    } else {
      addToast(
        'Public QR Review Published',
        normalizedOrder
          ? `Order ID "${normalizedOrder}" was not found in records, so posted as unverified review.`
          : 'Your feedback is now live on this product’s QR Trust Profile.',
        'info'
      );
    }
    return isVerified;
  };

  const handleModerateReview = async (
    reviewId: string,
    moderationStatus: CustomerReview['moderationStatus']
  ) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, moderationStatus } : r))
    );
    try {
      await apiClient.updateReviewStatus(reviewId, moderationStatus);
    } catch (e) {
      console.error(e);
    }
    addToast('Review Moderation Updated', `Review status set to ${moderationStatus}.`, 'info');
  };

  const handleDeleteReview = async (reviewId: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    try {
      await apiClient.deleteReview(reviewId);
    } catch (e) {
      console.error(e);
    }
    addToast('Review Removed', 'Deleted customer review from platform.', 'info');
  };

  const handleUpdateSellerStatus = async (sellerId: string, status: SellerAccount['status']) => {
    setSellers((prev) => prev.map((s) => (s.id === sellerId ? { ...s, status } : s)));
    try {
      await apiClient.updateSellerStatus(sellerId, status);
    } catch (e) {
      console.error(e);
    }
    addToast('Seller Account Updated', `Seller status changed to ${status}.`, 'success');
  };

  const handleUpdateBrand = async (updatedBrand: BrandIdentity) => {
    setBrand(updatedBrand);
    try {
      await apiClient.updateBrand(updatedBrand);
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetDemoData = async () => {
    setProducts(INITIAL_PRODUCTS);
    setDocuments(INITIAL_DOCUMENTS);
    setReviews(INITIAL_REVIEWS);
    setBrand(INITIAL_BRAND_IDENTITY);
    setSellers(INITIAL_SELLERS);
    setScanAnalytics(INITIAL_SCAN_ANALYTICS);
    try {
      await apiClient.resetDatabase();
    } catch (e) {
      console.error(e);
    }
    addToast(
      'Demo Data Reset',
      'Restored default Village Harvest products, quality records, and reviews in backend database.',
      'info'
    );
  };

  const openQrProfileForProduct = (productId: string) => {
    setSelectedQrProductId(productId);
    setWorkspace('qr-trust-page');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeQrProduct =
    products.find((p) => p.id === selectedQrProductId) || products[0];
  const featuredPickleProduct =
    products.find((p) => p.id === 'prod-mango-pickle') || products[0];
  const totalScans = products.reduce((acc, p) => acc + p.qrScans, 0);

  return (
    <div className="min-h-screen relative">
      {workspace === 'landing' && (
        <LandingPage
          featuredProduct={featuredPickleProduct}
          allProducts={products}
          totalScans={totalScans}
          onStartBuilding={() => {
            setWorkspace('seller-dashboard');
            setSellerTab('overview');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onExploreDemo={handleStartExploreDemo}
          onOpenLogin={() => setIsAuthModalOpen(true)}
          onOpenQRProfile={openQrProfileForProduct}
          onOpenAdminPanel={() => {
            setWorkspace('admin-panel');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          currentLang={currentLang}
          onSelectLang={setCurrentLang}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}

      {workspace === 'seller-dashboard' && (
        <SellerDashboard
          activeTab={sellerTab}
          onChangeTab={(t) => {
            setSellerTab(t);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          brand={brand}
          onUpdateBrand={handleUpdateBrand}
          products={products}
          onSaveProduct={handleSaveProduct}
          onDeleteProduct={handleDeleteProduct}
          documents={documents}
          onAddDocument={handleAddDocument}
          reviews={reviews}
          onModerateReview={handleModerateReview}
          scanAnalytics={scanAnalytics}
          onIncrementScan={handleIncrementScan}
          onOpenQRProfile={openQrProfileForProduct}
          onOpenAdminPanel={() => {
            setWorkspace('admin-panel');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onBackToLanding={() => {
            setWorkspace('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onStartDemoTour={handleStartExploreDemo}
          onResetDemoData={handleResetDemoData}
          onNotify={addToast}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          currentLang={currentLang}
          onSelectLang={setCurrentLang}
          onLogout={handleLogout}
        />
      )}

      {workspace === 'qr-trust-page' && activeQrProduct && (
        <QRProductTrustPage
          product={activeQrProduct}
          allProducts={products}
          brand={brand}
          documents={documents}
          reviews={reviews}
          verifiedOrders={VERIFIED_ORDER_RECORDS}
          onSelectProduct={(id) => setSelectedQrProductId(id)}
          onAddReview={handleAddReview}
          onBackToDashboard={() => {
            setWorkspace('seller-dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onBackToLanding={() => {
            setWorkspace('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenBrandStudio={() => {
            setWorkspace('seller-dashboard');
            setSellerTab('brand-studio');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onIncrementScan={handleIncrementScan}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          currentLang={currentLang}
          onSelectLang={setCurrentLang}
        />
      )}

      {workspace === 'admin-panel' && (
        <AdminPanel
          sellers={sellers}
          products={products}
          documents={documents}
          reviews={reviews}
          onUpdateDocumentStatus={handleUpdateDocumentStatus}
          onUpdateSellerStatus={handleUpdateSellerStatus}
          onModerateReview={handleModerateReview}
          onDeleteReview={handleDeleteReview}
          onOpenQRProfile={openQrProfileForProduct}
          onBackToSellerDashboard={() => {
            setWorkspace('seller-dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onBackToLanding={() => {
            setWorkspace('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          currentLang={currentLang}
          onSelectLang={setCurrentLang}
          onLogout={handleLogout}
        />
      )}

      {isDemoTourActive && (
        <DemoTourBar
          currentStepIndex={demoStepIndex}
          onSelectStep={applyDemoStep}
          onNextStep={handleNextDemoStep}
          onPrevStep={handlePrevDemoStep}
          onCloseTour={() => setIsDemoTourActive(false)}
          onQuickOpenPickleQR={() => {
            setDemoStepIndex(2);
            openQrProfileForProduct('prod-mango-pickle');
          }}
        />
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentLang={currentLang}
        isDark={isDark}
        onSignInSeller={(businessName, userEmail) => {
          if (businessName && businessName.trim()) {
            setBrand((prev) => ({ ...prev, brandName: businessName.trim() }));
          }
          setCurrentUser({
            name: businessName || 'Village Harvest Collective',
            email: userEmail || 'care@villageharvest.in',
            role: 'seller',
          });
          setWorkspace('seller-dashboard');
          setSellerTab('overview');
          addToast(
            `Signed in as ${businessName || 'Village Harvest'}`,
            'Welcome to your Seller Brand Studio.',
            'success'
          );
        }}
        onSignInAdmin={() => {
          setCurrentUser({
            name: 'Platform Administrator',
            email: 'admin@smartbrand.gov.in',
            role: 'admin',
          });
          setWorkspace('admin-panel');
          addToast(
            'Signed in as Platform Admin',
            'Document verification & review moderation controls unlocked.',
            'info'
          );
        }}
      />

      <div className="fixed top-16 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto bg-white border border-stone-200 rounded-2xl p-4 shadow-lg flex items-start gap-3 transition-all"
          >
            {t.tone === 'success' && (
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            )}
            {t.tone === 'info' && <Info className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />}
            {t.tone === 'warning' && (
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-stone-900">{t.title}</div>
              {t.description && (
                <div className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">
                  {t.description}
                </div>
              )}
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((item) => item.id !== t.id))}
              className="text-stone-400 hover:text-stone-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
