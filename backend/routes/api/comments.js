const express = require('express');
const asyncHandler = require('express-async-handler');
// ! use requireAuth in order for user to add, remove, update their image
// ! figure out how restoreUser func works and how it can be applied
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const { Comment } = require('../../db/models');

const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation'); // import handleValidationErrors

const router = express.Router();

const validateComment = [
  check('comment')
    .notEmpty()
    .withMessage('Please provide a value for comment.')
    .isLength({ min: 1 })
    .withMessage('Please provide a comment with at least 1 character.')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a comment.'),
  handleValidationErrors,
];

router.get('/',
// router.get('/:imageId(\\d+)',
asyncHandler(async(req, res) => {
  const imageComments = await Comment.findAll();
  res.json(imageComments);
}));

router.post('/:imageId(\\d+)/newComment',
// router.post('/newComment',
  validateComment,
  requireAuth,
  asyncHandler(async(req, res) => {
    const { imageId } = req.params;
    const { userId,  comment } = req.body;

    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      const newComment = await Comment.create({
        userId: req.user.id, // old
        // userId: userId, // new
        imageId: imageId, // ! Here lies the problem
        // imageId,
        comment
      })
      return res.json({ newComment });
    } else {
      const errors = validationErrors.Array().map((err) => err.msg);
      return res.json(errors);
    }

  })
);


router.delete('/:commentId(\\d+)/delete', 
  requireAuth,
  asyncHandler(async(req, res) => {
  const { commentId } = req.params;
    
  const comment = await Comment.findByPk(commentId);
  
  
  await Comment.destroy({ where: { id: comment.id}})
  
  res.status(204);
  return res.json({ comment });
}))


module.exports = router;