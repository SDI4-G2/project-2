const UserController = require("../controllers/user.controller");

// const User = require("../models/User");
// const jwt = require("jsonwebtoken");

const userController = new UserController();

const router = require("express").Router();

//Validation
// const Joi = require("@hapi/joi");
// const bcrypt = require("bcryptjs/dist/bcrypt");

// const schema = Joi.object({
//   email: Joi.string().min(6).required().email(),
//   password: Joi.string().min(6).required(),
// });

router.post("/login", userController.userControl);
//validate data
//   const { error } = schema.validate(req.body);
//   // res.send(schema.validate(req.body));
//   if (error) return res.status(400).send(error.details[0].message);

//   //email exists?
//   const user = await User.findOne({
//     where: { email: req.body.email },
//   });

//   if (!user) return res.status(400).send("Email not found");

//   //password is correct?
//   const validatePw = await bcrypt.compare(req.body.password, user.password);
//   if (!validatePw) return res.status(400).send("Wrong password");

//   //create and assign jwt

//   const token = jwt.sign(
//     {
//       email: user.email,
//       password: user.password,
//       subscription: user.subscription,
//       role: user.role,
//     },
//     process.env.TOKEN_SECRET,
//     {
//       expiresIn: "1h",
//     }
//   );
//   res.header("auth-token", token).send(token);
// });

module.exports = router;
