//error handling
const userService = require('../services/user.service');
const Joi = require('@hapi/joi');

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
}).xor('email', 'username');

const editUsernameSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
  username: Joi.string().min(6).required(),
});

const editPasswordSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
  newpassword: Joi.string().min(6).required(),
});

class UserController {
  async register(req, res) {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { email, password, username } = req.body;

    const result = await userService.register(email, password, username);
    res.status(result.status);
    res.json({ message: result.message, data: result.data });
  }

  async userControl(req, res) {
    //validate data

    if (req.body.email || req.body.username) {
      const { error } = loginSchema.validate(req.body);
      // res.send(schema.validate(req.body));
      if (error) return res.status(400).send(error.details[0].message);
    } else {
      return res.status(400).send('Username or Email required');
    }

    const { email, password, username } = req.body; //for the line below this to use in services
    const { status, data, message } = await userService.userControl(email, password, username);
    res.status(status);
    res.json({ message, data });
  }

  async forgotPw(req, res) {
    //validate data

    if (req.body.email) {
      const { error } = loginSchema.validate(req.body);
      // res.send(schema.validate(req.body));
      if (error) return res.status(400).send(error.details[0].message);
    } else {
      return res.status(400).send('Email required');
    }

    const { email } = req.body; //for the line below this to use in services
    const { status, data, message } = await userService.forgotPw(email);
    res.status(status);
    res.json({ message, data });
  }

  async editUsername(req, res) {
    const { error } = editUsernameSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { email, password, username } = req.body;

    const result = await userService.editUsername(email, password, username);
    res.status(result.status);
    res.json({ message: result.message, data: result.data });
  }

  async editPassword(req, res) {
    const { error } = editPasswordSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { email, password, newpassword } = req.body;

    const result = await userService.editPassword(email, password, newpassword);
    res.status(result.status);
    res.json({ message: result.message, data: result.data });
  }

  async updateSubscription(req, res) {
    if (!req.body.email) {
      return res.status(400).send('Email required');
    }

    const { email, subscription } = req.body;

    const result = await userService.updateSubscription(email, subscription);
    res.status(result.status);
    res.json({ message: result.message, data: result.data });
  }
}

module.exports = UserController;
