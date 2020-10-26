import { body, param } from "express-validator";
import TokenValidator from "./TokenValidator";

export default {
  createTypeAndCategory: [
    ...TokenValidator,
    body("name")
      .isString()
      .trim()
      .notEmpty({ ignore_whitespace: true })
      .isLength({ min: 3, max: 100 })
  ],

  updateTypeAndCategory: [
    ...TokenValidator,
    body("name")
      .isString()
      .trim()
      .notEmpty({ ignore_whitespace: true })
      .isLength({ min: 3, max: 100 }),

    param("id")
      .isInt({ min: 1 })
      .notEmpty({ ignore_whitespace: true }),
  ],

  deleteTypeAndCategory: [
    ...TokenValidator,
    param("id")
      .isInt({ min: 1 })
      .notEmpty({ ignore_whitespace: true }),
  ],
}
