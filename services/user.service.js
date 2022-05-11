//when successful / no errors

const User = require("../models/User");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");
const fs = require("fs");
const privateKey = fs.readFileSync("./config/jwtRS256.key");

module.exports = {
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
      result.message = "Username or email not found";
      return result;
    }

    //password is correct?
    const validatePw = await bcrypt.compare(password, user.password);
    if (!validatePw) {
      result.status = 400;
      result.message = "Wrong password";
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
