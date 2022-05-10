const UserController = require("../controllers/user.controller");

// const User = require("../models/User");
// const jwt = require("jsonwebtoken");

const userController = new UserController();

const router = require("express").Router();

router.post("/login", userController.userControl);

module.exports = router;
