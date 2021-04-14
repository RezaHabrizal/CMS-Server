const {User, Cart} = require('../models');

function authorizeAdmin(req, res, next) {
    console.log(req.loggedUser, "req.logged dari authorization")
    if (!req.loggedUser) {
        console.log("masuk falsy authorize req.logged")
        next({name: "unauthorized"})
    } else {
        User.findOne({
            where: {
                email: req.loggedUser.email
            }
        })
        .then(foundUser => {
            console.log(foundUser, "then authorize admin")
            if (foundUser.email === req.loggedUser.email && foundUser.role === req.loggedUser.role) {
                next()
            } else {
                throw ({name: "unauthorized"})
            }
        })
        .catch(err => {
            console.log(err, "dari AUTHORIZATION")
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