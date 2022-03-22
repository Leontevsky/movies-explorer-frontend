import React, { useEffect, useState } from 'react';

const Card = ({ movie, filmDuration, isSaved, handleDeleteFilm, handleSaveFilm, savedMovies }) => {
  console.log(movie.country);
  const aproovedMovie = {
    country: movie.country || 'Нет данных',
    director: movie.director || 'Нет данных',
    duration: movie.duration || 0,
    year: movie.year || 'Нет данных',
    description: movie.description || ' ',
    image: isSaved ? movie.image : `https://api.nomoreparties.co${movie.image.url}`,
    trailer: isSaved ? movie.trailer : movie.trailerLink || 'https://youtube.com',
    thumbnail: isSaved ? movie.thumbnail : `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
    movieId: isSaved ? movie._id : movie.id,
    nameRU: movie.nameRU || 'Нет данных',
    nameEN: movie.nameEN || 'Нет данных',
  };
  const [isLiked, setIsLiked] = useState(false);
  const [deletingMovieId, setIsDeletingMovieId] = useState('0');

  const handleOpenTrailer = () => {
    window.open(`${aproovedMovie.trailer}`);
  };

  const handleLikeClick = async () => {
    if (isSaved) {
      handleDeleteFilm({ movieId: aproovedMovie.movieId });
    } else if (isLiked) {
      handleDeleteFilm({ movieId: deletingMovieId });
    } else {
      handleSaveFilm({ movie: aproovedMovie });
    }
  };

  useEffect(() => {
    if (savedMovies) {
      if (!isSaved) {
        const checkSave = savedMovies?.find((item) => +item.movieId === +movie.id);
        if (checkSave) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (savedMovies) {
      if (!isSaved) {
        const checkSave = savedMovies.find((item) => +item.movieId === +movie.id);
        if (checkSave) {
          setIsLiked(true);
          aproovedMovie.movieId = checkSave._id;
          setIsDeletingMovieId(checkSave._id);
        } else {
          setIsLiked(false);
        }
      }
    }
  }, [savedMovies]);

  return (
    <div className="card">
      <div className="card__container">
        <h2 className="card__title">{aproovedMovie.nameRU}</h2>
        {/* <span className="card__timeline">{aproovedMovie.filmDuration}</span> */}
        <figcaption className="card__timeline">{filmDuration}</figcaption>
      </div>
      <img className="card__img" alt="превью фильма" src={aproovedMovie.image} onClick={handleOpenTrailer} />
      <div className="card__title-heart-box">
        {!isSaved && (
          <button
            className={!isLiked ? `card__movies-button` : `card__movies-button card__movies-button-active`}
            onClick={handleLikeClick}
          >
            Сохранить
          </button>
        )}{' '}
        {isSaved && <button className={isSaved ? `card__movies-button-delete` : `disable`} onClick={handleLikeClick} />}
      </div>
    </div>
  );
};
export default Card;
