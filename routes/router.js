const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const app = express();

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
