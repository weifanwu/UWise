import {Divider} from 'antd'
import { AiOutlineUser, AiOutlineClockCircle } from "react-icons/ai";
import {useState} from 'react'
import "./index.css"
import { WithContext as ReactTags } from 'react-tag-input';

function Comment(props) {

  return (
    <>
      <div className="user">
        <AiOutlineUser />
        <h3>{props.instructor}</h3>
      </div>
      <div className="clock">
        <AiOutlineClockCircle />
        <p>{props.quarter}</p>
      </div>
      <p>{props.comment}</p>
      <Divider/>
    </>
  );
}

export default Comment;
