import { Router } from 'express';

import activatedUser from '../../middlewares/Activated';
import authenticatedUser from '../../middlewares/Auth';
import validSession from '../../middlewares/ValidSessionToken';

import ProfileValidator from '../../validators/ProfileValidator';
import TokenValidator from '../../validators/TokenValidator';
import UserValidator from '../../validators/UserValidator';

import ProfileController from '../../controllers/ProfileController';
import SessionController from '../../controllers/SessionController';
import UserController from '../../controllers/UserController';
import ErrorValidation from '../../middlewares/ErrorValidation';


const profileController = new ProfileController();
const sessionController = new SessionController();
const userController = new UserController();

const profileRoutes = Router();

profileRoutes.use(authenticatedUser);
profileRoutes.use(validSession);
profileRoutes.use(activatedUser);

profileRoutes
  .delete('/',
    TokenValidator,
    ErrorValidation,
    userController.delete)

  .put('/block',
    TokenValidator,
    ErrorValidation,
    userController.block,
    sessionController.destroyAll)

  .put('/user-data',
    UserValidator.createAndUpdateUser,
    ErrorValidation,
    userController.update)

  .put('/',
    ProfileValidator.profile,
    ErrorValidation,
    profileController.update)
  .post('/',
    ProfileValidator.profile,
    ErrorValidation,
    profileController.create)
  .get('/',
    TokenValidator,
    ErrorValidation,
    profileController.index);

export default profileRoutes;

