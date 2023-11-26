const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    Title: String,
    Class: String,
    Duration: String,
    Intro: String,
    Zoom: String,
    Notes: String
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;