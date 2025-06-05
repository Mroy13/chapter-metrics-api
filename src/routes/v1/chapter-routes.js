const express=require('express');
const {chapterController}=require ('../../controllers');
const { chapterMiddleware, cacheMiddleware}=require('../../middlewares');
const router=express.Router();
router.post('/', chapterMiddleware.rateLimiter, chapterMiddleware.uploadFile, chapterController.insertChapters);
router.get('/:id', chapterMiddleware.rateLimiter,chapterController.getChapter);
router.get('/', cacheMiddleware.cacheChapters, chapterController.getChapters);
module.exports=router