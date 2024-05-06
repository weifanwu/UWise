// // import "antd"
// import ReactDOM from "react-dom";
// import { Card } from "antd";

// const { createRoot } = ReactDOM;

// // const {  Card  } = antd;
// const { Meta } = Card;
// const App = () => (
//   <Card
//     hoverable
//     style={{
//       width: 240,
//     }}
//     cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
//   >
//     <Meta title="Europe Street beat" description="www.instagram.com" />
//   </Card>
// );
// // const ComponentDemo = App;


// // createRoot(mountNode).render(<ComponentDemo />);
// export default App

import ReactDOM from "react-dom";
import { Card } from "antd";

const { createRoot } = ReactDOM;

// const {  Card  } = antd;
const { Meta } = Card;
const courseReviewCard = ({key, instructor, course}) => (
  <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="courseReviewCardImg" src="../../uwise.png" />}
  >
    <Meta title={course} description={instructor}/>
  </Card>
);

export default courseReviewCard
