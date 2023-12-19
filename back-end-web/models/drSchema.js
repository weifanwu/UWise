const mongoose = require('mongoose');

const drSchema = new mongoose.Schema({
    Title: String,
    Intro: String,
    Priority: String,
    URL: String,
    Img: String,
});

const dr = mongoose.model('Post', drSchema);

module.exports = dr;