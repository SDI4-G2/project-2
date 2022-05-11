const UserController = require("../controllers/user.controller");

const userController = new UserController();

const router = require("express").Router();


router.get("/testing", function (req, res) {
  res.send("testing");
});

router.post("/register", userController.register);
router.post("/login", userController.userControl);

module.exports = router;
