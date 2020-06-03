const { Segments, Joi } = require('celebrate');
const { headers } = require('./TokenValidator');

module.exports = {
    mfaRequired() {
        return {
            headers,
            [Segments.BODY]: Joi.object().keys({
                mfa_code: Joi.string().min(6).max(6).required()
            })
        };
    },

    token() {
        return {
            [Segments.HEADERS]: Joi.object({
                token: Joi.string().required()
            }).unknown()
        };
    }
}