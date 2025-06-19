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
            Doctor.find({ deleted: false })
                .populate('user', 'firstname lastname img')
                .populate('hospital', 'name img')
                .skip(fromNumber)
                .limit(5),
            Doctor.countDocuments({ deleted: false }),  
        ]);
    }

    static async create(data) {
        const uid = data.uid;
        const body = { ...data, user: uid };
        return await new Doctor(body).save();
    }

    static async update(id, data) {

        const doctor = await this.findById(id);

        if(doctor){
            const uid = data.uid;
            const body = { ...data, user: uid };
            return await Doctor.findByIdAndUpdate(id, body, { new: true });
        }

        throw new Error("Hospital no encontrado");
    }

    static async delete(id) {

        const doctor = await this.findById(id);

        if(doctor){
            doctor.deleted = true;
            return await doctor.save();
        }

        throw new Error("Médico no encontrado");
    }
}

module.exports = DoctorRepository;