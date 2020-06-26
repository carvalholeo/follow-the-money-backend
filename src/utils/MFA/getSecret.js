const connection = require('../../database/connection');

module.exports = async function getSecret(user_id) {
    try {
        const [{secret_mfa}] = await connection('users')
            .where('id', '=', user_id)
            .select('secret_mfa');
 
        return secret_mfa;
    } catch (error) {
        throw error;
    }
}