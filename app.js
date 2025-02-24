import React, { useEffect, useState } from 'react';
import { fetchBooks, searchBooks } from './services/api';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import './index.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      const data = await fetchBooks();
      setBooks(data);
    };
    loadBooks();
  }, []);

  const handleSearch = async (query) => {
    const results = await searchBooks(query);
    setSearchResults(results);
  };

  return (
    <div className="app">
      <h1>Book Hub</h1>
      <SearchBar onSearch={handleSearch} />
      <BookList books={searchResults.length > 0 ? searchResults : books} />
    </div>
  );
};

export default App;