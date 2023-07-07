import React from "react";

function ViewCard(props) {

    const handleClick = () => {
        console.log("This is the link: " + props.link);
        if (props.link !== "") {
            window.open(props.link, '_blank');
        } else {
            props.click();
        }
    };
    
    return <>
            <div className={"container-" + props.class} onClick={() => {
                console.log("This is the link: " + props.link);
                handleClick();
            }} onMouseEnter={() => {
                props.hover();
              }}>
                <img className={"pic-" + props.class} src={props.image} />
                <div className="introduce">
                    <h3>{props.title}</h3>
                    <p>{props.content}</p>
                </div>
            </div>    
    </>;
}

export default ViewCard;