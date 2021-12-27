const {mutipleMongooseToObject} = require('../../../util/mongoose.js')					
const {mongooseToObject} = require('../../../util/mongoose.js')					
const studentDB = require('../../model/studentDB.js')
class StudentController{
    index(req,res,next){
        studentDB.find({userID: req.cookies.userID , chucvu : req.cookies.chucvu})
            .then(member => res.render('student/studentManager',{		
                member : mutipleMongooseToObject(member),
                helpers:{
                    sum : (a,b) => a+b,
                }						
            }))
            .catch(next)

    }
    history(req,res,next){
        studentDB.find({userID: req.cookies.userID , chucvu : req.cookies.chucvu,tinhTrang: "Đã duyệt"})
            .then(member => res.render('student/studentManager',{		
                member : mutipleMongooseToObject(member),
                helpers:{
                    sum : (a,b) => a+b,
                }						
            }))
            .catch(next)

    }
    newRegister(req,res){
        res.render('student/studentRegis')
    }
    edit(req,res,next){
        studentDB.findById(req.params.id)
            .then(member => res.render('student/studentEdit',{
                member : mongooseToObject(member)
            }))
            .catch(next)
    }
    delete(req,res,next){
        studentDB.deleteOne({ _id: req.params.id},req.body)
            .then(()=>res.redirect('back'))
            .catch(next)
	

    }
    update(req,res,next){
        studentDB.updateOne({_id:req.params.id},req.body)
            .then(() => res.redirect('/student'))
            .catch(next)
        // res.render('student/studentRegis')
    }
    report(req,res,next){
        // res.json(req.body)
        studentDB.updateOne({_id:req.params.id},req.body)
            .then(() => res.redirect('/student'))
            .catch(next)
        res.render('student/studentRegis')
    }
    store(req,res){
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();
        let dayofweek = d.getDay();
        let hours = d.getHours();
        let minutes = d.getMinutes();
        let seconds = d.getSeconds();

        const dayname = ['CN','T2','T3','T4','T5','T6','T7'];
        var stringTimeHour =`${hours}giờ - ${minutes}phút - ${seconds}giây`
        var stringTimeYear = `${dayname[dayofweek]} ngày ${day}-${month}-${year}`
        const member = new studentDB(req.body)
        member["userID"] = req.cookies.userID
        member["mssv"] = req.cookies.mssv
        member["chucvu"] = req.cookies.chucvu
        member["createTimeHour"]=stringTimeHour
        member["createTimeYear"]=stringTimeYear
        console.log("đây là member:" + member)
        member.save()
            .then(()=>res.redirect('/student')) //quay về trang chủ
            .catch(erro => {
})
    }
}
module.exports = new StudentController