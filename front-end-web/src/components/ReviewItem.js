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
        {/* <div className="review-instructor">{review.instructor}</div> */}
      </div>
      <div className="review-body">
        {/* Adjusted the layout for comment and ratings */}
        <div className="review-comment" style={{ width: "70%" }}>
          {review.comment}
        </div>
        <div className="vertical-divider"></div>
        {review.ratings[0] !== null && review.ratings[0] !== undefined ? (
          <div className="review-ratings" style={{ width: "30%" }}>
            <div>
              <Rate disabled defaultValue={review.ratings[0]} />
              <span> | 难度</span>
            </div>
            <div>
              <Rate disabled defaultValue={review.ratings[1]} />
              <span> | 推荐度</span>
            </div>
            <div>
              <Rate disabled defaultValue={review.ratings[2]} />
              <span> | 受欢迎度</span>
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
