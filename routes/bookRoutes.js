const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.get('/books', bookController.getAllBooks);
router.get('/books/search', bookController.searchBooksFromGoogle);
router.get('/books/:id', bookController.getBookById);
router.post('/books', bookController.addBook);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);


module.exports = router;