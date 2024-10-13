const supabase = require('../config/supabaseConfig');

const fetchUser = async (username, password) =>
{
    const {error,data} = await supabase
        .from('User')
        .select('id_user,Rol (name)')
        .eq('username',username)
        .eq('password',password);
    
        if(error)
        {
            throw new Error(error.message);
        }

        return data[0];
}

const updateAuth = async (refreshToken, expiresAt,userId) =>
{
    const {data, error } = await supabase
        .from('Auth')
        .update({refresh_token: refreshToken, expires_at: expiresAt})
        .eq('id_user', userId);

        if (error) 
        {
            throw new Error(error.message);

        }
}

module.exports = {fetchUser,updateAuth}