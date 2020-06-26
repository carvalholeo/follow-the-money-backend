const connection = require('../../database/connection');
const getUserId = require('../../utils/getUserId');

module.exports = async (request, response, next) => {
    try {
        const id = await getUserId(request.headers.session);
    
        const [activated] = await connection('users')
            .where('id', id)
            .select('is_active');
    
        if(!activated.is_active) {
            return response.status(403)
                .json({ message: "Your user is blocked. If you think that it's an error, contact system administrator to support." });
        }
    
        next();
    } catch (error) {
        return response.status(500)
            .json({ error: 'There was an error on server. Try again later.' });
    }
}