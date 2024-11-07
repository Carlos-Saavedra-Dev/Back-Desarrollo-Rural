require("dotenv").config();
const jwt = require("jsonwebtoken");

async function accessTokenValidation(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({data:{ message: 'Access Token missing' }});
        }

        const user = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({data:{ message: 'Invalid or expired access token' }});
    }
}

async function setOptionalAccessToken(req,res,next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return next();
        }

        const user = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({data:{ message: 'Invalid or expired access token' }});
    }
}
async function refreshTokenValidation(req, res, next) {
    try {
        const refreshToken = req.headers['x-refresh-token'];

        if (!refreshToken) {
            return res.status(403).send({data:{ message: 'Refresh token missing' }});
        }

        const user = await jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).send({data:{ message: 'Invalid or expired refresh token' }});
    }
}

module.exports = {refreshTokenValidation,accessTokenValidation,setOptionalAccessToken}