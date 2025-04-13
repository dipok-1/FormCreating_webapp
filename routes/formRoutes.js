const express = require('express')
const router = express.Router()
const {createform,getform} = require('../controllers/formController')
const protect = require('../middleware/authMiddleware')

router.post('/create',protect,createform);
router.get('/:formId',getform)
module.exports = router;