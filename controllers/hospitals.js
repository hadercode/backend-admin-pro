/** PATH -> - api/hospitals **/
const { 
    successResponse, 
    handleError, 
    notFoundResponse } = require("../util/response");

const HospitalRepository  = require('../repositories/hospital');

/* GET */
const getHospitals = async (req, res) => { 
    try {
        const hospitals = await HospitalRepository.findAll();
        successResponse(res, { hospitals });
    } catch (error) {
        handleError(res, { message: "Error getting hospitals"});
    }}

/* POST */
const createHospital = async (req, res) => {
    
    const uid = req.uid;

    try {
        const hospital = await HospitalRepository.create({
            ...req.body,
            user: uid
        });

        successResponse(res, { hospital });
    } catch (error) {
        handleError(res, error);
    }
}

/* PUT */
const updateHospital = async (req, res) => { 
    successResponse(res, { message: "updateHospital" });
}

/* DELETE */
const deleteHospital = async (req, res) => { 
    successResponse(res, { message: "deleteHospital" });
}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}