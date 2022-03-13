import React from 'react';

const Card = ({ card }) => {
  return (
    
    <div className={`card ${card.markerClass}`}>
      <div className='card__container'>
        <h2 className='card__title'>{card.title}</h2>
        <span className='card__timeline'>{card.time}</span>
      </div>
      
      <img className='card__img' alt='фильм' src={card.link} />
      <div className='card__title-heart-box'>
        <button className={`card__movies-button ${card.btn}`}>Сохранить</button>
      </div>
      
    </div>
  );
};
export default Card;

