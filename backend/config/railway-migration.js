import pool from './database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runRailwayMigration() {
  try {
    console.log('🚀 Running Railway migration...\n');
    
    // Check if year column exists
    const [columns] = await pool.query(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = 'vehicles' 
      AND COLUMN_NAME = 'year'
    `);

    if (columns.length === 0) {
      console.log('📝 Adding year column...');
      await pool.query('ALTER TABLE vehicles ADD COLUMN year INT AFTER model');
      console.log('✅ Year column added!');
    } else {
      console.log('✅ Year column already exists');
    }

    // Update vehicles without years
    const [vehiclesWithoutYear] = await pool.query('SELECT COUNT(*) as count FROM vehicles WHERE year IS NULL');
    
    if (vehiclesWithoutYear[0].count > 0) {
      console.log(`\n📝 Updating ${vehiclesWithoutYear[0].count} vehicles without years...`);
      
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
      
      console.log('✅ Vehicles updated!');
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
    
    console.log('\n📊 Year Distribution on Railway:');
    yearSummary.forEach(row => {
      console.log(`   ${row.year}: ${row.count} vehicles`);
    });

    console.log('\n✅ Railway migration completed successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

runRailwayMigration();
