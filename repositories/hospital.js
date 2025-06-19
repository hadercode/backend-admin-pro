const Hospital = require('../models/hospital/hospital');

class HospitalRepository { 

    static async findById(id) {
        if (id.match(/^[0-9a-fA-F]{24}$/)) { 
            return await Hospital.findById(id);
        }
    }

    static async find(regx){
        return await Hospital.find({ name: regx })
    }

    static async findAll(){
        return await Hospital.find().populate('user','firstname lastname img');
    }

    static async create(body) {
        return await new Hospital(body).save();
    }
}

module.exports = HospitalRepository;