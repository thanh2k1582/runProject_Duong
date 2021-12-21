const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const studentRegis = new Schema({
    userID : {type: String},
    chucvu : {type: String},
    mssv : {type: String},
    phongDk: { type: String, default: 'hahaha' },
    mayDk: { type: String, default: 'hahaha' },
    ngaySd: { type: String, default: 'hahaha' },
    tuTiet: { type: String, default: 'hahaha' },
    denTiet: { type: String, default: 'hahaha' },
    selectReport: { type: String},
    textareareport: { type: String },
    tinhTrang: { type: String, default: 'Chưa duyệt' },
},{
    timestamps: true
})
module.exports =  mongoose.model('student', studentRegis);