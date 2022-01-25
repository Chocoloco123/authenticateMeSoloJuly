const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const { Album } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Op } = require('sequelize')

const router = express.Router();

router.get('/', asyncHandler(async(req, res) => {
  // console.log('(outside)this is the users ID: ',req.user.id)
  // const { userId } = req.body;
  const albums = await Album.findAll(
  //   {
  //   where: {
  //     userId: req.user.id
  //   }
  // }
  );
  // console.log('this is the users ID: ',req.user.id)
  // if (images) {
    // return res.json(albums);

  // }
  res.json(albums);
}))

module.exports = router;