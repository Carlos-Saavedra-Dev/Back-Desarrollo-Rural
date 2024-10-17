const eventService = require('../service/EventService');
const multimediaService = require('../service/MultimediaService');
async function createEvent (req,res) {

    try {
        
        const {files} = req;
        let urls = null;
        if (files) 
        {
            urls = await eventService.uploadImages(files);
        }

        const {title, description, institutionId} = req.body;
        const {userId} = req.user;

        const event = {
            title,description,
            id_institution : institutionId,
            created_by: userId
        };

        const eventAdded = await eventService.createEvent(event);

        const eventResponse = {
            ...eventAdded,
            created_by: undefined
        };

        if (urls) {
            const multimediaPromise = urls.map(async (url) => {
                let multimedia = {  
                    id_event: eventAdded.id_event,  
                    url: url
                };
                return multimediaService.uploadMedia(multimedia);
            });
        
            const multimediaSolved = await Promise.all(multimediaPromise);
            const multimediaUrls = multimediaSolved.map(media => media.url);
            eventResponse.urls = multimediaUrls;
        } else {
            eventResponse.urls = [];
        }

        return res.status(201).json({data: eventResponse});

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: error.message});
    }
}

async function updateEvent(req, res) {
    try {
        const { id_event, title, description, urlsToDelete } = req.body;
        const { files } = req;  

        const event = { title, description };

        const { updatedEvent, newUrls } = await eventService.updateEvent(id_event, event, files, urlsToDelete);

        return res.status(200).json({data:{
            event: {...updatedEvent, created_by: undefined, id_institution: undefined},
            url: newUrls
        }});

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


async function deleteEvent(req,res)
{
    try {
        const { eventId } = req.body;


        await eventService.deleteEvent(eventId);

        return res.status(204).json();

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


module.exports = {createEvent,updateEvent,deleteEvent}