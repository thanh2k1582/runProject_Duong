const express = require('express');
const router = express.Router();
const teacherController = require('../../controllers/TeacherController/TeacherController.js')
var authMiddleware = require('../../../middleware/loginMiddleware.js')
router.post('/newRegister',teacherController.store)
router.post('/:id/report',teacherController.report)
router.use('/newRegister',teacherController.newRegister)
router.use('/:id/edit',teacherController.edit)
router.get('/:id/delete',teacherController.delete)
router.put('/:id',teacherController.update)
router.use('/',teacherController.index)
module.exports =router