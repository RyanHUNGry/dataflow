const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const usersModel = require('../api/models/users.model');

const ops = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.DEV_JWT_SECRET,
};

const setupPassport = (passport) => {
  passport.use(new JwtStrategy(ops, async (jwtPayload, done) => {
    const [user] = await usersModel.getUserByUid(jwtPayload.uid);
    if (user) {
      return done(null, user.uid);
    } else {
      return done(null, false);
    }
  }));
};

setupPassport(passport);

module.exports = passport;
