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
            console.log(currentUser, decoded, "dari authen current user")
            if (currentUser && decoded.role === "admin") {
                req.loggedUser = {
                    id: currentUser.id,
                    email: currentUser.email,
                    name: currentUser.name,
                    role: currentUser.role
                }
                next()
            } else if (currentUser) {
                req.loggedUser = {
                    id: currentUser.id,
                    email: currentUser.email,
                    name: currentUser.name
                }
                next()
            }
        })
        .catch(err => {
            next({name: "unauthorized"})
        })
    } else {
        next({name: "unauthorized"})
    }
}

module.exports = authenticate