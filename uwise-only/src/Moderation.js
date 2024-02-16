import React from "react";

function Moderation(props) {

    async function handleDelete() {
      try {
        const id = props.id;
        const response = await fetch("https://uwise-back-end.herokuapp.com/deleteComment?id=" + id, {
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
        const response = await fetch("https://uwise-back-end.herokuapp.com/proveComment?id=" + id, {
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
                <h2>课程：{props.course}</h2>
                <h3>教师：{props.instructor} {props.quarter}</h3>
                <p>评论：{props.comment}</p>
                <p>填写人：{props.name}</p>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleProve}>Approve</button>
            </div>
        </>
    );
}

export default Moderation;