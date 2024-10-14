const express = require('express');
const institutionController = require('../controller/../controller/InstitutionController');
const router = express.Router();


router.post('/create',institutionController.createInstitution)

module.exports = router;