import mysql from 'mysql2/promise';

async function checkImages() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'aryals_dealer'
  });

  const [rows] = await connection.execute(
    'SELECT id, model, status, image_url FROM vehicles WHERE id IN (1,2,3,4,5) ORDER BY id LIMIT 5'
  );

  console.log('First 5 vehicles:');
  console.table(rows);

  await connection.end();
}

checkImages();
