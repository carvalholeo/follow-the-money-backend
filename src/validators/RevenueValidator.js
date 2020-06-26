const { Segments, Joi } = require('celebrate');
const { headers } = require('./TokenValidator');

module.exports = {
    getRevenue() {
        return {
            headers,
            [Segments.QUERY]: Joi.object().keys({
                page: Joi.number(),
            })
        };
    },

    createRevenue() {
        return {
            headers,
            [Segments.BODY]: Joi.object().keys({
                source: Joi.string().max(50).required(),
                revenue_category_id: Joi.number().required(),
                expected_amount: Joi.number().required(),
                paid_amount: Joi.number(),
                expected_date: Joi.date().required(),
                effective_date: Joi.date(),
                reference_month: Joi.date().required(),
                is_paid: Joi.bool().required()
            })
        };
    },

    updateRevenue() {
        return {
            headers,
            [Segments.BODY]: Joi.object().keys({
                source: Joi.string().max(50).required(),
                revenue_category_id: Joi.number().required(),
                expected_amount: Joi.number().required(),
                paid_amount: Joi.number(),
                expected_date: Joi.date().required(),
                effective_date: Joi.date(),
                reference_month: Joi.date().required(),
                is_paid: Joi.bool().required()
            }),
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number()
                    .required()
            })
        };
    },

    deleteRevenue() {
        return {
            headers,
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number()
                    .required()
            })
        };
    }
}