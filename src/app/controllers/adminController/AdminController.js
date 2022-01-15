const studentDB = require('../../model/studentDB.js')
const teacherDB = require('../../model/teacherDB.js')
const {mutipleMongooseToObject} = require('../../../util/mongoose.js')					
const {mongooseToObject} = require('../../../util/mongoose.js')					
class AdminController{
    index(req,res){
        res.render('admin/admin')
    }
    updateOneTeacher(req,res,next){
        teacherDB.findById(req.params.id)
            .then(
                member => {member.tinhTrang = "Đã duyệt" ,
                member.save(),
                res.redirect('back')
            }
            )
            .catch(next)
    }
    
    deleteStudent(req,res,next){
        studentDB.deleteOne({ _id: req.params.id},req.body)
            .then(()=>res.redirect('back'))
            .catch(next)
    }
    deleteTeacher(req,res,next){
        teacherDB.deleteOne({ _id: req.params.id},req.body)
            .then(()=>res.redirect('back'))
            .catch(next)
    }
    updateOneStudent(req,res,next){
        studentDB.findById(req.params.id)
            .then(
                member => {member.tinhTrang = "Đã duyệt" ,
                member.save(),
                res.redirect('back')
            }
            )
            .catch(next)
    }
    confirmTeacher(req,res,next){
        teacherDB.find()
            .then(members => res.render('admin/confirmRequireTeacher',{		
                members : mutipleMongooseToObject(members),
                helpers:{
                    sum : (a,b) => a+b,
                }						
            })
            )
            .catch(next)
    }
    confirmStudent(req,res,next){
         studentDB.find()
            .then(member => res.render('admin/confirmRequireStudent',{		
                member : mutipleMongooseToObject(member),
                helpers:{
                    sum : (a,b) => a+b,
                }						
            }))
            .catch(next)
    }
    async filterClass(req,res,next){
        let studentDsend = await studentDB.find({phongDk: req.body.phongDk})
        let studentDsend2 = await studentDB.find()
        if(req.body.phongDk == "Tất cả"){
            res.send(studentDsend2)
            return
        }
        res.send(studentDsend)
   }
   async filterClass2(req,res,next){
    
    let teacherDBsend = await teacherDB.find({phongDk: req.body.phongDk})
    let teacherDBsend2 = await teacherDB.find()
    if(req.body.phongDk == "Tất cả"){
        res.send(teacherDBsend2)
        return
    }
    res.send(teacherDBsend)
}
    seenReport(req,res,next){
        studentDB.findById(req.params.id)
            .then(member => res.render('admin/seenReport',{
                member : mongooseToObject(member)
            }))
            .catch(next)
   }
   
    reportDetailStudent(req,res,next){
        studentDB.findById(req.params.id)
            .then(member => res.render('admin/reportDetailStudent',{
                member : mongooseToObject(member)
            }))
            .catch(next)
    }
    reportDetailTeacher(req,res,next){
        teacherDB.findById(req.params.id)
            .then(member => res.render('admin/reportDetailTeacher',{
                member : mongooseToObject(member)
            }))
            .catch(next)
    }
    reportTeacherManager(req,res,next){
        teacherDB.find()
            .then(members => res.render('admin/reportTeacherManager',{		
                members : mutipleMongooseToObject(members),
                helpers:{
                    sum : (a,b) => a+b,
                }						
            })
            )
            .catch(next)
    }
    statistics(req,res,next){
        teacherDB.find()
            .then(members => res.render('admin/statistics',{		
                members : mutipleMongooseToObject(members),
                helpers:{
                    sum : (a,b) => a+b,
                }						
            })
            )
            .catch(next)
    }
    async statisticsFilter(req,res,next){
        let val = req.body.ngayLoc
        let val2 = req.body.phongDk
        var teacher = await teacherDB.find({phongDk: val2,ngaySd: val})
        var student = await studentDB.find({phongDk: val2,ngaySd: val})
        res.send({teacher: teacher.length ,student: student.length})
    }
    async statisticsFilterMonth(req,res,next){
        let val = req.body.thangLoc
        let val2 = req.body.phongDk
        var teacher = await teacherDB.find({phongDk: val2})
        var student = await studentDB.find({phongDk: val2})
        var arrayData = []
        var arrayData3 = []
        teacher.forEach((item,index)=>{
            var getMonth = item.ngaySd.split("-")
            if(getMonth[1] === val){
                arrayData.push(item)
            }
        })
        student.forEach((item,index)=>{
            var getMonth = item.ngaySd.split("-")
            if(getMonth[1] === val){
                arrayData3.push(item)
            }
        })
        res.send({teacher: arrayData.length, student:arrayData3.length})
    }
    async statisticsFilterMonthWeek(req,res,next){
        let val = req.body.thangLoc
        let val2 = req.body.phongDk
        let valweek = req.body.tuanLoc
        var teacher = await teacherDB.find({phongDk: val2})
        var student = await studentDB.find({phongDk: val2})
        var arrayData = []
        var arrayData3 = []
        teacher.forEach((item,index)=>{
            var getMonth = item.ngaySd.split("-")
            if(getMonth[1] === val){
                if(valweek == "1"){
                    if(parseInt(getMonth[0])<=7){
                        arrayData.push(item)
                    }
                }
                if(valweek == "2"){
                    if(parseInt(getMonth[0])>7 && parseInt(getMonth[0])<= 15){
                        arrayData.push(item)
                    }
                }
                if(valweek == "3"){
                    if(parseInt(getMonth[0])>15 && parseInt(getMonth[0])<= 22){
                        arrayData.push(item)
                    }
                }
                if(valweek == "4"){
                    if(parseInt(getMonth[0])>22 && parseInt(getMonth[0])<= 31){
                        arrayData.push(item)
                    }
                }
            }
        })
        student.forEach((item,index)=>{
            var getMonth = item.ngaySd.split("-")
            if(getMonth[1] === val){
                if(valweek == "1"){
                    if(parseInt(getMonth[0])<=7){
                        arrayData3.push(item)
                    }
                }
                if(valweek == "2"){
                    if(parseInt(getMonth[0])>7 && parseInt(getMonth[0])<= 15){
                        arrayData3.push(item)
                    }
                }
                if(valweek == "3"){
                    if(parseInt(getMonth[0])>15 && parseInt(getMonth[0])<= 22){
                        arrayData3.push(item)
                    }
                }
                if(valweek == "4"){
                    if(parseInt(getMonth[0])>22 && parseInt(getMonth[0])<= 31){
                        arrayData3.push(item)
                    }
                }
            }
        })
        res.send({teacher: arrayData.length, student:arrayData3.length})
    }
    async statisticsFilterFromTo(req,res,next){
        var valFromDay = req.body.ngaybatdau
        var valToDay = req.body.ngayketthuc
        let val2 = req.body.phongDk
        const arrayFromDay = valFromDay.split('-')
        const arrayToDay = valToDay.split('-')
        var teacher = await teacherDB.find({phongDk: val2})
        var student = await studentDB.find({phongDk: val2})
        var arrayData = []
        var arrayData3 = []
        teacher.forEach((item,index)=>{
            var getMonth = item.ngaySd.split("-")
            if(arrayFromDay[1] == arrayToDay[1]){
                if(parseInt(arrayFromDay[0]) <= parseInt(getMonth[0]) && parseInt(arrayToDay[0]) >= parseInt(getMonth[0])){
                    arrayData.push(item)
                }
            }
            if(parseInt(arrayFromDay[1])<parseInt(arrayToDay[1])){
                if(parseInt(arrayFromDay[1])<parseInt(getMonth[1]) && parseInt(arrayToDay[1])>parseInt(getMonth[1])){
                    arrayData.push(item)
                }
                if(parseInt(arrayFromDay[1])==parseInt(getMonth[1]) && parseInt(arrayFromDay[0])<=parseInt(getMonth[0])){
                    arrayData.push(item)
                }
                if(parseInt(arrayToDay[1])==parseInt(getMonth[1]) && parseInt(arrayFromDay[0])>=parseInt(getMonth[0])){
                    arrayData.push(item)
                }
            }
        })
        student.forEach((item,index)=>{
            var getMonth = item.ngaySd.split("-")
            if(arrayFromDay[1] == arrayToDay[1]){
                if(parseInt(arrayFromDay[0]) <= parseInt(getMonth[0]) && parseInt(arrayToDay[0]) >= parseInt(getMonth[0])){
                    arrayData3.push(item)
                }
            }
            if(parseInt(arrayFromDay[1])<parseInt(arrayToDay[1])){
                if(parseInt(arrayFromDay[1])<parseInt(getMonth[1]) && parseInt(arrayToDay[1])>parseInt(getMonth[1])){
                    arrayData3.push(item)
                }
                if(parseInt(arrayFromDay[1])==parseInt(getMonth[1]) && parseInt(arrayFromDay[0])<=parseInt(getMonth[0])){
                    arrayData3.push(item)
                }
                if(parseInt(arrayToDay[1])==parseInt(getMonth[1]) && parseInt(arrayFromDay[0])>=parseInt(getMonth[0])){
                    arrayData3.push(item)
                }
            }
        })
        res.send({teacher: arrayData.length, student:arrayData3.length})
    }
    reportStudentManager(req,res,next){
        // Promise.all([studentDB.find(),teacherDB.find()])
        studentDB.find()
            .then((members) => res.render('admin/reportStudentManager',{		
                members : mutipleMongooseToObject(members),
                helpers:{
                    sum : (a,b) => a+b,
                }	
            })
            )
            .catch(next)
        }
}
module.exports = new AdminController