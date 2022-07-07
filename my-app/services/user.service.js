//when successful / no errors

const User = require("../models/User");
const { Op } = require("sequelize");
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

  userControl: async (email, password, username) => {
    const result = {
      status: null,
      message: null,
      data: null,
    };

    //email/username exists??
    let user = await User.findOne({
      where: {
        [Op.or]: [
          { username: { [Op.eq]: username } },
          { email: { [Op.eq]: email } },
        ],
      },
    });
    // documentation =
    // [Op.or]:[
    // { username: username },
    // { email: email }, ]
    // does not work because there is a bug

    if (!user) {
      result.status = 400;
      result.message = "Username or email not found. Please try again.";
      return result;
    }

    //password is correct?
    const validatePw = await bcrypt.compare(password, user.password);
    if (!validatePw) {
      result.status = 400;
      result.message = "Password does not match. Please try again.";
      return result;
    }
    //create and assign jwt
    const token = jwt.sign(
      {
        email: user.email,
        username: user.username,
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
