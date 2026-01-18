import pool from '../config/database.js';

const checkAndCreateTable = async () => {
  try {
    // Check if test_drives table exists
    const [tables] = await pool.query(`
      SELECT TABLE_NAME 
      FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = 'test_drives'
    `);

    if (tables.length === 0) {
      console.log('❌ test_drives table does not exist. Creating it now...');
      
      // Create the table
      await pool.query(`
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
      `);
      
      console.log('✅ test_drives table created successfully!');
    } else {
      console.log('✅ test_drives table already exists!');
    }

    // Check if there's any data
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM test_drives');
    console.log(`📊 Total test drive requests: ${rows[0].count}`);
    
    // Show sample data if exists
    if (rows[0].count > 0) {
      const [data] = await pool.query('SELECT id, full_name, email, status, created_at FROM test_drives ORDER BY created_at DESC LIMIT 5');
      console.log('\n📋 Recent test drive requests:');
      data.forEach(td => {
        console.log(`  - #${td.id}: ${td.full_name} (${td.email}) - Status: ${td.status}`);
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkAndCreateTable();
