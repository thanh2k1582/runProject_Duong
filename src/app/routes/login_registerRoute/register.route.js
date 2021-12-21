const express = require('express');
const router = express.Router();
const registerController = require('../../controllers/RegisterController.js')

router.use('/new',registerController.newAccount)
router.use('/',registerController.register)

module.exports =router