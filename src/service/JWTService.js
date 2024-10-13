require("dotenv").config();
const jwt = require("jsonwebtoken");

//TODO We have to check it really includes all the necessary atributes
function generateAccessToken(user) {
    return jwt.sign(
        { userId: user.id_user, userRol: user.Rol.name }, 
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRATION }
    );
}

// Función para generar Refresh Token
function generateRefreshToken(user) {
    return jwt.sign(
        { userId: user.id_user, userRol: user.Rol.name }, 
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRATION }
    );
}


module.exports = {generateAccessToken,generateRefreshToken}