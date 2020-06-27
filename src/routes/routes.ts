import { celebrate } from 'celebrate';
import express from 'express';

import activatedUser from '../middlewares/Activated';
import authenticatedUser from '../middlewares/Auth';
import isAdmin from '../middlewares/Administration';
import validSession from '../middlewares/ValidSessionToken';

import ExpenseValidator from '../validators/ExpenseValidator';
import MFAValidator from '../validators/MFAValidator';
import ProfileValidator from '../validators/ProfileValidator';
import RevenueValidator from '../validators/RevenueValidator';
import TokenValidator from '../validators/TokenValidator';
import TypeAndCategoryValidator from '../validators/TypeAndCategoryValidator';
import UserValidator from '../validators/UserValidator';

import ExpensesController from '../controllers/ExpensesController';
import ExpenseCategoriesController from '../controllers/ExpenseCategoriesController';
import ExpenseTypesController from '../controllers/ExpenseTypesController';
import InvestmentCategoriesController from '../controllers/InvestmentCategoriesController';
import InvestmentTypesController from '../controllers/InvestmentTypesController';
import ProfileController from '../controllers/ProfileController';
import RevenuesController from '../controllers/RevenuesController';
import RevenueCategoriesController from '../controllers/RevenueCategoriesController';
import SessionController from '../controllers/SessionController';
import UserController from '../controllers/UserController';


const expensesController = new ExpensesController();
const expenseCategoriesController = new ExpenseCategoriesController();
const expenseTypesController = new ExpenseTypesController();
const investmentCategoriesController = new InvestmentCategoriesController();
const investmentTypesController = new InvestmentTypesController();
const profileController = new ProfileController();
const revenuesController = new RevenuesController();
const revenueCategoriesController = new RevenueCategoriesController();
const sessionController = new SessionController();
const userController = new UserController();

const routes = express.Router();


routes.post('/session', 
    celebrate(UserValidator.loginUser()), 
    sessionController.create);

routes.get('/session/mfa', 
    celebrate(MFAValidator.token()), 
    sessionController.showMFA);

routes.post('/session/mfa', 
    celebrate(MFAValidator.mfaRequired()), 
    sessionController.validateMFA);

routes.post('/users', 
    celebrate(UserValidator.createUser()), 
    userController.create);

//Authenticated area
routes.use(authenticatedUser);
routes.use(validSession);
routes.use(activatedUser);


//Profile and login
//Login
routes.delete('/all', 
    celebrate(TokenValidator), 
    sessionController.destroyAll);

routes.delete('/session', 
    celebrate(TokenValidator), 
    sessionController.destroy);


//Users (for personal use)
routes.delete('/profile', 
    celebrate(TokenValidator), 
    userController.delete);

routes.put('/profile/block', 
    celebrate(TokenValidator), 
    userController.block, 
    sessionController.destroyAll);

routes.put('/profile/user-data', 
    celebrate(UserValidator.updateUser()), 
    userController.update);


//Profile
routes.post('/profile', 
    celebrate(ProfileValidator), 
    profileController.create);

routes.put('/profile', 
    celebrate(ProfileValidator), 
    profileController.update);

routes.get('/profile', 
    celebrate(TokenValidator), 
    profileController.index);


//Expenses
routes.get('/expenses', 
    celebrate(ExpenseValidator.getExpense()), 
    expensesController.index);

routes.post('/expenses', 
    celebrate(ExpenseValidator.postExpense()), 
    expensesController.create);

routes.put('/expenses/:id/', 
    celebrate(ExpenseValidator.putExpense()), 
    expensesController.update);

routes.delete('/expenses/:id/', 
    celebrate(ExpenseValidator.deleteExpense()), 
    expensesController.delete);

routes.get('/expenses/categories/', 
    celebrate(TokenValidator), 
    expenseCategoriesController.index);

routes.get('/expenses/types/', 
    celebrate(TokenValidator), 
    expenseTypesController.index);


//Investments
routes.get('/investments/categories/', 
    celebrate(TokenValidator), 
    investmentCategoriesController.index);

routes.get('/investments/types/', 
    celebrate(TokenValidator), 
    investmentTypesController.index);


//Revenues
routes.get('/revenues', 
    celebrate(RevenueValidator.getRevenue()), 
    revenuesController.index);

routes.post('/revenues', 
    celebrate(RevenueValidator.createRevenue()), 
    revenuesController.create);

routes.put('/revenues/:id/', 
    celebrate(RevenueValidator.updateRevenue()), 
    revenuesController.update);

routes.delete('/revenues/:id/', 
    celebrate(RevenueValidator.deleteRevenue()), 
    revenuesController.delete);

routes.get('/revenues/categories/', 
    celebrate(TokenValidator), 
    revenueCategoriesController.index);


//Admin Area
routes.use(isAdmin);

routes.post('/expenses/categories', 
    celebrate(TypeAndCategoryValidator.createTypeAndCategory()), 
    expenseCategoriesController.create);

routes.put('/expenses/categories/:id/', 
    celebrate(TypeAndCategoryValidator.updateTypeAndCategory()), 
    expenseCategoriesController.update);

routes.delete('/expenses/categories/:id/', 
    celebrate(TypeAndCategoryValidator.deleteTypeAndCategory()), 
    expenseCategoriesController.delete);


//Expenses types
routes.post('/expenses/types', 
    celebrate(TypeAndCategoryValidator.createTypeAndCategory()), 
    expenseTypesController.create);

routes.put('/expenses/types/:id/', 
    celebrate(TypeAndCategoryValidator.updateTypeAndCategory()), 
    expenseTypesController.update);

routes.delete('/expenses/types/:id/', 
    celebrate(TypeAndCategoryValidator.deleteTypeAndCategory()), 
    expenseTypesController.delete);


//Investments types
routes.post('/investments/types', 
    celebrate(TypeAndCategoryValidator.createTypeAndCategory()), 
    investmentTypesController.create);

routes.put('/investments/types/:id/', 
    celebrate(TypeAndCategoryValidator.updateTypeAndCategory()), 
    investmentTypesController.update);

routes.delete('/investments/types/:id/', 
    celebrate(TypeAndCategoryValidator.deleteTypeAndCategory()), 
    investmentTypesController.delete);


//Investments categories
routes.post('/investments/categories', 
    celebrate(TypeAndCategoryValidator.createTypeAndCategory()), 
    investmentCategoriesController.create);

routes.put('/investments/categories/:id/', 
    celebrate(TypeAndCategoryValidator.updateTypeAndCategory()), 
    investmentCategoriesController.update);

routes.delete('/investments/categories/:id/', 
    celebrate(TypeAndCategoryValidator.deleteTypeAndCategory()), 
    investmentCategoriesController.delete);


//Revenue categories
routes.post('/revenues/categories', 
    celebrate(TypeAndCategoryValidator.createTypeAndCategory()), 
    revenueCategoriesController.create);

routes.put('/revenues/categories/:id/', 
    celebrate(TypeAndCategoryValidator.updateTypeAndCategory()), 
    revenueCategoriesController.update);

routes.delete('/revenues/categories/:id/', 
    celebrate(TypeAndCategoryValidator.deleteTypeAndCategory()), 
    revenueCategoriesController.delete);

export default routes;