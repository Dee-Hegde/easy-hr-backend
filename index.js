const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
//
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

// const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

app.listen(process.env.APP_PORT, () => {
  console.log(`Running on port ${process.env.APP_PORT}`);
});
