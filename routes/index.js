const Router = require('express').Router();
const UserController = require('../controllers/userController');
const ProductController = require('../controllers/productController');
const CartController = require('../controllers/cartController');
const authenticate = require('../middlewares/authentication');
const {authorizeAdmin, authorizeCustomer} = require('../middlewares/authorization');

Router.post('/register', UserController.register)
Router.post('/login', UserController.login)

Router.use(authenticate)
Router.get('/products', ProductController.showAll)
Router.post('/cart', CartController.create)
Router.get('/cart', CartController.showCart)

Router.use('/cart/:id', authorizeCustomer)
Router.put('/cart/:id', CartController.update)
Router.delete('/cart/:id', CartController.delete)

Router.use('/products', authorizeAdmin)
Router.post('/products', ProductController.create)
Router.put('/products/:id', ProductController.update)
Router.delete('/products/:id', ProductController.delete)

module.exports = Router