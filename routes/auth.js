const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth');

const router = Router();

router.post('/login', login);
router.post('/google', googleSignIn);


module.exports = router;