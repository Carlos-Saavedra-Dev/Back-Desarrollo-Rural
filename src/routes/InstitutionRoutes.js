const express = require('express');
const institutionController = require('../controller/../controller/InstitutionController');
const router = express.Router();
const JWT = require('../utils/Middleware/JWTValidation');


router.post('/',JWT.accessTokenValidation,institutionController.createInstitution)
router.delete('/',JWT.accessTokenValidation,institutionController.deleteInstitution);
router.get('/',institutionController.getInstitutions)

module.exports = router;