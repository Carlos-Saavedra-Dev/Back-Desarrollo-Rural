const multimediaRepository = require('../repository/MultimediaRepository');

async function uploadMedia(multimedia) 
{
    const media = await multimediaRepository.uploadMedia(multimedia);

    return media;
}


module.exports = {uploadMedia}