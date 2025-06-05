const { StatusCodes } = require('http-status-codes');
const { CreateSuccessResponse, CreateErrorResponse } = require('../utils/common');
const { chapterService } = require('../services');
const Apperror = require('../utils/error/App-error');



async function insertChapters(req, res) {
    try {
        await chapterService.insertChapters(req.validChapters);
        SuccessResponse=CreateSuccessResponse();
        SuccessResponse.error=req.failedChapters;
        SuccessResponse.data=req.validChapters.length;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log("c:",error);
        ErrorResponse=CreateErrorResponse();
        ErrorResponse.message = error.explanation || "Internal server error";
        return res.status(error.statusCode || 500).json(ErrorResponse);
    }
}


module.exports = {
    insertChapters,
}