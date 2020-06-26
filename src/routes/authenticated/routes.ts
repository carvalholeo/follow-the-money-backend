import express from 'express';
import { celebrate } from 'celebrate';
import authenticatedUser from '../../middlewares/Auth';
import activatedUser from '../../middlewares/Activated';
import validSession from '../../middlewares/ValidSessionToken';

import TokenValidator from '../../validators/TokenValidator';
import UserValidator from '../../validators/UserValidator';
import ProfileValidator from '../../validators/ProfileValidator';
import ExpenseValidator from '../../validators/ExpenseValidator';
import RevenueValidator from '../../validators/RevenueValidator';

import UserController from '../../controllers/UserController';
import ProfileController from '../../controllers/ProfileController';
import SessionController from '../../controllers/SessionController';
import ExpensesController from '../../controllers/ExpensesController';
import RevenuesController from '../../controllers/RevenuesController';
import ExpenseCategoriesController from '../../controllers/ExpenseCategoriesController';
import ExpenseTypesController from '../../controllers/ExpenseTypesController';
import InvestmentTypesController from '../../controllers/InvestmentTypesController';
import InvestmentCategoriesController from '../../controllers/InvestmentCategoriesController';
import RevenueCategoriesController from '../../controllers/RevenueCategoriesController';

const userController = new UserController();
const profileController = new ProfileController();
const sessionController = new SessionController();
const expensesController = new ExpensesController();
const revenuesController = new RevenuesController();
const expenseCategoriesController = new ExpenseCategoriesController();
const expenseTypesController = new ExpenseTypesController();
const investmentTypesController = new InvestmentTypesController();
const investmentCategoriesController = new InvestmentCategoriesController();
const revenueCategoriesController = new RevenueCategoriesController();


const routes = express.Router();

routes.use(authenticatedUser);
routes.use(validSession);
routes.use(activatedUser);

//Profile and login
//Login
routes.delete('/session', celebrate(TokenValidator), sessionController.destroy);
routes.delete('/all', celebrate(TokenValidator), sessionController.destroyAll);

//Users (for personal use)
routes.put('/profile/block', celebrate(TokenValidator), userController.block, sessionController.destroyAll);
routes.delete('/profile', celebrate(TokenValidator), userController.delete);
routes.put('/profile/user-data', celebrate(UserValidator.updateUser()), userController.update);

//Profile
routes.post('/profile', celebrate(ProfileValidator), profileController.create);
routes.put('/profile', celebrate(ProfileValidator), profileController.update);
routes.get('/profile', celebrate(TokenValidator), profileController.index);


//Expenses
routes.get('/expenses', celebrate(ExpenseValidator.getExpense()), expensesController.index);
routes.post('/expenses', celebrate(ExpenseValidator.postExpense()), expensesController.create);
routes.put('/expenses/:id/', celebrate(ExpenseValidator.putExpense()), expensesController.update);
routes.delete('/expenses/:id/', celebrate(ExpenseValidator.deleteExpense()), expensesController.delete);

routes.get('/expenses/categories/', celebrate(TokenValidator), expenseCategoriesController.index);
routes.get('/expenses/types/', celebrate(TokenValidator), expenseTypesController.index);

//Investments
routes.get('/investments/types/', celebrate(TokenValidator), investmentTypesController.index);
routes.get('/investments/categories/', celebrate(TokenValidator), investmentCategoriesController.index);


//Revenues
routes.get('/revenues', celebrate(RevenueValidator.getRevenue()), revenuesController.index);
routes.post('/revenues', celebrate(RevenueValidator.createRevenue()), revenuesController.create);
routes.put('/revenues/:id/', celebrate(RevenueValidator.updateRevenue()), revenuesController.update);
routes.delete('/revenues/:id/', celebrate(RevenueValidator.deleteRevenue()), revenuesController.delete);
routes.get('/revenues/categories/', celebrate(TokenValidator), revenueCategoriesController.index);



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

export default routes;