const { check } = require('express-validator');

const { formValidate } = require('../../middlewares/formValidate');
const { verifyToken } = require('../../middlewares/authenticated');

const validation = [
  verifyToken,
  check('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
  formValidate
];

module.exports = validation;