const express = require('express'); // Express
const morgan = require('morgan'); // logging information about server requests/responses
const cors = require('cors'); // CORS
const csurf = require('csurf'); // CSRF protection
const helmet = require('helmet'); // security middleware
const cookieParser = require('cookie-parser'); // parsing cookies from requests

const { environment } = require('./config');
const isProduction = environment === 'production';
const routes = require('./routes');
const { ValidationError } = require('sequelize');

const app = express(); // initialize Express application

// MIDDLEWARE
app.use(morgan('dev')); // connect the morgan middleware for logging info about requests and responses
app.use(cookieParser()); // parse cookies
app.use(express.json()); // parse JSON bodies of requests with "Content-Type" of "application/json" 

// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}
// helmet helps set a variety of headers to better secure your app
app.use(helmet({
  contentSecurityPolicy: false
}));

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);
// csurf middleware will add a _csrf cookie that is HTTP-only (can't be read by JavaScript) to any server response. It also adds a method on all requests (req.csrfToken) that will be set to another cookie (XSRF-TOKEN) later on. These two cookies work together to provide CSRF (Cross-Site Request Forgery) protection for your application.

// make sure this is AFTER the app.use(csurf) to be able to be able to use the req.csrfToken
app.use(routes); // Connect all the routes


// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err); 
  // remember invoking next with err will go to the next err middleware
  // if nothing invoked with next then it'll go to the next middleware but not the err middleware
});


// Process sequelize errors
// catches Sequelize errors and formats them before sending the error response.
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
  }
  next(err);
});

// Error formatter
// Formats all the errors before returning a JSON response. It will include the error message, the errors array, and the error stack trace (if the environment is in development) with the status code of the error message.
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});










module.exports = app;