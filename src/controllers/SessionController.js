const bcrypt = require('bcryptjs');

const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports ={
    async create(request, response) {
        try {
            const { username, password } = request.body;
            const { ip_address } = request.connection.remoteAddress;
            const { user_agent } = request.headers["user-agent"];
            const authorization_id = generateUniqueId();

            const user = await connection('users')
                .where({
                    username
                })
                .select('id', 'password', 'is_active')
                .first();
            
            const db_password = user.password;
            const password_compare = bcrypt.compareSync(password, db_password);

            if (!user || !password_compare) {
                return response.status(401)
                    .json({ error: "User or password is incorrect. Try again." });
            }

            if(!user.is_active) {
                return response.status(403)
                    .json({ error: "This user is inactive. Contact system administrator." });
            }

            await connection('sessions').insert({
                    authorization_id,
                    user_id: user.id,
                    ip_address,
                    user_agent
                });

            return response.status(200)
                .json({ token: authorization_id });
        } catch (error) {
            return response.status(500)
                .json({ error: "There was an error in server. Please, try again later. For support, contact to the system administrator." });
        }
        
    },

    async destroy(request, response) {
        try {
            const authorization_id = request.headers.token;

            const authorization_deleted = await connection('sessions')
                .where('authorization_id', authorization_id)
                .del('*'); 

            if (!authorization_deleted) {
                return response.status(417)
                    .json({ error: "Token passed is invalid. Try again with a valid token." });
            }

            return response.status(200)
                .json({ message: "Loggout successfully." }); 
        } catch (error) {
            return response.status(500)
                .json({ message: "There was an internal error. Probably, you're now logout, but we can't ensure that. If you need to be sure it, please clean your browser data, cookies, session and cache." })
        }
        
    }
};