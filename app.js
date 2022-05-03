import express, { static as staticPage, json, urlencoded } from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from "passport";
import bodyParser from 'body-parser';
// const fileUpload = require('express-fileupload');
// const cors = require('cors')

import 'dotenv/config';

import authRouter from './routes/authRouter.js';
import pageRouter from './routes/pageRoutes.js';
import glucoseRouter from './routes/measurementRoutes.js';
import clinicianRouter from './routes/clinicianRoutes.js';
import patientRouter from './routes/patientRoutes.js';

// If we are not running in production, load our local .env

const port = process.env.PORT || 8080;

const app = express()


app.use(express.static('public'))
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { expires: 600000 },
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}))

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


// Connecting to database
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


//passport
app.use(passport.initialize());
app.use(passport.session())

//ROUTES 
app.use('/auth', authRouter)
app.use('/', pageRouter)
app.use('/', glucoseRouter)
app.use('/', patientRouter)
app.use('/', clinicianRouter)

// index.html
app.get('/', (req, res) => {
    res.render('index', {css: "stylesheets/index.css"})
})

app.get('/aboutDiabetes', (req, res) => {
    res.render('aboutDiabetes', { headTitle: "About Diabetes" , css: "stylesheets/index.css" })
})

app.get('/aboutWebsite', (req, res) => {
    res.render('aboutWebsite', { headTitle: "About This Site", css: "stylesheets/index.css" })
})

// default route to handle errors
app.get('*', (req, res) => {
    res.status(404).send('<p> invalid request </p>')
})

app.listen(port, () => {
    console.log('website listening for request ...')
})