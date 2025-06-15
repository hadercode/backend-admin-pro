const bcrypt = require('bcryptjs');
const UserRepository = require('./user');

class AuthRepository { 

    static async login(email, password) {

        const user = await UserRepository.findUserByEmail(email);
        //Validate Email
        if(user){

            const validPassword = await bcrypt.compareSync(password, user.password);
            
            //Validate Password
            if(validPassword){
                return user;
            } else {
                throw new Error("Invalid password");
            }
        }else{
            throw new Error("Invalid email");
        }
    }
}

module.exports = AuthRepository;