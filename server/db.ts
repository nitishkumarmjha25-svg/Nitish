import fs from 'fs';
import path from 'path';
import {
  BrandIdentity,
  CustomerReview,
  DocumentVerificationStatus,
  Product,
  QualityDocument,
  ScanAnalyticsPoint,
  SellerAccount,
  VerifiedOrderRecord,
} from '../src/types/smartbrand';
import {
  INITIAL_BRAND_IDENTITY,
  INITIAL_DOCUMENTS,
  INITIAL_PRODUCTS,
  INITIAL_REVIEWS,
  INITIAL_SCAN_ANALYTICS,
  INITIAL_SELLERS,
  VERIFIED_ORDER_RECORDS,
} from '../src/data/initialData';

export interface DatabaseSchema {
  products: Product[];
  documents: QualityDocument[];
  reviews: CustomerReview[];
  brand: BrandIdentity;
  sellers: SellerAccount[];
  analytics: ScanAnalyticsPoint[];
  orders: VerifiedOrderRecord[];
}

const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.resolve(DB_DIR, 'database.json');

function getDefaultData(): DatabaseSchema {
  return {
    products: INITIAL_PRODUCTS,
    documents: INITIAL_DOCUMENTS,
    reviews: INITIAL_REVIEWS,
    brand: INITIAL_BRAND_IDENTITY,
    sellers: INITIAL_SELLERS,
    analytics: INITIAL_SCAN_ANALYTICS,
    orders: VERIFIED_ORDER_RECORDS,
  };
}

class BackendDatabase {
  private data: DatabaseSchema;

  constructor() {
    this.data = getDefaultData();
    this.load();
  }

  private load() {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        this.data = {
          ...getDefaultData(),
          ...parsed,
        };
      } else {
        this.save();
      }
    } catch (err) {
      console.error('[Backend DB] Error loading database file, using defaults:', err);
      this.data = getDefaultData();
    }
  }

  private save() {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[Backend DB] Error saving database file:', err);
    }
  }

  // --- Products ---
  getProducts(): Product[] {
    return this.data.products;
  }

  getProductById(id: string): Product | undefined {
    return this.data.products.find((p) => p.id === id);
  }

  createProduct(product: Product): Product {
    this.data.products = [product, ...this.data.products];
    this.save();
    return product;
  }

  updateProduct(id: string, updates: Partial<Product>): Product | null {
    const idx = this.data.products.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    this.data.products[idx] = { ...this.data.products[idx], ...updates };
    this.save();
    return this.data.products[idx];
  }

  deleteProduct(id: string): boolean {
    const lenBefore = this.data.products.length;
    this.data.products = this.data.products.filter((p) => p.id !== id);
    if (this.data.products.length !== lenBefore) {
      this.save();
      return true;
    }
    return false;
  }

  incrementScans(id: string): { product: Product; analytics: ScanAnalyticsPoint[] } | null {
    const prod = this.data.products.find((p) => p.id === id);
    if (!prod) return null;
    prod.qrScans += 1;

    // Also update today's scan telemetry
    if (this.data.analytics.length > 0) {
      const last = this.data.analytics[this.data.analytics.length - 1];
      last.scans += 1;
      last.uniqueVisitors += 1;
    }
    this.save();
    return { product: prod, analytics: this.data.analytics };
  }

  // --- Documents ---
  getDocuments(): QualityDocument[] {
    return this.data.documents;
  }

  createDocument(doc: QualityDocument): QualityDocument {
    this.data.documents = [doc, ...this.data.documents];
    this.save();
    return doc;
  }

  updateDocumentStatus(
    id: string,
    status: DocumentVerificationStatus,
    adminNotes?: string
  ): QualityDocument | null {
    const doc = this.data.documents.find((d) => d.id === id);
    if (!doc) return null;
    doc.status = status;
    if (adminNotes !== undefined) {
      doc.adminNotes = adminNotes;
    }
    this.save();
    return doc;
  }

  // --- Reviews ---
  getReviews(): CustomerReview[] {
    return this.data.reviews;
  }

  createReview(
    reviewData: Omit<CustomerReview, 'id' | 'date' | 'isVerifiedPurchase' | 'moderationStatus' | 'isSampleData'>,
    orderId?: string
  ): { review: CustomerReview; isVerified: boolean } {
    let isVerified = false;
    let verifiedOrderId: string | undefined = undefined;

    if (orderId && orderId.trim()) {
      const cleanOrder = orderId.trim().toUpperCase();
      const match = this.data.orders.find(
        (o) => o.orderId.toUpperCase() === cleanOrder && o.productId === reviewData.productId
      );
      if (match) {
        isVerified = true;
        verifiedOrderId = cleanOrder;
      }
    }

    const review: CustomerReview = {
      ...reviewData,
      id: `rev-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toISOString().slice(0, 10),
      orderId: verifiedOrderId,
      isVerifiedPurchase: isVerified,
      moderationStatus: 'Published',
      isSampleData: false,
    };

    this.data.reviews = [review, ...this.data.reviews];
    this.save();
    return { review, isVerified };
  }

  updateReviewStatus(id: string, status: CustomerReview['moderationStatus']): CustomerReview | null {
    const rev = this.data.reviews.find((r) => r.id === id);
    if (!rev) return null;
    rev.moderationStatus = status;
    this.save();
    return rev;
  }

  deleteReview(id: string): boolean {
    const lenBefore = this.data.reviews.length;
    this.data.reviews = this.data.reviews.filter((r) => r.id !== id);
    if (this.data.reviews.length !== lenBefore) {
      this.save();
      return true;
    }
    return false;
  }

  // --- Brand ---
  getBrand(): BrandIdentity {
    return this.data.brand;
  }

  updateBrand(brand: BrandIdentity): BrandIdentity {
    this.data.brand = brand;
    this.save();
    return this.data.brand;
  }

  // --- Sellers ---
  getSellers(): SellerAccount[] {
    return this.data.sellers;
  }

  updateSellerStatus(id: string, status: SellerAccount['status']): SellerAccount | null {
    const seller = this.data.sellers.find((s) => s.id === id);
    if (!seller) return null;
    seller.status = status;
    this.save();
    return seller;
  }

  // --- Analytics ---
  getAnalytics(): ScanAnalyticsPoint[] {
    return this.data.analytics;
  }

  // --- Orders ---
  getOrders(): VerifiedOrderRecord[] {
    return this.data.orders;
  }

  verifyOrder(orderId: string, productId: string): { valid: boolean; order?: VerifiedOrderRecord } {
    const clean = orderId.trim().toUpperCase();
    const order = this.data.orders.find(
      (o) => o.orderId.toUpperCase() === clean && o.productId === productId
    );
    return { valid: Boolean(order), order };
  }

  // --- Reset ---
  reset(): DatabaseSchema {
    this.data = getDefaultData();
    this.save();
    return this.data;
  }
}

export const db = new BackendDatabase();
