const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require("passport");
// const fileUpload = require('express-fileupload');
// const cors = require('cors')

const authRouter = require('./routes/authRouter')
const pageRouter = require('./routes/page_routes')
const glucoseRouter = require('./routes/glucose_routes')
const patientRouter = require('./routes/patient_routes')
const clinicianRouter = require('./routes/clinician_routes')

// If we are not running in production, load our local .env
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const port = process.env.PORT || 8080;

const app = express()


app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { expires: 600000 },
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
}))

app.engine('hbs', exphbs.engine({
    defaultlayout: 'main',
    extname: 'hbs',
    helpers: {

        when:  function (operand_1, operator, operand_2, options) {
            let operators = {                     //  {{#when <operand1> 'eq' <operand2>}}
              'eq': (l,r) => l == r,              //  {{/when}}
              'noteq': (l,r) => l != r,
              'gt': (l,r) => (+l) > (+r),                        // {{#when var1 'eq' var2}}
              'gteq': (l,r) => ((+l) > (+r)) || (l == r),        //               eq
              'lt': (l,r) => (+l) < (+r),                        // {{else when var1 'gt' var2}}
              'lteq': (l,r) => ((+l) < (+r)) || (l == r),        //               gt
              'or': (l,r) => l || r,                             // {{else}}
              'and': (l,r) => l && r,                            //               lt
              '%': (l,r) => (l % r) === 0                        // {{/when}}
            }
            let result = operators[operator](operand_1,operand_2);
            if(result) return options.fn(this); 
            return options.inverse(this);       
        },


        thresAlert: function (value, lowerBound, upperBound){
            if ((value <= lowerBound || value >= upperBound ) && value != null){
                return true;
            } else {
                return false;
            }
        },

        emptyData: function (value){
            if (value == null){
                return true;
            } else {
                return false;
            }
        },

        measIsRequired: function (value){
            if (value == null){
                return false;
            } else {
                return true;
            }
        },

        getUnit: function (value){
            if (value == 'blood'){
                return 'nmol/L';
                console.log
            } else if (value == 'insulin'){
                return 'doses';
            } else if (value == 'steps'){
                return 'count';
            } else if (value == 'weight'){
                return 'kg';
            }
        }
        
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

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


//passport
require("./config/passport");
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