require('dotenv').config()
const chai = require('chai')
const expect = require('chai').expect
const chaiHttp = require('chai-http')
const app = require('../../src/app')
const { db } = require('../../db/db')
const path = require('path')

chai.use(chaiHttp)
describe("Users controllers", () => {
    const config = {
        directory: path.join(__dirname, '..', '..', 'db', 'migrations')
    }

    beforeEach(async function () {
        // Connect to test database
        await db.migrate.latest(config)
        console.log("Starting db")
    });

    afterEach(async function () {
        // Rollback test database
        await db.migrate.rollback(config)
        console.log('closing db')
    });

    describe("User signup", () => {
        it('should return status 400 if any fields are missing', async () => {
            const user = {
              email: "ryan.jake@gmail.net",
              firstName: "ryan",
              lastName: "",
              password: "ryan4ever"
            };
            
            const response = await (chai.request(app).post('/users/signup').send(user))
            expect(response).to.have.status(400)
          })

          it('should return status 201 with newly created user', async () => {
            const user = {
              email: "ryan.jake@gmail.net",
              firstName: "ryan",
              lastName: "jake",
              password: "ryan4ever"
            };
            
            const response = await (chai.request(app).post('/users/signup').send(user))
            expect(response._body).to.have.property('uid').to.be.a('number');
            expect(response._body).to.have.property('email').to.equal(user.email);
            expect(response._body).to.have.property('first_name').to.equal(user.firstName);
            expect(response._body).to.have.property('last_name').to.equal(user.lastName);
            expect(response._body).to.have.property('created_at').to.be.a('string');
            expect(response._body).to.have.property('updated_at').to.be.a('string');
            expect(response._body).to.have.property('password').to.be.a('string')
          })
    })
})