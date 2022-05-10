const videoService = require('../services/video.service');

class VideoController {
    async getVideos(req, res) {

        const role = res.locals.user.role;
        const subscription = res.locals.user.subscription;
        const result = await videoService.getVideos(role, subscription)
        
        res.status(result.status);
        res.json({message: result.message, data: result.data});
    }
}

module.exports = VideoController;