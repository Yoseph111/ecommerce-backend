const pool = require('../models/db');

exports.addItemToCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO cart_items (user_id, product_id, quantity)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [user_id, product_id, quantity]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCartByUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM cart_items WHERE user_id=$1`,
      [user_id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};