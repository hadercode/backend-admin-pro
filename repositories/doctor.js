const Doctor = require('../models/doctor/doctor');

class DoctorRepository { 

    static async findById(id) {
        if (id.match(/^[0-9a-fA-F]{24}$/)) { 
            return await Doctor.findById(id);
        }
    }

    static async find(regx){
        return await Doctor.find({ firstname: regx })
    }

    static async findAll(from){

        const fromNumber = Number(from) || 0;

        return await Promise.all([
            Doctor.find()
                .populate('user', 'firstname lastname img')
                .populate('hospital', 'name img')
                .skip(fromNumber)
                .limit(5),
            Doctor.countDocuments(),  
        ]);
    }

    static async create(data) {
        const uid = data.uid;
        const body = { ...data.body, user: uid };
        return await new Doctor(body).save();
    }
}

module.exports = DoctorRepository;