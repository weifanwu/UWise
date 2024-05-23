import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../App.css";
import "./CourseReview.css";
import ReviewForm from "../ReviewForm.js";
import ReviewItem from "../ReviewItem.js";
import RatingsDisplay from "../RatingsDisplay.js";
import { Button, message, Rate } from "antd";
import { LeftOutlined } from "@ant-design/icons";

function CourseReview() {
  let { courseName } = useParams();
  const navigate = useNavigate();

  const backendHost = process.env.REACT_APP_BACKEND_HOST;

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [reviews, setReviews] = useState([]);
  const [avgRatings, setAvgRatings] = useState(null);

  const [showForm, toggleForm] = useState(false);

  useEffect(() => {
    // formatCourseName(courseName);
    getDescription();
    getTitle();
    getReviews();
    getAverageRating();
  }, []);

  useEffect(() => {
    console.log("avgRatings: ", avgRatings);
  }, [avgRatings]);

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

  const getTitle = () => {
    fetch(backendHost + "/courseReview/getCourseTitle?courseName=" + courseName)
      .then((response) => {
        return response.json();
      })
      .then((resObject) => {
        setTitle(resObject);
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

  const getAverageRating = () => {
    fetch(
      backendHost + "/courseReview/getAverageRatings?courseName=" + courseName
    )
      .then((response) => {
        return response.json();
      })
      .then((resObject) => {
        console.log("resObject: " + resObject);
        setAvgRatings(resObject);
        console.log("avgRatings: " + avgRatings);
      })
      .catch((err) => {
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

  const displayForm = () => {
    toggleForm(!showForm);
  };

  return (
    <>
      <header className="main-header">
        <Button onClick={handleBack} className="left-button" type="link">
          {/* <LeftOutlined style={{ color: "#FFFFFF" }} /> */}
          返回主页
        </Button>
        <h1>{courseName}</h1>
        <h2>{title}</h2>
        <Button onClick={handleShare} className="right-button" type="link">
          分享
        </Button>
      </header>

      <br />
      <br />
      <div className="course-reviews">
        <section className="course-description">
          <p className="heading3">课程介绍</p>
          <p className="description">{description}</p>
          <br />
          <div className="ratings-and-button">
            {avgRatings !== null ? (
              <div className="ratings">
                <RatingsDisplay ratings={avgRatings} size="large" />
              </div>
            ) : (
              <p>暂无评分</p>
            )}

            <Button
              onClick={displayForm}
              type="primary"
              style={{ backgroundColor: "#4b2e83" }}
              className="add-review-button"
              size="large"
            >
              {showForm ? "取消" : "添加你的课程评价"}
            </Button>
          </div>
        </section>
        <br />

        <br />
        <img
          className="gpa-distribution"
          src={require("../../assets/gpa.jpg")}
          alt="gpa distribution"
          style={{ width: "40%", height: "auto" }}
        />
      </div>
      <div>
        {showForm ? (
          <section className="form">
            <br />
            {/* <h3>添加评价</h3> */}
            <ReviewForm
              courseName={courseName}
              onReviewSubmitted={onReviewSubmitted}
            />
          </section>
        ) : null}
      </div>
      <br />
      <section className="review-items">
        <div className="heading-wrapper">
          <p className="heading3">同学评价</p>
          <p>共{reviews.length}条评价</p>
        </div>
        {reviews.map((review) => (
          <ReviewItem review={review} />
        ))}
      </section>
    </>
  );
}

export default CourseReview;
