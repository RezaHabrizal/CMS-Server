const { compareSync } = require('bcrypt');
const {Product} = require('../models');

class ProductController {
    static showAll(req, res, next) {
        Product.findAll()
        .then(products => {
            products.map(e => {
                return e.toRupiah()
            })
            res.status(200).json(products)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
    }

    static create(req, res, next) {
        const {name, imageUrl, price, stock} = req.body.data
        Product.create({
            name,
            imageUrl,
            price,
            stock
        })
        .then((created) => {
            // created = created.toRupiah()
            res.status(200).json(created)
        })
        .catch(err => {
            if (err.name === "SequelizeDatabaseError") {
               next({name: err.name})
            } else if (err.name === "SequelizeValidationError") {
                let errors = err.errors.map(e => {
                    return e.message
                })
                next({name: err.name, message: errors})
            } else {
                next({name: err.name})
            }
        })
    }
    
    static update(req, res, next) {
        const {name, imageUrl, price, stock} = req.body.data

        Product.update({
            name,
            imageUrl,
            price,
            stock
        }, {
            where: {
                id: +req.params.id
            }, returning: true
        })
        .then(updatedProduct => {
            let updated = updatedProduct[1][0].toRupiah()
            // console.log(updated, "UPDATEEEEEE")
            res.status(200).json({updated})
        })
        .catch(err => {
            next({name: err.name || "internal server error"})
        })
    }

    static delete(req, res, next) {
        Product.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(response => {
            console.log(response, "RESPONSE DELETE<<<")
            res.status(200).json({message: "success delete product with id " + req.params.id})
        })
        .catch(err => {
            next({name: err.name || "internal server error"})
        })
    }
}

module.exports = ProductController