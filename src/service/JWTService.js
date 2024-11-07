require("dotenv").config();
const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
    return jwt.sign(
        { userId: user.userId, rol:user.rol, institution: user.institution }, 
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRATION }
    );
}

// Función para generar Refresh Token
function generateRefreshToken(user) {
    return jwt.sign(
        { userId: user.userId, rol:user.rol, institution: user.institution }, 
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRATION }
    );
}


module.exports = {generateAccessToken,generateRefreshToken}