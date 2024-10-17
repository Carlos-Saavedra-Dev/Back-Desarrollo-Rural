const express = require('express');
const JWT = require('../utils/Middleware/JWTValidation');
const eventController = require('../controller/EventController');
const router = express.Router();
const upload = require('../config/multerConfig');


router.post('/upload',JWT.accessTokenValidation,
    upload.array('images',3),eventController.createEvent);

router.put('/update',JWT.accessTokenValidation,
    upload.array('images',3),eventController.updateEvent);

router.delete('/delete',JWT.accessTokenValidation,eventController.deleteEvent);

module.exports = router;