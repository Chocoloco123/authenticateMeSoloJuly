const express = require('express');
const asyncHandler = require('express-async-handler');
// ! use requireAuth in order for user to add, remove, update their image
// ! figure out how restoreUser func works and how it can be applied
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
// restoreUser will restore the session user based on the contents of the JWT cookie
// requiring a session user to be authenticated before accessing a route.
const { Image } = require('../../db/models');
//  must ust the models to get the associations
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation'); // import handleValidationErrors

const router = express.Router();

const validateImage = [
  check('imageUrl')
    .notEmpty()
    .isURL({ require_protocol: false, require_host: false }),
  check('imageTitle')
    .notEmpty(),
];


// GET all images  
router.get('/', asyncHandler(async(req, res) => {
  // create a promise to get all images
  const images = await Image.findAll();
  // send it to the front end
  res.json(images);
}));

// POST new image
router.post('/',
  validateImage, 
  requireAuth,
  asyncHandler(async(req, res) => {
    // const { userId, albumId, imageUrl, imageTitle } = req.body;
    const { imageUrl, imageTitle, content } = req.body;
    const newImage = await Image.create({ 
      userId,
      albumId,
      imageUrl, 
      imageTitle, 
      content  
    });

    return res.json({ newImage });
  })
);



module.exports = router;