import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchBooks = async () => {
  const response = await api.get('/books');
  return response.data;
};

export const fetchBookById = async (id) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

export const addBook = async (book) => {
  const response = await api.post('/books', book);
  return response.data;
};

export const updateBook = async (id, book) => {
  const response = await api.put(`/books/${id}`, book);
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};

export const searchBooks = async (query) => {
  const response = await api.get('/books/search', { params: { query } });
  return response.data;
};