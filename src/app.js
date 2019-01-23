const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
// const favicon = require('serve-favicon');

const cors = require('cors');
const morgan = require('morgan');
// const fetch = require('node-fetch');
// const Twitter = require('twitter');

// const helpers = require('./views/helpers/index.js');
const routes = require('./routes/index.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('tiny'));
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine(
    'hbs',
    handlebars({
        extname: 'hbs',
        layoutsDir: path.join(__dirname, 'views', 'layout'),
        partialsDir: path.join(__dirname, 'views', 'partials'),
        defaultLayout: 'main'
    })
);

app.set('port', process.env.PORT || 5000);
app.use(routes);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '/public')));

//sets an express static route and links the favicon
app.use('/public', express.static('public'));

module.exports = app;
