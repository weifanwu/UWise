import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../App.css';
import './CourseReviewPage.css';
import { Input, Button, Divider } from "antd";
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
    fetch(host + '/courseReviewPage/search?courseName=' + value)
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
    fetch(host + '/courseReviewPage/getMajors')
    .then(response => response.json())
    .then((resObject) => {
      setMajors(resObject);
    })
    .catch(error => {
      console.log('Error fetching majors:', error);
    });
  };

  const getAllCourses = () => {
    fetch(host + '/courseReviewPage/filter')
    .then(response => response.json())
    .then((resObject) => {
      setCourses(resObject);
      setOriginalCourses(resObject);  // Store the original data
    })
    .catch(error => {
      console.log('Error fetching courses:', error);
    });
  };

  // selectedCredits and selectedTypes are not used because no such fields in data now
  const getFilteredCourses = (selectedMajor, selectedLevel, selectedCredits, selectedTypes) => {
    let filteredCourses = originalCourses;
    let array;
    if (selectedMajor && String(selectedMajor) !== '') {
      array = Object.values(selectedMajor).map(item => String(item));
      filteredCourses = filteredCourses.filter(course => array.includes(course.major));
    }
    if (selectedLevel && String(selectedLevel) !== '') {
      array = Object.values(selectedLevel);
      if (array.includes("400+")) {
        array = array.filter(item => item !== "400+");
        array.push('500', '600', '700', '800');
      }
      let num;
      filteredCourses = filteredCourses.filter(course => {
        num = String(course.number.charAt(0) + "00");
        return array.includes(num)
      }); 
    }
    setCourses(filteredCourses);
  };

  const handleClick = (course) => {
    console.log("/reviews/" + course);
    navigate("/reviews/" + course);
  };

  const reset = () => {
    setCourses(originalCourses);
    setFound(true);
  };

  return (
    <>
      <div className="page" style={{display: 'flex'}}>
        <div className="menuContainer">
          <div className="menu">
            <div className="search">
              <Search
                placeholder="e.g. MATH 126"
                enterButton="Search"
                size="large"
                onSearch={onSearch}
                maxLength={11}
              />
              <Button 
                type="primary" 
                icon={<SyncOutlined />}
                onClick={reset}
                display='flex'
                justifyContent="center"
                size='large'>
              </Button>
            </div>
            <p>请在专业和数字之间加上空格，如'CSE 143'</p>
            <Filter majors={majors} onFilterChange={getFilteredCourses}/>
          </div>
        </div>
        <div className="cardsContainer">
          {found ? (
            <div className="cards">
              {courses.map((course) => (
                <CourseReviewCard
                  key={course._id}
                  major={course.major}
                  course={course.course}
                  onClick={() => handleClick(course.course)}
                />
              ))}
            </div>
          ) : (
            <div className="notFoundContainer">
              <div className="notFound">No courses found</div>
            </div>
          )}
          
        </div>
      </div>
    </>
  );
}
