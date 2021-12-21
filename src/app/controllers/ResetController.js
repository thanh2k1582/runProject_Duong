class ResetController{
    reset(req,res){
        res.render('register_login/reset');
    }
}
module.exports = new ResetController;