const {User} = require('../models');
const {comparePassword} = require('../helpers/bcrypt');
const {signJwt} = require('../helpers/jwt');
const {OAuth2Client} = require('google-auth-library');

class UserController {
    static register(req, res, next) {
        const {email, name, password} = req.body.data
        console.log(email)
        User.create({
            email,
            name,
            password
        })
        .then((newUser) => {
            res.status(201).json({id: newUser.id, email: newUser.email, name: newUser.name})
        })
        .catch((err) => {
            console.log(err, 'errr dari register controller')
            if (err.name === 'SequelizeValidationError') {
                let errors = err.errors.map(e => {
                    return e.message
                })
                next({name: err.name, message: errors})
            } else {
                next({name: err.name, message: err.message})
            }
        })
    }

    static login(req, res, next) {
        const {email, password} = req.body.data
        User.findOne({where: {email}})
        .then(foundUser => {
            if (foundUser) {
                console.log(foundUser)
                const matchPassword = comparePassword(password, foundUser.password)
                if (foundUser.role === process.env.ROLE) {
                    console.log('ADMIN OK')
                    const access_token = signJwt({name: foundUser.name, email: foundUser.email, id:foundUser.id, role: 'admin'})
                    console.log(access_token)
                    res.status(200).json({access_token, name: foundUser.name, role: 'admin'})
                } else if (foundUser && matchPassword) {
                    const access_token = signJwt({name: foundUser.name, email: foundUser.email, id: foundUser.id})
                    res.status(200).json({access_token, name: foundUser.name, role: 'user'})
                } else if (!matchPassword) {
                    next({name: 'invalid username/password'})
                } 
            } else {
                next({name: 'invalid username/password'})
            }
        })
        .catch((err) => {
            console.log(err)
            if (err.name === "SequelizeValidationError") {
                let errors = err.errors.map(e => {
                    return e.message
                })
                next({name: "SequelizeValidationError", message: errors})
            } else {
                next({name: err.name|| "500", message: err.message || 'internal server error'})
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
            next({name: err.name, message: err.message})
        })
    }
}

module.exports = UserController