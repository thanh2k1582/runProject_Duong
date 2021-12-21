const express = require('express');
const router = express.Router();
const slugController = require('../../controllers/slugController/SlugController.js')

router.use('/logout',slugController.logout)
router.use('/',slugController.index)
router.use('/:slug',slugController.index)

module.exports =router