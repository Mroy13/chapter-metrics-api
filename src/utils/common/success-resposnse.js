function createSuccessResponse() {
    return {
        success: true,
        message: 'Successfully completed request',
        data: {},
        error: {}
    };
}

module.exports = createSuccessResponse;