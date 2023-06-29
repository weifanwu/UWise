import React from "react";

export default function page(props) {
    return(
        <>

            <h1>
                {props.page}
            </h1>
            <button onClick={() => {
                props.showPage(true);
            }}>
                back
            </button>
        </>
    );
}