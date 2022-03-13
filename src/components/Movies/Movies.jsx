import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesPlace from '../MoviesPlace/MoviesPlace';
import cards from '../../constants/cards';
import Menu from '../Menu/Menu';
const Movies = () => {
  return (
    <>
      <Header homePageBtnCondition={'disable'} />
      <Menu activeLinkMovies={'menu__active-link'} />
      <MoviesPlace cards={cards} />
      <Footer />
    </>
  );
};
export default Movies;
