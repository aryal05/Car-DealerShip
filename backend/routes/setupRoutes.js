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

// Add more sample vehicles (BMW, Mercedes, Audi, Porsche, etc.)
router.post('/add-more-vehicles', async (req, res) => {
  try {
    console.log('Adding more sample vehicles...');
    
    const vehicles = [
      // BMW vehicles
      ['BMW X5', 'M50i xDrive', 82000, 89000, 82000, 0, 350, 155, '4.3s', 'Alpine White', 'Black Vernasca Leather', '21" M Sport Wheels', false, 'Five Seat Interior', 'Panoramic Moonroof, Harman Kardon Sound, Adaptive M Suspension', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800', 'new', 'Los Angeles, CA'],
      ['BMW 3 Series', '330i Sport Line', 45500, 48000, 45500, 1200, 380, 130, '5.6s', 'Portimao Blue', 'Cognac Dakota Leather', '19" Sport Wheels', false, 'Five Seat Interior', 'Live Cockpit Professional, Wireless Charging, Parking Assistant', 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800', 'used', 'New York, NY'],
      ['BMW M4', 'Competition Coupe', 78900, 0, 78900, 0, 320, 180, '3.8s', 'Isle of Man Green', 'Black Merino Leather', '19/20" M Wheels', false, 'Four Seat Interior', 'M Carbon Bucket Seats, Carbon Fiber Roof, M Track Package', 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800', 'new', 'Miami, FL'],
      
      // Mercedes-Benz
      ['Mercedes-Benz S-Class', 'S 500 4MATIC', 115000, 122000, 115000, 0, 340, 155, '4.8s', 'Obsidian Black Metallic', 'Nappa Leather Beige', '20" AMG Multi-Spoke', false, 'Five Seat Interior', 'MBUX Augmented Reality, Executive Rear Seat, Burmester 4D Sound', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800', 'new', 'Beverly Hills, CA'],
      ['Mercedes-Benz GLE', 'GLE 450 4MATIC', 69500, 74000, 69500, 2500, 350, 130, '5.7s', 'Selenite Grey', 'Black MB-Tex', '20" AMG Twin 5-Spoke', false, 'Five Seat Interior', 'AMG Line, Airmatic Suspension, Panoramic Sunroof, 360 Camera', 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800', 'used', 'Houston, TX'],
      ['Mercedes-AMG GT', '63 S 4-Door Coupe', 159000, 0, 159000, 0, 310, 196, '3.1s', 'AMG Green Hell Magno', 'Black Nappa Leather', '21" AMG Cross-Spoke', false, 'Five Seat Interior', 'AMG Performance Exhaust, Carbon Ceramic Brakes, AMG Track Pace', 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800', 'new', 'Las Vegas, NV'],
      
      // Audi
      ['Audi e-tron GT', 'Quattro Premium Plus', 105000, 112000, 97500, 0, 238, 152, '3.9s', 'Tactical Green', 'Black Leather', '21" 5-V-Spoke Dynamic', false, 'Five Seat Interior', '93.4 kWh Battery, 800V Architecture, Matrix LED Headlights', 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800', 'new', 'San Francisco, CA'],
      ['Audi Q7', '55 TFSI Prestige', 64900, 68000, 64900, 3400, 380, 130, '5.7s', 'Navarra Blue', 'Okapi Brown Valcona', '21" 5-Arm Design', false, 'Seven Seat Interior', 'Virtual Cockpit Plus, Quattro AWD, Bang & Olufsen 3D Sound', 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', 'used', 'Chicago, IL'],
      ['Audi RS6 Avant', 'Performance', 119000, 0, 119000, 0, 320, 190, '3.5s', 'Daytona Grey', 'Black Valcona Leather', '22" RS Design', false, 'Five Seat Interior', 'Sport Exhaust, Carbon Optic Package, RS Sport Suspension Plus', 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6b9?w=800', 'new', 'Denver, CO'],
      
      // Porsche
      ['Porsche 911', 'Carrera S', 122000, 0, 122000, 0, 310, 191, '3.5s', 'Shark Blue', 'Black/Bordeaux Red Leather', '20/21" Carrera S Wheels', false, 'Four Seat Interior', 'Sport Chrono Package, PASM, Porsche Communication Management 6.0', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800', 'new', 'Scottsdale, AZ'],
      ['Porsche Taycan', '4S Cross Turismo', 109000, 115000, 101500, 0, 215, 155, '3.9s', 'Frozen Blue Metallic', 'Slate Grey Leather', '21" Taycan Turbo Aero', false, 'Five Seat Interior', '93.4 kWh Performance Battery Plus, Adaptive Air Suspension', 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800', 'new', 'Portland, OR'],
      ['Porsche Cayenne', 'GTS Coupe', 138000, 0, 138000, 1800, 340, 168, '4.5s', 'Carrara White Metallic', 'Black/Bordeaux Red', '22" RS Spyder Design', false, 'Five Seat Interior', 'Sport Exhaust, PDCC, Porsche Dynamic Chassis Control, Carbon Interior', 'https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?w=800', 'demo', 'Austin, TX'],
      
      // Lexus
      ['Lexus ES', '350 F Sport', 48500, 52000, 48500, 2100, 410, 130, '6.6s', 'Ultrasonic Blue Mica', 'Black F Sport Leather', '19" F Sport Wheels', false, 'Five Seat Interior', 'Mark Levinson Audio, Triple-Beam LED, Lexus Safety System+ 2.5', 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800', 'used', 'Dallas, TX'],
      ['Lexus RX', '450h+ Luxury', 58900, 0, 51400, 0, 280, 112, '7.4s', 'Atomic Silver', 'Parchment Semi-Aniline', '20" 10-Spoke Alloy', false, 'Five Seat Interior', 'Plug-in Hybrid, Panoramic Moonroof, Heads-Up Display, Mark Levinson', 'https://images.unsplash.com/photo-1617654112368-307921291f42?w=800', 'new', 'Seattle, WA'],
      
      // Jaguar
      ['Jaguar F-Type', 'R-Dynamic P450', 79500, 0, 79500, 0, 320, 177, '4.4s', 'Santorini Black', 'Ebony Windsor Leather', '20" 5-Split Spoke', false, 'Two Seat Interior', 'Active Sport Exhaust, Adaptive Dynamics, 12.3" Interactive Driver Display', 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800', 'new', 'Miami Beach, FL'],
      ['Jaguar I-PACE', 'HSE', 72500, 79000, 65000, 1500, 234, 124, '4.5s', 'Yulong White', 'Ebony/Light Oyster', '20" 5-Split Spoke', false, 'Five Seat Interior', '90 kWh Battery, Adaptive Dynamics, Meridian Sound, 360 Camera', 'https://images.unsplash.com/photo-1617654112368-307921291f42?w=800', 'used', 'San Diego, CA'],
      
      // Range Rover
      ['Range Rover', 'Autobiography P530', 145000, 0, 145000, 0, 380, 140, '5.1s', 'Byron Blue', 'Navy/Tan Semi-Aniline', '23" 7-Split Spoke', false, 'Five Seat Interior', 'Executive Class Rear Seats, Meridian Signature, Electronic Air Suspension', 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', 'new', 'Greenwich, CT'],
      ['Range Rover Sport', 'HSE Dynamic P400', 89900, 0, 89900, 0, 370, 130, '5.9s', 'Santorini Black', 'Ebony/Ebony Leather', '22" 5-Split Spoke', false, 'Five Seat Interior', 'Black Exterior Pack, Adaptive Dynamics, Sliding Panoramic Roof', 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800', 'new', 'Boston, MA'],
      
      // Volvo
      ['Volvo XC90', 'Recharge T8 Inscription', 71900, 0, 64400, 0, 305, 112, '5.4s', 'Denim Blue Metallic', 'Blonde Nappa Leather', '21" 5-Double Spoke', false, 'Seven Seat Interior', 'Plug-in Hybrid, Air Suspension, Bowers & Wilkins, Pilot Assist', 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800', 'new', 'Minneapolis, MN'],
      ['Volvo S60', 'T8 Polestar Engineered', 69500, 0, 69500, 0, 340, 155, '4.3s', 'Thunder Grey', 'Charcoal Nappa/Nubuck', '19" Polestar Wheels', false, 'Five Seat Interior', 'Öhlins Suspension, Akebono Brakes, Gold Seatbelts, Carbon Fiber', 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800', 'new', 'Phoenix, AZ']
    ];

    for (const vehicle of vehicles) {
      await pool.query(`
        INSERT INTO vehicles (model, variant, price, original_price, after_tax_credit, mileage, range_epa, top_speed, acceleration, exterior_color, interior_color, wheels, autopilot, seat_layout, additional_features, image_url, status, location)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, vehicle);
    }

    // Get updated count
    const [result] = await pool.query('SELECT COUNT(*) as count FROM vehicles');
    
    res.json({
      success: true,
      message: `✅ Added ${vehicles.length} more vehicles successfully!`,
      total_vehicles: result[0].count,
      brands_added: ['BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Lexus', 'Jaguar', 'Range Rover', 'Volvo']
    });

  } catch (error) {
    console.error('Add vehicles error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add vehicles',
      error: error.message
    });
  }
});

export default router;
