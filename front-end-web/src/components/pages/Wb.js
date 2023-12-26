import React, { useEffect, useState } from 'react';
import './Wb.css';

export function WelcomeBoard(props) {
    const [slideWidth, setwidth] = useState(1000)
    const [click, setclick] = useState(false)
    const [clickT, setclickT] = useState(false)

    const switchleft = () => {
        if (!clickT) {
            setclickT(true)
            const slides = document.querySelector(".slides");
            const totalSlides = slides.children.length;
            let currentLeft = slides.offsetLeft;

            let newPosition = currentLeft + slideWidth;
            if (newPosition > 0) {
                newPosition = -(slideWidth * (totalSlides - 1));
            }

            slides.style.transition = "0.3s";
            slides.style.left = `${newPosition}px`;
            slides.ontransitionend = () => {
                setclickT(false)
            };
        }
    };

    const switchright = () => {
        if (!clickT) {
            setclickT(true)
            const slides = document.querySelector(".slides");
            const totalSlides = slides.children.length;
            let currentLeft = slides.offsetLeft;

            let newPosition = currentLeft - slideWidth;
            if (newPosition <= -(slideWidth * totalSlides)) {
                newPosition = 0;
            }

            slides.style.transition = "0.3s";
            slides.style.left = `${newPosition}px`;
            slides.ontransitionend = () => {
                setclickT(false)
            };
        }
    };

    useEffect(() => {
        const slide = document.querySelector(".slide")
        if (slide) {
            setwidth(slide.offsetWidth)
            const intervalId = setInterval(switchright, 5000);
            if (click) {
                clearInterval(intervalId);
                setclick(false)
            }
            return () => clearInterval(intervalId);
        }
    })

    let div = null
    if (props.priority1.length > 0) {
        div = props.priority1.map((item) => {
            return (
                <div className='slide' key={item.id}>
                    <img src={item.Img} alt="boardimg" />
                    <a href={item.URL}>
                        <h2>{item.Title}</h2>
                        <p>{item.Intro}</p>
                    </a>
                </div>
            )
        })
    }

    let div2 = null
    if (props.priority2.length > 0) {
        div2 = props.priority2.map((item) => {
            return (
                <div className='eachNews' key={item.id}>
                    <img src={item.Img} alt="boardimg" />
                    <h2>{item.Title}</h2>
                    <a href={item.URL} target="_blank">
                        <div className='hover'>
                            <p>{item.Intro}</p>
                        </div>
                    </a>
                </div>
            )
        })
    }

    return (
        <div className='dr_container'>
            <div className='welcomeBoard'>
                <div className='slides'>
                    {div}
                </div>
                <div className="prev" onClick={switchleft}>❮</div>
                <div className="next" onClick={switchright}>❯</div>
            </div >
            {div2}
        </div>
    );
}