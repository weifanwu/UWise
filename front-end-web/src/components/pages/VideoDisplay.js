import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './VideoDisplay.css';
import { useLocation, Link} from 'react-router-dom';

function VideoDisplay(props) {
    const location = useLocation();
    const { currentLecture, lectures } = location.state || {};

    console.log("current "+currentLecture?.title)

    const filteredLectures = lectures.filter(lecture => lecture.title !== currentLecture?.title);

    return (
        <div className="video-layout">
                <div className="video-detail">
                    <div className="video-detail-image-wrapper">
                        <img src={currentLecture?.videoCover} alt="Video Cover" />
                    </div>
                    <h3>{currentLecture.courseName} {currentLecture?.title}</h3>
                    {currentLecture.notesUrl ? <a href={currentLecture.notesUrl}>查看笔记</a> : null}
                </div>

                <div className="lectures-list">
                    {filteredLectures.map((lecture, index) => (
                        <div key={index} className="lecture-item">
                            <Link to={`/video/${lecture._id}`} 
                              state={{ currentLecture: lecture, lectures: lectures }}>
                                <img src={lecture.videoCover} alt="Lecture Cover" />
                                <div className="lecture-title">
                                    {lecture.courseName} {lecture.title}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
        </div>
    );
}

export default VideoDisplay;
