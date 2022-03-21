import React, { useContext, useEffect, useRef, useState } from 'react';
import useFormValidation from '../../utils/react-hooks/Validator';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
const Profile = ({ profileNetworkError, handleEditProfile, handleExitAccount, isSuccessSubmit, isAuth }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const nameRef = useRef('');
  const emailRef = useRef('');

  const { errors, handleChange, isValid } = useFormValidation({
    name: nameRef.current.value,
    email: emailRef.current.value,
  });

  const onFormSumbit = (evt) => {
    setIsInputDisabled(true);
    evt.preventDefault();
    if (isValid) {
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      handleEditProfile({ name, email });
      evt.target.reset();
      setIsInputDisabled(false);
    }
    setIsInputDisabled(false);
  };
  useEffect(() => {
    if (nameRef.current.value === currentUser.name && emailRef.current.value === currentUser.email) {
      setIsUpdate(false);
    } else {
      setIsUpdate(true);
    }
  }, [nameRef.current.value, emailRef.current.value, currentUser.name, currentUser.email]);

  return (
    <>
      <Header isAuth={isAuth} />
      <section className="profile">
        <h1 className="profile__title">Привет, {`${currentUser.name}`}</h1>
        <form className="profile__form" onSubmit={onFormSumbit}>
          <ul className="profile__input-bar">
            <li className="profile__input-bar-point">
              <p className="profile__hint">Имя</p>
              <input
                className="profile__input"
                placeholder="Ваше имя"
                name="profileName"
                onChange={handleChange}
                ref={nameRef}
                type="text"
                values={nameRef.current.value}
                disabled={isInputDisabled}
                defaultValue={currentUser.name}
                minLength="2"
                maxLength="30"
              ></input>
            </li>
            <li className="profile__input-bar-point">
              <p className="profile__hint">E-mail</p>
              <input
                className="profile__input"
                name="profileEmail"
                onChange={handleChange}
                disabled={isInputDisabled}
                ref={emailRef}
                type="email"
                defaultValue={currentUser.email}
                values={emailRef.current.value}
                placeholder="email"
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              ></input>
            </li>
          </ul>
          <div className="profile__btn-box">
            {errors.profileName && <span className="profile__error-field">{errors.profileName}</span>}
            {errors.profileEmail && <span className="profile__error-field">{errors.profileEmail}</span>}
            {isSuccessSubmit && <span className="profile__success-field">Ваши данные успешно изменены</span>}
            {profileNetworkError && <span className="profile__error-field">{profileNetworkError}</span>}
            <button type="submit" disabled={!isValid || !isUpdate} className="profile__button">
              Редактировать
            </button>
            <button type="button" className="profile__button profile__button_type_exit" onClick={handleExitAccount}>
              <p className="profile__button_type_exit-text">Выйти из аккаунта</p>
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
export default Profile;
