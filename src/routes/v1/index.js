const express=require('express');
const { infoController} = require('../../controllers');
const chapterRoutes=require('./chapter-routes');
const router=express.Router();
router.use('/chapters',chapterRoutes);
router.get('/info',infoController.info);
module.exports=router;
