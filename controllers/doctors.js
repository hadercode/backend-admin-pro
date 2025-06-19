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
        const doctor = await DoctorRepository.create(req);
        successResponse(res, { doctor });
    } catch (error) {
        handleError(res, error);
    }
}

/* PUT */
const updateDoctor = async (req, res) => { 
    successResponse(res, { message: "updateDoctor" });
}

/* DELETE */
const deleteDoctor = async (req, res) => { 
    successResponse(res, { message: "deleteDoctor" });
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}