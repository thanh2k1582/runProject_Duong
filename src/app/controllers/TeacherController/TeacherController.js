const {mutipleMongooseToObject} = require('../../../util/mongoose.js')					
const {mongooseToObject} = require('../../../util/mongoose.js')					
const teacherDB = require('../../model/teacherDB.js')
class StudentController{
    index(req,res,next){
        teacherDB.find({userID: req.cookies.userID})
            .then(member => res.render('teacher/teacherManager',{		
                member : mutipleMongooseToObject(member),   
                helpers:{
                    sum : (a,b) => a+b,
                }						
            }))
            .catch(next)

    }
    history(req,res,next){
        teacherDB.find({userID: req.cookies.userID,tinhTrang: "Đã duyệt"})
            .then(member => res.render('teacher/teacherManager',{		
                member : mutipleMongooseToObject(member),   
                helpers:{
                    sum : (a,b) => a+b,
                }						
            }))
            .catch(next)

    }
    newRegister(req,res){
        res.render('teacher/teacherRegis')
    }
    edit(req,res,next){
        teacherDB.findById(req.params.id)
            .then(member => res.render('teacher/teacherEdit',{
                member : mongooseToObject(member)
            }))
            .catch(next)
        // res.render('student/studentRegis')
    }
    delete(req,res,next){
        teacherDB.deleteOne({ _id: req.params.id},req.body)
            .then(()=>res.redirect('back'))
            .catch(next)
	

    }
    update(req,res,next){
        teacherDB.updateOne({_id:req.params.id},req.body)
            .then(() => res.redirect('/teacher'))
            .catch(next)
        // res.render('student/studentRegis')
    }
    report(req,res,next){
        // res.json(req.body)
        teacherDB.updateOne({_id:req.params.id},req.body)
            .then(() => res.redirect('/teacher'))
            .catch(next)
        res.render('teacher/teacherRegis')
    }
    async RegisterCheck(req,res,next){
        let paypoad = req.body
        let x = await teacherDB.find({phongDk: req.body.phongDk,ngaySd: req.body.ngaySd})
        let y = []
        x.forEach((item,index)=>{
            if((parseInt(req.body.tuTiet) >= parseInt(item.tuTiet) && parseInt(req.body.tuTiet) <= parseInt(item.denTiet)) || (parseInt(req.body.denTiet) >= parseInt(item.tuTiet) && parseInt(req.body.denTiet) <= parseInt(item.denTiet))){
                y = [item]
            }
            if((parseInt(req.body.tuTiet) <= parseInt(item.tuTiet) && parseInt(req.body.denTiet) >= parseInt(item.denTiet))){
                y = [item]
            }
        })
        res.send(y)
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
        var stringTimeHour =`${hours}giờ-${minutes}phút-${seconds}giây`
        var stringTimeYear = `${dayname[dayofweek]} ngày ${day}-${month}-${year}`
        const member = new teacherDB(req.body)
        member["userID"] = req.cookies.userID
        member["mssv"] = req.cookies.mssv
        member["createTimeHour"] = stringTimeHour
        member["createTimeYear"] = stringTimeYear
        console.log("đây là member:" + member)
        member.save()
            .then(()=>res.redirect('/teacher')) //quay về trang chủ
            .catch(erro => {
})
    }
}
module.exports = new StudentController