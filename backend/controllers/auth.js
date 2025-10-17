const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.signUp = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error); // ✅ no rompe el flujo, pasa al manejador global
  }
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const status = req.body.status;

  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email: email,
        password: hashedPw,
        status: status,
      });
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "User created!",
        userId: result._id,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
