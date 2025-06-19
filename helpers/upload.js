const fs = require('fs');

const DoctorRepository = require('../repositories/doctor');
const UserRepository = require('../repositories/user');
const HospitalRepository = require('../repositories/hospital');

const uploadFileHelper = async (req, file, path) => {

    const split = file.name.split('.');
    const extension = split[1];

    const validExtensions = ['jpg','png','jpeg','gif'];

    if (!req.files || Object.keys(req.files).length === 0) {
        throw new Error('No hay ningún archivo para subir');
    }

    if(!validExtensions.includes(extension.toLowerCase())){
        throw new Error('No es un formato de imagen permitido');
    }

    // Use the mv() method to place the file somewhere on your server
    file.mv(path, function(err) {
        if (err) {
            throw new Error('Algo salió mal al cargar el archivo');
        }
    });
}

const updateImage = async (id, type, fileName) => {

    switch (type) {
        case 'doctors':

            const doctor = await DoctorRepository.findById(id); 
            
            if(!doctor){
                throw new Error("Invalid doctor id");
            }  

            removeFile(type, doctor);

            doctor.img = fileName;
            doctor.save();

            break;
        
        case 'users':

            const user = await UserRepository.findById(id); 
            
            if(!user){
                throw new Error("Invalid user id");
            }  

            removeFile(type, user);

            user.img = fileName;
            user.save();

            break;

        case 'hospitals':

            const hospital = await HospitalRepository.findById(id); 
            
            if(!hospital){
                throw new Error("Invalid hospital id");
            }  

            removeFile(type, hospital);

            hospital.img = fileName;
            hospital.save();

            break;
    
        default:
            break;
    }

    return true;
}

const removeFile = (type, model) => {
    
    const oldPath = `./uploads/${type}/${model.img}`;

    if( fs.existsSync(oldPath) ){
        //Remove image
        fs.unlinkSync(oldPath);
    }
}

module.exports = {
    uploadFileHelper,
    updateImage
}