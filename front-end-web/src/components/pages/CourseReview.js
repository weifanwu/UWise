import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../App.css';
import './CourseReview.css';
import { Input } from "antd";
import CourseReviewCard from '../courseReviewCard';
import Filter from '../Filter';
import { Button } from "antd";
import { SyncOutlined } from '@ant-design/icons';

export default function CourseReview() {
  const [majors, setMajors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [found, setFound] = useState(true)
  const { Search } = Input;
  // const {  SearchOutlined  } = icons;
  const host = process.env.REACT_APP_BACKEND_HOST;
  let major, level;
  let navigate = useNavigate()

  useEffect(() => {
    getAllMajors();
    getAllCourses();
    console.log("useEffect ran");
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
          setFound(true);
          const courseData = {
            course: value,
            major: null,
            number: null,
            description: null
          };
          setCourses([courseData]);
          console.log("Course exists!");
        } else {
          setFound(false);
          setCourses([]);
          console.log("Course does not exist!");
        }
    })
    .catch(error => {
      setCourses([]);
      console.log('Error fetching courses:', error)
    });
  }

  const getAllMajors = () => {
    fetch(host + '/courseReviews/getMajors')
    .then(response => {
      return response.json()
    })
    .then((resObject) => {
      setMajors(resObject);
      // console.log(majors);
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

  const reset = () => {
    getAllCourses();
    setFound(true);
  }

  return (
    <>
      <div className="menu" style={{display: 'flex'}}>
        <div className="filterContainer">
          <Search
            placeholder="e.g. MATH 126"
            // allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            maxLength={11}
            // onChange={getAllCourses}
          />
          <Button 
            type="primary" 
            icon={<SyncOutlined />}
            onClick={reset}
            display='flex'
            justyfyContent="center">
            Reset
          </Button>
          <p>请在专业和数字之间加上空格，如'CSE 143'</p>
          <Filter majors={majors}/>
        </div>
        <div className="display">
          {found ? (
            courses.map((course) => (
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
            ))
          ) : (
            <div className="notFound"style={{display:'flex'}}>
              No courses found.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
