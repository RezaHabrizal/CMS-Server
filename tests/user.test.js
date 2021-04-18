// const request = require('supertest');
// const app = require('../app');
// const {sequelize} = require('../models');;
// const {queryInterface} = sequelize

// let validUserData = {
//     name: "reza",
//     email: "reza@mail.com",
//     password: "123456"
// }

// beforeAll((done) => {
//     queryInterface.bulkDelete('Users')
//     .then(() => {
//         done()
//     })
// })

// // test register
// describe('Customer regiser feature', () => {
//     it('should be success all register field', (done) => { //harus deskriptif tidak perlu tknikal
//         return request(app)
//         .post('/register')
//         .send(validUserData) // req body
//         .set('Accept', 'application/json') // kirim header, key: Accept, value: application/json(optional, disesuaikan dengan yg diterima app)/
//         .expect('Content-Type', /json/) // response.json()/balikannya, kalau response.text akan error karna dari controller kembalikan json
//         .then(response => {
//             let { body, status } = response
//             expect(status).toBe(201)
//             expect(body).toHaveProperty('id', expect.any(Number))
//             expect(body).toHaveProperty('email', validUserData.email)
//             expect(body).toHaveProperty('name', validUserData.name)
//             done()
//         })
//         .catch((err) => {
//             console.log(err)
//             done(err)
//         })
//     })
// })

// describe('fail login case have email wrong password', () => {
   
//     it('should return message invalid username/password', (done) => {
//         return request(app)
//         .post('/login')
//         .send({email: validUserData.email, password: "1"})
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .then((response) => {
//             const {body, status} = response
//             expect(status).toBe(400)
//             expect(body).toHaveProperty('message', 'invalid username/password')
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
//     })
// })

// describe('fail login case email not found', () => {
    
//     it('should return invalid username/password', (done) => {
//         return request(app)
//         .post('/login')
//         .send({email: 'r@mail.com', password: "123456"})
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .then(response => {
//             const {body, status} = response
//             expect(status).toBe(404)
//             expect(body).toHaveProperty('message', 'invalid username/password')
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
//     })
// })

// describe('fail login case empty email and password', () => {
//     it('should return invalid username/password', (done) => {
//         return request(app)
//         .post('/login')
//         .send({email: null, password: null})
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .then(response => {
//             const {body, status} = response
//             expect(status).toBe(404)
//             expect(body).toHaveProperty('message', 'invalid username/password')
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
//     })
// })

