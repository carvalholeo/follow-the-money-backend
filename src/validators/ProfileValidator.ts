import { body } from 'express-validator';
import TokenValidator from './TokenValidator';

export default {
  profile: [
    ...TokenValidator,
    body('first_name')
      .isString()
      .isLength({ max: 255 })
      .optional()
      .trim(),

    body('surname')
      .isString()
      .isLength({ max: 255 })
      .optional()
      .trim(),

    body('url_photo')
      .isMimeType()
      .isLength({ max: 255 })
      .optional()
      .trim(),

    body('birthday')
      .isDate()
      .optional()
      .trim(),

    body('facebook_profile')
      .isURL({
        require_valid_protocol: true,
        require_protocol: true,
        require_host: true,
        require_tld: true,
        allow_underscores: true,
        protocols: ['http', 'https']
      })
      .isLength({ max: 255 })
      .optional()
      .trim(),

    body('twitter_profile')
      .isURL({
        require_valid_protocol: true,
        require_protocol: true,
        require_host: true,
        require_tld: true,
        allow_underscores: true,
        protocols: ['http', 'https']
      })
      .isLength({ max: 255 })
      .optional()
      .trim(),

    body('instagram_profile')
      .isURL({
        require_valid_protocol: true,
        require_protocol: true,
        require_host: true,
        require_tld: true,
        allow_underscores: true,
        protocols: ['http', 'https']
      })
      .isLength({ max: 255 })
      .optional()
      .trim(),

    body('personal_site_url')
      .isURL({
        require_valid_protocol: true,
        require_protocol: true,
        require_host: true,
        require_tld: true,
        allow_underscores: true,
        protocols: ['http', 'https']
      })
      .isLength({ max: 255 })
      .optional()
      .trim(),
  ]
};
