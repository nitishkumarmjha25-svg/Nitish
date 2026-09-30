import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { apiRouter } from './server/api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Mount REST API
app.use('/api', apiRouter);

// Serve static frontend build
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));

// Fallback for SPA routing
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[SmartBrand Full-Stack Server] running on http://0.0.0.0:${PORT}`);
  console.log(`[SmartBrand Full-Stack Server] API endpoints available at http://0.0.0.0:${PORT}/api`);
});
