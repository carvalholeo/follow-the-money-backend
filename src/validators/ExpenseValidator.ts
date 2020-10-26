import { body, param, query } from 'express-validator';
import TokenValidator from './TokenValidator';

export default {
  getExpense: [
    ...TokenValidator,
    query('page')
      .isInt({ min: 1 })
      .optional()
      .trim(),
  ],

  postExpense: [
    ...TokenValidator,
    body('source')
      .isString()
      .isLength({ max: 50 })
      .notEmpty({ ignore_whitespace: true })
      .trim(),

    body('expense_type_id')
      .isInt({ min: 1 })
      .notEmpty({ ignore_whitespace: true })
      .trim(),

    body('expense_category_id')
      .isInt({ min: 1 })
      .notEmpty({ ignore_whitespace: true })
      .trim(),

    body('expected_amount')
      .isFloat({ locale: 'pt-BR' })
      .notEmpty({ ignore_whitespace: true })
      .trim(),

    body('paid_amount')
      .isFloat({ locale: 'pt-BR' })
      .optional()
      .trim(),

    body('due_date')
      .isDate()
      .notEmpty({ ignore_whitespace: true })
      .trim(),

    body('payday')
      .isDate()
      .optional()
      .trim(),

    body('is_paid')
      .isBoolean()
      .notEmpty({ ignore_whitespace: true })
      .trim()
  ],

  putExpense: [
    ...TokenValidator,
    body('source')
      .isString()
      .isLength({ max: 50 })
      .notEmpty({ ignore_whitespace: true })
      .trim(),

    body('expense_type_id')
      .isInt({ min: 1 })
      .notEmpty({ ignore_whitespace: true })
      .trim(),

    body('expense_category_id')
      .isInt({ min: 1 })
      .notEmpty({ ignore_whitespace: true })
      .trim(),

    body('expected_amount')
      .isFloat({ locale: 'pt-BR' })
      .notEmpty({ ignore_whitespace: true })
      .trim(),

    body('paid_amount')
      .isFloat({ locale: 'pt-BR' })
      .optional()
      .trim(),

    body('due_date')
      .isDate()
      .notEmpty({ ignore_whitespace: true })
      .trim(),

    body('payday')
      .isDate()
      .optional()
      .trim(),

    body('is_paid')
      .isBoolean()
      .notEmpty({ ignore_whitespace: true })
      .trim(),

    param('id')
      .isInt({ min: 1 })
      .notEmpty({ ignore_whitespace: true })
      .trim()
  ],

  deleteExpense: [
    ...TokenValidator,
    param('id')
      .isInt({ min: 1 })
      .notEmpty({ ignore_whitespace: true })
      .trim()
  ]
};
