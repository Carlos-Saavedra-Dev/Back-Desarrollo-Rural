const authService = require('../service/AuthService');
const JWTService = require('../service/JWTService');

async function login (req,res) {

    try {
        const {username, password } = req.body;

        if(!username || !password) 
        {
            return res.status(400).json({message: "Missing parameters"});
        }

        const passwordHash = authService.encryptPassword(password);

        const authUser = authService.fetchUser(username, passwordHash);

        if(!authUser) 
        {
            return res.status(401).json({message: "Invalid credentials"});
        }

        const refreshToken = JWTService.generateRefreshToken(authUser);
        const expiresAt = new Date(Date.now() + 7);
        await authService.updateAuth(refreshToken,expiresAt,authService.id_user)
        const accessToken = JWTService.generateAccessToken(authService);

        return res.status(200).json({accessToken, refreshToken})

    } catch (error) {
        
        console.log(error.message);
        return res.status(500).json({message: error.message});
    }
}

module.exports = {login}