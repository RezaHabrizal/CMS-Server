const {User} = require('../models');
const {comparePassword} = require('../helpers/bcrypt');
const {signJwt} = require('../helpers/jwt');
const {OAuth2Client} = require('google-auth-library');

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

    static googleLogin(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email
        let name
        client.verifyIdToken({
            idToken: req.body.googleToken,
            audience: process.env.CLIENT_ID
        })
        .then((ticket) => {
            const payload = ticket.getPayload()
            email = payload.email
            name = payload.name
            return User.findOne({
                where: {
                    email,
                }
            })

        })
        .then((user) => {
            if (user) {
                const access_token = signJwt({
                    id: user.id,
                    name: user.name,
                    email: user.email
                })
                res.status(200).json({access_token, name, email, id})
            } else {
                return User.create({
                    email,
                    name,
                    avatar,
                    password: Math.random() * 1000 + "abcxyzs" 
                })
            }
        })
        .then((newGoogleRegisteredUser) => {
            const access_token = signJwt({
                id: newGoogleRegisteredUser.id,
                name: newGoogleRegisteredUser.name,
                email: newGoogleRegisteredUser.email
            })
            res.status(201).json({access_token, name: newGoogleRegisteredUser.name})
        })
        .catch((err) => {
            next({name: err.name})
        })
    }
}

module.exports = UserController