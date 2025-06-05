function createErrorResponse() {
    return {
        success: false,
        message: 'Something went wrong',
        data: {},
        error: {}
    };
}

module.exports = createErrorResponse;
