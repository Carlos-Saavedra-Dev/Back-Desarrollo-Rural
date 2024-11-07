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

async function getInstitutionById (institutionId)
{
    const institution = await institutionRepository.getInstitutionById(institutionId);
    return institution;
}
async function getInstitutions () 
{

    const institutions = await institutionRepository.getInstitutions();

    return institutions;
    
}


module.exports = {createInstitution,deleteInstitution,getInstitutions,getInstitutionById}