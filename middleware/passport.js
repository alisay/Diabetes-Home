const passport = require("passport");
const LocalStrategy = require("passport-local");
const ClinicianModel = require("./../models/clinician");
const JwtStrategy = require('passport-jwt').Strategy
require('dotenv').config();


passport.serializeUser((user, done) => {
    done(null, user._id);
});

//start with ID end up with user
passport.deserializeUser((userId, done) => {
    //console.log("hit deserializeUser")
    ClinicianModel.findById(userId)
        .then((user) => done(null, user))
        .catch(done)
})

const canLogin = (user, password) => {

    if (user) {
        return user.verifyPasswordSync(password)

    } else {

        return false
    }

}

const verifyCallback = (email, password, done) => {
    ClinicianModel.findOne({ email })
        .then((user) => {

            if (canLogin(user, password)) {

                return done(null, user)
            } else {

                return done(null, false)
            }
        })
        .catch(done)
}
// this is setting passport username to email as passport local accepts username and password
const fields = { usernameField: "email" }

passport.use(new LocalStrategy(fields, verifyCallback))

//VERIFYING JWT IN COOKIE
passport.use(new JwtStrategy(
    {
        jwtFromRequest: (req) => {
            let token = null;

            if (req && req.cookies) {
                token = req.cookies['jwt'];
            }

            return token;
        },
        secretOrKey: process.env.JWT_SECRET
    },
    async (jwt_payload, done) => {
        const user = await ClinicianModel.findById(jwt_payload.sub)
            .catch(done);

        if (!user) {
            return done(null, false);
        }

        return done(null, user);

    }
));
