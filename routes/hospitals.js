const { Router } = require("express");

const { 
    getHospitals, 
    createHospital, 
    updateHospital, 
    deleteHospital 
} = require("../controllers/hospitals");

const hospitalValidation = require("../models/hospital/validation");

const router = Router();

router.get('/', getHospitals);
router.post('/', hospitalValidation, createHospital);
router.put('/:id', updateHospital);
router.delete('/:id', deleteHospital);

module.exports = router;