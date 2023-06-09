const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const usersModel = require('../api/models/users.model')

const ops = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.DEV_JWT_SECRET
}

// At each protected route, this middleware runs and automatically decrypts JWT payload, finds user with correct ID, and returns ID in req.user
const setupPassport = (passport) => {
    passport.use(new JwtStrategy(ops, async (jwt_payload, done) => {
        const [user] = await usersModel.getUserByUid(jwt_payload.uid)
        if (user) {
            return done(null, user.uid)
        } else {
            return done(null, false)
        }
    }))
}

setupPassport(passport)

module.exports = passport
