const sinon = require('sinon');
const expect = require('chai').expect; // Using expect BDD interface
const bcrypt = require('bcrypt');

const usersController = require('../../src/api/routes/users/users.controller');
const usersModel = require('../../src/api/models/users.model');
const jwt = require('jsonwebtoken');
const refreshTokensModel = require('../../src/api/models/refreshTokens.model');

describe("Users controllers", function () {
    let res;

    beforeEach(function () {
        // Stubs need to be used here rather than spies as res.status() must be stubbed to return this
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
    });

    afterEach(function () {
        // Must restore stub history
        sinon.restore();
    });

    describe("User signup", function () {
        it('should return status 400 if any fields are missing', async function () {
            const req = {
                body: {
                    email: "abc",
                    firstName: "123",
                    lastName: "a",
                    password: ""
                }
            };

            await usersController.signupUser(req, res);

            expect(res.status.calledOnceWith(400)).to.be.true;
            expect(res.json.calledOnceWith({ error: 'Please specify all fields' })).to.be.true;
        });

        it('should return status 400 if email already exists', async function () {
            const req = {
                body: {
                    email: "abc@gmail.com",
                    firstName: "John",
                    lastName: "Doe",
                    password: "123abcd"
                }
            };

            sinon.stub(usersModel, "getUserByEmail").returns(req);

            await usersController.signupUser(req, res);

            expect(res.status.calledOnceWith(400)).to.be.true;
            expect(res.json.calledOnceWith({ error: 'Email already exists' })).to.be.true;
        });

        it('should return status 201 with newly created user', async function () {
            const req = {
                body: {
                    email: "john-doe@gmail.com",
                    firstName: "John",
                    lastName: "Doe",
                    password: "baz"
                }
            };

            const HASHED_PASSWORD = 'foo';

            const newUser = { ...req.body };
            newUser.password = HASHED_PASSWORD;

            const emailCheckStub = sinon.stub(usersModel, "getUserByEmail").returns([]);
            const bcryptStub = sinon.stub(bcrypt, 'hash').returns(HASHED_PASSWORD);
            const createUserStub = sinon.stub(usersModel, 'createUser').returns(newUser);

            await usersController.signupUser(req, res);

            expect(emailCheckStub.calledOnceWith(req.body.email)).to.be.true
            expect(bcryptStub.calledOnceWith(req.body.password)).to.be.true
            expect(createUserStub.calledOnceWith(newUser)).to.be.true
            expect(res.status.calledOnceWith(201)).to.be.true;
            expect(res.json.calledOnceWith(newUser)).to.be.true;
        });
    });

    describe("User login", function () {
        it('should return status 400 if any fields are missing', async function () {
            const req = {
                body: {
                    email: "abc@gmail.com",
                    password: ""
                }
            };

            await usersController.loginUser(req, res);

            expect(res.status.calledOnceWith(400)).to.be.true;
            expect(res.json.calledOnceWith({ error: 'Please specify all fields' })).to.be.true;
        });

        it('should return status 400 if email is invalid', async function () {
            const req = {
                body: {
                    email: "abc@gmail.com",
                    password: "123abcd"
                }
            };

            const emailCheckStub = sinon.stub(usersModel, "getUserByEmail").returns(null);

            await usersController.loginUser(req, res);

            expect(emailCheckStub.calledOnceWith(req.body.email)).to.be.true;
            expect(res.status.calledOnceWith(400)).to.be.true;
            expect(res.json.calledOnceWith({ error: 'Invalid credentials' })).to.be.true;
        });

        it('should return status 400 if password is invalid', async function () {
            const req = {
                body: {
                    email: "abc@gmail.com",
                    password: "foo",
                }
            };

            const HASHED_PASSWORD = 'baz'

            const emailCheckStub = sinon.stub(usersModel, "getUserByEmail").returns({ password: HASHED_PASSWORD });
            const bcryptStub = sinon.stub(bcrypt, 'compare').returns(false)

            await usersController.loginUser(req, res);

            expect(emailCheckStub.calledOnceWith(req.body.email)).to.be.true;
            expect(bcryptStub.calledOnceWith(req.body.password, HASHED_PASSWORD)).to.be.true;
            expect(res.status.calledOnceWith(400)).to.be.true;
            expect(res.json.calledOnceWith({ error: 'Invalid credentials' })).to.be.true;
        });

        it('should return status 200 with signed JWT access and refresh token', async function () {
            const req = {
                body: {
                    email: "abc@gmail.com",
                    password: "foo",
                }
            };

            const user = {
                email: "abc@gmail.com",
                password: "foo",
                uid: 1
            }

            const HASHED_PASSWORD = 'baz'
            const ACCESS_TOKEN = 'qux'
            const REFRESH_TOKEN = 'bar'

            const emailCheckStub = sinon.stub(usersModel, "getUserByEmail").returns({ password: HASHED_PASSWORD, uid: user.uid });
            const bcryptStub = sinon.stub(bcrypt, 'compare').returns(true)
            const jwtStub = sinon.stub(jwt, 'sign')

            jwtStub.withArgs(
                { uid: user.uid },
                process.env.DEV_JWT_SECRET,
                {
                    expiresIn: "1h",
                }
            ).returns(ACCESS_TOKEN);

            jwtStub.withArgs(
                { uid: user.uid },
                process.env.DEV_JWT_SECRET,
                {
                    expiresIn: "7d",
                }
            ).returns(REFRESH_TOKEN);

            sinon.stub(refreshTokensModel, 'getRefreshTokenByUid').returns([]);
            sinon.stub(refreshTokensModel, 'createRefreshToken');

            await usersController.loginUser(req, res);

            expect(emailCheckStub.calledOnceWith(req.body.email)).to.be.true;
            expect(bcryptStub.calledOnceWith(req.body.password, HASHED_PASSWORD)).to.be.true;
            expect(res.status.calledOnceWith(200)).to.be.true;
            expect(res.json.calledWith({ token: ACCESS_TOKEN, refreshToken: REFRESH_TOKEN })).to.be.true;
        });
    });
});
