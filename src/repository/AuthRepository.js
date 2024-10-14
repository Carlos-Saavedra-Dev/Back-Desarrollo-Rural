const supabase = require('../config/supabaseConfig');

const fetchUser = async (username) =>
{
    const {error,data} = await supabase
        .from('User')
        .select('id_user, password, Rol (name)')
        .eq('username',username)
    
        if(error)
        {
            console.log("Repository: fetchUser");
            throw new Error(error.message);
        }

        return data[0];
}

const updateAuth = async (refreshToken, createdAt, expiresAt,userId) =>
{
    const {data, error } = await supabase
        .from('Auth')
        .update({refresh_token: refreshToken, created_at: createdAt, expires_at: expiresAt})
        .eq('id_user', userId);

        if (error) 
        {
            console.log("Repository: updateAuth");
            throw new Error(error.message);

        }
}

module.exports = {fetchUser,updateAuth}