import React from 'react';
import "./introduction.css";
import { Button } from './Button';

function Introduction(props) {
  return (
    <>
        <div className="picture">
            <img src={props.image} alt={props.alt} />
        </div>
        <div className="text">
            <h2><span id="highlight">{props.header}</span> - {props.description}</h2>
            <p className="content">{props.text}</p>
            <Button className='btns' buttonStyle='btn--inline' buttonSize='btn--large' src={props.src}>{props.button}</Button>
        </div>
    </>
  );
}

export default Introduction;