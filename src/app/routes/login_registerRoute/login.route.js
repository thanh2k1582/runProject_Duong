const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/LoginController.js')

router.use('/submit',loginController.submit)
router.use('/',loginController.login)

module.exports =router