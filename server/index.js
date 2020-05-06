const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//var bookController = require('./router/book');
require('./models/books');
const book = mongoose.model('book');

var app = express();

const dbUrl = 'mongodb://localhost:27017/prfdatabase';
mongoose.connect(dbUrl);

mongoose.connection.on('connected', function() {
    console.log('Successfully connected to the database...');
});

mongoose.connection.on('error', function(error) {
    console.log('Error during the database connection', error);
});

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
//app.use(cors({ origin: 'http://localhost:4200' }));
//app.use(cors());

var whitelist = ['http://localhost:4200']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}
app.use(cors, corsOptions)

app.use('/books', require('./router/book'));

app.listen(3000, () => {
    console.log('The server is running!');
});