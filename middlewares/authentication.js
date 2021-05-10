const {User} = require('../models');
const {verifyJwt} = require('../helpers/jwt');

function authenticate(req, res, next) {
    let access_token = req.headers.access_token
    
    if (access_token !== "null") {
        const decoded = verifyJwt(access_token)

        User.findOne({
            where: {
                email: decoded.email
            }
        })
        .then(currentUser => {
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

        next()
    }
}

module.exports = authenticate