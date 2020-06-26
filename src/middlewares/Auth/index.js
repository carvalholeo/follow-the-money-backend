const jwt = require('jsonwebtoken');
const { secret } = require('../../config/auth');

module.exports = (request, response, next) => {
    const authHeader = request.headers.token;

    if(!authHeader) {
        return response.status(401).send({ error: 'No token provided.' });
    }

    const parts = authHeader.split(" ");

    if(!parts.lenght === 2) {
        return response.status(401).send({ error: 'Failed to process request.' });
    }

    const [scheme, token] = parts;

    if(!/Bearer/i.test(scheme)) {
        return response.status(401).send({ error: 'Malformed token.' });
    }

    jwt.verify(token, secret, (error, decoded) => {
        if(error) {
            return response.status(400).send({ error: 'Invalid token.' });
        }

        request.username = decoded.username;

        return next();
    });
}