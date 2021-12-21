function requireAuth(req, res, next) {
    if(req.cookies.chucvu == "3"){
        res.redirect('/teacher');
        return ;
    }
    next();
}
module.exports = requireAuth;