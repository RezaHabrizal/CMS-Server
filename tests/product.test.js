// const request = require('supertest');
// const app = require('../app');
// const {sequelize} = require('../models');;
// const {queryInterface} = sequelize
// const {signJwt} = require('../helpers/jwt');

// let product = {
//     name: "",
//     imageUrl: "",
//     price: -1,
//     stock: -1
// }
// let access_token
// beforeAll(() => {
//     return queryInterface.bulkInsert('Users', [{name: "reza", email: "r@mail.com", role: "admin", password: "123456", createdAt: new Date(), updatedAt: new Date()}])
// })

// beforeEach(() => {
//     const user = {name: "reza", email: "r@mail.com", role: "admin"}
//     access_token = signJwt({name: user.name, email: user.email, id: user.id, role: user.role})
//     return queryInterface.bulkInsert('Products', [{name: "gergaji", imageUrl: "https://gergaji.png", price: 1, stock: 1, createdAt: new Date(), updatedAt: new Date()}])
// })

// afterAll((done) => {
//     queryInterface.bulkDelete('Users', null, {})
//     queryInterface.bulkDelete('Products', null, {})
//     product = {
//         name: "",
//         imageUrl: "",
//         price: -1,
//         stock: -1
//     }
//     done()
// })

// describe('case not have access token', () => {
//     it('should response message: unauthorized', (done) => { 
//         return request(app)
//         .post('/products') 
//         .send(product)
//         .set('access_token', '')
//         .expect('Content-Type', /json/)
//         .then(response => {
//             const {body, status} = response
//             expect(status).toBe(401)
//             expect(body).toHaveProperty('message', 'unauthorized')
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
//     })
// })

// describe('case have access_token but not belongsto admin', () => {
//     it('should response message: unauthorized', (done) => {
//         return request(app)
//         .post('/products')
//         .send(product)
//         .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsIm5hbWUiOiJhbm9ueW1vdXNlIiwiaWF0IjoxNjE4MjYyNzM3fQ.sddajtQfMihCctBklkHS-3TIqohtsQnC3QkchpgddBk')
//         .expect('Content-Type', /json/)
//         .then(response => {
//             let {body, status} = response
//             expect(status).toBe(401)
//             expect(body).toHaveProperty('message', 'unauthorized')
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
//     })
// })

// describe('case is admin create product with empty field or less than 0 in stock or price', () => {
//     it('should response field is required not empty', (done) => {
//         return request(app)
//         .post('/products')
//         .send(product)
//         .set('access_token', access_token)
//         .expect('Content-Type', /json/)
//         .then(response => {
//             let {body, status} = response
//             expect(status).toBe(400)
//             let expected = ['field is required not empty', 'Validation min on price failed', 'Validation min on stock failed']
//             expect(body.message).toEqual(expect.arrayContaining(expected))
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
//     })
// })

// describe('case update not have access_token', () => {
//     it('should response message: unauthorized', (done) => {
//         return request(app)
//         .put('/products/1')
//         .send(product)
//         .set('access_token', '')
//         .expect('Content-Type', /json/)
//         .then(response => {
//             let {body, status} = response
//             expect(status).toBe(401)
//             expect(body).toHaveProperty('message', 'unauthorized')
//             done()
//         })
//         .catch((err) => {
//             done(err)
//         })
//     })
// })

// describe('case have access_token but not belongs to admin', () => {
//     it('should response message: unauthorized', (done) => {
//         return request(app)
//         .put('products/1')
//         .send(product)
//         .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsIm5hbWUiOiJhbm9ueW1vdXNlIiwiaWF0IjoxNjE4MjYyNzM3fQ.sddajtQfMihCctBklkHS-3TIqohtsQnC3QkchpgddBk')
//         .expect('Content-Type', /json/)
//         .then(response => {
//             let {body, status} = response
//             expect(status).toBe(401)
//             expect(body).toHaveProperty('message', 'unauthorized')
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
//     })
// })

// describe('case is admin update product with empty field or less than 0 in price or stock', () => {
//     it('should response message filed is required not empty', (done) => {
//         return request(app)
//         .put('/products/1')
//         .send(product)
//         .set('access_token', access_token)
//         .expect('Content-Type', /json/)
//         .then(response => {
//             let {body, status} = response
//             expect(status).toBe(400)
//             // let expected = ['field is required not empty', 'Validation min on price failed', 'Validation min on stock failed']
//             // expect(body.message).toEqual(expect.arrayContaining(expected))
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
//     })
// })

// describe('case create product is filled with wrong data types', () => {
//     it('should response message: bad request', (done) => {
//         product.name = 1
//         return request(app)
//         .post('/products')
//         .send(product)
//         .set('access_token', access_token)
//         .expect('Content-Type', /json/)
//         .then(response => {
//             let {body, status} = response
//             expect(status).toBe(400)
//             // expect(body).toHaveProperty('message', 'bad request')
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
//     })
// })

// describe('case update product with wrong data types', () => {
//     it('should response message: bad request', (done) => {
//         product.imageUrl = 1
//         return request(app)
//         .put('/products/1')
//         .send(product)
//         .set('access_token', access_token)
//         .then(response => {
//             let {body, status} = response
//             expect(status).toBe(400)
//             // expect(body).toHaveProperty('message', 'bad request')
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
//     })
// })

// describe('case delete doesnt have access-token', () => {
//     it('should response message: unauthorized', (done) => {
//         return request(app)
//         .delete('/products/1')
//         .set('access_token', '')
//         .expect('Content-Type', /json/)
//         .then(response => {
//             let {body, status} = response
//             expect(status).toBe(401)
//             expect(body).toHaveProperty('message', 'unauthorized')
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
//     })
// })

// describe('case delete product have access_token but not belongs to admin', () => {
//     it('should response unauthorized', (done) => {
//         return request(app)
//         .delete('/products/1')
//         .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsIm5hbWUiOiJhbm9ueW1vdXNlIiwiaWF0IjoxNjE4MjYyNzM3fQ.sddajtQfMihCctBklkHS-3TIqohtsQnC3QkchpgddBk')
//         .expect('Content-Type', /json/)
//         .then(response => {
//             let {body, status} = response
//             expect(status).toBe(401)
//             expect(body).toHaveProperty('message', 'unauthorized')
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
//     })
// })