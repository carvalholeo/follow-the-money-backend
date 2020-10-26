import connection from '../../database/connection';
import Logger from '../Logger';

export default function getSecret(userId: number): Promise<string> {

  return connection('users')
    .where('id', '=', userId)
    .select('secret_mfa')
    .then(async ( [{ response }] ) => {
      return await response as string;
    })
    .catch(error => {
      const logger = new Logger();
      logger.makeLog('error', error);
      throw error;
    });
}
