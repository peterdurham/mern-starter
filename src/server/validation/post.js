const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.message = !isEmpty(data.message) ? data.message : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "name field is required";
  }

  if (!Validator.isLength(data.message, { min: 10, max: 300 })) {
    errors.message = "Post must be between 10 and 300 characters";
  }

  if (Validator.isEmpty(data.message)) {
    errors.message = "text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
