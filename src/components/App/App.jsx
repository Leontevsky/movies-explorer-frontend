import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import {
  register,
  login,
  getUserInformation,
  editProfile,
  saveMovies,
  deleteSavedMovies,
  getMiniApiMovies,
} from '../../utils/api/MainApi';

import Main from '../Main/Main';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SaveMovies';

import ProtectedRoute from '../ProtectedRouter/ProtectedRouter';
import UnProtectedRoute from '../UnProtectedRoute/UnProtectedRoute';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Page404 from '../Page404/Page404';

const App = () => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false);
  const [cardCount, setCardCount] = useState(window.innerWidth > 800 ? 10 : 8);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [profileNetworkError, setProfileNetworkError] = useState('');
  const [registerNetworkError, setRegisterNetworkError] = useState('');
  const [loginNetworkError, setLoginNetworkError] = useState('');
  const filterUserSavedFilms = (savedFilms, userId) => savedFilms.filter((film) => film.owner === userId);

  const handleRegister = ({ name, email, password }) => {
    setRegisterNetworkError('');
    register(name, email, password)
      .then((response) => {
        setCurrentUser(response.user);
        handleLogin({ email, password });
      })
      .catch((err) => {
        if (err.status === 409) {
          setRegisterNetworkError('Пользователь с таким email уже существует.');
        } else {
          setRegisterNetworkError('При регистрации пользователя произошла ошибка.');
        }
      });
  };

  const handleEditProfile = ({ name, email }) => {
    setProfileNetworkError('');
    setIsSuccessSubmit(false);
    editProfile(name, email)
      .then((res) => {
        setCurrentUser(res);
        setIsSuccessSubmit(true);
      })
      .catch((err) => {
        if (err.status === 409) {
          setProfileNetworkError(`E-mail ${email} уже занят`);
        } else {
          setProfileNetworkError(
            'При обновление информации о пользователе произошла ошибка. Пожалуйста, попробуйте позже.'
          );
        }
      });
  };
  const handleSaveFilm = ({ movie }) => {
    saveMovies(movie)
      .then(() => {
        getMovies()
          .then((res) => {
            const serverFilms = res;
            const userSavedFilms = filterUserSavedFilms(serverFilms, currentUser._id);
            setSavedMovies(userSavedFilms);
            localStorage.setItem('films', JSON.stringify(userSavedFilms));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteFilm = ({ movieId }) => {
    deleteSavedMovies(movieId)
      .then(() => {
        getMovies()
          .then((res) => {
            const serverFilms = res;
            const userSavedFilms = filterUserSavedFilms(serverFilms, currentUser._id);
            setSavedMovies(userSavedFilms);
            localStorage.setItem('films', JSON.stringify(userSavedFilms));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  const handleLogin = ({ email, password }) => {
    setLoginNetworkError('');
    login(email, password)
      .then((loginRes) => {
        localStorage.setItem('token', loginRes.token);
        getUserInformation()
          .then((userInfo) => {
            if (userInfo.user.name) {
              setCurrentUser(userInfo.user);
              setIsAuth(true);
              const curUserID = userInfo.user._id;
              getMiniApiMovies()
                .then((res) => {
                  const serverFilms = res;
                  const userSavedFilms = filterUserSavedFilms(serverFilms, curUserID);
                  setSavedMovies(userSavedFilms);
                  localStorage.setItem('films', JSON.stringify(userSavedFilms));
                })
                .catch((err) => console.log(err));

              history.push('/movies');
            }
          })
          .catch((err) => {
            if (err.status === 401) {
              setLoginNetworkError('При авторизации произошла ошибка. Токен не передан или передан не в том формате.');
            } else if (err.status === 'Ошибка: 404') {
              setLoginNetworkError('При авторизации произошла ошибка. Переданный токен некорректен.');
            } else {
              setLoginNetworkError(
                'При авторизации пользователя произошла ошибка. Пожалуйста, попробуйте повторить авторизацию позже.'
              );
            }
          });
      })
      .catch((err) => {
        if (err.status === 401) {
          setLoginNetworkError('Вы ввели неправильный логин или пароль.');
        } else {
          setLoginNetworkError(
            'При авторизации пользователя произошла ошибка. Пожалуйста, попробуйте повторить авторизацию позже.'
          );
        }
      });
  };

  const handleExitAccount = () => {
    localStorage.clear();
    setIsAuth(false);
    setCurrentUser('');
  };

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserInformation()
        .then((userInfo) => {
          if (userInfo.user.name) {
            setCurrentUser(userInfo.user);
            setIsAuth(true);
            const savedFilms = JSON.parse(localStorage.getItem('films'));
            setSavedMovies(savedFilms);
          }
        })
        .catch((err) => {
          localStorage.clear();
          return console.log(err);
        });
    }
  };

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', () =>
      setTimeout(() => {
        handleResize();
      }, 1000)
    );
  }, []);

  useEffect(() => {
    setCardCount(window.innerWidth > 800 ? 10 : 8);
  }, [screenWidth]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <Main isAuth={isAuth} />
              </Route>
              <UnProtectedRoute
                exact
                path="/signin"
                component={Login}
                handleLogin={handleLogin}
                loginNetworkError={loginNetworkError}
              />
              <UnProtectedRoute
                exact
                path="/signup"
                component={Register}
                registerNetworkError={registerNetworkError}
                onRegisterSumbit={handleRegister}
              />
              <ProtectedRoute
                exact
                path="/movies"
                component={Movies}
                cardCount={cardCount}
                isAuth={isAuth}
                handleSaveFilm={handleSaveFilm}
                handleDeleteFilm={handleDeleteFilm}
                savedMovies={savedMovies}
              />
              <ProtectedRoute
                exact
                path="/saved-movies"
                component={SavedMovies}
                cardCount={cardCount}
                isAuth={isAuth}
                handleDeleteFilm={handleDeleteFilm}
                savedMovies={savedMovies}
              />
              <ProtectedRoute
                exact
                path="/profile"
                component={Profile}
                isAuth={isAuth}
                profileNetworkError={profileNetworkError}
                handleEditProfile={handleEditProfile}
                handleExitAccount={handleExitAccount}
                isSuccessSubmit={isSuccessSubmit}
              />

              <Route path="">
                <Page404 />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
