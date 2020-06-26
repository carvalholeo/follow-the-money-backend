import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';

import connection from '../database/connection';
import getUserId from '../utils/getUserId';

export default class UserController {
    async create(request:Request, response: Response) {
        try {
            const { email, username, password } = request.body;
            const created_at = new Date();
            const updated_at = new Date();

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            await connection('users')
                .insert({
                email,
                username,
                password: hash,
                is_active: 1,
                permission_id: 1,
                created_at,
                updated_at
                });

            return response.status(201).json({ message: 'User created successfully.'});

        } catch (error) {

            return response.status(400).json({ error: "There was an error. Probably, this user was created previously. Ask support to the system administrator." });
        }
    }
    
    async block(request:Request, response: Response, next: NextFunction) {
        try {
            const user_id = await getUserId(request.headers.session);

            const active = await connection('users')
                .where('id', '=', user_id)
                .update({is_active: 0});

            if (active == 1) {
                next();
                return response.status(200)
                    .json({ message: "Your user was blocked successfully. To unblock, contact system administrator. You're now logout."});
            }
        } catch (error) {
            return response.status(400).json({ error: "There was an error. Probably, this user was blocked previously. Ask support to the system administrator." });
        }
    }
    
    async delete(request:Request, response: Response, next: NextFunction) {
        try {
            const user_id = await getUserId(request.headers.session);

            const delete_user = await connection('users')
                .where('id', '=', user_id)
                .del('*');

            if (delete_user) {
                next();
                return response.status(200)
                    .json({ message: "Your user was deleted successfully. All your data also were deleted and we're unable to recover it. You're now logout from all of the sessions and devices."});
            }
            
        } catch (error) {

            return response.status(400).json({ error: "There was an error. Probably, this user was deleted previously. Ask support to the system administrator." });
        }
    }

    async update(request:Request, response: Response) {
        try {
            const { email, password } = request.body;
            const user_id = await getUserId(request.headers.session);

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            
            const user = await connection('users')
                .where('id', '=', user_id)
                .update({ email, password: hash });

            if(user == 1) {
                return response.status(200)
                    .json({ message: "User data updated successfully."});
            }
        } catch (error) {
            return response.status(400)
                    .json({ message: "There was an error. The system administrator was notified and working to solve this." });
        }
        
    }
}