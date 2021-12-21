const mongoose = require('mongoose');
async function connect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/DoAn1_Duong')
        console.log("thanh cong");
    }
    catch(error){
        console.log("that bai");
    }
}
module.exports = {connect}