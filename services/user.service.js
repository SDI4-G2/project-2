//when successful / no errors

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");

const res = require("express/lib/response");

const fs = require("fs");
const privateKey = fs.readFileSync("./config/jwtRS256.key");


module.exports = {
  register: async (email, password, username) => {
    const result = {
      status: null,
      message: null,
    };

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({
      email: email,
      password: hashPassword,
      username: username,
      subscription: false,
      role: "user",
    });
    const emailExist = await User.findOne({
      where: { email: user.email },
    });
    if (emailExist) {
      result.status = 402;
      result.message = `(${user.email}) Already Exists`;

      return result;
    }
    const usernameExist = await User.findOne({
      where: { username: user.username },
    });
    if (usernameExist) {
      result.status = 401;
      result.message = `(${user.username}) Already Exists`;

      return result;
    }

    try {
      await user.save();
    } catch (err) {
      result.status(err);
    }

    result.status = 200;
    result.message = `${user.username} Created Successfully!`;

    return result;
  },

  userControl: async (email, password) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    //email exists??
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) return res.status(400).send("Email not found");

    //password is correct?
    const validatePw = await bcrypt.compare(password, user.password);
    if (!validatePw) return res.status(400).send("Wrong password");

    //create and assign jwt
    const token = jwt.sign(
      {
        email: user.email,
        password: user.password,
        subscription: user.subscription,
        role: user.role,
      },
      privateKey,
      {
        expiresIn: "1h",
      }
    );
    console.log(token);

    result.status = 200;
    result.message = "Token successfully created!";
    result.data = token;

    return result;
  },
};
