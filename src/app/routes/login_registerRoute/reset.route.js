const express = require('express');
const router = express.Router();
const resetController = require('../../controllers/ResetController.js')

router.use('/',resetController.reset)

module.exports =router