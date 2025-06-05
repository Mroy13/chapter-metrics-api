const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { chapterService } = require('../services');
const Apperror = require('../utils/error/App-error');



async function insertChapters(req, res) {
    try {
        await chapterService.insertChapters(req.validChapters);
        SuccessResponse.data=req.failedChapters;
        
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = error.explanation || "Internal server error";
        return res.status(error.statusCode || 500).json(ErrorResponse);
    }
}


module.exports = {
    insertChapters,
}