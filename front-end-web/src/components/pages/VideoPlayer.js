// import React, { useState } from "react";

// const VideoPlayer = () => {
//   const [videoURL, setVideoURL] = useState("");
//   const [error, setError] = useState("");

//   const fetchVideo = () => {
//     const host = process.env.REACT_APP_BACKEND_HOST;
//     fetch(`${host}/courses/test`, {
//       // fetch(`http://localhost:8000/`, {
//       headers: {
//         Range: "bytes=0-",
//       },
//     })
//       .then((response) => response.blob())
//       .then((blob) => {
//         // Create a blob URL pointing to the video object
//         const url = URL.createObjectURL(blob);
//         console.log("successfully get the video url:" + url);
//         setVideoURL(url);
//         setError(""); // Reset error state
//       })
//       .catch((error) => {
//         console.error(error);
//         setError("Failed to load video.");
//       });
//   };

//   const handleVideoError = () => {
//     setError("Error playing video. Please try again.");
//   };

//   return (
//     <div
//       id="video-container"
//       style={{ width: "720px", maxHeight: "405px", overflow: "hidden" }}
//     >
//       {videoURL ? (
//         <video
//           src={videoURL}
//           controls
//           style={{ width: "100%" }}
//           onError={handleVideoError}
//           autoPlay
//         >
//           Your browser does not support the video tag.
//         </video>
//       ) : (
//         <button
//           onClick={fetchVideo}
//           style={{ padding: "10px 20px", fontSize: "16px" }}
//         >
//           Play Video
//         </button>
//       )}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };

// export default VideoPlayer;

import React from "react";

const VideoPlayer = () => {
  const host = process.env.REACT_APP_BACKEND_HOST;

  return (
    <div style={{ maxWidth: "70%", margin: "auto" }}>
      <video controls autoPlay style={{ width: "100%" }}>
        <source
          //   src={`http://localhost:8000/courses/testVideo`}
          src={`${host}/courses/testVideo`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
