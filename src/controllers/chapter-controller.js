const { StatusCodes } = require('http-status-codes');
const { CreateSuccessResponse, CreateErrorResponse } = require('../utils/common');
const { chapterService } = require('../services');
const Apperror = require('../utils/error/App-error');
const redisClient = require('../config/redis-config');


async function insertChapters(req, res) {
    try {
        await chapterService.insertChapters(req.validChapters);
        // Clear all chapter cache keys
        const keys = await redisClient.keys('chapters*');
        for (const key of keys) {
            await redisClient.del(key);
        }
        SuccessResponse = CreateSuccessResponse();
        SuccessResponse.error = req.failedChapters;
        SuccessResponse.data = req.validChapters.length;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse = CreateErrorResponse();
        ErrorResponse.message = error.explanation || "Internal server error";
        return res.status(error.statusCode || 500).json(ErrorResponse);
    }
}


async function getChapters(req, res) {
    try {
        const filters = {
            class: req.query.class,
            unit: req.query.unit,
            subject: req.query.subject,
            status: req.query.status,
            weakChapter: req.query.weakChapter
        };

        const chapterData = await chapterService.getChapters(filters, req.query.page, req.query.limit);

        // Save to Redis for 1 hour
        if (req.redisCacheKey) {
            redisClient.setEx(req.redisCacheKey, 3600, JSON.stringify(chapterData));
        }

        SuccessResponse = CreateSuccessResponse();
        SuccessResponse.data = chapterData;
        return res.
             status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse = CreateErrorResponse();
        ErrorResponse.message = error.explanation;
        return res.status(error.statusCode).json({
            ErrorResponse
        });
    }
}





async function getChapter(req, res) {
    try {

        const chapterData = await chapterService.getChapter(req.params.id);
        SuccessResponse = CreateSuccessResponse();
        SuccessResponse.data = chapterData;
        return res.
            status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse = CreateErrorResponse();
        ErrorResponse.message = error.explanation;
        return res.status(error.statusCode).json({
            ErrorResponse
        });
    }
}





module.exports = {
    insertChapters,
    getChapter,
    getChapters
}