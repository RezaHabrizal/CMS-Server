const {User, Cart} = require('../models');

function authorizeAdmin(req, res, next) {
    if (!req.loggedUser) {
        next({name: "unauthorized"})
    } else {
        User.findOne({
            where: {
                email: req.loggedUser.email
            }
        })
        .then(foundUser => {
            if (foundUser.email === req.loggedUser.email && foundUser.role === req.loggedUser.role) {
                next()
            } else {
                throw ({name: "unauthorized"})
            }
        })
        .catch(err => {
            name = err.name || "internal server error"
            next({name})
        })
    }

}

function authorizeCustomer(req, res, next) {
    Cart.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(foundCart => {
        if (foundCart) {
            if (foundCart.userId === req.loggedUser.id) {
                next()
            } else {
                next({name: "unauthorized"})
            }
        } else {
            next({name: "not found"})
        }
    })
    .catch(err => {
        next({name: err.name})
    })
}

module.exports = {
    authorizeAdmin,
    authorizeCustomer
}