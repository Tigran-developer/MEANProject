const config = require('./db');
const User = require('../front-end-app/users')

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function (passport) {
    const opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.sub})
            .then((user)=>{
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}
