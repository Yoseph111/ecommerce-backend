require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/auth', authRoutes);
app.use('/orders', orderRoutes);

app.get('/app', (req, res) => {
  res.json({ message: 'E-Commerce API is running 🚀' });
});


// ✅ SWAGGER CONFIG
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce API',
      version: '1.0.0',
      description: 'API documentation for the E-Commerce backend'
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// ✅ Export for Vercel
module.exports = app;


// ✅ Run locally only
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}