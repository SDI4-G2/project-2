const articleService = require('../services/article.service');
const userService = require('../services/user.service');
const authentication = require('../middleware/jwt.middleware');

class ArticleController {
  async listAll(req, res) {
    const { status, data, message } = await articleService.listAll(res.locals.user.subscription);

    res.status(status);
    res.json({ message, data });
  }

  // async list(req, res) {
  //   const { status, data, message } = await articleService.list();

  //   res.status(status);
  //   res.json({ message, data });
  // }
}

module.exports = ArticleController;
