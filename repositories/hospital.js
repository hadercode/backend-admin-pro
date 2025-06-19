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
        return await Hospital.find({ deleted: false }).populate('user','firstname lastname img');
    }

    static async create(data) {
        const uid = data.uid;
        const body = { ...data, user: uid };
        return await new Hospital(body).save();
    }
    
    static async update(id, body) {

        const hospital = await this.findById(id);

        if(hospital){
            hospital.name = body.name;
            return await hospital.save();
        }

        throw new Error("Hospital no encontrado");
    }
    
    static async delete(id) {

        const hospital = await this.findById(id);

        if(hospital){
            hospital.deleted = true;
            return await hospital.save();
        }

        throw new Error("Hospital no encontrado");
    }
}

module.exports = HospitalRepository;