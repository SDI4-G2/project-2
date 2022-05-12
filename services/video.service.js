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
            videos = await Videos.findAll({ include: [{ model: Category, attributes: ['description'] }] });
            count = await Videos.count();
        } else {
            videos = await Videos.findAll({ where: { freeToView: true }, include: [{ model: Category, attributes: ['description'] }] });
            count = await Videos.count({ where: { freeToView: true } });
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

        try {
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

        } catch (err) {
            result.status = 403;
            result.message = `Insertion Failure!`;
            result.data = err.name;
            return result;
        }
    },

    updateVideos: async (role, videoJson, videoid) => {
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

        try {
            const updateVideo = await Videos.update({
                categoryid: videoJson.category_id,
                url: videoJson.url,
                freeToView: videoJson.free_to_view
            },{where:{videoid: videoid}});

            const rowUpdated = parseInt(JSON.stringify(updateVideo).slice(1,2))

            if (rowUpdated) {
                result.status = 200;
                result.message = `Record updated successfully`;
                return result;
            } else {
                result.status = 400;
                result.message = `No record updated`;
                return result;

            }
        } catch (err) {
            
            result.status = 403;
            result.message = `Update Failure!`;
            result.data = err.name;
            return result;
        }
    },

    deleteVideos: async (role, videoid) => {
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

        try {
            const deleteVideo = await Videos.destroy({where:{videoid: videoid}});

            if (deleteVideo) {
                result.status = 200;
                result.message = `Record deleted successfully`;
                return result;
            } else {
                result.status = 400;
                result.message = `Record does not exist`;
                return result;
            }
        } catch (err) {
            console.log(err);
            result.status = 403;
            result.message = `Deletion Failure!`;
            result.data = err.name;
            return result;
        }
    }
}