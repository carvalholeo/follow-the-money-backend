const connection = require('../database/connection');
const bcrypt = require('bcryptjs');

module.exports = {
    async create(request, response) {
        try {
            const { name } = request.body;
            const authorization_id = request.headers.token;

            const created_at = new Date();
            const updated_at = new Date();

            const [{ user_id }] = await connection('sessions')
                .where('authorization_id', authorization_id)
                .select('user_id');

            if (!user_id) {
                return response.status(401)
                    .json({ message: "Authorization token isn't valid. Login in the system and try again." });
            }

            const [permission] = await connection('users')
                .where({'users.id': user_id})
                .join('permissions', 'users.permission_id', '=', 'permissions.id')
                .select([
                    'permissions.is_admin',
                    'users.is_active'
                ]);

            if(!permission.is_active || !permission.is_admin) {
                return response.status(403)
                    .json({ message: "Your user doesn't have administrator role or is blocked. If you think that it's an error, contact system administrator to support." });
            }

            const investment_added = await connection('investment_categories')
                .insert({
                name,
                created_at,
                updated_at
                });

            if (!investment_added) {
                throw new Exception();
            }

            return response.status(201).json({ message: 'Investment category created successfully.'});

        } catch (error) {

            return response.status(500).json({ error: "There was an error. The system administrator was notified and working to solve this." });
        }
    },
    
    async delete(request, response) {
        try {
            const { id } = request.params;
            const authorization_id = request.headers.token;

            const [{ user_id }] = await connection('sessions')
                .where('authorization_id', authorization_id)
                .select('user_id');

            if (!user_id) {
                return response.status(401)
                    .json({ message: "Authorization token isn't valid. Login in the system and try again." });
            }

            const [permission] = await connection('users')
                .where({'users.id': user_id})
                .join('permissions', 'users.permission_id', '=', 'permissions.id')
                .select([
                    'permissions.is_admin',
                    'users.is_active'
                ]);

            if(!permission.is_active || !permission.is_admin) {
                return response.status(403)
                    .json({ message: "Your user doesn't have administrator role or is blocked. If you think that it's an error, contact system administrator to support." });
            }

            const delete_investment_category = await connection('investment_categories')
                .where('id', '=', id)
                .del('*');

            if (delete_investment_category) {
                return response.status(200)
                    .json({ message: "Investment category deleted successfully."});
            }
            return response.status(406)
                    .json({ message: "Investment category previously deleted." });
            
        } catch (error) {

            return response.status(400).json({ error: "There was an error. Probably, this investment category was deleted previously. Ask support to the system administrator." });
        }
    },

    async update(request, response) {
        try {
            const { name } = request.body;
            const { id } = request.params;
            const authorization_id = request.headers.token;

            const updated_at = new Date();

            const [{ user_id }] = await connection('sessions')
                .where('authorization_id', authorization_id)
                .select('user_id');
            
            if (!user_id) {
                return response.status(401)
                    .json({ message: "Authorization token isn't valid. Login in the system and try again." });
            }

            const [permission] = await connection('users')
                .where({'users.id': user_id})
                .join('permissions', 'users.permission_id', '=', 'permissions.id')
                .select([
                    'permissions.is_admin',
                    'users.is_active'
                ]);

            if(!permission.is_active || !permission.is_admin) {
                return response.status(403)
                    .json({ message: "Your user doesn't have administrator role or is blocked. If you think that it's an error, contact system administrator to support." });
            }

            const update = await connection('investment_categories')
                .where('id', '=', id)
                .update({ name, updated_at });

            if(update == 1) {
                return response.status(200)
                    .json({ message: "Investment category updated successfully." });
            }
            return response.status(400)
                    .json({ message: "ID passed doesn't exist. Try again with a valid ID." });
        } catch (error) {
            return response.status(500)
                    .json({ message: "There was an error. The system administrator was notified and working to solve this." });
        }
        
    },

    async index(request, response) {
        try {
            const authorization_id = request.headers.token;

            const [{ user_id }] = await connection('sessions')
                .where('authorization_id', authorization_id)
                .select('user_id');
            
            if (!user_id) {
                return response.status(401)
                    .json({ message: "Authorization token isn't valid. Login in the system and try again." });
            }

            const [permission] = await connection('users')
                .where({'users.id': user_id})
                .join('permissions', 'users.permission_id', '=', 'permissions.id')
                .select([
                    'permissions.is_admin',
                    'users.is_active'
                ]);

            if(!permission.is_active || !permission.is_admin) {
                return response.status(403)
                    .json({ message: "Your user doesn't have administrator role or is blocked. If you think that it's an error, contact system administrator to support." });
            }

            const categories = await connection('investment_categories')
                .select('*');

            return response.status(200)
                    .json({ investment_categories: categories });
        } catch (error) {
            return response.status(500)
                    .json({ message: "There was an error. The system administrator was notified and working to solve this." });
        }
        
    }
}