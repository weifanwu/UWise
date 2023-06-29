import React from 'react';
import '../../App.css';
import Cards from '../Cards';

export default function Services(props) {
  return <>
            <Cards update={props.update}/>
         </>
}
