const pool = require('../models/db');

exports.createOrder = async (req, res) => {
  const { user_id } = req.body;

  try {
    const cart = await pool.query(
      `SELECT c.quantity, p.price
       FROM cart_items c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id=$1`,
      [user_id]
    );

    if (cart.rows.length === 0)
      return res.status(400).json({ error: 'Cart is empty' });

    const total = cart.rows.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    const order = await pool.query(
      `INSERT INTO orders (user_id, total, status)
       VALUES ($1, $2, 'completed')
       RETURNING *`,
      [user_id, total]
    );

    await pool.query(
      `DELETE FROM cart_items WHERE user_id=$1`,
      [user_id]
    );

    res.status(201).json(order.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};