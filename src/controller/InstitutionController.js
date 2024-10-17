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

        const institutionAdded = await institutionService.createInstitution(institution);

        institutionAdded.created_by = undefined;
        return res.status(201).json({data:institutionAdded});

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: error.message});
    }
}

async function deleteInstitution(req,res)
{
    try {
        const institutionId = req.body.id_institution;

        if (!institutionId)
        {
            return res.status(400).json({data:{message : "Parameters missing"}});
        }

        await institutionService.deleteInstitution(institutionId);

        return res.status(204).json();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: error.message});
    }
}

async function getInstitutions (req, res) 
{
    try {
        
        const institutions = await institutionService.getInstitutions();

        return res.status(200).json({data: institutions});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: error.message});
    }
}


module.exports = {createInstitution,deleteInstitution,getInstitutions};