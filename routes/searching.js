const { Router } = require('express');
const { verifyToken } = require('../middlewares/authenticated');
const { getAllCollections, getAllDocuments } = require('../controllers/search');

const router = Router();

router.get('/:query', verifyToken, getAllCollections );
router.get('/collection/:table/:query', verifyToken, getAllDocuments );

module.exports = router;