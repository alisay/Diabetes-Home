const passport = require("passport");
const LocalStrategy = require("passport-local");
const AdminModel = require('../models/admin')

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await AdminModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

// Configure Passport authenticated session persistence.
passport.serializeUser(function (user, cb) {
    cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

// passport local strategy
passport.use(new LocalStrategy(
    async (username, password, done) => {
        // retrieving admin account details from database
        const user = await AdminModel.findOne({ username })
            .catch(done);

        // verifying if password is correct
        if (!user || !user.verifyPasswordSync(password)) {
            return done(null, false);
        }

        return done(null, user);
    }
));

// Admin.find({}, (err, users) => {
//     if (users.length > 0) return;
//     Admin.create({ username: 'user', password: 'pass' }, (err) => {
//         if (err) { console.log(err); return; }
//         console.log('Dummy user inserted')
//     })
// })