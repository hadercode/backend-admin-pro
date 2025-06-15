const { Router } = require('express');

const { verifyToken  } = require('../middlewares/authenticated');
const { getUsers, createUser, updateUser } = require('../controllers/users');

const userValidation = require('../models/user/validation');

const router = Router();

router.get('/', verifyToken, getUsers );

router.post('/', 
    userValidation,
    createUser 
);

router.put('/:id', updateUser );

module.exports = router;