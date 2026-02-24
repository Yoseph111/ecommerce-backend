require('dotenv').config();
const pool = require('./models/db');
const bcrypt = require('bcrypt');

async function seed() {
  try {
    const passwordHash = await bcrypt.hash('password123', 10);

    // Clear tables first (safe for demo)
    await pool.query('DELETE FROM cart_items');
    await pool.query('DELETE FROM orders');
    await pool.query('DELETE FROM users');
    await pool.query('DELETE FROM products');

    // Users
    await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3),
              ($4, $5, $6)`,
      [
        'Alice', 'alice@example.com', passwordHash,
        'Bob', 'bob@example.com', passwordHash
      ]
    );

    // Products
    await pool.query(
      `INSERT INTO products (name, description, price, image_url, stock)
       VALUES 
       ('Gaming Laptop','High performance laptop',1299.99,'',10),
       ('Wireless Headphones','Noise-cancelling',199.99,'',25),
       ('Smartphone','Latest model smartphone',899.99,'',50),
       ('Coffee Maker','Brews the best coffee',49.99,'',30),
       ('Running Shoes','Comfortable and durable',79.99,'',20)`
    );

    // Cart
    await pool.query(
      `INSERT INTO cart_items (user_id, product_id, quantity)
       VALUES
       (1, 1, 1),
       (1, 2, 2),
       (2, 3, 1)`
    );

    // Orders
    await pool.query(
      `INSERT INTO orders (user_id, total, status)
       VALUES
       (1, 1699.97, 'completed'),
       (2, 899.99, 'pending')`
    );

    console.log('✅ Seed data inserted successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();