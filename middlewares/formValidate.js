const { response } = require("express");
const { validationResult } = require("express-validator");

const { MSG_SUCCESS, HTTP_422 } = require("../constants/config");

const formValidate = (req, res = response, next) => {

    const errors = validationResult(req);
        
    if (!errors.isEmpty()) {
        return res.status(HTTP_422).json({
            success: !MSG_SUCCESS,
            errors: errors.mapped() 
        });
    }

    next();
}

module.exports = { formValidate }
