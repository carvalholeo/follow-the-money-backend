const connection = require('../database/connection');
const bcrypt = require('bcryptjs');

module.exports = {
    async create(request, response) {
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
    },
    async block(request, response, next) {
        try {
            const authorization_id = request.headers.token;
            const user_id = await connection('sessions')
                .where('authorization_id', authorization_id)
                .select('user_id');

            const active = await connection('users')
                .where('id', '=', user_id[0].user_id)
                .update({is_active: 0});

            if (active == 1) {
                next();
                return response.status(200)
                    .json({ message: "Your user was blocked successfully. To unblock, contact system administrator. You're now logout."});
            }
            
        } catch (error) {

            return response.status(400).json({ error: "There was an error. Probably, this user was blocked previously. Ask support to the system administrator." });
        }
    },
    
    async delete(request, response, next) {
        try {
            const authorization_id = request.headers.token;
            const user_id = await connection('sessions')
                .where('authorization_id', authorization_id)
                .select('user_id');

            const delete_user = await connection('users')
                .where('id', '=', user_id[0].user_id)
                .del('*');

            if (delete_user) {
                next();
                return response.status(200)
                    .json({ message: "Your user was deleted successfully. All your data also were deleted and we're unable to recover it. You're now logout from all of the sessions and devices."});
            }
            
        } catch (error) {

            return response.status(400).json({ error: "There was an error. Probably, this user was deleted previously. Ask support to the system administrator." });
        }
    },

    async update(request, response) {
        try {
            const { email, password } = request.body;
            const authorization_id = request.headers.token;

            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const user_id = await connection('sessions')
                .where('authorization_id', authorization_id)
                .select('user_id');

            const user = await connection('users')
                .where('id', '=', user_id[0].user_id)
                .update({ email, password });

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