const { Category } = require("../models/DBConn");

module.exports = {
    allcategory: async () => {
        let result = {
          message: null,
          status: null,
          data: null,
        };
        const category = await Category.findAll();
    
        if (!category) {
            result.message = `Category is not found.`;
            result.status = 404;
            return result;
        }
    
        result.data = category;
        result.status = 200;
        result.message = "fetching successful";
    
        return result;
    },
    createcategory: async (role, postDescription) => {
        let result = {
          message: null,
          status: null,
          data: null,
        };

        if (role != 'admin') {
            result.status = 401;
            result.message = `Unauthorized access`;
            return result;
        }

        const category = await Category.findAll();

        const newData = Category.build({ description: postDescription });
        await newData.save();
        
        result.status = 200;
        result.message = "create successful";
    
        return result;
    },
    updatecategory: async (role, categoryID, postDescription) => {
        let result = {
          message: null,
          status: null,
          data: null,
        };

        if (role != 'admin') {
            result.status = 401;
            result.message = `Unauthorized access`;
            return result;
        }

        const category = await Category.findByPk(categoryID);
    
        if (!category) {
            result.message = `Category is not found.`;
            result.status = 404;
            return result;
        }

        category.description = postDescription;
        await category.save();
    
        result.data = category;
        result.status = 200;
        result.message = "update successful";
    
        return result;
    },
    deletecategory: async (role, categoryID) => {
        let result = {
          message: null,
          status: null,
          data: null,
        };

        if (role != 'admin') {
            result.status = 401;
            result.message = `Unauthorized access`;
            return result;
        }

        const category = await Category.findByPk(categoryID);
    
        if (!category) {
            result.message = `Category is not found.`;
            result.status = 404;
            return result;
        }

        await category.destroy({
            where: { categoryid: categoryID },
        });

        result.status = 200;
        result.message = "delete successful";
    
        return result;
    },
};
