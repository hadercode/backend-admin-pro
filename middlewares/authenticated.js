const jwt = require('jsonwebtoken');
const { handleError } = require('../util/response');

const verifyToken = (req, res, next) => {

    const token = req.header('x-token');

    if(!token) {
        handleError(res, { message: "Token is required" });        
    }

    try {
        //** JWT Structure { uid, iat, exp }*/
        const isValid = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        handleError(res, { message: "Invalid Token" })        
    }
}

module.exports = { 
    verifyToken
}