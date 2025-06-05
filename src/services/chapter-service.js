const StatusCode = require('http-status-codes');
const { chapterRepository } = require('../repositories');
const Apperror = require('../utils/error/App-error');
const ChapterRepo = new chapterRepository();


async function insertChapters(data) {
    try {
        await ChapterRepo.create(data);
    } catch (error) {
        if (error.name == "MongoServerError") {
            throw new Apperror("E11000 duplicate key error", StatusCode.BAD_REQUEST);
        }


        if (error.name == "ValidationError") {
            console.log(error.message);
            let errorMessage = [];
            const keys = Object.keys(error.errors);
            keys.forEach((key) => {
                errorMessage.push(error.errors[key].message);
            })
            throw new Apperror(errorMessage, StatusCode.BAD_REQUEST);
        }

        else {
            throw new Apperror("server side probelem", StatusCode.INTERNAL_SERVER_ERROR);
        }
    }
}




async function getChapters(){
    try {
        const res=await ChapterRepo.getAll();
        return res;
    } catch (error) {
        throw new Apperror("server side probelem",StatusCode.INTERNAL_SERVER_ERROR);
    }
}







async function getChapter(id){
    try {
        const chapterData=await ChapterRepo.get(id);
        return chapterData;
    } catch (error) {
        if(error instanceof Apperror){
            throw error;
        }
        throw new Apperror("server side probelem",StatusCode.INTERNAL_SERVER_ERROR);
    }
}





module.exports = {
    insertChapters,
    getChapters,
    getChapter
}