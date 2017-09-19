const  jwt = require('jsonwebtoken');

function generateToken(user) {
    return jwt.sign(user, 'tranvantien', {
        expiresIn: 604800
    });
}

module.exports.generateToken = generateToken;