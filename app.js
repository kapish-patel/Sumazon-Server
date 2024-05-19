require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const productsRouter = require('./routes/products.js');
const usersRouter = require('./routes/user.js');
const authRouter = require('./routes/auth.js');
const categoryRouter = require('./routes/category.js');

const app = express();

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route setup
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
// app.use('/auth', authRouter);


// Error handling middleware
app.use(function(req, res, next) {
  next(createError(404)); // Catch 404 and forward to error handler
});

app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
