 const express=require('express');
 const routes=require('./routes');
 const {ServerConfig}=require('./config');
 const Connect=require('./config/db-config');

 const app=express();
 app.use(express.json());
 app.use(express.urlencoded({extended: true}));
 


 app.use('/api',routes);
 
 app.listen(ServerConfig.PORT,async()=>{
    console.log(`server is up at port no ${ServerConfig.PORT}`);
    await Connect();
    //console.log("database connected");
    
 })
