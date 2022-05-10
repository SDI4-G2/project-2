const Videos = require('../models/Video');
const Category = require('../models/Category');

Videos.sync().then((data) => {
    console.log("Table & model synced successfully");
}).catch((err) => {
    console.log("Error syncing Table & model");
});

module.exports = {
    getVideos: async (subscription) => {
        const result = {
            status: null,
            message: null,
            data: null
        }

        let videos;
        let count;

        if (subscription) {
            videos = await Videos.findAll({include:[{model:Category, attributes:['description']}]});
            count = await Videos.count();
        } else {
            videos = await Videos.findAll({where: {freeToView: true}, include:[{model:Category, attributes:['description']}]});
            count = await Videos.count({where: {freeToView: true}});
        }

        result.status = 200;
        result.message = `${count} row(s) returned`;
        result.data = videos;
        return result;
    },

    insertVideos: async (role, videoJson) => {
        const result = {
            status: null,
            message: null,
            data: null
        }

        if (role != 'admin') {
            result.status = 401;
            result.message = `Unauthorized access`;
            return result;
        }

        const newVideo = await Videos.create({
            categoryid: videoJson.category_id,
            url: videoJson.url,
            freeToView: videoJson.free_to_view
        });

        await newVideo.save();
        result.status = 200;
        result.message = `Record insert successfully`;
        result.data = newVideo;
        return result;
    }
}