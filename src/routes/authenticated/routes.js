const express = require('express');
const { celebrate } = require('celebrate');
const authenticatedUser = require('../../middlewares/Auth');
const activatedUser = require('../../middlewares/Activated');
const validSession = require('../../middlewares/ValidSessionToken');

const TokenValidator = require('../../validators/TokenValidator');
const UserValidator = require('../../validators/UserValidator');
const ProfileValidator = require('../../validators/ProfileValidator');
const ExpenseValidator = require('../../validators/ExpenseValidator');
const RevenueValidator = require('../../validators/RevenueValidator');
const MFAValidator = require('../../validators/MFAValidator');

const UserController = require('../../controllers/UserController');
const ProfileController = require('../../controllers/ProfileController');
const SessionController = require('../../controllers/SessionController');
const ExpensesController = require('../../controllers/ExpensesController');
const RevenuesController = require('../../controllers/RevenuesController');
const ExpenseCategoriesController = require('../../controllers/ExpenseCategoriesController');
const ExpenseTypesController = require('../../controllers/ExpenseTypesController');
const InvestmentTypesController = require('../../controllers/InvestmentTypesController');
const InvestmentCategoriesController = require('../../controllers/InvestmentCategoriesController');
const RevenueCategoriesController = require('../../controllers/RevenueCategoriesController');

const routes = express.Router();

routes.use(authenticatedUser);
routes.use(validSession);
routes.use(activatedUser);

//Profile and login
//Login
routes.delete('/session', celebrate(TokenValidator), SessionController.destroy);
routes.delete('/all', celebrate(TokenValidator), SessionController.destroyAll);
routes.get('/session/mfa', celebrate(MFAValidator.token()), SessionController.showMFA);
routes.post('/session/mfa', celebrate(MFAValidator.mfaRequired()), SessionController.validateMFA);

//Users (for personal use)
routes.put('/profile/block', celebrate(TokenValidator), UserController.block, SessionController.destroyAll);
routes.delete('/profile', celebrate(TokenValidator), UserController.delete);
routes.put('/profile/user-data', celebrate(UserValidator.updateUser()), UserController.update);

//Profile
routes.post('/profile', celebrate(ProfileValidator), ProfileController.create);
routes.put('/profile', celebrate(ProfileValidator), ProfileController.update);
routes.get('/profile', celebrate(TokenValidator), ProfileController.index);


//Expenses
routes.get('/expenses', celebrate(ExpenseValidator.getExpense()), ExpensesController.index);
routes.post('/expenses', celebrate(ExpenseValidator.postExpense()), ExpensesController.create);
routes.put('/expenses/:id/', celebrate(ExpenseValidator.putExpense()), ExpensesController.update);
routes.delete('/expenses/:id/', celebrate(ExpenseValidator.deleteExpense()), ExpensesController.delete);

routes.get('/expenses/categories/', celebrate(TokenValidator), ExpenseCategoriesController.index);
routes.get('/expenses/types/', celebrate(TokenValidator), ExpenseTypesController.index);

//Investments
routes.get('/investments/types/', celebrate(TokenValidator), InvestmentTypesController.index);
routes.get('/investments/categories/', celebrate(TokenValidator), InvestmentCategoriesController.index);


//Revenues
routes.get('/revenues', celebrate(RevenueValidator.getRevenue()), RevenuesController.index);
routes.post('/revenues', celebrate(RevenueValidator.createRevenue()), RevenuesController.create);
routes.put('/revenues/:id/', celebrate(RevenueValidator.updateRevenue()), RevenuesController.update);
routes.delete('/revenues/:id/', celebrate(RevenueValidator.deleteRevenue()), RevenuesController.delete);
routes.get('/revenues/categories/', celebrate(TokenValidator), RevenueCategoriesController.index);



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