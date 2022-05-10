const videoService = require('../services/video.service');

class VideoController {
    async getVideos(req, res) {
        const subscription = res.locals.user.subscription;
        const result = await videoService.getVideos(subscription)
        
        res.status(result.status);
        res.json({message: result.message, data: result.data});
    }

    async insertVideos(req, res) {
        const videoJson = req.body;
        const role = res.locals.user.role;

        if (!req.body.category_id && !req.body.url && !req.body.free_to_view) {
            return res.status(400).json({msg: 'Enter values for category id, url & free to view'});
        }

        if (!req.body.category_id) {
            return res.status(400).json({msg: 'Enter values for category id'});
        }

        if (!req.body.url) {
            return res.status(400).json({msg: 'Enter values for url'});
        }

        if (!req.body.free_to_view) {
            return res.status(400).json({msg: 'Enter values for free to view'});
        }

        const result = await videoService.insertVideos(role, videoJson)

        res.status(result.status);
        res.json({message: result.message, data: result.data});
    }
}

module.exports = VideoController;