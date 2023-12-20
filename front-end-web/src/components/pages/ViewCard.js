import React from 'react';
import './ViewCard.css'; // Make sure to define appropriate CSS styles

const ViewCard = ({ title, intro, img, url }) => {
    return (
        <div className="viewCard">
            <div className="viewCardImageContainer">
                <img src={img} alt={title} className="viewCardImage" />
            </div>
            <div className="viewCardContent">
                <h3 className="viewCardTitle">{title}</h3>
                <p className="viewCardIntro">{intro}</p>
                <a href={url} target="_blank" rel="noopener noreferrer" className="viewCardLink">Learn More</a>
            </div>
        </div>
    );
};
export default ViewCard;
