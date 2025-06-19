const { Router } = require("express");

const { 
    getDoctors, 
    createDoctor, 
    updateDoctor, 
    deleteDoctor 
} = require("../controllers/doctors");

const { verifyToken } = require("../middlewares/authenticated");

const doctorValidation = require("../models/doctor/validation");
const router = Router();

router.get('/', verifyToken, getDoctors);
router.post('/', doctorValidation, createDoctor);
router.put('/:id', doctorValidation, updateDoctor);
router.delete('/:id', verifyToken, deleteDoctor);

module.exports = router;