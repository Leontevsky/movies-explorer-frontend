import React from 'react';
import studentImg from '../../images/student.png';
const Student = () => {
  return (
    <section className="student" id="student">
      <h2 className="student__title">Студент</h2>
      <div className="student__content">
        <div className="student__info">
          <div className="student__text-box">
            <h3 className="student__subtitle">Виталий</h3>
            <h4 className="student__semi-title">Фронтенд-разработчик, 30 лет</h4>
            <p className="student__text">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать
              музыку, а ещё увлекаюсь бегом. Недавно начал коди ть. С 2015 года работал в компании «СКБ Контур». После
              того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <ul className="student__link-bar">
              <li className="student__link-bar-point">
                <a className="student__link" href="https://www.facebook.com/" rel="noopener noreferrer" target="_blank">
                  <p className="student__link-text">Facebook</p>
                </a>
              </li>
              <li className="student__link-bar-point">
                <a
                  className="student__link"
                  href="https://github.com/Leontevsky"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <p className="student__link-text"> Github</p>
                </a>
              </li>
            </ul>
          </div>
          <img className="student__img" alt="Портрет студента" src={`${studentImg}`} />
        </div>
      </div>
    </section>
  );
};
export default Student;
