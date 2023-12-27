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

router.get('/getCourseLecture', async (req, res) => {
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

module.exports = router;
