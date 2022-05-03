import { serializeUser, deserializeUser, use } from "passport";
import LocalStrategy from "passport-local";
import { findById, findOne } from '../models/admin';

serializeUser((user, done) => {
    done(null, user._id);
});

deserializeUser(async (id, done) => {
    try {
        const user = await findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

// Configure Passport authenticated session persistence.
serializeUser(function (user, cb) {
    cb(null, user);
});
deserializeUser(function (obj, cb) {
    cb(null, obj);
});

// passport local strategy
use(new LocalStrategy(
    async (username, password, done) => {
        // retrieving admin account details from database
        const user = await findOne({ username })
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