import { Router } from 'express';

import investmentsRoutes from './investmentsRoutes';
import revenuesRoutes from './revenuesRoutes';
import sessionRoutes from './sessionRoutes';
import expensesRoutes from './expensesRoutes';
import usersRoutes from './usersRoutes';
import profileRoutes from './profileRoutes';

const routes = Router();

routes.use('/investments', investmentsRoutes);
routes.use('/revenues', revenuesRoutes);
routes.use('/session', sessionRoutes);
routes.use('/expenses', expensesRoutes);
routes.use('/users', usersRoutes);
routes.use('/profile', profileRoutes);

export default routes;
