const express=require('express');
const {chapterController}=require ('../../controllers');
const { chapterMiddleware}=require('../../middlewares');
const router=express.Router();
router.post('/',chapterMiddleware.uploadFile, chapterController.insertChapters);
//router.get('/:id',mobileController.getMobile);
//router.get('/',mobileController.getMobiles);
module.exports=router