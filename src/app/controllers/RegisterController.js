const loginAccount = require('../model/loginDB')
const bcrypt = require("bcrypt");
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("B4c0/\/", salt);
class RegisterController{
    register(req,res){
        res.render('register_login/register');
    }
    async newAccount(req,res){
    const body = req.body;
    const newAcc = new loginAccount(req.body)
    const salt = await bcrypt.genSalt(10);
    newAcc.mk = await bcrypt.hash(newAcc.mk, salt);
    newAcc.save()
        .then(()=>{
            res.redirect('/admin')}) //quay về trang chủ
        .catch(erro => {
    })
    }
}
module.exports = new RegisterController;