class SlugController{
    index(req,res){
        res.render('home')
    }
    logout(req,res){
        res.clearCookie('userID');
        res.clearCookie('mssv');
        res.clearCookie('chucvu');
        res.redirect('/login')
    }
}
module.exports = new SlugController