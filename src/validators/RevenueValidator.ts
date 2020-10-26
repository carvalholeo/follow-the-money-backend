import { query, body, param } from "express-validator"
import TokenValidator from "./TokenValidator";

export default {
  getRevenue: [
    ...TokenValidator,
    query("page")
      .optional()
      .isInt({ min: 1 })
      .trim()
  ],

  createRevenue: [
    ...TokenValidator,
    body("source")
      .isString()
      .isLength({ max: 50 })
      .notEmpty({ ignore_whitespace: true })
      .trim(),

    body("revenue_category_id")
      .isInt({ min: 1 })
      .notEmpty({ ignore_whitespace: true })
      .trim(),

    body("expected_amount")
      .isFloat({ locale: "pt-BR" })
      .notEmpty({ ignore_whitespace: true })
      .trim(),

    body("paid_amount")
      .isFloat({ locale: "pt-BR" })
      .optional()
      .trim(),

    body("expected_date")
      .isDate()
      .notEmpty({ ignore_whitespace: true })
      .trim(),

    body("effective_date")
      .isDate()
      .optional()
      .trim(),

    body("is_paid")
      .isBoolean()
      .notEmpty({ ignore_whitespace: true })
      .trim()
  ],

  updateRevenue: [
    ...TokenValidator,
    body("source")
      .isString()
      .isLength({ max: 50 })
      .notEmpty({ ignore_whitespace: true })
      .trim(),

    body("revenue_category_id")
      .isInt({ min: 1 })
      .notEmpty({ ignore_whitespace: true })
      .trim(),

    body("expected_amount")
      .isFloat({ locale: "pt-BR" })
      .notEmpty({ ignore_whitespace: true })
      .trim(),

    body("paid_amount")
      .isFloat({ locale: "pt-BR" })
      .optional()
      .trim(),

    body("expected_date")
      .isDate()
      .notEmpty({ ignore_whitespace: true })
      .trim(),

    body("effective_date")
      .isDate()
      .optional()
      .trim(),

    body("is_paid")
      .isBoolean()
      .notEmpty({ ignore_whitespace: true })
      .trim(),

    param("id")
      .isInt({ min: 1 })
      .notEmpty({ ignore_whitespace: true })
  ],

  deleteRevenue: [
    ...TokenValidator,
    param("id")
      .isInt({ min: 1 })
      .notEmpty({ ignore_whitespace: true }),
  ]
}
