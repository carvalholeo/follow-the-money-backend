const speakeasy = require('speakeasy');

module.exports = function generateSecretToMFA() {
    const secret = speakeasy.generateSecret({length: 64});
    return secret.base32;
}
