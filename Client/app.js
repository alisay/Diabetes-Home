const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')

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

// index.html
app.get('/', (req, res) => { 
    res.render('index')
})

app.get('/aboutDiabetes', (req, res) => {
    res.render('aboutDiabetes', {headTitle: "About Diabetes"})
})

app.get('/aboutWebsite', (req, res) => {
    res.render('aboutWebsite', {headTitle: "About This Site"})
})

// default route to handle errors
app.get('*', (req, res) => {
    res.status(404).send('<p> invalid request </p>')
}) 

app.listen(8080, () => {
    console.log('website listening for request ...')
})