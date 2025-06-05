const { StatusCodes } = require('http-status-codes');
const { CreateSuccessResponse, CreateErrorResponse } = require('../utils/common');
const fs = require('fs');
const path = require('path');
const upload = require('../config/multer-config');
const Joi = require('joi');


const chapterSchema = Joi.object({
    subject: Joi.string().valid('Physics', 'Chemistry', 'Mathematics').required(),
    chapter: Joi.string().trim().required(),
    class: Joi.string().valid('Class 11', 'Class 12').required(),
    unit: Joi.string().trim().required(),
    yearWiseQuestionCount: Joi.object({
        '2019': Joi.number().default(0),
        '2020': Joi.number().default(0),
        '2021': Joi.number().default(0),
        '2022': Joi.number().default(0),
        '2023': Joi.number().default(0),
        '2024': Joi.number().default(0),
        '2025': Joi.number().default(0),
    }).default(() => ({
        '2019': 0,
        '2020': 0,
        '2021': 0,
        '2022': 0,
        '2023': 0,
        '2024': 0,
        '2025': 0,
    })),
    questionSolved: Joi.number().min(0).default(0),
    status: Joi.string().valid('Not Started', 'In Progress', 'Completed').default('Not Started'),
    isWeakChapter: Joi.boolean().default(false)
});



// validation function
async function validateChapters(chapters) {
    const validChapters = [];
    const failedChapters = [];
    await Promise.all(chapters.map(async (chapterData) => {
        try {
            const validated = await chapterSchema.validateAsync(chapterData, {
                abortEarly: false,
                stripUnknown: true
            });
            validChapters.push(validated);
        } catch (error) {
            failedChapters.push({
                chapter: chapterData.chapter || 'Unknown Chapter',
                error: error.details.map(d => d.message)
            });
        }
    }));

    return { validChapters, failedChapters };
}



//Middleware function to parse the file and validate the schema.
async function uploadFile(req, res, next) {
    ErrorResponse=CreateErrorResponse();
    upload.single('file')(req, res, async (err) => {
        if (err) {
            ErrorResponse.message = "Unable to upload File"
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }


        if (req.file == undefined) {
            ErrorResponse.message="file not present";
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }

        try {
            const filePath = req.file.path;
            const fileBuffer = fs.readFileSync(filePath);
            const chapters = JSON.parse(fileBuffer.toString());
            
            fs.unlinkSync(req.file.path);

            if (!Array.isArray(chapters)) {
                ErrorResponse.message = "Uploaded JSON must be an array of chapters";
                return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
            }

            const { validChapters, failedChapters } = await validateChapters(chapters);
            req.validChapters = validChapters;
            req.failedChapters = failedChapters;



            // If all chapters failed validation, return error
            if (validChapters.length === 0 && failedChapters.length > 0) {
                
                ErrorResponse.message = "All chapters failed validation";
                ErrorResponse.error = { failedChapters };
                return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
                
            }
            
            
            next();
        }
        catch (error) {
            console.log(error);
            ErrorResponse.message = error instanceof SyntaxError
                ? "Invalid JSON file format"
                : "Error processing file";
            ErrorResponse.error = error.message;
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
    });

}



module.exports = {
    uploadFile,

}