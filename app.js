import express, { static as staticPage, json, urlencoded } from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from "passport";
import bodyParser from 'body-parser';
// const fileUpload = require('express-fileupload');
import cors from 'cors'
import cookieParser from "cookie-parser";
import flash from 'express-flash';

import 'dotenv/config';

import authRouter from './routes/authRouter.js';
import glucoseRouter from './routes/measurementRoutes.js';
import clinicianRouter from './routes/clinicianRoutes.js';
import patientRouter from './routes/patientRoutes.js';

import { Measurements } from './models/index.js';
// If we are not running in production, load our local .env

const port = process.env.PORT || 8080;

const app = express()

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.static('public'))
app.use(express.static('./public'));
// app.use(bodyParser.urlencoded({ extended: true }));

// SESSION
const sessionConfig = {
    secret: process.env.SESSION_SECRET || "Pixel Secret",
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
if (process.env.NODE_ENV === "production") {
    sessionConfig.cookie.secure = true;
    sessionConfig.cookie.sameSite = "none";
}
app.enable("trust proxy");
app.use(session(sessionConfig));


// HANDLEBARS
app.engine('hbs', engine({
    defaultlayout: 'main',
    extname: 'hbs',
    helpers: {
        eq: (val1, val2) => val1 === val2,
        inRange: (value, lowerBound, upperBound) => 
            ( lowerBound === null && upperBound === null ) || 
            ( value >= lowerBound && value <= upperBound && value !== null )
    }
}))

app.set('view engine', 'hbs')

// Flash messages for failed logins, and (possibly) other success/error messages
  app.use(flash())

// CORS
const whitelist = ["http://localhost:8080", "https://home-diabetes.herokuapp.com/"];
app.use(
    cors({
        credentials: true,
        //methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        origin: function (origin, callback) {
            // Check each url in whitelist and see if it includes the origin (instead of matching exact string)
            const whitelistIndex = whitelist.findIndex((url) => url.includes(origin));
            // console.log("found whitelistIndex", whitelistIndex);
            callback(null, whitelistIndex > -1);
        },
    })
);


// MONGODB
let dbConn = process.env.MONGO_URI || 'mongodb://localhost/test-app'

const mongClient = mongoose.connect(dbConn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'demo'
},
    (err) => {
        if (err) {
            console.log('Error connecting to database', err);
        } else {
            console.log('Connected to database!');
        }
    });

app.use(json());
app.use(urlencoded({ extended: true }));


//PASSPORT
import "./middleware/passport.js";
app.use(passport.initialize());
app.use(passport.session())

//ROUTES 
app.use('/user', authRouter)
app.use('/', glucoseRouter)
app.use('/', patientRouter)
app.use('/', clinicianRouter)

// index.html
app.get('/', (req, res) => {
    res.render('aboutWebsite', {css: "stylesheets/index.css"})
})

app.get('/aboutDiabetes', (req, res) => {
    res.render('aboutDiabetes', { headTitle: "About Diabetes" , css: "stylesheets/index.css" })
})

app.get('/aboutWebsite', (req, res) => {
    res.render('aboutWebsite', { headTitle: "About This Site", css: "stylesheets/index.css" })
})

app.get('/chart', (req, res) => {
    res.render('chart', { headTitle: "chatr", css: "stylesheets/index.css" })
})

// default route to handle errors
app.get('*', (req, res) => {
    res.status(404).send('<p> invalid request </p>')
})

app.listen(port, () => {
    console.log('website listening for request ...')
})