const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const passport = require("passport");
const exphbs = require('express-handlebars')
const path = require('path')

const authRouter = require('./routes/authRouter')

const app = express();
const port = process.env.PORT || 8080;

// If we are not running in production, load our local .env
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')));

//HBS
app.engine('hbs', exphbs.engine({
    defaultlayout: 'main',
    extname: 'hbs',
    helpers: {
    }
}))

app.set('view engine', 'hbs')
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
        mongoUrl: process.env.MONGO_URL || 'mongodb://localhost/test-app',
    }),
};
// for production, cookie needs 2 more settings
if (process.env.NODE_ENV === "production") {
    sessionConfig.cookie.secure = true;
    sessionConfig.cookie.sameSite = "none";
}
app.enable("trust proxy");
app.use(session(sessionConfig));


// MONGODB
const dbConn = process.env.MONGO_URL || 'mongodb://localhost/test-app';
mongoose.connect(
    dbConn,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            console.log("Error connecting to database", err);
        } else {
            console.log("Connected to database!");
        }
    }
);


//PASSPORT
require("./middleware/passport");
app.use(passport.initialize());
app.use(passport.session());

//ROUTES
app.use("/user", authRouter);
// app.use("/", pageRouter);

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


//PORT
app.listen(port, () => {
    console.log('website listening for request ...')
})