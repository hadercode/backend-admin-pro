const { generateJWT } = require("../helpers/jwt");
const { verifyGoogle } = require("../helpers/google");

const AuthRepository = require('../repositories/auth');
const { successResponse, handleError } = require("../util/response");
const UserRepository = require("../repositories/user");

const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        
        const logged = await AuthRepository.login(email, password);
        const token = await generateJWT(logged.id);

        successResponse(res, { token });   
    } catch (error) {
        handleError(res, { message: 'Usuario o contraseña inválidos' });
    }
}

const googleSignIn = async (req, res) => {

    try {
        
        const { email, name, picture } = await verifyGoogle(req.body.token);
        const nameSplit = name.split(" ");
        const data = { firstname: nameSplit[0], lastname: nameSplit[1], email, img: picture };
        const googleUser = await UserRepository.createByGoogle(data);
        const token = await generateJWT( googleUser.uid );

        successResponse(res, { ...data, token });   

    } catch (error) {
        handleError(res, { message: error.message });
    }
}

const renewToken = async (req, res) => {
    
    try {

        const uid = req.uid;
        const token = await generateJWT(uid);

        successResponse(res, { token });   
    } catch (error) {
        handleError(res, { message: error.message });
    }
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}