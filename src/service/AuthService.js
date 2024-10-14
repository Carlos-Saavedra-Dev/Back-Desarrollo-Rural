const bcrypt = require('bcrypt');
const authRepository = require('../repository/AuthRepository');
async function compareHash(password,hash) {
    try {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    } catch (err) {
        throw err; 
    }
}

async function fetchUser (username)
{
    return await authRepository.fetchUser(username);
}

async function updateAuth(refreshToken,userId)
{
    const expiresAt = new Date(Date.now() + 7);
    const createdAt = new Date();
    return await authRepository.updateAuth(refreshToken, createdAt, expiresAt,userId);
}

module.exports = {compareHash,fetchUser,updateAuth}