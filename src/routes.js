const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('./controllers/UserController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const ExpenseCategoriesController = require('./controllers/ExpenseCategoriesController');
const ExpenseTypesController = require('./controllers/ExpenseTypesController');

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

routes.put('/profile/block', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown()
}), UserController.block, SessionController.destroy);
routes.delete('/profile/delete', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown()
}), UserController.delete);
routes.put('/profile/update', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .min(8)
            .max(254)
            .required()
    })
}), UserController.update);

routes.get('/expenses/categories/', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown()
}), ExpenseCategoriesController.index);
routes.post('/expenses/categories/create', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string()
            .min(3)
            .max(100)
            .required()
    })
}), ExpenseCategoriesController.create);
routes.put('/expenses/categories/:id/update', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string()
            .min(3)
            .max(100)
            .required()
    }),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number()
            .required()
    })
}), ExpenseCategoriesController.update);
routes.delete('/expenses/categories/:id/delete', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number()
            .required()
    })
}), ExpenseCategoriesController.delete);

routes.get('/expenses/types/', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown()
}), ExpenseTypesController.index);
routes.post('/expenses/types/create', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string()
            .min(3)
            .max(100)
            .required()
    })
}), ExpenseTypesController.create);
routes.put('/expenses/types/:id/update', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string()
            .min(3)
            .max(100)
            .required()
    }),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number()
            .required()
    })
}), ExpenseTypesController.update);
routes.delete('/expenses/types/:id/delete', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number()
            .required()
    })
}), ExpenseTypesController.delete);

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