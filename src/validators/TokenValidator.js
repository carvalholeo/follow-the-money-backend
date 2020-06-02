const { Segments, Joi } = require('celebrate');

module.exports =  {
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
        session: Joi.string().required(),
    }).unknown()
}