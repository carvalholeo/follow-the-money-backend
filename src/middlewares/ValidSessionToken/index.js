const connection = require('../../database/connection');
const getUserId = require('../../utils/getUserId');

module.exports = async (request, response, next) => {
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