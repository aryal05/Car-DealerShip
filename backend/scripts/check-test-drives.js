import pool from '../config/database.js';

const checkTestDrives = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM test_drives');
    console.log('Test Drives in DB:', JSON.stringify(rows, null, 2));
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

checkTestDrives();
