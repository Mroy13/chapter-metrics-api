const express=require('express');
const {chapterController}=require ('../../controllers');
const { chapterMiddleware}=require('../../middlewares');
const router=express.Router();
router.post('/',chapterMiddleware.uploadFile, chapterController.insertChapters);
router.get('/:id',chapterController.getChapter);
router.get('/',chapterController.getChapters);
module.exports=router