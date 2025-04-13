const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware')
const { submitResponse } = require('../controllers/responseController');
const {showresponse} = require('../controllers/fetchResponse');

router.post('/response/:formId', submitResponse);
router.get('/response/:formId',protect,showresponse)

module.exports = router;
