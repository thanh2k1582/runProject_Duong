function requireAuth(req, res, next) {
    if(req.cookies.chucvu == "2"){
        res.redirect('/admin');
        return ;
    }
    next();
}
module.exports = requireAuth;