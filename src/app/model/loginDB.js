const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const studentRegis = new Schema({
    _id: {
        type: String,
        default: shortid.generate
      },
    email: { type: String, default: 'thanh2k1582@gmail.com' ,unique: true},
    mk: { type: String, default: 'thanh1582' },
    ten: { type: String, default: 'thanh' },
    ho: { type: String, default: 'nguyen' },
    ngaySinh: { type: String, default: '15/08/2000' },
    gioiTinh: { type: String, default: 'nam' },
    chucvu: { type: String, default: 'nam' },
},{
    timestamps: true
})
module.exports =  mongoose.model('loginAccount', studentRegis);