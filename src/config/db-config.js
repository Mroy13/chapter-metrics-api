const mongoose = require('mongoose');
async function Connect(){
   // console.log("inside connect");
    await mongoose.connect('mongodb://127.0.0.1:27017/ecomdb');
}
module.exports=Connect;