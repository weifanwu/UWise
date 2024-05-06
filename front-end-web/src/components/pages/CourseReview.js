// import React from 'react';
// import '../../App.css';
// import './CourseReview.css';
// import Footer from '../Footer';

// export default function CourseReview() {
//   return <>
//             <body>
//                 <iframe className="service" src="https://uwise-course-review.netlify.app/#/" frameborder="0"></iframe>
//             </body>
//             {/* <Footer /> */}
//          </>
// }


import React, { useState, useEffect } from "react";
import '../../App.css';
import './CourseReview.css';
import Footer from '../Footer';
import { Space } from 'antd';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import courseReviewCard from '../courseReviewCard';
import { filter } from '../CourseFilter';

export default function CourseReview() {
  const [types, setTypes] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const host = process.env.REACT_APP_BACKEND_HOST;
  useEffect(() => {
    fetch(host + '/resources/getMajors')
    .then(response => response.json())
    // .then(majors => displayData(majors))
    .catch(error => console.log('Error fetching majors:', error));
    fetch(host + '/resources/getCourseReview')
    .then(response => response.json())
    // .then(courses => displayData(courses))
    .catch(error => console.log('Error fectching courses:', error));
  })

  return (
    <>
      {/* <div style={{display: "flex"}}>
        {(
          <>
            <Drawer 
              style={{
                position: "fixed"
              }}                            
              variant="permanent">
              {drawer}
            </Drawer>
          </>
        )}
      </div> */}
      <div className="filter">
        <filter/>
      </div>
      <div className="courseReviweCard">
          {cards.map((card) => (
              <courseReviewCard
                  key={card._id}
                  instructor={card.instructor}
                  course={card.course}
              />
          ))}
      </div>
    </>
  );
}
