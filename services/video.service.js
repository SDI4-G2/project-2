const Videos = require('../models/Video');

Videos.sync().then((data) => {
    console.log("Table & model synced successfully");
}).catch((err) => {
    console.log("Error syncing Table & model");
});

module.exports = {
    getVideos: async (role, subscription) => {
        const result = {
            status: null,
            message: null,
            data: null
        }

        let videos;
        let count;

        if (subscription) {
            videos = await Videos.findAll();
            count = await Videos.count();
        } else {
            videos = await Videos.findAll({where: {freeToView: true}});
            count = await Videos.count({where: {freeToView: true}});
        }

        result.status = 200;
        result.message = `${count} row(s) returned`;
        result.data = videos;
        return result;
    }
}