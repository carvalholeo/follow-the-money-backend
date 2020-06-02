const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const authenticatedUser = require('../../middlewares/Auth');
const activatedUser = require('../../middlewares/Activated');
const validSession = require('../../middlewares/ValidSessionToken');
const isAdmin = require('../../middlewares/Administration');

const ExpenseCategoriesController = require('../../controllers/ExpenseCategoriesController');
const ExpenseTypesController = require('../../controllers/ExpenseTypesController');
const InvestmentTypesController = require('../../controllers/InvestmentTypesController');
const InvestmentCategoriesController = require('../../controllers/InvestmentCategoriesController');
const RevenueCategoriesController = require('../../controllers/RevenueCategoriesController');

const routes = express.Router();

routes.use(authenticatedUser);
routes.use(validSession);
routes.use(activatedUser);
routes.use(isAdmin);

//Expenses categories
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

//Expenses types
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

//Investments types

routes.post('/investments/types/create', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string()
            .min(3)
            .max(100)
            .required()
    })
}), InvestmentTypesController.create);
routes.put('/investments/types/:id/update', celebrate({
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
}), InvestmentTypesController.update);
routes.delete('/investments/types/:id/delete', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number()
            .required()
    })
}), InvestmentTypesController.delete);

//Investments categories
routes.post('/investments/categories/create', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string()
            .min(3)
            .max(100)
            .required()
    })
}), InvestmentCategoriesController.create);
routes.put('/investments/categories/:id/update', celebrate({
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
}), InvestmentCategoriesController.update);
routes.delete('/investments/categories/:id/delete', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number()
            .required()
    })
}), InvestmentCategoriesController.delete);

//Revenue categories

routes.post('/revenues/categories/create', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string()
            .min(3)
            .max(100)
            .required()
    })
}), RevenueCategoriesController.create);
routes.put('/revenues/categories/:id/update', celebrate({
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
}), RevenueCategoriesController.update);
routes.delete('/revenues/categories/:id/delete', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number()
            .required()
    })
}), RevenueCategoriesController.delete);

module.exports = routes;