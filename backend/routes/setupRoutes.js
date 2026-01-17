import express from 'express';
import pool from '../config/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Setup database endpoint - run this once to create tables
router.post('/setup-database', async (req, res) => {
  try {
    console.log('Starting database setup...');
    
    // Create vehicles table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        model VARCHAR(100) NOT NULL,
        variant VARCHAR(100),
        price DECIMAL(10, 2) NOT NULL,
        original_price DECIMAL(10, 2),
        after_tax_credit DECIMAL(10, 2),
        mileage INT,
        range_epa INT,
        top_speed INT,
        acceleration VARCHAR(50),
        exterior_color VARCHAR(50),
        interior_color VARCHAR(50),
        wheels VARCHAR(50),
        autopilot BOOLEAN DEFAULT false,
        seat_layout VARCHAR(50),
        additional_features TEXT,
        image_url VARCHAR(255),
        status VARCHAR(50) DEFAULT 'Available',
        inventory_type ENUM('cash', 'lease') DEFAULT 'cash',
        location VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Vehicles table created');

    // Create admin_users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Admin users table created');

    // Create vehicle_images table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS vehicle_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vehicle_id INT NOT NULL,
        image_url VARCHAR(500) NOT NULL,
        is_primary BOOLEAN DEFAULT false,
        display_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ Vehicle images table created');

    // Create banner_images table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS banner_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        route VARCHAR(50) NOT NULL,
        image_url VARCHAR(500) NOT NULL,
        display_order INT DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Banner images table created');

    // Insert default admin
    await pool.query(`
      INSERT INTO admin_users (username, password, email) 
      VALUES ('admin', '$2a$10$rFGvFqKxN7k5XqjqQXZ7DeqX7D6X5h7qZqQxN7k5XqjqQXZ7DeqX7D', 'admin@aryalsdealer.com')
      ON DUPLICATE KEY UPDATE username=username
    `);
    console.log('✅ Default admin created');

    // Insert banner images
    await pool.query(`
      INSERT INTO banner_images (route, image_url, display_order) VALUES
      ('home', 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1920&q=80', 1),
      ('home', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80', 2),
      ('home', 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1920&q=80', 3),
      ('about', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600', 1),
      ('finance', 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1600', 1),
      ('contact', 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1600', 1)
    `);
    console.log('✅ Banner images inserted');

    // Insert sample vehicles
    await pool.query(`
      INSERT INTO vehicles (model, variant, price, original_price, after_tax_credit, mileage, range_epa, top_speed, acceleration, exterior_color, interior_color, wheels, autopilot, seat_layout, additional_features, image_url, status, location) VALUES
      ('Model Y', 'Long Range Rear-Wheel Drive', 44010, 51990, 36510, 1865, 320, 135, '6.5s', 'Stealth Grey Paint', 'Black Premium Interior', '19" Gemini Dark Wheels', true, 'Five Seat Interior', '30-Day Premium Connectivity Trial', 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-Main-Hero-Desktop-LHD.jpg', 'Available', 'Manchester, England'),
      ('Model Y', 'Long Range Rear-Wheel Drive', 45530, 48000, 38030, 377, 320, 135, '6.5s', 'Stealth Grey Paint', 'White Premium Interior', '18" Gemini Light Wheels', true, 'Five Seat Interior', '30-Day Premium Connectivity Trial', 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-Main-Hero-Desktop-LHD.jpg', 'Available', 'Manchester, England'),
      ('Model Y', 'Long Range Rear-Wheel Drive', 45990, 52000, 38490, 0, 320, 135, '6.5s', 'Stealth Grey Paint', 'All Black Premium Interior', '19" Gemini Dark Wheels', true, 'Five Seat Interior', '30-Day Premium Connectivity Trial, All Black Premium Interior', 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-Main-Hero-Desktop-LHD.jpg', 'Available', 'Manchester, England'),
      ('Model Y', 'Long Range Rear-Wheel Drive', 45990, 0, 38490, 0, 320, 135, '6.5s', 'Pearl White Paint', 'Black and White Premium Interior', '19" Gemini Dark Wheels', true, 'Five Seat Interior', '30-Day Premium Connectivity Trial, All Black Premium Interior', 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-Main-Hero-Desktop-LHD.jpg', 'new', 'Manchester, England'),
      ('Model Y', 'Long Range Rear-Wheel Drive', 45990, 0, 38490, 0, 320, 135, '6.5s', 'Deep Blue Metallic Paint', 'All Black Premium Interior', '19" Gemini Dark Wheels', true, 'Five Seat Interior', '30-Day Premium Connectivity Trial, All Black Premium Interior', 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-Main-Hero-Desktop-LHD.jpg', 'new', 'Manchester, England'),
      ('Model Y', 'Long Range Rear-Wheel Drive', 46400, 54000, 38900, 1984, 205, 135, '6.5s', 'Stealth Grey Paint', 'All Black Premium Interior', '20" Induction Wheels', true, 'Five Seat Interior', '30-Day Premium Connectivity Trial', 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-Y-Main-Hero-Desktop-LHD.jpg', 'Used', 'Manchester, England'),
      ('Model S', 'Dual Motor All-Wheel Drive', 72490, 0, 65000, 0, 405, 149, '3.1s', 'Pearl White', 'Cream Interior', '19" Tempest Wheels', true, 'Five Seat Interior', 'Premium Connectivity, Enhanced Autopilot', 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-S-Main-Hero-Desktop-LHD.jpg', 'Available', 'Los Angeles, USA'),
      ('Model 3', 'Rear-Wheel Drive', 38990, 0, 31500, 0, 272, 140, '5.8s', 'Midnight Silver', 'Black Interior', '18" Aero Wheels', true, 'Five Seat Interior', 'Premium Audio System', 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Main-Hero-Desktop-LHD.jpg', 'Available', 'New York, USA'),
      ('Model X', 'Dual Motor All-Wheel Drive', 79990, 0, 72500, 0, 348, 155, '3.8s', 'Solid Black', 'White Interior', '20" Cyberstream Wheels', true, 'Six Seat Interior', 'Falcon Wing Doors, Premium Sound', 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-X-Main-Hero-Desktop-LHD.jpg', 'Available', 'Seattle, USA'),
      ('Model 3', 'Long Range', 45990, 0, 38500, 450, 358, 145, '4.2s', 'Deep Blue Metallic', 'Black and White Interior', '19" Sport Wheels', true, 'Five Seat Interior', 'Premium Interior, Glass Roof', 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Main-Hero-Desktop-LHD.jpg', 'Used', 'Chicago, USA')
    `);
    console.log('✅ Sample vehicles inserted');

    // Populate vehicle_images
    await pool.query(`
      INSERT INTO vehicle_images (vehicle_id, image_url, is_primary, display_order)
      SELECT id, image_url, true, 1
      FROM vehicles
      WHERE image_url IS NOT NULL
    `);
    console.log('✅ Vehicle images populated');

    res.json({
      success: true,
      message: '🎉 Database setup completed successfully!',
      tables_created: ['vehicles', 'admin_users', 'vehicle_images', 'banner_images'],
      sample_data: {
        vehicles: 10,
        banners: 6,
        admin: 1
      }
    });

  } catch (error) {
    console.error('Database setup error:', error);
    res.status(500).json({
      success: false,
      message: 'Database setup failed',
      error: error.message
    });
  }
});

export default router;
