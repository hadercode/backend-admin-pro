const { check } = require('express-validator');

const User = require('./user');

const { formValidate } = require('../../middlewares/formValidate');
const { verifyToken } = require('../../middlewares/authenticated');

const validation = [
  check('firstname')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),

  check('lastname')
    .notEmpty().withMessage('El apellido es obligatorio')
    .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),

  check('email')
    .notEmpty().withMessage('El email es obligatorio')
    .custom(async value => {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error('E-mail already in use');
        }
    }).withMessage('El Email ya existe')
    .isEmail().withMessage('Debe ser un email válido'),

  check('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
  verifyToken,
  formValidate
];

module.exports = validation;