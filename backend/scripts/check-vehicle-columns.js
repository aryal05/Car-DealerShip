import pool from '../config/database.js';

const checkVehicleColumns = async () => {
  try {
    const [columns] = await pool.query('DESCRIBE vehicles');
    console.log('Vehicle table columns:');
    columns.forEach(col => console.log(`- ${col.Field} (${col.Type})`));
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

checkVehicleColumns();
