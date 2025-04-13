const express = require('express')
const router = express.Router();
const {registeruser} = require('../controllers/userController')
const {loginuser} = require('../controllers/userController')

router.post('/register',registeruser)
router.post('/login',loginuser)
module.exports = router;