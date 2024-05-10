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
import { useNavigate } from "react-router-dom";
import '../../App.css';
import './CourseReview.css';
import { Input } from "antd";
import CourseReviewCard from '../courseReviewCard';
import Filter1 from '../Filter1';
import Filter2 from '../Filter2';

export default function CourseReview() {
  const [majors, setMajors] = useState([]);
  const [courses, setCourses] = useState([]);
  const { Search } = Input;
  const host = process.env.REACT_APP_BACKEND_HOST;
  let major, level;
  let navigate = useNavigate()

  useEffect(() => {
    getAllMajors();
    getAllCourses();
    console.log("useEffect ran")
  }, [])

  const onSearch = (value) => {
    fetch(host + '/courseReviews/search?courseName=' + value)
    .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
        console.log('Course existence status:', data.exists);
        if (data.exists) {
            console.log("Course exists!");
        } else {
            console.log("Course does not exist!");
        }
    })
    .catch(error => {
      console.log('Error fetching courses:', error)
    });
  }

  const getAllMajors = () => {
    fetch(host + '/courseReviews/getMajors')
    .then(response => {
      return response.json()
    })
    .then((resObject) => {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      // console.log(resObject);
      setMajors(resObject);
      console.log(majors)
    })
    .catch(error => {
      console.log('Error fetching majors:', error)
    });
  }

  const getAllCourses = () => {
    fetch(host + '/courseReviews/filter')
    .then(response => {
      return response.json()
    })
    .then((resObject) => {
      setCourses(resObject);
    })
    .catch(error => {
      console.log('Error fetching courses:', error)
    });
  }

  // TODO: request with parameters clicked on checkbox
  const getFilteredCourses = () => {
    fetch(host + '/courseReviews/filter?major=' + major + '&level=' + level)  // !!!!!!!!!!!!
    .then(response => {
      return response.json()
    })
    .then((resObject) => {
      setCourses(resObject);
    })
    .catch(error => {
      console.log('Error fetching courses:', error);
    });
  }

  const handleClick = (course) => {
    navigate('/reviews/' + course);
  }

  return (
    <>
      <div style={{display: 'flex'}}>
        <div className="filterContainer">
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
          <Filter1 majors={majors}/>
          {/* <Filter2 majors={majors}/> */}
        </div>
        <div className="display">
          {courses.map((course) => (
            <CourseReviewCard
            key={course._id}
            course={course.course}
            // intro={course.intro}
            // credits={course.credits}
            // type={course.type}
            // difficulty={course.difficulty}
            onClick={() => handleClick(course.course)}
            // onClick={handleClick(course.course)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
