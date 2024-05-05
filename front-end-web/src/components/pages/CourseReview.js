import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../App.css";
import "./CourseReview.css";
import ReviewForm from "../ReviewForm.js";
import ReviewItem from "../ReviewItem.js";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
  Card,
  message,
  Rate,
  Flex,
} from "antd";

function CourseReview() {
  let { courseName } = useParams();
  const navigate = useNavigate();
  const { Option } = Select;
  const { TextArea } = Input;

  const frontendHost = process.env.REACT_APP_FRONTEND_HOST;
  const backendHost = process.env.REACT_APP_BACKEND_HOST;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [reviews, setReviews] = useState([]);
  const [inputRatings, setInputRatings] = useState([]);
  const [inputComment, setInputComment] = useState("");

  useEffect(() => {
    // formatCourseName(courseName);
    getDescription();
    getReviews();
  }, []);

  const onReviewSubmitted = () => {
    getReviews(); // Refetch the reviews after a new one is added
  };

  // const formatCourseName = (courseName) => {
  //   // Replace underscore in the course name with space
  //   setName(courseName.replace(/_/g, " "));
  // };

  const getDescription = () => {
    fetch(
      backendHost +
        "/courseReview/getCourseDescription?courseName=" +
        courseName
    )
      .then((response) => {
        return response.json();
      })
      .then((resObject) => {
        setDescription(resObject);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getReviews = () => {
    fetch(
      backendHost + "/courseReview/getReviewsForCourse?courseName=" + courseName
    )
      .then((response) => {
        return response.json();
      })
      .then((resObject) => {
        // console.log("resObject: " + resObject);
        setReviews(resObject);
      })
      .catch((err) => {
        // console.log("err");
        console.log(err);
      });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    message.success("已复制到剪贴板");
  };

  const handleBack = () => {
    navigate("/reviews");
  };

  return (
    <>
      {/* <h1>Hello World</h1>
      <h2>{courseName}</h2>

      <h2>{description}</h2> */}

      {/* Iterate through the reviews and show the stringified json */}
      {/* {reviews.map((review) => (
        <p>{JSON.stringify(review)}</p>
      ))} */}

      <div className="App">
        <header className="main-header">
          <button onClick={handleBack} className="left-button">
            返回主页
          </button>
          <h1>{courseName}</h1>
          <button onClick={handleShare} className="right-button">
            分享
          </button>
        </header>
        <section className="course-description">
          <h2>介绍</h2>
          <p>{description}</p>
        </section>
        <section className="course-review">
          <h2>同学评价</h2>
          {/* <p>{JSON.stringify(reviews)}</p> */}
          {/* Iterate through each reviews and show them in the cards */}
          {reviews.map((review) => (
            // <Card key={review._id} className="review-card">
            //   <div className="review-header">
            //     <div className="review-course-name">{review.courseName}</div>
            //     <div className="review-instructor">{review.instructor}</div>
            //   </div>
            //   <div className="review-content">
            //     <div className="review-quarter">{review.quarter}</div>
            //     <div className="review-year">{review.year}</div>
            //     <div className="review-ratings">
            //       <div>难度: {review.ratings[0]}</div>
            //       <div>推荐度: {review.ratings[1]}</div>
            //       <div>受欢迎度: {review.ratings[2]}</div>
            //     </div>
            //     <div className="review-comment">{review.comment}</div>
            //   </div>
            // </Card>
            <ReviewItem review={review} />
          ))}
        </section>
        <section className="course-review">
          <h2>添加评价</h2>
          <ReviewForm
            courseName={courseName}
            onReviewSubmitted={onReviewSubmitted}
          />
        </section>
      </div>
    </>
  );
}

export default CourseReview;
