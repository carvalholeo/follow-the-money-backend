import { header } from 'express-validator';

const TokenValidator = [
  header('Authentication')
    .isJWT()
    .isLength({ min: 1 })
    .trim()
    .notEmpty(),

  header('Session')
    .isString()
    .isLength({ min: 1, max: 32 })
    .trim()
    .notEmpty(),
];

export default TokenValidator;
