const mongoose = require('mongoose');

const Book = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String},
    publisher: {type: String},
    isbn: {type: String, required: true},
    numberOfPages: {type: Number}
});

mongoose.model('book', Book);