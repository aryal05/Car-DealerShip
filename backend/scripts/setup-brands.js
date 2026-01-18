import pool from '../config/database.js';

const createBrandsTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS brands (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE,
      image_url VARCHAR(255) NOT NULL,
      display_order INT DEFAULT 0,
      is_active TINYINT(1) DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_display_order (display_order),
      INDEX idx_is_active (is_active)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  const insertDefaults = `
    INSERT IGNORE INTO brands (name, image_url, display_order) VALUES
    ('Mercedes-Benz', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80', 1),
    ('Audi', 'https://images.unsplash.com/photo-1610768764270-790fbec18178?w=800&q=80', 2),
    ('BMW', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80', 3),
    ('Porsche', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80', 4),
    ('Tesla', 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80', 5),
    ('Lexus', 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80', 6),
    ('Jaguar', 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80', 7),
    ('Volvo', 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&q=80', 8);
  `;

  try {
    await pool.query(sql);
    console.log('✓ Brands table created successfully');
    
    await pool.query(insertDefaults);
    console.log('✓ Default brands inserted');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating brands table:', error.message);
    process.exit(1);
  }
};

createBrandsTable();
