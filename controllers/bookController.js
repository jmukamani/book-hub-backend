const pool = require('../db/db');
const { searchBooks } = require('../services/googleBooksService');

const getAllBooks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate that `id` is a valid integer
    if (!Number.isInteger(Number(id))) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error in getBookById:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const addBook = async (req, res) => {
  try {
    const { title, author, genre, publicationDate, rating, coverImage, description } = req.body;
    const result = await pool.query(
      'INSERT INTO books (title, author, genre, publication_date, rating, cover_image, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, author, genre, publicationDate, rating, coverImage, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, publicationDate, rating, coverImage, description } = req.body;
    const result = await pool.query(
      'UPDATE books SET title = $1, author = $2, genre = $3, publication_date = $4, rating = $5, cover_image = $6, description = $7 WHERE id = $8 RETURNING *',
      [title, author, genre, publicationDate, rating, coverImage, description, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const searchBooksFromGoogle = async (req, res) => {
  try {
    const { query } = req.query;
    const books = await searchBooks(query);
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  searchBooksFromGoogle,
};