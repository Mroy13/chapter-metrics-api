const mongoose = require('mongoose');
const {ServerConfig}=require('../config');
async function Connect(){
   // console.log("inside connect");
    // await mongoose.connect('mongodb://127.0.0.1:27017/ChapterMetricsDB'); 

    await mongoose.connect(`mongodb+srv://mroy13:${ServerConfig.ATLAS_PASSWORD}@cluster0.weydqvd.mongodb.net/ChapterMetricsDB?retryWrites=true&w=majority&appName=Cluster0`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

}
module.exports=Connect;