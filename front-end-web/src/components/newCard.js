import React from "react";

export default function card(props) {
    return <>
            <div className={props.position}>
                <img src={props.picture}/>
                <div>
                    <h3>{props.name}</h3>
                    <p>{props.intro}</p>
                </div>
            </div>
        </>
}