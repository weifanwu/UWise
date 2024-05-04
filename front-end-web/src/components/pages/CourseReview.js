import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../App.css";
import "./CourseReview.css";

function CourseReview() {
  let { courseName } = useParams();

  const host = process.env.REACT_APP_BACKEND_HOST;

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

  // const formatCourseName = (courseName) => {
  //   // Replace underscore in the course name with space
  //   setName(courseName.replace(/_/g, " "));
  // };

  const getDescription = () => {
    fetch(host + "/courseReview/getCourseDescription?courseName=" + courseName)
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
    fetch(host + "/courseReview/getReviewsForCourse?courseName=" + courseName)
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

  return (
    <>
      <h1>Hello World</h1>
      <h2>{courseName}</h2>

      <h2>{description}</h2>

      {/* Iterate through the reviews and show the stringified json */}
      {reviews.map((review) => (
        <p>{JSON.stringify(review)}</p>
      ))}
    </>
  );
}

export default CourseReview;
