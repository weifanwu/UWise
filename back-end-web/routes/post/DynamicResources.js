var express = require('express');
var router = express.Router();
var drModel = require('../../models/drSchema.js');

router.post('/addDR', async (req, res) => {
    try {
        console.log("this is the body");
        console.log(req.body);
        const Title = req.body.title;
        const Intro = req.body.intro;
        const Priority = req.body.priority;
        const URL = req.body.url;
        const Img = req.body.img;
        const drInstance = new drModel({ Title, Intro, Priority, URL, Img });
        await drInstance.save()
            .then((res) => {
                console.log(res)
            })
        res.send("added successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("There is some internal issue.");
    }
});

router.get('/getDR', async (req, res) => {
    try {
        const posts = await drModel.find({});
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send("There is some internal issue.");
    }
});

module.exports = router;