const { validationResult } = require('express-validator');

const { HTTP_400, HTTP_404, HTTP_403, MSG_SUCCESS } = require('../constants/config');

const successResponse = (res, response ) => {
    res.json({ success: MSG_SUCCESS , ...response });
}

const notFoundResponse = (res, response ) => {
    res.status(HTTP_404).json({ ...response });
}

const handleError = (res, error) => {
    res.status(HTTP_400).json({ error: error.message });
};

const handleUnauthorized = (res, error) => {
    res.status(HTTP_403).json(error);
};
  

module.exports = {
    successResponse,
    notFoundResponse,
    handleError,
    handleUnauthorized
};