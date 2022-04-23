const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require("passport");
// const fileUpload = require('express-fileupload');
// const cors = require('cors')

// const authRouter = require('./routes/auth')
const authRouter = require('./routes/authRouter')

const port = process.env.PORT || 8080;

const app = express()

app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', exphbs.engine({
    defaultlayout: 'main',
    extname: 'hbs',
    helpers: {
    }
}))

app.set('view engine', 'hbs')


//flash 
const flash = require('express-flash')
app.use(flash())


app.use(session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { expires: 600000 },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/test-app',
        autoRemove: 'native' // Default
      })
  }))

// app.use(
//     session({
//         // The secret used to sign session cookies (ADD ENV VAR)
//         secret: process.env.SESSION_SECRET || 'keyboard cat',
//         name: 'demo', // The cookie name (CHANGE THIS)
//         saveUninitialized: false,
//         resave: false,
//         cookie: {
//             sameSite: 'strict',
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production'
//         },
//     }))



//passport
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session())
// const passport = require('./passport')
// app.use(passport.authenticate('session'))

//auth router
app.use('/auth', authRouter)
// app.use(authRouter)

// index.html
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/aboutDiabetes', (req, res) => {
    res.render('aboutDiabetes', { headTitle: "About Diabetes" })
})

app.get('/aboutWebsite', (req, res) => {
    res.render('aboutWebsite', { headTitle: "About This Site" })
})


// default route to handle errors
app.get('*', (req, res) => {
    res.status(404).send('<p> invalid request </p>')
})

app.listen(port, () => {
    console.log('website listening for request ...')
})