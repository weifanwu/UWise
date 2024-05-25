import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../App.css';
import './CourseReview.css';
import { Input, Button } from "antd";
import { SyncOutlined } from '@ant-design/icons';
import CourseReviewCard from '../courseReviewCard';
import Filter from '../Filter';

export default function CourseReview() {
  const [majors, setMajors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [originalCourses, setOriginalCourses] = useState([]);
  const [found, setFound] = useState(true);
  const { Search } = Input;
  const host = process.env.REACT_APP_BACKEND_HOST;
  let navigate = useNavigate();

  useEffect(() => {
    getAllMajors();
    getAllCourses();
    console.log("useEffect ran");
  }, []);

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
      console.log('Error fetching courses:', error);
    });
  };

  const getAllMajors = () => {
    fetch(host + '/courseReviews/getMajors')
    .then(response => response.json())
    .then((resObject) => {
      setMajors(resObject);
    })
    .catch(error => {
      console.log('Error fetching majors:', error);
    });
  };

  const getAllCourses = () => {
    fetch(host + '/courseReviews/filter')
    .then(response => response.json())
    .then((resObject) => {
      setCourses(resObject);
      setOriginalCourses(resObject);  // Store the original data
    })
    .catch(error => {
      console.log('Error fetching courses:', error);
    });
  };

  const getFilteredCourses = (selectedMajor, selectedLevel) => {
    console.log("________________________________________________");
    let filteredCourses = originalCourses;
    console.log("selectedMajor: " + selectedMajor);
    console.log("type of selectedMajor: " + typeof(selectedMajor));
    if (selectedMajor != "") {
      selectedMajor = String(selectedMajor);
      filteredCourses.map((course) => (
        // console.log(typeof(course.major) + " " + typeof(selectedMajor))
        console.log(course.major)
      ))
      console.log("!!!!!!!!!!!" + selectedMajor);
      // console.log(filteredCourses);
      filteredCourses = filteredCourses.filter((course) => course.major === selectedMajor);
      // console.log(filteredCourses)
    }
    if (selectedLevel) {
      selectedLevel = String(selectedLevel);
      filteredCourses.map(course => (
        console.log(course.number.charAt(0) + " " + selectedLevel.charAt(0))
      ))
      filteredCourses = filteredCourses.filter((course) => {
        if (selectedLevel === '400+') {
          return course.number >= 500;
        } else {
          console.log(course.number.charAt(0) + " " + selectedLevel.charAt(0));
          return course.number.charAt(0) === selectedLevel.charAt(0);
        };
      }); 
    }
    setCourses(filteredCourses);
  };

  const handleClick = (course) => {
    navigate('/reviews/' + course);
  };

  const reset = () => {
    setCourses(originalCourses);
    setFound(true);
  };

  return (
    <>
      <div className="menu" style={{display: 'flex'}}>
        <div className="filterContainer">
          <Search
            placeholder="e.g. MATH 126"
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            maxLength={11}
          />
          <p>请在专业和数字之间加上空格，如'CSE 143'</p>
          <Button 
            type="primary" 
            icon={<SyncOutlined />}
            onClick={reset}
            display='flex'
            justifyContent="center">
            Reset
          </Button>
          <Filter majors={majors} onFilterChange={getFilteredCourses}/>
        </div>
        <div className="display">
          {found ? (
            courses.map((course) => (
              <CourseReviewCard
                key={course._id}
                course={course.course}
                onClick={() => handleClick(course.course)}
              />
            ))
          ) : (
            <div className="notFound">
              No courses found.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
