export type DocumentVerificationStatus =
  | 'Uploaded'
  | 'Pending Review'
  | 'Verified by Admin'
  | 'Revision Requested';

export type DocumentType =
  | 'FSSAI Registration Record'
  | 'NABL Lab Microbial Report'
  | 'Pesticide Residue Analysis'
  | 'Organic Input Declaration'
  | 'Food-Grade Packaging Certificate'
  | 'Artisan Craft & Origin Record';

export interface QualityDocument {
  id: string;
  productId: string;
  sellerId: string;
  title: string;
  type: DocumentType;
  referenceNumber: string;
  issueDate: string;
  expiryDate: string;
  status: DocumentVerificationStatus;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  adminNotes?: string;
  summaryPoints: string[];
}

export interface CustomerReview {
  id: string;
  productId: string;
  customerName: string;
  customerLocation: string;
  rating: number;
  comment: string;
  date: string;
  orderId?: string;
  isVerifiedPurchase: boolean;
  moderationStatus: 'Published' | 'Pending' | 'Hidden';
  isSampleData: boolean;
}

export interface VerifiedOrderRecord {
  orderId: string;
  productId: string;
  customerName: string;
  purchaseDate: string;
}

export interface Product {
  id: string;
  sellerId: string;
  name: string;
  category: string;
  description: string;
  ingredientsOrMaterials: string[];
  sourcingOrigin: string;
  manufacturingDate: string;
  expiryDate: string;
  batchNumber: string;
  netWeight: string;
  priceInr: number;
  imageUrl: string;
  artworkPreset: 'mango-pickle' | 'wild-honey' | 'lakadong-turmeric' | 'mustard-oil' | 'custom';
  qrScans: number;
  storageInstructions: string;
  businessName: string;
  businessLocation: string;
  sellerContactPhone: string;
  sellerContactEmail: string;
  createdAt: string;
  isSampleData: boolean;
}

export interface BrandIdentity {
  brandName: string;
  tagline: string;
  story: string;
  foundedYear: string;
  originLocation: string;
  logoTemplate: 'botanical-crest' | 'heritage-stamp' | 'modern-minimal' | 'artisan-seal';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontPairing: 'editorial-serif' | 'modern-sans' | 'craft-slab';
  packagingTemplate: 'jar-front-label' | 'neck-seal-badge' | 'back-trust-label';
  posterTemplate: 'launch-showcase' | 'transparency-story' | 'artisan-quote';
  contactPhone: string;
  contactEmail: string;
  fssaiDisplayNumber: string;
}

export interface SellerAccount {
  id: string;
  businessName: string;
  founderName: string;
  category: string;
  location: string;
  joinedDate: string;
  productsCount: number;
  verifiedDocsCount: number;
  status: 'Active' | 'Under Review' | 'Suspended';
  email: string;
}

export interface ScanAnalyticsPoint {
  date: string;
  scans: number;
  uniqueVisitors: number;
  reviewsSubmitted: number;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  tone: 'success' | 'info' | 'warning' | 'error';
}

export type ActiveWorkspace = 'landing' | 'seller-dashboard' | 'qr-trust-page' | 'admin-panel';

export type SellerSidebarTab =
  | 'overview'
  | 'products'
  | 'brand-studio'
  | 'qr-verification'
  | 'quality-documents'
  | 'customer-reviews'
  | 'analytics'
  | 'settings';
