import React from 'react';
import './ViewCard.css';
const ViewCard = ({ title, intro, img, urls }) => {
    const p = intro.split("\n");
    const renderedPTags = p.map((line, index) => (
        <p key={index}>{line}</p>
      ));

    
    console.log(urls)

    return (
        <div className="viewCard">
                <div className='viewCardImageContainer'>
                    <img src={img} alt={title} className="viewCardImage" />
                </div>
                <div className="viewCardContent">
                    <h3 className="viewCardTitle">{title}</h3>
                    <div className="viewCardIntro">{renderedPTags}</div>
                    <div>
                    {Object.entries(urls).map(([text, url]) => (
                       <div key={url}> 
                            <a href={url} target="_blank" rel="noopener noreferrer" className="viewCardLink">{text}</a>
                        </div>
                    ))}
                    </div>
                </div>            
            

        </div>
    );
};
export default ViewCard;
