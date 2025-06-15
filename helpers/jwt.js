const jwt = require("jsonwebtoken");

const generateJWT = async (uid) => {

    return new Promise( (resolve, reject) => {
        
        const payload = {
            uid
        }

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '24h'
        }, (error, token) => {
            
            if(error){
                reject("Error generating JWT");
            }

            resolve(token);
        });
    });
}

module.exports = {
    generateJWT
}