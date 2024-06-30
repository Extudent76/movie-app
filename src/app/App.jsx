import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../widgets/Header/Header';
import HomePage from '../pages/HomePage';
import MoviePage from '../pages/MoviePage';
import styles from './App.module.css';

function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MoviePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
