const { check } = require('express-validator');

const { formValidate } = require('../../middlewares/formValidate');
const { verifyToken } = require('../../middlewares/authenticated');

const validation = [
  verifyToken,
  
  check('firstname')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .isLength({ min: 2 })
    .withMessage('El nombre debe tener al menos 2 caracteres'),
  
  check('lastname')
    .notEmpty()
    .withMessage('El apellido es obligatorio')
    .isLength({ min: 2 })
    .withMessage('El apellido debe tener al menos 2 caracteres'),
  
  check('dni').notEmpty().withMessage('El DNI es obligatorio'),
  check('licence').notEmpty().withMessage('Nro Certificado/Licencia es obligatorio'),
  check('hospital').notEmpty().withMessage('El Hospital es obligatorio'),
  check('hospital').isMongoId().withMessage('El ID del Hospital es inválido'),
  
  formValidate
];

module.exports = validation;