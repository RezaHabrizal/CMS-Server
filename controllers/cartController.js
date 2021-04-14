const {Cart} = require('../models');

class CartController {
    static create(req, res, next) {
        let input = {
            productId: req.body.productId,
            userId: req.loggedUser.id,
            quantity: req.body.quantity,
            status: req.body.status
        }
        Cart.create(input)
        .then(newProductOnCart => {
            res.status(201).json(newProductOnCart)
        })
        .catch(err => {
            next({name: err.name || "internal server error", message: err.message})
        })
    }

    static showCart(req, res, next) {
        Cart.findAll({
            where: {
                userId: req.loggedUser.id
            }
        })
        .then(carts => {
            res.status(200).json(carts)
        })
        .catch(err => {
            next({name: err.name || "internal server error"})
        })
    }

    static delete(req, res, next) {
        Cart.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(response => {
            console.log(response)
            res.status(200).json({message: "success delete cart"})
        })
        .catch(err => {
            next({name: err.name || "internal server error"})
        })
    }

    static update(req, res, next) {
        const {quantity, status} = req.body
        Cart.update({quantity, status, userId: req.loggedUser.id}, {
            where: {
                productId: req.params.id
            }, returning: true
        })
        .then(updated => {
            res.status(200).json({cart: updated[1][0]})
        })
        .catch(err => {
            next({name: err.name || "internal server error"})
        })
    }
}

module.exports = CartController