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

    if(!is_admin.is_admin) {
      throw {
        status: 403,
        message: 'Your user doesn\'t have administrator role. If you think that it\'s an error, contact system administrator to support.'
      };
    }

    next();

  } catch (error) {

    logger.makeLog('AdminMiddleware', error.message || error);

    return response
      .status(error.status || 500)
      .json({ error: error.message || 'There was an error on server. Try again later.' })
      .send(next(error.message));
  }
};
