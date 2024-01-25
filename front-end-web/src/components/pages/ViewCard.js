import React from 'react';
import './ViewCard.css'; // Make sure to define appropriate CSS styles
import {Space} from 'antd';
const ViewCard = ({ title, intro, img, url }) => {
    const p = intro.split("\n");
    const renderedPTags = p.map((line, index) => (
        <p key={index}>{line}</p>
      ));

    return (
        <div className="viewCard">

            
                <div className='viewCardImageContainer'>
                    <img src={img} alt={title} className="viewCardImage" />
                </div>
                <div className="viewCardContent">
                    <h3 className="viewCardTitle">{title}</h3>
                    <div className="viewCardIntro">{renderedPTags}</div>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="viewCardLink">Learn More</a>
                </div>            
            

        </div>
    );
};
export default ViewCard;
