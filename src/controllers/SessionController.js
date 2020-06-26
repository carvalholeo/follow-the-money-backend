const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');

const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');
const getUserId = require('../utils/getUserId');
const getSecret = require('../utils/MFA/getSecret');
const getQRCode = require('../utils/MFA/generateQRCode');
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

            const token = jwt.sign({ authorization_id }, secret, {
                expiresIn: time_to_expire,
            });
            
            if(user.has_mfa) {
                return response.status(202)
                    .json({ session: authorization_id, mfa: user.has_mfa });
            }

            return response.status(201)
                .json({ token, session: authorization_id });

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

            if (authorization_deleted.length == 0) {
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

            if (authorization_deleted.length == 0) {
                return response.status(417)
                    .json({ error: "Token passed is invalid. Try again with a valid token." });
            }

            return response.status(200)
                .json({ message: "Loggout successfully on all sessions (include this)." }); 
        } catch (error) {
            return response.status(500)
                .json({ message: "There was an internal error. Probably, you're now logout, but we can't ensure that. If you need to be sure it, please clean your browser data, cookies, session and cache." })
        }
        
    },

    async showMFA(request, response) {
        try {
            return response.status(501)
                .json({ error: "Don't try hack me. Get out from here!!!1" });

            const user_id = await getUserId(request.headers.session);
            const mfa_secret = await getSecret(user_id);
            const QRCode = await getQRCode(mfa_secret);

            console.log(QRCode);
            return response.status(100)
                .json({ 
                    message: "Please, do the Two-factor authentication to enter the system.",
                    QRCode
                });

        } catch (error) {
            console.log(error);
            return response.status(500)
                .json({ error: "There was an error on the server. Please, do login again." });
        }

    },

    async validateMFA(request, response) {
        try {
            const authorization_id = request.headers.session;
            const { mfa_code } = request.body;
            const user_id = await getUserId(authorization_id);
            const mfa_secret = await getSecret(user_id);

            const token_otp = speakeasy.totp({
                secret: mfa_secret,
                encoding: 'base32',
            });

            const tokenValidated = speakeasy.totp.verify({
                secret: mfa_secret,
                encoding: 'base32',
                token: mfa_code,
                window: 2
            });

            const token = jwt.sign({ authorization_id }, secret, {
                expiresIn: time_to_expire,
            });

            if(tokenValidated) {
                return response.status(201)
                    .json({ token, session: authorization_id });
            }

            return response.status(417)
                .json({ message: "Two-factor authentication code wrong. Try again." });


        } catch (error) {
            return response.status(500)
                .json({ error: "There was an error. The system administrator already was notified. Please, try again later." });
        }
    },
};