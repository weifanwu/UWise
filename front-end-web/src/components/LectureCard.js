import React, { useEffect, useState } from "react";
import { Card } from 'antd';

export default function Lectures(props) {
    const classname = props.classname;
    const [lectures, setLectures] = useState([]);
    const url = process.env.REACT_APP_BACKEND_HOST + "/lecture/getLecture?classname=" + classname;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                const sortedData = data.sort((a, b) => a.Title.localeCompare(b.Title));
                setLectures(sortedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [url]); // Added url to dependency array

    return (
        <>
            {lectures.map((lecture) => (
                <Card  style={{ marginBottom: "10px" }} title={lecture.Title} extra={
                    <div>时长：{lecture.Duration}分钟
                        <a href={lecture.Notes}>笔记</a>
                        <a href={lecture.Zoom}>视频</a>
                    </div>}>
                    介绍：{lecture.Intro}
                </Card>
            ))}
        </>
    );
}