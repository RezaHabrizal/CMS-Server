const jwt = require('jsonwebtoken');
// const SECRET_JWT = 'rahasia'

function signJwt(payload) {
    return jwt.sign(payload, 'rahasia')
}

function verifyJwt(token) {
    return jwt.verify(token, 'rahasia')
}

module.exports = {
    signJwt,
    verifyJwt
}