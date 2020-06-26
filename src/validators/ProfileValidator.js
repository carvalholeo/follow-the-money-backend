const { Segments, Joi } = require('celebrate');
const { headers } = require('./TokenValidator');

module.exports =  {
    headers,
    [Segments.BODY]: Joi.object().keys({
        first_name: Joi.string().max(255),
        surname: Joi.string().max(255),
        url_photo: Joi.string().max(255),
        birthday: Joi.date(),
        biography: Joi.string().max(600),
        facebook_profile: Joi.string().max(255),
        twitter_profile: Joi.string().max(255),
        instagram_profile: Joi.string().max(255),
        personal_site_url: Joi.string().max(255),
    })
}