import React from "react";

export default function card(props) {
    return <>
            <div className={props.className} onClick={()=> {
                props.setPageContent(props.item.intro);
                props.showPage(false);
            }}>
                <h1>{props.item.name}</h1>
                <p>{props.item.intro}</p>
            </div>
        </>
}