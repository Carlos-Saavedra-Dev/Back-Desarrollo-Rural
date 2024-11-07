const authService = require('../service/AuthService');
const JWTService = require('../service/JWTService');

async function login (req,res) {

    try {
        const {username, password } = req.body;

        if(!username || !password) 
        {
            return res.status(400).json({message: "Missing parameters"});
        }

        const authUser = await authService.fetchUser(username);

        if(!authUser) 
            {
                return res.status(401).json({message: "Invalid credentials"});
            }


        const isMatch = await authService.compareHash(password, authUser.password);


        if(!isMatch) 
            {
                return res.status(401).json({message: "Invalid credentials"});
            }

        const tokenUser = 
        {
            userId: authUser.id_user,
            rol: authUser.Rol.name,
            institution: authUser.id_institution,
        }
        const refreshToken = JWTService.generateRefreshToken(tokenUser);
        await authService.updateAuth(refreshToken,authUser.id_user)
        const accessToken = JWTService.generateAccessToken(tokenUser);

        return res.status(200).json({data:{accessToken, refreshToken}})

    } catch (error) {
        
        console.log(error.message);
        return res.status(500).json({message: error.message});
    }
}

module.exports = {login}