import express from 'express';
import { celebrate } from 'celebrate';

import UserValidator from '../../validators/UserValidator';
import MFAValidator from '../../validators/MFAValidator';
import SessionController from '../../controllers/SessionController';
import UserController from '../../controllers/UserController';

const sessionController = new SessionController();
const userController = new UserController();

const routes = express.Router();

routes.post('/session', celebrate(UserValidator.loginUser()), sessionController.create);
routes.get('/session/mfa', celebrate(MFAValidator.token()), sessionController.showMFA);
routes.post('/session/mfa', celebrate(MFAValidator.mfaRequired()), sessionController.validateMFA);

routes.post('/users', celebrate(UserValidator.createUser()), userController.create);

export default routes;