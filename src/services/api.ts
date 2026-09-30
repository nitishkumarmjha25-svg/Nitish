import {
  BrandIdentity,
  CustomerReview,
  DocumentVerificationStatus,
  Product,
  QualityDocument,
  ScanAnalyticsPoint,
  SellerAccount,
} from '../types/smartbrand';

export const apiClient = {
  async getBootstrap() {
    const res = await fetch('/api/bootstrap');
    if (!res.ok) throw new Error('Failed to fetch bootstrap data');
    return res.json();
  },

  async getProducts(): Promise<Product[]> {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async createProduct(product: Product): Promise<Product> {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('Failed to create product');
    return res.json();
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update product');
    return res.json();
  },

  async deleteProduct(id: string): Promise<boolean> {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete product');
    return res.json();
  },

  async incrementScan(id: string): Promise<{ success: boolean; product: Product }> {
    const res = await fetch(`/api/products/${id}/scan`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to increment scan');
    return res.json();
  },

  async getDocuments(): Promise<QualityDocument[]> {
    const res = await fetch('/api/documents');
    if (!res.ok) throw new Error('Failed to fetch documents');
    return res.json();
  },

  async createDocument(doc: QualityDocument): Promise<QualityDocument> {
    const res = await fetch('/api/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doc),
    });
    if (!res.ok) throw new Error('Failed to create document');
    return res.json();
  },

  async updateDocumentStatus(
    id: string,
    status: DocumentVerificationStatus,
    adminNotes?: string
  ): Promise<QualityDocument> {
    const res = await fetch(`/api/documents/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, adminNotes }),
    });
    if (!res.ok) throw new Error('Failed to update document status');
    return res.json();
  },

  async getReviews(): Promise<CustomerReview[]> {
    const res = await fetch('/api/reviews');
    if (!res.ok) throw new Error('Failed to fetch reviews');
    return res.json();
  },

  async createReview(
    reviewData: Omit<
      CustomerReview,
      'id' | 'date' | 'isVerifiedPurchase' | 'moderationStatus' | 'isSampleData'
    >,
    orderId?: string
  ): Promise<{ review: CustomerReview; isVerified: boolean }> {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...reviewData, orderId }),
    });
    if (!res.ok) throw new Error('Failed to create review');
    return res.json();
  },

  async updateReviewStatus(
    id: string,
    status: CustomerReview['moderationStatus']
  ): Promise<CustomerReview> {
    const res = await fetch(`/api/reviews/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update review status');
    return res.json();
  },

  async deleteReview(id: string): Promise<boolean> {
    const res = await fetch(`/api/reviews/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete review');
    return res.json();
  },

  async getBrand(): Promise<BrandIdentity> {
    const res = await fetch('/api/brand');
    if (!res.ok) throw new Error('Failed to fetch brand');
    return res.json();
  },

  async updateBrand(brand: BrandIdentity): Promise<BrandIdentity> {
    const res = await fetch('/api/brand', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(brand),
    });
    if (!res.ok) throw new Error('Failed to update brand');
    return res.json();
  },

  async getSellers(): Promise<SellerAccount[]> {
    const res = await fetch('/api/sellers');
    if (!res.ok) throw new Error('Failed to fetch sellers');
    return res.json();
  },

  async updateSellerStatus(id: string, status: SellerAccount['status']): Promise<SellerAccount> {
    const res = await fetch(`/api/sellers/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update seller status');
    return res.json();
  },

  async getAnalytics(): Promise<ScanAnalyticsPoint[]> {
    const res = await fetch('/api/analytics');
    if (!res.ok) throw new Error('Failed to fetch analytics');
    return res.json();
  },

  async verifyOrder(orderId: string, productId: string): Promise<{ valid: boolean }> {
    const res = await fetch('/api/orders/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, productId }),
    });
    if (!res.ok) throw new Error('Failed to verify order');
    return res.json();
  },

  async resetDatabase(): Promise<{ success: boolean; message: string }> {
    const res = await fetch('/api/reset', {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to reset database');
    return res.json();
  },
};
