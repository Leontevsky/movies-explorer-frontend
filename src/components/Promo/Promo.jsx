import React from 'react';

const promo = () => {
  return (
    <section className='promo'>
      <h1 className='promo__title'>
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <div className='promo-link-bar'>
        <a className='promo-link' href='#project'>
          О проекте
        </a>
        <a className='promo-link' href='#technology'>
          Технологии
        </a>
        <a className='promo-link' href='#student'>
          Студент
        </a>
      </div>
    </section>
  );
};
export default promo;
