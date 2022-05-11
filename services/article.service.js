const res = require('express/lib/response');
const Article = require('../models/Article');
const User = require('../models/User');
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

  // list: async (reqArticleId) => {
  //   const result = {
  //     status: null,
  //     message: null,
  //     data: null,
  //   };
  //   const article = await Article.findAll({ where: { free_to_view: res.locals.user.subcription } });

  //   result.status = 200;
  //   result.message = 'Displayed successfully';
  //   result.data = article;

  //   return result;
  // },
};
