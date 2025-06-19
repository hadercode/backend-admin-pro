const { Router } = require("express");

const { 
    getHospitals, 
    createHospital, 
    updateHospital, 
    deleteHospital 
} = require("../controllers/hospitals");

const hospitalValidation = require("../models/hospital/validation");

const { verifyToken } = require("../middlewares/authenticated");
const { formValidate } = require("../middlewares/formValidate");
const { check } = require("express-validator");

const router = Router();

router.get('/', getHospitals);

router.post('/', hospitalValidation, createHospital);

router.put('/:id', [ 
    verifyToken, 
    check("name", "El campo nombre es requerido"),
    formValidate 
], updateHospital);

router.delete('/:id', verifyToken, deleteHospital);

module.exports = router;