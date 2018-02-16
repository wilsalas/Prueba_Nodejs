'use strict'

const express = require('express'),
    app = express(),
    http = require('http').Server(app),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    hbs = require('express-handlebars'),
    config = require('./config/config'),
    routes = require('./routes/routes');

http.listen(config.PORT, () => {
    console.log(`Conected to port ${config.PORT}`);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('hbs', hbs({ 
    defaultLayout: 'main',
    extname:'.hbs' 
}
));
app.use(express.static('public'));
app.set('view engine', '.hbs');
app.use('/educativo', routes);
mongoose.connect(config.DATABASE, { useMongoClient: true });
mongoose.connection.on('connected', () => {
    console.log('Conected Mongo');
});
mongoose.connection.on('error', (err) => {
    console.log(`Error in conection  ${err}`);
});