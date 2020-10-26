import { body } from "express-validator"

import TokenValidator from "./TokenValidator";

export default {
  createAndUpdateUser: [
    body("email")
      .isEmail()
      .normalizeEmail()
      .notEmpty({ ignore_whitespace: true })
      .trim()
      .exists(),

    body("username")
      .isString()
      .notEmpty({ ignore_whitespace: true })
      .isLength({ min: 3, max: 50 })
      .trim()
      .exists(),

    body("password")
      .isString()
      .notEmpty({ ignore_whitespace: true })
      .isLength({ min: 8, max: 254 })
      .trim()
      .exists()
  ],

  loginUser: [
    ...TokenValidator,
    body("username")
      .isString()
      .notEmpty({ ignore_whitespace: true })
      .isLength({ min: 3, max: 50 })
      .trim()
      .exists(),

    body("password")
      .isString()
      .notEmpty({ ignore_whitespace: true })
      .isLength({ min: 8, max: 254 })
      .trim()
      .exists()
  ]
}
