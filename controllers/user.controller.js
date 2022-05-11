//error handling
const userService = require("../services/user.service");
const Joi = require("@hapi/joi");

// validation;
const registerSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
  username: Joi.string().min(6).required(),
});
const loginSchema = Joi.object({
  email: Joi.string().min(6).email(),
  password: Joi.string().min(6).required(),
  username: Joi.string().min(6),
}).xor("email", "username");

class UserController {
  async userControl(req, res) {
    //validate data
    const { error } = loginSchema.validate(req.body);
    // res.send(schema.validate(req.body));
    if (error) return res.status(400).send(error.details[0].message);

    const { email, password, username } = req.body; //for the line below this to use in services
    const { status, data, message } = await userService.userControl(
      email,
      password,
      username
    );
    res.status(status);
    res.json({ message, data });
  }
}

module.exports = UserController;
