import { Request, Response, NextFunction } from 'express';

import connection from '../../database/connection';
import getUserId from '../../utils/getUserId';
import Logger from '../../utils/Logger';

const logger = new Logger();

export default async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = await getUserId(String(request.headers.session));
    
        const [is_admin] = await connection('users')
            .where('users.id', id)
            .join('permissions', 'permissions.id', '=', 'users.permission_id')
            .select('permissions.is_admin');
    
        if(is_admin.is_admin) {
            next();
        }
        return response.status(403)
                .json({ message: "Your user doesn't have administrator role. If you think that it's an error, contact system administrator to support." });
    
    } catch (error) {
        logger.makeLog('AdminMiddleware', error);
        return response.status(500)
            .json({ error: 'There was an error on server. Try again later.' });
    }
}