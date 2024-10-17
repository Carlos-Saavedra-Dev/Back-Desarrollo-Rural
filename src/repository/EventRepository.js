const fs = require('fs');
const supabase = require('../config/supabaseConfig');

const uploadImage = async (filePath, file) => {
    const fileBuffer = fs.readFileSync(file.path);  // Lee el archivo como buffer

    const {error } = await supabase.storage
        .from('multimedia-bucket')
        .upload(filePath, fileBuffer, {
            contentType: file.mimetype,  // Establecer el tipo MIME correcto
        });

    if (error) {
        console.log("Repository: uploadImage");
        throw new Error(error.message);
    }

    // Obtener el URL público correctamente
    const {data} = supabase.storage
        .from('multimedia-bucket')
        .getPublicUrl(filePath);

    try {
        fs.unlinkSync(file.path);

    } catch (unlinkError) {
        console.error(unlinkError.message);
    }

    return data.publicUrl;  
};

const createEvent = async (event) => 
{
    const {data, error} = await supabase
        .from('Event')
        .insert(event)
        .select();
    
    if (error) {
        console.log("Repository: createEvent");
        throw new Error(error.message);
    }

    return data[0];


}

const deleteEvent = async (eventId) => {

    const { data, error } = await supabase
        .from('Event')
        .delete()
        .eq('id_event', eventId)

    if (error) {
        console.log("Repository: deleteEvent");
        throw new Error(error.message);
    }

}

const updateEvent = async (id_event, event) => {
    const { data, error } = await supabase
        .from('Event')
        .update(event)
        .eq('id_event', id_event)
        .select();

    if (error) {
        console.log("Repository: updateEvent");
        throw new Error(error.message);
    }

    return data[0];
};

const getUrls = async (eventId) =>
{
    const { data, error } = await supabase
        .from('Multimedia')
        .select('url')
        .eq('id_event', eventId)

    if (error) {
        console.log("Repository: getUrls");
        throw new Error(error.message);
    }

    return data;
}

const getEventByInstitutionId = async (institutionId) => {

    const { data, error } = await supabase
        .from('Event')
        .select('id_event,title,description,created_at')
        .eq('id_institution', institutionId)

    if (error) {
        console.log("Repository: getEventByInstitutionId");
        throw new Error(error.message);
    }

    return data;
}

module.exports = { deleteEvent,uploadImage,createEvent ,updateEvent,getUrls,getEventByInstitutionId};
