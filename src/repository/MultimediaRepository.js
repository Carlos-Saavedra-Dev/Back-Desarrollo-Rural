const supabase = require('../config/supabaseConfig');

const uploadMedia = async (multimedia) =>
{
    const {data, error} = await supabase
    .from('Multimedia')
    .insert(multimedia)
    .select('url');

    if (error) {
        console.log("Repository: uploadMedia");
        throw new Error(error.message);
    }

    return data[0];
}

const deleteImage = async (filePath) => {
    const { error } = await supabase.storage
        .from('multimedia-bucket')
        .remove([filePath]);

    if (error) {
        console.log("Repository: deleteImage");
        throw new Error(error.message);    }
};

const deleteImageFromDB = async (url) => {
    const { error } = await supabase
        .from('Multimedia')
        .delete()
        .eq('url', url);

    if (error) {
        console.log("Repository: deleteImageFromDB");
        throw new Error(error.message);
    }
};


module.exports = {uploadMedia,deleteImage,deleteImageFromDB}