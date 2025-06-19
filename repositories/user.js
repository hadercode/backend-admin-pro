const bcrypt = require('bcryptjs');
const User = require('../models/user/user');

class UserRepository { 

    static async findById(id) {
        if (id.match(/^[0-9a-fA-F]{24}$/)) { 
            return await User.findById(id);
        }
    }

    static async find(regx){
        return await User.find({ firstname: regx })
    }

    static async findAll(from){

        const fromNumber = Number(from) || 0;
        
        return await Promise.all([
            User.find({}, 'firstname lastname email role google')
                .skip(fromNumber)
                .limit(5),
            User.countDocuments(),  
        ]);
    }

    static async findUserByEmail(email) {
        return await User.findOne({ email }, 'firstname lastname role email password');
    }

    static async create(body) {

        const { password } = body;
        const user = new User(body);

        //Encrypt Password 
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        
        return await user.save();
    }

    static async update(id, body) {
        const { password, google, email, ...fields } = body;
        return await User.findByIdAndUpdate( id, fields, { new: true } );
    }
}

module.exports = UserRepository;