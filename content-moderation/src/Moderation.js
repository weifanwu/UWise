import React from "react";

function Moderation(props) {

    async function handleDelete() {
      try {
        const id = props.id;
        const response = await fetch("http://localhost:4567/deleteComment?id=" + id, {
          method: "POST",
        });
        props.setChange();
      } catch (error) {
        console.error(error);
      }
    }

    async function handleProve() {
      try {
        const id = props.id;
        const response = await fetch("http://localhost:4567/proveComment?id=" + id, {
          method: "POST",
        });
        props.setChange();
      } catch (error) {
        console.error(error);
      }
    }

    return (
        <>
            <div>
                <h2>{props.course}</h2>
                <h3>{props.instructor} {props.quarter}</h3>
                <p>{props.comment}</p>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleProve}>Approve</button>
            </div>
        </>
    );
}

export default Moderation;