/* eslint-disable no-undef */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

/*
 * Database setup
 */

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/*
 * Middlewares
 */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);
app.use(routes);

app.listen(process.env.PORT || 3001);
