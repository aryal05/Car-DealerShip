-- Add admin and image management tables
USE aryals_dealer;

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicle images table (multiple images per vehicle)
CREATE TABLE IF NOT EXISTS vehicle_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vehicle_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
);

-- Banner images table
CREATE TABLE IF NOT EXISTS banner_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  route VARCHAR(50) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin (username: admin, password: admin123)
INSERT INTO admin_users (username, password, email) VALUES 
('admin', '$2a$10$rFGvFqKxN7k5XqjqQXZ7DeqX7D6X5h7qZqQxN7k5XqjqQXZ7DeqX7D', 'admin@aryalsdealer.com');

-- Add default banner images for routes
INSERT INTO banner_images (route, image_url, display_order) VALUES
('home', 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1920&q=80', 1),
('home', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80', 2),
('home', 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1920&q=80', 3),
('about', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600', 1),
('finance', 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1600', 1),
('contact', 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1600', 1);

-- Migrate existing vehicle images to vehicle_images table
INSERT INTO vehicle_images (vehicle_id, image_url, is_primary, display_order)
SELECT id, image_url, true, 1
FROM vehicles
WHERE image_url IS NOT NULL;

-- Add more images for existing vehicles (sample data)
INSERT INTO vehicle_images (vehicle_id, image_url, is_primary, display_order)
SELECT id, 
  CASE 
    WHEN RAND() < 0.5 THEN 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800'
    ELSE 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800'
  END,
  false,
  2
FROM vehicles
LIMIT 50;
