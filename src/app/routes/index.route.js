const loginRouter = require('./login_registerRoute/login.route.js');
const registerRouter = require('./login_registerRoute/register.route.js');
const resetRouter = require('./login_registerRoute/reset.route.js');
const slugRouter = require('./slugRoute/slug.route.js');
const adminRouter = require('./adminRoute/admin.route.js');
const studentRouter = require('./studentRoute/student.route.js');
const teacherRouter = require('./teacherRoute/teacher.route.js');
var authMiddleware = require('../../middleware/loginMiddleware.js')
var logedMiddleware = require('../../middleware/logedMiddleware.js')
var studentMiddleware = require('../../middleware/studentMiddleware.js')
var teacherMiddleware = require('../../middleware/teacherMiddleware.js')
var adminMiddleware = require('../../middleware/adminMiddleware.js')

function route(app){
    app.use('/login',logedMiddleware,loginRouter);
    app.use('/register',teacherMiddleware,studentMiddleware,registerRouter);
    app.use('/reset',logedMiddleware,resetRouter);
    app.use('/admin',authMiddleware,teacherMiddleware,studentMiddleware,adminRouter);
    app.use('/student',authMiddleware,teacherMiddleware,adminMiddleware,studentRouter);
    app.use('/teacher',authMiddleware,studentMiddleware,adminMiddleware,teacherRouter);
    app.use('/',authMiddleware,slugRouter);
}
module.exports = route
