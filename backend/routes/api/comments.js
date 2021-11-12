const express = require('express');
const asyncHandler = require('express-async-handler');
// ! use requireAuth in order for user to add, remove, update their image
// ! figure out how restoreUser func works and how it can be applied
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const { Comment } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation'); // import handleValidationErrors

const router = express.Router();

const validateComment = [
  check('comment')
    .notEmpty()
    .withMessage('Please fill comment field.')
];

router.get('/',
// router.get('/:imageId(\\d+)',
asyncHandler(async(req, res) => {
  // const { imageId } = req.params;
  // const comments = await Comment.findAll();

  // const image = await Image.findByPk(imageId);
  // original below
  // const imageComments = await Comment.findAll({
  //   // where: {
  //   //   id: comments[imageId] 
  //   // }
  // });
  const imageComments = await Comment.findAll();
  // console.log('commentsBackend: ', comments);
  // console.log('imageComments: ',imageComments)
  res.json(imageComments);
}));

// router.get('/',
// router.get('/:theImageId(\\d+)',
// asyncHandler(async(req, res) => {
//   const { theImageId } = req.params;
//   // const comments = await Comment.findAll();

//   // const image = await Image.findByPk(imageId);
//   // original below

//   // find all comments that have the imageId that matches the req.params
//   const imageComments = await Comment.findAll({
//     where: {
//       imageId: theImageId 
//     }
//   });
//   // const imageComments = await Comment.findAll();
//   // console.log('commentsBackend: ', comments);
//   // console.log('imageComments: ',imageComments)
//   return res.json(imageComments);
// }));


module.exports = router;