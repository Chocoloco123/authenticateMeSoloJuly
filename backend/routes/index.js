// backend/routes/index.js
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

router.use('/api', apiRouter);

router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken()); // XSRF-TOKEN is a type of cookie that helps provide CSRF protection for your app
  res.send('Hello World!');
});

module.exports = router;