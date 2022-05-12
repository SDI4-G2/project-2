const express = require('express');
const router = express.Router();

const CategoryController = require("../controllers/category.controller");

const categoryController = new CategoryController();

router.use('/', (req, res, next) => {
    const result = validator.authenticateToken(req.headers['authorization']);
    if (result.status) {
        res.status(result.status);
        return res.json(result.message);
    }
    res.locals.user = result.data;
          
    next();
})

router.get("/category", categoryController.allcategory);
router.post("/category", categoryController.createcategory);
router.put("/category/:id", categoryController.updatecategory);
router.delete("/category/:id", categoryController.deletecategory);

module.exports = router;