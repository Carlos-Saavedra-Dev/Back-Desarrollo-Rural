const JWTService = require('../service/JWTService');

async function getAccessToken (req,res)
{
    const user = req.user;
    const accessToken = await JWTService.generateAccessToken(user);

    return res.status(202).json({data: {accessToken : accessToken}});
}


module.exports = {getAccessToken}