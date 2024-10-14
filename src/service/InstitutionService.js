const institutionRepository = require('../repository/InstitutionRepository');

async function createInstitution (institution)
{
    await institutionRepository.createInstitution(institution);
}

module.exports = {createInstitution}