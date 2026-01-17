-- Create database
CREATE DATABASE IF NOT EXISTS aryals_dealer;
USE aryals_dealer;

-- Vehicles table
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
);

-- Insert sample vehicles (Tesla-inspired data)
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

('Model 3', 'Long Range', 45990, 0, 38500, 450, 358, 145, '4.2s', 'Deep Blue Metallic', 'Black and White Interior', '19" Sport Wheels', true, 'Five Seat Interior', 'Premium Interior, Glass Roof', 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-3-Main-Hero-Desktop-LHD.jpg', 'Used', 'Chicago, USA');
