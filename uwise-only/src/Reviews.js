import React, { useEffect } from "react";
import { Button, Card, Form, Input, message } from 'antd';

const Moderation = (props) => {
  async function handleDelete() {
    try {
      const id = props.id;
      const response = await fetch(host + "/content-moderation/deleteReview", {
        method: "POST",
        body: id,
      });
      props.setChange();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleProve() {
    try {
      const id = props.id;
      const response = await fetch(host + "/content-moderation/proveReview", {
        method: "POST",
        body: id,
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
};

const Review = () => {
  const host = process.env.REACT_APP_BACKEND_INTERNAL_HOST;
  const [content, setContent] = useState(new Array(),);
  const [change, setChange] = useState(false);

  const contentFinal = () => {
    if (content.length === 0) {
        return <h2>No New Reviews!</h2>;
    } else {
        return content;
    }
  }

  function handleRenderContent(reviews) {
    if (reviews) {
      let renderContent = reviews.map((x) => {
        return (
          <Moderation id={x["_id"].$oid} instructor={x.instructor} quarter={x.quarter} course={x.course} name={x.name} comment={x.comment} setChange={() => {setChange(!change)}}/>
        );
      });
      setContent(renderContent);
    }
  }

  useEffect(() => {
    (async function callFetchHandler() {
      try {
        let reviews = await fetch(host + "/content-moderation/getReview");
        handleRenderContent(reviews);
      } catch (err) {
        console.log('QA列表获取失败', err);
      }
    })();
}, [change]);

  return(
  <Card title="Moderation" style={{width: "500px"}}>
    <h1>UWise Content Moderation</h1>
    <p><span>This Website is for UWise internal member use only</span></p>
    <p>The Course Reviews made by students will be seen here.</p>
    <p>Any Reviews that are Offensive, Illegal, Misinformation should be deleted immediately</p>
    <div>
    {contentFinal()}
    </div>
  </Card>);
};
