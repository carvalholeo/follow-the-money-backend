import express from 'express';
import { errors } from 'celebrate';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import dotenv from 'dotenv';

import unauthenticatedRoutes from './routes/unauthenticated/routes' ;
import authenticatedRoutes from './routes/authenticated/routes' ;
import adminRoutes from './routes/admin/routes' ;

const app = express();

app.use(express.json());
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(unauthenticatedRoutes);
app.use(authenticatedRoutes);
app.use(adminRoutes);
app.use(errors());

export default app;