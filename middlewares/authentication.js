const {User} = require('../models');
const {verifyJwt} = require('../helpers/jwt');

function authenticate(req, res, next) {
    const access_token = req.headers.access_token
    if (access_token) {
        const decoded = verifyJwt(access_token)
        User.findOne({
            where: {
                email: decoded.email
            }
        })
        .then(currentUser => {
            console.log(currentUser, "foundUSer authenticate")
            if (currentUser && decoded.role === "admin") {
                req.loggedUser = {
                    id: decoded.id,
                    email: decoded.email,
                    name: decoded.name,
                    role: decoded.role
                }
                next()
            } else {
                req.loggedUser = {
                    id: decoded.id,
                    email: decoded.email,
                    name: decoded.name
                }
                next()
            }
        })
        .catch(err => {
            next({name: "unauthorized"})
        })
    } else {
        next()
    }
}

module.exports = authenticate