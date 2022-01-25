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

router.post('/newAlbum', requireAuth,asyncHandler(async(req, res) => {
  const newAlbum = await Album.create({
    userId: req.user.id,
    title,
  })
  return res.json({ newAlbum })
}))

module.exports = router;