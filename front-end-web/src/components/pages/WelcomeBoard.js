import React, { useEffect, useState } from 'react';
import './WelcomeBoard.css';

export function WelcomeBoard(props) {
    const [slideWidth, setwidth] = useState(1000)
    const [click, setclick] = useState(false)
    const [clickT, setclickT] = useState(false)
    const [selectedTab, setSelectedTab] = useState('全部');

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
                    <a href={item.URL} target="_blank">
                        <h2>{item.Title}</h2>
                        <p>{item.Intro}</p>
                    </a>
                </div>
            )
        })
    }

    let filteredPriority2Events = props.priority2.filter(item => 
        item.type === selectedTab || 
        (selectedTab === '全部' && ( !item.type || item.type === "" || item.type === null))

    );


    let div2 = null;
if (props.priority2.length > 0) {
    div2 =  filteredPriority2Events.map((item) => {
        const introContent = item.Intro.split("\n");

        return (
            <div className='eachNews' key={item.id}>
                    <a href={item.URL} target="_blank" rel="noopener noreferrer">
                        <img src={item.Img} alt="boardimg" />
                    </a>
                
                <div className='event-p2-content'>
                    <h3>{item.Title}</h3>
                    {introContent.map((intro, index) => (
                        <p key={index} className='intro'>{intro}</p>
                    ))}
                    <a href={item.URL} target="_blank" rel="noopener noreferrer" className="learn-more">Learn More</a>
                </div>
            </div>
        );
    });          
}

return (
    <div>
        <div className="event_p1-container">
            <div className='event_p1_slider'>
                <div className='slides'>
                    {div}
                </div>
                <div className="prev" onClick={switchleft}>❮</div>
                <div className="next" onClick={switchright}>❯</div>
            </div>
        </div>

        {/* Tab selection */} 
        <div className="tabs-container">
            <p className={selectedTab === '全部' ? 'active' : ''} onClick={() => setSelectedTab('全部')}>全部</p>
            <p className={selectedTab === '校园活动' ? 'active' : ''} onClick={() => setSelectedTab('校园活动')}>校园活动</p>
            <p className={selectedTab === '校园新闻' ? 'active' : ''} onClick={() => setSelectedTab('校园新闻')}>校园新闻</p>
            <p className={selectedTab === '社团活动' ? 'active' : ''} onClick={() => setSelectedTab('社团活动')}>社团活动</p>
        </div>


        <div className='event_p2_container'>
            {div2}
        </div>
    </div>
    );
}