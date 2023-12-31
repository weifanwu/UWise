const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://uwise:universityofwashington@uwise.vsv8lb2.mongodb.net/review');

const commentsSchema = new mongoose.Schema({
    instructor: String,
    quarter: String,
    course: String,
    reviewed: Boolean,
    comment: String,
},
{ collection : 'comments' });

const Reviews = mongoose.model('comments', commentsSchema);

module.exports = Reviews;