const express = require('express');
const router = express.Router();
const studentController = require('../../controllers/studenController/StudentController.js')
var authMiddleware = require('../../../middleware/loginMiddleware.js')
router.post('/newRegister',studentController.store)
router.use('/newRegister',studentController.newRegister)
router.post('/:id/report',studentController.report)
router.use('/:id/edit',studentController.edit)
router.get('/:id/delete',studentController.delete)
router.put('/:id',studentController.update)
router.use('/',authMiddleware,studentController.index)
module.exports =router