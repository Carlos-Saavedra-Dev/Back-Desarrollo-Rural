const supabase = require('../config/supabaseConfig');



const createInstitution = async (institution) =>
{
    const {error,data} = await supabase
    .from('Institution')
    .insert({'name':institution.name,'address':institution.address,'email':institution.email,
        'phone_number':institution.phone, 'created_by': institution.userId
    })
    .select();

    if(error)
    {
        console.log("Repository: createInstitution");
        throw new Error("Institution duplicated");
    }

    return data[0];

}

const deleteInstitution = async (institutionId) =>
{
    const {error,data} = await supabase
    .from('Institution')
    .delete()
    .eq('id_institution',institutionId)

    if(error)
    {
        console.log("Repository: deleteInstitution");
        throw new Error(error.message);
    }
}


async function getInstitutions () 
{

    const {error,data} = await supabase
    .from('Institution')
    .select()

    if(error)
    {
        console.log("Repository: getInstitutions");
        throw new Error(error.message);
    }

    return data;
}

async function getInstitutionById(institutionId)
{
    const {error,data} = await supabase
    .from('Institution')
    .select()
    .eq('id_institution', institutionId)

    if(error)
    {
        console.log("Repository: getInstitutionById");
        throw new Error(error.message);
    }

    return data;
}

module.exports = {createInstitution,deleteInstitution,getInstitutions,getInstitutionById};