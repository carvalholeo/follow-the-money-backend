const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('../../controllers/UserController');
// const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('../../controllers/ProfileController');
const SessionController = require('../../controllers/SessionController');
const ExpensesController = require('../../controllers/ExpensesController');
const RevenuesController = require('../../controllers/RevenuesController');

const routes = express.Router();

//Profile and login
//Login
routes.delete('/session', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown()
}), SessionController.destroy);

//Users (for personal use)
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
routes.put('/profile/login/update', celebrate({
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

//Profile
routes.post('/profile/create', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown(),
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
}), ProfileController.create);
routes.put('/profile/update', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown(),
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
}), ProfileController.update);
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        token: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);


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