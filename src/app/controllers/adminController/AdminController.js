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