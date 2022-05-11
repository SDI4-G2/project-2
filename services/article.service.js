const res = require('express/lib/response');
const Article = require('../models/Article');
const Category = require('../models/Category');
const { subscribe } = require('../routes/article.routes');

module.exports = {
  listAll: async (subcription) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };
    const article = await Article.findAll({ where: { free_to_view: [!subcription, 'true'] } });

    result.status = 200;
    result.message = 'Displayed successfully';
    result.data = article;

    return result;
  },

  listOne: async (reqArticleId, subcription) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };
    const article = await Article.findOne({ where: { articleid: reqArticleId, free_to_view: [!subcription, 'true'] } });

    result.status = 200;
    result.message = 'Displayed successfully';
    result.data = article;

    return result;
  },

  add: async ({ categoryid, url, free_to_view }) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    const newArticle = Article.build({ categoryid: categoryid, url: url, free_to_view: free_to_view });
    await newArticle.save();

    result.status = 200;
    result.message = 'Added successfully';
    result.data = newArticle;

    return result;
  },

  update: async ({ articleid, categoryid, url, free_to_view }) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };
    const article = await Article.findByPk(articleid);

    article.categoryid = categoryid;
    article.url = url;
    article.free_to_view = free_to_view;
    await article.save();

    result.status = 200;
    result.message = 'Updated successfully';
    result.data = article;

    return result;
  },
};
