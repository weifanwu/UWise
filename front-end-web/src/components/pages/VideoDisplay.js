import React, { useEffect, useState, useRef } from 'react';
import './VideoDisplay.css';
import { useLocation, Link} from 'react-router-dom';

function VideoDisplay(props) {
    const location = useLocation();
    const { currentLecture, lectures } = location.state || {};
    const [videoUrl, setVideoUrl] = useState("");

    const host = process.env.REACT_APP_BACKEND_HOST;
    const handlePlayButtonClick = () => {
        fetch(`${host}/courses/getVideo?courseName=${encodeURIComponent(currentLecture.courseName)}&lecture=${encodeURIComponent(currentLecture.title)}`)
            .then((res) => res.json())
            .then((url) => {
                const iframe = document.getElementById("videoIframe");
                setVideoUrl(url[0]);
                iframe.style.display = 'block';
                const VideoPlayButtonClick = document.getElementById("video-play-btn");
                VideoPlayButtonClick.style.display = 'none';
                const cover = document.getElementById("cover");
                cover.style.display = 'none';
            })
    };

    useEffect(() => {
        const cover = document.getElementById("cover");
        cover.style.display = 'block';
        var iframe = document.getElementById('videoIframe');
        iframe.style.display = 'none'; 
        setVideoUrl("");
        const VideoPlayButtonClick = document.getElementById("video-play-btn");
        VideoPlayButtonClick.style.display = 'block';

    }, [currentLecture]);

    useEffect(() => {
        const handleContextmenu = e => {
            e.preventDefault()
        }
        document.addEventListener('contextmenu', handleContextmenu)
        return function cleanup() {
            document.removeEventListener('contextmenu', handleContextmenu)
        }
    }, [])

  const videoRef = useRef();

  useEffect(() => {    
    videoRef.current?.load();
  }, [videoUrl]);


    const filteredLectures = lectures.filter(lecture => lecture.title !== currentLecture?.title);
    return (
        <div className="video-layout">
                <div className="video-detail">
                    <div className="video-detail-image-wrapper">
                        <img id='cover' src={currentLecture?.videoCover} alt="Video Cover" />
                        <video
                            id="videoIframe"
                            allow="fullscreen"
                            frameBorder="0"
                            ref={videoRef}                            
                            controls
                            controlsList="nodownload"
                        >
                            <source id="video-source" src={videoUrl} />
                        </video>

                        <div id="video-play-btn" className="play-button" onClick={handlePlayButtonClick}>▶</div>
                    </div>
                    <div style={{ marginTop: '80px' }}>
                        <h3>{currentLecture.courseName} {currentLecture?.title}</h3>
                        {currentLecture.notesUrl ? <a href={currentLecture.notesUrl}>查看笔记</a> : null}
                    </div>
                </div>
                
                <div className="lectures-list">
                    {filteredLectures.map((lecture, index) => (
                        <div key={lecture._id} className="lecture-item">
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
