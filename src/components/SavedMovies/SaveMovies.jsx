import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesPlace from '../MoviesPlace/MoviesPlace';
import Menu from '../Menu/Menu';
const SaveMovies = ({ cardCount, handleDeleteFilm, savedMovies, isAuth }) => {
  return (
    <>
      <Header isAuth={isAuth} />
      <Menu activeLinkSavedMovies={'menu__active-link'} />
      <MoviesPlace isSaved={true} cardCount={cardCount} handleDeleteFilm={handleDeleteFilm} savedMovies={savedMovies} />
      <Footer />
    </>
  );
};
export default SaveMovies;
