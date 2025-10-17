const express = require("express");
const { body } = require("express-validator");
const upload = require("../middleware/upload");

const User = require("../models/user.js");
const authController = require("../controllers/auth.js");

const router = express.Router();

//Sign In
router.put(
  "/signup",
  upload.none(),
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          console.log("🧪 Probando búsqueda sin filtro:", userDoc);
          if (userDoc) {
            return Promise.reject("Este email ya existe en la base de datos");
          }
        });
      }),
    body("password").trim().isLength({ min: 3 }),
    // body("name").trim().not().isEmpty(),
  ],
  authController.signUp
);

module.exports = router;
