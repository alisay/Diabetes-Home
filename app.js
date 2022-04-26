import express, { static as staticPage, json, urlencoded } from 'express';
import { engine } from 'express-handlebars';
import { join } from 'path';
import mongoose from 'mongoose';
import session from 'express-session';
import connect_mongo from 'connect-mongo';
import passport from "passport";
// const fileUpload = require('express-fileupload');
// const cors = require('cors')

import authRouter from './routes/authRouter.js';
import pageRouter from './routes/pageRoutes.js';
import glucoseRouter from './routes/measurementRoutes.js';

// If we are not running in production, load our local .env
// if (process.env.NODE_ENV !== 'production') {
    import "dotenv/config";
// }

const port = process.env.PORT || 8080;

const app = express()


app.use(staticPage('public'))
app.use(staticPage('../public'));

app.use(session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { expires: 600000 },
    store: connect_mongo.create({ mongoUrl: process.env.MONGO_URL })
}))

app.engine('hbs', engine({
    defaultlayout: 'main',
    extname: 'hbs',
    helpers: {
    }
}))

app.set('view engine', 'hbs')


// Connecting to database
let dbConn = process.env.MONGO_URL || 'mongodb://localhost/test-app'

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
app.use(urlencoded({
    extended: true
}));


//passport
// import passport from "./config/passport.js";
app.use(passport.initialize());
app.use(passport.session())

//auth router
app.use('/auth', authRouter)

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

// patient dashboard
app.get('/patientDashboard', (req, res) =>{
    res.render('patientDashboard', { headTitle: "Home", css: "stylesheets/patientDashboard.css", script: "scripts/patientDashboard.js" })
})


// default route to handle errors
app.get('*', (req, res) => {
    res.status(404).send('<p> invalid request </p>')
})

app.listen(port, () => {
    console.log('website listening for request ...')
})