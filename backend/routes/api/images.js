const express = require('express');
const asyncHandler = require('express-async-handler');
// ! use requireAuth in order for user to add, remove, update their image
// ! figure out how restoreUser func works and how it can be applied
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Image } = require('../../db/models');
//  must ust the models to get the associations
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// GET all images  
router.get('/', asyncHandler(async(req, res) => {
  // create a promise to get all images
  const images = await Image.findAll();
  // send it to the front end
  res.json(images);
}));



module.exports = router;