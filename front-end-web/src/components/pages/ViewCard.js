import React from "react";

function ViewCard(props) {

    return <>
        <a href={props.link} target="_blank">
            <div className="container" onMouseEnter={() => {
                props.hover();
            }} onClick={() => {
                props.click();
            }}>
                <img className={"pic-" + props.class} src={props.image} />
                <div className="introduction-">
                    <h3>{props.title}</h3>
                    <p>{props.content}</p>
                </div>
            </div>
        </a>
    </>;
}

export default ViewCard;