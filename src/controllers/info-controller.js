const { StatusCodes } = require('http-status-codes');
const { CreateSuccessResponse, CreateErrorResponse } = require('../utils/common');

function info(req, res) {
    SuccessResponse=CreateSuccessResponse();
    SuccessResponse.message=["Api is live"];
    return res.status(StatusCodes.OK).json(SuccessResponse);
}
module.exports = {
    info

}                      