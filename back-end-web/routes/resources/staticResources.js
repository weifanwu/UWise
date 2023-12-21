var express = require('express');
var router = express.Router();
var StaticResource = require('../../models/staticResourcesSchema.js');

router.post('/addStaticResource', async (req, res) => {
    try {
      console.log("adding the resource");
      console.log(req.body);
      const {title, intro, type, img, url } = req.body;
      const create_date = new Date();
      const instance = new StaticResource({ title, intro, type, img, url, create_date});
      await instance.save();
      res.send("added successfully!");
    } catch(error) {
      console.error(error);
      res.status(500).send("There is some internal issue.");
    }
});

router.get('/getStaticResource', async (req, res) => {
    try {
      const type = req.query.type;
      const resources = await StaticResource.find({ type: type });
      
      res.json(resources);
    } catch(error) {
      console.error(error);
      res.status(500).send("There is some internal issue.");
    }
});


router.get('/getTypes', async (req, res) => {
  try {
      const types = await StaticResource.distinct('type');
      const sortedTypes = types.sort();
      res.json(sortedTypes);
  } catch (error) {
      res.status(500).send(error.message);
  }
});



module.exports = router;