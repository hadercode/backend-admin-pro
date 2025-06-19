/** PATH -> - api/user **/
const { generateJWT } = require('../helpers/jwt');

const { 
    successResponse, 
    handleError, 
    notFoundResponse } = require("../util/response");

const UserRepository  = require('../repositories/user');

/* GET */
const getUsers = async (req, res) => {
    try {
        const { from } = req.query;
        const [ users, total ] = await UserRepository.findAll(from);
        successResponse(res, { users, total });
    } catch (error) {
        handleError(res, error);
    }
}

/* POST */
const createUser = async (req, res) => {

    try {

        const user = await UserRepository.create(req.body);
        const token = await generateJWT(user.id);

        successResponse(res, { user, token });
    } catch (error) {
        handleError(res, error);
    }
}

/* PUT */
const updateUser = async (req, res) => {
    try {

        const uid = req.params.id;
        const user = await UserRepository.findById(uid);

        if(user) {
            const updated = await UserRepository.update(uid, req.body);
            successResponse(res, { user: updated });
        }else{
            notFoundResponse(res, { user: null });
        }
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser
}