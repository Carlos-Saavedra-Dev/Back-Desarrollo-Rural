const institutionService = require('../service/InstitutionService');
async function createInstitution (req, res)
{
    try {
        const {userId} = req.user;
        const {name, address, email, phone} = req.body;

        if(!name)
        {
            return res.status(400).json({data:{message : "Parameters missing"}});
        }

        const institution = {
            userId,name,address,email,phone
        };

        await institutionService.createInstitution(institution);

        institution.userId = undefined;
        return res.status(201).json({data:institution});

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: error.message});
    }
}


module.exports = {createInstitution};