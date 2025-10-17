const { validationResult } = require("express-validator");

exports.signUp = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.StatusCode = 422;
    error.data = errors.array();
    return next(error); // ✅ no rompe el flujo, pasa al manejador global
  }
  const email = req.body.email;
  const password = req.body.password;
};
