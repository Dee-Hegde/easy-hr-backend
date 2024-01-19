const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const cors = require('cors');
app.use(cors());
app.use(express.json());
//
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);

app.listen(process.env.APP_PORT, () => {
  console.log(`Running on port ${process.env.APP_PORT}`);
});
