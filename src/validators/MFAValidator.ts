import { body } from 'express-validator';
import TokenValidator from './TokenValidator';

export default {
  mfaRequired: [
    TokenValidator[0],
    body('mfa_code')
      .isInt()
      .notEmpty({ ignore_whitespace: true })
      .isLength({ min: 6, max: 6 })
      .trim()
  ],
  token: [
    TokenValidator[0]
  ]
};
