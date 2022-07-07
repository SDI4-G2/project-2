const express = require('express');
const router = express.Router();
const validator = require('../middleware/jwt.middleware');

const VideoController = require('../controllers/video.controller');
const videoController = new VideoController();

router.use('/', (req, res, next) => {
    const result = validator.authenticateToken(req.headers['authorization']);
    if (result.status) {
        res.status(result.status);
        return res.json(result.message);
    }
    res.locals.user = result.data;
          
    next();
})

router.get('/video', videoController.getVideos);
router.post('/video', videoController.insertVideos);
router.put('/video/:id', videoController.updateVideos);
router.delete('/video/:id', videoController.deleteVideos);

module.exports = router;