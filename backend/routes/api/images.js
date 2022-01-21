const express = require('express');
const asyncHandler = require('express-async-handler');
// ! use requireAuth in order for user to add, remove, update their image
// ! figure out how restoreUser func works and how it can be applied
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
// restoreUser will restore the session user based on the contents of the JWT cookie
// requiring a session user to be authenticated before accessing a route.
const { Image } = require('../../db/models');
//  must ust the models to get the associations
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation'); // import handleValidationErrors
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3.js');

const router = express.Router();

const validateImage = [
  // check('imageUrl')
  //   .notEmpty()
  //   .withMessage('Please provide a Url.')
  //   .exists({ checkFalsy: true })
  //   .withMessage('Please provide a URL for your image.')
  //   .isURL({ require_protocol: false, require_host: false })
  //   .withMessage('Please provide a valid Url.'),
  // check('imageUrl')
  //   .notEmpty()
  //   .withMessage('Please submit a valid image.')
  // ,
  check('imageTitle')
    .notEmpty()
    .withMessage('Please provide an image title')
    .isLength({ min:2, max: 150 })
    .withMessage('Please provide a title with a length between 2 - 150 characters.'),
  check('content')
    .notEmpty()
    .withMessage('Please provide a description.'),
  handleValidationErrors,
];

const validateEditedImage = [
  check('imageTitle')
    .notEmpty()
    .withMessage('Please provide an image title'),
  check('content')
    .notEmpty()
    .withMessage('Please provide a description.')
    .isLength({ min: 1, max: 1000 })
    .withMessage('Please provide a description between 1-1000 characters.'),
  handleValidationErrors,
];


// GET all images  
router.get('/', asyncHandler(async(req, res) => {
  // create a promise to get all images
  const images = await Image.findAll();
  // send it to the front end
  res.json(images);
}));

// POST new image
router.post('/newImage',
  singleMulterUpload("image"),
  // file('mimetype').custom((val) => val.endsWith('png' || 'jpg' || 'jpeg')),
  validateImage, 
  requireAuth,
  asyncHandler(async(req, res) => {
    // const { imageUrl, imageTitle, content } = req.body;
    const { imageTitle, content } = req.body;
    const newImageUploadUrl = await singlePublicFileUpload(req.file);
    // const { imageUrl, imageTitle, content } = req.body;
    // console.log('=====>', req)
    const validationErrors = validationResult(req);
  
    if (validationErrors.isEmpty()) {
      const newImage = await Image.create({ 
        userId: req.user.id,
        // imageUrl, 
        imageUrl:newImageUploadUrl,
        imageTitle, 
        content  
      });

    return res.json({ newImage });
    } else {
      const errors = validationErrors.Array().map((err) => err.msg);
      return res.json(errors);
    }

    // if (!user) {
    //   const err = new Error('Login failed');
    //   err.status = 401;
    //   err.title = 'Login failed';
    //   err.errors = ['The provided credentials were invalid.'];
    //   return next(err);
    // }
    
    // console.log('theNewImage: ', newImage);
  })
);

// PATCH edit image 
router.patch('/:imageId(\\d+)/edit',
  validateEditedImage, 
  requireAuth,
  asyncHandler(async(req, res) => {
    const { imageTitle, content } = req.body;
  
    const { imageId } = req.params;
    
    const image = await Image.findByPk(imageId);
    
    // const { imageUrl, imageTitle, content } = req.body;

    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      await image.update({ 
        imageTitle, 
        content  
      });
      
      const updatedImg = await Image.findByPk(imageId);
  
      // console.log(res, 'the happy path :)');
      return res.json({ updatedImg });
    } else {
      const errors = validationErrors.Array().map((err) => err.msg);
      return res.json(errors);
    }

  })
);

router.delete('/:imageId(\\d+)/delete', 
  requireAuth,
  asyncHandler(async(req, res) => {
  const { imageId } = req.params;

  const image = await Image.findByPk(imageId);
  // if (!image) throw new Error('Cannot find item.');
    // console.log('.........> ', image);
  await Image.destroy({ where: { id: image.id}})
  // await Image.destroy();
  res.status(204);
  return res.json({ image });
}))

const searchErr = (err) => {
  const error = new Error(err);
  error.status = 401;
  error.title = "Search failed";
  error.errors = [err];
  return error;
}

router.get('/search/:searched', asyncHandler(async(req, res) => {
  const images = await Image.findAll({
    where: {
      imageTitle: { [Op.iLike]: `%${searched}%`},
    }
  })

  if (images) {
    return res.json(images);
  } else {
    return next(searchErr('Image does not exist'));
  }
}))


module.exports = router;