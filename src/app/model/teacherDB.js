const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const teacherRegis = new Schema({
    userID : {type: String},
    chucvu : {type: String},
    mssv : {type: String},
    phongDk: { type: String, default: 'hahaha' },
    mucdich: { type: String, default: 'hahaha' },
    maLHP: { type: String, default: 'hahaha' },
    ngaySd: { type: String, default: 'hahaha' },
    tuTiet: { type: String, default: 'hahaha' },
    denTiet: { type: String, default: 'hahaha' },
    createTimeHour: { type: String, default: 'hahaha' },
    createTimeYear: { type: String, default: 'hahaha' },
    selectReport: { type: String},
    textareareport: { type: String },
    soSV: { type: String, default: 'hahaha' },
    tinhTrang: { type: String, default: 'Chưa duyệt' },
},{
    timestamps: true
})
module.exports =  mongoose.model('teacher', teacherRegis);