const express = require('express');
const router = express.Router();
const validator = require('../middleware/jwt.middleware');

const ArticleController = require('../controllers/article.controller');
const articleController = new ArticleController();

router.use('/', (req, res, next) => {
  const result = validator.authenticateToken(req.headers['authorization']);
  if (result.status) {
    res.status(result.status);
    return res.json(result.message);
  }
  res.locals.user = result.data;

  next();
});

router.get('/article', articleController.listAll);
// router.get('/article/:articleId', articleController.list);

module.exports = router;
