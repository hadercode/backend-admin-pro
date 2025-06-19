/** PATH -> - api/Doctors **/
const { 
    successResponse, 
    handleError 
} = require("../util/response");
    
const DoctorRepository = require("../repositories/doctor");

/* GET */
const getDoctors = async (req, res) => { 
    try {
        
        const { from } = req.query;
        const [ doctors, total ] = await DoctorRepository.findAll(from);

        successResponse(res, { doctors, total });
    } catch (error) {
        handleError(res, { message: "Error getting doctors"});
    }
}

/* POST */
const createDoctor = async (req, res) => {     
    try {
        const doctor = await DoctorRepository.create(req.body);
        successResponse(res, { doctor });
    } catch (error) {
        handleError(res, error);
    }
}

/* PUT */
const updateDoctor = async (req, res) => { 
    try {
        
        const id = req.params.id;
        req.body.user = req.uid;

        const doctor = await DoctorRepository.update(id, req.body);

        successResponse(res, { doctor });
    } catch (error) {
        console.log(error);
        handleError(res, { message: `Error al actualizar médico`});
    }
}

/* DELETE */
const deleteDoctor = async (req, res) => { 
    try {

        const id = req.params.id;
        await DoctorRepository.delete(id);

        successResponse(res, { message: "Médico eliminado!" });
    } catch (error) {
        handleError(res, { message: `Error al eliminar médico`});
    }
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}