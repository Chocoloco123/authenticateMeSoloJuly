const express = require('express'); // Express
const morgan = require('morgan'); // logging information about server requests/responses
const cors = require('cors'); // CORS
const csurf = require('csurf'); // CSRF protection
const helmet = require('helmet'); // security middleware
const cookieParser = require('cookie-parser'); // parsing cookies from requests

const { environment } = require('./config');
const isProduction = environment === 'production';
const routes = require('./routes');

const app = express(); // initialize Express application

app.use(morgan('dev')); // connect the morgan middleware for logging info about requests and responses
app.use(cookieParser()); // parse cookies
app.use(express.json()); // parse JSON bodies of requests with "Content-Type" of "application/json" 
app.use(routes); // Connect all the routes

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





module.exports = app;