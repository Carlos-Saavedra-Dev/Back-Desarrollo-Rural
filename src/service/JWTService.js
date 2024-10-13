require("dotenv").config();
const jwt = require("jsonwebtoken");

// Función para generar Access Token
function generateAccessToken(user) {
    return jwt.sign(
        { userId: user.id, role: user.role }, // Información personalizada
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRATION }
    );
}

// Función para generar Refresh Token
function generateRefreshToken(user) {
    return jwt.sign(
        { userId: user.id }, // Solo el ID del usuario
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRATION }
    );
}


module.exports = {generateAccessToken,generateRefreshToken}