import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { User } from '../models/user.js';
// require('dotenv').config();
import 'dotenv/config';

passport.serializeUser((user, done) => {
    done(null, user._id);
});

// start with ID end up with user
passport.deserializeUser((userId, done) => {
    // console.log("hit deserializeUser")
    User.findById(userId)
        .then((user) => done(null, user))
        .catch(done);
});

const canLogin = (user, password) => {
    if (user) {
        return user.verifyPasswordSync(password);
    }

    return false;
};

const verifyCallback = (ident, password, done) => {
    const qparam = ident.includes("@") ? { email : ident } : { username : ident };
    User.findOne(qparam)
        .then((user) => {
            if (canLogin(user, password)) {
                return done(null, user);
            }

            return done(null, false);
        })
        .catch(done);
};
// this is setting passport username to email as passport local accepts username and password
const fields = { usernameField: 'cred' };

passport.use(new LocalStrategy(fields, verifyCallback));

// VERIFYING JWT IN COOKIE
passport.use(new JwtStrategy(
    {
        jwtFromRequest: (req) => {
            let token = null;

            if (req && req.cookies) {
                token = req.cookies.jwt;
            }

            return token;
        },
        secretOrKey: process.env.JWT_SECRET,
    },
    async (jwt_payload, done) => {
        const user = await User.findById(jwt_payload.sub)
            .catch(done);

        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    },
));
