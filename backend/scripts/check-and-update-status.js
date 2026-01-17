import mysql from 'mysql2/promise';

async function checkAndUpdateStatus() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'aryals_dealer'
    });

    console.log('Connected to database...\n');

    // Check current status values
    const [currentRows] = await connection.execute(
      'SELECT id, model, status FROM vehicles ORDER BY id'
    );

    console.log('📊 Current vehicle statuses:');
    console.table(currentRows);

    // Count status values
    const [statusCounts] = await connection.execute(
      'SELECT status, COUNT(*) as count FROM vehicles GROUP BY status'
    );

    console.log('\n📈 Status distribution:');
    console.table(statusCounts);

    // Update any old status values to new ones
    console.log('\n🔄 Updating to new status values...');
    
    await connection.execute(`
      UPDATE vehicles 
      SET status = CASE 
        WHEN LOWER(status) IN ('new', 'available') THEN 'Available'
        WHEN LOWER(status) IN ('used') THEN 'Used'
        WHEN LOWER(status) IN ('sold', 'sold out') THEN 'Sold Out'
        WHEN LOWER(status) IN ('demo', 'reserved') THEN 'Reserved'
        ELSE 'Available'
      END
    `);

    // Check updated values
    const [updatedRows] = await connection.execute(
      'SELECT id, model, status FROM vehicles ORDER BY id'
    );

    console.log('\n✅ Updated vehicle statuses:');
    console.table(updatedRows);

    // Final count
    const [finalCounts] = await connection.execute(
      'SELECT status, COUNT(*) as count FROM vehicles GROUP BY status'
    );

    console.log('\n📊 Final status distribution:');
    console.table(finalCounts);

    console.log('\n✅ Database update complete!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (connection) await connection.end();
  }
}

checkAndUpdateStatus();
