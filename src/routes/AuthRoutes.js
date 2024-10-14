const express = require('express');
const JWT = require('../utils/Middleware/JWTValidation');
const JWTController = require('../controller/JWTController');
const authController = require('../controller/AuthController');
const router = express.Router();


router.get('/accessToken',JWT.refreshTokenValidation,JWTController.getAccessToken);
router.post('/login',authController.login)

module.exports = router;