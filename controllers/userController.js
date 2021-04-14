const {User} = require('../models');
const {comparePassword} = require('../helpers/bcrypt');
const {signJwt} = require('../helpers/jwt');

class UserController {
    static register(req, res, next) {
        const {email, name, password} = req.body

        User.create({
            email,
            name,
            password
        })
        .then((newUser) => {
            res.status(201).json({id: newUser.id, email: newUser.email, name: newUser.name})
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({message: err.message})
        })
    }

    static login(req, res, next) {
        const {email, password} = req.body
        User.findOne({where: {email}})
        .then(foundUser => {
            if (foundUser) {
                const matchPassword = comparePassword(password, foundUser.password)
                if (matchPassword && foundUser.role === process.env.ROLE) {
                    const access_token = signJwt({name: foundUser.name, email: foundUser.email, id:foundUser.id, role: "admin"})
                    res.status(200).json({message: "succes login"})
                } else if (matchPassword) {
                    const access_token = signJwt({name: foundUser.name, email: foundUser.email, id: foundUser.id})
                    res.status(200).json({message: "succes login"})
                } else if (!matchPassword) {
                    next({name: 'invalid username/password'})
                } 
            } else {
                next({name: 'invalid username/password'})
            }
        })
        .catch((err) => {
            if (err.name === "SequelizeValidationError") {
                let errors = err.errors.map(e => {
                    return e.message
                })
                next({name: "SequelizeValidationError", message: errors})
            } else {
                next({message: "500"})
            }
        })
    }
}

module.exports = UserController