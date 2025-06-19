const { Router } = require('express');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { verifyToken } = require('../middlewares/authenticated');

const router = Router();

router.post('/login', login);
router.post('/google', googleSignIn);
router.post('/renew', verifyToken ,renewToken);

module.exports = router;