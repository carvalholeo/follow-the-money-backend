import { Router } from 'express';

import activatedUser from '../../middlewares/Activated';
import authenticatedUser from '../../middlewares/Auth';
import isAdmin from '../../middlewares/Administration';
import validSession from '../../middlewares/ValidSessionToken';

import RevenueValidator from '../../validators/RevenueValidator';
import TokenValidator from '../../validators/TokenValidator';
import TypeAndCategoryValidator from '../../validators/TypeAndCategoryValidator';

import RevenuesController from '../../controllers/RevenuesController';
import RevenueCategoriesController from '../../controllers/RevenueCategoriesController';
import ErrorValidation from '../../middlewares/ErrorValidation';

const revenuesController = new RevenuesController();
const revenueCategoriesController = new RevenueCategoriesController();

const revenuesRoutes = Router();

revenuesRoutes.use(authenticatedUser);
revenuesRoutes.use(validSession);
revenuesRoutes.use(activatedUser);

revenuesRoutes
  .get('/',
    RevenueValidator.getRevenue,
    ErrorValidation,
    revenuesController.index)
  .get('/categories/',
    TokenValidator,
    ErrorValidation,
    revenueCategoriesController.index)
  .post('/',
    RevenueValidator.createRevenue,
    ErrorValidation,
    revenuesController.create)
  .put('/:id/',
    RevenueValidator.updateRevenue,
    ErrorValidation,
    revenuesController.update)
  .delete('/:id/',
    RevenueValidator.deleteRevenue,
    ErrorValidation,
    revenuesController.delete);

revenuesRoutes.use(isAdmin);

revenuesRoutes
  .post('/categories',
    TypeAndCategoryValidator.createTypeAndCategory,
    ErrorValidation,
    revenueCategoriesController.create)
  .put('/categories/:id/',
    TypeAndCategoryValidator.updateTypeAndCategory,
    ErrorValidation,
    revenueCategoriesController.update)
  .delete('/categories/:id/',
    TypeAndCategoryValidator.deleteTypeAndCategory,
    ErrorValidation,
    revenueCategoriesController.delete);

export default revenuesRoutes;
