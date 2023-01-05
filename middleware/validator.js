import { validationResult } from "express-validator";
import {body} from "express-validator";

const validateRequest = (req, res, next) => {
	const validationErrors = validationResult(req);

	if (validationErrors.isEmpty()) {
		return next();
	} else {
		res.status(400).send({ errors: validationErrors.array() });
	}
};

const userValidator = [
  body("username")
    .notEmpty()
    .withMessage("username is required!")
    .trim()
    .isLength({min:2})
    .withMessage("name is to short!"),

  body("password")
  .notEmpty()
  .trim()
  // .isStrongPassword()
  // .withMessage("Password is not strong enough. You need 1 uppercase-char, 1 lowercase-char, 1 number-char, 1 symbol-char")
]

const loginValidator = [
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .trim(),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .trim(),
]

export {validateRequest ,userValidator, loginValidator}