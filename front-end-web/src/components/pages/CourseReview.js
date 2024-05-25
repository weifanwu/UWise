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

  // still fixing bugs
  const getFilteredCourses = (selectedMajor, selectedLevel) => {
    console.log("_____________________________");
    // console.log("key of selectedLevel: " + Object.keys(selectedLevel));
    // console.log("value of selectedLevel: " + Object.values(selectedLevel));
    let filteredCourses = originalCourses;
    let array;
    // console.log("selectedMajor: " + selectedMajor);
    // console.log("type of selectedMajor: " + typeof(selectedMajor));
    if (selectedMajor && String(selectedMajor) !== '') {
      // selectedMajor = String(selectedMajor);
      array = Object.values(selectedMajor).map(item => String(item));
      // console.log("+++++++++++");
      // console.log(selectedMajor);
      filteredCourses.map((course) => (
        console.log(typeof(course.major) + " " + typeof(array[0]))
        // console.log(array.includes(course.major))
      ))
      // console.log("!!!!!!!!!!!" + selectedMajor);
      console.log("array: " + array);
      filteredCourses = filteredCourses.filter(course => array.includes(course.major));
      console.log("filteredCourses: " + (filteredCourses))
    }
    if (selectedLevel && String(selectedLevel) !== '') {
      // selectedLevel = String(selectedLevel);
      // console.log("----------");
      // console.log("selectedLevel: |||" + selectedLevel + "|||");
      // console.log("type of selectedLevel: " + typeof(selectedLevel));
      // filteredCourses.map(course => (
      //   console.log(course.number.charAt(0) + " " + selectedLevel.charAt(0))
      // ))
      array = Object.values(selectedLevel);
      if (array.includes("400+")) {
        array = array.filter(item => item !== "400+");
        array.push('500', '600', '700', '800');
      }
      let num;
      console.log(array);
      filteredCourses = filteredCourses.filter(course => {
        // console.log(course.number.charAt(0) + "00");
        num = String(course.number.charAt(0) + "00");
        // console.log(typeof(num));
        return array.includes(num)
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
      <div className="page" style={{display: 'flex'}}>
        <div className="menuContainer">
          <div className="menu">
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
