import pool from './database.js';

async function updateVehicleYears() {
  try {
    // First, check if year column exists
    const [columns] = await pool.query(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = 'vehicles' 
      AND COLUMN_NAME = 'year'
    `);

    if (columns.length === 0) {
      console.log('⚠️  Year column does not exist. Running migration...');
      // Add year column
      await pool.query('ALTER TABLE vehicles ADD COLUMN year INT AFTER model');
      console.log('✅ Year column added successfully!');
    } else {
      console.log('✅ Year column already exists');
    }

    // Update vehicles without years
    const [vehiclesWithoutYear] = await pool.query('SELECT COUNT(*) as count FROM vehicles WHERE year IS NULL');
    
    if (vehiclesWithoutYear[0].count > 0) {
      console.log(`📝 Updating ${vehiclesWithoutYear[0].count} vehicles without years...`);
      
      // Update based on status with more realistic years
      await pool.query(`
        UPDATE vehicles 
        SET year = CASE
          WHEN status = 'new' THEN 2024
          WHEN status = 'Available' THEN 2023
          WHEN status = 'Used' THEN 2022
          WHEN status = 'Sold Out' THEN 2021
          ELSE 2023
        END
        WHERE year IS NULL
      `);
      
      console.log('✅ Vehicle years updated successfully!');
    } else {
      console.log('✅ All vehicles already have years');
    }

    // Show summary
    const [yearSummary] = await pool.query(`
      SELECT year, COUNT(*) as count 
      FROM vehicles 
      WHERE year IS NOT NULL 
      GROUP BY year 
      ORDER BY year DESC
    `);
    
    console.log('\n📊 Year Distribution:');
    yearSummary.forEach(row => {
      console.log(`   ${row.year}: ${row.count} vehicles`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updateVehicleYears();
