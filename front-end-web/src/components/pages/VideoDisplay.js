import React from 'react';
import './VideoDisplay.css';
import { useLocation, Link} from 'react-router-dom';
import { message } from 'antd';


function VideoDisplay(props) {
    const location = useLocation();
    const { currentLecture, lectures } = location.state || {};

    console.log("current "+currentLecture?.title)

    const host = process.env.REACT_APP_BACKEND_HOST;
    const handlePlayButtonClick = () => {
        fetch(`${host}/courses/getVideo?courseName=${encodeURIComponent(currentLecture.courseName)}&lecture=${encodeURIComponent(currentLecture.title)}`)
            .then((res) => res.json())
            .then((url) => {
                console.log(url)
                const iframe = document.getElementById("videoIframe");
                iframe.src = url[0];
                iframe.style.display = 'block';
                const VideoPlayButtonClick = document.getElementById("video-play-btn");
                VideoPlayButtonClick.style.display = 'none';
            })
    };

    document.addEventListener('DOMContentLoaded', function () {
        var link = document.getElementById('lecture-video-link'); 
        var iframe = document.getElementById('videoIframe');
        
        link.addEventListener('click', function() {
            iframe.style.display = 'none'; 
            const VideoPlayButtonClick = document.getElementById("video-play-btn");
            VideoPlayButtonClick.style.display = 'block';
        });
    });


    const filteredLectures = lectures.filter(lecture => lecture.title !== currentLecture?.title);
    return (
        <div className="video-layout">
                <div className="video-detail">
                    <div className="video-detail-image-wrapper">
                        <img src={currentLecture?.videoCover} alt="Video Cover" />
                        <iframe id="videoIframe" src title="Lecture Video" ></iframe>
                        <div id="video-play-btn" className="play-button" onClick={handlePlayButtonClick}>▶</div>
                    </div>
                    <h3>{currentLecture.courseName} {currentLecture?.title}</h3>
                    {currentLecture.notesUrl ? <a href={currentLecture.notesUrl}>查看笔记</a> : null}
                </div>
                

                <div className="lectures-list">
                    {filteredLectures.map((lecture, index) => (
                        <div key={index} className="lecture-item">
                            <Link to={`/video/${lecture._id}`} 
                              state={{ currentLecture: lecture, lectures: lectures }}
                              id="lecture-video-link">
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
