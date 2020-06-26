import connection from '../../database/connection';
import getUserId from '../../utils/getUserId';
import { NextFunction } from 'express';

export default async (request: Request, response: Response, next: NextFunction) => {
    try {
        const token = request.headers.session;
    
        const [is_valid] = await connection('sessions')
            .where('authorization_id', token)
            .select('*');
    
        if(!is_valid) {
            return response.status(401)
                    .json({ message: "Authorization token isn't valid. Login in the system and try again." });
        }
    
        next();
    } catch (error) {
        return response.status(500)
            .json({ error: 'There was an error on server. Try again later.' });
    }
}