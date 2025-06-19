const DoctorRepository = require('../repositories/doctor');
const HospitalRepository = require('../repositories/hospital');
const UserRepository = require('../repositories/user');

const { 
    successResponse, 
    handleError 
} = require('../util/response');

const getAllCollections = async (req, res) => {
    try {
        
        const { query } = req.params;
        const regx = new RegExp(query, 'i');

        const [ 
            users, 
            doctors, 
            hospitals 
        ] = await Promise.all([
            UserRepository.find(regx),
            DoctorRepository.find(regx),
            HospitalRepository.find(regx)
        ])
        
        successResponse(res, { 
            users,
            doctors,
            hospitals
        });

    } catch (error) {
        handleError(res, { message: "Error searching data" });
    }
}


const getAllDocuments = async (req, res) => {
    try {
        
        const { query, table } = req.params;
        
        const regx = new RegExp(query, 'i');
        let results = [];

        switch (table) {
            case 'users':
                results = await UserRepository.find(regx);
                break;
            case 'doctors':
                results = await DoctorRepository.find(regx);
                break;
            case 'hospitals':
                results = await HospitalRepository.find(regx);
                break;
        }

        successResponse(res, {
            results
        });

    } catch (error) {
        handleError(res, { message: "Error searching data" });
    }
}

module.exports = { 
    getAllCollections,
    getAllDocuments
}