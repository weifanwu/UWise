import React, { useEffect, useState } from 'react';
import './Wb.css';

export function WelcomeBoard2(props) {
    let div = null
    if (props.priority2.length > 0) {
        div = props.priority2.map((item) => {
            return (
                <div className='eachNews' key={item.id}>
                    <img src={item.Img} alt="boardimg" />
                    <h2>{item.Title}</h2>
                    <a href={item.URL}>
                        <div className='hover'>
                            <p>{item.Intro}</p>
                        </div>
                    </a>
                </div>
            )
        })
    }

    return (
        <div className='news'>
            {div}
        </div >
    );
}