import React, { useEffect, useState } from 'react'

const Card = ({ movie, filmDuration, isSaved, handleDeleteFilm, handleSaveFilm, savedMovies }) => {
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
  }
  const [isLiked, setIsLiked] = useState(false)
  const [deletingMovieId, setIsDeletingMovieId] = useState('0')

  const handleOpenTrailer = () => {
    window.open(`${aproovedMovie.trailer}`)
  }

  const handleLikeClick = async () => {
    if (isSaved) {
      handleDeleteFilm({ movieId: aproovedMovie.movieId })
    } else if (isLiked) {
      handleDeleteFilm({ movieId: deletingMovieId })
    } else {
      handleSaveFilm({ movie: aproovedMovie })
    }
  }

  useEffect(() => {
    if (savedMovies) {
      if (!isSaved) {
        const checkSave = savedMovies?.find((item) => +item.movieId === +movie.id)
        if (checkSave) {
          setIsLiked(true)
        } else {
          setIsLiked(false)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (savedMovies) {
      if (!isSaved) {
        const checkSave = savedMovies.find((item) => +item.movieId === +movie.id)
        if (checkSave) {
          setIsLiked(true)
          aproovedMovie.movieId = checkSave._id
          setIsDeletingMovieId(checkSave._id)
        } else {
          setIsLiked(false)
        }
      }
    }
  }, [savedMovies])

  return (
    <div className="card">
      <img className="card__img" alt="превью фильма" src={aproovedMovie.image} onClick={handleOpenTrailer} />
      <div className="card__title-heart-box">
        <h2 className="card__title">{aproovedMovie.nameRU}</h2>
        {!isSaved && (
          <button
            className={!isLiked ? `card__heart-btn` : `card__heart-btn card__heart-btn-active`}
            onClick={handleLikeClick}
          ></button>
        )}
        {isSaved && <button className={isSaved ? `card__haert-btn-delete` : `disable`} onClick={handleLikeClick} />}
      </div>
      <figcaption className="card__timeline">{filmDuration}</figcaption>
    </div>
  )
}
export default Card
