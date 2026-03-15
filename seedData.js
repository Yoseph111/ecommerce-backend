require('dotenv').config();
const pool = require('./models/db');
const bcrypt = require('bcrypt');

async function seed() {
  try {
    const passwordHash = await bcrypt.hash('password123', 10);

    // 1️⃣ Insert Users and RETURN ids
    const usersResult = await pool.query(`
      INSERT INTO users (name, email, password)
      VALUES
      ('Alice', 'alice@example.com', '${passwordHash}'),
      ('Bob', 'bob@example.com', '${passwordHash}')
      ON CONFLICT (email)
      DO UPDATE SET name = EXCLUDED.name
      RETURNING id, email;
    `);

    const users = usersResult.rows;

    const alice = users.find(u => u.email === 'alice@example.com');
    const bob = users.find(u => u.email === 'bob@example.com');

    // 2️⃣ Insert Products and RETURN ids
    const productsResult = await pool.query(`
      INSERT INTO products (name, description, price, image_url, stock)
      VALUES
      ('Gaming Laptop','High performance laptop',1299.99,'',10),
      ('Wireless Headphones','Noise-cancelling',199.99,'',25),
      ('Smartphone','Latest model smartphone',899.99,'',50),
      ('Coffee Maker','Brews the best coffee',49.99,'',30),
      ('Running Shoes','Comfortable and durable',79.99,'',20)
      ON CONFLICT (name)
      DO UPDATE SET stock = EXCLUDED.stock
      RETURNING id, name;
    `);

    const products = productsResult.rows;

    const laptop = products.find(p => p.name === 'Gaming Laptop');
    const headphones = products.find(p => p.name === 'Wireless Headphones');
    const phone = products.find(p => p.name === 'Smartphone');

    // 3️⃣ Insert Cart Items using REAL ids
    await pool.query(`
      INSERT INTO cart_items (user_id, product_id, quantity)
      VALUES
      ($1, $2, 1),
      ($1, $3, 2),
      ($4, $5, 1)
      ON CONFLICT DO NOTHING;
    `, [
      alice.id,
      laptop.id,
      headphones.id,
      bob.id,
      phone.id
    ]);

    // 4️⃣ Insert Orders
    await pool.query(`
      INSERT INTO orders (user_id, total, status)
      VALUES
      ($1, 1699.97, 'completed'),
      ($2, 899.99, 'pending')
      ON CONFLICT DO NOTHING;
    `, [alice.id, bob.id]);

    console.log('✅ Seed data inserted successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();