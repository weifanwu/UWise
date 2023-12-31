var express = require('express');
var router = express.Router();
var Reviews = require('../../models/commentsSchema.js');

router.get('/getReview', async(req, res) => {
  try {
    await Reviews.find({reviewed: false}, (error, reviews) => {
      if (error) console.log(error);
      else res.json(reviews);
    });
  } catch(err) {
    res.status(500).send(err.message);
    console.error(err);
  }
});

router.post('/removeReview', async(req, res) => {
  try {
    id = req.body;
    await Reviews.findByIdAndDelete(id, (error, deleted) => {
      if (error) console.log(error);
      else {
        if (deleted) res.status(200).send("Delete successfully!");
        else console.log('Document not found');
      }
    });
  } catch(err) {
    res.status(500).send(err.message);
    console.error(err);
  }
});

router.post('/proveReview', async(req, res) => {
  try {
    id = req.body;
    const updateObj = {reviewed: true};
    await Reviews.findByIdAndUpdate(id, updateObj, {new: true}, (error, updated) => {
      if (error) console.log(error);
      else {
        if (updated) res.status(200).send("Update successfully!");
        else console.log('Document not found');
      }
    });
  } catch(err) {
    res.status(500).send(err.message);
    console.error(err);
  }
});

module.exports = router;