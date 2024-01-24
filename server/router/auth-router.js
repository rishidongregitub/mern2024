const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller");
const singUpSchema = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");

router.route("/").get(authcontrollers.home);

router
  .route("/register")
  .post(validate(singUpSchema), authcontrollers.register);

router.route("/login").post(authcontrollers.login);

module.exports = router;
