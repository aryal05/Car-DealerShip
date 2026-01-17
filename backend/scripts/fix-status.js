import mysql from 'mysql2/promise';

async function fixStatusColumn() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'aryals_dealer'
    });

    console.log('Connected to database...');

    // Change status column to support new values
    await connection.query(`
      ALTER TABLE vehicles 
      MODIFY COLUMN status VARCHAR(50) DEFAULT 'Available'
    `);
    
    console.log('✅ Status column updated successfully!');
    
    // Update existing records
    await connection.query(`
      UPDATE vehicles 
      SET status = CASE 
        WHEN status IN ('new', 'demo', 'Available') THEN 'Available'
        WHEN status IN ('used') THEN 'Used'
        WHEN status IN ('Sold') THEN 'Sold Out'
        WHEN status IN ('Reserved') THEN 'Reserved'
        ELSE 'Available'
      END
    `);
    
    console.log('✅ Existing records updated!');
    
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fixStatusColumn();
