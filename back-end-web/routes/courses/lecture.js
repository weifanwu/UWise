var express = require('express');
var router = express.Router();
var LectureModel = require('../../models/classSchema.js');

router.post('/addCourseLecture', async (req, res) => {
    try {
      const {title, courseName, duration, intro, videoUrl, videoCover, notesUrl} = req.body;
      const createTime = new Date();
      const lectureInstance = new LectureModel({ title, courseName, duration, intro, videoUrl, videoCover, notesUrl, createTime});
      await lectureInstance.save();
      res.send("added successfully!");
    } catch(error) {
      console.error(error);
      res.status(500).send("There is some internal issue.");
    }
});

router.get('/getCourseLectures', async (req, res) => {
    try {
      const courseName = req.query.courseName;
      console.log(courseName)
      const lectures = await LectureModel.find({ courseName: courseName });
      res.json(lectures);
    } catch(error) {
      console.error(error);
      res.status(500).send("There is some internal issue.");
    }
});

router.get('/getLecture', async (req, res) => {
  try {
    const videoId = req.query.videoId;
    const lecture = await LectureModel.findOne({ _id: videoId });
    res.json(lecture);
  } catch(error) {
    console.error(error);
    res.status(500).send("There is some internal issue.");
  }
});


module.exports = router;
