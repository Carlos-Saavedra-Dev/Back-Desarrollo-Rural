const supabase = require('../config/supabaseConfig');



const createInstitution = async (institution) =>
{
    const {error,data} = await supabase
    .from('Institution')
    .insert({'name':institution.name,'address':institution.address,'email':institution.email,
        'phone_number':institution.phone, 'created_by': institution.userId
    })

    if(error)
    {
        console.log("Repository: createInstitution");
        throw new Error(error.message);
    }

}

module.exports = {createInstitution};