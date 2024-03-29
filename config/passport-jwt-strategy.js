const passport = require('passport');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');
const env = require('./environment');


let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : env.jwt_secret
}

passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){


    User.findById(jwtPayLoad._id,function(err,user){
        if(err){
            console.log('Error in finding user from jwt');
            return;
        }

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }

    });

}));


module.export = passport;