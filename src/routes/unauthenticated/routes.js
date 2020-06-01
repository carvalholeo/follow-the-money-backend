const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const SessionController = require('../../controllers/SessionController');
const UserController = require('../../controllers/UserController');

const routes = express.Router();

routes.post('/session', celebrate({
    [Segments.BODY]: Joi.object({
        username: Joi.string()
            .min(3)
            .max(50)
            .required(),
        password: Joi.string()
            .min(8)
            .max(254)
            .required()
})}), SessionController.create);

routes.post('/users', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string()
            .required()
            .email(),
        username: Joi.string()
            .min(3)
            .max(50)
            .required(),
        password: Joi.string()
            .min(8)
            .max(254)
            .required()
    })
}), UserController.create);

module.exports = routes;