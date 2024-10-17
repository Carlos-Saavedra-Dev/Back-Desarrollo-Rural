const path = require('path');
const eventRepository = require('../repository/EventRepository');
const multimediaRepository = require('../repository/MultimediaRepository');

async function uploadImages(file) {
    const uploadPromises = file.map(async (file) => {
        const fileExtension = path.extname(file.originalname);
        const filePath = `public/${file.filename}${fileExtension}`;

        try {
            return await eventRepository.uploadImage(filePath, file);
        } catch (error) {
            console.error(`Error uploading ${file.originalname}:`, error.message);
            return null;
        }
    });

    const uploadedFiles = await Promise.all(uploadPromises);
    return uploadedFiles.filter(Boolean);
}

async function deleteImages(urlsToDelete) {

    console.log(typeof(urlsToDelete));
    const deletePromises = urlsToDelete.map(async (url) => {
        const filePath = url.replace('https://vqrrvxvxeivqzumtqgrb.supabase.co/storage/v1/object/public/multimedia-bucket/public/', '');

        try {
            await multimediaRepository.deleteImage(filePath);

            await multimediaRepository.deleteImageFromDB(url);
        } catch (error) {
            console.error(`Error eliminando imagen: ${url}`, error.message);
        }
    });

    await Promise.all(deletePromises);
}

async function updateEvent(id_event, event, files, urlsToDelete) {
    const updatedEvent = await eventRepository.updateEvent(id_event, event);

    if (urlsToDelete && urlsToDelete.length > 0) {
        await deleteImages(urlsToDelete);
    }

    let uploadedUrls = [];
    if (files && files.length > 0) {
        uploadedUrls = await uploadImages(files);

        const urlsPromises = uploadedUrls.map(url =>  {

            const multimedia = {id_event, url};

            return multimediaRepository.uploadMedia(multimedia);
        });

        await Promise.all(urlsPromises);
    }

    return { updatedEvent, newUrls: uploadedUrls };
}

async function createEvent(event)
{
    const eventAdded = await eventRepository.createEvent(event);

    return eventAdded;
}

async function deleteEvent(eventId)
{
    const multimediaUrls = await eventRepository.getUrls(eventId);

    const urlsToDelete = multimediaUrls.map(multimedia => multimedia.url);

    await deleteImages(urlsToDelete);
    await eventRepository.deleteEvent(eventId);
}

async function getEvent(institutionId)
{
    const incompleteEvents = await eventRepository.getEventByInstitutionId(institutionId);


    const eventsPromises = incompleteEvents.map(async event => 
    {
        const eventUrls = await eventRepository.getUrls(event.id_event);

        const urls = eventUrls.map(event => event.url);

        return  {...event, urls};
    });

    const events = await Promise.all(eventsPromises);

    return events;
}


module.exports = {uploadImages,createEvent,updateEvent,deleteImages,deleteEvent,getEvent}