var express = require('express');
var router = express.Router();
var LectureModel = require('../../models/classSchema.js');
const { Storage } = require("@google-cloud/storage");

let projectId = "pro-signal-407805"; // Get this from Google Cloud
let keyFilename = "cloudKey.json"; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});

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

router.get('/getVideo', async (req, res) => {
  try {
    const courseName = req.query.courseName;
    const lecture = req.query.lecture;
    
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 2); // Expiration set to 2 hours from now
    
    const bucket = storage.bucket(courseName.toLowerCase());
    const options = {
      version: 'v2', // defaults to 'v2' if missing.
      action: 'read',
      expires: expiration,
    };
      const urls = await bucket.file(lecture.replace(/\s/g, '').toLowerCase() + ".m4v").getSignedUrl(options);
      console.log(urls);
      res.send(urls);
  } catch (error) {
    res.send("Error:" + error);
    console.error(error);
  }
});


module.exports = router;
