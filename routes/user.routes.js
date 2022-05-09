const router = require("express").Router();
const User = require("../models/User");

// //Validation
// const Joi = require("@hapi/joi");

// const schema = Joi.object({
//   email: Joi.string().min(6).required().email(),
//   password: Joi.string().min(6).required(),
// });

router.get("/testing", async (req, res) => {
  res.send("helloworld");
});

// router.post("/login", async (req, res) => {
//validate data
//   const { error } = schema.validate(req.body);
//   res.send(error.details[0].message);
//   if (error) return res.status(400).send(error.details[0].message);
// });

module.exports = router;
