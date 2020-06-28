import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';
import options from '../../config/auth';

export default (request: Request, response: Response, next: NextFunction) => {
    const authHeader = String(request.headers.token);
    const parts = authHeader.split(" ");
    const [scheme, token] = parts;

    if(!authHeader) {
        return response.status(401).send({ error: 'No token provided.' });
    }

    if(parts.length !== 2) {
        return response.status(401).send({ error: 'Failed to process request.' });
    }

    if(!/Bearer/i.test(scheme)) {
        return response.status(401).send({ error: 'Malformed token.' });
    }

    jwt.verify(token, options.secret, (error: any, decoded: any) => {
        if(error) {
            return response.status(400).send({ error: 'Invalid token.' });
        }

        request.body.username = decoded.username;

        return next();
    });
}