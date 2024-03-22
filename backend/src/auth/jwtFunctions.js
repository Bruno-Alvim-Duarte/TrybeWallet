const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'mySecret';

const createToken = (payload) => {
    const jwtConfig = {
        expiresIn: "1d",
        algorithm: "HS256"
    };

    return jwt.sign(payload, secret, jwtConfig);
}

module.exports = {
    createToken
}