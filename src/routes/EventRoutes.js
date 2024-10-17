const express = require('express');
const JWT = require('../utils/Middleware/JWTValidation');
const eventController = require('../controller/EventController');
const router = express.Router();
const upload = require('../config/multerConfig');


router.post('/upload',JWT.accessTokenValidation,
    upload.array('images',3),eventController.createEvent);

router.put('/',JWT.accessTokenValidation,
    upload.array('images',3),eventController.updateEvent);

router.delete('/',JWT.accessTokenValidation,eventController.deleteEvent);

router.get('/',eventController.getEvent);

module.exports = router;