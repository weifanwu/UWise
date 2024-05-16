import React from "react";
import { Card, Rate } from "antd";
import "./ReviewItem.css";

function ReviewItem({ review }) {
  return (
    <Card key={review._id} className="review-card">
      <div className="review-header">
        {/* Moved quarter and year to the header */}
        <div className="review-quarter-year">
          <span>{review.quarter}</span> <span>{review.year}</span>
          {" - "}
          <span>{review.instructor ? review.instructor : "Unknown"}</span>
        </div>
      </div>
      <div className="review-body">
        <div className="review-comment" style={{ width: "70%" }}>
          {review.comment}
        </div>
        <div className="vertical-divider"></div>
        {review.ratings[0] !== null && review.ratings[0] !== undefined ? (
          <div className="review-ratings" style={{ width: "30%" }}>
            <div>
              <Rate
                disabled
                allowHalf
                defaultValue={review.ratings[0]}
                style={{ color: "#4b2e83" }}
              />
              <span> | 课程质量</span>
            </div>
            <div>
              <Rate
                disabled
                allowHalf
                defaultValue={review.ratings[1]}
                style={{ color: "#4b2e83" }}
              />
              <span> | 作业量</span>
            </div>
            <div>
              <Rate
                disabled
                allowHalf
                defaultValue={review.ratings[2]}
                style={{ color: "#4b2e83" }}
              />
              <span> | GPA友好程度</span>
            </div>
          </div>
        ) : (
          <p>暂无评分</p>
        )}
      </div>
    </Card>
  );
}

export default ReviewItem;
