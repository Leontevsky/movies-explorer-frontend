import React, { useEffect, useState } from 'react';
import loopImg from '../../images/loop.svg';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import getMovies from '../../utils/api/MoviesApi';
import useFormValidation from '../../utils/react-hooks/Validator';
import Preloader from '../Preloader/Preloader';

const MoviesPlace = ({ isSaved, cardCount, handleSaveFilm, handleDeleteFilm, savedMovies }) => {
  const { values, isValid, handleChange } = useFormValidation({
    search: '',
  });

  const [renderCounter, setRenderCounter] = useState(cardCount);
  const [isSearch, setIsSearch] = useState(false);
  const [dataLength, setDataLenght] = useState(0);
  const [moviesStorage, setMoviesStorage] = useState([]);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isShort, setIsShort] = useState(false);
  const [shortFilmsArray, setShortFilmsArray] = useState([]);
  const [filterFilmArray, setFilterFilmArray] = useState([]);
  const [isServerError, setIsServerError] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isBtnVisible, setIsBtnVisible] = useState(false);

  const onShortFilmsCheckbox = () => {
    setIsShort(!isShort);
    localStorage.setItem('searchCheckbox', !isShort);
  };

  const filterItems = (arr, query) =>
    arr.filter((movie) => movie.nameRU.toLowerCase().indexOf(query.toLowerCase()) !== -1);

  const onSubmitForm = (evt) => {
    evt.preventDefault();
    if (isValid) {
      setIsSearch(false);
      if (!isSaved) {
        setIsServerError(false);
        setIsInputDisabled(true);
        setIsPreloaderVisible(true);
        getMovies()
          .then((movies) => {
            setRenderCounter(cardCount);
            setIsPreloaderVisible(false);
            setIsInputDisabled(false);
            const filteredFilms = filterItems(movies, values.search);
            const shortFilms = filteredFilms.filter((movie) => movie.duration <= 40);
            localStorage.setItem('moviesLongFilms', JSON.stringify(filteredFilms));
            localStorage.setItem('moviesShortFilms', JSON.stringify(shortFilms));
            localStorage.setItem('searchTextFilms', values.search);

            setFilterFilmArray(filteredFilms);
            setShortFilmsArray(shortFilms);
            if (isShort) {
              if (shortFilms.length > 0) {
                setMoviesStorage(shortFilms);
                setIsNotFound(false);
                setIsSearch(true);
                if (shortFilms.length > cardCount) {
                  setIsBtnVisible(true);
                }
              } else {
                setIsNotFound(true);
                setIsSearch(false);
              }
            } else {
              setDataLenght(filteredFilms.length);
              setIsBtnVisible(filteredFilms.length > cardCount);
              setMoviesStorage(filteredFilms);
              if (filteredFilms.length === 0) {
                setIsNotFound(true);
                setIsSearch(false);
              } else {
                setIsNotFound(false);
                setIsSearch(true);
              }
            }
          })
          .catch(() => {
            setIsPreloaderVisible(false);
            setIsServerError(true);
            setIsInputDisabled(false);
          });
      } else {
        setIsInputDisabled(true);
        setIsPreloaderVisible(true);
        const filteredSavedFilms = filterItems(savedMovies, values.search);
        const shortSavedFilms = filteredSavedFilms.filter((movie) => movie.duration <= 40);
        setFilterFilmArray(filteredSavedFilms);
        setShortFilmsArray(shortSavedFilms);
        if (isShort) {
          if (shortSavedFilms.length > 0) {
            setMoviesStorage(shortSavedFilms);
            setIsSearch(true);
          } else {
            setIsNotFound(true);
            setIsSearch(false);
          }
        } else {
          setMoviesStorage(filteredSavedFilms);
          if (filteredSavedFilms.length === 0) {
            setIsNotFound(true);
            setIsSearch(false);
          } else {
            setIsNotFound(false);
            setIsSearch(true);
          }
        }
        setIsPreloaderVisible(false);
        setIsInputDisabled(false);
      }
    }
  };

  useEffect(() => {
    const searchMovies = JSON.parse(localStorage.getItem('moviesLongFilms'));
    const searchShortMovies = JSON.parse(localStorage.getItem('moviesShortFilms'));
    const savedSearchMovies = JSON.parse(localStorage.getItem('films'));

    if (isSaved) {
      if (savedSearchMovies?.length > 0) {
        const savedSearchShortMovies = savedSearchMovies.filter((movie) => movie.duration <= 40);
        setMoviesStorage(savedSearchMovies);
        setFilterFilmArray(savedSearchMovies);
        setShortFilmsArray(savedSearchShortMovies);
        setIsSearch(true);
      }
    } else if (searchMovies?.length > 0) {
      const searchMovies = JSON.parse(localStorage.getItem('moviesLongFilms'));
      const savedSearchTextMovies = localStorage.getItem('searchTextFilms');
      const savedSearchCheckbox = JSON.parse(localStorage.getItem('searchCheckbox'));
      values.search = savedSearchTextMovies;
      if (savedSearchCheckbox) {
        setIsShort(savedSearchCheckbox);
      }
      setMoviesStorage(searchMovies);
      setFilterFilmArray(searchMovies);
      setShortFilmsArray(searchShortMovies);
      setIsSearch(true);
      setRenderCounter(cardCount);
      setDataLenght(searchMovies.length);
      if (searchMovies.length > cardCount) {
        setIsBtnVisible(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isSaved) {
      setMoviesStorage(savedMovies);
      setFilterFilmArray(savedMovies);
      const shortUpdateFilms = savedMovies.filter((movie) => movie.duration <= 40);
      setShortFilmsArray(shortUpdateFilms);
      if (isShort) setMoviesStorage(shortUpdateFilms);
    }
  }, [savedMovies, isShort]);

  useEffect(() => {
    if (filterFilmArray.length > 0) {
      if (!isSaved) {
        if (!isShort && filterFilmArray.length > 0) {
          setIsNotFound(false);
          setIsSearch(true);
        }

        if (isShort && shortFilmsArray.length === 0) {
          setIsNotFound(true);
          setIsSearch(false);
        }

        if (isShort) {
          setMoviesStorage(shortFilmsArray);
          if (shortFilmsArray.length <= cardCount) {
            setIsBtnVisible(false);
          }
        } else {
          setMoviesStorage(filterFilmArray);
          if (filterFilmArray.length > renderCounter) {
            setIsBtnVisible(true);
          }
        }
      } else {
        if (!isShort && filterFilmArray.length > 0) {
          setIsNotFound(false);
          setIsSearch(true);
        }
        if (isShort && shortFilmsArray.length === 0) {
          setIsNotFound(true);
          setIsSearch(false);
        }
        if (isShort) {
          setMoviesStorage(shortFilmsArray);
        } else if (filterFilmArray.length > 0) {
          setMoviesStorage(filterFilmArray);
        } else {
          setMoviesStorage(savedMovies);
        }
      }
    }
  }, [isShort]);

  return (
    <section className="movies">
      <form className="movies__search-from" onSubmit={onSubmitForm}>
        <div className="movies__search-bar">
          <img className="movies__search-loop-img" alt="лупа" src={`${loopImg}`} />
          <div className="movies__search-input-bar">
            <input
              className="movies__search-input"
              placeholder="Фильм"
              required
              name="search"
              onChange={handleChange}
              value={values.search}
              disabled={isInputDisabled}
              type="search"
            ></input>
          </div>
          <div className="movies__serch-btn-box">
            <button className="movies__search-btn" type="submit">
              Найти
            </button>
          </div>
        </div>
        <label htmlFor="short-films" className="movies__search-btn-label">
          <input
            id="short-films"
            type="checkbox"
            className="movies__search-btn-invisible"
            name="short-films"
            checked={isShort}
            onChange={onShortFilmsCheckbox}
          />
          <span className="movies__search-btn-visible" />
          <span className="movies__search-title">Короткометражки</span>
        </label>
      </form>
      {isSearch && moviesStorage.length > 0 && (
        <MoviesCardList
          isSaved={isSaved}
          movies={moviesStorage}
          dataLength={dataLength}
          renderCounter={renderCounter}
          setRenderCounter={setRenderCounter}
          cardCount={cardCount}
          isBtnVisible={isBtnVisible}
          setIsBtnVisible={setIsBtnVisible}
          handleDeleteFilm={handleDeleteFilm}
          handleSaveFilm={handleSaveFilm}
          savedMovies={savedMovies}
        />
      )}

      {isPreloaderVisible && <Preloader />}
      {!isSearch && moviesStorage.length === 0 && !isNotFound && (
        <p className="movies__search-error-text">Воспользуйтесь поиском фильмов</p>
      )}
      {isNotFound && <p className="movies__search-error-text">Ничего не найдено</p>}
      {isServerError && (
        <p className="movies__search-error-text">
          Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и
          попробуйте ещё раз.
        </p>
      )}
    </section>
  );
};
export default MoviesPlace;
