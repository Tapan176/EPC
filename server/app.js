/* eslint-disable no-restricted-syntax */
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const authRoutes = require('./src/auth/route');
const { errorHandler } = require('./src/middleware/errorHandler');

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;
const databaseUrl = process.env.DATABASE_URL;

mongoose.connect(
  databaseUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
).then(() => {
  console.log('Database connected successfully');
}).catch((error) => {
  console.log(error);
});

app.use(cookieParser());
app.use(session({
  secret: 'epc',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 1000,
    httpOnly: true,
  },
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('./server/public/images'));
app.use(authRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;