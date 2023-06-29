import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards(props) {
  return (
    <div className='cards'>
      <h1>公开课：</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              className="classes"
              src='images/img-9.jpg'
              text='CSE154: Web Development'
              label='200 USD'
              courseName="CSE154"
              path='/class'
              update={props.update}
            />
            <CardItem
              className="classes"
              src='images/img-2.jpg'
              text='CSE121: Introduction to computer science'
              label='100 USD'
              path='/class'
              courseName="CSE121"
              update={props.update}
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              className="classes"
              src='images/img-3.jpg'
              text='Math208: Matrix'
              label='300 USD'
              path='/class'
              courseName="Math208"
              update={props.update}
            />
            <CardItem
              className="classes"
              src='images/img-4.jpg'
              text='CSE373: Algorithm And Data Structure'
              label='1000 USD'
              path='/class'
              courseName="CSE373"
              update={props.update}
            />
            <CardItem
              className="classes"
              src='images/img-8.jpg'
              text='Math124: Calculus'
              label='434 USD'
              path='/class'
              courseName="Math124"
              update={props.update}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
