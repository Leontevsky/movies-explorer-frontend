import React from 'react';
import formValidator from '../../utils/react-hooks/Validator';
const Login = ({ handleLogin, loginNetworkError }) => {
  const { values, isValid, handleChange, errors } = formValidator({
    email: '',
    password: '',
  });
  const onFormSumbit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      handleLogin({ email: values.email, password: values.password });
    }
  };

  return (
    <section className="login">
      <div className="login__content">
        <a className="login__logo" href="/"></a>
        <h1 className="login__title">Рады видеть!</h1>
        <form name="login" className="login__form" noValidate onSubmit={onFormSumbit}>
          <ul className="login__form-input-bar">
            <li className="login__form-input-bar-point">
              <p className="login__hint">E-mail</p>
              <input
                name="email"
                type="email"
                value={values.email}
                className={errors.email ? 'login__input-error login__input' : ' login__input'}
                onChange={handleChange}
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                required
              ></input>
            </li>
            <li className="login__form-input-bar-point">
              <p className="login__hint">Пароль</p>
              <input
                value={values.password}
                className={errors.password ? 'login__input-error login__input' : ' login__input'}
                onChange={handleChange}
                name="password"
                type="password"
                minLength="8"
                maxLength="35"
                required
              ></input>
              <span className={!isValid ? 'login__error' : 'disable'}>
                {errors?.email}
                {loginNetworkError}
                <div className="login__error-margin"></div>
                {errors?.password}
              </span>
            </li>
          </ul>
          <button
            type="submit"
            className={!isValid ? 'login__btn login__btn-disabled' : 'login__btn'}
            disabled={!isValid}
          >
            Войти
          </button>
          <div className="login__text-box">
            <p className="login__text">Ещё не зарегистрированы?</p>
            <a className="login__link" href="/signup">
              Регистрация
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};
export default Login;
