import React from "react";
import { Card, Rate } from "antd";
import "./ReviewItem.css";
import RatingsDisplay from "./RatingsDisplay.js";

function ReviewItem({ review }) {
  return (
    <Card key={review._id} className="review-card">
      <div className="review-header">
        <div className="review-quarter-year">
          <span>{review.quarter}</span> <span>{review.year}</span>
          {" - "}
          <span>{review.instructor ? review.instructor : "Unknown"}</span>
        </div>
      </div>
      <div className="review-body">
        <div className="review-comment">{review.comment}</div>
        <div className="vertical-divider"></div>
        {review.ratings[0] !== null && review.ratings[0] !== undefined ? (
          <RatingsDisplay ratings={review.ratings} size="small" />
        ) : (
          <p>暂无评分</p>
        )}
      </div>
    </Card>
  );
}

export default ReviewItem;
