import React from "react";

/*
This is the toy implementation for the video player. Only used for testing purposes.
TODO: Remove this component when the real video player is implemented.
*/

const VideoPlayer = () => {
  const host = process.env.REACT_APP_BACKEND_HOST;

  return (
    <div style={{ maxWidth: "70%", margin: "auto" }}>
      <video controls autoPlay style={{ width: "100%" }}>
        <source
          //   src={`http://localhost:8000/courses/testVideo`}
          src={`${host}/courses/getVideo`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
