import Moderation from "./Moderation.js";
import { useState, useEffect } from "react";
import "./App.css"

function App() {
  const [content, setContent] = useState(
    new Array(),
  );
  const [change, setChange] = useState(false);

  const contentFinal = () => {
    console.log(content.length);
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
          <Moderation id={x["_id"].$oid} instructor={x.instructor} quarter={x.quarter} course={x.course} comment={x.comment} setChange={() => {setChange(!change)}}/>
        );
      });
      setContent(renderContent);
    }
  }

  useEffect(() => {
      (async function callFetchHandler() {
        try {

          let response = await fetch("https://uwise-back-end.herokuapp.com/content-moderation");
          let reviews = await response.json();
          handleRenderContent(reviews);
        } catch (err) {
          console.log('QA列表获取失败', err);
        }
      })();
  }, [change]);

  return (
    <>
        <h1>UWise Content Moderation</h1>
        <p><span>This Website is for UWise internal member use only</span></p>
        <p>The Course Reviews made by students will be seen here.</p>
        <p>Any Reviews that are Offensive, Illegal, Misinformation should be deleted immediately</p>
        <div className="App">
            {contentFinal()}
        </div>
    </>
  );
}

export default App;
