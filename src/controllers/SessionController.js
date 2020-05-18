const connection = require('../database/connection');

module.exports ={
    async create(request, response) {
        const { username, password } = request.body;

        const user = await connection('users')
            .where({
                username,
                password
            })
            .join('profile', 'users.id', 'profile.user_id')
            .select('profile.first_name', 'profile.url_photo')
            .first();

        if (!user) {
            return response.status(401).json({ error: "No User found with data passed." });
        }

        return response.json(user);
    }
};