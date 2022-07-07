const categoryService = require("../services/category.service");

class CategoryController {
  // GET /category
  async allcategory(req, res, next){
    
    const result = await categoryService.allcategory();    
    res.status(result.status);
    return res.json({  data: result.data, message: result.message });
  }
  // POST /category
  async createcategory(req, res, next){
    const role = res.locals.user.role;

    if (typeof req.body.description !== "string" ) {
        res.status(400); // bad request
        return res.json({ message: "Incorrect request data" });
    }
    
    const result = await categoryService.createcategory(role, req.body.description);    
    res.status(result.status);
    return res.json({  data: result.data, message: result.message });
  }
  // PUT /category {:id}
  async updatecategory(req, res, next){
    const role = res.locals.user.role;
    const i = parseInt(req.params.id); 

    if (typeof i !== "number" ) {
        res.status(400); // bad request
        return res.json({ message: "Incorrect request data" });
    }
    
    const result = await categoryService.updatecategory(role, i, req.body.description);    
    res.status(result.status);
    return res.json({  data: result.data, message: result.message });
  }
  // DELETE /category {:id}
  async deletecategory(req, res, next){
    const role = res.locals.user.role;
    const i = parseInt(req.params.id); 

    if (typeof i !== "number" ) {
        res.status(400); // bad request
        return res.json({ message: "Incorrect request data" });
    }

    const result = await categoryService.deletecategory(role, i);    
    res.status(result.status);
    return res.json({  data: result.data, message: result.message });
  }
}

module.exports = CategoryController;