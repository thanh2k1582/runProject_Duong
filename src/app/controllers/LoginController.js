const loginAccount = require('../model/loginDB')
const bcrypt = require("bcrypt");

class LoginController{
    login(req,res){
        res.render('register_login/login');
    }
    async submit(req,res){
        var email = req.body.email;
        var password = req.body.password;
        const user = await loginAccount.findOne({ email: email });
        if(user){
            const validPassword = await bcrypt.compare(password, user.mk);
            if (validPassword) {
                res.cookie('userID',user._id)
                res.cookie('mssv',email)
                res.cookie('chucvu',user.chucvu)
                if(user.chucvu == "4"){
                    res.redirect('/student')
                    return;
                }
                if(user.chucvu == "3"){
                    res.redirect('/teacher')
                }
                if(user.chucvu == "2"){
                    res.redirect('/admin')
                }
              } else {
                res.status(400).json({ error: "Sai mật khẩu" });
              }
        }
        else{
            res.json("ko có user")
        }
        //  loginAccount.findOne({email:email},function(err,docs){
        //     if (err){
        //         console.log(err)
        //     }
        //     else{
        //         if(docs == null){
        //             res.json("email không tồn tại")
        //             return;
        //         }
        //         if(docs.mk !== password){
        //             res.json("mật khẩu không đúng")
        //             // docs.email.value() = req.body.email;
        //             return ;
        //         }
        //         res.cookie('userID',docs._id)
        //         res.cookie('mssv',email)
        //         res.cookie('chucvu',docs.chucvu)
        //         if(docs.chucvu == "4"){
        //             res.redirect('/student')
        //             return;
        //         }
        //         if(docs.chucvu == "3"){
        //             res.redirect('/teacher')
        //         }
        //         if(docs.chucvu == "2"){
        //             res.redirect('/admin')
        //         }
        //     }
        // })
    }
}
module.exports = new LoginController;
// if(loginAccount.email == req.body.email){
//     if(loginAccount.mk == req.body.mk){
//         res.render('student');
//         return ;
//     }
//     else {
//         res.status(400).json({error: 'lỗi sai mật khẩu'});
//     }
// }
// else {
//     res.status(400).json({error: 'lỗi sai email'});
//     console.log(req.body.email)
//     console.log(req.body.mk)
// }
// return ;