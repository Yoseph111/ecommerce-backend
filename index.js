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

app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/auth', authRoutes);
app.use('/orders', orderRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'E-Commerce API running 🚀' });
});


// Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce API',
      version: '1.0.0',
      description: 'API documentation',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// LOCAL SERVER ONLY
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;