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

export default function CourseReview() {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const host = process.env.REACT_APP_BACKEND_HOST;
  useEffect(() => {
    fetch(host + '/resources/getCourseReview')
    .then(response => response.json())
  })

  const drawer = (
    <div className="drawer">
      <List>
          {types.map((type, index) => (
            <ListItem className={"selected-drawer"} key={type} disablePadding>
              <ListItemButton 
              style={{backgroundColor: selectedType === type ? '#f0f0f0' : 'transparent'}}>
                <ListItemIcon className="nav-icon">
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText className="nav-text" primary={type} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </div>
  );

  return (
    <div style={{display: "flex"}}>
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
    </div>
  );
}
