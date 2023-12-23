var express = require('express');
var router = express.Router();
var LectureModel = require('../../models/classSchema.js');

router.post('/addLecture', async (req, res) => {
    try {
      const Title = req.body.title;
      const Class = req.body.class;
      const Duration = req.body.duration;
      const Intro = req.body.intro;
      const Zoom = req.body.zoom;
      const Notes = req.body.notes;
      const lectureInstance = new LectureModel({ Title, Class, Duration, Intro, Zoom, Notes });
      await lectureInstance.save();
      res.send("added successfully!");
    } catch(error) {
      console.error(error);
      res.status(500).send("There is some internal issue.");
    }
});

router.get('/getLecture', async (req, res) => {
    try {
      const classname = req.query.classname;
      const classes = await LectureModel.find({ Class: classname });
      res.json(classes);
    } catch(error) {
      console.error(error);
      res.status(500).send("There is some internal issue.");
    }
});

module.exports = router;
