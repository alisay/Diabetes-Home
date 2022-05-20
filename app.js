import express, { urlencoded } from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import flash from 'express-flash';

import 'dotenv/config';

import * as routers from './routes/index.js';

// PASSPORT
import './middleware/passport.js';
// If we are not running in production, load our local .env

const port = process.env.PORT || 8080;

const app = express();

app.use(cookieParser());
app.use(express.static('public'));

// SESSION
const sessionConfig = {
    secret: process.env.SESSION_SECRET || 'Pixel Secret',
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
        expires: 3600000,
        httpOnly: false,
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI || 'mongodb://localhost/test-app',
    }),
};
// for production, cookie needs 2 more settings
if (process.env.NODE_ENV === 'production') {
    sessionConfig.cookie.secure = true;
    sessionConfig.cookie.sameSite = 'none';
}
app.enable('trust proxy');
app.use(session(sessionConfig));

// HANDLEBARS
app.engine('hbs', engine({
    defaultlayout: 'main',
    extname: 'hbs',
    helpers: {
        eq: (val1, val2) => val1 === val2,
        inRange: (value, lowerBound, upperBound) => (lowerBound === null && upperBound === null)
            || (value >= lowerBound && value <= upperBound && value !== null),
    },
}));

app.set('view engine', 'hbs');

// Flash messages for failed logins, and (possibly) other success/error messages
app.use(flash());

// CORS
const whitelist = ['http://localhost:8080', 'https://home-diabetes.herokuapp.com/'];
app.use(
    cors({
        credentials: true,
        // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        origin(origin, callback) {
            // Check each url in whitelist and see if it includes the origin (instead of matching exact string)
            const whitelistIndex = whitelist.findIndex((url) => url.includes(origin));
            callback(null, whitelistIndex > -1);
        },
    }),
);

// MONGODB
const dbConn = process.env.MONGO_URI || 'mongodb://localhost/test-app';

mongoose.connect(
    dbConn,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'demo',
    },
    (err) => {
        if (err) {
            console.log('Error connecting to database', err);
        } else {
            console.log('Connected to database!');
        }
    },
);

app.use(urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
Object.values(routers).forEach(r => app.use('/', r));

// index.html
app.get('/', (req, res) => {
    res.render('aboutWebsite', { user: req.user, headTitle: 'Diabetes @ Home', css: 'stylesheets/index.css' });
});

app.get('/aboutDiabetes', (req, res) => {
    res.render('aboutDiabetes', { user: req.user, headTitle: 'About Diabetes', css: 'stylesheets/index.css' });
});

app.get('/favicon.ico', )

// default route to handle errors
app.get('*', (req, res) => {
    res.status(404).send('<p> Page Not Found </p>');
});

app.listen(port, () => {
    console.log('Website listening for request...');
});
