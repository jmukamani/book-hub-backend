const axios = require('axios');
require('dotenv').config();

const searchBooks = async (query) => {
  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.GOOGLE_BOOKS_API_KEY}&maxResults=10`
  );
  return response.data.items.map((item) => ({
    title: item.volumeInfo.title,
    author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
    genre: item.volumeInfo.categories ? item.volumeInfo.categories[0] : 'Unknown Genre',
    publicationDate: item.volumeInfo.publishedDate || 'Unknown Date',
    rating: item.volumeInfo.averageRating || 0,
    coverImage: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150',
    description: item.volumeInfo.description || 'No description available.',
  }));
};

module.exports = { searchBooks };