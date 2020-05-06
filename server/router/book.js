//const express = require('express');
//const router = express.Router();
const router = require('express').Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Book = mongoose.model('book');

// => localhost:3000/books/
router.get('/', (request, response) => {
    Book.find((error, books) => {
        if(error) return response.status(500).send(error);
        return response.status(200).send(books);
    });
});

// => localhost:3000/books/
router.get('/:id', (request, response) => {
    if(!ObjectId.isValid(request.params.id)) {
        return response.status(400).send('No book with given is: ${request.params.id}');
    }

    Book.findById(request.params.id, (error, book) => {
        if(error) response.status(500).send(error);
        return response.status(200).send(book);
    });
});

router.post('/', (request, response) => {
    const book = new Book({
        title: request.body.title,
        author: request.body.author,
        publisher: request.body.publisher,
        isbn: request.body.isbn,
        numberOfPages: request.body.numberOfPages,
    });

    book.save(function(error) {
        if(error) return response.status(500).send(error);
        return response.status(200).send('Successfully added a new book to the bookstore!');
    });
});

router.put('/:id', (request, response) => {
    if(!ObjectId.isValid(request.params.id)) {
        return response.status(400).send('There is no book found with given id to update : ${request.params.id}');
    }

    const book = {
        title: request.body.title,
        author: request.body.author,
        publisher: request.body.publisher,
        isbn: request.body.isbn,
        numberOfPages: request.body.numberOfPages,
    };

    Book.findByIdAndUpdate(request.params.id, { $set: book }, { new: true }, (error, book) => {
        if(error) return response.status(500).send(error);
        return response.status(200).send(book);
    });
});

router.delete('/:id', (request, response) => {
    if(!ObjectId.isValid(request.params.id)) {
        return response.status(400).send('There is no book found with given id to delete! : ${request.params.id}');
    }

    Book.findByIdAndRemove(request.params.id, (error, book) => {
        if(error) return response.status(500).send(error);
        return response.status(200).send(book);
    });
});

module.exports = router;