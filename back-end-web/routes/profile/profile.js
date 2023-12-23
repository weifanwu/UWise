var express = require('express');
var router = express.Router();
var User = require('../../models/userSchema.js');

router.get('/getProfile', async (req, res) => {
  try {
    if (req.user) {
      const user = req.user; // guaranteed that a user exists in google.js
      res.status(200).json(user);
    } else {
      res.status(200).send("Please log in first!");
    }
  } catch (error) {
    res.status(500).send("There is some internal issue.");
  }
});

router.post('/updateProfile', async (req, res) => {
  try {
    const {given_name, family_name, picture, email, grade, major } = req.body;
    await User.FindOneAndUpdate(
      {"email": email},
      {$set: {given_name: given_name,
              family_name: family_name,
              picture: picture,
              grade: grade,
              major: major,},},
      {new: true}
    );
    res.send("Updated Successfully");
  } catch(error) {
    console.log("Error: Update profile");
  }
});

module.exports = router;