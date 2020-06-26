const connection = require('../database/connection');

module.exports = async function getUserId(session_token) {
    try {
        const [{ id }] = await connection('sessions')
            .where({ 
                'sessions.authorization_id': session_token
            })
            .join('users', 'users.id', '=', 'sessions.user_id')
            .select('users.id');
            
        return id;
    } catch (error) {
        throw error;
    }
    
}