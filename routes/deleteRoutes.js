const express = require('express');
const router = express.Router();
const {deleteResponse} = require('../controllers/deleteResponse');
const protect = require('../middleware/authMiddleware')

router.delete('/response/:responseId',protect,deleteResponse);
module.exports = router;