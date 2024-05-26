import ReactDOM from "react-dom";
import { Card } from "antd";

const { createRoot } = ReactDOM;

const { Meta } = Card;
const courseReviewCard = ({key, description, course, major}) => {
  const getImageSrc = (major) => {
    console.log(typeof(major));
    switch (major) {
      case "CSE":
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!cse");
        return './images/cse.jpg';
      case "MATH":
        return "./images/math.webp";
      default:
        console.log("default");
        return "./images/uwise.png";
    }
  };

  const imgSrc = getImageSrc(major);
  
  return (
    <Card
      hoverable
      style={{
        width: 150,
        height: 200,
      }}
      cover={<img alt="courseReviewCardImg" src={imgSrc} />}
      // cover={<img alt="courseReviewCardImg" src="../../uwise.png" />}
    >
      <Meta 
      title={<div style={{ textAlign: 'center' }}>{course}</div>}  
      description={description}/>
    </Card>
  )
};

export default courseReviewCard
