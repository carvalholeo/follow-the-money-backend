const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('./controllers/UserController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

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
routes.delete('/session', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown()
}), SessionController.destroy);

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

routes.get('/users', UserController.index);

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()
}), ProfileController.index);

module.exports = routes;