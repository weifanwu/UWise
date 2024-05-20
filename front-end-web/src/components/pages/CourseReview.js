import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../App.css";
import "./CourseReview.css";
import ReviewForm from "../ReviewForm.js";
import ReviewItem from "../ReviewItem.js";
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
      <div className="course-reviews">
        <section className="course-description">
          <h3>课程介绍</h3>
          <p>{description}</p>
          <br />
          {avgRatings !== null ? (
            <div className="review-ratings" style={{ width: "30%" }}>
              <div>
                <Rate
                  disabled
                  allowHalf
                  defaultValue={avgRatings[0]}
                  style={{ color: "#4b2e83" }}
                />
                <span> | 课程质量</span>
              </div>
              <div>
                <Rate
                  disabled
                  allowHalf
                  defaultValue={avgRatings[1]}
                  style={{ color: "#4b2e83" }}
                />
                <span> | 作业量</span>
              </div>
              <div>
                <Rate
                  disabled
                  allowHalf
                  defaultValue={avgRatings[2]}
                  style={{ color: "#4b2e83" }}
                />
                <span> | GPA友好程度</span>
              </div>
            </div>
          ) : (
            <p>暂无评分</p>
          )}
        </section>
        <br />
        <section className="course-review">
          <h3>添加评价</h3>
          <ReviewForm
            courseName={courseName}
            onReviewSubmitted={onReviewSubmitted}
          />
        </section>
        <br />
      </div>
      <section className="review-items">
        {/* <div className="review-body"> */}
        <h3>同学评价</h3>
        {reviews.map((review) => (
          <ReviewItem review={review} />
        ))}
        {/* </div> */}
      </section>
    </>
  );
}

export default CourseReview;
