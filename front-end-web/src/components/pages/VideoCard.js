import React from 'react'
import { Link } from "react-router-dom"; 
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const demoThumbnailUrl = "https://www.youtube.com/watch?v=5p248yoa3oE";
const demoVideoUrl = "https://www.youtube.com/watch?v=5p248yoa3oE";
const demoVideoTitle = "https://www.youtube.com/watch?v=5p248yoa3oE";
const demoChannelUrl = "https://www.youtube.com/watch?v=5p248yoa3oE";
const demoChannelTitle = "https://www.youtube.com/watch?v=5p248yoa3oE";

const VideoCard = ({ video: { id: { videoId }, snippet } }) => (
  <Card sx={{ width: { xs: '100%', sm: '358px', md: "320px", }, boxShadow: "none", borderRadius: 0 }}>
    <Link to={videoId ? `/class/${videoId}` : `/video/cV2gBU6hKfY` }>
      <CardMedia image={snippet?.thumbnails?.high?.url || demoThumbnailUrl} alt={snippet?.title} 
        sx={{ width: { xs: '100%', sm: '358px'}, height: 180 }} 
      />
    </Link>
    <CardContent sx={{ backgroundColor: "#1E1E1E", height: '106px' }}>
      <Link to={videoId ? `/class/${videoId}` : demoVideoUrl } >
        <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
          {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
        </Typography>
      </Link>
    </CardContent>
  </Card>
);

export default VideoCard