const institutionRepository = require('../repository/InstitutionRepository');

async function createInstitution (institution)
{
    const institutionAdded = await institutionRepository.createInstitution(institution);
    return institutionAdded
}

async function deleteInstitution (institutionId)
{
    await institutionRepository.deleteInstitution(institutionId);

}

async function getInstitutions () 
{

    const institutions = await institutionRepository.getInstitutions();

    return institutions;
    
}


module.exports = {createInstitution,deleteInstitution,getInstitutions}