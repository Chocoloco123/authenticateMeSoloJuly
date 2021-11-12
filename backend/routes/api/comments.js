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

router.get('/:imageId(\\d+)',
asyncHandler(async(req, res) => {
  const { imageId } = req.params;
  const comments = await Comment.findAll();
  const imageComments = await findAll({
    where: {
      id: imageId
    }
  });
  res.json();
})
)


module.exports = router;