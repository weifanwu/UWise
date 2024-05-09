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
import CourseReviewCard from '../courseReviewCard';
import Filter from '../CourseFilter';
// import FilterContainer from '../FilterContainer';

export default function CourseReview() {
  const [majors, setMajors] = useState([]);
  const [courses, setCourses] = useState([]);
  const host = process.env.REACT_APP_BACKEND_HOST;
  let major, level;
  let navigate = useNavigate()

  useEffect(() => {
    getAllMajors();
    getAllCourses();
  })

  const getAllMajors = () => {
    fetch(host + '/courseReviews/getMajors')
    .then(response => {
      return response.json()
    })
    .then((resObject) => {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      console.log(resObject);
      setMajors(resObject.course);
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

  // TODO: get parameters based on checkbox
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

  function handleClick(course) {
    navigate(host + '/reviews/' + course);
  }

  return (
    <>
      <div className="filterContainer">
        {/* <FilterContainer majors={majors}/> */}
        <Filter majors={majors}/>
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
          onClick={handleClick(course.course)}
          />
        ))}
      </div>
    </>
  );
}
