const connection = require('../database/connection');

module.exports ={
    async create(request, response) {
        const { username, password } = request.body;

        const user = await connection('users')
            .where({
                username,
                password
            })
            .join('profile', 'users.id', '=', 'profile.user_id')
            .select('profile.first_name', 'profile.url_photo', 'user.is_active')
            .first();

        if (!user) {
            return response.status(401).json({ error: "User or password is incorrect. Try again." });
        }

        if(!user[is_active]) {
            return response.status(403).json({ error: "This user was blocked. Contact system administrator." });
        }

        return response.json(user);
    }
};