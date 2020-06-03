const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');
const getUserId = require('../utils/getUserId');
const { expires_in, secret } = require('../config/auth');

module.exports ={
    async create(request, response) {
        try {
            const { username, password, remember = false } = request.body;
            const { ip_address } = request.connection.remoteAddress;
            const { user_agent } = request.headers["user-agent"];
            const authorization_id = generateUniqueId();

            const user = await connection('users')
                .where({
                    username
                })
                .select('id', 'username', 'password', 'is_active', 'has_mfa')
                .first();
            
            const db_password = user.password;
            const password_compare = bcrypt.compareSync(password, db_password);

            if (!user || !password_compare) {
                return response.status(401)
                    .json({ error: "User or password is incorrect. Try again." });
            }

            user.password = undefined;

            const time_to_expire = !remember ? expires_in : '';

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

            const token = jwt.sign({ user: user.username }, secret, {
                expiresIn: time_to_expire,
            });

            return response.status(200)
                .json({ user: user.username, token, session: authorization_id, mfa: user.has_mfa });
        } catch (error) {
            return response.status(500)
                .json({ error: "There was an error in server. Please, try again later. For support, contact to the system administrator." });
        }
        
    },

    async destroy(request, response) {
        try {
            const authorization_id = request.headers.session;

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
        
    },

    async destroyAll(request, response) {
        try {
            const authorization_id = request.headers.session;
            const user_id = await getUserId(authorization_id);

            const authorization_deleted = await connection('sessions')
                .where('user_id', '=', user_id)
                .del('*'); 

            return response.status(200)
                .json({ message: "Loggout successfully." }); 
        } catch (error) {
            return response.status(500)
                .json({ message: "There was an internal error. Probably, you're now logout, but we can't ensure that. If you need to be sure it, please clean your browser data, cookies, session and cache." })
        }
        
    }
};