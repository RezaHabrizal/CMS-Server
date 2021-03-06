const { Product } = require('../models')

class ProductController {
  static showAll(req, res, next) {
    Product.findAll()
      .then((products) => {
        res.status(200).json(products)
      })
      .catch((err) => {
        res.status(500).json({ message: err.message })
      })
  }

  static create(req, res, next) {
    const { name, imageUrl, price, stock } = req.body
    Product.create({
      name,
      imageUrl,
      price,
      stock,
    })
      .then((created) => {
        res.status(200).json(created)
      })
      .catch((err) => {
        if (err.name === 'SequelizeDatabaseError') {
          next({ name: err.name })
        } else if (err.name === 'SequelizeValidationError') {
          let errors = err.errors.map((e) => {
            return e.message
          })
          next({ name: err.name, message: errors })
        } else {
          next({ name: err.name })
        }
      })
  }

  static update(req, res, next) {
    const { name, imageUrl, price, stock } = req.body

    Product.update(
      {
        name,
        imageUrl,
        price,
        stock,
      },
      {
        where: {
          id: +req.params.id,
        },
        returning: true,
      }
    )
      .then((updatedProduct) => {
        res.status(200).json({ updated: updatedProduct[1][0] })
      })
      .catch((err) => {
        next({ name: err.name || 'internal server error' })
      })
  }

  static delete(req, res, next) {
    Product.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((response) => {
        res
          .status(200)
          .json({ message: 'success delete product with id ' + req.params.id })
      })
      .catch((err) => {
        next({ name: err.name || 'internal server error' })
      })
  }

  static updateStock(req, res, next) {
    let getProduct
    Product.findByPk(req.params.id)
      .then((product) => {
        getProduct = product.dataValues
        return Product.update(
          { ...getProduct, stock: getProduct.stock - +req.query.stock },
          { where: { id: req.params.id } }
        )
      })
      .then((updatedStock) => {
        res.status(200).json({ message: 'success' })
      })
      .catch((err) => {
        next({ name: err.name })
      })
  }
}

module.exports = ProductController
