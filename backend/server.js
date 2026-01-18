import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import vehicleRoutes from './routes/vehicleRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import setupRoutes from './routes/setupRoutes.js';
import testDriveRoutes from './routes/testDriveRoutes.js';
import pool from './config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration - Allow multiple origins
const allowedOrigins = [
  'http://localhost:3001',
  'http://localhost:5173',
  'https://car-dealer-ship-two.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins for now
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
app.use('/api', vehicleRoutes);
app.use('/api', adminRoutes);
app.use('/api', setupRoutes);
app.use('/api', testDriveRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Aryals Dealer API is running' });
});

// Database health check endpoint
app.get('/api/db-health', async (req, res) => {
  try {
    // Test database connection
    const [rows] = await pool.query('SELECT 1 as test');
    
    // Get table information
    const [tables] = await pool.query(`
      SELECT TABLE_NAME 
      FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = DATABASE()
    `);
    
    const tableNames = tables.map(t => t.TABLE_NAME);
    
    // Get counts from each table if they exist
    const counts = {};
    
    if (tableNames.includes('vehicles')) {
      const [vehicleCount] = await pool.query('SELECT COUNT(*) as count FROM vehicles');
      counts.vehicles = vehicleCount[0].count;
    }
    
    if (tableNames.includes('admin_users')) {
      const [adminCount] = await pool.query('SELECT COUNT(*) as count FROM admin_users');
      counts.admin_users = adminCount[0].count;
    }
    
    if (tableNames.includes('vehicle_images')) {
      const [imageCount] = await pool.query('SELECT COUNT(*) as count FROM vehicle_images');
      counts.vehicle_images = imageCount[0].count;
    }
    
    if (tableNames.includes('banner_images')) {
      const [bannerCount] = await pool.query('SELECT COUNT(*) as count FROM banner_images');
      counts.banner_images = bannerCount[0].count;
    }
    
    res.json({
      success: true,
      database: 'Connected',
      tables: tableNames,
      record_counts: counts,
      database_name: process.env.DB_NAME || 'railway',
      message: tableNames.length === 0 
        ? '⚠️ No tables found. Please import railway_setup.sql' 
        : '✅ Database is configured correctly'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      database: 'Error',
      error: error.message,
      message: '❌ Database connection failed or tables missing'
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
});

export default app;
