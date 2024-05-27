import ReactDOM from "react-dom";
import { Card } from "antd";

const { createRoot } = ReactDOM;

const { Meta } = Card;
const courseReviewCard = ({key, description, course, major, onClick}) => {
  let imgSrc;
    console.log(major);
  switch (major.toLowerCase()) {
    case "cse":
      // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!cse");
      imgSrc =  './images/cse.jpg';
      break;
    case "math":
      imgSrc =  "./images/math.webp";
      break;
    default:
      // console.log("default");
      imgSrc =  "./images/uwise.png";
  }
  
  return (
    <Card
      hoverable
      style={{
        width: 150,
        height: 200,
        cursor: "pointer",
      }}
      cover={<img alt="courseReviewCardImg" src={imgSrc} />}
      // cover={<img alt="courseReviewCardImg" src="../../uwise.png" />}
      onClick={onClick}
    >
      <Meta 
      title={<div style={{ textAlign: 'center' }}>{course}</div>}  
      description={description}/>
    </Card>
  )
};

export default courseReviewCard
