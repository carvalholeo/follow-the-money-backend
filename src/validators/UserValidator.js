const { Segments, Joi } = require('celebrate');
const { headers } = require('./TokenValidator');

module.exports =  {
    createUser() {
        return {
            [Segments.BODY]: Joi.object().keys({
                email: Joi.string().required().email(),
                username: Joi.string().min(3).max(50).required(),
                password: Joi.string().min(8).max(254).required()
            })
        };
    },
    
    updateUser() {
        return {
            headers,
            [Segments.BODY]: Joi.object().keys({
                email: Joi.string().required().email(),
                username: Joi.string().min(3).max(50).required(),
                password: Joi.string().min(8).max(254).required()
            })
        };
    },

    loginUser() {
        return {
            [Segments.BODY]: Joi.object({
                username: Joi.string()
                    .min(3)
                    .max(50)
                    .required(),
                password: Joi.string()
                    .min(8)
                    .max(254)
                    .required()
            })
        };
    }

}