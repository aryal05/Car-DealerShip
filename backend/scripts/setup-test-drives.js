import pool from '../config/database.js';

const createTestDrivesTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS test_drives (
      id INT AUTO_INCREMENT PRIMARY KEY,
      vehicle_id INT NOT NULL,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      address TEXT NOT NULL,
      preferred_date DATE NOT NULL,
      preferred_time VARCHAR(50) NOT NULL,
      message TEXT,
      status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
      INDEX idx_status (status),
      INDEX idx_preferred_date (preferred_date),
      INDEX idx_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  try {
    await pool.query(sql);
    console.log('✓ Test drives table created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating test drives table:', error.message);
    process.exit(1);
  }
};

createTestDrivesTable();
