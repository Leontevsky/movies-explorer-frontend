import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import savedCards from '../../constants/saved-cards';

import MoviesPlace from '../MoviesPlace/MoviesPlace';
import Menu from '../Menu/Menu';
const SaveMovies = () => {
  return (
    <>
      <Header homePageBtnCondition={'disable'} />
      <Menu activeLinkSavedMovies={'menu__active-link'} />
      <MoviesPlace
        savedMoviesMargin={'movies-saved-movies-margin'}
        cards={savedCards}
        btnCondishion={'disable'}
      />
      <Footer />
    </>
  );
};
export default SaveMovies;
