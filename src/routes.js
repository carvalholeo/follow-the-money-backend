const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('./controllers/UserController');
// const IncidentController = require('./controllers/IncidentController');
// const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const ExpenseCategoriesController = require('./controllers/ExpenseCategoriesController');
const ExpenseTypesController = require('./controllers/ExpenseTypesController');
const ExpensesController = require('./controllers/ExpensesController');
const InvestmentTypesController = require('./controllers/InvestmentTypesController');
const InvestmentCategoriesController = require('./controllers/InvestmentCategoriesController');
const RevenueCategoriesController = require('./controllers/RevenueCategoriesController');
const RevenuesController = require('./controllers/RevenuesController');

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



//Expenses
//Expenses categories
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

//Expenses types
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

//Expenses
routes.get('/expenses', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown(),
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), ExpensesController.index);
routes.post('/expenses/create', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        source: Joi.string().max(50).required(),
        expense_type_id: Joi.number().required(),
        expense_category_id: Joi.number().required(),
        expected_amount: Joi.number().required(),
        paid_amount: Joi.number(),
        due_date: Joi.date().required(),
        payday: Joi.date(),
        reference_month: Joi.date().required(),
        is_paid: Joi.bool().required()
    })
}), ExpensesController.create);
routes.put('/expenses/:id/update', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        source: Joi.string().max(50).required(),
        expense_type_id: Joi.number().required(),
        expense_category_id: Joi.number().required(),
        expected_amount: Joi.number().required(),
        paid_amount: Joi.number(),
        due_date: Joi.date().required(),
        payday: Joi.date(),
        reference_month: Joi.date().required(),
        is_paid: Joi.bool().required()
    }),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number()
            .required()
    })
}), ExpensesController.update);
routes.delete('/expenses/:id/delete', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number()
            .required()
    })
}), ExpensesController.delete);



//Investments
//Investments types
routes.get('/investments/types/', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown()
}), InvestmentTypesController.index);
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
routes.get('/investments/categories/', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown()
}), InvestmentCategoriesController.index);
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



//Revenue
//Revenue categories
routes.get('/revenues/categories/', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown()
}), RevenueCategoriesController.index);
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

//Revenues
routes.get('/revenues', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown(),
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), RevenuesController.index);
routes.post('/revenues/create', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown(),
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
}), RevenuesController.create);
routes.put('/revenues/:id/update', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown(),
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
}), RevenuesController.update);
routes.delete('/revenues/:id/delete', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number()
            .required()
    })
}), RevenuesController.delete);



// routes.post('/incidents', IncidentController.create);
// routes.get('/incidents', celebrate({
//     [Segments.QUERY]: Joi.object().keys({
//         page: Joi.number(),
//     })
// }), IncidentController.index);
// routes.delete('/incidents/:id', celebrate({
//     [Segments.PARAMS]: Joi.object().keys({
//         id: Joi.number().required(),
//     })
// }), IncidentController.delete);

// routes.get('/profile', celebrate({
//     [Segments.HEADERS]: Joi.object({
//         authorization: Joi.string().required(),
//     }).unknown()
// }), ProfileController.index);

module.exports = routes;