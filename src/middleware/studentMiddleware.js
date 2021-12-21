function requireAuth(req, res, next) {
    if(req.cookies.chucvu == "4"){
        res.redirect('/student');
        return ;
    }
    next();
}
module.exports = requireAuth;