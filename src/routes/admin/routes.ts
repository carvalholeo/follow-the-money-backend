import express from 'express';
import { celebrate } from 'celebrate';
import authenticatedUser from '../../middlewares/Auth';
import activatedUser from '../../middlewares/Activated';
import validSession from '../../middlewares/ValidSessionToken';
import isAdmin from '../../middlewares/Administration';

import TypeAndCategoryValidator from '../../validators/TypeAndCategoryValidator';

import ExpenseCategoriesController from '../../controllers/ExpenseCategoriesController';
import ExpenseTypesController from '../../controllers/ExpenseTypesController';
import InvestmentTypesController from '../../controllers/InvestmentTypesController';
import InvestmentCategoriesController from '../../controllers/InvestmentCategoriesController';
import RevenueCategoriesController from '../../controllers/RevenueCategoriesController';

const expenseCategoriesController = new ExpenseCategoriesController();
const expenseTypesController = new ExpenseTypesController();
const investmentTypesController = new InvestmentTypesController();
const investmentCategoriesController = new InvestmentCategoriesController();
const revenueCategoriesController = new RevenueCategoriesController()

const routes = express.Router();

routes.use(authenticatedUser);
routes.use(validSession);
routes.use(activatedUser);
routes.use(isAdmin);

//Expenses categories
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