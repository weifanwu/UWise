const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    title: String,
    courseName: String,
    duration: String,
    intro: String,
    videoUrl: String,
    videoCover: String,
    recordTime: String,
    notesUrl: String,
    createTime: Date
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;