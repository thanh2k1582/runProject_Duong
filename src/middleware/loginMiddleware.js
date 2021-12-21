const loginAccount = require('../app/model/loginDB.js')
function requireAuth(req, res, next) {
    if(!req.cookies.userID){
        res.redirect('/login');
        return ;
    }
    loginAccount.findOne({id:req.cookies.userID},function(err,docs){
        if(docs == null){
            res.redirect('/login');
        }
    })
    next();
}
module.exports = requireAuth;