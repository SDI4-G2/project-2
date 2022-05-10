//when successful / no errors

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");

module.exports = {
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
      process.env.TOKEN_SECRET,
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
