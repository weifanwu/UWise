    import React, { useEffect, useState } from "react";
    import { Card } from 'antd';
    import { Link } from 'react-router-dom';

    export default function Lectures(props) {
        const courseName = props.courseName;    

        const [lectures, setLectures] = useState([]);
        const url = process.env.REACT_APP_BACKEND_HOST + "/courses/getCourseLectures?courseName=" + courseName;

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
                    setLectures(sortedData);
                    console.log(sortedData)
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }, [url]); // Added url to dependency array

        return (
            <>
                {lectures.map((lecture) => (
                    <Card  style={{ marginBottom: "10px" }} title={lecture.title} extra={
                        <div>
                            <span style={{
                                "paddingRight": "10px",
                            }}>录制日期: {lecture.recordTime}</span>
                            时长：{lecture.duration}分钟
                            {lecture.notesUrl ? <a href={lecture.notesUrl}> 笔记</a> : null}
                            <Link to={`/video/${lecture._id}`} 
                            state={{ currentLecture: lecture, lectures: lectures}}> 视频录播</Link>
                        </div>}>
                        介绍：{lecture.intro}
                    </Card>
                ))}
            </>
        );
    }