import { Router, Request, Response } from 'express';
import { db } from './db';
import { DocumentVerificationStatus, CustomerReview, SellerAccount } from '../src/types/smartbrand';

export const apiRouter = Router();

// Health check
apiRouter.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'SmartBrand Backend API',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// All bootstrap state for one-shot client hydration
apiRouter.get('/bootstrap', (_req: Request, res: Response) => {
  res.json({
    products: db.getProducts(),
    documents: db.getDocuments(),
    reviews: db.getReviews(),
    brand: db.getBrand(),
    sellers: db.getSellers(),
    analytics: db.getAnalytics(),
    orders: db.getOrders(),
  });
});

// --- Products API ---
apiRouter.get('/products', (_req: Request, res: Response) => {
  res.json(db.getProducts());
});

apiRouter.get('/products/:id', (req: Request, res: Response) => {
  const product = db.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

apiRouter.post('/products', (req: Request, res: Response) => {
  const { name, batchNumber } = req.body;
  if (!name || !batchNumber) {
    return res.status(400).json({ error: 'Product name and batch number are required' });
  }
  const created = db.createProduct(req.body);
  res.status(201).json(created);
});

apiRouter.put('/products/:id', (req: Request, res: Response) => {
  const updated = db.updateProduct(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(updated);
});

apiRouter.delete('/products/:id', (req: Request, res: Response) => {
  const success = db.deleteProduct(req.params.id);
  if (!success) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json({ success: true, message: 'Product deleted' });
});

apiRouter.post('/products/:id/scan', (req: Request, res: Response) => {
  const result = db.incrementScans(req.params.id);
  if (!result) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json({ success: true, ...result });
});

// --- Documents API ---
apiRouter.get('/documents', (_req: Request, res: Response) => {
  res.json(db.getDocuments());
});

apiRouter.post('/documents', (req: Request, res: Response) => {
  const { title, type, productId } = req.body;
  if (!title || !type || !productId) {
    return res.status(400).json({ error: 'Title, type, and productId are required' });
  }
  const created = db.createDocument(req.body);
  res.status(201).json(created);
});

apiRouter.put('/documents/:id/status', (req: Request, res: Response) => {
  const { status, adminNotes } = req.body;
  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }
  const updated = db.updateDocumentStatus(
    req.params.id,
    status as DocumentVerificationStatus,
    adminNotes
  );
  if (!updated) {
    return res.status(404).json({ error: 'Document not found' });
  }
  res.json(updated);
});

// --- Reviews API ---
apiRouter.get('/reviews', (_req: Request, res: Response) => {
  res.json(db.getReviews());
});

apiRouter.post('/reviews', (req: Request, res: Response) => {
  const { productId, customerName, rating, comment, orderId } = req.body;
  if (!productId || !customerName || !rating || !comment) {
    return res.status(400).json({ error: 'Missing required review fields' });
  }
  const result = db.createReview(req.body, orderId);
  res.status(201).json(result);
});

apiRouter.put('/reviews/:id/status', (req: Request, res: Response) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }
  const updated = db.updateReviewStatus(req.params.id, status as CustomerReview['moderationStatus']);
  if (!updated) {
    return res.status(404).json({ error: 'Review not found' });
  }
  res.json(updated);
});

apiRouter.delete('/reviews/:id', (req: Request, res: Response) => {
  const success = db.deleteReview(req.params.id);
  if (!success) {
    return res.status(404).json({ error: 'Review not found' });
  }
  res.json({ success: true, message: 'Review deleted' });
});

// --- Brand Identity API ---
apiRouter.get('/brand', (_req: Request, res: Response) => {
  res.json(db.getBrand());
});

apiRouter.put('/brand', (req: Request, res: Response) => {
  const updated = db.updateBrand(req.body);
  res.json(updated);
});

// --- Sellers API ---
apiRouter.get('/sellers', (_req: Request, res: Response) => {
  res.json(db.getSellers());
});

apiRouter.put('/sellers/:id/status', (req: Request, res: Response) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }
  const updated = db.updateSellerStatus(req.params.id, status as SellerAccount['status']);
  if (!updated) {
    return res.status(404).json({ error: 'Seller not found' });
  }
  res.json(updated);
});

// --- Analytics API ---
apiRouter.get('/analytics', (_req: Request, res: Response) => {
  res.json(db.getAnalytics());
});

// --- Orders Verification API ---
apiRouter.post('/orders/verify', (req: Request, res: Response) => {
  const { orderId, productId } = req.body;
  if (!orderId || !productId) {
    return res.status(400).json({ error: 'orderId and productId are required' });
  }
  const verification = db.verifyOrder(orderId, productId);
  res.json(verification);
});

// --- Database Factory Reset API ---
apiRouter.post('/reset', (_req: Request, res: Response) => {
  const resetData = db.reset();
  res.json({ success: true, message: 'Database reset to default demo data', data: resetData });
});
