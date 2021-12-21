function requireAuth(req, res, next) {
    if(req.cookies.userID && req.cookies.chucvu == "4"){
        res.redirect('/student');
        return ;
    }
    if(req.cookies.userID && req.cookies.chucvu == "3"){
        res.redirect('/teacher');
        return ;
    }
    next();
}
module.exports = requireAuth;