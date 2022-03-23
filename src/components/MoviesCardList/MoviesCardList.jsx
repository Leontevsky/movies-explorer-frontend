import React from 'react'
import Card from '../Card/Card'
const MoviesCardList = ({
  isSaved,
  movies,
  handleDeleteFilm,
  handleSaveFilm,
  cardCount,
  renderCounter,
  setRenderCounter,
  isBtnVisible,
  setIsBtnVisible,
  savedMovies,
  dataLength,
}) => {
  const filmDuration = (movie) => `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`
  const renderArray = isSaved ? movies : movies.slice(0, renderCounter)
  const handleAddingBtn = () => {
    if (dataLength - renderCounter <= cardCount) {
      setRenderCounter(renderCounter + (dataLength - renderCounter))
      setIsBtnVisible(false)
    } else {
      setIsBtnVisible(true)
      setRenderCounter(renderCounter + cardCount)
    }
  }

  return (
    <section className="movies__card-list">
      {!isSaved ? (
        <ul className="movies__card">
          {renderArray &&
            renderArray.map((movie) => (
              <li key={movie.id}>
                <Card
                  movie={movie}
                  filmDuration={filmDuration(movie)}
                  isSaved={isSaved}
                  handleDeleteFilm={handleDeleteFilm}
                  handleSaveFilm={handleSaveFilm}
                  savedMovies={savedMovies}
                />
              </li>
            ))}
        </ul>
      ) : (
        <ul className="movies__card">
          {renderArray &&
            renderArray.map((movie) => (
              <li key={movie._id}>
                <Card
                  movie={movie}
                  handleDeleteFilm={handleDeleteFilm}
                  isSaved={isSaved}
                  filmDuration={filmDuration(movie)}
                />
              </li>
            ))}
        </ul>
      )}

      {!isSaved && isBtnVisible && (
        <button onClick={handleAddingBtn} type="button" className="movies__button">
          Ещё
        </button>
      )}
    </section>
  )
}
export default MoviesCardList
