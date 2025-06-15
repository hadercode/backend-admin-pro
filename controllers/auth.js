const { generateJWT } = require("../helpers/jwt");
const AuthRepository = require('../repositories/auth');
const { successResponse, handleError } = require("../util/response");

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

module.exports = {
    login
}