//error handling
const User = require("../models/User");
const userService = require("../services/user.service");
const Joi = require("@hapi/joi");

//validation
const schema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

class UserController {
  async userControl(req, res) {
    //validate data
    const { error } = schema.validate(req.body);
    // res.send(schema.validate(req.body));
    if (error) return res.status(400).send(error.details[0].message);

    const { email, password } = req.body; //for the line below this to use in services
    const { status, data, message } = await userService.userControl(
      email,
      password
    );
    res.status(status);
    res.json({ message, data });
  }
}

module.exports = UserController;
