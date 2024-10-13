require("dotenv").config();
const jwt = require("jsonwebtoken");

function accessTokenValidation(req,res,next) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Access Token missing' });
    }

    jwt.verify(token,process.env.JWT_SECRET, (err,user) =>
    {
        if (err) {
            return res.status(401).json({message: "Invalid or expired access token"})
        }

        req.user = user;
        next();
    });
}

function refreshTokenValidation(req,res,next) 
{
    const refreshToken = req.headers['x-refresh-token'];

    if (!refreshToken)
    {
        return res.status(403).send({message: "Refresh token missing"});
    }

    jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET,(err,user) => {
        if (err) {
            return res.status(403).send({message: "Invalid or expired refresh token"});
        }
        req.user = user;
        next();
    });
}

module.exports = {refreshTokenValidation,accessTokenValidation}