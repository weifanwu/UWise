import React from 'react';
import { useNavigate } from "react-router-dom";


function CardItem(props) {
  const history = useNavigate();
  const handleRedirect = () => {
    history(props.path);
  };
  return (
    <>
      <div className='cards__item' onClick={() => {
        props.update(props.courseName);
        handleRedirect();
        }}>
        <div className='cards__item__link' to={props.path}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
          <img
            className='cards__item__img'
            alt='Travel Image'
            src={props.src}
          />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.text}</h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardItem;
