const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { uploadFile, getFile } = require('../controllers/uploads');
const { verifyToken } = require('../middlewares/authenticated');

const router = Router();

router.use( expressFileUpload() );

router.put('/:type/:id', verifyToken , uploadFile );
router.get('/:type/:image',  getFile );

module.exports = router;