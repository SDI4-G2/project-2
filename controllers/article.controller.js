const articleService = require('../services/article.service');
const userService = require('../services/user.service');
const authentication = require('../middleware/jwt.middleware');

class ArticleController {
  // List all the Articles
  async listAll(req, res) {
    const { status, data, message } = await articleService.listAll(res.locals.user.subscription);

    res.status(status);
    res.json({ message, data });
  }

  //List an Article via url id
  async listOne(req, res) {
    const reqArticleId = req.params.articleid;

    if (isNaN(reqArticleId) === true) {
      res.status(400);
      res.send('Article ID need to be integers.');
      return;
    }

    const { status, data, message } = await articleService.listOne(reqArticleId, res.locals.user.subscription);

    res.status(status);
    res.json({ message, data });
  }

  //Add Article
  async add(req, res) {
    const { url, free_to_view } = req.body;

    if (res.locals.user.role !== 'admin') {
      res.status(400);
      res.send('Please login via admin credentials.');
      return;
    }

    if (!categoryid || !url || free_to_view == null) {
      res.status(400);
      res.send('Please enter categoryid, url and free_to_view in Body JSON format.');
      return;
    }

    if (typeof categoryid !== 'number') {
      res.status(400);
      res.send('categoryid should be an integer.');
      return;
    }

    if (typeof free_to_view !== 'boolean') {
      res.status(400);
      res.send('free_to_view should be either true or false.');
      return;
    }

    if (
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(url) === false
    ) {
      res.status(400);
      res.send('URL should be in HTML format (e.g. https://xxxxx.yyy)');
      return;
    }

    const { status, data, message } = await articleService.add({ categoryid, url, free_to_view }).catch(function (err) {
      res.send({
        Message: 'Enter valid categoryid, articleid, url or free_to_view.',
      });
    });

    res.status(status);
    res.json({ message, data });
  }

  //Update Article
  async update(req, res) {
    const reqArticleId = req.params.articleid;
    const { categoryid, url, free_to_view } = req.body;

    if (isNaN(reqArticleId) === true) {
      res.status(400);
      res.send('Article ID need to be integers.');
      return;
    }

    if (res.locals.user.role !== 'admin') {
      res.status(400);
      res.send('Please login via admin credentials.');
      return;
    }

    const { status, data, message } = await articleService.update(reqArticleId, { categoryid, url, free_to_view }).catch(function (err) {
      res.send({
        Message: 'Enter valid categoryid, articleid, url or free_to_view.',
      });
    });

    res.status(status);
    res.json({ message, data });
  }

  //Delete Article
  async erase(req, res) {
    const reqArticleId = req.params.articleid;

    if (isNaN(reqArticleId) === true) {
      res.status(400);
      res.send('Article ID need to be integers.');
      return;
    }

    if (res.locals.user.role !== 'admin') {
      res.status(400);
      res.send('Please login via admin credentials.');
      return;
    }

    const { status, data, message } = await articleService.erase(reqArticleId);

    res.status(status);
    res.json({ message, data });
  }
}

module.exports = ArticleController;
