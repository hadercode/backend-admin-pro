/** PATH -> - api/hospitals **/
const { successResponse, handleError } = require("../util/response");

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
    
    
    try {
        
        const uid = req.uid;

        const hospital = await HospitalRepository.create({
            ...req.body,
            uid
        });

        successResponse(res, { hospital });
    } catch (error) {
        console.log(error);
        handleError(res, error);
    }
}

/* PUT */
const updateHospital = async (req, res) => { 
    try {
        
        const id = req.params.id;
        req.body.user = req.uid;

        const hospital = await HospitalRepository.update(id, req.body);

        successResponse(res, { hospital });
    } catch (error) {
        handleError(res, { message: `Error al actualizar hospital`});
    }
}

/* DELETE */
const deleteHospital = async (req, res) => { 

    try {

        const id = req.params.id;
        await HospitalRepository.delete(id);

        successResponse(res, { message: "Hospital eliminado!" });
    } catch (error) {
        handleError(res, { message: `Error al eliminar hospital`});
    }

}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}