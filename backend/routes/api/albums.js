const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const { Album } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize')

const router = express.Router();

router.get('/', asyncHandler(async(req, res) => {
  const albums = await Album.findAll()
  res.json(albums);
}))

const validateAlbum = [
  check('title')
    .notEmpty()
    .withMessage('Please provide a title')
    .isLength({ min: 1, max: 200 })
    .withMessage('Please provide a title between 1-200 characters')
];

router.post('/newAlbum', validateAlbum, requireAuth, asyncHandler(async(req, res) => {
  const { title } = req.body;
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    const newAlbum = await Album.create({
      userId: req.user.id,
      title,
    })
    return res.json({ newAlbum })
  } else {
    const errors = validationErrors.Array().map((err) => err.msg);
    return res.json(errors);
  }

}))

router.put('/:albumId(\\d+)/:albumName/edit', validateAlbum, requireAuth, asyncHandler(async(req, res) => {
  const { title } = req.body;
  const { albumId } = req.params;
  const album = await Album.findByPk(albumId);

  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    await album.update({
      title
    })
  

  const updatedAlbum = await Album.findByPk(albumId);
  return res.json({updatedAlbum});
  } else {
    const errors = validationErrors.Array().map((err) => err.msg);
    return res.json(errors);
  }


}))

module.exports = router;