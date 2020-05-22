const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "email field is required";
  }

  if (!Validator.isLength(data.email, { min: 2, max: 30 })) {
    errors.email = "Email must be between 2 and 30 characters";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "password must be at least 6 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
