const bcrypt = require('bcrypt');
const authRepository = require('../repository/AuthRepository');
function encryptPassword (password)
{
    const rounds = 5;

    bcrypt.hash(password,rounds,(err,hash) =>
    {
        if (err)
        {
            throw err;
        }

        return hash;
    })
}

async function fetchUser (username, password)
{
    return await authRepository.fetchUser(username, password);
}

async function updateAuth(refreshToken, expiresAt,userId)
{
    return await authRepository.updateAuth(refreshToken, expiresAt,userId);
}

module.exports = {encryptPassword,fetchUser,updateAuth}