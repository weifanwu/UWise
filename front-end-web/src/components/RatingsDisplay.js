import React from "react";
import { Rate } from "antd";
import "./RatingsDisplay.css";

function RatingsDisplay({ ratings, size }) {
  // You can define default size if not provided
  const fontSize = size || "default";

  return (
    <div className={`review-ratings ${fontSize}`}>
      <div className="rating-item">
        <span className="desc">课程质量</span>
        <div className="divider"></div>
        <Rate
          className="star-rating"
          disabled
          allowHalf
          defaultValue={ratings[0]}
          style={{ color: "#4b2e83" }}
        />
      </div>
      <div className="rating-item">
        <span className="desc">作业量</span>
        <div className="divider"></div>
        <Rate
          className="star-rating"
          disabled
          allowHalf
          defaultValue={ratings[1]}
          style={{ color: "#4b2e83" }}
        />
      </div>
      <div className="rating-item">
        <span className="desc">GPA友好程度</span>
        <div className="divider"></div>
        <Rate
          className="star-rating"
          disabled
          allowHalf
          defaultValue={ratings[2]}
          style={{ color: "#4b2e83" }}
        />
      </div>
    </div>
  );
}

export default RatingsDisplay;
